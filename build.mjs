// Static build: articles/<slug>.md -> dist/<slug>.html, dist/index.html
import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import footnote from 'markdown-it-footnote';
import matter from 'gray-matter';
import katex from 'katex';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const SRC = path.join(ROOT, 'articles');
const OUT = path.join(ROOT, 'dist');
const CSS = fs.readFileSync(path.join(ROOT, 'site.css'), 'utf8');

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slugify = (s) => String(s).toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fmtDate = (d) => { const x = new Date(d); return isNaN(x) ? '' : `${x.getUTCDate()} ${MONTHS[x.getUTCMonth()]} ${x.getUTCFullYear()}`; };
const isoDate = (d) => { const x = new Date(d); return isNaN(x) ? '' : x.toISOString().slice(0, 10); };

// 1. Load articles
const files = fs.existsSync(SRC) ? fs.readdirSync(SRC).filter((f) => f.endsWith('.md')) : [];
const articles = files.map((f) => {
  const raw = fs.readFileSync(path.join(SRC, f), 'utf8');
  const { data, content } = matter(raw);
  const slug = slugify(data.slug || f.replace(/\.md$/, ''));
  const stat = fs.statSync(path.join(SRC, f));
  const updated = data.updated || data.date || stat.mtime;
  return { slug, data, content, title: data.title || slug, description: data.description || '', updated };
});
const bySlug = new Map(articles.map((a) => [a.slug, a]));

