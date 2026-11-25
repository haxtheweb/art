// Builds the page list for the hax-art portfolio site from this repo's
// manifest.json and the catalog below, as a JOS items file for the HAX CLI:
//
//   node tools/hax-art-items.mjs hax-art-items.json
//   cd hax-art && hax site site:items-import --items-import ../hax-art-items.json --y --no-i
//
// Images are referenced in place (raw.githubusercontent.com URLs, which this
// repo promises never to rename), so the site holds no copies of the art.
// Interactive pieces link to their GitHub Pages address.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2];
if (!out) {
  console.error("usage: node tools/hax-art-items.mjs <out.json>");
  process.exit(1);
}
const RAW = "https://raw.githubusercontent.com/haxtheweb/art/main/";
const PAGES = "https://haxtheweb.github.io/art/";
const REPO = "https://github.com/haxtheweb/art/blob/main/";
const TREE = "https://github.com/haxtheweb/art/tree/main/";
const raw = (p) => RAW + p.split("/").map(encodeURIComponent).join("/");
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const manifest = JSON.parse(await readFile(path.join(root, "manifest.json"), "utf8"));

// ---------- small HTML helpers (HAX-capable tags only) ----------
const image = (file, alt, caption) =>
  `<media-image source="${raw(file)}" alt="${esc(alt)}"${caption ? ` caption="${esc(caption)}"` : ""}></media-image>`;
const p = (text) => `<p>${text}</p>`;
const cta = (link, label) => `<simple-cta link="${esc(link)}" label="${esc(label)}"></simple-cta>`;
const links = (pairs) =>
  `<ul>${pairs.map(([href, label]) => `<li><a href="${esc(href)}">${esc(label)}</a></li>`).join("")}</ul>`;
const facts = (rows) =>
  `<ul>${rows.filter((r) => r[1]).map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(v)}</li>`).join("")}</ul>`;
const label = (s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");

let order = 0;
const items = [];
function add(item) {
  items.push({
    id: item.id,
    title: item.title,
    slug: item.slug,
    parent: item.parent || null,
    indent: item.parent ? 1 : 0,
    order: item.order !== undefined ? item.order : order++,
    description: item.description || "",
    metadata: {
      published: item.published !== false,
      // left out of the menu, still linked (the Privacy page)
      ...(item.hideInMenu ? { hideInMenu: true } : {}),
      image: item.image || "",
      // a comma-separated string, as `hax site node:add --tags` writes it;
      // older HAXcms runtimes still call tags.split()
      tags: (item.tags || []).join(","),
    },
    content: item.content,
  });
  return item.id;
}

// ---------- home ----------
add({
  id: "home",
  title: "HAX art",
  slug: "home",
  description: "Art and media from the HAX project, browsed with HAX.",
  image: raw("future-traveler/funny-traveler-15.png"),
  content: [
    p("Art and media from <a href=\"https://haxtheweb.org\">HAX</a>: open-source tools that let anyone create, remix and publish on the web without needing to understand the web. This portfolio is itself a HAXsite, built with the HAX CLI, and every image on it is pulled straight from the <a href=\"https://github.com/haxtheweb/art\">haxtheweb/art</a> repository."),
    image("future-traveler/funny-traveler-15.png", "The Future Traveler: red helmet with a HAX band, cyan goggles and a green backpack with a lightbulb, chin on his arms, in front of a white starburst in a red circle.", "The Future Traveler, HAX's official mascot, in his classic pose."),
    `<h2>Browse</h2>`,
    links([
      ["future-traveler", "Future Traveler: the HAX mascot in every style"],
      ["future-traveler-eras", "Future Traveler across time: the icon in every era"],
      ["rpg-character", "rpg-character: games and toys starring HAX's pixel character"],
      ["rpg-me", "RPG me: make the character that is you across HAX"],
      ["brand", "Brand: logos, stickers, banners and posters"],
      ["posters", "Posters: the HAX campus and social campaign"],
      ["talks", "Talks: diagrams and explainers for presentations"],
      ["use-the-art", "Use the art: attribution, licensing and hotlinking"],
    ]),
    p("<strong>Dream it, remix it, have it, share it.</strong>"),
  ].join("\n"),
});

// ---------- Future Traveler ----------
const wt = manifest.future_traveler;
const publicWT = wt.filter((x) => !x.third_party_reference);
add({
  id: "future-traveler",
  title: "Future Traveler",
  slug: "future-traveler",
  description: "HAX's mascot, a red-helmeted time traveler, in every style.",
  image: raw("future-traveler/funny-traveler-15.png"),
  tags: [],
  content: [
    p("The Future Traveler, HAX's official mascot, traveled to the future to bring our ideas to life. He moves through time, taking the best ideas of every era and carrying them into the future, where data flows like water. He is a variant of the <code>rpg-character</code>, itself a caricature of HAX's creator."),
    p("He is on-model when he has a red helmet with a HAX visor band, steampunk goggles, a lightbulb on a stalk and a green backpack. The variants change the style and the setting, never those features. Filter the grid below by role."),
    links([[TREE + "future-traveler", "Character sheet and story on GitHub"]]),
  ].join("\n"),
});
const wtPage = (x, parent, published) => {
  const n = x.id.slice(-2);
  add({
    id: x.id,
    parent,
    published,
    title: x.title,
    slug: `future-traveler-${n}`,
    description: x.alt,
    image: x.url,
    tags: [x.role, ...x.styles.filter((s) => s !== x.role)],
    content: [
      image(x.file, x.alt),
      facts([
        ["Variant", `#${n}`],
        ["Best for", label(x.role)],
        ["Style", x.styles.map(label).join(", ")],
        ["Setting", label(x.setting)],
        ["Size", `${x.width} × ${x.height} px`],
        ["Notes", x.notes],
      ]),
      x.third_party_reference
        ? p(`<strong>Review before promoting.</strong> ${esc(x.third_party_reference)}. See <a href="${REPO}LICENSING.md">LICENSING.md</a>.`)
        : "",
      links([
        [x.url, "Full-size file"],
        [REPO + x.file, "View on GitHub"],
      ]),
    ].filter(Boolean).join("\n"),
  });
};
publicWT.forEach((x) => wtPage(x, "future-traveler", true));

