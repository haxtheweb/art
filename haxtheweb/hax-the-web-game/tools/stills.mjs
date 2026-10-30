// Render ../media stills from ../index.html: the title screen, a demo run moment and the run report.
// Google Fonts requests are answered from the local @fontsource packages, so renders match
// the live page even offline. The run uses the self-playing demo; times are real time.
import { chromium } from "playwright";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const pageUrl = pathToFileURL(join(here, "..", "index.html")).href;
const media = (f) => join(here, "..", "media", f);

// family name -> @fontsource package and file prefix
const FONTS = {
  "Press Start 2P": "press-start-2p",
  "Roboto": "roboto",
  "Roboto Condensed": "roboto-condensed",
  "Roboto Slab": "roboto-slab",
};
const fontFile = (pkg, weight, style) =>
  join(dirname(require.resolve(`@fontsource/${pkg}/package.json`)), "files", `${pkg}-latin-${weight}-${style}.woff2`);

function cssFor(url) {
  const family = new URL(url).searchParams.getAll("family");
  let css = "";
  for (const spec of family) {
    const [rawName] = spec.split(":");
    const name = rawName.replaceAll("+", " ");
    const pkg = FONTS[name];
    if (!pkg) continue;
    for (const weight of [300, 400, 500, 700, 900]) {
      for (const style of ["normal", "italic"]) {
        if (!existsSync(fontFile(pkg, weight, style))) continue;
        css += `@font-face{font-family:"${name}";font-style:${style};font-weight:${weight};font-display:block;` +
          `src:url(https://fonts.gstatic.com/local/${pkg}/${weight}/${style}.woff2) format("woff2")}\n`;
      }
    }
  }
  return css;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1.5 });
await page.route("https://fonts.googleapis.com/**", (route) =>
  route.fulfill({ contentType: "text/css", headers: { "access-control-allow-origin": "*" }, body: cssFor(route.request().url()) }),
);
await page.route("https://fonts.gstatic.com/local/**", (route) => {
  const [, , , , pkg, weight, file] = route.request().url().split("/");
  route.fulfill({
    contentType: "font/woff2",
    headers: { "access-control-allow-origin": "*" },
    body: readFileSync(fontFile(pkg, weight, file.replace(".woff2", ""))),
  });
});

// true while the blinking PRESS START text is drawn (keystone yellow pixels on its row)
const pressStartShowing = () => {
  const c = document.querySelector("canvas").getContext("2d");
  const d = c.getImageData(100, 140, 120, 6).data;
  for (let i = 0; i < d.length; i += 4) if (d[i] > 240 && d[i + 1] > 190 && d[i + 2] < 40) return true;
  return false;
};

await page.goto(pageUrl);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1500);
await page.waitForFunction(pressStartShowing, null, { polling: 50 });
const screen = page.locator("canvas");
await screen.screenshot({ path: media("01-title.png") });
// the demo starts after 12 s on the title screen; the first lore badge is grabbed about 2.5 s in
await page.waitForTimeout(10500 + 3600);
await screen.screenshot({ path: media("02-run.png") });
await page.waitForFunction(() => !document.getElementById("rsum").textContent.startsWith("No run"), null, { timeout: 60000 });
await page.waitForTimeout(800);
await page.screenshot({ path: media("03-run-report.png"), fullPage: true });
await browser.close();
console.log("stills written to media/");
