import * as server from '@simplewebauthn/server';
import { parseArticle, effectiveVisibility, renderArticle, renderIndex, renderNotFound, renderSitemap } from './render.mjs';
import { constantTimeEqual, signSession, verifySession, parseCookies, sessionCookie, clearSessionCookie,
  signChallenge, verifyChallenge, challengeCookie, clearChallengeCookie } from './auth.mjs';
import { ownerPage } from './ui.mjs';

const noindex = { 'X-Robots-Tag': 'noindex, nofollow' };
const response = (body, type, status = 200, headers = {}) => new Response(body, {
  status, headers: { 'Content-Type': type, 'Cache-Control': 'no-store', ...headers },
});
const html = (body, status = 200, headers = {}) => response(body, 'text/html; charset=utf-8', status, headers);
const json = (body, status = 200, headers = {}) => response(JSON.stringify(body), 'application/json', status, headers);
const error = (status) => json({ error: status }, status);
const notFound = () => html(renderNotFound(), 404);

export function createApp({ publicArticles, store, env = {}, now = () => Date.now(), webauthn = server }) {
  const repo = publicArticles.map(({ raw, filename }) => parseArticle(raw, filename));
  const origin = env.WIKI_ORIGIN || 'https://wiki.enci.dev';
  const rpID = env.WIKI_RP_ID || new URL(origin).hostname;
  const secret = env.WIKI_SESSION_SECRET;
  const validToken = (token) => Boolean(env.WIKI_ENROLL_TOKEN) && constantTimeEqual(token, env.WIKI_ENROLL_TOKEN);

  async function loadArticles() {
    let privateArticles = [];
    try {
      privateArticles = (await store.listPrivate()).map(({ raw, filename }) => parseArticle(raw, filename));
    } catch { console.warn('Private articles unavailable'); }
    const articles = new Map(privateArticles.map((a) => [a.slug, a]));
    for (const a of repo) articles.set(a.slug, a);
    return [...articles.values()];
  }

  async function handle(request) {
    const url = new URL(request.url);
    const path = url.searchParams.has('__p') ? url.searchParams.get('__p') : url.pathname;
    const cookies = parseCookies(request.headers.get('Cookie'));
    const owner = verifySession(secret, cookies.wiki_owner, now());

    if (request.method === 'POST' && (path === '/api/visibility' || path.startsWith('/api/owner/'))) {
      if (path === '/api/visibility' && !owner) return error(401);
      const requestOrigin = request.headers.get('Origin');
      if (requestOrigin !== null && requestOrigin !== origin) return error(403);
      let body;
      try {
        if (request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return error(400);
        body = await request.json();
        if (!body || typeof body !== 'object' || Array.isArray(body)) return error(400);
      } catch { return error(400); }

      if (path === '/api/visibility') {
        const { slug, visibility } = body;
        if (visibility !== 'public' && visibility !== 'private') return error(400);
        if (!(await loadArticles()).some((a) => a.slug === slug)) return error(404);
        await store.setOverride(slug, visibility);
        return json({ slug, visibility });
      }
      if (path === '/api/owner/logout') return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
      const route = path.match(/^\/api\/owner\/(register|login)\/(options|verify)$/);
      if (!route) return notFound();
      const [, kind, step] = route;
      if (kind === 'register' && !validToken(body.token)) return error(403);
      const credential = await store.getCredential();
      if (kind === 'register' && credential) return error(403);
      if (kind === 'login' && !credential) return error(step === 'options' ? 404 : 401);
      if (!secret) return error(503);

      if (step === 'options') {
        const options = kind === 'register'
          ? await webauthn.generateRegistrationOptions({ rpName: 'wiki', rpID, userName: 'owner', userID: new TextEncoder().encode('owner'),
            attestationType: 'none', authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' } })
          : await webauthn.generateAuthenticationOptions({ rpID, allowCredentials: [{ id: credential.id, transports: credential.transports }], userVerification: 'preferred' });
        return json(options, 200, { 'Set-Cookie': challengeCookie(signChallenge(secret, options.challenge, now())) });
      }

      const expectedChallenge = verifyChallenge(secret, cookies.wiki_chal, now());
      const failed = () => json({ error: kind === 'register' ? 400 : 401 }, kind === 'register' ? 400 : 401, { 'Set-Cookie': clearChallengeCookie() });
      if (!expectedChallenge) return failed();
      let result;
      try {
        const options = { response: body.response, expectedChallenge, expectedOrigin: origin, expectedRPID: rpID };
        result = kind === 'register'
          ? await webauthn.verifyRegistrationResponse(options)
          : await webauthn.verifyAuthenticationResponse({ ...options, credential: { ...credential, publicKey: Buffer.from(credential.publicKey, 'base64url') } });
      } catch { return failed(); }
      if (!result.verified) return failed();
      if (kind === 'register') {
        const registered = result.registrationInfo.credential;
        await store.setCredential({ id: registered.id, publicKey: Buffer.from(registered.publicKey).toString('base64url'),
          counter: registered.counter, transports: registered.transports || body.response?.response?.transports || [] });
      } else {
        await store.setCredential({ ...credential, counter: result.authenticationInfo.newCounter });
      }
      const resultResponse = json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(signSession(secret, { now: now() })) });
      resultResponse.headers.append('Set-Cookie', clearChallengeCookie());
      return resultResponse;
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') return notFound();
    if (path === '/robots.txt') return response(`User-agent: *\nDisallow: /owner\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`, 'text/plain; charset=utf-8');
    if (path === '/owner') {
      const canEnroll = validToken(url.searchParams.get('enroll')) && !(await store.getCredential());
      return html(ownerPage({ signedIn: owner, canEnroll }), 200, noindex);
    }
    const match = path.match(/^\/([a-z0-9-]+)(\.html)?$/);
    if (path !== '/' && path !== '/sitemap.xml' && !match) return notFound();
    let articles, overrides;
    try {
      [articles, overrides] = await Promise.all([loadArticles(), store.getOverrides()]);
    } catch {
      console.warn('Visibility overrides unavailable');
      articles = repo;
      overrides = {};
    }
    const visibilityOf = (a) => effectiveVisibility(a, overrides);
    const publicList = articles.filter((a) => visibilityOf(a) === 'public');
    const visible = owner ? articles : publicList;
    if (path === '/sitemap.xml') return response(renderSitemap(publicList, origin), 'application/xml');
    if (path === '/') return html(renderIndex(visible, { owner, visibilityOf }));
    const article = visible.find((a) => a.slug === match[1]);
    if (!article) return notFound();
    if (match[2]) return response(null, 'text/html; charset=utf-8', 308, { Location: `/${article.slug}` });
    const visibility = visibilityOf(article);
    return html(renderArticle(article, { slugs: new Set(visible.map((a) => a.slug)), owner, visibility }), 200, visibility === 'private' ? noindex : {});
  }

  return { async fetch(request) {
    let result;
    try { result = await handle(request); }
    catch {
      console.warn('Wiki request unavailable');
      result = new URL(request.url).pathname.startsWith('/api/') || request.method === 'POST'
        ? error(503) : html('Service unavailable', 503);
    }
    return request.method === 'HEAD' ? new Response(null, result) : result;
  } };
}
