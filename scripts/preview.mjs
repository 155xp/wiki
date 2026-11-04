// Local preview: npm run preview, then open http://localhost:4321
// Serves articles/ through the real request handler. If a wiki-private clone sits next to this
// repo (or WIKI_PRIVATE_DIR points at one), its articles are shown too, forced public locally.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createApp } from '../lib/app.mjs';
import { createMemoryStore } from '../lib/store.mjs';
import { parseArticle } from '../lib/render.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const port = Number(process.env.PORT) || 4321;
const readDir = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')) : [])
  .map((filename) => ({ filename, raw: fs.readFileSync(path.join(dir, filename), 'utf8') }));

const publicArticles = readDir(path.join(root, 'articles'));
const privateDir = process.env.WIKI_PRIVATE_DIR || path.join(root, '..', 'wiki-private', 'articles');
const privateArticles = Object.fromEntries(readDir(privateDir).map(({ filename, raw }) => [filename.replace(/\.md$/, ''), raw]));
const overrides = Object.fromEntries(Object.entries(privateArticles).map(([name, raw]) => [parseArticle(raw, `${name}.md`).slug, 'public']));
const app = createApp({
  publicArticles,
  store: createMemoryStore({ privateArticles, overrides }),
  env: { WIKI_ORIGIN: `http://localhost:${port}` },
});

const types = { '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2' };
http.createServer(async (req, res) => {
  const url = new URL(`http://localhost:${port}${req.url}`);
  const file = path.join(root, 'dist', path.normalize(url.pathname));
  if (file.startsWith(path.join(root, 'dist')) && /^\/(katex|owner)\//.test(url.pathname) && fs.existsSync(file)) {
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    return fs.createReadStream(file).pipe(res);
  }
  const response = await app.fetch(new Request(url, { method: req.method, headers: req.headers }));
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}).listen(port, () => {
  console.log(`${publicArticles.length} public and ${Object.keys(privateArticles).length} private article(s) at http://localhost:${port}`);
});
