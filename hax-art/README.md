# HAX art (portfolio site)

A HAXsite for browsing the art and media in this repo, built with the [HAX CLI](https://github.com/haxtheweb/create) and the `glossy-portfolio-theme`. It holds no copies of the art: every image is a raw GitHub URL into this repo, and every interactive piece links to its GitHub Pages address.

Live (once Pages is on): **https://haxtheweb.github.io/art/** (redirects to `/art/hax-art/`).

## Sections

| Section | What's in it |
|---|---|
| World Traveler | One page per HAX-original variant from [`manifest.json`](../manifest.json), with its alt text, role, style, setting and size. The grid filters by role. |
| rpg-character | RPG Glitch, HAX the Web, HAX of the Web and the wanted poster, plus a live `<rpg-character>` on the section page. |
| Brand | Logos, stickers, banners and posters from [`haxtheweb/`](../haxtheweb/). |
| Talks | HAX in under a minute, the HAX The Web opening titles, Episode XXVI and the presentation diagrams. |
| Use the art | Attribution, licensing, hotlinking and provenance. |

The interactive homages (HAX of the Web, the opening titles, Episode XXVI) are included, and each page credits what inspired it. Left out on purpose: World Traveler variants flagged `third_party_reference` in the manifest, and the EdTech Joker / DedSec series. A static HAXsite serves `site.json` as-is, so an unpublished page would still be public; leave a page out rather than marking it unpublished.

## Editing

The pages are generated. Don't hand-edit `site.json` or `pages/`; change the generator and rebuild:

- [`tools/hax-art-items.mjs`](../tools/hax-art-items.mjs) holds the page list. World Traveler pages come from `manifest.json`, so a new variant with a manifest entry shows up on the next rebuild.
- [`tools/rebuild-hax-art.sh`](../tools/rebuild-hax-art.sh) scaffolds the site with `hax site`, imports the pages with `hax site site:items-import`, removes the starter page, sets the title and hero image, and keeps this README. Run it from the repo root with the HAX CLI installed (`npm install -g @haxtheweb/create`).

The HAX CLI commits to the surrounding git repo as it works ("Page deleted: …" and similar). Squash those into one commit before opening a pull request.

To preview locally: `cd hax-art && hax serve`, then open http://localhost:3000.

## Publishing

[`.github/workflows/pages.yml`](../.github/workflows/pages.yml) deploys the whole repo to GitHub Pages on every push to `main`, minus the layered `.psd` and `.ai` sources. [`tools/pages-hax-art.mjs`](../tools/pages-hax-art.mjs) prepares the staged copy:

- `ghpages.html` becomes `index.html`, so HAXcms loads from `cdn.hax.cloud`.
- The `<base href>` is pinned to the `hax-art/` folder. The stock script assumes the site sits at the repo root.
- A root `404.html` turns deep links like `/art/hax-art/brand` into `?p=/brand` for the HAXcms router.
- A root `index.html` redirects `/art/` to the portfolio.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions.**

## Provenance

The site was scaffolded and filled with the HAX CLI by an AI assistant (Claude) under HAX team direction. The art's own provenance is on each piece's page and in [`LICENSING.md`](../LICENSING.md).
