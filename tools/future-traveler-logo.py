#!/usr/bin/env python3
"""Build the Future Traveler platform logo files in future-traveler-logo/.

The logo is the `hax:future-traveler` icon from hax-iconset
(https://github.com/haxtheweb/webcomponents/blob/master/elements/hax-iconset/lib/svgs/hax/future-traveler.svg),
unchanged apart from two things that app icons need: the HAX lettering is
outlined (Roboto Black, the icon's own font) so it renders the same with no
font installed, and the art is centered in the square.

    python3 tools/future-traveler-logo.py

Writes the SVG masters, then every size the HAXcms site boilerplate, the
HAXcms platform pages and the desktop app use, under the file names those
projects already use, so each folder can be copied over as is.

Run from the repo root. Needs rsvg-convert (librsvg) and Pillow.
"""
import io
import os
import subprocess

from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "future-traveler-logo")

TITLE = "HAX Future Traveler logo"
WHITE = "#ffffff"
RIM = "#e4e5e7"  # DDD limestoneLight

# "HAX" in Roboto Black at the icon's size and position (font-size 4.6,
# centered on x=12, baseline y=12.8), as outlines.
HAX_PATH = (
    "M8.366 9.53V10.828H9.525V9.53H10.311V12.8H9.525V11.434H8.366V12.8H7.577V9.53Z"
    "M12.896 12.8 12.708 12.189H11.627L11.438 12.8H10.596L11.795 9.53H12.537L13.745 12.8Z"
    "M11.815 11.58H12.519L12.166 10.444ZM14.706 9.53 15.268 10.565 15.829 9.53H16.73"
    "L15.796 11.151 16.775 12.8H15.865L15.268 11.74 14.67 12.8H13.76L14.74 11.151 13.805 9.53Z"
)

# The icon's shapes in its own 24 x 24 space. They span x 3..21 and
# y 1.9..20, so the art sits high in the box as an inline icon.
ART = (
    '<path d="M12 6.6v-.8" stroke="#1d5e3c" stroke-width="1.4" stroke-linecap="round"/>'
    '<circle cx="12" cy="4" r="1.8" fill="#e4e5e7" stroke="#5b5b5b" stroke-width=".6"/>'
    '<path d="M3.2 15.4C3.2 9.6 7 6.6 12 6.6s8.8 3 8.8 8.8Z" fill="#bc204b"/>'
    f'<path d="{HAX_PATH}" fill="#fff"/>'
    '<rect x="3" y="14.4" width="18" height="2.4" rx="1.2" fill="#1d5e3c"/>'
    '<circle cx="8.2" cy="16.6" r="3.4" fill="#1d5e3c"/>'
    '<circle cx="15.8" cy="16.6" r="3.4" fill="#1d5e3c"/>'
    '<g fill="#2fd3e0"><circle cx="8.2" cy="16.6" r="2.2"/><circle cx="15.8" cy="16.6" r="2.2"/></g>'
)
ART_BOX = (3.0, 1.9, 21.0, 20.0)  # left, top, right, bottom


def placed(canvas, fill):
    """The art scaled so its longer side is `fill` of the canvas, centered."""
    left, top, right, bottom = ART_BOX
    scale = canvas * fill / max(right - left, bottom - top)
    dx = canvas / 2 - scale * (left + right) / 2
    dy = canvas / 2 - scale * (top + bottom) / 2
    return f'<g transform="translate({dx:.3f} {dy:.3f}) scale({scale:.4f})">{ART}</g>'


def svg(body, canvas=512):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {canvas} {canvas}" '
        f'width="{canvas}" height="{canvas}" role="img" aria-label="{TITLE}">'
        f"<title>{TITLE}</title>{body}</svg>\n"
    )


def logo():
    """Transparent background, art filling most of the square."""
    return svg(placed(512, 0.9))


def logo_on_white():
    """Full-bleed white square with the art inside the maskable safe zone,
    for places that crop or round the icon themselves (iOS home screen,
    Android adaptive icons)."""
    return svg(f'<rect width="512" height="512" fill="{WHITE}"/>' + placed(512, 0.62))


