// tools/star-chart.mjs — bake the improbable engine (~/transmediale) into the
// static snapshot as /star-chart/ — the fedwiki space as a walkable constellation
// map. The live engine reads the local farm; this bake freezes each site's sitemap
// (with links, so the Promise Graph still weaves) into data/sitemaps/ and rewires
// page-star click-throughs to the snapshot's own pages.
//
// Run AFTER tools/snapshot.mjs (which clears site/), alongside tools/gate.mjs:
//   node tools/snapshot.mjs && node tools/star-chart.mjs && node tools/gate.mjs
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(os.homedir(), 'transmediale');
const WIKI = path.join(os.homedir(), '.wiki');
const OUT = path.join(ROOT, 'site', 'star-chart');

// id = host label shown in the engine (NO dev-host names in the public page);
// dir = the farm host that feeds it; sub = the snapshot subpath its pages live at.
const LOCAL = [
  { id: 'guide',      dir: 'guide.localhost',        sub: 'guide',             strand: 'connection' },
  { id: 'tomes',      dir: 'tomes.localhost',        sub: 'city/tomes',        strand: 'connection' },
  { id: 'grimoire',   dir: 'grimoire.localhost',     sub: 'grimoire',          strand: 'connection' },
  { id: 'fieldguide', dir: 'fieldguide.localhost',   sub: 'fieldguide',        strand: 'connection' },
  { id: 'engine',     dir: 'transmediale.localhost', sub: 'improbable-engine', strand: 'connection' },
  { id: 'atlas',      dir: 'atlas.localhost',        sub: 'atlas',             strand: 'memory' },
  { id: 'spellbooks', dir: 'spellbooks.localhost',   sub: 'spellbooks',        strand: 'memory' },
  { id: 'skill',      dir: 'skill.localhost',        sub: 'skill',             strand: 'delegation' },
  { id: 'mouse',      dir: 'spellbook.localhost',    sub: 'mouse-spellbook',   strand: 'delegation' },
  { id: 'game42',     dir: 'game42.localhost',       sub: 'game42',            strand: 'compute' },
  { id: 'harness',    dir: 'harness.localhost',      sub: 'harness',           strand: 'compute' },
  { id: 'dtg',        dir: 'dtg.localhost',          sub: 'dtg',               strand: 'protection' },
  { id: 'research',   dir: 'research.localhost',     sub: 'research',          strand: 'protection' },
  { id: 'kyra',       dir: 'kyra.localhost',         sub: 'kyra',              strand: 'protection' },
  { id: 'vision',     dir: 'mitch.vision.localhost', sub: 'vision',            strand: 'connection' },
  { id: 'tiles',      dir: 'plugin.localhost',       sub: 'tiles',             strand: 'delegation' },
  { id: 'city',       dir: 'city.localhost',         sub: 'city',              strand: 'value' },
  { id: 'lexon',      dir: 'lexon.localhost',        sub: 'lexon',             strand: 'value' },
  { id: 'myterms',    dir: 'myterms.localhost',      sub: 'myterms',           strand: 'value' },
];
// remote federation neighbours — still read live (FedWiki runs permissive CORS)
const REMOTE = [
  { host: 'lattice.myth.garden',       url: 'https://lattice.myth.garden',       strand: 'connection' },
  { host: 'mitch.lattice.myth.garden', url: 'https://mitch.lattice.myth.garden', strand: 'connection' },
];

const asSlug = s => s.replace(/\s/g, '-').replace(/[^A-Za-z0-9-]/g, '').replace(/^-+|-+$/g, '').toLowerCase();

