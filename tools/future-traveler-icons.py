#!/usr/bin/env python3
"""Build the Future Traveler icon concepts in future-traveler-icons/.

Writes one SVG per concept to future-traveler-icons/svg/, plus
future-traveler-icons/index.html, a demo page where the lightbulb glows on
hover or keyboard focus.

    python3 tools/future-traveler-icons.py

PNG renders and the contact sheet are made from the SVGs afterwards (see
future-traveler-icons/README.md). Run from the repo root; no dependencies
beyond Python 3.

Colors: the mascot keeps his own (red helmet, green pack, cyan goggles,
yellow bulb). Backgrounds, paper layers and rims are DDD tokens, named in
each concept's title.
"""
import html
import math
import os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "future-traveler-icons")

RED = "#c8102e"      # mascot red
GREEN = "#1f5a44"    # backpack / desk
GREEN_D = "#123829"
CYAN = "#22e4f0"     # goggle lenses
WHITE = "#ffffff"
INK = "#000321"      # DDD potentialMidnight
YELLOW = "#ffd100"   # DDD keystoneYellow

DDD = {
    "creekTeal": "#3ea39e", "creekLight": "#cfeceb", "beaverBlue": "#1e407c",
    "skyBlue": "#009cde", "opportunityGreen": "#008755", "wonderPurple": "#491d70",
    "athertonViolet": "#ac8dce", "inventOrange": "#e98300",
    "potentialMidnight": INK, "limestoneMaxLight": "#f2f2f4", "limestoneLight": "#e4e5e7",
}


class Ids:
    """Element ids prefixed per file, so several SVGs can be inlined on one page."""

    def __init__(self, prefix):
        self.prefix, self.n = prefix, 0

    def __call__(self, kind):
        self.n += 1
        return f"{self.prefix}-{kind}{self.n}"


def hax(ids, x, y, W, H, sw, color=WHITE):
    """Geometric HAX letters in the box (x, y, W, H), stroke width sw, flat ends."""
    g = W * 0.11
    lw = (W - 2 * g) / 3
    out = []
    for i, ch in enumerate("HAX"):
        lx = x + i * (lw + g)
        cid = ids("l")
        out.append(f'<clipPath id="{cid}"><rect x="{lx:.1f}" y="{y:.1f}" width="{lw:.1f}" height="{H:.1f}"/></clipPath>')
        s = sw / 2
        if ch == "H":
            d = (f"M{lx+s:.1f},{y:.1f}V{y+H:.1f}M{lx+lw-s:.1f},{y:.1f}V{y+H:.1f}"
                 f"M{lx:.1f},{y+H/2:.1f}H{lx+lw:.1f}")
        elif ch == "A":
            ax = lx + lw / 2
            dx = lw / 2 - s * 0.9
            d = f"M{ax-dx*1.15:.1f},{y+H*1.15:.1f}L{ax:.1f},{y-s*0.2:.1f}L{ax+dx*1.15:.1f},{y+H*1.15:.1f}"
            cy = y + H * 0.68
            t = (cy - y) / H
            d += f"M{ax-dx*t:.1f},{cy:.1f}H{ax+dx*t:.1f}"
        else:
            d = (f"M{lx-s*0.3:.1f},{y-s*0.3:.1f}L{lx+lw+s*0.3:.1f},{y+H+s*0.3:.1f}"
                 f"M{lx+lw+s*0.3:.1f},{y-s*0.3:.1f}L{lx-s*0.3:.1f},{y+H+s*0.3:.1f}")
        out.append(f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{sw:.1f}" '
                   f'stroke-linejoin="miter" stroke-miterlimit="8" clip-path="url(#{cid})"/>')
    return "".join(out)


def burst(cx, cy, r1, r2, n, fill, rot=-90):
    pts = []
    for i in range(n * 2):
        r = r1 if i % 2 == 0 else r2
        a = math.radians(rot + i * 180 / n)
        pts.append(f"{cx + r*math.cos(a):.1f},{cy + r*math.sin(a):.1f}")
    return f'<polygon points="{" ".join(pts)}" fill="{fill}"/>'