// 2. Markdown renderer with [[wikilinks]] and heading ids
function makeMd() {
  const md = new MarkdownIt({ html: false, linkify: true, typographer: true });
  md.use(footnote);
  // Math: $$...$$ blocks and $...$ inline, rendered to HTML by KaTeX at build time
  const tex = (src, display) => katex.renderToString(src, { displayMode: display, throwOnError: false, output: 'html' });
  md.block.ruler.before('fence', 'math_block', (state, start, end, silent) => {
    const first = state.src.slice(state.bMarks[start] + state.tShift[start], state.eMarks[start]);
    if (!first.startsWith('$$')) return false;
    let body = first.slice(2), line = start;
    if (body.trim().endsWith('$$') && body.trim().length > 2) body = body.trim().slice(0, -2);
    else {
      let found = false;
      while (++line < end) {
        const l = state.src.slice(state.bMarks[line] + state.tShift[line], state.eMarks[line]);
        if (l.trim().endsWith('$$')) { body += '\n' + l.trim().slice(0, -2); found = true; break; }
        body += '\n' + l;
      }
      if (!found) return false;
    }
    if (silent) return true;
    const tok = state.push('math_block', 'div', 0);
    tok.content = body; tok.map = [start, line + 1];
    state.line = line + 1;
    return true;
  });
  md.inline.ruler.after('escape', 'math_inline', (state, silent) => {
    const src = state.src, pos = state.pos;
    if (src[pos] !== '$' || src[pos + 1] === '$' || /\s/.test(src[pos + 1] || ' ')) return false;
    let end = pos + 1;
    while ((end = src.indexOf('$', end)) > 0 && src[end - 1] === '\\') end++;
    if (end < 0 || /\s/.test(src[end - 1]) || /\d/.test(src[end + 1] || '')) return false;
    if (!silent) { const tok = state.push('math_inline', 'span', 0); tok.content = src.slice(pos + 1, end); }
    state.pos = end + 1;
    return true;
  });
  md.renderer.rules.math_block = (t, i) => `<div class="math-display">${tex(t[i].content, true)}</div>\n`;
  md.renderer.rules.math_inline = (t, i) => tex(t[i].content, false);
  // footnote output -> References section
  md.renderer.rules.footnote_block_open = () => '<section class="references" id="references"><h2>References</h2>\n<ol class="refs">\n';
  md.renderer.rules.footnote_block_close = () => '</ol>\n</section>\n';
  md.renderer.rules.footnote_caption = (tokens, idx) => {
    let n = Number(tokens[idx].meta.id + 1).toString();
    return n;
  };
  // Wikipedia-style backlinks: ^ for one use, ^ a b c for several
  md.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
    let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
    const sub = tokens[idx].meta.subId;
    if (sub > 0) id += ':' + sub;
    const count = env.footnotes.list[tokens[idx].meta.id].count;
    const label = count > 1 ? String.fromCharCode(97 + sub) : '^';
    const caret = count > 1 && sub === 0 ? '<span class="caret">^</span> ' : '';
    return ` ${caret}<a href="#fnref${id}" class="footnote-backref">${label}</a>`;
  };
  // [[target]] or [[target|label]]
  md.inline.ruler.before('link', 'wikilink', (state, silent) => {
    const src = state.src, pos = state.pos;
    if (src.charCodeAt(pos) !== 0x5b || src.charCodeAt(pos + 1) !== 0x5b) return false;
    const end = src.indexOf(']]', pos + 2);
    if (end < 0) return false;
    const inner = src.slice(pos + 2, end);
    if (!inner || inner.includes('\n')) return false;
    if (!silent) {
      const [target, label] = inner.split('|');
      const tok = state.push('wikilink', '', 0);
      tok.meta = { target: target.trim(), label: (label || target).trim() };
    }
    state.pos = end + 2;
    return true;
  });
  md.renderer.rules.wikilink = (tokens, idx) => {
    const { target, label } = tokens[idx].meta;
    const s = slugify(target);
    if (bySlug.has(s)) return `<a href="/${s}">${esc(label)}</a>`;
    return `<span class="missing" title="No article yet: ${esc(target)}">${esc(label)}</span>`;
  };
  // ids on headings
  md.core.ruler.push('heading_ids', (state) => {
    const seen = new Map();
    const toks = state.tokens;
    for (let i = 0; i < toks.length; i++) {
      if (toks[i].type !== 'heading_open') continue;
      const text = toks[i + 1].children.filter((c) => c.type === 'text' || c.type === 'code_inline').map((c) => c.content).join('');
      let id = slugify(text) || 'section';
      const n = seen.get(id) || 0; seen.set(id, n + 1);
      if (n) id += '-' + n;
      toks[i].attrSet('id', id);
      toks[i].meta = { text, id, level: Number(toks[i].tag.slice(1)) };
    }
  });
  // external links open normally but mark rel
  const defaultLinkOpen = md.renderer.rules.link_open || ((t, i, o, e, s) => s.renderToken(t, i, o));
  md.renderer.rules.link_open = (t, i, o, e, s) => {
    const href = t[i].attrGet('href') || '';
    if (/^https?:\/\//.test(href)) t[i].attrSet('rel', 'noopener');
    return defaultLinkOpen(t, i, o, e, s);
  };
  return md;
}

function toc(tokens) {
  const heads = tokens.filter((t) => t.type === 'heading_open' && t.meta && (t.meta.level === 2 || t.meta.level === 3));
  if (heads.length < 2) return '';
  let h2 = 0, h3 = 0, out = '<nav class="toc" aria-label="Contents"><div class="toc-title">Contents</div><ol>';
  let open3 = false;
  for (const h of heads) {
    if (h.meta.level === 2) {
      if (open3) { out += '</ol>'; open3 = false; }
      if (h2) out += '</li>';
      h2++; h3 = 0;
      out += `<li><a href="#${h.meta.id}"><span class="tocnum">${h2}</span> ${esc(h.meta.text)}</a>`;
    } else {
      if (!open3) { out += '<ol>'; open3 = true; }
      h3++;
      out += `<li><a href="#${h.meta.id}"><span class="tocnum">${h2}.${h3}</span> ${esc(h.meta.text)}</a></li>`;
    }
  }
  if (open3) out += '</ol>';
  if (h2) out += '</li>';
  return out + '</ol></nav>';
}

