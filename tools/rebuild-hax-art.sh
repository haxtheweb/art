#!/bin/sh
# Rebuilds the hax-art portfolio HAXsite from scratch with the HAX CLI:
# scaffold, import every page from manifest.json + tools/hax-art-items.mjs,
# drop the starter page, then set the site's title and hero image.
# Run from the repo root. Needs Node.js and the HAX CLI (npm install -g @haxtheweb/create).
set -e
cd "$(dirname "$0")/.."
TMP=$(mktemp -d)
# keep the hand-written README across rebuilds
[ -f hax-art/README.md ] && cp hax-art/README.md "$TMP/README.md"
# art.hax.cloud (Vercel, rooted at hax-art/) builds from hax-art/vercel.json
[ -f hax-art/vercel.json ] && cp hax-art/vercel.json "$TMP/vercel.json"
# the site's own code (the HAX network bar) lives in custom/src and its build
[ -d hax-art/custom/src ] && cp -r hax-art/custom/src "$TMP/custom-src"
[ -f hax-art/custom/build/custom.es6.js ] && cp hax-art/custom/build/custom.es6.js "$TMP/custom.es6.js"
rm -rf hax-art
hax site hax-art --theme "glossy-portfolio-theme" --y --no-i --skip --quiet > /dev/null
# the CLI makes each new site its own git repo; this one lives in haxtheweb/art
rm -rf hax-art/.git hax-art/.github
# paths the HAXcms site folder contract retires (nothing loads them), in
# case the installed CLI still writes them
rm -rf hax-art/false hax-art/theme hax-art/create-cli.recipe
node tools/hax-art-items.mjs "$TMP/items.json"
STARTER=$(node -e "console.log(require('./hax-art/site.json').items[0].id)")
cd hax-art
hax site site:items-import --items-import "$TMP/items.json" --y --no-i --quiet > /dev/null
hax site node:delete --item-id "$STARTER" --y --no-i --quiet > /dev/null
node -e "
const fs = require('fs');
const s = JSON.parse(fs.readFileSync('site.json', 'utf8'));
const RAW = 'https://raw.githubusercontent.com/haxtheweb/art/main/future-traveler/';
s.title = 'HAX art';
s.description = 'Art and media from the HAX project, browsed with HAX.';
s.author = 'HAX (haxtheweb)';
s.metadata.author = { name: 'HAX (haxtheweb)' };
s.metadata.site.domain = 'https://art.hax.cloud';
s.metadata.site.sameAs = ['https://github.com/haxtheweb', 'https://github.com/haxtheweb/art'];
s.metadata.site.logo = RAW + 'funny-traveler-15.png';
s.metadata.theme.variables.image = RAW + 'funny-traveler-08.png';
s.metadata.theme.variables.hexCode = '#c8102e';
fs.writeFileSync('site.json', JSON.stringify(s, null, 2));
"
[ -f "$TMP/README.md" ] && cp "$TMP/README.md" README.md
[ -f "$TMP/vercel.json" ] && cp "$TMP/vercel.json" vercel.json
[ -d "$TMP/custom-src" ] && rm -rf custom/src && cp -r "$TMP/custom-src" custom/src
[ -f "$TMP/custom.es6.js" ] && cp "$TMP/custom.es6.js" custom/build/custom.es6.js
rm -rf "$TMP"
# vercel.json builds into _static/; keep that output out of git
grep -qx '_static/' .gitignore 2>/dev/null || printf '\n# site:build-static output (Vercel build)\n_static/\n' >> .gitignore
echo "hax-art rebuilt: $(node -e "console.log(require('./site.json').items.length)") pages"
