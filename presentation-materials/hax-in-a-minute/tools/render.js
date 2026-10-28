// Renders the doodle board (../index.html) to video frames or stills with headless Chromium.
// usage: node render.js video <out.mp4|out.gif> [opts json]  |  node render.js stills <dir> [opts json]
// Needs ffmpeg on PATH for video. Fonts come from @fontsource so output matches the live page offline.
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
const [mode, out, optsJson] = process.argv.slice(2);
const o = Object.assign({ fps: 30, start: 0, end: null, tail: 6, w: 1920, scheme: 'light', ff: [] }, JSON.parse(optsJson || '{}'));
const F = path.dirname(path.dirname(require.resolve('@fontsource/roboto/package.json')));
const face = (fam, dir, file, w) => `@font-face{font-family:"${fam}";font-weight:${w};font-style:normal;src:url("file://${F}/${dir}/files/${file}") format("woff2");}`;
const css = [
  ...[400, 500, 700, 900].map(w => face('Roboto', 'roboto', `roboto-latin-${w}-normal.woff2`, w)),
  ...[700, 900].map(w => face('Roboto Slab', 'roboto-slab', `roboto-slab-latin-${w}-normal.woff2`, w)),
  ...[400, 700].map(w => face('Roboto Condensed', 'roboto-condensed', `roboto-condensed-latin-${w}-normal.woff2`, w)),
  'body{padding:0!important;margin:0} header,.controls,.chips,details{display:none!important} .wrap{max-width:none!important}',
  '.board-wrap{border:0!important;border-radius:0!important;box-shadow:none!important}'
].join('\n');
(async () => {
  const b = await chromium.launch();
  const h = Math.round(o.w * 9 / 16);
  const ctx = await b.newContext({ viewport: { width: o.w, height: h }, colorScheme: o.scheme, reducedMotion: 'no-preference' });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file://' + path.join(__dirname, '..', 'index.html'));
  await p.addStyleTag({ content: css });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(async () => { await Promise.all(['900 56px "Roboto Slab"', '500 20px Roboto', '700 20px Roboto', '700 20px "Roboto Condensed"', '400 20px "Roboto Condensed"', '900 20px Roboto', '400 20px Roboto', '700 20px "Roboto Slab"'].map(f => document.fonts.load(f))); });
  const fontsOk = await p.evaluate(() => [document.fonts.check('900 56px "Roboto Slab"'), document.fonts.check('500 20px Roboto'), document.fonts.check('700 20px "Roboto Condensed"')]);
  const T = await p.evaluate(() => hdbDuration());
  const board = p.locator('#board');
  async function at(time) {
    await p.evaluate(v => { hdbSeek(v); document.getAnimations().forEach(a => { a.pause(); a.currentTime = v * 1000; }); }, time);
  }
  const shot = () => board.screenshot({ type: 'png' });
  if (mode === 'stills') {
    // the last second of each scene's hold, plus a mid-flight lift-off frame
    const starts = await p.evaluate(() => { const r = []; let last = -1; for (let t = 0; t <= hdbDuration(); t += 0.05) { hdbSeek(t); const i = [...document.querySelectorAll('.chip')].findIndex(c => c.getAttribute('aria-current') === 'true'); if (i !== last) { r.push(t); last = i; } } return r; });
    const names = JSON.parse(o.names);
    fs.mkdirSync(out, { recursive: true });
    for (let i = 0; i < starts.length; i++) {
      const tt = i + 1 < starts.length ? starts[i + 1] - 0.9 : T + 2.2;
      await at(tt); fs.writeFileSync(path.join(out, `${String(i + 1).padStart(2, '0')}-${names[i]}${o.suffix || ''}.png`), await shot());
    }
  } else {
    // afterEnd: [a, b] renders T+a .. T+b, the endless starfield after the story ends (seamless every 4 s)
    const start = o.afterEnd ? T + o.afterEnd[0] : o.start, end = o.afterEnd ? T + o.afterEnd[1] : (o.end != null ? o.end : T + o.tail), n = Math.round((end - start) * o.fps);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(o.fps), '-i', '-', ...o.ff, out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < n; i++) {
      await at(start + i / o.fps);
      const buf = await shot();
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 150 === 0) console.log('frame', i, '/', n);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  console.log('T', T, 'fonts', fontsOk, 'errors', errs);
  await b.close();
})();