def helmet(cx, top, w, bottom, fill=RED, stroke=INK, sw=14):
    r = w / 2
    left, right = cx - r, cx + r
    stroke_attrs = f' stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"' if sw else ""
    return (f'<path d="M{left:.1f},{bottom:.1f}V{top+r:.1f}A{r:.1f},{r:.1f} 0 0 1 {right:.1f},{top+r:.1f}'
            f'V{bottom:.1f}Z" fill="{fill}"{stroke_attrs}/>')


def goggles(cx, cy, r, gap, ring=INK):
    ring_w = r * 0.32
    out = [f'<rect x="{cx-gap/2-r:.1f}" y="{cy-r*0.28:.1f}" width="{gap+2*r:.1f}" height="{r*0.56:.1f}" fill="{ring}"/>']
    for dx in (-gap / 2, gap / 2):
        out.append(f'<circle cx="{cx+dx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="{CYAN}" stroke="{ring}" stroke-width="{ring_w:.1f}"/>')
        out.append(f'<circle cx="{cx+dx-r*0.3:.1f}" cy="{cy-r*0.3:.1f}" r="{r*0.18:.1f}" fill="{WHITE}" opacity=".75"/>')
    return "".join(out)


def bulb(x, y, r, stalk_from, stroke=INK, sw=10):
    sx, sy = stalk_from
    out = [f'<g class="ft-bulb">',
           f'<path d="M{sx:.1f},{sy:.1f}C{sx:.1f},{(sy+y)/2:.1f} {x:.1f},{(sy+y)/2+r:.1f} {x:.1f},{y+r*1.3:.1f}" '
           f'fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round"/>',
           f'<rect x="{x-r*0.45:.1f}" y="{y+r*0.75:.1f}" width="{r*0.9:.1f}" height="{r*0.55:.1f}" rx="{r*0.12:.1f}" '
           f'fill="{GREEN}" stroke="{stroke}" stroke-width="{sw*0.7:.1f}"/>',
           f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="{YELLOW}" stroke="{stroke}" stroke-width="{sw*0.8:.1f}"/>']
    for a in (-150, -110, -70, -30):
        t = math.radians(a)
        out.append(f'<line x1="{x+math.cos(t)*r*1.45:.1f}" y1="{y+math.sin(t)*r*1.45:.1f}" '
                   f'x2="{x+math.cos(t)*r*1.95:.1f}" y2="{y+math.sin(t)*r*1.95:.1f}" '
                   f'stroke="{stroke}" stroke-width="{sw*0.8:.1f}" stroke-linecap="round"/>')
    out.append("</g>")
    return "".join(out)


def band(ids, x, y, w, h, sw_letters, rx):
    px, py = w * 0.1, h * 0.16
    return (f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx:.1f}" fill="{INK}"/>'
            + hax(ids, x + px, y + py, w - 2 * px, h - 2 * py, sw_letters))


def drop(el, dx, dy, opacity):
    return f'<g transform="translate({dx},{dy})" opacity="{opacity}">{el}</g>'


# Bulb centers, used by the demo page's glow overlay.
BULB = {"sticker": (388, 110), "paper-sticker": (388, 110), "paper-cut": (404, 116)}


def sticker(ids, fill, round_cut=False, rim=WHITE, bulb_ink=INK):
    if round_cut:
        frame = (f'<circle cx="256" cy="256" r="246" fill="{rim}" stroke="{INK}" stroke-width="6"/>'
                 f'<circle cx="256" cy="256" r="216" fill="{fill}"/>')
    else:
        frame = (f'<rect x="10" y="10" width="492" height="492" rx="150" fill="{rim}" stroke="{INK}" stroke-width="6"/>'
                 f'<rect x="40" y="40" width="432" height="432" rx="124" fill="{fill}"/>')
    return "".join([frame,
                    bulb(388, 110, 30, stalk_from=(350, 186), sw=11, stroke=bulb_ink),
                    helmet(256, 128, 300, 430),
                    band(ids, 126, 204, 260, 112, 22, rx=13.4),
                    goggles(256, 368, 42, 110)])


