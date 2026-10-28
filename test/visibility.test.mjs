import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { parseArticle, effectiveVisibility } from '../lib/render.mjs';
import { signSession, verifySession } from '../lib/auth.mjs';
import { createMemoryStore } from '../lib/store.mjs';
import { createApp } from '../lib/app.mjs';

// Fixed inputs keep the suite independent of process.env, wall time and services.
const NOW = Date.UTC(2026, 9, 28, 12);
const SECRET = 'wiki-test-session-secret-fixed-0123456789abcdef';
const ENROLL_TOKEN = 'wiki-test-enrollment-token-fixed';
const ORIGIN = 'https://wiki.example.test';
const ENV = {
  WIKI_SESSION_SECRET: SECRET,
  WIKI_ENROLL_TOKEN: ENROLL_TOKEN,
  WIKI_ORIGIN: ORIGIN,
  WIKI_RP_ID: 'wiki.example.test',
};
const CREDENTIAL = {
  id: 'dGVzdC1jcmVkZW50aWFs',
  publicKey: 'dGVzdC1wdWJsaWMta2V5',
  counter: 0,
  transports: ['internal'],
};

function articleRaw(title, visibility) {
  return [
    '---',
    `title: ${JSON.stringify(title)}`,
    ...(visibility === undefined ? [] : [`visibility: ${JSON.stringify(visibility)}`]),
    '---',
    '',
    `Body for ${title}.`,
  ].join('\n');
}

function fixture({ overrides = {}, credential = null, env = {} } = {}) {
  const store = createMemoryStore({
    privateArticles: {
      'vault-note': articleRaw('Vault note', 'private'),
      // Source precedence must favor the repo copy, including its visibility.
      'public-note': articleRaw('Store duplicate', 'private'),
    },
    overrides: { ...overrides },
    credential: credential && structuredClone(credential),
  });
  const app = createApp({
    publicArticles: [
      { filename: 'public-note.md', raw: articleRaw('Public note', 'public') },
      { filename: 'sealed-note.md', raw: articleRaw('Sealed note', 'private') },
      { filename: 'unspecified-note.md', raw: articleRaw('Unspecified note') },
    ],
    store,
    env: { ...ENV, ...env },
    now: () => NOW,
    webauthn: {
      async generateRegistrationOptions() {
        return { challenge: 'Zml4ZWQtcmVnaXN0cmF0aW9uLWNoYWxsZW5nZQ' };
      },
      async generateAuthenticationOptions() {
        return { challenge: 'Zml4ZWQtbG9naW4tY2hhbGxlbmdl' };
      },
    },
  });
  const ownerCookie = `wiki_owner=${signSession(SECRET, { now: NOW })}`;

  function request(path, { owner = false, method = 'GET', body, headers = {} } = {}) {
    const requestHeaders = new Headers(headers);
    if (owner) requestHeaders.set('Cookie', ownerCookie);
    if (body !== undefined) requestHeaders.set('Content-Type', 'application/json');
    return app.fetch(new Request(new URL(path, ORIGIN), {
      method,
      headers: requestHeaders,
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    }));
  }

  function toggle(slug, visibility, options = {}) {
    return request('/api/visibility', {
      owner: true,
      method: 'POST',
      body: { slug, visibility },
      ...options,
    });
  }

  return { store, request, toggle };
}

