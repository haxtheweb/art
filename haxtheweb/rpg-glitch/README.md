# RPG Glitch

The HAX [`rpg-character`](https://github.com/haxtheweb/webcomponents/tree/main/elements/rpg-character) on an 80s CRT, glitching between versions of itself over a synthwave landscape. Click the screen and it glitches hard into a brand new character. Every character has its own link, so you can share the one you land on.

![An rpg-character in a knight helmet glitching on a CRT over a synthwave grid, captioned hax_the_web, the future is remixable](media/rpg-glitch.gif)

## Files

| File | Use it for |
|---|---|
| [`index.html`](index.html) | The live page. One self-contained file, no build step. Click or press Remix for a new character; pick a hat, set it on fire, pause the glitch, copy or share the link. |
| [`media/rpg-glitch-still.png`](media/rpg-glitch-still.png) | 1360×880 still (`btopro` in a knight helmet). Used as the page's social preview image. |
| [`media/rpg-glitch.gif`](media/rpg-glitch.gif) | 680px loop: `btopro`, `zpg`, `edtechjoker` on fire, a numeric seed, and back. For READMEs and chat. |
| [`rpg-character/`](rpg-character/) | The element's own SVG layers, copied from `webcomponents` main so the page works on any static host and offline. |
| [`tools/`](tools/) | `render.mjs` re-renders the still and GIF from `index.html`; `sync-art.sh` refreshes `rpg-character/` from `webcomponents` main. |

## Shareable links

The page keeps the current character in the URL, using [rpg-me](https://github.com/haxtheweb/rpg-me)'s parameters, so one link works in both places:

| Parameter | Meaning |
|---|---|
| `seed` | Either rpg-me's 8-digit seed (base, face, face item, hair, pants, shirt, skin, hat color, one digit each) or any word, which goes through `rpg-character`'s own seed logic (`btopro`, `zpg` and `edtechjoker` are its easter eggs). |
| `hat` | `none`, `party`, `bunny`, `coffee`, `construction`, `cowboy`, `education`, `knight`, `ninja`, `pirate`, `watermelon` or `random`. |
| `fire` | `true` to set the character on fire. |
| `accessories` | 0 to 9. RPG Glitch only; rpg-me ignores it today. |

Examples: `?seed=btopro`, `?seed=zpg&hat=pirate`, `?seed=12345678&hat=ninja&fire=true`.

**Edit in rpg-me** opens the same character in rpg-me's editor. Word seeds are converted to their 8 digits for that link, and the accessory is dropped because rpg-me doesn't edit accessories yet.

## How it moves

A burst of about 0.3 s: the character is sliced into rows that swap between the old and new versions (plus a flash of the `error` hat), with RGB channel splits, pixelation, screen tears, block corruption and static. Then it holds still for about 4 s so you can see the character. While idle, it glitches through other hats every few seconds and lands back on its own. Scan lines sit over the whole scene.

**Pause glitch** stops all motion. People who set "reduce motion" in their system get the paused version by default; clicking still swaps characters, just without the animation.

## Alt text

> Pixel-art scene on an old CRT screen: a small RPG character stands in front of dark purple pixel mountains under a starry sky, above a glowing magenta perspective grid. Every few seconds the character tears apart into cyan and magenta slices and static, then reassembles in a different hat or as a different character. Below it, glitchy text reads "hax_the_web" and "// the future is remixable".

## Suggested social caption

> Glitch your way to a new RPG character. Every click is a remix, and every remix has a link. The future is remixable.
>
> #HAXTheWeb #OpenSource #WebComponents #PixelArt

## Provenance

Made with an AI assistant (Claude) under HAX team direction. The scene, glitch effects and CRT treatment are procedural canvas code, not hand-drawn. The characters are the `rpg-character` element's own art, composed in the element's draw order with its seed rules. The glitch style was inspired by the general hacker and glitch-art aesthetic; it copies no specific third-party artwork.

## Hosting

`index.html`, `rpg-character/` and `media/` make up a standalone static site. Publish this folder to any static host (GitHub Pages, Netlify, Vercel, `npx surge .`). Links only work on a host, since they point back at the page itself.

## Rebuild the media

You need Node.js and `ffmpeg`.

```sh
cd tools
npm install
npx playwright install chromium
npm run all        # still, then gif
npm run sync-art   # optional: refresh rpg-character/ from webcomponents main
```