// ---------- Future Traveler across time ----------
// One page per era icon in future-traveler-eras/eras.json. The icons are
// exported from the network bar's code in haxtheweb/webcomponents.
const ERAS = "future-traveler-eras/";
const eraCat = JSON.parse(await readFile(path.join(root, ERAS, "eras.json"), "utf8"));
add({
  id: "future-traveler-eras",
  title: "Future Traveler across time",
  slug: "future-traveler-eras",
  description: "The Future Traveler icon drawn the way each era would have drawn it.",
  image: raw(ERAS + "contact-sheet.jpg"),
  content: [
    p("The Future Traveler has collected the best ideas of every era in his backpack, so his icon can be drawn the way each era would have drawn it: an 1880s engraving, a 1920s gold line drawing, a neon sign, four greens on a handheld screen. He is still him in all of them: the helmet with HAX on it, the goggles, the lightbulb."),
    image(ERAS + "contact-sheet.jpg", "The Future Traveler icon in 20 era versions on dark gray, from the icon as it ships through engraving, art nouveau, art deco, rainbow, stripes, neon, handheld pixels, early web, a snapback cap, polygons and terminal, to the 1960s world of tomorrow in eight pillar colors.", "Every era at a glance."),
    p("These are the eras the Future Traveler remixes through at the right end of the HAX network bar: hover him and he tears through every one, click and he stays in the next. Each follows one of the styles the <a href=\"posters\">posters</a> tell the story of the pillars in, and the world of tomorrow comes once per pillar, in that pillar's color."),
    p("The icons are drawn in code (SVG) by Claude, an AI, under HAX team direction."),
    links([
      [TREE + "future-traveler-eras", "SVG and PNG files, alt text and the catalog on GitHub"],
      ["https://github.com/haxtheweb/webcomponents/blob/master/elements/hax-network-bar/lib/hax-future-traveler.js", "The code that draws them"],
    ]),
  ].join("\n"),
});
eraCat.eras.forEach((x) => {
  const png = ERAS + "png/" + x.id + ".png";
  add({
    id: x.id.replace("future-traveler-", "era-"),
    parent: "future-traveler-eras",
    title: x.title,
    slug: x.id.replace("future-traveler-", "era-"),
    description: x.alt,
    image: raw(png),
    tags: [x.pillar ? "pillar" : "era", x.era],
    content: [
      image(png, x.alt),
      facts([
        ["Era", x.title],
        ["Pillar", x.pillar ? label(x.pillar) : ""],
        ["Size", "24 by 24 grid SVG, 512 × 512 px PNG"],
      ]),
      x.third_party_reference
        ? p(`<strong>Review before promoting.</strong> Follows ${esc(x.third_party_reference)}. See <a href="${REPO}LICENSING.md">LICENSING.md</a>.`)
        : "",
      links([
        [x.url, "SVG file"],
        [x.png, "PNG file"],
        ...(x.after_poster ? [[REPO + x.after_poster, "The poster it follows"]] : []),
        [REPO + x.file, "View on GitHub"],
      ]),
    ].filter(Boolean).join("\n"),
  });
});

