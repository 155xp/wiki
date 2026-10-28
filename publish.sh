#!/usr/bin/env bash
# Publish or update one article: ./publish.sh path/to/<slug>.md
# Copies the file into articles/, builds locally to catch errors, commits and pushes.
# Vercel's Git integration deploys main to wiki.enci.dev automatically.
set -euo pipefail
src="${1:?usage: publish.sh <file.md>}"
repo="$(cd "$(dirname "$0")" && pwd)"
name="$(basename "$src")"
[[ "$name" == *.md ]] || { echo "not a .md file: $src" >&2; exit 1; }
cd "$repo"
git pull --rebase --quiet origin main
if [[ "$(realpath "$src")" != "$repo/articles/$name" ]]; then cp "$src" "articles/$name"; fi
[ -d node_modules ] || npm ci --silent
npm run build --silent
git add "articles/$name"
if git diff --cached --quiet; then echo "no changes in articles/$name"; exit 0; fi
git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit --quiet -m "article: ${name%.md}"
git push --quiet origin main
echo "pushed. live in about a minute at https://wiki.enci.dev/${name%.md}"