// Inspect semantic attributes without depending on attribute order, quoting,
// whitespace, CSS classes, or the surrounding page layout.
function attributes(html, tagName, attributeName) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
  const pattern = new RegExp(`\\s${attributeName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  return tags.flatMap((tag) => {
    const match = tag.match(pattern);
    return match ? [match[1] ?? match[2] ?? match[3]] : [];
  });
}

function linkPaths(html) {
  return attributes(html, 'a', 'href').map((href) => new URL(href, ORIGIN).pathname);
}

function robotsDirectives(html) {
  return (html.match(/<meta\b[^>]*>/gi) ?? [])
    .filter((tag) => attributes(tag, 'meta', 'name').some((name) => name.toLowerCase() === 'robots'))
    .flatMap((tag) => attributes(tag, 'meta', 'content'))
    .flatMap((value) => value.toLowerCase().split(/[\s,]+/).filter(Boolean));
}

function assertHtml(response, status = 200) {
  assert.equal(response.status, status);
  assert.equal(response.headers.get('Content-Type'), 'text/html; charset=utf-8');
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
}

function assertNoindexHeader(response) {
  const directives = (response.headers.get('X-Robots-Tag') ?? '').toLowerCase().split(/[\s,]+/);
  assert.ok(directives.includes('noindex'), 'X-Robots-Tag includes noindex');
  assert.ok(directives.includes('nofollow'), 'X-Robots-Tag includes nofollow');
}

function assertJson(response, status) {
  assert.equal(response.status, status);
  assert.match(response.headers.get('Content-Type') ?? '', /^application\/json(?:\s*;|$)/i);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
}

async function sitemapPaths(response) {
  assert.equal(response.status, 200);
  assert.match(response.headers.get('Content-Type') ?? '', /^application\/xml(?:\s*;|$)/i);
  const xml = await response.text();
  return [...xml.matchAll(/<loc\b[^>]*>\s*([^<]+?)\s*<\/loc>/gi)]
    .map((match) => new URL(match[1], ORIGIN).pathname);
}

async function assertListed(request, slug, visible) {
  const index = await request('/');
  assertHtml(index);
  assert.equal(linkPaths(await index.text()).includes(`/${slug}`), visible, `index visibility of ${slug}`);
  // A session must never expand the sitemap's public-only contents.
  for (const owner of [false, true]) {
    const paths = await sitemapPaths(await request('/sitemap.xml', { owner }));
    assert.ok(paths.includes('/'), 'sitemap includes the index');
    assert.equal(paths.includes(`/${slug}`), visible, `sitemap visibility of ${slug}, owner=${owner}`);
  }
}

describe('parseArticle visibility', () => {
  const cases = [
    ['public', 'public', 'public'],
    ['private', 'private', 'private'],
    ['missing', undefined, 'private'],
    ['uppercase public', 'PUBLIC', 'public'],
    ['mixed case and padded public', '  PuBlIc  ', 'public'],
    ['uppercase private', 'PRIVATE', 'private'],
    ['padded private', '  private  ', 'private'],
    ['unknown string', 'unlisted', 'private'],
    ['empty string', '', 'private'],
    ['whitespace', '   ', 'private'],
    ['null', null, 'private'],
    ['boolean', true, 'private'],
    ['number', 1, 'private'],
    ['array', ['public'], 'private'],
    ['object', { visibility: 'public' }, 'private'],
  ];
  for (const [label, value, expected] of cases) {
    test(label, () => {
      assert.equal(parseArticle(articleRaw('Fixture note', value), 'fixture-note.md').visibility, expected);
    });
  }

  test('an article without frontmatter defaults to private', () => {
    assert.equal(parseArticle('Plain Markdown body.', 'plain-note.md').visibility, 'private');
  });

  // Read unchanged sources: the implementation step must add public frontmatter.
  for (const filename of ['chain-rule.md', 'spew.md']) {
    test(`real articles/${filename} parses as public`, async () => {
      const raw = await readFile(new URL(`../articles/${filename}`, import.meta.url), 'utf8');
      assert.equal(parseArticle(raw, filename).visibility, 'public');
    });
  }
});

describe('effectiveVisibility', () => {
  for (const visibility of ['public', 'private']) {
    test(`falls back to ${visibility} frontmatter without a matching override`, () => {
      const article = parseArticle(articleRaw('Fixture note', visibility), 'fixture-note.md');
      assert.equal(effectiveVisibility(article, {}), visibility);
      assert.equal(effectiveVisibility(article, { 'other-note': 'public' }), visibility);
    });
    for (const override of ['public', 'private']) {
      test(`${override} override wins over ${visibility} frontmatter`, () => {
        const article = parseArticle(articleRaw('Fixture note', visibility), 'fixture-note.md');
        assert.equal(effectiveVisibility(article, { 'fixture-note': override }), override);
      });
    }
  }
});

describe('owner sessions', () => {
  test('signSession produces the specified signed owner payload and verifies', () => {
    const token = signSession(SECRET, { now: NOW, ttlMs: 1000 });
    assert.match(token, /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
    const [payload, signature] = token.split('.');
    assert.deepEqual(JSON.parse(Buffer.from(payload, 'base64url').toString()), { sub: 'owner', exp: NOW + 1000 });
    assert.equal(signature, createHmac('sha256', SECRET).update(payload).digest('base64url'));
    assert.equal(verifySession(SECRET, token, NOW), true);
    assert.equal(verifySession(SECRET, token, NOW + 999), true);
  });

  test('default session lifetime is 30 days', () => {
    const [payload] = signSession(SECRET, { now: NOW }).split('.');
    assert.equal(JSON.parse(Buffer.from(payload, 'base64url').toString()).exp, NOW + 30 * 24 * 60 * 60 * 1000);
  });

  test('tampered payload and signature are rejected', () => {
    const token = signSession(SECRET, { now: NOW, ttlMs: 1000 });
    const [payload, signature] = token.split('.');
    const forgedPayload = Buffer.from(JSON.stringify({ sub: 'owner', exp: NOW + 2000 })).toString('base64url');
    const forgedSignature = (signature[0] === 'A' ? 'B' : 'A') + signature.slice(1);
    assert.equal(verifySession(SECRET, `${forgedPayload}.${signature}`, NOW), false);
    assert.equal(verifySession(SECRET, `${payload}.${forgedSignature}`, NOW), false);
  });

  test('expired sessions, including the exact expiration time, are rejected', () => {
    const token = signSession(SECRET, { now: NOW, ttlMs: 1000 });
    assert.equal(verifySession(SECRET, token, NOW + 1000), false);
    assert.equal(verifySession(SECRET, token, NOW + 1001), false);
  });

  test('wrong secret is rejected', () => {
    assert.equal(verifySession('another-fixed-test-secret', signSession(SECRET, { now: NOW }), NOW), false);
  });

  test('empty secret rejects even a correctly signed token using an empty key', () => {
    const payload = Buffer.from(JSON.stringify({ sub: 'owner', exp: NOW + 1000 })).toString('base64url');
    const signature = createHmac('sha256', '').update(payload).digest('base64url');
    assert.equal(verifySession('', `${payload}.${signature}`, NOW), false);
    assert.equal(verifySession('', signSession(SECRET, { now: NOW }), NOW), false);
  });

  test('malformed tokens return false', () => {
    const token = signSession(SECRET, { now: NOW });
    for (const malformed of ['', 'invalid', '.', 'e30.', '.c2ln', '%%%.%%%', `${token}.extra`]) {
      assert.equal(verifySession(SECRET, malformed, NOW), false, `reject ${JSON.stringify(malformed)}`);
    }
  });
});

describe('article access and listings', () => {
  test('logged-out private and unknown slugs have identical 404 bodies and headers', async () => {
    const { request } = fixture();
    const unknown = await request('/unknown-note');
    assertHtml(unknown, 404);
    const expectedBody = await unknown.text();
    const expectedHeaders = [...unknown.headers];
    for (const slug of ['sealed-note', 'unspecified-note', 'vault-note']) {
      const response = await request(`/${slug}`);
      assertHtml(response, 404);
      assert.equal(await response.text(), expectedBody, `${slug} must not disclose its existence`);
      assert.deepEqual([...response.headers], expectedHeaders, `${slug} has the same 404 headers`);
    }
  });

  test('owner can read repo and store private articles with header and meta noindex', async () => {
    const { request } = fixture();
    for (const slug of ['sealed-note', 'unspecified-note', 'vault-note']) {
      const response = await request(`/${slug}`, { owner: true });
      assertHtml(response);
      assertNoindexHeader(response);
      const html = await response.text();
      assert.ok(robotsDirectives(html).includes('noindex'));
      assert.ok(robotsDirectives(html).includes('nofollow'));
      assert.match(html, /Body for /);
    }
  });

  test('public article is readable without noindex for either viewer; repo copy wins', async () => {
    const { request } = fixture();
    for (const owner of [false, true]) {
      const response = await request('/public-note', { owner });
      assertHtml(response);
      assert.doesNotMatch(response.headers.get('X-Robots-Tag') ?? '', /noindex/i);
      const html = await response.text();
      assert.equal(robotsDirectives(html).includes('noindex'), false);
      assert.match(html, /Body for Public note\./);
      assert.doesNotMatch(html, /Store duplicate/);
    }
  });

  test('logged-out HTML has no owner toggle script or link to /owner', async () => {
    const { request } = fixture();
    for (const path of ['/', '/public-note', '/sealed-note', '/unknown-note']) {
      const response = await request(path);
      assertHtml(response, path === '/' || path === '/public-note' ? 200 : 404);
      const html = await response.text();
      const scripts = attributes(html, 'script', 'src').map((src) => new URL(src, ORIGIN).pathname);
      assert.equal(scripts.includes('/owner/toggle.js'), false, path);
      assert.equal(linkPaths(html).some((link) => link === '/owner' || link.startsWith('/owner/')), false, path);
    }
  });

  test('index hides private articles when logged out and includes them for owner', async () => {
    const { request } = fixture();
    for (const owner of [false, true]) {
      const response = await request('/', { owner });
      assertHtml(response);
      const html = await response.text();
      const paths = linkPaths(html);
      assert.ok(paths.includes('/public-note'));
      for (const slug of ['sealed-note', 'unspecified-note', 'vault-note']) {
        assert.equal(paths.includes(`/${slug}`), owner, `${slug}, owner=${owner}`);
      }
      if (owner) assert.match(html, />\s*Private\s*</i);
    }
  });

  test('sitemap excludes all private articles even for owner', async () => {
    const { request } = fixture();
    for (const owner of [false, true]) {
      const paths = await sitemapPaths(await request('/sitemap.xml', { owner }));
      assert.deepEqual([...paths].sort(), ['/', '/public-note']);
    }
  });

  test('initial overrides affect access, index and sitemap in both directions', async () => {
    const { request } = fixture({ overrides: { 'public-note': 'private', 'sealed-note': 'public' } });
    assertHtml(await request('/public-note'), 404);
    const ownerResponse = await request('/public-note', { owner: true });
    assertHtml(ownerResponse);
    assertNoindexHeader(ownerResponse);
    const published = await request('/sealed-note');
    assertHtml(published);
    assert.equal(robotsDirectives(await published.text()).includes('noindex'), false);
    await assertListed(request, 'public-note', false);
    await assertListed(request, 'sealed-note', true);
  });

  test('expired and wrong-secret cookies do not grant private access', async () => {
    const { request } = fixture();
    const tokens = [
      signSession(SECRET, { now: NOW - 2000, ttlMs: 1000 }),
      signSession('another-fixed-test-secret', { now: NOW }),
    ];
    for (const token of tokens) {
      assertHtml(await request('/sealed-note', { headers: { Cookie: `wiki_owner=${token}` } }), 404);
    }
  });
});

describe('__p routing', () => {
  test('query pathname takes precedence over the function pathname', async () => {
    const { request } = fixture();
    const direct = await request('/public-note');
    const rewritten = await request('/api/index?__p=%2Fpublic-note');
    assertHtml(rewritten);
    assert.equal(await rewritten.text(), await direct.text());
    assertHtml(await request('/api/index?__p=%2F'), 200);
    assertHtml(await request('/public-note?__p=%2Funknown-note'), 404);
  });

  test('rewritten paths enforce private access and sitemap filtering', async () => {
    const { request } = fixture();
    assertHtml(await request('/api/index?__p=%2Fsealed-note'), 404);
    const ownerResponse = await request('/api/index?__p=%2Fsealed-note', { owner: true });
    assertHtml(ownerResponse);
    assertNoindexHeader(ownerResponse);
    const paths = await sitemapPaths(await request('/api/index?__p=%2Fsitemap.xml', { owner: true }));
    assert.deepEqual([...paths].sort(), ['/', '/public-note']);
  });

  test('rewritten visibility API updates the same live app', async () => {
    const { request } = fixture();
    const response = await request('/api/index?__p=%2Fapi%2Fvisibility', {
      owner: true,
      method: 'POST',
      headers: { Origin: ORIGIN },
      body: { slug: 'sealed-note', visibility: 'public' },
    });
    assertJson(response, 200);
    assert.deepEqual(await response.json(), { slug: 'sealed-note', visibility: 'public' });
    assertHtml(await request('/sealed-note'));
  });
});

describe('POST /api/visibility', () => {
  test('logged-out request returns 401 without changing overrides', async () => {
    const { store, toggle } = fixture();
    assertJson(await toggle('sealed-note', 'public', { owner: false }), 401);
    assert.deepEqual(await store.getOverrides(), {});
  });

  test('owner with a mismatched Origin receives 403 without changing overrides', async () => {
    const { store, toggle } = fixture();
    assertJson(await toggle('sealed-note', 'public', { headers: { Origin: 'https://other.example.test' } }), 403);
    assert.deepEqual(await store.getOverrides(), {});
  });

  test('invalid visibility values return 400 without changing overrides', async () => {
    const { store, request } = fixture();
    for (const visibility of ['PUBLIC', ' public ', 'unlisted', '', null, true, 1, ['public'], { value: 'public' }, undefined]) {
      const response = await request('/api/visibility', {
        owner: true,
        method: 'POST',
        body: { slug: 'sealed-note', visibility },
      });
      assertJson(response, 400);
    }
    assert.deepEqual(await store.getOverrides(), {});
  });

  test('unknown slug returns 404 without creating an override', async () => {
    const { store, toggle } = fixture();
    assertJson(await toggle('unknown-note', 'public'), 404);
    assert.deepEqual(await store.getOverrides(), {});
  });

  for (const slug of ['sealed-note', 'vault-note']) {
    test(`${slug} toggles public then private with immediate article, index and sitemap effects`, async () => {
      const { store, request, toggle } = fixture();
      assertHtml(await request(`/${slug}`), 404);
      await assertListed(request, slug, false);

      // Origin is optional; when present, the configured origin is accepted.
      const published = await toggle(slug, 'public', { headers: { Origin: ORIGIN } });
      assertJson(published, 200);
      assert.deepEqual(await published.json(), { slug, visibility: 'public' });
      assert.equal((await store.getOverrides())[slug], 'public');
      const publicPage = await request(`/${slug}`);
      assertHtml(publicPage);
      const publicHtml = await publicPage.text();
      assert.match(publicHtml, slug === 'vault-note' ? /Body for Vault note\./ : /Body for Sealed note\./);
      assert.equal(robotsDirectives(publicHtml).includes('noindex'), false);
      assert.doesNotMatch(publicPage.headers.get('X-Robots-Tag') ?? '', /noindex/i);
      await assertListed(request, slug, true);

      const hidden = await toggle(slug, 'private');
      assertJson(hidden, 200);
      assert.deepEqual(await hidden.json(), { slug, visibility: 'private' });
      assert.equal((await store.getOverrides())[slug], 'private');
      const privatePage = await request(`/${slug}`);
      const unknownPage = await request('/unknown-note');
      assertHtml(privatePage, 404);
      assert.equal(await privatePage.text(), await unknownPage.text());
      assert.deepEqual([...privatePage.headers], [...unknownPage.headers]);
      await assertListed(request, slug, false);
      const ownerPage = await request(`/${slug}`, { owner: true });
      assertHtml(ownerPage);
      assertNoindexHeader(ownerPage);
    });
  }
});

describe('enrollment and owner routes', () => {
  test('register/options rejects missing and wrong enrollment tokens', async () => {
    const { store, request } = fixture();
    for (const body of [{}, { token: '' }, { token: 'wrong-fixed-token' }]) {
      assertJson(await request('/api/owner/register/options', { method: 'POST', body }), 403);
    }
    assert.equal(await store.getCredential(), null);
  });

  test('register/options stays closed after a credential exists, even with the right token', async () => {
    const { store, request } = fixture({ credential: CREDENTIAL });
    assertJson(await request('/api/owner/register/options', {
      method: 'POST',
      body: { token: ENROLL_TOKEN },
    }), 403);
    assert.deepEqual(await store.getCredential(), CREDENTIAL);
  });

  test('register/options returns a challenge and secured wiki_chal cookie with the right token', async () => {
    const { store, request } = fixture();
    const response = await request('/api/owner/register/options', {
      method: 'POST',
      body: { token: ENROLL_TOKEN },
    });
    assertJson(response, 200);
    const options = await response.json();
    assert.equal(typeof options.challenge, 'string');
    assert.ok(options.challenge.length > 0);
    const cookie = response.headers.get('Set-Cookie') ?? '';
    assert.match(cookie, /(?:^|,\s*)wiki_chal=[^;\s,]+/);
    assert.match(cookie, /;\s*HttpOnly(?:;|$)/i);
    assert.match(cookie, /;\s*Secure(?:;|$)/i);
    assert.match(cookie, /;\s*SameSite=Strict(?:;|$)/i);
    assert.match(cookie, /;\s*Path=\/api\/owner(?:;|$)/i);
    assert.equal(await store.getCredential(), null, 'options alone do not enroll a credential');
  });

  test('enrollment is disabled when no enrollment token is configured', async () => {
    const { request } = fixture({ env: { WIKI_ENROLL_TOKEN: '' } });
    for (const token of ['', ENROLL_TOKEN]) {
      assertJson(await request('/api/owner/register/options', { method: 'POST', body: { token } }), 403);
    }
  });

  test('/owner has a noindex header for logged-out and signed-in viewers', async () => {
    const { request } = fixture();
    for (const owner of [false, true]) {
      const response = await request('/owner', { owner });
      assertHtml(response);
      assertNoindexHeader(response);
    }
  });

  test('login/options returns 404 when no credential exists', async () => {
    const { request } = fixture();
    assertJson(await request('/api/owner/login/options', { method: 'POST', body: {} }), 404);
  });
});

test('robots.txt disallows owner and API routes and advertises the configured sitemap', async () => {
  const { request } = fixture();
  for (const path of ['/robots.txt', '/api/index?__p=%2Frobots.txt']) {
    const response = await request(path);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), `User-agent: *\nDisallow: /owner\nDisallow: /api/\nSitemap: ${ORIGIN}/sitemap.xml\n`);
  }
});