// ---------- rpg-character ----------
add({
  id: "rpg-character",
  title: "rpg-character",
  slug: "rpg-character",
  description: "Games and toys starring HAX's remixable pixel character.",
  image: raw("haxtheweb/rpg-glitch/media/rpg-glitch-still.png"),
  content: [
    p("The <code>rpg-character</code> is a HAX web component: a little pixel character built from a seed, with hats, costumes, pets and more. Every piece here uses the element's own art. Here is one, live on this page:"),
    `<rpg-character seed="btopro" hat="knight" walking=""></rpg-character>`,
    links([["https://github.com/haxtheweb/webcomponents/tree/main/elements/rpg-character", "rpg-character on GitHub"], ["rpg-me", "RPG me: make your own"]]),
  ].join("\n"),
});
// RPG me is one of HAX Art's tools: a stand-alone service at its own address,
// rpg.art.hax.cloud. It is not in the HAX network bar; this site's menu is
// where it is linked from, so it is a top-level page (on RPG me, the bar
// lights up Art).
add({
  id: "rpg-me",
  title: "RPG me",
  slug: "rpg-me",
  description: "Make the character that is you across HAX, in a stand-alone tool at rpg.art.hax.cloud.",
  image: raw("haxtheweb/rpg-glitch/media/rpg-glitch-still.png"),
  tags: ["tool", "interactive"],
  content: [
    p("RPG me is one of the tools of the HAX art movement: a character builder for the <code>rpg-character</code>. Pick a base, face, hair, clothes, skin, hat and more, and RPG me gives you a character code and a link that rebuild the character that stands for you across HAX, on any page that loads HAX."),
    `<rpg-character seed="HAX" walking=""></rpg-character>`,
    p("RPG me is its own app, at its own address: rpg.art.hax.cloud. It lives here because it is part of the art; it runs on its own so you can share it, link to it and come back to it. Its old address, rpg-me.hax.cloud, takes you there."),
    cta("https://rpg.art.hax.cloud/", "Open RPG me"),
    links([["https://github.com/haxtheweb/rpg-me", "rpg-me on GitHub"], ["rpg-glitch", "RPG Glitch: its links open in RPG me"]]),
  ].join("\n"),
});
const pieces = [
  {
    id: "rpg-glitch",
    title: "RPG Glitch",
    still: "haxtheweb/rpg-glitch/media/rpg-glitch.gif",
    alt: "A pixel rpg-character on an 80s CRT over a synthwave grid, tearing into cyan and magenta slices and reassembling in a new costume, captioned hax_the_web, the future is remixable.",
    text: "The rpg-character on an 80s CRT, glitching between versions of itself. Click for a new character with a costume, pet, mood and pose from the element's wardrobe. Every character gets a link and a HAX embed code.",
    play: PAGES + "haxtheweb/rpg-glitch/",
    source: TREE + "haxtheweb/rpg-glitch",
    tags: ["interactive"],
  },
  {
    id: "hax-morph",
    title: "HAX Morph",
    still: "haxtheweb/hax-morph/media/hax-morph.gif",
    alt: "Pixel text reads HAX, then breaks apart into rainbow pixel blocks, scanline tears and streams of ones and zeros with rpg-characters flashing through the static, rebuilding as Headless Authoring Experience, back to HAX, then Human, Agent, Experience, with the H, A and X lit in teal.",
    text: "HAX decays into Headless Authoring Experience, back to HAX, then into Human, Agent, Experience. Every transition breaks down into pixel blocks and bit noise, with rpg-characters thrown into the static.",
    source: TREE + "haxtheweb/hax-morph",
    tags: ["gif"],
  },
  {
    id: "hax-the-web-game",
    title: "HAX the Web",
    still: "haxtheweb/hax-the-web-game/media/01-title.png",
    alt: "Title screen: the rpg-character inside a ring of hex links above a HAX THE WEB banner and a blinking PRESS START.",
    text: "A 16-bit title screen and speed run. Race an rpg-character through the web, jumping into glowing badges that each teach one piece of HAX, then read the run report.",
    play: PAGES + "haxtheweb/hax-the-web-game/",
    source: TREE + "haxtheweb/hax-the-web-game",
    tags: ["game"],
  },
  {
    id: "wanted-poster",
    title: "WANTED: HAX",
    still: "haxtheweb/wanted-poster/hax-wanted-poster-wall.jpg",
    alt: "A weathered old-west wanted poster tacked to a dark wall: WANTED HAX, aka The Open Web Outlaw, with an engraved-style rpg-character in a cowboy hat and a $0 reward because the source is free for any who fork it.",
    text: "An old-west wanted poster for the Open Web Outlaw, starring the rpg-character in its cowboy hat. The reward is $0, because the source is already free for anyone who forks it.",
    source: TREE + "haxtheweb/wanted-poster",
    tags: ["poster"],
  },
  {
    id: "hax-of-the-web",
    title: "HAX of the Web",
    still: "haxtheweb/hax-of-the-web/poster.png",
    alt: "Arcade title screen: a pixel-art zombie pirate girl in front of a haunted house under a full moon, beside dripping horror letters reading HAX of the Web, with PRESS START below.",
    text: "A Halloween arcade title screen starring the rpg-character's zombie pirate girl (the element's zpg seed). Type cheat codes, ask Merlin, or press start to drop into a real HAXcms site and edit it.",
    credit: "A homage to the title screen of a 1990s light-gun zombie arcade game. Its art, audio and text are all original.",
    play: PAGES + "haxtheweb/hax-of-the-web/",
    also: [["https://hax-of-the-web.surge.sh/", "Also live on surge"]],
    source: TREE + "haxtheweb/hax-of-the-web",
    tags: ["game"],
  },
];
pieces.forEach((x) =>
  add({
    id: x.id,
    parent: "rpg-character",
    title: x.title,
    slug: x.id,
    description: x.text,
    image: raw(x.still),
    tags: x.tags,
    content: [
      image(x.still, x.alt),
      p(x.text),
      x.credit ? p(`<em>${esc(x.credit)}</em>`) : "",
      x.play ? cta(x.play, `Play ${x.title}`) : "",
      links([...(x.also || []), [x.source, "Files, alt text and credits on GitHub"]]),
    ].filter(Boolean).join("\n"),
  }),
);

