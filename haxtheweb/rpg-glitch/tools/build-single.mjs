// Builds one self-contained HTML file (art and modules inlined) for hosts
// that serve a single page, e.g. a claude.ai Artifact or an email attachment.
//   node build-single.mjs <out.html> [--fragment]
// --fragment drops <!doctype>, <html>, <head> and <body> for hosts that wrap the page.
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2];
const fragment = process.argv.includes("--fragment");
if (!out) { console.error("usage: node build-single.mjs <out.html> [--fragment]"); process.exit(1); }
const art = {};
for (const dir of await readdir(path.join(root, "rpg-character"), { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  for (const f of await readdir(path.join(root, "rpg-character", dir.name))) {
    if (f.endsWith(".svg")) art[`${dir.name}/${f.slice(0, -4)}`] = (await readFile(path.join(root, "rpg-character", dir.name, f), "utf8")).trim();
  }
}
// each element module becomes a scoped block that hands back its exports
async function inline(file, names) {
  const src = (await readFile(path.join(root, "rpg-character", file), "utf8")).replace(/^export\s+/gm, "");
  return `const { ${names.join(", ")} } = (() => {\n${src}\nreturn { ${names.join(", ")} };\n})();`;
}
let html = await readFile(path.join(root, "index.html"), "utf8");
const imports = [
  [/^\s*import \{([^}]+)\} from "\.\/rpg-character\/(rpg-character-[a-z]+\.js)";$/gm],
];
const blocks = [];
for (const m of html.matchAll(imports[0][0])) {
  blocks.push([m[0], await inline(m[2], m[1].split(",").map((n) => n.trim()))]);
}
for (const [from, to] of blocks) html = html.replace(from, to);
html = html.replace('<script type="module">', `<script>window.RPG_ART = ${JSON.stringify(art)};</script>\n<script type="module">`);
if (fragment) {
  html = html.replace(/<!doctype html>\s*/i, "").replace(/<\/?html[^>]*>\s*/gi, "").replace(/<\/?head>\s*/gi, "").replace(/<\/?body>\s*/gi, "")
    .replace(/<meta charset="utf-8">\s*/i, "").replace(/<meta name="viewport"[^>]*>\s*/i, "");
}
await writeFile(out, html);
console.log(`wrote ${out} (${Object.keys(art).length} layers, ${(html.length / 1024).toFixed(0)} KB)`);
