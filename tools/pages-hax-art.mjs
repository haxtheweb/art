// Turns a staged copy of this repo into a static GitHub Pages site.
//   node tools/pages-hax-art.mjs <staged-dir>
// Run by .github/workflows/pages.yml. It only changes the staged copy.
//
// 1. hax-art/ becomes a static HAXsite: ghpages.html is its index.html (HAXcms
//    loads from cdn.hax.cloud), and the dev-only symlinks are dropped.
// 2. Its <base href> is pinned to the hax-art folder. The stock script assumes
//    a project-pages site sits at the repo root (/art/), not one level down.
// 3. A root 404.html sends deep links (/art/hax-art/brand) back to the site as
//    ?p=/brand, which the HAXcms router understands. Other missing paths get
//    a plain not-found page.
// 4. A root index.html redirects /art/ to the portfolio.
import { readFile, writeFile, rm, rename } from "node:fs/promises";
import path from "node:path";

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node tools/pages-hax-art.mjs <staged-dir>");
  process.exit(1);
}
const SITE = "hax-art";
const site = path.join(dir, SITE);

// 1. static entry point, no dev symlinks or babel shims
await rm(path.join(site, "index.html"));
await rename(path.join(site, "ghpages.html"), path.join(site, "index.html"));
for (const f of ["build", "dist", "wc-registry.json", "assets/babel-top.js", "assets/babel-bottom.js"]) {
  await rm(path.join(site, f), { recursive: true, force: true });
}

// 2. pin the base to wherever the hax-art folder is served from
const index = path.join(site, "index.html");
let html = await readFile(index, "utf8");
const marker = "if (document.location.pathname.indexOf('/_sites/') != -1) {";
if (!html.includes(marker)) {
  throw new Error("hax-art/ghpages.html no longer has the expected base-href script; update tools/pages-hax-art.mjs");
}
html = html.replace(
  marker,
  `if (document.location.pathname.indexOf('/${SITE}/') != -1) {
      document.write("<base href='" + document.location.pathname.substring(0, document.location.pathname.indexOf('/${SITE}/') + ${SITE.length + 2}) + "' />");
    }
    else ${marker}`,
);
await writeFile(index, html);

// 3. deep links back into the HAXsite
await writeFile(
  path.join(dir, "404.html"),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Not found | HAX art</title>
<script>
  // /art/hax-art/some/page -> /art/hax-art/?p=/some/page (read by the HAXcms router)
  (function () {
    var l = window.location, at = l.pathname.indexOf('/${SITE}/');
    if (at === -1) { return; }
    var base = l.pathname.substring(0, at + ${SITE.length + 2});
    var route = l.pathname.substring(base.length);
    if (!route) { return; }
    l.replace(base + '?p=/' + route.replace(/&/g, '~and~') + (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') + l.hash);
  })();
</script>
</head>
<body>
<h1>Not found</h1>
<p>That file isn't here. Browse the <a href="/art/${SITE}/">HAX art portfolio</a> or the <a href="https://github.com/haxtheweb/art">haxtheweb/art</a> repository.</p>
</body>
</html>
`,
);

// 4. /art/ opens the portfolio
await writeFile(
  path.join(dir, "index.html"),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>HAX art</title>
<meta http-equiv="refresh" content="0; url=${SITE}/">
<link rel="canonical" href="${SITE}/">
</head>
<body>
<p><a href="${SITE}/">Open the HAX art portfolio</a></p>
</body>
</html>
`,
);
console.log(`staged ${dir} for GitHub Pages`);
