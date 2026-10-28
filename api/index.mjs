import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { createApp } from '../lib/app.mjs';
import { createBlobStore } from '../lib/store.mjs';

let app;
async function loadApp() {
  const directory = path.join(process.cwd(), 'articles');
  const files = (await readdir(directory)).filter((name) => name.endsWith('.md'));
  const publicArticles = await Promise.all(files.map(async (filename) => ({ filename, raw: await readFile(path.join(directory, filename), 'utf8') })));
  return createApp({ publicArticles, store: createBlobStore(), env: process.env });
}

export default { async fetch(request) {
  app ||= loadApp();
  return (await app).fetch(request);
} };