// ---- the six strands, guide edition -----------------------------------------
// Same schema the engine reads (strands[]: id·lab·steward·axis·force·hue·bit) but
// remapped from the transmediale lab seating to the guide's own constellation
// groups: the six sovereignty axes of the 64-vertex lattice (game42 axis canon —
// ids and hues unchanged; 'connection' stays the hearth at the centre).
const GUIDE_LABS = {
  meta: {
    program: 'guide to agentprivacy · the Star Chart',
    axisCanon: 'game42 data/game-of-42.json axis colours; six stratum-1 roots of the 64-vertex sovereignty lattice',
    seating: 'each federation site is seated on its axis strand (tools/star-chart.mjs LOCAL table)',
    lineage: 'generalised from the improbable engine lab seating, 2026-08-18',
  },
  strands: [
    { id: 'protection', bit: 0, lab: 'The Gates', steward: 'the Swordsman ⚔️',
      theme: 'the boundary layer — trust graphs, zero-knowledge predicates, the KYRA checkpoint, the research spine',
      axis: 'protection', force: 'Protect ⚔️', hue: '#E0A526',
      why: 'dtg · research · kyra — where the right to act is earned' },
    { id: 'delegation', bit: 1, lab: 'The Skills', steward: 'the Mage 🧙',
      theme: 'the forkable skill library and its mouse rendering — what the agents carry',
      axis: 'delegation', force: 'Project 🧙', hue: '#2563EB',
      why: 'skill · mouse — agency over the tools' },
    { id: 'compute', bit: 2, lab: 'The Harness', steward: 'soulbae 🧙 ⊥ soulbis ⚔️',
      theme: 'the dual-agent loop and the game engine — a validated result proposes an edge, only a signature mints it',
      axis: 'compute', force: null, hue: '#7C5CFF',
      why: 'harness · game42 — the loop that proves before it mints' },
    { id: 'memory', bit: 3, lab: 'The Canon', steward: 'the Archivist 📚',
      theme: 'the knowledge graph and the spellbooks — the archive that carries lineage',
      axis: 'memory', force: 'Reflect 🪞', hue: '#E0568A',
      why: 'atlas · spellbooks — indexes and archives are continuity' },
    { id: 'connection', bit: 4, lab: 'The Federation', steward: 'the guide 🏛',
      theme: 'the forkable wiki commons — every site a sister, the hearth that feeds the lattice',
      axis: 'connection', force: 'Connect 🤝', hue: '#14B8A6',
      why: 'guide · tomes · grimoire · fieldguide · engine — federation is literally the network axis' },
    { id: 'value', bit: 5, lab: 'The Agreements', steward: 'the City of Mages 🏛',
      theme: 'the agreement and value layer — MyTerms, the Lexon grammar, the City’s economy',
      axis: 'value', force: null, hue: '#2FB67C',
      why: 'city · lexon · myterms — value lives on the path' },
  ],
};

// ---- bake one site's sitemap (slug · title · date · links) ------------------
function bakeSitemap(site) {
  const dir = path.join(WIKI, site.dir, 'pages');
  if (!fs.existsSync(dir)) return null;
  const map = [];
  for (const slug of fs.readdirSync(dir)) {
    let page; try { page = JSON.parse(fs.readFileSync(path.join(dir, slug), 'utf8')); } catch { continue; }
    const links = {};
    for (const it of (Array.isArray(page.story) ? page.story : [])) {
      if (it.type === 'reference' && it.slug) { links[it.slug] = 1; continue; }
      for (const m of String(it.text || '').matchAll(/\[\[([^\]]+)\]\]/g)) links[asSlug(m[1])] = 1;
    }
    map.push({ slug, title: page.title || slug, date: page.journal?.slice(-1)[0]?.date || 0, links });
  }
  return map;
}

// ---- patch the engine page for static seating -------------------------------
// Every replacement must match exactly once — a miss means ~/transmediale drifted.
function patch(html, finds) {
  for (const [find, repl] of finds) {
    const n = html.split(find).length - 1;
    if (n !== 1) { console.error(`✗ patch matched ${n}× (expected 1):\n  ${find.split('\n')[0]}…`); process.exit(1); }
    html = html.replace(find, repl);
  }
  return html;
}

const HOSTPATH = Object.fromEntries(LOCAL.map(s => [s.id, s.sub]));
// snapshot site id → strand, for ?site= deep links from the ✨ Visualise button.
// Aliases cover the snapshot ids that differ from the chart's own site ids.
const SITESTRAND = {
  ...Object.fromEntries(LOCAL.map(s => [s.id, s.strand])),
  spellbook: 'delegation', transmediale: 'connection', plugin: 'delegation',
};

