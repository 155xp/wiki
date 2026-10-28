import fs from 'node:fs';
import { parseArticle, effectiveVisibility, renderArticle } from './lib/render.mjs';

const ROOT = new URL('.', import.meta.url);
const SRC = new URL('articles/', ROOT);
const OUT = new URL('dist/', ROOT);
const articles = fs.readdirSync(SRC).filter((f) => f.endsWith('.md')).map((filename) => parseArticle(fs.readFileSync(new URL(filename, SRC), 'utf8'), filename));
const slugs = new Set(articles.map((a) => a.slug));
for (const article of articles) {
  renderArticle(article, { slugs });
  if (effectiveVisibility(article, {}) === 'private') console.warn(`private article: ${article.slug}`);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(new URL('katex/fonts/', OUT), { recursive: true });
const KATEX = new URL('node_modules/katex/dist/', ROOT);
fs.copyFileSync(new URL('katex.min.css', KATEX), new URL('katex/katex.min.css', OUT));
for (const f of fs.readdirSync(new URL('fonts/', KATEX)).filter((f) => f.endsWith('.woff2'))) {
  fs.copyFileSync(new URL(`fonts/${f}`, KATEX), new URL(`katex/fonts/${f}`, OUT));
}
fs.mkdirSync(new URL('owner/', OUT), { recursive: true });
fs.copyFileSync(new URL('node_modules/@simplewebauthn/browser/dist/bundle/index.umd.min.js', ROOT), new URL('owner/webauthn.js', OUT));
const OWNER = new URL('public/owner/', ROOT);
if (fs.existsSync(OWNER)) {
  for (const f of fs.readdirSync(OWNER).filter((f) => f.endsWith('.js'))) fs.copyFileSync(new URL(f, OWNER), new URL(`owner/${f}`, OUT));
}
console.log(`built ${articles.length} article(s)`);
