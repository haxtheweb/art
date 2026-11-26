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
# the previous build, so unchanged pages keep their dates (below)
[ -f hax-art/site.json ] && cp hax-art/site.json "$TMP/previous-site.json" && cp -r hax-art/pages "$TMP/previous-pages"
rm -rf hax-art
hax site hax-art --theme "glossy-portfolio-theme" --y --no-i --skip --quiet > /dev/null
# the CLI makes each new site its own git repo; this one lives in haxtheweb/art
rm -rf hax-art/.git hax-art/.github
# paths the HAXcms site folder contract retires (nothing loads them), in
# case the installed CLI still writes them
rm -rf hax-art/false hax-art/theme hax-art/create-cli.recipe
# web-sized WebP copies of every image the site shows (hero, cards, page
# images, the logo), so pages don't download multi-megabyte originals;
# hax-art-items.mjs uses a copy wherever one exists, the original otherwise
if command -v python3 > /dev/null && python3 -c "import PIL" 2> /dev/null; then
  node tools/hax-art-items.mjs --list-images | python3 tools/web-images.py
  python3 tools/web-images.py --widths 160 future-traveler/funny-traveler-15.png
  # the hero is also the site's social card (og:image): JPEG, which every
  # network previews
  python3 tools/web-images.py --widths 1600 --format jpg future-traveler/funny-traveler-08.png
else
  echo "python3 with Pillow not found: using the original images (see tools/web-images.py)"
fi
node tools/hax-art-items.mjs "$TMP/items.json"
# a page whose title, description and content are unchanged keeps its
# created / updated dates, and a changed page keeps its created date, so a
# rebuild doesn't redate every page (haxtheweb/issues#3404)
[ -f "$TMP/previous-site.json" ] && node -e "
const fs = require('fs');
const [itemsFile, siteFile, pagesDir] = process.argv.slice(1);
const items = JSON.parse(fs.readFileSync(itemsFile, 'utf8'));
const prevItems = JSON.parse(fs.readFileSync(siteFile, 'utf8')).items;
const byId = new Map(prevItems.map((i) => [i.id, i]));
// by slug too, for a build made before pages kept their ids
const bySlug = new Map(prevItems.map((i) => [i.slug, i]));
for (const item of items) {
  const prev = byId.get(item.id) || bySlug.get(item.slug);
  if (!prev || !prev.metadata || !prev.metadata.created) continue;
  let html = null;
  try { html = fs.readFileSync(pagesDir + '/' + prev.id + '/index.html', 'utf8'); } catch (e) {}
  const same = html === item.content && prev.title === item.title && (prev.description || '') === item.description;
  item.metadata.created = prev.metadata.created;
  item.metadata.updated = same ? prev.metadata.updated : Math.floor(Date.now() / 1000);
}
fs.writeFileSync(itemsFile, JSON.stringify(items, null, 2));
" "$TMP/items.json" "$TMP/previous-site.json" "$TMP/previous-pages"
STARTER=$(node -e "console.log(require('./hax-art/site.json').items[0].id)")
cd hax-art
# the starter page goes first, so the imported home page keeps the slug "home"
hax site node:delete --item-id "$STARTER" --y --no-i --quiet > /dev/null
# a deleted page keeps its folder on disk; the starter page has no use here
rm -rf "pages/$STARTER"
# --keep-ids: pages keep the ids tools/hax-art-items.mjs gives them, so a
# rebuild only changes the pages whose content changed
hax site site:items-import --items-import "$TMP/items.json" --keep-ids --y --no-i --quiet > /dev/null
PREVIOUS_SITE="$TMP/previous-site.json" node -e "
const fs = require('fs');
const s = JSON.parse(fs.readFileSync('site.json', 'utf8'));
const RAW = 'https://raw.githubusercontent.com/haxtheweb/art/main/future-traveler/';
const WEB = 'https://raw.githubusercontent.com/haxtheweb/art/main/web/future-traveler/';
// the web-sized copy when tools/web-images.py made one, the original otherwise
const pick = (copy, original) => fs.existsSync('../web/future-traveler/' + copy) ? WEB + copy : RAW + original;
s.title = 'HAX art';
s.description = 'Art and media from the HAX project, browsed with HAX.';
s.author = 'HAX (haxtheweb)';
s.metadata.author = { name: 'HAX (haxtheweb)' };
s.metadata.site.domain = 'https://art.hax.cloud';
s.metadata.site.sameAs = ['https://github.com/haxtheweb', 'https://github.com/haxtheweb/art'];
s.metadata.site.logo = pick('funny-traveler-15-160w.webp', 'funny-traveler-15.png');
s.metadata.theme.variables.image = pick('funny-traveler-08-1600w.jpg', 'funny-traveler-08.png');
s.metadata.theme.variables.hexCode = '#c8102e';
if (fs.existsSync(process.env.PREVIOUS_SITE || '')) {
  const prev = JSON.parse(fs.readFileSync(process.env.PREVIOUS_SITE, 'utf8'));
  s.id = prev.id;
  s.metadata.site.created = prev.metadata.site.created;
}
s.metadata.site.updated = Math.max(...s.items.map((i) => i.metadata.updated || 0));
fs.writeFileSync('site.json', JSON.stringify(s, null, 2));
"
# the scaffold wrote robots.txt, security.txt and the other managed files
# before the domain was set (so they held /_sites/ paths): write them again
hax site site:rebuild --y --no-i --quiet > /dev/null
[ -f "$TMP/README.md" ] && cp "$TMP/README.md" README.md
[ -f "$TMP/vercel.json" ] && cp "$TMP/vercel.json" vercel.json
[ -d "$TMP/custom-src" ] && rm -rf custom/src && cp -r "$TMP/custom-src" custom/src
[ -f "$TMP/custom.es6.js" ] && cp "$TMP/custom.es6.js" custom/build/custom.es6.js
rm -rf "$TMP"
# vercel.json builds into _static/; keep that output out of git
grep -qx '_static/' .gitignore 2>/dev/null || printf '\n# site:build-static output (Vercel build)\n_static/\n' >> .gitignore
echo "hax-art rebuilt: $(node -e "console.log(require('./site.json').items.length)") pages"