def logo_app_tile():
    """macOS app icon shape: a white rounded tile inset in the canvas."""
    tile = (
        f'<rect x="50" y="50" width="412" height="412" rx="92" fill="{WHITE}" '
        f'stroke="{RIM}" stroke-width="2"/>'
    )
    return svg(tile + placed(512, 0.54))


def render(svg_path, size):
    png = subprocess.run(
        ["rsvg-convert", "-w", str(size), "-h", str(size), svg_path],
        check=True,
        capture_output=True,
    ).stdout
    return Image.open(io.BytesIO(png)).convert("RGBA")


def save_png(image, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    image.save(path, format="PNG", optimize=True)


def save_ico(svg_path, path, sizes):
    images = [render(svg_path, s) for s in sizes]
    os.makedirs(os.path.dirname(path), exist_ok=True)
    images[-1].save(path, format="ICO", sizes=[(s, s) for s in sizes], append_images=images[:-1])


def main():
    masters = {
        "logo": logo(),
        "logo-on-white": logo_on_white(),
        "logo-app-tile": logo_app_tile(),
    }
    os.makedirs(os.path.join(ROOT, "svg"), exist_ok=True)
    paths = {}
    for name, text in masters.items():
        paths[name] = os.path.join(ROOT, "svg", name + ".svg")
        with open(paths[name], "w", encoding="utf-8") as handle:
            handle.write(text)

    def png(master, size, *where):
        save_png(render(paths[master], size), os.path.join(ROOT, *where))

    # General purpose renders.
    for size in (16, 32, 48, 64, 96, 128, 180, 192, 256, 512, 1024):
        png("logo", size, "png", f"logo-{size}.png")
    for size in (180, 192, 512, 1024):
        png("logo-on-white", size, "png", f"logo-on-white-{size}.png")
    for size in (512, 1024):
        png("logo-app-tile", size, "png", f"logo-app-tile-{size}.png")

    # HAXcms site boilerplate: <site>/assets/ in haxcms-nodejs and haxcms-php.
    site = "haxcms-site-assets"
    for size in (48, 72, 96, 144, 192, 256, 512):
        png("logo", size, site, f"icon-{size}x{size}.png")
    png("logo", 32, site, "favicon.png")
    save_ico(paths["logo"], os.path.join(ROOT, site, "favicon.ico"), (16, 24, 32, 48, 64))

    # HAXcms platform pages (dashboard, login): assets/ at the app root.
    app = "haxcms-platform-assets"
    for size in (36, 48, 72, 96, 144, 192):
        png("logo", size, app, f"android-icon-{size}x{size}.png")
    for size in (57, 60, 72, 76, 114, 120, 144, 152, 180):
        png("logo-on-white", size, app, f"apple-icon-{size}x{size}.png")
    png("logo-on-white", 192, app, "apple-icon.png")
    png("logo-on-white", 192, app, "apple-icon-precomposed.png")
    for size in (16, 32, 96):
        png("logo", size, app, f"favicon-{size}x{size}.png")
    png("logo", 96, app, "favicon.png")
    for size in (48, 72, 96, 144, 192, 256, 512):
        png("logo", size, app, f"icon-{size}x{size}.png")
    for size in (70, 144, 150, 310):
        png("logo", size, app, f"ms-icon-{size}x{size}.png")
    png("logo", 512, app, "pwa-icon.png")
    save_ico(paths["logo"], os.path.join(ROOT, app, "favicon.ico"), (16, 24, 32, 48, 64))

    # Desktop app (Electron): Windows .ico, macOS .icns, Linux .png.
    desktop = "desktop"
    save_ico(paths["logo"], os.path.join(ROOT, desktop, "icon.ico"), (16, 24, 32, 48, 64, 128, 256))
    png("logo", 512, desktop, "icon.png")
    render(paths["logo-app-tile"], 1024).save(os.path.join(ROOT, desktop, "icon.icns"), format="ICNS")

    count = sum(len(files) for _, _, files in os.walk(ROOT))
    print(f"wrote {count} files to future-traveler-logo/")


if __name__ == "__main__":
    main()
