import { get, list, put, BlobNotFoundError } from '@vercel/blob';

export function createMemoryStore({ privateArticles = {}, overrides = {}, credential = null } = {}) {
  privateArticles = structuredClone(privateArticles);
  overrides = { ...overrides };
  credential = structuredClone(credential);
  return {
    async listPrivate() { return Object.entries(privateArticles).map(([slug, raw]) => ({ filename: `${slug}.md`, raw })); },
    async getPrivate(slug) { return Object.hasOwn(privateArticles, slug) ? privateArticles[slug] : null; },
    async getOverrides() { return { ...overrides }; },
    async setOverride(slug, visibility) { overrides = { ...overrides, [slug]: visibility }; },
    async getCredential() { return structuredClone(credential); },
    async setCredential(value) { credential = structuredClone(value); },
  };
}

export function createBlobStore() {
  async function read(pathname) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
    try {
      const blob = await get(pathname, { access: 'private', useCache: false });
      return blob ? await new Response(blob.stream).text() : null;
    } catch (error) {
      if (error instanceof BlobNotFoundError) return null;
      throw error;
    }
  }
  const readJSON = async (pathname, fallback) => {
    const raw = await read(pathname);
    return raw === null ? fallback : JSON.parse(raw);
  };
  const writeJSON = (pathname, value) => put(pathname, JSON.stringify(value), {
    access: 'private', allowOverwrite: true, addRandomSuffix: false, contentType: 'application/json',
  });
  return {
    async listPrivate() {
      if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
      const articles = [];
      let cursor;
      do {
        const page = await list({ prefix: 'articles/', ...(cursor ? { cursor } : {}) });
        const pageArticles = await Promise.all(page.blobs.map(async ({ pathname }) => {
          if (!/^articles\/[a-z0-9-]+\.md$/.test(pathname)) return null;
          const raw = await read(pathname);
          return raw === null ? null : { filename: pathname.slice('articles/'.length), raw };
        }));
        articles.push(...pageArticles.filter(Boolean));
        cursor = page.hasMore ? page.cursor : undefined;
      } while (cursor);
      return articles;
    },
    getPrivate: (slug) => read(`articles/${slug}.md`),
    getOverrides: () => readJSON('meta/overrides.json', {}),
    async setOverride(slug, visibility) {
      const overrides = await readJSON('meta/overrides.json', {});
      await writeJSON('meta/overrides.json', { ...overrides, [slug]: visibility });
    },
    getCredential: () => readJSON('owner/credential.json', null),
    setCredential: (credential) => writeJSON('owner/credential.json', credential),
  };
}
