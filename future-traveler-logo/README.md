# Future Traveler logo

The logo that represents the HAX platform: the Future Traveler's red helmet with HAX on it, his green goggles with cyan lenses, and his lightbulb. It is the [`hax:future-traveler`](https://github.com/haxtheweb/webcomponents/blob/master/elements/hax-iconset/lib/svgs/hax/future-traveler.svg) icon from hax-iconset, prepared in the sizes that favicons, web app manifests and app installers need.

![The logo](png/logo-512.png)

It is the default icon for new HAXcms sites ([haxcms-nodejs](https://github.com/haxtheweb/haxcms-nodejs), [haxcms-php](https://github.com/haxtheweb/haxcms-php)), for the HAXcms platform pages, and for the [desktop app](https://github.com/haxtheweb/haxcms-desktop).

The art is the icon's, unchanged. Two things were done so it works as an app icon: the HAX lettering is outlines of Roboto Black (the icon's font), so it looks the same with no font installed, and the art is centered in the square.

## Three versions

| Version | Use it for | Master |
|---|---|---|
| Logo | Favicons, manifest icons, anywhere the page or OS supplies the background. Transparent. | [`svg/logo.svg`](svg/logo.svg) |
| Logo on white | Places that crop or round the icon themselves: iOS home screen, Android adaptive (maskable) icons. Full-bleed white, art inside the safe zone. | [`svg/logo-on-white.svg`](svg/logo-on-white.svg) |
| App tile | macOS app icon: a white rounded tile inset in the canvas. | [`svg/logo-app-tile.svg`](svg/logo-app-tile.svg) |

The lettering reads from about 32 pixels up. At 16 pixels the helmet and goggles carry it.

## Files

- `svg/`: the three masters, 512 × 512.
- `png/`: general renders. `logo-<size>.png` at 16, 32, 48, 64, 96, 128, 180, 192, 256, 512 and 1024; `logo-on-white-<size>.png` at 180, 192, 512 and 1024; `logo-app-tile-<size>.png` at 512 and 1024.
- `haxcms-site-assets/`: the `assets/` icons of a HAXcms site, under the names the site boilerplate uses (`favicon.ico`, `favicon.png`, `icon-48x48.png` to `icon-512x512.png`).
- `haxcms-platform-assets/`: the `assets/` icons of the HAXcms platform pages (`android-icon-*`, `apple-icon-*`, `ms-icon-*`, `favicon-*`, `icon-*`, `pwa-icon.png`, `favicon.ico`). The `apple-icon-*` files are the on-white version.
- `desktop/`: `icon.ico` (Windows, 16 to 256), `icon.icns` (macOS, app tile) and `icon.png` (Linux, 512).

Alt text: *HAX Future Traveler logo: a red helmet with HAX in white letters, green goggles with cyan lenses, and a lightbulb on top.*

## Rebuilding

Everything here except this README is generated; edit [`tools/future-traveler-logo.py`](../tools/future-traveler-logo.py), not the files. From the repo root, with librsvg (`rsvg-convert`) and Pillow installed:

```sh
python3 tools/future-traveler-logo.py
```

If the icon changes in hax-iconset, update the shapes in the script and rebuild, then copy `haxcms-site-assets/`, `haxcms-platform-assets/` and `desktop/` into the projects above.

## Provenance

The icon comes from hax-iconset. The script and the renders here were made by Claude, an AI, under HAX team direction.
