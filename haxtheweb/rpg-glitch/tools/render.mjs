// Renders media/ from ../index.html with Playwright and ffmpeg.
//   node render.mjs still   -> media/rpg-glitch-still.png (1360x880, og:image)
//   node render.mjs gif     -> media/rpg-glitch.gif (680px, loops through 4 characters)
import { chromium } from "playwright";
import http from "node:http";
import { readFile, mkdir, writeFile, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const media = path.join(root, "media");
const require = createRequire(import.meta.url);
const fontDir = path.join(path.dirname(require.resolve("@fontsource/roboto-mono/package.json")), "files");
const mode = process.argv[2] || "still";
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2" };

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://x");
  const file = u.pathname.startsWith("/__fonts/")
    ? path.join(fontDir, path.basename(u.pathname))
    : path.join(root, decodeURIComponent(u.pathname === "/" ? "/index.html" : u.pathname));
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404); res.end();
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;
// serve Roboto Mono locally so renders work offline and match the page
const fontCSS = [400, 700].map((w) => `@font-face{font-family:'Roboto Mono';font-weight:${w};src:url(${base}/__fonts/roboto-mono-latin-${w}-normal.woff2) format('woff2');}`).join("");

// CHROMIUM_PATH lets you reuse an already-installed Chromium instead of `npx playwright install chromium`
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
await page.route(/fonts\.googleapis\.com/, (r) => r.fulfill({ contentType: "text/css", body: fontCSS }));
await page.route(/fonts\.gstatic\.com/, (r) => r.abort());
await page.goto(`${base}/?seed=btopro`);
await page.evaluate(() => document.fonts.ready);
const ready = () => page.waitForFunction(() => window.rpgGlitch && window.rpgGlitch.ready(), null, { timeout: 15000 });
await ready();
await page.evaluate(() => window.rpgGlitch.manual());
const show = async (spec) => { await page.evaluate((s) => window.rpgGlitch.becomeFrom(s), spec); await ready(); };
const shot = async () => Buffer.from((await page.evaluate(() => document.getElementById("scene").toDataURL("image/png"))).split(",")[1], "base64");
await mkdir(media, { recursive: true });

if (mode === "still") {
  await show({ seed: "btopro", preset: "knight", pet: "dog", expression: "happy" });
  await page.evaluate(() => window.rpgGlitch.renderAt(1000));
  await writeFile(path.join(media, "rpg-glitch-still.png"), await shot());
} else {
  const frames = path.join(here, ".frames");
  await rm(frames, { recursive: true, force: true });
  await mkdir(frames);
  const FPS = 25, HOLD = 1.6, GLITCH = 300;
  let n = 0;
  const save = async () => writeFile(path.join(frames, `f${String(n++).padStart(4, "0")}.png`), await shot());
  const hold = async () => {
    await page.evaluate(() => window.rpgGlitch.renderAt(1000));
    const f = await shot();
    for (let i = 0; i < HOLD * FPS; i++) await writeFile(path.join(frames, `f${String(n++).padStart(4, "0")}.png`), f);
  };
  const glitch = async () => {
    await page.evaluate(() => window.rpgGlitch.glitch());
    for (let t = 0; t < GLITCH; t += 1000 / FPS) {
      await page.evaluate((o) => window.rpgGlitch.renderAt(o), t);
      await save();
    }
  };
  // generic and HAX-original looks only (see EXCLUDED in index.html)
  const stops = [
    { seed: "btopro", preset: "knight", pet: "dog", expression: "happy" },
    { seed: "zpg", preset: "pirate", pet: "parrot" },
    { seed: "edtechjoker", preset: "wizard", pet: "owl", fire: true },
    { seed: "hax", preset: "scientist", pet: "slime", expression: "surprised" },
    { seed: "camp", preset: "astronaut", pose: "cheer", expression: "happy" },
    { seed: "october", preset: "witch", pet: "bat", expression: "wink" },
  ];
  await show(stops[0]);
  await hold();
  for (const spec of stops.slice(1).concat([stops[0]])) {
    await show(spec);
    await glitch();
    if (spec !== stops[0]) await hold();
  }
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(frames, "f%04d.png"),
    "-vf", "scale=680:-1:flags=neighbor,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=none",
    "-loop", "0", path.join(media, "rpg-glitch.gif")]);
  await rm(frames, { recursive: true, force: true });
}
await browser.close();
server.close();
console.log(`rendered ${mode}`);
