"""Renders HAX Morph: HAX -> Headless Authoring Experience -> HAX -> Human, Agent,
Experience, with Watch Dogs-style decaying-bit transitions and rpg-character
sprites (from ../sprites/, made by sprites.mjs) thrown into the glitches.
Run from this tools/ folder after `npm install` (for the Press Start 2P font).
Needs Python 3 with Pillow and numpy. Writes ../media/hax-morph.gif and a still."""
import math, random, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

W, H = 320, 180          # native low-res canvas (upscaled 2x for chunky pixels)
SCALE = 2
FONT = os.path.join(HERE, "node_modules/@fontsource/press-start-2p/files/press-start-2p-latin-400-normal.woff")
if not os.path.exists(FONT):
    sys.exit("Press Start 2P not found: run `npm install` in this tools/ folder first.")
BITS = FONT  # the 0/1 bit noise uses the same pixel font
BG = (6, 8, 12)
FG = (235, 240, 245)
ACCENT = (0, 255, 200)   # neon teal for the initial letters
rng = random.Random(7)

def render(lines, big, hi=()):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    size = 48 if big else 16
    f = ImageFont.truetype(FONT, size)
    lh = size + (0 if big else 12)
    total = lh * len(lines)
    y = (H - total) // 2
    for line in lines:
        tw = d.textlength(line, font=f)
        x = (W - tw) // 2
        for i, ch in enumerate(line):
            col = ACCENT if (not big and (line, i) in hi) else FG
            d.text((x, y), ch, font=f, fill=col)
            x += d.textlength(ch, font=f)
        y += lh
    return np.array(img).astype(np.int16)

STATES = {
    "HAX": render(["HAX"], True),
    "HEADLESS": render(["HEADLESS", "AUTHORING", "EXPERIENCE"], False,
                       {("HEADLESS", 0), ("AUTHORING", 0), ("EXPERIENCE", 1)}),
    "HUMAN": render(["HUMAN", "AGENT", "EXPERIENCE"], False,
                    {("HUMAN", 0), ("AGENT", 0), ("EXPERIENCE", 1)}),
}

SPRITES = [Image.open(os.path.join(ROOT, "sprites", f"{i}.png")).convert("RGBA").resize((57, 71), Image.NEAREST)
           for i in range(8)]

def with_sprites(arr, k):
    """Drop a few rpg-characters into the frame before it gets corrupted."""
    if k < 0.3:
        return arr
    img = Image.fromarray(arr.astype(np.uint8)).convert("RGBA")
    n = 1 if k < 0.6 else rng.choice([1, 2, 3])
    for _ in range(n):
        sp = rng.choice(SPRITES)
        if rng.random() < 0.3:
            sp = sp.resize((114, 142), Image.NEAREST)
        x = rng.randrange(-10, W - sp.width + 10)
        y = rng.randrange(-10, H - sp.height + 10)
        img.alpha_composite(sp, (max(0, x), max(0, y)))
    return np.array(img.convert("RGB")).astype(np.int16)

def pixelate(a, b):
    if b <= 1:
        return a
    h, w = a.shape[:2]
    small = a[::b, ::b]
    return np.repeat(np.repeat(small, b, 0), b, 1)[:h, :w]

def glitch(a, k):
    """k in 0..1 = corruption intensity."""
    out = a.copy()
    # block pixelation
    out = pixelate(out, 1 + int(k * 14))
    # RGB channel split
    s = int(k * 10)
    if s:
        out[:, :, 0] = np.roll(out[:, :, 0], s, 1)
        out[:, :, 2] = np.roll(out[:, :, 2], -s, 1)
    # horizontal slice displacement
    for _ in range(int(k * 14)):
        y = rng.randrange(H); hh = rng.randrange(2, 14)
        out[y:y + hh] = np.roll(out[y:y + hh], rng.randrange(-40, 40), 1)
    # corrupted data blocks (copied from elsewhere / solid neon)
    for _ in range(int(k * 12)):
        bw, bh = rng.choice([8, 16, 24, 32]), rng.choice([4, 8, 12])
        x, y = rng.randrange(W - bw), rng.randrange(H - bh)
        if rng.random() < 0.6:
            sx, sy = rng.randrange(W - bw), rng.randrange(H - bh)
            out[y:y + bh, x:x + bw] = out[sy:sy + bh, sx:sx + bw]
        else:
            out[y:y + bh, x:x + bw] = rng.choice([ACCENT, FG, (255, 0, 120), (20, 20, 30)])
    # bit-crush colors
    if k > 0.2:
        step = 1 + int(k * 56)
        out = (out // step) * step
    return np.clip(out, 0, 255)

BITS_FONT = ImageFont.truetype(BITS, 8)
def bit_noise(img, k):
    if k < 0.15:
        return img
    d = ImageDraw.Draw(img)
    for _ in range(int(k * 12)):
        x, y = rng.randrange(W), rng.randrange(H)
        d.text((x, y), "".join(rng.choice("01") for _ in range(rng.randrange(2, 9))),
               font=BITS_FONT, fill=rng.choice([ACCENT, (80, 90, 100), FG]))
    return img

def scanlines(img):
    a = np.array(img).astype(np.int16)
    a[1::2] = (a[1::2] * 0.72).astype(np.int16)
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

frames, durs = [], []
def emit(arr, k, ms):
    img = Image.fromarray(arr.astype(np.uint8))
    img = bit_noise(img, k)
    img = img.resize((W * SCALE, H * SCALE), Image.NEAREST)
    frames.append(scanlines(img)); durs.append(ms)

def hold(name, n):
    base = STATES[name]
    for i in range(n):
        # occasional micro-glitch while holding
        k = 0.12 if rng.random() < 0.18 else 0.0
        emit(glitch(base, k) if k else base, k, 70)

def morph(a, b, n=18):
    A, B = STATES[a], STATES[b]
    for i in range(n):
        t = i / (n - 1)
        k = math.sin(math.pi * t) ** 0.6
        src = A if t < 0.5 else B
        # brief dissolve flicker around the midpoint
        if 0.35 < t < 0.65 and rng.random() < 0.5:
            src = B if src is A else A
        out = glitch(with_sprites(src, k), k * 0.85)
        if k > 0.55 and rng.random() < 0.4:
            # a cleaner rpg-character punches through the noise, RGB-split
            sp = np.array(rng.choice(SPRITES).resize((114, 142), Image.NEAREST)).astype(np.int16)
            x, y = rng.randrange(20, W - 134), rng.randrange(0, H - 142)
            m = sp[:, :, 3:4] > 128
            reg = out[y:y + 142, x:x + 114]
            out[y:y + 142, x:x + 114] = np.where(m, sp[:, :, :3], reg)
            out[y:y + 142, x:x + 114, 0] = np.roll(out[y:y + 142, x:x + 114, 0], 3, 1)
            out[y:y + 142, x:x + 114, 2] = np.roll(out[y:y + 142, x:x + 114, 2], -3, 1)
            out = pixelate(out, 2)
        emit(out, k, 50)

seq = ["HAX", "HEADLESS", "HAX", "HUMAN"]
STILL = 40  # a held "Headless Authoring Experience" frame
for i, s in enumerate(seq):
    hold(s, 22 if s != "HAX" else 16)
    morph(s, seq[(i + 1) % len(seq)])

frames[STILL].save(os.path.join(ROOT, "media", "hax-morph-still.png"))
frames[0].save(os.path.join(ROOT, "media", "hax-morph.gif"), save_all=True, append_images=frames[1:],
               duration=durs, loop=0, optimize=True, disposal=1)
print(len(frames), "frames")