function infobox(a) {
  const ib = a.data.infobox;
  if (!ib || typeof ib !== 'object') return '';
  const md = makeMd();
  const rows = Object.entries(ib).filter(([k]) => k !== 'title' && k !== 'image').map(([k, v]) => {
    const val = Array.isArray(v) ? v.join(', ') : v instanceof Date ? fmtDate(v) : String(v);
    return `<tr><th scope="row">${esc(k)}</th><td>${md.renderInline(val)}</td></tr>`;
  }).join('');
  return `<aside class="infobox"><div class="infobox-title">${esc(ib.title || a.title)}</div><table>${rows}</table></aside>`;
}

const page = ({ title, description, body, canonical, math = false }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${esc(title)}</title>
${description ? `<meta name="description" content="${esc(description)}">` : ''}
<meta property="og:title" content="${esc(title)}">
${description ? `<meta property="og:description" content="${esc(description)}">` : ''}
<link rel="canonical" href="https://wiki.enci.dev${canonical}">
${math ? '<link rel="stylesheet" href="/katex/katex.min.css">' : ''}
<style>${CSS}</style>
</head>
<body>
<header class="site"><a class="wordmark" href="/">wiki</a></header>
${body}
</body>
</html>
`;

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
// KaTeX stylesheet + fonts, self-hosted
const KATEX = path.join(ROOT, 'node_modules/katex/dist');
fs.mkdirSync(path.join(OUT, 'katex/fonts'), { recursive: true });
fs.copyFileSync(path.join(KATEX, 'katex.min.css'), path.join(OUT, 'katex/katex.min.css'));
for (const f of fs.readdirSync(path.join(KATEX, 'fonts')).filter((f) => f.endsWith('.woff2'))) fs.copyFileSync(path.join(KATEX, 'fonts', f), path.join(OUT, 'katex/fonts', f));

for (const a of articles) {
  const md = makeMd();
  const env = {};
  const tokens = md.parse(a.content, env);
  const html = md.renderer.render(tokens, md.options, env);
  // split lead (before first h2) from the rest so Contents sits after the lead, as on Wikipedia
  const firstH2 = html.search(/<h2[ >]/);
  const lead = firstH2 < 0 ? html : html.slice(0, firstH2);
  const rest = firstH2 < 0 ? '' : html.slice(firstH2);
  const body = `<main class="article">
<h1 class="title">${esc(a.title)}</h1>
<div class="byline">${a.description ? esc(a.description) + ' · ' : ''}Updated <time datetime="${isoDate(a.updated)}">${fmtDate(a.updated)}</time></div>
<div class="content">
${infobox(a)}
${lead}
${toc(tokens)}
${rest}
</div>
</main>`;
  fs.writeFileSync(path.join(OUT, `${a.slug}.html`), page({ title: `${a.title} · wiki`, description: a.description, body, canonical: `/${a.slug}`, math: /class="katex/.test(html) }));
}

const list = [...articles].sort((x, y) => new Date(y.updated) - new Date(x.updated));
const indexBody = `<main class="index">
${list.length ? `<ul class="articles">${list.map((a) => `<li><a class="t" href="/${a.slug}">${esc(a.title)}</a>${a.description ? `<span class="d">${esc(a.description)}</span>` : ''}<time datetime="${isoDate(a.updated)}">${fmtDate(a.updated)}</time></li>`).join('\n')}</ul>` : '<p class="empty">No articles yet.</p>'}
</main>`;
fs.writeFileSync(path.join(OUT, 'index.html'), page({ title: 'wiki', description: 'Articles', body: indexBody, canonical: '/' }));
fs.writeFileSync(path.join(OUT, '404.html'), page({ title: 'Not found · wiki', description: '', body: '<main class="index"><p class="empty">No article at this address. <a href="/">All articles</a></p></main>', canonical: '/' }));
console.log(`built ${articles.length} article(s) -> dist/`);
