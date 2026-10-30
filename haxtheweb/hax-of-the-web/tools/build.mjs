// Build the HAX of the Web title page from template.html:
//   ../hax-elements.js  rpg-character + future-terminal-text-lite, with the rpg-character art inlined
//   ../app.js           the page's own script (pulled out of the template so the page runs with script-src 'self')
//   ../index.html       the page, with no inline script
//   ../.htaccess        security headers for the title page
//   ../play/.htaccess   security headers for the playground, with hashes of play/index.html's inline scripts
// Media (media/*.mp3, media/demo.mp4) and the playground site (play/) are committed as-is; see ../README.md.
import { build } from "esbuild";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..");
const require = createRequire(import.meta.url);
const pkgDir = (name) => dirname(require.resolve(`${name}/package.json`));

// 1. Every rpg-character SVG layer as a data URI, keyed by its ./lib/... path.
const rpgDir = pkgDir("@haxtheweb/rpg-character");
const assets = {};
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".svg")) assets["./" + relative(rpgDir, p)] = "data:image/svg+xml;base64," + readFileSync(p).toString("base64");
  }
})(join(rpgDir, "lib"));

// rpg-character loads each layer with new URL(`./lib/...`, import.meta.url); point those at the inlined art.
const inlineRpgArt = {
  name: "inline-rpg-art",
  setup(b) {
    b.onLoad({ filter: /rpg-character[\\/]rpg-character\.js$/ }, (args) => {
      let src = readFileSync(args.path, "utf8");
      const pattern = /new URL\(\s*(`\.\/lib\/[^`]*\.svg`),\s*import\.meta\.url,?\s*\)/g;
      const hits = src.match(pattern) || [];
      if (hits.length < 10) throw new Error(`rpg-character changed how it loads art (found ${hits.length} layer URLs); update inline-rpg-art in build.mjs`);
      src = "const __RPG_ART = " + JSON.stringify(assets) + ";\n" + src.replace(pattern, '({ href: __RPG_ART[$1] || "" })');
      return { contents: src, loader: "js", resolveDir: dirname(args.path) };
    });
  },
};
const bundle = await build({
  entryPoints: [join(here, "entry.js")],
  bundle: true,
  minify: true,
  format: "iife",
  write: false,
  define: { "import.meta.url": "document.baseURI" },
  plugins: [inlineRpgArt],
  logLevel: "warning",
});
writeFileSync(join(out, "hax-elements.js"), bundle.outputFiles[0].text);

// 2. Split the template: page markup and styles stay in index.html, the script goes to app.js.
const tpl = readFileSync(join(here, "template.html"), "utf8");
const [headPart, bodyRest] = tpl.split("<style>");
const [style, rest] = bodyRest.split("</style>");
const app = rest.match(/<script>\n\(function \(\) \{\n([\s\S]*)\n\}\)\(\);\n<\/script>/);
if (!app) throw new Error("couldn't find the page script in template.html");
writeFileSync(
  join(out, "app.js"),
  "(function () {\n" + app[1].replace("{{HAX_MP3}}", "media/hax.mp3").replace("{{WEB_MP3}}", "media/web.mp3") + "\n})();\n",
);
let body = rest.slice(0, app.index) + '<script src="app.js"></script>' + rest.slice(app.index + app[0].length);
body = body
  .replace("<script>/*{{RPG_BUNDLE}}*/</script>", '<script src="hax-elements.js"></script>')
  .replace('src="data:video/mp4;base64,{{DEMO_MP4}}"', 'src="media/demo.mp4"');
if (/<script>|\{\{/.test(body)) throw new Error("index.html would still contain inline script or a placeholder");

const SITE = "https://hax-of-the-web.surge.sh/";
const meta = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="HAX of the Web: a Halloween arcade easter egg from HAXTheWeb. Insert a coin, try the cheat codes, and press start to play with a real HAXcms site.">
<meta property="og:title" content="HAX of the Web">
<meta property="og:description" content="A Halloween arcade easter egg from HAXTheWeb. Press start to play with a real HAXcms site.">
<meta property="og:url" content="${SITE}">
<meta property="og:image" content="${SITE}poster.png">
<meta property="og:image:alt" content="An arcade title screen: a pixel-art zombie pirate girl in front of a haunted house under a full moon, beside dripping horror letters reading HAX of the Web, with PRESS START below.">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#050307">
<link rel="icon" href="play/assets/favicon.png">
`;
const html =
  "<!doctype html>\n<html lang=\"en\">\n<head>\n" + meta +
  headPart.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', "").trim() +
  "\n<style>\n:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}\n*,*::before,*::after{box-sizing:border-box}\n[hidden]{display:none!important}" +
  style + "</style>\n</head>\n<body>\n" +
  '<noscript><p class="credit-line">HAX of the Web needs JavaScript. Build your own site at <a href="https://hax.psu.edu">hax.psu.edu</a>.</p></noscript>\n' +
  body.trim() + "\n</body>\n</html>\n";
writeFileSync(join(out, "index.html"), html);

// 3. Security headers. The playground allows the HAX CDNs plus hashes of HAXcms's own inline boot scripts.
const playHtml = readFileSync(join(out, "play", "index.html"), "utf8");
const hashes = [...playHtml.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
  .map((m) => `'sha256-${createHash("sha256").update(m[1]).digest("base64")}'`)
  .join(" ");
const CDN = "https://cdn.hax.cloud https://cdn.webcomponents.psu.edu";
const common = `  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
`;
const titleCsp =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  "font-src https://fonts.gstatic.com; img-src 'self' data:; media-src 'self' data:; connect-src 'self'; " +
  "frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'self'; upgrade-insecure-requests";
const playCsp =
  `default-src 'self'; script-src 'self' ${hashes} 'inline-speculation-rules' ${CDN}; ` +
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ${CDN}; ` +
  `font-src 'self' data: https://fonts.gstatic.com ${CDN}; img-src 'self' data: blob: https:; media-src 'self' data: blob: https:; ` +
  `connect-src 'self' ${CDN}; frame-src https:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; ` +
  "form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests";
writeFileSync(
  join(out, ".htaccess"),
  `# HAX of the Web: security headers (needs Apache mod_headers). Generated by tools/build.mjs.
# The title page runs with no inline script. play/ has its own policy in play/.htaccess.
<IfModule mod_headers.c>
${common}  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  Header always set Content-Security-Policy "${titleCsp}"
</IfModule>
`,
);
writeFileSync(
  join(out, "play", ".htaccess"),
  `# HAX playground: security headers (overrides the parent folder's policy). Generated by tools/build.mjs:
# the sha256 values hash the inline scripts in play/index.html, so rebuild after editing that file.
# Static demo: unknown URLs fall back to index.html so HAXcms's router can resolve page slugs.
<IfModule mod_headers.c>
${common}  Header always set Permissions-Policy "camera=(), microphone=(self), geolocation=(), payment=(), usb=()"
  Header always set Content-Security-Policy "${playCsp}"
</IfModule>
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . index.html [L]
</IfModule>
`,
);
console.log(`built index.html (${(html.length / 1024).toFixed(0)} KB), app.js, hax-elements.js (${(bundle.outputFiles[0].text.length / 1024).toFixed(0)} KB), .htaccess x2`);
