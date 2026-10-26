const path = require('path');
const pptxgen = require('pptxgenjs');
// Builds media/hax-in-a-minute.pptx: slide 1 embeds the MP4, slides 2-6 are each scene's end frame with the narration as speaker notes.
const out = process.argv[2] || path.join(__dirname, '..', 'media', 'hax-in-a-minute.pptx');
const S = n => path.join(__dirname, '..', 'media', 'stills', n);
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'HAX in under a minute';
pres.author = 'HAXTheWeb';
pres.subject = 'Doodle-board explainer of HAX: what it is, the ecosystem, the magic script, the seven pillars and lift-off';
const slides = [
  ['01-what-is-hax.png', 'What is HAX? Plain text plus drop-in blocks, each a web component, with zombie pirate girl saying Ahoy.',
   'HAX is the open web, built from plain text and blocks that anyone can edit. Each block is a web component.'],
  ['02-ecosystem.png', 'Why is it so powerful? HAX in the center, linked to web components, the HAX editor that reads component schema and the HAX CLI on the build side, and single site Node.js, multisite PHP and Node.js, multi-tenant PHP and static publishing on the run and publish side.',
   "Same blocks, same editor, which reads each component's schema. Run it as a single site, multisite or multi-tenant, or publish plain static files."],
  ['03-magic-script.png', 'Why does it get faster? Page 1 downloads three components, they are kept in the browser, and page 2 reuses them so it only downloads one new component.',
   'The magic script loads each element once. Later pages only fetch what is new, so every follow-up request is faster.'],
  ['04-pillars.png', 'Seven pillars hold everyone up: Accessible, Extensible, Free and Open, Efficient, Platform Agnostic, Remixable and Sustainable, with AI agents, students, designers, educators and developers standing on top.',
   'Seven community pillars hold it up for students, designers, educators, developers and AI agents: accessible, extensible, free and open, efficient, platform agnostic, remixable and sustainable.'],
  ['05-lift-off.png', 'What will you launch? Five rockets with pillar-striped engines carry the characters toward docs, portfolio, website, blog and course, among falling stars. Our pillars are your engines of change! haxtheweb.org',
   'So what will you launch? A docs site, a portfolio, a website, a blog, a course. Everyone gets a rocket, and our pillars are your engines of change!']
];
// slide 1: the whole animation as an embedded video, poster frame = title scene
const v = pres.addSlide();
v.addMedia({ type: 'video', path: path.join(__dirname, '..', 'media', 'hax-in-a-minute.mp4'), cover: S('01-what-is-hax.png'), x: 0, y: 0, w: 10, h: 5.625 });
v.addNotes('Play the video (about a minute). The following slides are the end frame of each scene, for talking through at your own pace.\n\n' + slides.map(s => s[2]).join('\n\n'));
slides.forEach(([file, alt, notes]) => {
  const s = pres.addSlide();
  s.addImage({ path: S(file), x: 0, y: 0, w: 10, h: 5.625, altText: alt });
  s.addNotes(notes);
});
pres.writeFile({ fileName: out }).then(f => console.log('wrote', f));
