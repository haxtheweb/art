# AGENTS.md: guide for LLMs and coding agents

This repo holds artwork for **HAX** (HAXtheweb, https://haxtheweb.org), an open-source ecosystem for authoring and publishing web content without needing to understand the web. Start here, then read `manifest.json` (machine-readable catalog) and `world-traveler/README.md` (the mascot's story).

## What's here

| Path | What it is |
|---|---|
| `hax-art/` | Portfolio HAXsite (glossy-portfolio-theme) that browses this repo's art by raw GitHub URL. Generated: edit `tools/hax-art-items.mjs` and run `tools/rebuild-hax-art.sh`, never hand-edit `hax-art/site.json` or `hax-art/pages/`. The HAX CLI commits to this repo as it runs; squash before a PR. Deployed with the rest of the repo by `.github/workflows/pages.yml`. |
| `world-traveler/` | 36 variants of the **World Traveler**, HAX's mascot (also called *World Changer* or *Future Traveler*). Files are named `funny-traveler-NN.(png\|jpeg)`. |
| `haxtheweb/` | HAX brand assets: logos, stickers, banners, thumbnails, GIFs, how-to graphics, and layered source files (`.psd`, `.ai`). |
| `haxtheweb/rpg-glitch/` | Interactive page: the `rpg-character` glitching on an 80s CRT, with shareable rpg-me-compatible links. Its `rpg-character/` folder is a copy of the element's art from `webcomponents` main; refresh it with `tools/sync-art.sh`, don't hand-edit it. |
| `haxtheweb/hax-the-web-game/` | HAX the Web: a 16-bit attract-mode game where the `rpg-character` collects 12 pieces of HAX lore, then gets a run report. `index.html` is built from `tools/template.html` by `tools/build.mjs`; edit the template, not the built page. |
| `haxtheweb/hax-of-the-web/` | HAX of the Web: a Halloween arcade title-screen homage (parody format, review before official promotion) with the `rpg-character` zombie pirate girl, Merlin cheat codes, and a playable HAXcms site in `play/` (`haxcms-site-builder` in demo mode, nothing saves). `index.html`, `app.js`, `hax-elements.js` and both `.htaccess` files are built from `tools/template.html` by `tools/build.mjs`; edit the template, not the built files. |
| `presentation-materials/` | Diagrams for talks (HAX history, legend, class-club-lab pipeline), `hax-in-a-minute/`: a one-minute doodle explainer with MP4, GIF, PPTX and stills, `episode-xxvi/`: a space-opera opening crawl (HTML) about HAX in 2026, and `hax-the-web-intro/`: a 30-second neon opening-titles homage (interactive page plus stills; parody, review before official promotion). |
| `HAXLogo.svg` | Primary vector logo. |
| `manifest.json` | Catalog of every World Traveler image: alt text, style tags, setting, size, third-party flags. |
| `llms.txt` | Short index for LLM crawlers. |
| `LICENSING.md` | Reuse terms (proposed CC BY 4.0 for art; read the third-party caveat). |

Use `world-traveler/contact-sheet.jpg` to see all 36 variants in one image before opening individual files.

## The one-paragraph version

The World Traveler is a fun, slightly silly time traveler in a red helmet with a "HAX" visor band, steampunk goggles with cyan lenses, a green backpack, and a lightbulb on a stalk. He travels through time collecting the best ideas of every era and carrying them into the future so everyone can see what's possible: a world where data flows like water. He is a caricature of the creator of HAX, via the `rpg-character` lineage. His message: **Dream it, remix it, have it, share it.** In HAX terms: people should be able to author, remix and publish with a well-structured voice online without needing to learn how the web works.

## How to use this art when you help a human

- **Explaining HAX:** use the traveler as the friendly face. Pair an image with one plain sentence: *HAX lets you create, remix and publish web content without needing to understand the web.*
- **Pick by role** (the `role` field in the manifest): `badge` (circular starburst, best for avatars and social), `icon` (helmet-only, best for small sizes), `rpg`/`card`/`game` (playful, for community and events), `comic` (web metaphors), `time-travel` (era-hopping), `merch` (mockups).
- **Default look** for anything on-brand: `world-traveler/funny-traveler-15.png` (classic burst). Small-size icon: `funny-traveler-17.jpeg` or `HAXLogo.svg`.
- **Always write alt text.** Start from the manifest's `alt` field and adapt it to the page's purpose.
- **Don't invent lore.** If you're asked what something "means" and the answer isn't in `world-traveler/README.md`, say you're not sure rather than guessing.

## Rules for contributing to this repo

1. **Never rename or delete existing files.** External sites hotlink these paths. Add new files; deprecate in `manifest.json`.
2. **New traveler variants:** use the next number (`funny-traveler-37.*`), then add a manifest entry (`id`, `file`, `url`, `alt`, `role`, `styles`, `setting`, `width`, `height`, `bytes`, `canon`, `third_party_reference`, `reuse`, `notes`).
3. **Be honest about provenance.** Most variants are AI-generated remixes of the original human-made character. Say so; never present generated art as hand-drawn. Several variants deliberately parody other works (see `third_party_reference`).
4. **Keep the on-model features** (see "Character sheet" in `world-traveler/README.md`).
5. **Open a PR, don't push to `main`.** Describe which files each change touches. A human reviews and merges.
6. **No machine-specific paths** in docs or scripts; link by GitHub URL.
7. Source files (`.psd`, `.ai`) are large binaries; don't re-export or recompress them.

## Known gaps

- `haxtheweb/` and `presentation-materials/` are not yet cataloged image by image.
- The repo `LICENSE` is still Apache-2.0; the art licensing change in `LICENSING.md` is proposed, not final.