def paper_sticker(ids, fill, paper):
    cid = ids("clip")
    return "".join([
        f'<rect x="10" y="10" width="492" height="492" rx="150" fill="{WHITE}" stroke="{INK}" stroke-width="6"/>',
        f'<clipPath id="{cid}"><rect x="40" y="40" width="432" height="432" rx="124"/></clipPath>',
        f'<g clip-path="url(#{cid})"><rect x="40" y="40" width="432" height="432" fill="{fill}"/>',
        drop(burst(256, 262, 236, 150, 9, INK, rot=-80), 6, 10, ".25"), burst(256, 262, 236, 150, 9, paper, rot=-80),
        drop(helmet(256, 140, 290, 470, fill=INK, sw=0), 8, 10, ".3"), helmet(256, 140, 290, 470, sw=0),
        drop(f'<rect x="131" y="214" width="250" height="108" rx="10" fill="{INK}"/>', 5, 7, ".35"),
        band(ids, 131, 214, 250, 108, 21, rx=10),
        goggles(256, 372, 42, 112, ring=GREEN_D), "</g>",
        bulb(388, 110, 30, stalk_from=(356, 180), sw=11)])


def paper_cut(ids, bg, paper, bulb_ink=INK):
    cid = ids("clip")
    return "".join([
        f'<clipPath id="{cid}"><circle cx="256" cy="256" r="246"/></clipPath>',
        f'<g clip-path="url(#{cid})"><rect width="512" height="512" fill="{bg}"/>',
        drop(burst(256, 256, 248, 160, 9, INK, rot=-80), 6, 10, ".25"), burst(256, 256, 248, 160, 9, paper, rot=-80),
        drop(f'<rect x="118" y="150" width="276" height="240" rx="18" fill="{INK}"/>', 8, 10, ".3"),
        f'<rect x="118" y="150" width="276" height="240" rx="18" fill="{GREEN}"/>',
        bulb(404, 116, 30, stalk_from=(376, 214), sw=9, stroke=bulb_ink),
        drop(helmet(256, 150, 248, 440, fill=INK, sw=0), 8, 10, ".3"), helmet(256, 150, 248, 440, sw=0),
        drop(f'<rect x="146" y="222" width="220" height="96" rx="10" fill="{INK}"/>', 5, 7, ".35"),
        band(ids, 146, 222, 220, 96, 18, rx=10),
        goggles(256, 362, 40, 104, ring=GREEN_D),
        f'<rect x="0" y="440" width="512" height="80" fill="{GREEN_D}"/></g>',
        f'<circle cx="256" cy="256" r="246" fill="none" stroke="{INK}" stroke-width="12"/>'])


D = DDD
LIGHT_INK = D["limestoneLight"]  # bulb outline on midnight, where dark ink disappears