// ---------- Brand ----------
add({
  id: "brand",
  title: "Brand",
  slug: "brand",
  description: "Logos, stickers, banners and posters.",
  image: raw("haxtheweb/HAX.psu Future traveler-circle.png"),
  content: [
    p("HAX logos, stickers, banners and posters. The vector logo is <a href=\"" + REPO + "HAXLogo.svg\">HAXLogo.svg</a>; layered source files (.psd, .ai) live in the <a href=\"" + TREE + "haxtheweb\">haxtheweb</a> folder on GitHub."),
  ].join("\n"),
});
const brand = [
  ["hax-the-web-sticker", "HAX the Web sticker", "haxtheweb/hax-the-web-sticker_v1-2.png", "Die-cut sticker: the h-a-x THE WEB wordmark in chunky black pixel letters between pixel curly braces, with a white border.", "sticker", "Transparent version: hax-the-web-sticker-v1-2-transparent.png."],
  ["hax-wordmark", "h-a-x THE WEB wordmark", "haxtheweb/2019-08-14_13-05-52.png", "The h-a-x THE WEB wordmark in black pixel letters between pixel curly braces.", "logo"],
  ["logo-explorations", "Logo explorations", "haxtheweb/117737906-d7618480-b1c8-11eb-8971-0885bdedd853.png", "Sheet of HAX logo sketches: the letters H, A and X stacked as black pixel blocks in several arrangements, some with THE and WEB tucked in.", "logo", "Seven sheets in all, in the haxtheweb folder (the files named 117737906 to 117737916)."],
  ["future-traveler-badge", "Future Traveler badge", "haxtheweb/HAX.psu Future traveler-circle.png", "Circular badge: the Future Traveler in a red HAX helmet and cyan goggles peeking over his arms in front of a red and white starburst, lightbulb glowing.", "badge"],
  ["helmet-mark", "Helmet mark", "haxtheweb/hax-full.png", "The Future Traveler's red HAX helmet and glowing cyan goggles peeking over folded arms, on white.", "logo", "Black-background version: hax.png."],
  ["pattern-banner", "Pattern banner", "haxtheweb/Asset 1.png", "Wide gray banner of hexagons scattered with small pixel icons: hats, lightning bolts, molecules and tiny characters.", "banner"],
  ["web-inar-banner", "h-a-x THE WEB-INAR banner", "haxtheweb/HAX Eventbrite.jpg", "Event banner: h-a-x THE WEB-INAR in white pixel letters between pixel braces on a dark hexagon pattern.", "banner"],
  ["hax-camp-poster", "HAX Camp poster", "haxtheweb/haxcampposter.jpg", "HAX Camp event poster with the h-a-x THE WEB wordmark over a photo of a stone university tower, followed by event details.", "poster"],
  ["contribute-flyer", "Contribute flyer", "presentation-materials/haxflyer.jpeg", "Dark flyer titled Contribute to HAX the Web, explaining what HAX is, common use cases, the project in action and how to contribute, with QR codes.", "poster"],
  ["video-thumbnails", "Video thumbnails", "haxtheweb/Creating web components.png", "Video thumbnail: HAX THE WEB ADVENTURE in bold red, white and purple letters over a black and white photo, with a red starburst badge.", "banner", "More in the haxtheweb folder: developer.png and how to use.png."],
];
brand.forEach(([id, title, file, alt, tag, note]) =>
  add({
    id,
    parent: "brand",
    title,
    slug: id,
    description: alt,
    image: raw(file),
    tags: [tag],
    content: [image(file, alt), note ? p(esc(note)) : "", links([[raw(file), "Full-size file"], [REPO + file, "View on GitHub"]])].filter(Boolean).join("\n"),
  }),
);

