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
  image: raw("world-traveler/funny-traveler-15.png"),
  content: [
    p("Art and media from <a href=\"https://haxtheweb.org\">HAX</a>: open-source tools that let anyone create, remix and publish on the web without needing to understand the web. This portfolio is itself a HAXsite, built with the HAX CLI, and every image on it is pulled straight from the <a href=\"https://github.com/haxtheweb/art\">haxtheweb/art</a> repository."),
    image("world-traveler/funny-traveler-15.png", "The World Traveler: red helmet with a HAX band, cyan goggles and a green backpack with a lightbulb, chin on his arms, in front of a white starburst in a red circle.", "The World Traveler, HAX's mascot, in his classic pose."),
    `<h2>Browse</h2>`,
    links([
      ["world-traveler", "World Traveler: the HAX mascot in every style"],
      ["rpg-character", "rpg-character: games and toys starring HAX's pixel character"],
      ["brand", "Brand: logos, stickers, banners and posters"],
      ["talks", "Talks: diagrams and explainers for presentations"],
      ["use-the-art", "Use the art: attribution, licensing and hotlinking"],
    ]),
    p("<strong>Dream it, remix it, have it, share it.</strong>"),
  ].join("\n"),
});

// ---------- World Traveler ----------
const wt = manifest.world_traveler;
const publicWT = wt.filter((x) => !x.third_party_reference);
add({
  id: "world-traveler",
  title: "World Traveler",
  slug: "world-traveler",
  description: "HAX's mascot, a red-helmeted time traveler, in every style.",
  image: raw("world-traveler/funny-traveler-15.png"),
  tags: [],
  content: [
    p("The World Traveler (also called World Changer or Future Traveler) moves through time, taking the best ideas of every era and carrying them into the future, where data flows like water. He is a variant of the <code>rpg-character</code>, itself a caricature of HAX's creator."),
    p("He is on-model when he has a red helmet with a HAX visor band, steampunk goggles, a lightbulb on a stalk and a green backpack. The variants change the style and the setting, never those features. Filter the grid below by role."),
    links([[TREE + "world-traveler", "Character sheet and story on GitHub"]]),
  ].join("\n"),
});
const wtPage = (x, parent, published) => {
  const n = x.id.slice(-2);
  add({
    id: x.id,
    parent,
    published,
    title: x.title,
    slug: `world-traveler-${n}`,
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
publicWT.forEach((x) => wtPage(x, "world-traveler", true));

// ---------- rpg-character ----------
add({
  id: "rpg-character",
  title: "rpg-character",
  slug: "rpg-character",
  description: "Games and toys starring HAX's remixable pixel character.",
  image: raw("haxtheweb/rpg-glitch/media/rpg-glitch-still.png"),
  content: [
    p("The <code>rpg-character</code> is a HAX web component: a little pixel character built from a seed, with hats, costumes, pets and more. Every piece here uses the element's own art. Here is one, live on this page:"),
    `<rpg-character seed="btopro" hat="knight" walking></rpg-character>`,
    links([["https://github.com/haxtheweb/webcomponents/tree/main/elements/rpg-character", "rpg-character on GitHub"], ["https://rpg-me.hax.cloud/", "Make your own in rpg-me"]]),
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
      x.play ? cta(x.play, `Play ${x.title}`) : "",
      links([[x.source, "Files, alt text and credits on GitHub"]]),
    ].filter(Boolean).join("\n"),
  }),
);

// ---------- Brand ----------
add({
  id: "brand",
  title: "Brand",
  slug: "brand",
  description: "Logos, stickers, banners and posters.",
  image: raw("haxtheweb/HAX.psu World changer-circle.png"),
  content: [
    p("HAX logos, stickers, banners and posters. The vector logo is <a href=\"" + REPO + "HAXLogo.svg\">HAXLogo.svg</a>; layered source files (.psd, .ai) live in the <a href=\"" + TREE + "haxtheweb\">haxtheweb</a> folder on GitHub."),
  ].join("\n"),
});
const brand = [
  ["hax-the-web-sticker", "HAX the Web sticker", "haxtheweb/hax-the-web-sticker_v1-2.png", "Die-cut sticker: the h-a-x THE WEB wordmark in chunky black pixel letters between pixel curly braces, with a white border.", "sticker", "Transparent version: hax-the-web-sticker-v1-2-transparent.png."],
  ["hax-wordmark", "h-a-x THE WEB wordmark", "haxtheweb/2019-08-14_13-05-52.png", "The h-a-x THE WEB wordmark in black pixel letters between pixel curly braces.", "logo"],
  ["logo-explorations", "Logo explorations", "haxtheweb/117737906-d7618480-b1c8-11eb-8971-0885bdedd853.png", "Sheet of HAX logo sketches: the letters H, A and X stacked as black pixel blocks in several arrangements, some with THE and WEB tucked in.", "logo", "Seven sheets in all, in the haxtheweb folder (the files named 117737906 to 117737916)."],
  ["world-changer-badge", "World Changer badge", "haxtheweb/HAX.psu World changer-circle.png", "Circular badge: the World Traveler in a red HAX helmet and cyan goggles peeking over his arms in front of a red and white starburst, lightbulb glowing.", "badge"],
  ["helmet-mark", "Helmet mark", "haxtheweb/hax-full.png", "The World Traveler's red HAX helmet and glowing cyan goggles peeking over folded arms, on white.", "logo", "Black-background version: hax.png."],
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
  image: raw("world-traveler/funny-traveler-30.png"),
  content: [
    `<h2>Attribution</h2>`,
    p("HAX (haxtheweb), <a href=\"https://github.com/haxtheweb/art\">https://github.com/haxtheweb/art</a>"),
    `<h2>License</h2>`,
    p(`The proposal is CC BY 4.0 for art HAX created; see <a href="${REPO}LICENSING.md">LICENSING.md</a>. Some World Traveler variants riff on other creators' work. Those aren't shown on this site; they are flagged in <a href="${REPO}manifest.json">manifest.json</a> for review before promotion.`),
    `<h2>Hotlinking</h2>`,
    p("Every image on this site is a raw GitHub URL, such as <code>" + raw("world-traveler/funny-traveler-15.png") + "</code>. File names in the repo are never renamed, so these links stay stable."),
    `<h2>How this was made</h2>`,
    p("Most World Traveler variants are AI-generated remixes of the original human-made character. RPG Glitch, the HAX the Web game, the wanted poster and HAX in under a minute were made with an AI assistant (Claude) under HAX team direction. HAX's own writing and brand marks are not AI-generated."),
    `<h2>Add to the collection</h2>`,
    p(`Open a pull request on <a href="https://github.com/haxtheweb/art">haxtheweb/art</a>; <a href="${REPO}AGENTS.md">AGENTS.md</a> has the rules. To refresh this site after adding World Traveler variants, run <code>node tools/hax-art-items.mjs</code> and import the result with the HAX CLI.`),
  ].join("\n"),
});

// Variants and pieces that riff on other creators' work (manifest.json
// third_party_reference, and the homage pieces AGENTS.md marks "review before
// official promotion") are left out on purpose. A static HAXsite serves
// site.json as-is, so an unpublished page would still be public.

await writeFile(out, JSON.stringify(items, null, 2));
console.log(`wrote ${items.length} pages (${items.filter((i) => !i.metadata.published).length} unpublished) to ${out}`);