# slug, family, title, alt, builder
CONCEPTS = [
    ("sticker-creek-teal", "sticker", "Sticker on creekTeal",
     "Die-cut sticker: the Future Traveler's red helmet with a black HAX visor and cyan goggles on a creekTeal rounded square with a thick white border; lightbulb top right.",
     lambda i: sticker(i, D["creekTeal"])),
    ("sticker-beaver-blue", "sticker", "Sticker on beaverBlue",
     "Die-cut sticker: red helmet with a HAX visor and cyan goggles on a beaverBlue rounded square with a white border; lightbulb top right.",
     lambda i: sticker(i, D["beaverBlue"])),
    ("sticker-sky-blue", "sticker", "Sticker on skyBlue",
     "Die-cut sticker: red helmet with a HAX visor and cyan goggles on a skyBlue rounded square with a white border; lightbulb top right.",
     lambda i: sticker(i, D["skyBlue"])),
    ("sticker-opportunity-green", "sticker", "Sticker on opportunityGreen",
     "Die-cut sticker: red helmet with a HAX visor and cyan goggles on an opportunityGreen rounded square with a white border; lightbulb top right.",
     lambda i: sticker(i, D["opportunityGreen"])),
    ("sticker-wonder-purple", "sticker", "Sticker on wonderPurple",
     "Die-cut sticker: red helmet with a HAX visor and cyan goggles on a wonderPurple rounded square with a white border; lightbulb top right.",
     lambda i: sticker(i, D["wonderPurple"])),
    ("sticker-invent-orange", "sticker", "Sticker on inventOrange",
     "Die-cut sticker: red helmet with a HAX visor and cyan goggles on an inventOrange rounded square with a white border; lightbulb top right.",
     lambda i: sticker(i, D["inventOrange"])),
    ("sticker-potential-midnight", "sticker", "Sticker on potentialMidnight, skyBlue rim",
     "Die-cut sticker: red helmet with a HAX visor and cyan goggles on a near-black potentialMidnight square with a skyBlue border; lightbulb top right.",
     lambda i: sticker(i, D["potentialMidnight"], rim=D["skyBlue"], bulb_ink=LIGHT_INK)),
    ("sticker-limestone-max-light", "sticker", "Sticker on limestoneMaxLight, beaverBlue rim",
     "Die-cut sticker: red helmet with a HAX visor and cyan goggles on a pale limestone square with a beaverBlue border; lightbulb top right.",
     lambda i: sticker(i, D["limestoneMaxLight"], rim=D["beaverBlue"])),
    ("sticker-round-beaver-blue", "sticker", "Round sticker on beaverBlue",
     "Round die-cut sticker: red helmet with a HAX visor and cyan goggles on a beaverBlue circle with a white border; lightbulb top right.",
     lambda i: sticker(i, D["beaverBlue"], round_cut=True)),
    ("paper-sticker-creek-teal", "paper-sticker", "Paper sticker on creekTeal, white paper",
     "Cut-paper layers inside a white die-cut sticker: red helmet with a HAX visor and cyan goggles over a white paper starburst on creekTeal, soft shadows; lightbulb top right.",
     lambda i: paper_sticker(i, D["creekTeal"], WHITE)),
    ("paper-sticker-wonder-purple", "paper-sticker", "Paper sticker on wonderPurple, athertonViolet paper",
     "Cut-paper layers inside a white die-cut sticker: red helmet with a HAX visor and cyan goggles over a violet paper starburst on wonderPurple, soft shadows; lightbulb top right.",
     lambda i: paper_sticker(i, D["wonderPurple"], D["athertonViolet"])),
    ("paper-sticker-beaver-blue", "paper-sticker", "Paper sticker on beaverBlue, skyBlue paper",
     "Cut-paper layers inside a white die-cut sticker: red helmet with a HAX visor and cyan goggles over a skyBlue paper starburst on beaverBlue, soft shadows; lightbulb top right.",
     lambda i: paper_sticker(i, D["beaverBlue"], D["skyBlue"])),
    ("paper-cut-hax-red", "paper-cut", "Paper cut in HAX red, white paper",
     "Cut-paper badge after funny-traveler-12: red helmet with a HAX visor and cyan goggles in front of a green pack, over a white starburst on a red circle, soft shadows; lightbulb top right.",
     lambda i: paper_cut(i, RED, WHITE)),
    ("paper-cut-beaver-blue", "paper-cut", "Paper cut on beaverBlue, white paper",
     "Cut-paper badge: red helmet with a HAX visor and cyan goggles in front of a green pack, over a white starburst on a beaverBlue circle; lightbulb top right.",
     lambda i: paper_cut(i, D["beaverBlue"], WHITE)),
    ("paper-cut-creek-teal", "paper-cut", "Paper cut on creekTeal, creekLight paper",
     "Cut-paper badge: red helmet with a HAX visor and cyan goggles in front of a green pack, over a pale teal starburst on a creekTeal circle; lightbulb top right.",
     lambda i: paper_cut(i, D["creekTeal"], D["creekLight"])),
    ("paper-cut-wonder-purple", "paper-cut", "Paper cut on wonderPurple, athertonViolet paper",
     "Cut-paper badge: red helmet with a HAX visor and cyan goggles in front of a green pack, over a violet starburst on a wonderPurple circle; lightbulb top right.",
     lambda i: paper_cut(i, D["wonderPurple"], D["athertonViolet"])),
    ("paper-cut-potential-midnight", "paper-cut", "Paper cut on potentialMidnight, skyBlue paper",
     "Cut-paper badge: red helmet with a HAX visor and cyan goggles in front of a green pack, over a skyBlue starburst on a near-black circle; lightbulb top right.",
     lambda i: paper_cut(i, D["potentialMidnight"], D["skyBlue"], bulb_ink=LIGHT_INK)),
    ("paper-cut-invent-orange", "paper-cut", "Paper cut on inventOrange, white paper",
     "Cut-paper badge: red helmet with a HAX visor and cyan goggles in front of a green pack, over a white starburst on an inventOrange circle; lightbulb top right.",
     lambda i: paper_cut(i, D["inventOrange"], WHITE)),
]

