#!/usr/bin/env bash
# Publish or update one article: ./publish.sh path/to/<slug>.md
# Routes by YAML visibility, then commits and pushes to the appropriate repo.
# Vercel's Git integration deploys main to wiki.enci.dev automatically.
set -euo pipefail
src="${1:?usage: publish.sh <file.md>}"
repo="$(cd "$(dirname "$0")" && pwd)"
name="$(basename "$src")"
[[ "$name" == *.md ]] || { echo "not a .md file: $src" >&2; exit 1; }
src="$(realpath "$src")"
cd "$repo"
[ -d node_modules ] || npm ci --silent
visibility="$(node -e 'const fs = require("fs"), matter = require("gray-matter"); console.log(matter(fs.readFileSync(process.argv[1], "utf8")).data.visibility === "public" ? "public" : "private")' "$src")"
if [[ "$visibility" != public ]]; then
  if [[ -e "articles/$name" || -L "articles/$name" ]]; then
    echo "error: private slug already exists in public repo: ${name%.md}" >&2
    exit 1
  fi
  private="${WIKI_PRIVATE_DIR:-$repo/../wiki-private}"
  if [[ ! -d "$private" ]]; then git clone --quiet https://github.com/155xp/wiki-private.git "$private"; fi
  cd "$private"
  [[ "$(pwd -P)" != "$repo" ]] || { echo "error: private repo must differ from public repo" >&2; exit 1; }
  git pull --rebase --quiet
  mkdir -p articles
  if [[ "$src" != "$(pwd -P)/articles/$name" ]]; then cp "$src" "articles/$name"; fi
  git add "articles/$name"
  if ! git diff --cached --quiet; then
    git -c user.name="Grok Bot" -c user.email="noreply@enci.dev" commit --quiet -m "article: ${name%.md}"
  fi
  git push --quiet
  if [[ -n "${BLOB_READ_WRITE_TOKEN:-}" ]]; then
    npm ci --silent && npm run sync
  else
    echo "The GitHub Action (or the owner) syncs it."
  fi
  echo "private: visible only to the owner at https://wiki.enci.dev/${name%.md}"
  exit 0
fi
git pull --rebase --quiet origin main
if [[ "$src" != "$repo/articles/$name" ]]; then cp "$src" "articles/$name"; fi
npm run build --silent
git add "articles/$name"
if git diff --cached --quiet; then echo "no changes in articles/$name"; exit 0; fi
git -c user.name="Grok Bot" -c user.email="noreply@enci.dev" commit --quiet -m "article: ${name%.md}"
git push --quiet origin main
echo "pushed. live in about a minute at https://wiki.enci.dev/${name%.md}"
