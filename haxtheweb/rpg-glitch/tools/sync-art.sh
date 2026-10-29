#!/bin/sh
# Refresh ../rpg-character/ from the rpg-character element on webcomponents main.
# Run from this tools/ folder. Needs git.
set -e
TMP=$(mktemp -d)
git clone -q --depth 1 --filter=blob:none --sparse https://github.com/haxtheweb/webcomponents "$TMP/wc"
git -C "$TMP/wc" sparse-checkout set elements/rpg-character
for d in accessories base face faceItem hair hat hatColor pants shirt skin; do
  rm -rf "../rpg-character/$d"
  cp -r "$TMP/wc/elements/rpg-character/lib/$d" "../rpg-character/$d"
done
echo "Synced from webcomponents $(git -C "$TMP/wc" rev-parse --short HEAD)"
rm -rf "$TMP"
