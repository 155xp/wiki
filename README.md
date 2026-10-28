# wiki

Markdown articles rendered as a Wikipedia-style static site, served at https://wiki.enci.dev.

Markdown in `articles/` (public) and in the private repo `155xp/wiki-private` (private) is the source of truth. One Vercel function (`api/index.mjs`) renders each page on request at `/<slug>`, plus the index at `/` and `/sitemap.xml`. Vercel is linked to this repo and deploys every push to `main`.

## Visibility

Every article has a `visibility` frontmatter field: `public` or `private`. **A missing field means private.**

- Public articles live in `articles/` here and are listed on the index and sitemap.
- Private articles never go in this repo (it is public, history included). They live in `155xp/wiki-private` and are synced to a private Vercel Blob store. Logged out, a private page returns the same 404 as a missing page and is absent from the index and sitemap. The signed-in owner sees it with a `noindex` header.
- The owner can flip any article public or private live with the Visibility toggle on the page (shown only when signed in). The override is stored server-side and takes effect immediately, with no commit.
- Only the owner can sign in, with a passkey at `/owner` (unlinked). The first passkey is enrolled at `/owner?enroll=<token>`, where the token is the `WIKI_ENROLL_TOKEN` env var on Vercel; enrollment closes after the first passkey.

Env vars (Vercel, production): `BLOB_READ_WRITE_TOKEN`, `WIKI_SESSION_SECRET`, `WIKI_ENROLL_TOKEN`, `WIKI_ORIGIN`, `WIKI_RP_ID`.

## Publishing an article (for agents)

Set `visibility` first. Agent-written articles are `private` unless the owner explicitly said public. Public: follow the steps below. Private: run `./publish.sh /path/to/<slug>.md`; it reads the field and publishes to `155xp/wiki-private` instead of this repo. Never commit a private article here.

Publishing a public article is one `git push` of a `.md` file. No API, no secret, no manual deploy.

1. Clone the repo (or `git pull` an existing clone):
   `git clone https://github.com/155xp/wiki && cd wiki && npm ci`
2. Write or overwrite `articles/<slug>.md`. The file name is the URL: `articles/chain-rule.md` → `https://wiki.enci.dev/chain-rule`. Use lowercase letters, digits and hyphens.
3. Check it builds: `npm run build` (prints `built N article(s)` and warns about any article that isn't `visibility: public`).
4. Commit and push to `main`:
   `git add articles/<slug>.md && git commit -m "article: <slug>" && git push origin main`
5. Vercel builds and deploys in about a minute. Confirm with `curl -sI https://wiki.enci.dev/<slug>` → `HTTP/2 200`.

Shortcut that does steps 2–4 for a file anywhere on disk, and routes private articles to the private repo: `./publish.sh /path/to/<slug>.md`.

To update an article, edit the same file and push again. To remove one, delete the file and push.

## Article format

```markdown
---
visibility: public                    # public or private; missing = private
title: Chain rule                     # required: page title
description: One-sentence summary.     # shown on the index and in meta tags
updated: 2026-10-28                    # sorts the index, newest first (falls back to file mtime)
infobox:                               # optional: key/value rows in the right-hand box
  title: Chain rule
  Field: Differential calculus
  Origin: Leibniz (1676)
---

Lead paragraph(s) in **bold** subject style, before the first `##`.

## Section            <- H2s and H3s build the numbered Contents box (shown when there are 2+)

Claim with a citation.[^key]

Link to another article: [[Chain rule]] or [[chain-rule|custom label]].

[^key]: Author (Year). "Title". [link text](https://real.source/url).
```

- `[[Title]]` resolves to `/<slugified-title>`. If no such article exists, it renders as muted red text (not a link) until one is published.
- Markdown footnotes become the numbered **References** section.
- Math: `$...$` inline and `$$...$$` on their own lines, rendered with KaTeX at build time.
- Raw HTML in Markdown is not rendered.
- Every citation must point to a real source you have opened. Do not invent references.

## Layout

- `articles/` Markdown sources
- `lib/render.mjs` renderer (markdown-it + footnotes + KaTeX + gray-matter)
- `lib/app.mjs`, `lib/auth.mjs`, `lib/store.mjs`, `api/index.mjs` request handler, owner passkey auth, Blob store
- `lib/ui.mjs`, `public/owner/` owner toggle and `/owner` page
- `build.mjs` validates articles and copies static assets → `dist/`
- `test/` `npm test`
- `site.css` styles, light and dark via `prefers-color-scheme`
- `vercel.json` rewrites every page to the function
- `publish.sh` copy + build + commit + push helper

This v1 renderer is a stand-in. It will be replaced by the shared wiki renderer skill; the article format above stays the same.

## Teaching blocks (learning articles)

These all stay readable as plain Markdown in Obsidian.

- `==outer==` and `++inner++` highlight the outer and inner parts in prose. In math, use `\color{orange}{…}` for outer and `\color{teal}{…}` for inner; the site remaps both to theme colors that work in light and dark.
- `::: takeaways` … `:::` is a boxed summary. `::: tips` … `:::` is a plain box. `::: note Title` … `:::` is a box with a title.
- Wrong vs right, side by side (stacked on phones):

  ```
  :::: compare Forgetting the inner derivative
  ::: wrong
  $\sin(x^2)' = \cos(x^2)$
  :::
  ::: right
  $\sin(x^2)' = \cos(x^2)\cdot 2x$
  :::
  ::::
  ```

- `::: details Solution` … `:::` is a collapsed answer.
- Raw HTML is allowed, so an inline `<figure class="diagram"><svg>…</svg></figure>` works. Use `currentColor`, `var(--inner)` and `var(--outer)` so diagrams follow light and dark.
