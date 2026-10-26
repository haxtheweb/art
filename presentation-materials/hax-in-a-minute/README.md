# HAX in under a minute

A whiteboard-doodle explainer of HAX in five scenes, about a minute long. It covers what HAX is, why the ecosystem is powerful, how the magic script makes later pages faster, the seven community pillars, and "What will you launch?". It ends on rockets that keep flying through falling stars.

![The lift-off scene: five rockets with pillar-striped engines, labeled Docs, Portfolio, Website, Blog and Course](media/stills/05-lift-off.png)

## Files

| File | Use it for |
|---|---|
| [`index.html`](index.html) | The live, interactive version: play, pause, scrub, jump to a scene, read the narration. One self-contained page with no build step. After the story ends, the starfield keeps falling. |
| [`media/hax-in-a-minute.mp4`](media/hax-in-a-minute.mp4) | 1080p video, H.264, about 57 s (the story plus 6 s of rockets cruising). Use it for slides, YouTube, LinkedIn and social posts. |
| [`media/hax-in-a-minute.gif`](media/hax-in-a-minute.gif) | The whole piece as a 960px GIF for READMEs and chat. |
| [`media/hax-lift-off-loop.gif`](media/hax-lift-off-loop.gif) | A seamless 4 s loop of the rockets among the falling stars. Good as an avatar, banner or reaction. |
| [`media/hax-in-a-minute.pptx`](media/hax-in-a-minute.pptx) | A PowerPoint deck. Slide 1 embeds the video. Slides 2 to 6 are each scene's end frame, with the narration in the speaker notes. |
| [`media/stills/`](media/stills/) | 1920×1080 PNGs, one per scene, each in a light and a `-dark` version. |
| [`tools/`](tools/) | The scripts that made every file above from `index.html`. |

Each scene's narration is in the page under "Narration script".

## Characters

The characters are real [`rpg-character`](https://github.com/haxtheweb/webcomponents/tree/main/elements/rpg-character) combinations. Each one is composed from that element's own `lib/*.svg` layers, in the element's draw order:

| Role | Combination |
|---|---|
| Zombie pirate girl (scene 1, Website rocket) | the `zpg` seed easter egg, pirate hat |
| AI agents (Docs rocket) | "greyman": grey skin (`skin` 2), blank face, no hat or extras |
| Students (Portfolio rocket) | boy body (`base` 0), light skin, no hat |
| Designers (Blog rocket) | bunny hat |
| Educators (Course rocket) | graduation hat (`education`) |
| Developers | boy body, darker skin (`skin` 5), hard hat (`construction`), glasses |

## Brand

Colors, type, radii and focus styles come from the DDD design system. The type is Roboto, Roboto Slab (titles) and Roboto Condensed (labels and buttons). The light and dark themes follow the viewer's system setting. The only colors that aren't DDD tokens are the `rpg-character` pixel-art palettes.

## Provenance

This piece was made with an AI assistant (Claude) under HAX team direction. The doodles are generated SVG, not hand-drawn. The characters are the `rpg-character` element's own art.

## Rebuild the media

You need Node.js and `ffmpeg`.

```sh
cd tools
npm install
npx playwright install chromium
npm run all      # stills, mp4, gifs, pptx (in that order)
```

The renderer steps the timeline frame by frame, so every export matches the page exactly. It loads Roboto from `@fontsource`, so it works offline. Edit `index.html`, then re-run the export you need.

## Posting it

`index.html` and `media/` make up a standalone static site. Publish this folder to any static host, for example `npx surge .`, Netlify, Vercel or GitHub Pages, when you want a short-lived link to share. Link the files in this folder from the repo the rest of the time.
