# Licensing for the artwork

> **Status: proposed, awaiting maintainer confirmation.** The repository's `LICENSE` file is still Apache-2.0, which is written for software. This PR does not change it.

## Proposal

- **Artwork that HAX created** (the World Traveler concept, the HAX logo and other brand marks, original variants): **[Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0)**. Reuse and remix freely, including commercially, with attribution:
  > HAX (haxtheweb), https://github.com/haxtheweb/art
- **Anything else in the repo** (workflows, scripts, docs): remains Apache-2.0.

## Third-party caveat

Many World Traveler variants are *inspired remixes* of other works (this is intentional; remixing is the point). A CC BY grant covers only what HAX has the right to license. For variants that parody another creator's characters, layouts, signatures or brand names, HAX cannot grant rights in those elements.

These are flagged in [`manifest.json`](manifest.json) with `third_party_reference` and `reuse: "homage-review-before-promoting"`. Treat them as fun community art, not official promotional material, and don't use them commercially without checking the underlying source.

## Open questions for maintainers

1. Confirm CC BY 4.0 for HAX-original art, and whether to add it as a separate `LICENSE-ART` file or replace `LICENSE`.
2. Is the HAX logo covered by CC BY, or should marks have a trademark note?
3. Which of the flagged variants should be kept, relabeled or removed?
