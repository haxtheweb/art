// Build ../index.html: inline the HAX element bundle, the simple-fields icons
// and every rpg-character SVG layer into template.html.
import { build } from "esbuild";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const pkgDir = (name) => dirname(require.resolve(`${name}/package.json`));

// 1. HAX elements as one IIFE. import.meta.url has no meaning inline, so point it at the page.
const bundle = await build({
  entryPoints: [join(here, "entry.js")],
  bundle: true,
  minify: true,
  format: "iife",
  write: false,
  define: { "import.meta.url": "document.baseURI" },
  logLevel: "warning",
});
let js = bundle.outputFiles[0].text.replaceAll("</script", "<\\/script");

// 2. simple-fields asks the icon library for these; register them inline in the same task
//    so the fields render with them on first paint.
const iconDir = join(pkgDir("@haxtheweb/simple-icon"), "lib/svgs/icons");
const icons = {};
for (const name of ["arrow-drop-down", "check-box", "check-box-outline-blank"]) {
  icons[name] =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(readFileSync(join(iconDir, `${name}.svg`), "utf8").trim());
}
js +=
  "\n// simple-fields' dropdown arrow and checkbox icons, registered inline\n" +
  `try{globalThis.SimpleIconset.requestAvailability().registerIconset('icons',${JSON.stringify(icons)});}catch(e){}`;

// 3. Every rpg-character layer, keyed "folder/name", for the in-game sprite builder.
const libDir = join(pkgDir("@haxtheweb/rpg-character"), "lib");
const assets = {};
for (const folder of ["accessories", "base", "face", "faceItem", "hair", "hat", "hatColor", "pants", "shirt", "skin"]) {
  for (const file of readdirSync(join(libDir, folder)).filter((f) => f.endsWith(".svg")).sort()) {
    assets[`${folder}/${file.slice(0, -4)}`] = readFileSync(join(libDir, folder, file), "utf8").trim();
  }
}

const template = readFileSync(join(here, "template.html"), "utf8");
const out = template
  .split("__HAXBUNDLE__").join(js)
  .split("__ASSETS__").join(JSON.stringify(assets));
writeFileSync(join(here, "..", "index.html"), out);
console.log(`index.html written (${(out.length / 1024).toFixed(0)} KB)`);