// ---------- Posters ----------
// One page per poster in haxtheweb/posters/posters.json. Stills are in git;
// video, GIF and 11x17 print files are assets on the GitHub release the
// catalog names, so those links work once that release is published.
const POSTERS = "haxtheweb/posters/";
const posterCat = JSON.parse(await readFile(path.join(root, POSTERS, "posters.json"), "utf8"));
const asset = (name) => (posterCat.release_assets.find((a) => a.file === name) || {}).url;
const SERIES_TAG = {
  "HAX across time": "across-time",
  "Game consoles": "consoles",
  "The Quest": "quest",
  "World of Tomorrow pillars": "tomorrow",
  "Stage select": "stage-select",
  Scenes: "scene",
};
const PILLAR_NAME = {
  accessible: "Accessible",
  efficient: "Efficient",
  extensible: "Extensible",
  open: "Free and Open",
  agnostic: "Platform Agnostic",
  remixable: "Remixable",
  sustainable: "Sustainable",
};
add({
  id: "posters",
  title: "Posters",
  slug: "posters",
  description: "The HAX campus and social campaign: posters across time, console homages, the Quest and the World of Tomorrow.",
  image: raw(POSTERS + "social/hax_tomorrow_all_poster.png"),
  content: [
    p("Posters for the HAX campus and social campaign. HAX brings the best ideas of every era into the future, so the series travels from the 1880s to the 1990s, through console start-up screens and a Game Boy battle against THE VOID, to a World of Tomorrow poster for each HAX pillar. Each poster is a 1080×1350 still for social posts; most also come as a 5-second video, a GIF and an 11×17 print."),
    image(POSTERS + "contact-sheet.jpg", "Every HAX poster grouped by series: HAX across time, game consoles, the Quest, World of Tomorrow pillars, stage select, and the bulletin board scene.", "The whole campaign at a glance."),
    links([
      [TREE + "haxtheweb/posters", "Stills, alt text and the catalog on GitHub"],
      [posterCat.release, "Videos, GIFs and print PDFs (GitHub release)"],
    ]),
  ].join("\n"),
});
posterCat.posters.forEach((x) => {
  const pillar = x.id.startsWith("tomorrow_") ? x.id.slice("tomorrow_".length) : null;
  const stage = pillar && PILLAR_NAME[pillar] ? asset(`hax_stage_${pillar}_full.mp4`) : null;
  add({
    id: `poster-${x.id.replace(/_/g, "-")}`,
    parent: "posters",
    title: x.title,
    slug: `poster-${x.id.replace(/_/g, "-")}`,
    description: x.alt,
    image: x.url,
    tags: [SERIES_TAG[x.series] || "poster"],
    content: [
      image(POSTERS + x.file, x.alt),
      facts([
        ["Series", x.series],
        ["Size", `${x.width} × ${x.height} px`],
      ]),
      x.note ? p(`<strong>Review before promoting.</strong> ${esc(x.note)} See <a href="${REPO}LICENSING.md">LICENSING.md</a>.`) : "",
      stage ? p(`See the ${esc(PILLAR_NAME[pillar])} pillar in action in its 42-second stage video, recorded on the live haxtheweb.org.`) : "",
      links([
        [x.url, "Full-size still"],
        ...(x.video ? [[x.video, "Video (MP4)"]] : []),
        ...(x.gif ? [[x.gif, "GIF"]] : []),
        ...(x.print_11x17 ? [[x.print_11x17, "11×17 print (PDF)"]] : []),
        ...(stage ? [[stage, `${PILLAR_NAME[pillar]} stage video (MP4)`]] : []),
        [REPO + POSTERS + x.file, "View on GitHub"],
      ]),
    ].filter(Boolean).join("\n"),
  });
});
add({
  id: "poster-videos",
  parent: "posters",
  title: "Campaign videos",
  slug: "poster-videos",
  description: "Pillar stage videos, student stories, the logo sting and console start-up intros.",
  image: raw(POSTERS + "social/hax_stage_select_poster.png"),
  tags: ["video"],
  content: [
    p("Videos from the campaign that don't have a poster of their own. They live on the GitHub release, not in git."),
    `<h2>Pillar stages</h2>`,
    p("An 8-bit stage select, a power card, a live demo recorded on the real haxtheweb.org, and a stage-clear card, 42 seconds each. Every stage also comes as four separate segment files on the release."),
    links(Object.entries(PILLAR_NAME).map(([k, v]) => [asset(`hax_stage_${k}_full.mp4`), v])),
    `<h2>Stories</h2>`,
    links([
      [asset("hax_story_generic.mp4"), "Three students find HAX Lab, learn by doing and ride into the future (fictional)"],
      [asset("hax_story_real.mp4"), "Jimmy Kane, Winston White and Zach Dodson: from HAX Lab to Ford, IBM and Penn State"],
    ]),
    `<h2>Logo sting and console intros</h2>`,
    links([
      [asset("hax_logo_sting.mp4"), "Rolling H cube logo sting"],
      ...["gameboy", "gba", "playstation", "wii", "hacker"].map((k) => [asset(`hax_intro_${k}.mp4`), `Start-up intro: ${{ gameboy: "Game Boy", gba: "Game Boy Advance", playstation: "PlayStation", wii: "Wii", hacker: "Hacker (ASCII)" }[k]}`]),
    ]),
    p("<em>The console intros are homages to well-known start-up screens: review them before official promotion.</em>"),
  ].join("\n"),
});

