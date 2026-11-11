// Renders the rpg-character sprites in ../sprites/ from the element on
// webcomponents main, in headless Chromium, so the GIF uses the element's
// real art. Run from this tools/ folder after `npm install`. Needs git.
import { execSync } from "node:child_process";
import { createServer } from "node:http";
import { mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync, cpSync, realpathSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { build } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, "../sprites");

// seed + hat for each sprite (index = file name). Hat "" keeps the seed's own hat.
export const CAST = [
  ["btopro", ""],
  ["zpg", "pirate"],
  ["hax", "astronaut"],
  ["agent", "", true], // on fire
  ["human", "chef"],
  ["remix", "cowboy"],
  ["headless", "dino"],
  ["experience", "bunny"],
];

const tmp = mkdtempSync(join(tmpdir(), "hax-morph-"));
const wc = join(tmp, "wc");
const sh = (cmd, cwd) => execSync(cmd, { cwd, stdio: "inherit" });
sh(`git clone -q --depth 1 --filter=blob:none --sparse https://github.com/haxtheweb/webcomponents "${wc}"`);
sh("git sparse-checkout set elements/rpg-character elements/utils/lib", wc);
const el = join(wc, "elements/rpg-character");
sh("npm install --omit=dev --no-audit --no-fund --ignore-scripts", el);
// npm installs into the workspace root; use main's utils so new helpers resolve
const nm = existsSync(join(el, "node_modules")) ? join(el, "node_modules") : join(wc, "node_modules");
// (a workspace install already links the monorepo's own utils)
const mainUtils = join(wc, "elements/utils/lib");
const depUtils = join(nm, "@haxtheweb/utils/lib");
if (realpathSync(mainUtils) !== realpathSync(depUtils)) {
  cpSync(mainUtils, depUtils, { recursive: true });
}
await build({
  entryPoints: [join(el, "rpg-character.js")],
  bundle: true,
  format: "esm",
  outfile: join(el, "bundle.js"),
  nodePaths: [nm],
  logLevel: "warning",
});
writeFileSync(
  join(el, "sprites.html"),
  `<!doctype html><html><body style="margin:0;background:transparent">
<div id="w" style="display:flex;gap:8px;padding:8px"></div>
<script type="module">
import "./bundle.js";
const cast = ${JSON.stringify(CAST)};
const w = document.getElementById("w");
cast.forEach(([seed, hat, fire], i) => {
  const c = document.createElement("rpg-character");
  c.id = "c" + i; c.seed = seed; c.height = 142; c.width = 113;
  if (hat) c.hat = hat;
  if (fire) c.fire = true;
  w.appendChild(c);
});
</script></body></html>`,
);

const types = { ".js": "text/javascript", ".svg": "image/svg+xml", ".html": "text/html", ".json": "application/json" };
const server = createServer((req, res) => {
  const p = join(el, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!p.startsWith(el) || !existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": types[extname(p)] || "application/octet-stream" });
  res.end(readFileSync(p));
}).listen(0);
const port = server.address().port;

// CHROMIUM_PATH lets you point at an existing Chromium instead of `npx playwright install`
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(`http://localhost:${port}/sprites.html`);
await page.waitForTimeout(3000);
for (let i = 0; i < CAST.length; i++) {
  await page.locator("#c" + i).screenshot({ path: join(out, `${i}.png`), omitBackground: true });
}
await browser.close();
server.close();
const sha = execSync("git rev-parse --short HEAD", { cwd: wc }).toString().trim();
rmSync(tmp, { recursive: true, force: true });
if (errors.length) { console.error(errors); process.exit(1); }
console.log(`Rendered ${CAST.length} sprites from webcomponents ${sha}`);
