#!/usr/bin/env python3
"""Web-sized WebP copies of the art the hax-art site shows.

The originals stay exactly where they are (other sites hotlink them by
path); this writes smaller copies next to them under web/, mirroring the
source path:

    future-traveler/funny-traveler-08.png
    -> web/future-traveler/funny-traveler-08-800w.webp
    -> web/future-traveler/funny-traveler-08-1600w.webp

The site uses them for its hero, logo, cards and in-page images; every page
still links the full-size file. Animated GIFs are left as they are.

The hero is a JPEG copy (--format jpg): a site's banner image is also its
social card (og:image), and not every network shows WebP previews.

    node tools/hax-art-items.mjs --list-images | python3 tools/web-images.py
    python3 tools/web-images.py --widths 160 future-traveler/funny-traveler-15.png
    python3 tools/web-images.py --widths 1600 --format jpg future-traveler/funny-traveler-08.png

Reads source paths (relative to the repo root) from the arguments, or one
per line on stdin. Needs Pillow with WebP support. A copy newer than its
source is left alone, so running it again only writes what changed.
Generated output: edit this file, not web/.
"""
import argparse
import os
import sys

from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
WEB = "web"
QUALITY = 80


def web_path(source, width, fmt="webp"):
    stem, _ = os.path.splitext(source)
    return os.path.join(WEB, f"{stem}-{width}w.{fmt}")


def make(source, widths, fmt="webp"):
    src = os.path.join(ROOT, source)
    if not os.path.isfile(src):
        print(f"skip (missing): {source}", file=sys.stderr)
        return 0
    if source.lower().endswith(".gif"):
        return 0
    written = 0
    with Image.open(src) as img:
        img.load()
        for width in widths:
            out = os.path.join(ROOT, web_path(source, width, fmt))
            if os.path.isfile(out) and os.path.getmtime(out) >= os.path.getmtime(src):
                continue
            copy = img.copy()
            # never make a copy larger than the original
            if copy.width > width:
                height = round(copy.height * width / copy.width)
                copy = copy.resize((width, height), Image.LANCZOS)
            os.makedirs(os.path.dirname(out), exist_ok=True)
            if fmt == "jpg":
                # no transparency in JPEG: flatten onto white
                if copy.mode in ("RGBA", "LA", "P"):
                    copy = copy.convert("RGBA")
                    flat = Image.new("RGB", copy.size, (255, 255, 255))
                    flat.paste(copy, mask=copy.split()[-1])
                    copy = flat
                elif copy.mode != "RGB":
                    copy = copy.convert("RGB")
                copy.save(out, "JPEG", quality=82, optimize=True, progressive=True)
            else:
                if copy.mode not in ("RGB", "RGBA"):
                    copy = copy.convert("RGBA" if "transparency" in img.info or img.mode in ("LA", "P") else "RGB")
                copy.save(out, "WEBP", quality=QUALITY, method=6)
            written += 1
    return written


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("sources", nargs="*", help="paths relative to the repo root")
    parser.add_argument("--widths", default="800,1600", help="comma-separated widths in px")
    parser.add_argument("--format", default="webp", choices=["webp", "jpg"], help="output format")
    args = parser.parse_args()
    widths = [int(w) for w in args.widths.split(",") if w.strip()]
    sources = args.sources or [line.strip() for line in sys.stdin if line.strip()]
    written = sum(make(s, widths, args.format) for s in dict.fromkeys(sources))
    print(f"web-images: {written} written for {len(sources)} sources")


if __name__ == "__main__":
    main()