FAMILIES = [
    ("sticker", "Sticker", "Die-cut sticker. The white border keeps it readable on any surface."),
    ("paper-sticker", "Paper sticker", "The sticker frame with paper-cut layers and soft shadows inside."),
    ("paper-cut", "Paper cut", "Layered cut paper after funny-traveler-12."),
]


def glow_overlay(cx, cy):
    rays = "".join(
        f'<line x1="{cx+math.cos(math.radians(a))*46:.1f}" y1="{cy+math.sin(math.radians(a))*46:.1f}" '
        f'x2="{cx+math.cos(math.radians(a))*70:.1f}" y2="{cy+math.sin(math.radians(a))*70:.1f}"/>'
        for a in (-160, -120, -80, -40, 0, 40))
    return (f'<svg class="ft-glow" viewBox="0 0 512 512" aria-hidden="true" focusable="false">'
            f'<circle cx="{cx}" cy="{cy}" r="96" fill="{YELLOW}" opacity=".18"/>'
            f'<circle cx="{cx}" cy="{cy}" r="62" fill="{YELLOW}" opacity=".32"/>'
            f'<circle cx="{cx}" cy="{cy}" r="28" fill="#fff4b3"/>'
            f'<g class="ft-rays" style="transform-origin:{cx}px {cy}px" stroke="{YELLOW}" stroke-width="12" '
            f'stroke-linecap="round">{rays}</g></svg>')