let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
html = patch(html, [
  ['<title>the lattice lab improbable engine · transmediale 2027</title>',
   '<title>privacy guide star chart · the fedwiki space as constellations</title>\n<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">'],

  ['<div class="eyebrow">transmediale 2027 · lattice labs × the knowledge hearth</div>',
   '<div class="eyebrow"><a class="back" href="/">← the guide</a> · six strands × the knowledge hearth</div>'],

  ['<h1>the lattice lab improbable engine</h1>',
   '<h1>privacy guide star chart</h1>'],

  ['<div class="sect">six strands · five labs + the hearth</div>',
   '<div class="sect">six strands · the sovereignty axes</div>'],

  ['the lab↔axis seating is <b>conjectural</b> — awaiting review. click a strand to isolate ·',
   'every federation site is seated on its axis strand. click a strand to isolate ·'],

  ['<div id="status">waking the hearth…</div>',
   `<div id="status">waking the hearth…</div>
  <button id="infoBtn" title="about this chart — expand / minimise">📜 about</button>
  <article>The federation of the guide, redisplayed: every site's pages seated as
  stars on the 64-vertex sovereignty lattice, six strands winding the torus, links woven from the
  sitemaps at build time. A baked snapshot of the fedwiki space — the same improbable engine that
  runs live on the local farm. Each strand winds the torus by its axis bit — protection, bit 0,
  is the equator; value, bit 5, threads the hole five times. Stars seat by their universal
  reference (the slug, never the host — a fork lands beside its original) and lift with their
  weave: the more links, the higher a page rides. The five crystals ringing the hearth are the
  axes' bit-flip bonds on the 64-vertex board. Click a strand to isolate it · click a page-star
  to walk it · shift+click opens the page here · ◌ focus clears the instruments · 📷 keepsake
  saves the view with a City Key inside.</article>`],

  ['  @media (max-width:760px){ #legend{ width:210px } #controls{ width:190px } footer{ display:none } }',
   `  /* gradient text is clipped to the glyph box: the source's 0.95 line-height
     crops descenders (the g's tail) — give the h1 room to breathe */
  header.top h1{ line-height:1.12; padding-bottom:4px; }
  header.top a.back{ color:var(--dim); pointer-events:auto; text-decoration:none; }
  header.top a.back:hover{ color:var(--ink); }
  header.top article{ max-width:560px; margin-top:8px; font-size:10.5px; line-height:1.55; color:var(--dim); display:none; }
  header.top article.open{ display:block; }
  #infoBtn{ pointer-events:auto; margin-top:8px; background:rgba(120,140,220,0.07); border:1px solid var(--line);
    color:var(--dim); border-radius:7px; font-size:10px; letter-spacing:0.04em; padding:3px 9px; cursor:pointer; font-family:inherit; }
  #infoBtn:hover{ color:var(--ink); border-color:rgba(120,140,220,0.45); }
  /* every instrument panel folds to its emoji */
  .minbtn{ position:absolute; top:7px; right:7px; z-index:2; background:none; border:none; font-size:12px;
    cursor:pointer; opacity:0.6; padding:2px 4px; line-height:1; }
  .minbtn:hover{ opacity:1; }
  #tracer .minbtn{ right:auto; left:7px; }
  .panel.min{ width:auto !important; min-width:0; padding:5px 7px; }
  .panel.min > *:not(.minbtn){ display:none; }
  .panel.min .minbtn{ position:static; font-size:16px; opacity:0.85; }
  .cbar button.on{ color:#04050b; background:linear-gradient(120deg,#ffd27a,#ffe6c2); border-color:transparent; font-weight:500; }
  /* palette wells */
  #pal{ display:flex; gap:5px; }
  #pal input{ width:27px; height:20px; border:1px solid var(--line); border-radius:5px; background:none; padding:1px; cursor:pointer; }
  /* focus mode + keepsake — a small bottom-centre bar; body.zen hides every instrument */
  #zenbar{ position:fixed; left:50%; transform:translateX(-50%); bottom:40px; z-index:10;
    display:flex; gap:6px; transition:opacity .2s; }  /* clear of the (⚔️⊥⿻⊥🧙)😊 signature below */
  #zenbar button{ font-family:inherit; font-size:9.5px; letter-spacing:0.08em; padding:6px 12px; border-radius:999px;
    background:rgba(10,13,28,0.55); border:1px solid var(--line); color:var(--dim); cursor:pointer;
    backdrop-filter:blur(8px); }
  #zenbar button:hover{ color:var(--ink); border-color:rgba(120,140,220,0.45); }
  body.zen header.top, body.zen .panel, body.zen footer, body.zen #tip{ display:none !important; }
  body.zen #zenbar{ opacity:0.3; }
  body.zen #zenbar:hover{ opacity:1; }
  /* mobile: the three glass panels collide on a phone — legend becomes a bottom
     chip-rail, controls tuck above it, the tracer HUD steps aside */
  @media (max-width:760px){
    footer{ display:none }
    header.top{ padding:14px 150px 0 16px }  /* right gap keeps the eyebrow clear of the zenbar */
    h1{ font-size:clamp(20px,6vw,30px) }
    #status{ font-size:9px }
    #tracer{ display:none }
    #controls{ top:auto; bottom:104px; right:10px; width:150px; padding:10px }
    #zenbar{ left:auto; right:12px; top:12px; bottom:auto; transform:none }
    #legend{ left:10px; right:10px; bottom:10px; width:auto; padding:10px }
    #legend .foot{ display:none }
    #chips{ display:flex; overflow-x:auto; gap:4px; padding-bottom:2px; -webkit-overflow-scrolling:touch }
    .chip{ flex:none; padding:5px 7px }
    .chip .nm span{ display:none }
  }`],

  ['const state = { fold:0, drift:!REDUCED, iso:null, strands:true, grid:true, pages:true, links:true, crystals:true };',
   `const state = { fold:0, drift:!REDUCED, iso:null, strands:true, grid:true, pages:true, links:true, crystals:true };
const HOSTPATH = ${JSON.stringify(HOSTPATH)}; // site id → snapshot subpath (baked by tools/star-chart.mjs)
const SITESTRAND = ${JSON.stringify(SITESTRAND)}; // ?site= deep link → strand to isolate`],

  [`// transport: *.localhost sites go through the serve.mjs proxy (vhost farms have no CORS
// need); remote sites with a url are fetched DIRECTLY — FedWiki federation runs on
// permissive CORS, verified live against mitch.lattice.myth.garden (G1 of the
// generative-hearth plan, arrived early)`,
   `// transport: local federation sites read the sitemaps BAKED into this snapshot
// at build time (tools/star-chart.mjs); remote sites with a url are fetched DIRECTLY —
// FedWiki federation runs on permissive CORS`],

  ["const base = site.url ? site.url.replace(/\\/+$/,'')+'/' : `/wiki/${site.host}/`;",
   "const base = site.url ? site.url.replace(/\\/+$/,'')+'/' : `data/sitemaps/${site.host}/`;"],

  ['statusEl.innerHTML = `hearth unreachable — start the farm: <b>wiki --data ~/.wiki --port 3030 --farm</b> · torus runs latent`;',
   "statusEl.innerHTML = 'hearth data missing — the torus runs latent';"],

  ['if(e.shiftKey) open(d.siteUrl ? `${d.siteUrl}/view/${d.slug}` : `http://${d.host}:3030/view/${d.slug}`, \'_blank\');',
   'if(e.shiftKey) open(d.siteUrl ? `${d.siteUrl}/view/${d.slug}` : `/${HOSTPATH[d.host]||d.host}/${d.slug}.html`, \'_blank\');'],

  ['opens the page in the wiki.</div>',
   'opens the page in the guide.</div>'],

  // with every page seated (~2.2k stars) the 600-link cap starves the weave.
  // ALSO: seat the stars NOW — the source never calls rebuildStars() after
  // loading, so every sprite sits at the origin until the first fold input.
  ['DATA.links = DATA.links.slice(0, 600);',
   'DATA.links = DATA.links.slice(0, 2000);\n  rebuildStars(); // stars were piling at the origin until the fold dial forced a reseat'],

  // palette row in the instrument — recolor the six strands; the choice persists
  // locally and rides inside the keepsake's City Key (personalisation encoded in
  // the image, the /star + sigil move).
  [`    <button id="tDrift" class="on">drift</button>
  </div>
</div>`,
   `    <button id="tDrift" class="on">drift</button>
  </div>
  <div class="row" style="margin:10px 0 0">
    <div class="lbl"><span>palette — yours to keep</span><span class="v" id="palReset" style="cursor:pointer" title="back to the canon hues">reset</span></div>
    <div id="pal"></div>
  </div>
</div>`],

  // canonical windings, guide edition: strand b = axis bit b winds (1, b) —
  // one revolution, b threads through the hole. The winding number IS the bit;
  // protection (bit 0) is the equator, the boundary ring. Replaces the source's
  // explicitly aesthetic set.
  ['const WINDINGS = [[1,0],[0,1],[1,1],[1,2],[2,1],[1,3]];',
   'const WINDINGS = [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5]]; // (1, bit) — the winding is the axis bit'],

  // run your path — a light circuit along the walk, flaring the pages it visits
  ['<button id="cSave" title="keep this walk as a named constellation">✦ save</button>',
   '<button id="cRun" title="run your path — a light circuit walks your constellation, flaring each page">▶ run</button>\n    <button id="cSave" title="keep this walk as a named constellation">✦ save</button>'],

  ['  pickStars();\n  controls.update();',
   '  runnerTick(dt);\n  pickStars();\n  controls.update();'],

  // focus mode + keepsake — clear the instruments / keep the image (City Key inside)
  ['<div id="tip"></div>',
   `<div id="tip"></div>
<div id="zenbar">
  <button id="focusBtn" title="hide the instruments — just the shape (f toggles, Esc exits)">◌ focus</button>
  <button id="snapBtn" title="save the view as a PNG — a City Key travels inside it (iTXt citykey chunk)">📷 keepsake</button>
</div>`],

  // the axis crystals — the source's 5×5 "lab crystals" (cohort-scale, aesthetic)
  // become bit-flip plaquettes: each strand is an axis BIT, and its crystal is the
  // full 8×8 board (all 64 vertices, the codex in miniature) drawn with that
  // axis's 32 bit-flip bonds — flipping bit b pairs every vertex x with x ⊕ 2^b,
  // stride 2^b along u for bits 0-2, stride 2^(b-3) along v for bits 3-5.
  // Exact structure, not ornament.
  [`  const N=5, SPACING=0.085, HALF=(N-1)/2*SPACING, RAD=0.56;
  for(const s of DATA.strands){
    if(s.id==='connection') continue;
    const az = wrap(strandUV(s, 0.12)[0]);      // face the strand it seeds
    const g = new THREE.Group();
    const pts=[], bonds=[];
    for(let r=0;r<N;r++) for(let c=0;c<N;c++){
      const x=c*SPACING-HALF, y=r*SPACING-HALF;
      pts.push(x,y,0);
      if(c<N-1) bonds.push(x,y,0, x+SPACING,y,0);
      if(r<N-1) bonds.push(x,y,0, x,y+SPACING,0);
    }`,
   `  const N=8, SPACING=0.052, HALF=(N-1)/2*SPACING, RAD=0.56;
  for(const s of DATA.strands){
    if(s.id==='connection') continue;
    const az = wrap(strandUV(s, 0.12)[0]);      // face the strand it seeds
    const g = new THREE.Group();
    const pts=[], bonds=[];
    const P = (c,r)=>[c*SPACING-HALF, r*SPACING-HALF];
    for(let r=0;r<N;r++) for(let c=0;c<N;c++) pts.push(...P(c,r), 0);
    // the 32 bit-flip bonds of this axis: partner = index ^ 2^(bit mod 3)
    const stride = 1 << (s.bit % 3), onU = s.bit < 3;
    for(let r=0;r<N;r++) for(let c=0;c<N;c++){
      const c2 = onU ? (c ^ stride) : c, r2 = onU ? r : (r ^ stride);
      if(c2 > c || r2 > r) bonds.push(...P(c,r), 0, ...P(c2,r2), 0);
    }`],

  ['color:new THREE.Color(s.hue), size:0.026, transparent:true, opacity:0.95, sizeAttenuation:true }));',
   'color:new THREE.Color(s.hue), size:0.019, transparent:true, opacity:0.95, sizeAttenuation:true }));'],

  // UOR seating: the source hashes host+slug (the copy's location names its place);
  // the guide edition derives the coordinate from the page's UNIVERSAL REFERENCE —
  // the slug alone — so the same page forked across sites lands at the same strand
  // parameter everywhere: a ring of the one reference across the federation.
  ['  const h = hash01(site.host+\'/\'+pg.slug);',
   '  const h = hash01(pg.slug); // UOR: the reference seats the star, the host is incidental'],

  // κ lift: connectivity, not chance — the more links a page carries, the higher
  // it rides off the surface. Hubs float; leaves hug the lattice.
  ['    u:u0+du, v:v0+dv, lift:0.05+h*0.09, week, baseScale: week?0.11:0.085 };',
   '    u:u0+du, v:v0+dv, lift:0.04+Math.min(Object.keys(pg.links||{}).length,12)/12*0.12, week, baseScale: week?0.11:0.085 };'],

  // touch devices have no hover: a tap arrives with stale pointer coords, so no
  // star is ever "hovered" — re-pick from the tap point before deciding.
  [`canvas.addEventListener('click', e=>{
  if(!hovered) return;`,
   `canvas.addEventListener('click', e=>{
  ptr.x = (e.clientX/innerWidth)*2-1; ptr.y = -(e.clientY/innerHeight)*2+1;
  pickStars();
  if(!hovered) return;`],

  ["const blob = new Blob([JSON.stringify({ engine:'the lattice lab improbable engine', exported:new Date().toISOString(),",
   "const blob = new Blob([JSON.stringify({ engine:'privacy guide star chart', exported:new Date().toISOString(),"],

  ['loadWiki();   // live, local-only; the torus runs latent if the farm sleeps',
   `loadWiki().then(()=>{   // baked sitemaps; ?site=/?strand= deep links isolate a strand
  const q = new URLSearchParams(location.search);
  const pre = q.get('strand') || SITESTRAND[q.get('site')] || null;
  if(pre && DATA.byId[pre]){ state.iso = pre; applyIso(); }
  restorePalette();        // retint stars only after they exist
});

// ===== the palette — recolor the six strands; yours to keep =====
const PALKEY = 'chart-palette';
function recolor(id, hex){
  const s = DATA.byId[id]; if(!s) return;
  s.hue = hex;
  if(strandMats[id]) strandMats[id].color.set(hex);
  const fresh = glowSprite(hex, 0.3);                       // one new glow texture per strand
  starMats[id] = fresh;
  for(const spr of DATA.stars) if(spr.userData.strand === id){ spr.material.map = fresh.map; spr.material.needsUpdate = true; }
  for(const c of crystals) if(c.userData.strand === id){ c.userData.points.material.color.set(hex); c.userData.lines.material.color.set(hex); }
  if(id === 'connection'){ hearthRing.material.color.set(hex); hearthThreads.material.color.set(hex); }
  const chip = document.querySelector('.chip[data-id="' + id + '"]'); if(chip) chip.style.color = hex;
}
const palBox = document.getElementById('pal');
for(const s of DATA.strands){
  const inp = document.createElement('input');
  inp.type = 'color'; inp.value = s.hue; inp.title = s.lab; inp.dataset.id = s.id;
  inp.oninput = () => { recolor(s.id, inp.value);
    localStorage.setItem(PALKEY, JSON.stringify(Object.fromEntries(DATA.strands.map(x => [x.id, x.hue])))); };
  palBox.appendChild(inp);
}
function restorePalette(){
  try{
    const saved = JSON.parse(localStorage.getItem(PALKEY) || '{}');
    for(const [id, hex] of Object.entries(saved)){
      recolor(id, hex);
      const inp = palBox.querySelector('input[data-id="' + id + '"]'); if(inp) inp.value = hex;
    }
  }catch{}
}
document.getElementById('palReset').onclick = () => { localStorage.removeItem(PALKEY); location.reload(); };

// ===== fold each instrument to its emoji =====
const PKEY = 'chart-panels';
const pstate = (() => { try{ return JSON.parse(localStorage.getItem(PKEY)) || {}; }catch{ return {}; } })();
const psave = () => localStorage.setItem(PKEY, JSON.stringify(pstate));
const art = document.querySelector('header.top article');
const infoBtn = document.getElementById('infoBtn');
const setInfo = open => art.classList.toggle('open', open);
infoBtn.onclick = () => { setInfo(!art.classList.contains('open')); pstate.info = art.classList.contains('open') ? 0 : 1; psave(); };
setInfo(pstate.info !== undefined ? !pstate.info : innerWidth > 760);
for(const [id, emo, name] of [['legend','🧵','the strands'], ['controls','🎛️','the instrument'], ['tracer','👣','the walk']]){
  const p = document.getElementById(id);
  const b = document.createElement('button');
  b.className = 'minbtn'; b.textContent = emo; b.title = name + ' — minimise / expand';
  b.onclick = () => { p.classList.toggle('min'); pstate[id] = p.classList.contains('min') ? 1 : 0; psave(); };
  p.prepend(b);
  if(pstate[id]) p.classList.add('min');
}

// ===== run your path — a light circuit along the walk =====
// var (not const): tick() runs its first frame synchronously during module
// evaluation, before this line — runnerTick must see undefined, not a TDZ throw.
var runner = { on: false, dist: 0, lastSeg: -1, flares: [], spr: null };
runner.spr = new THREE.Sprite(glowSprite('#ffd27a', 0.18));
runner.spr.scale.setScalar(0.15); runner.spr.visible = false; world.add(runner.spr);
const runBtn = document.getElementById('cRun');
runBtn.onclick = () => {
  if(trail.pts.length < 2) return;
  runner.on = !runner.on; runner.dist = 0; runner.lastSeg = -1;
  runner.spr.visible = runner.on;
  runBtn.classList.toggle('on', runner.on);
};
function flareStar(d){
  const spr = DATA.stars.find(s => s.userData === d);
  if(spr) runner.flares.push({ spr, life: 1 });
}
function runnerTick(dt){
  if(!runner) return;   // frames before module evaluation reaches the runner init
  // decay star flares back to their base scale
  for(const f of runner.flares){
    f.life -= dt * 1.1;
    f.spr.scale.setScalar(f.spr.userData.baseScale * (1 + 2.4 * Math.max(f.life, 0)));
  }
  runner.flares = runner.flares.filter(f => f.life > 0);
  if(!runner.on || trail.pts.length < 2){ runner.spr.visible = false; return; }
  runner.spr.visible = true;
  // reseat waypoints each frame so the circuit rides the fold torus⇄codex live
  const pts = trail.pts.map(d => seat(d.u, d.v, d.lift, new THREE.Vector3()));
  const segs = []; let total = 0;
  for(let i = 0; i < pts.length - 1; i++){ const L = pts[i].distanceTo(pts[i+1]); segs.push(L); total += L; }
  if(total <= 0) return;
  runner.dist = (runner.dist + dt * 0.9) % total;   // constant world speed, loops the circuit
  let d = runner.dist, i = 0;
  while(i < segs.length - 1 && d > segs[i]){ d -= segs[i]; i++; }
  runner.spr.position.lerpVectors(pts[i], pts[i+1], segs[i] ? Math.min(d / segs[i], 1) : 0);
  if(i !== runner.lastSeg){                          // crossing into a segment flares its start star
    runner.lastSeg = i;
    flareStar(trail.pts[i]);
    if(i === segs.length - 1) flareStar(trail.pts[i + 1]);
  }
}

// ===== focus mode — clear the instruments, keep the shape =====
const setZen = on => document.body.classList.toggle('zen', on);
document.getElementById('focusBtn').onclick = () => setZen(!document.body.classList.contains('zen'));
addEventListener('keydown', e => {
  if(e.key === 'Escape') setZen(false);
  else if((e.key === 'f' || e.key === 'F') && !e.metaKey && !e.ctrlKey) setZen(!document.body.classList.contains('zen'));
});

// ===== keepsake — the view as a PNG with a City Key inside (iTXt "citykey") =====
const CRC_T = (() => { const t = new Uint32Array(256); for(let n=0;n<256;n++){ let c=n; for(let k=0;k<8;k++) c = c&1 ? 0xEDB88320 ^ (c>>>1) : c>>>1; t[n]=c; } return t; })();
const crc32 = buf => { let c=0xFFFFFFFF; for(let i=0;i<buf.length;i++) c = CRC_T[(c^buf[i])&255] ^ (c>>>8); return (c^0xFFFFFFFF)>>>0; };
function cityKeyPNG(dataURL, meta){
  const bin = atob(dataURL.split(',')[1]);
  const png = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) png[i] = bin.charCodeAt(i);
  const kw = new TextEncoder().encode('citykey'), txt = new TextEncoder().encode(JSON.stringify(meta));
  // iTXt: keyword NUL compFlag compMethod NUL(lang) NUL(translated) text — 5 zero bytes between
  const data = new Uint8Array(kw.length + 5 + txt.length);
  data.set(kw, 0); data.set(txt, kw.length + 5);
  const chunk = new Uint8Array(12 + data.length), dv = new DataView(chunk.buffer);
  dv.setUint32(0, data.length); chunk.set([105,84,88,116], 4); chunk.set(data, 8);
  dv.setUint32(8 + data.length, crc32(chunk.slice(4, 8 + data.length)));
  const cut = 33; // 8-byte signature + 25-byte IHDR chunk — the key rides right behind the header
  const out = new Uint8Array(png.length + chunk.length);
  out.set(png.slice(0, cut), 0); out.set(chunk, cut); out.set(png.slice(cut), cut + chunk.length);
  return new Blob([out], { type: 'image/png' });
}
document.getElementById('snapBtn').onclick = () => {
  renderer.render(scene, camera); // fresh buffer in the same task — no preserveDrawingBuffer needed
  const meta = {
    key: 'city-key', chart: 'privacy guide star chart',
    origin: 'https://guide.agentprivacy.ai/star-chart/',
    exported: new Date().toISOString(),
    sites: new Set(DATA.stars.map(s => s.userData.host)).size,
    pages: DATA.stars.length, links: DATA.links.length,
    strand: state.iso || 'all', fold: Number(state.fold.toFixed(3)),
    walk: trail.pts.map(d => ({ site: d.host, slug: d.slug })), T: Number(trail.value.toFixed(1)),
    palette: Object.fromEntries(DATA.strands.map(s => [s.id, s.hue])), // your colors ride in the key
    seal: '(⚔️⊥⿻⊥🧙)😊'
  };
  const a = document.createElement('a');
  a.href = URL.createObjectURL(cityKeyPNG(renderer.domElement.toDataURL('image/png'), meta));
  a.download = 'privacy-guide-star-chart.png';
  a.click(); URL.revokeObjectURL(a.href);
};`],
]);

