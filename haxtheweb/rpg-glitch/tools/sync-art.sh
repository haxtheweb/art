#!/bin/sh
# Refresh ../rpg-character/ from the rpg-character element on webcomponents main:
# every art layer folder plus the element's code, overlay and season modules.
# Run from this tools/ folder. Needs git.
#
# Pieces listed in EXCLUDE are left out on purpose. They belong to the
# element's pop-culture archetype presets, which are nods to other studios'
# characters; RPG Glitch sticks to HAX-original and generic looks. Keep this
# list in step with EXCLUDED in ../index.html.
set -e
EXCLUDE="
hat/plumber-cap hat/trainer-cap hat/long-cap hat/cowl hat/winged-helmet hat/flat-top hat/wild-hair hat/messy-hair
mask/block-head mask/web
makeup/monster makeup/round-glasses
item/laser-sword-blue item/laser-sword-green item/laser-sword-red item/beam-wand item/capture-ball item/war-hammer item/whip
offhand/proton-pack
feet/hoverboard
shirt/space-knight shirt/boy-wizard shirt/ghost-hunter shirt/time-scientist shirt/adventurer shirt/plumber shirt/miner shirt/elf-hero shirt/trainer shirt/vigilante shirt/web-hero shirt/hammer-god shirt/monster
pants/space-knight pants/boy-wizard pants/ghost-hunter pants/time-scientist pants/adventurer pants/plumber pants/miner pants/elf-hero pants/trainer pants/vigilante pants/web-hero pants/hammer-god pants/monster
"
TMP=$(mktemp -d)
git clone -q --depth 1 --filter=blob:none --sparse https://github.com/haxtheweb/webcomponents "$TMP/wc"
git -C "$TMP/wc" sparse-checkout set elements/rpg-character
SRC="$TMP/wc/elements/rpg-character/lib"
OUT="../rpg-character"
for d in accessories base face faceItem feet hair hat hatColor item makeup mask offhand pants pet scalp shirt skin; do
  rm -rf "$OUT/$d"
  cp -r "$SRC/$d" "$OUT/$d"
done
for f in rpg-character-code.js rpg-character-overlays.js rpg-character-seasons.js; do
  cp "$SRC/$f" "$OUT/$f"
done
for piece in $EXCLUDE; do
  rm -f "$OUT/$piece.svg"
done
echo "Synced from webcomponents $(git -C "$TMP/wc" rev-parse --short HEAD)"
rm -rf "$TMP"