PAGE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Future Traveler icon concepts</title>
<meta name="description" content="Sticker and paper-cut icon concepts for HAX's mascot, the Future Traveler, in DDD colors. Hover or focus an icon and his lightbulb glows.">
<!-- Generated by tools/future-traveler-icons.py; edit that, not this file. -->
<style>
:root{{--bg:#f2f2f4;--card:#ffffff;--line:#e4e5e7;--ink:#000321;--muted:#4a4a4a;--focus:#005fa9}}
@media (prefers-color-scheme: dark){{:root{{--bg:#000321;--card:#13182c;--line:#262c45;--ink:#f2f2f4;--muted:#c4c7cf;--focus:#76c8ec}}}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--bg);color:var(--ink);font-family:Roboto,"Franklin Gothic Medium",Tahoma,system-ui,sans-serif;line-height:1.5}}
main{{max-width:1200px;margin:0 auto;padding:40px 16px 64px}}
h1{{font-size:clamp(28px,4vw,40px);line-height:1.2;margin:0 0 8px}}
h2{{font-size:22px;margin:40px 0 4px}}
p{{margin:0 0 12px;max-width:72ch}}
.muted{{color:var(--muted)}}
.grid{{list-style:none;padding:0;margin:16px 0 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px}}
.card{{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:12px;align-items:center;text-align:center}}
.card h3{{margin:0;font-size:15px;line-height:1.35}}
.ft-btn{{position:relative;display:block;width:144px;height:144px;padding:0;border:0;background:none;border-radius:44px;cursor:pointer}}
.ft-btn.round{{border-radius:50%}}
.ft-btn img,.ft-glow{{display:block;width:144px;height:144px}}
.ft-glow{{position:absolute;inset:0;pointer-events:none;opacity:0}}
.ft-rays{{transform:scale(.6)}}
.ft-btn:focus-visible{{outline:3px solid var(--focus);outline-offset:4px}}
.ft-btn:hover .ft-glow,.ft-btn:focus-visible .ft-glow{{animation:ft-glow 700ms ease-out forwards}}
.ft-btn:hover .ft-rays,.ft-btn:focus-visible .ft-rays{{animation:ft-rays 700ms cubic-bezier(.2,.8,.3,1.2) forwards}}
@keyframes ft-glow{{0%{{opacity:0}}35%{{opacity:1}}100%{{opacity:.85}}}}
@keyframes ft-rays{{0%{{transform:scale(.6)}}60%{{transform:scale(1.08)}}100%{{transform:scale(1)}}}}
@media (prefers-reduced-motion: reduce){{
.ft-btn:hover .ft-glow,.ft-btn:focus-visible .ft-glow{{animation:none;opacity:.85}}
.ft-btn:hover .ft-rays,.ft-btn:focus-visible .ft-rays{{animation:none;transform:none}}
}}
.sizes{{display:flex;gap:8px;align-items:flex-end}}
a{{color:var(--focus)}}
</style>
</head>
<body>
<main>
<h1>Future Traveler icon concepts</h1>
<p>Sticker and paper-cut icons for HAX's official mascot, the Future Traveler, in DDD colors. <strong>Concepts only, not in use.</strong></p>
<p class="muted">Hover or tab to an icon: his lightbulb glows once, rays spring out, then it stays lit. With reduced motion on, it just lights up. Small previews show 40 and 20 px.</p>
{sections}
<p class="muted" style="margin-top:40px">Made in code (SVG) by Claude, an AI, under HAX team direction, from <a href="../future-traveler/funny-traveler-15.png">funny-traveler-15</a> and <a href="../future-traveler/funny-traveler-12.png">funny-traveler-12</a>. Source: <a href="https://github.com/haxtheweb/art/tree/main/future-traveler-icons">future-traveler-icons</a>.</p>
</main>
</body>
</html>
"""


def main():
    svg_dir = os.path.join(ROOT, "svg")
    os.makedirs(svg_dir, exist_ok=True)
    cards = {f: [] for f, _, _ in FAMILIES}
    for slug, family, title, alt, build in CONCEPTS:
        full = f"Future Traveler icon concept: {title}"
        body = build(Ids(slug))
        with open(os.path.join(svg_dir, slug + ".svg"), "w", encoding="utf-8") as fh:
            fh.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" '
                     f'role="img" aria-label="{html.escape(full)}"><title>{html.escape(full)}</title>{body}</svg>\n')
        src = f"svg/{slug}.svg"
        round_cls = " round" if family == "paper-cut" or "round" in slug else ""
        cards[family].append(
            f'<li class="card"><h3>{html.escape(title)}</h3>'
            f'<button type="button" class="ft-btn{round_cls}" aria-label="{html.escape(alt)} Hover or focus lights his idea.">'
            f'<img src="{src}" alt="">{glow_overlay(*BULB[family])}</button>'
            f'<div class="sizes"><img src="{src}" width="40" height="40" alt=""><img src="{src}" width="20" height="20" alt=""></div></li>')
    sections = "".join(
        f'<section aria-labelledby="h-{f}"><h2 id="h-{f}">{name}</h2><p class="muted">{blurb}</p>'
        f'<ul class="grid">{"".join(cards[f])}</ul></section>'
        for f, name, blurb in FAMILIES)
    with open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8") as fh:
        fh.write(PAGE.format(sections=sections))
    print(f"wrote {len(CONCEPTS)} SVGs and index.html to future-traveler-icons/")


if __name__ == "__main__":
    main()