// ---------- Talks ----------
add({
  id: "talks",
  title: "Talks",
  slug: "talks",
  description: "Diagrams and explainers for presentations.",
  image: raw("presentation-materials/hax-in-a-minute/media/stills/05-lift-off.png"),
  content: p("Diagrams and explainers for talks about HAX. The PNGs are ready for slides; the explainer comes as a page, a video, GIFs and a deck."),
});
add({
  id: "hax-in-a-minute",
  parent: "talks",
  title: "HAX in under a minute",
  slug: "hax-in-a-minute",
  description: "A one-minute doodle explainer of HAX.",
  image: raw("presentation-materials/hax-in-a-minute/media/stills/05-lift-off.png"),
  tags: ["explainer"],
  content: [
    image("presentation-materials/hax-in-a-minute/media/hax-in-a-minute.gif", "Whiteboard doodle explainer of HAX in five scenes, ending with five rockets labeled Docs, Portfolio, Website, Blog and Course lifting off through falling stars."),
    p("A whiteboard-doodle explainer in five scenes: what HAX is, why the ecosystem is powerful, how the magic script makes later pages faster, the seven community pillars, and what you will launch. Its cast are real <code>rpg-character</code> combinations."),
    cta(PAGES + "presentation-materials/hax-in-a-minute/", "Watch HAX in under a minute"),
    links([[TREE + "presentation-materials/hax-in-a-minute", "MP4, GIFs, PPTX and stills on GitHub"]]),
  ].join("\n"),
});
const showpieces = [
  {
    id: "hax-the-web-intro",
    title: "HAX The Web opening titles",
    still: "presentation-materials/hax-the-web-intro/media/stills/title-lock.jpg",
    alt: "HAX / THE / WEB in red neon pixel letters, with a light bar over the A and bars flanking THE.",
    text: "A 30-second neon title sequence. Credits tell the HAX story from a napkin in 2015 to hundreds of courses while red neon letters drift by, then lock into the HAX / THE / WEB mark. Play, pause, scrub, or read every credit as text.",
    credit: "A fan homage to the synth-scored opening titles of a 1980s-set TV series. The letters, credits and type are HAX's own.",
    play: PAGES + "presentation-materials/hax-the-web-intro/",
    label: "Watch the opening titles",
    source: TREE + "presentation-materials/hax-the-web-intro",
  },
  {
    id: "episode-xxvi",
    title: "Episode XXVI: Return of the Open Web",
    still: "presentation-materials/episode-xxvi/episode-xxvi-crawl.jpg",
    alt: "A starfield with gold text tilted back into space: Episode XXVI, Return of the Open Web, the opening of a crawl about HAX in 2026.",
    text: "A space-opera opening crawl that catches people up on HAX: where it came from, the web standards it stands on, and where it is in 2026. It ends on a Join the Rebellion card. Viewers with reduced motion get a static, readable version.",
    credit: "A parody of the classic sci-fi film opening crawl. The text and the synthesized fanfare are original, and no footage, logo or score is used.",
    play: PAGES + "presentation-materials/episode-xxvi/",
    label: "Watch Episode XXVI",
    source: TREE + "presentation-materials/episode-xxvi",
  },
];
showpieces.forEach((x) =>
  add({
    id: x.id,
    parent: "talks",
    title: x.title,
    slug: x.id,
    description: x.text,
    image: raw(x.still),
    tags: ["interactive"],
    content: [
      image(x.still, x.alt),
      p(x.text),
      p(`<em>${esc(x.credit)}</em>`),
      cta(x.play, x.label),
      links([[x.source, "Files, alt text and credits on GitHub"]]),
    ].join("\n"),
  }),
);
const talks = [
  ["by-the-numbers", "HAX by the numbers", "presentation-materials/3.png", "HAX by the numbers, 2015 to 2025: six colored icons with counts, including 675, 53, 29, 44, 247, 567, 67,515 and 14.", "diagram"],
  ["hax-history", "HAX history", "presentation-materials/HAX history.png", "Dense timeline of HAX history on a black background, with many small yellow lightbulb markers and labeled icons along a horizontal line.", "diagram"],
  ["legend", "Legend", "presentation-materials/Legend.png", "Legend for the HAX diagrams on black: icons for developers, projects and end users, each with its role.", "diagram"],
  ["class-club-lab", "Class, club, lab", "presentation-materials/class-club-lab-pipeline.png", "Venn diagram of three overlapping circles labeled Class, Club and Lab.", "diagram"],
];
talks.forEach(([id, title, file, alt, tag]) =>
  add({
    id,
    parent: "talks",
    title,
    slug: id,
    description: alt,
    image: raw(file),
    tags: [tag],
    content: [image(file, alt), links([[raw(file), "Full-size file"], [REPO + file, "View on GitHub"]])].join("\n"),
  }),
);