// ---- emit -------------------------------------------------------------------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'vendor'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'data'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'index.html'), html);
for (const v of ['three.module.min.js', 'OrbitControls.js'])
  fs.copyFileSync(path.join(SRC, 'vendor', v), path.join(OUT, 'vendor', v));
fs.writeFileSync(path.join(OUT, 'data', 'labs.json'), JSON.stringify(GUIDE_LABS, null, 1));

let sites = 0, pages = 0;
const manifest = [];
for (const site of LOCAL) {
  const map = bakeSitemap(site);
  if (!map || !map.length) { console.log(`  · ${site.id}: no pages — skipped`); continue; }
  const dir = path.join(OUT, 'data', 'sitemaps', site.id, 'system');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'sitemap.json'), JSON.stringify(map));
  manifest.push({ host: site.id, strand: site.strand });
  sites++; pages += map.length;
}
fs.writeFileSync(path.join(OUT, 'data', 'wiki-sites.json'), JSON.stringify({
  note: 'BAKED — generated by tools/star-chart.mjs from the local farm at snapshot time. ' +
    'Hosts are the static snapshot\'s site ids; each sitemap lives at data/sitemaps/<id>/system/sitemap.json. ' +
    'Remote sites with a url are still read live.',
  // seat EVERY page — the live engine's 24-per-site cap is for reading a farm
  // live; the baked chart charts the whole universe.
  pagesPerSite: 100000,
  sites: [...manifest, ...REMOTE],
}, null, 1));

console.log(`✓ star chart baked → site/star-chart/ — ${sites} local sites · ${pages} pages in the sitemaps · +${REMOTE.length} remote live`);
