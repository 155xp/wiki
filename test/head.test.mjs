import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { signSession } from '../lib/auth.mjs';
import { createMemoryStore } from '../lib/store.mjs';
import { createApp } from '../lib/app.mjs';

const NOW = Date.UTC(2026, 9, 28, 12);
const SECRET = 'wiki-test-session-secret-fixed-0123456789abcdef';
const ORIGIN = 'https://wiki.example.test';

function articleRaw(title, visibility) {
  return `---\ntitle: ${JSON.stringify(title)}\nvisibility: ${visibility}\n---\n\nBody for ${title}.`;
}

function fixture() {
  const app = createApp({
    publicArticles: [
      { filename: 'public-note.md', raw: articleRaw('Public note', 'public') },
      { filename: 'sealed-note.md', raw: articleRaw('Sealed note', 'private') },
    ],
    store: createMemoryStore({
      privateArticles: { 'vault-note': articleRaw('Vault note', 'private') },
    }),
    env: { WIKI_SESSION_SECRET: SECRET, WIKI_ORIGIN: ORIGIN },
    now: () => NOW,
  });
  const ownerCookie = `wiki_owner=${signSession(SECRET, { now: NOW })}`;

  return function request(path, { method = 'GET', owner = false } = {}) {
    return app.fetch(new Request(new URL(path, ORIGIN), {
      method,
      headers: owner ? { Cookie: ownerCookie } : {},
    }));
  };
}

async function assertHeadMatchesGet(request, path, { owner = false, status = 200 } = {}) {
  const get = await request(path, { owner });
  const head = await request(path, { owner, method: 'HEAD' });
  assert.equal(get.status, status);
  assert.equal(head.status, get.status);
  assert.deepEqual([...head.headers], [...get.headers]);
  assert.equal(await head.text(), '');
  return head;
}

describe('HEAD requests', () => {
  test('public article returns 200 with GET headers and an empty body', async () => {
    await assertHeadMatchesGet(fixture(), '/public-note');
  });

  test('private slugs return 404 with GET headers and an empty body when logged out', async () => {
    const request = fixture();
    for (const path of ['/sealed-note', '/vault-note']) {
      await assertHeadMatchesGet(request, path, { status: 404 });
    }
  });

  test('owner can access private articles with noindex and an empty body', async () => {
    const request = fixture();
    for (const path of ['/sealed-note', '/vault-note']) {
      const head = await assertHeadMatchesGet(request, path, { owner: true });
      assert.equal(head.headers.get('X-Robots-Tag'), 'noindex, nofollow');
    }
  });
});