// ---------- Use the art ----------
add({
  id: "use-the-art",
  title: "Use the art",
  slug: "use-the-art",
  description: "Attribution, licensing and hotlinking.",
  image: raw("future-traveler/funny-traveler-30.jpeg"),
  content: [
    `<h2>Attribution</h2>`,
    p("HAX (haxtheweb), <a href=\"https://github.com/haxtheweb/art\">https://github.com/haxtheweb/art</a>"),
    `<h2>License</h2>`,
    p(`The proposal is CC BY 4.0 for art HAX created; see <a href="${REPO}LICENSING.md">LICENSING.md</a>. The interactive homages credit what inspired them on their own pages. A few Future Traveler variants riff closely on other creators' characters or brands; those aren't shown here and are flagged in <a href="${REPO}manifest.json">manifest.json</a> for review before promotion.`),
    `<h2>Hotlinking</h2>`,
    p("Every image on this site is a raw GitHub URL, such as <code>" + raw("future-traveler/funny-traveler-15.png") + "</code>. File names in the repo are kept stable, so these links rarely change."),
    `<h2>How this was made</h2>`,
    p("Most Future Traveler variants are AI-generated remixes of the original human-made character. The interactive pieces (RPG Glitch, the HAX the Web game, HAX of the Web, the wanted poster, HAX in under a minute, the opening titles and Episode XXVI) and the poster campaign were made with an AI assistant (Claude) under HAX team direction. HAX's own writing and brand marks are not AI-generated."),
    `<h2>Add to the collection</h2>`,
    p(`Open a pull request on <a href="https://github.com/haxtheweb/art">haxtheweb/art</a>; <a href="${REPO}AGENTS.md">AGENTS.md</a> has the rules. To refresh this site after adding Future Traveler variants, run <code>node tools/hax-art-items.mjs</code> and import the result with the HAX CLI.`),
  ].join("\n"),
});

// ---------- About, Contact, Privacy ----------
// the trust pages every HAX starter site has: About and Contact at the end of
// the menu, Privacy left out of it and linked from Contact
add({
  id: "about",
  title: "About",
  slug: "about",
  description: "What this site is and who makes it.",
  content: "<p>HAX art collects the art and media of the HAX project: the Future Traveler mascot, brand assets, posters and materials from talks, browsed with HAX itself.</p><p>How you may reuse the art is described in <a href=\"https://github.com/haxtheweb/art/blob/main/LICENSING.md\">LICENSING.md</a>; some pieces reference other works, and that file says which.</p><p>It is made by the HAX project (HAXTheWeb), an open-source effort to let anyone author, remix and publish on the web without needing to learn how the web works. This site is itself a HAX site; <a href=\"https://github.com/haxtheweb/art\">its source is on GitHub</a>.</p><p>To see how every part of HAX connects, visit <a href=\"https://hax.cloud/\">hax.cloud</a>. To get in touch, use the <a href=\"contact\">Contact</a> page.</p>",
});
add({
  id: "contact",
  title: "Contact",
  slug: "contact",
  description: "How to reach the people who make HAX.",
  content: "<p>Want to use the art, or have an idea for a new piece? Here is how to reach the people who make HAX.</p><ul><li><strong>Chat:</strong> the <a href=\"https://discord.gg/aCGxmRHEJP\">HAX Discord</a> is the quickest way to reach us.</li><li><strong>Bugs and ideas:</strong> open an issue in <a href=\"https://github.com/haxtheweb/issues\">haxtheweb/issues</a>, the one queue for every part of HAX.</li><li><strong>Email:</strong> <a href=\"mailto:hax@psu.edu\">hax@psu.edu</a></li><li><strong>Security:</strong> report a vulnerability privately through <a href=\"https://github.com/haxtheweb/issues/security/advisories\">GitHub security advisories</a>.</li></ul><p><a href=\"privacy\">How we handle what you send us</a></p>",
});
add({
  id: "privacy",
  title: "Privacy",
  slug: "privacy",
  description: "What this site keeps about you, in plain words.",
  hideInMenu: true,
  content: "<p>What this site keeps about you, in plain words.</p><h2>Your choices</h2><privacy-choices></privacy-choices><h2>What this site keeps</h2><p>Your choices are kept in this browser only. This site sets no other cookies, runs no analytics and has no trackers of its own.</p><h2>Hosting</h2><p>The service that hosts this site keeps ordinary request logs, such as the address a request came from, as every web host does.</p><h2>Videos and other embeds</h2><p>Videos from YouTube or Vimeo and content from other companies wait until you allow that company. Each one asks where it appears, and you can change your answer above.</p><h2>What you send us</h2><p>When you email us, post in the HAX Discord or open a GitHub issue, we use what you send only to answer you and to improve HAX. Discord and GitHub keep what you post under their own privacy policies.</p><h2>Questions</h2><p>Ask us through the <a href=\"contact\">Contact</a> page.</p>",
});

// Future Traveler variants flagged third_party_reference in manifest.json are
// left out; the interactive homages are in, each crediting its inspiration.
// A static HAXsite serves site.json as-is, so an unpublished page would still
// be public: leave a page out rather than marking it unpublished.

await writeFile(out, JSON.stringify(items, null, 2));
console.log(`wrote ${items.length} pages (${items.filter((i) => !i.metadata.published).length} unpublished) to ${out}`);
