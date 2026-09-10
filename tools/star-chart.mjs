import { installStarConnect } from './star-connect-build.mjs';
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
import crypto from 'node:crypto';
// Phase 0 (PLAN_KNOWLEDGE_GRAPH_TO_VTA): a page may carry a 'posture' story item —
// the 6-bit lattice vertex it advances. tools/lattice.mjs is the one bit canon.
import { readPostureItem } from './lattice.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(os.homedir(), 'transmediale');
const WIKI = path.join(os.homedir(), '.wiki');
const OUT = path.join(ROOT, 'site', 'star-chart');

// id = host label shown in the engine (NO dev-host names in the public page);
// dir = the farm host that feeds it; sub = the snapshot subpath its pages live at.
const LOCAL = [
  ...(fs.existsSync(path.join(ROOT,'site/codexmage/welcome-visitors.html')) ? [{ id: 'codexmage', dir: 'codexmage.localhost', sub: 'codexmage', strand: 'connection' }] : []),
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
  { id: 'vpk',        dir: 'vpk.localhost',          sub: 'vpk',               strand: 'protection' },
];
// remote federation neighbours — still read live (FedWiki runs permissive CORS)
const REMOTE = [
  { host: 'skills.agentprivacy.ai', url: 'https://skills.agentprivacy.ai', strand: 'delegation' }, // the skill garden — serves a fedwiki-shaped sitemap + CORS
  { host: 'lattice.myth.garden',       url: 'https://lattice.myth.garden',       strand: 'connection' },
  { host: 'mitch.lattice.myth.garden', url: 'https://mitch.lattice.myth.garden', strand: 'connection' },
  // the City's board (cityofmages/mages-city/DISCOVERY.json · door star-chart→hall): the Hall
  // roster as a remote federation site, so admitted agents seat as stars. The wiki reflects
  // the request Origin on its JSON (verified in the twin). OFF until the host answers —
  // bake with CHART_MAGES_CITY=1 once mages.city is live; the domain is parked today.
  ...(process.env.CHART_MAGES_CITY === '1' ? [{ host: 'wiki.mages.city', url: 'https://wiki.mages.city', strand: 'delegation' }] : []),
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
    axisCanon: 'game42 data/game-of-42.json axis colours AND lattice vertices; six stratum-1 roots of the 64-vertex sovereignty lattice. `latticeAxisVertex` is canon (AXIOMS A1); `seat` is torus placement only -- never compute a vertex from it.',
    seating: 'each federation site is seated on its axis strand (tools/star-chart.mjs LOCAL table); a page that carries a posture item (tools/posture.mjs) seats at its OWN vertex instead — the page field overrides the site strand',
    lineage: 'generalised from the improbable engine lab seating, 2026-08-18; page-level posture 2026-09-05 (PLAN_KNOWLEDGE_GRAPH_TO_VTA Phase 0)',
  },
  strands: [
    { id: 'protection', seat: 0, latticeAxisVertex: 32, lab: 'The Gates', steward: 'the Swordsman ⚔️',
      theme: 'the boundary layer — trust graphs, zero-knowledge predicates, the KYRA checkpoint, the research spine',
      axis: 'protection', force: 'Protect ⚔️', hue: '#E0A526',
      why: 'dtg · research · kyra — where the right to act is earned' },
    { id: 'delegation', seat: 1, latticeAxisVertex: 16, lab: 'The Skills', steward: 'the Mage 🧙',
      theme: 'the forkable skill library and its mouse rendering — what the agents carry',
      axis: 'delegation', force: 'Project 🧙', hue: '#2563EB',
      why: 'skill · mouse — agency over the tools' },
    { id: 'compute', seat: 2, latticeAxisVertex: 2, lab: 'The Harness', steward: 'soulbae 🧙 ⊥ soulbis ⚔️',
      theme: 'the dual-agent loop and the game engine — a validated result proposes an edge, only a signature mints it',
      axis: 'compute', force: null, hue: '#7C5CFF',
      why: 'harness · game42 — the loop that proves before it mints' },
    { id: 'memory', seat: 3, latticeAxisVertex: 8, lab: 'The Canon', steward: 'the Archivist 📚',
      theme: 'the knowledge graph and the spellbooks — the archive that carries lineage',
      axis: 'memory', force: 'Reflect 🪞', hue: '#E0568A',
      why: 'atlas · spellbooks — indexes and archives are continuity' },
    { id: 'connection', seat: 4, latticeAxisVertex: 4, lab: 'The Federation', steward: 'the guide 🏛',
      theme: 'the forkable wiki commons — every site a sister, the hearth that feeds the lattice',
      axis: 'connection', force: 'Connect 🤝', hue: '#14B8A6',
      why: 'guide · tomes · grimoire · fieldguide · engine — federation is literally the network axis' },
    { id: 'value', seat: 5, latticeAxisVertex: 1, lab: 'The Agreements', steward: 'the City of Mages 🏛',
      theme: 'the agreement and value layer — MyTerms, the Lexon grammar, the City’s economy',
      axis: 'value', force: null, hue: '#2FB67C',
      why: 'city · lexon · myterms — value lives on the path' },
  ],
};

// ---- bake one site's sitemap (slug · title · date · links · posture) --------
// A page carrying a 'posture' item gains `vertex` (0-63) + `posture` (its six
// bits, d1..d6) in the sitemap; the engine seats such a star at its own vertex.
// `forkedFrom` names the chart id (never a dev host) the page was forked from,
// when the journal says so — the later per-page record resolves its prior vertex.
const DIR2ID = Object.fromEntries(LOCAL.map(s => [s.dir, s.id]));
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
    const rec = { slug, title: page.title || slug, date: page.journal?.slice(-1)[0]?.date || 0, links };
    const posture = readPostureItem(page);
    if (posture) { rec.vertex = posture.vertex; rec.posture = posture.bits; if (posture.by) rec.by = posture.by; }
    const fork = (Array.isArray(page.journal) ? page.journal : []).find(j => j.type === 'fork' && j.site);
    if (fork) {
      const host = String(fork.site).replace(/:\d+$/, '').toLowerCase();
      // no dev-host names leave the farm: a charted farm host becomes its chart id;
      // a public federation host stays; localhost / .local / bare IPs are dropped
      const isDev = /(^|\.)localhost$|\.local$|^\d+\.\d+\.\d+\.\d+$|^[a-z0-9-]+$/.test(host);
      const from = DIR2ID[host] || (isDev ? null : host);
      if (from && from !== site.id) rec.forkedFrom = from;
    }
    map.push(rec);
  }
  return map;
}

// ---- Phase 0 · the per-page record the later PSI commits to -----------------
// One row per baked page: { site, slug, vertex, postured, posture, sorted_links,
// element, forkedFrom, priorVertex }. `vertex` is the posture when the page has
// one, else the site strand's axis vertex (the default seating, made explicit).
// `element` = sha256("<vertex>|<slug>|<sorted_links joined by ,>") — the PSI
// element is never a bare vertex (plan §7: 64 values are brute-forceable), and
// it is derived HERE so a human's walk and an agent's walk commit to the same
// bytes. agentprivacy-mcp re-derives it with the same rule.
const STRAND_VERTEX = Object.fromEntries(GUIDE_LABS.strands.map(s => [s.id, s.latticeAxisVertex]));
export const elementOf = (vertex, slug, sortedLinks) =>
  'sha256:' + crypto.createHash('sha256').update(`${vertex}|${slug}|${sortedLinks.join(',')}`).digest('hex');
function pageRecords(baked) {
  const bySiteSlug = new Map();
  for (const { site, map } of baked) for (const pg of map) bySiteSlug.set(site.id + '/' + pg.slug, pg);
  const rows = [];
  for (const { site, map } of baked) for (const pg of map) {
    const postured = pg.vertex != null;
    const vertex = postured ? pg.vertex : (STRAND_VERTEX[site.strand] ?? 4);
    const sorted_links = Object.keys(pg.links || {}).sort();
    const row = { site: site.id, slug: pg.slug, vertex, postured, posture: pg.posture || null, sorted_links,
      element: elementOf(vertex, pg.slug, sorted_links) };
    if (pg.forkedFrom) {
      row.forkedFrom = pg.forkedFrom;
      const src = bySiteSlug.get(pg.forkedFrom + '/' + pg.slug);
      if (src && src.vertex != null) row.priorVertex = src.vertex;   // prior_vertex_if_forked (when the source is charted + postured)
    }
    rows.push(row);
  }
  return rows;
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

// ---- D4 · the constellation read as a walk shape ----------------------------
// mages_city/docs/TRUST_TASK_CONSTELLATION.md. A saved constellation is a
// DISPLAY object (it carries titles and a timestamp); D4 is the disclosure tier
// an unknown peer may hold — the walk shape and its digest, no page bodies.
//
// The digest and the move labels below are byte-identical to the MCP's
// (agentprivacy-mcp lib/key.mjs walkDigest over lib/kappa.mjs canonicalJSON, and
// lib/lattice.mjs moveName/moveLabel), so a walk presented here and the same walk
// folded by key_evolve agree on their digest. Do not "improve" either copy alone.
//
// Nothing here sends anything anywhere: the panel is local and the copy is manual.
const D4_JS = `
const D4DIMS = [['protection',32],['delegation',16],['memory',8],['connection',4],['computation',2],['value',1]];
var D4bake = null, D4rows = null;
function d4Canon(v){
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(d4Canon).join(',') + ']';
  return '{' + Object.keys(v).sort().map(function(k){ return JSON.stringify(k) + ':' + d4Canon(v[k]); }).join(',') + '}';
}
async function d4Sha(s){
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return 'sha256:' + Array.from(new Uint8Array(b)).map(function(x){ return x.toString(16).padStart(2,'0'); }).join('');
}
// mirrors moveName's order exactly: stay, then the three named ops, then flip, then jump
function d4Move(a,b){
  if (a === b) return 'stay';
  if (b === ((a + 1) & 63)) return 'succ';
  if (b === ((64 - a) & 63)) return 'neg';
  if (b === (63 - a)) return 'bnot';
  var x = a ^ b, f = D4DIMS.filter(function(d){ return x & d[1]; }).map(function(d){ return d[0]; });
  if (f.length === 1) return 'flip ' + f[0];
  return 'jump ×' + f.length + ' (' + f.join(' ') + ')';
}
async function d4Load(){
  if (D4rows) return;
  const response = await fetch('data/pages.json');
  if (!response.ok) throw Error('Chart data is unavailable. Please try again.');
  const j = await response.json();
  D4bake = { kind: j.kind, baked: j.baked, count: j.count };
  D4rows = new Map(j.pages.map(function(p){ return [p.site + '/' + p.slug, p]; }));
}
async function d4Build(pts){
  await d4Load();
  var steps = [], missing = [];
  pts.forEach(function(p){
    var row = D4rows.get(p.host + '/' + p.slug);
    if (!row) { missing.push(p.host + '/' + p.slug); return; }
    steps.push({ site: row.site, slug: row.slug, vertex: row.vertex, element: row.element });
  });
  var moves = steps.slice(1).map(function(s,i){ return d4Move(steps[i].vertex, s.vertex); });
  return { chart: location.origin + location.pathname, steps: steps, moves: moves,
           digest: await d4Sha(d4Canon(steps)), bake: D4bake, missing: missing };
}
function d4Panel(w){
  function esc(s){ return String(s).replace(/[&<>]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]; }); }
  var el = document.getElementById('d4panel');
  if (!el) { el = document.createElement('div'); el.id = 'd4panel'; document.body.appendChild(el); }
  el.setAttribute('style','position:fixed;right:14px;bottom:14px;width:min(560px,92vw);max-height:70vh;overflow:auto;'
    + 'background:rgba(8,10,18,.96);border:1px solid #2b3350;border-radius:10px;padding:13px 15px;z-index:9999;'
    + 'font:12px/1.55 ui-monospace,SFMono-Regular,Consolas,monospace;color:#cfd8ee;box-shadow:0 8px 40px rgba(0,0,0,.6)');
  var rows = w.steps.map(function(s,i){
    return '<div style="margin:7px 0">' + String(i+1).padStart(2,'0') + ' · <b style="color:#e8eefc">' + esc(s.site) + '/' + esc(s.slug)
      + '</b> · V' + s.vertex + '<div style="opacity:.5;word-break:break-all">' + esc(s.element) + '</div>'
      + (i < w.moves.length ? '<div style="color:#8fd0a8">↓ ' + esc(w.moves[i]) + '</div>' : '') + '</div>';
  }).join('');
  el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px">'
    + '<b style="color:#e8eefc">✧ D4 · the walk shape</b>'
    + '<span><button id="d4copy">copy</button> <button id="d4close">close</button></span></div>'
    + '<div style="opacity:.7;margin:6px 0 4px">No titles, no page bodies — the address tier. A peer holding this '
    + 'receives no page bodies here; source addresses may still resolve elsewhere.</div>'
    + '<div style="opacity:.55;margin-bottom:8px">' + w.steps.length + ' steps · walked on the bake of '
    + (w.bake ? esc(w.bake.baked) + ' (' + esc(w.bake.count.pages) + ' pages, ' + esc(w.bake.count.postured) + ' postured)' : 'unknown') + '</div>'
    + rows
    + '<div style="margin-top:10px;padding-top:8px;border-top:1px solid #2b3350;word-break:break-all">digest <b style="color:#e8eefc">'
    + esc(w.digest) + '</b></div>'
    + (w.missing.length ? '<div style="color:#e0a35c;margin-top:6px">not on this bake, omitted: ' + esc(w.missing.join(', ')) + '</div>' : '');
  document.getElementById('d4close').onclick = function(){ el.remove(); };
  document.getElementById('d4copy').onclick = function(){
    navigator.clipboard.writeText(JSON.stringify({ chart:w.chart, steps:w.steps, moves:w.moves, digest:w.digest, bake:w.bake }, null, 2)).then(function(){ document.getElementById('d4copy').textContent = 'copied'; }, function(){ document.getElementById('d4copy').textContent = 'copy unavailable'; });
  };
}
document.getElementById('cD4').onclick = async function(){
  if (!trail.pts.length) return;
  const button = document.getElementById('cD4');
  button.disabled = true;
  try { d4Panel(await d4Build(trail.pts)); }
  catch (error) { button.textContent = 'retry present'; button.title = 'Could not read the chart data. Try again.'; }
  finally { button.disabled = false; }
};
`;

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
  <article>The federation of the guide, redisplayed: every site's pages seated as
  stars on the 64-vertex sovereignty lattice, six strands winding the torus, links woven from the
  sitemaps at build time. A baked snapshot of the fedwiki space — the same improbable engine that
  runs live on the local farm. Each strand winds the torus by its axis bit — protection, bit 0,
  is the equator; value, bit 5, threads the hole five times. Stars seat by their universal
  reference (the slug, never the host — a fork lands beside its original) and lift with their
  weave: the more links, the higher a page rides. The five crystals ringing the hearth are the
  axes' bit-flip bonds on the 64-vertex board. Click a strand to isolate it · click a page-star
  to walk it · shift+click opens the page here · ◌ focus clears the instruments · 📷 keepsake
  saves the view with a City Key inside. A page that carries a <b>posture</b> — its six-bit
  stance, written on the page itself — seats at its own vertex instead of its site's strand,
  and walking between two such stars names the lattice move: succ, neg, bnot, a single flip,
  or a jump flagged as such.</article>`],

  ['  @media (max-width:760px){ #legend{ width:210px } #controls{ width:190px } footer{ display:none } }',
   `  /* gradient text is clipped to the glyph box: the source's 0.95 line-height
     crops descenders (the g's tail) — give the h1 room to breathe */
  header.top h1{ line-height:1.12; padding-bottom:4px; }
  header.top a.back{ color:var(--dim); pointer-events:auto; text-decoration:none; }
  header.top a.back:hover{ color:var(--ink); }
  header.top article{ max-width:560px; margin-top:8px; font-size:10.5px; line-height:1.55; color:var(--dim); display:none; }
  header.top article.open{ display:block; }
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
  /* run card — the walked page's information box rises as the circuit crosses it */
  #runCard{ position:fixed; z-index:8; left:50%; bottom:84px; transform:translate(-50%, 16px);
    max-width:300px; pointer-events:none; opacity:0; transition:opacity .35s ease, transform .35s ease;
    background:var(--glass); border:1px solid rgba(255,210,122,0.45); border-radius:10px; padding:9px 13px;
    font-size:11px; line-height:1.5; backdrop-filter:blur(9px); text-align:center; }
  #runCard.show{ opacity:1; transform:translate(-50%, 0); }
  #runCard b{ color:#ffe9c4; font-weight:500; }
  #runCard .m{ color:var(--dim); font-size:9px; }
  body.zen header.top, body.zen .panel, body.zen footer, body.zen #tip, body.zen #runCard{ display:none !important; }
  body.zen #zenbar{ opacity:0.3; }
  body.zen #zenbar:hover{ opacity:1; }
  /* mobile: the three glass panels collide on a phone — legend becomes a bottom
     chip-rail, controls tuck above it, the tracer HUD steps aside */
  /* mobile: the panels no longer float — the rail and drawer place them (the
     engine's own media query handles that). What is left here is the page
     furniture around the canvas, plus keeping the chips readable in a narrow
     drawer, where they stack rather than becoming a horizontal rail. */
  @media (max-width:760px){
    footer{ display:none }
    header.top{ padding:52px 16px 0 16px }   /* the glyph bar owns the top-right */
    h1{ font-size:clamp(20px,6vw,30px) }
    #status{ font-size:9px }
    /* the zenbar keeps its desktop seat at the bottom: the legend no longer
       floats there, and the top-right belongs to the glyph bar */
    .chip{ padding:5px 7px }
  }`],

  // the public chart is compose-only: no control lane, so no localhost probe
  ["  control: 'http://127.0.0.1:3130',",
   "  control: '',   // baked: compose-only, never probes a visitor's loopback"],

  ['const state = { fold:0, drift:!REDUCED, iso:null, sites:new Set(), strands:true, grid:true, pages:true, links:true, crystals:true };',
   `const state = { fold:0, drift:!REDUCED, iso:null, sites:new Set(), strands:true, grid:true, pages:true, links:true, crystals:true };
const HOSTPATH = ${JSON.stringify(HOSTPATH)}; // site id → snapshot subpath (baked by tools/star-chart.mjs)
const SITESTRAND = ${JSON.stringify(SITESTRAND)}; // ?site= deep link → strand to isolate
// ===== Phase 0 · the lattice on the chart (PLAN_KNOWLEDGE_GRAPH_TO_VTA) =====
// A postured star carries its vertex; the move between two postured stars is
// named: the three lattice operators first, then a single flip (a ∂M edge),
// otherwise a multi-bit jump, flagged as such with the dimensions that changed.
const LX = { succ:x=>(x+1)&63, neg:x=>(64-x)&63, bnot:x=>63-x };
const DIMNAMES = ['protection','delegation','memory','connection','computation','value']; // d1..d6 = bit 5..0
const vbits = x => x.toString(2).padStart(6,'0');
function moveName(a,b){ if(a==null||b==null) return null; if(a===b) return 'stay';
  const x=a^b, fl=DIMNAMES.filter((_,i)=>x&(32>>i));
  if(b===LX.succ(a)) return 'succ 😊'; if(b===LX.neg(a)) return 'neg ⚔️'; if(b===LX.bnot(a)) return 'bnot 🧙';
  return fl.length===1 ? 'flip '+fl[0] : 'jump ×'+fl.length+' ('+fl.join(' ')+')'; }
function lastMove(){ const n=trail.pts.length; return n<2 ? null : moveName(trail.pts[n-2].vertex, trail.pts[n-1].vertex); }
function postureTip(d){ if(d.vertex==null) return '';
  const last = trail.pts.length ? trail.pts[trail.pts.length-1] : null;
  const mv = (last && last!==d) ? moveName(last.vertex, d.vertex) : null;
  return '<br><span class="m">V'+d.vertex+' '+vbits(d.vertex)+(mv?' · from V'+last.vertex+': <b>'+mv+'</b>':'')+'</span>'; }`],

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

  // glow — the additive bloom on the page-stars, toggleable like drift
  ['    <button id="tDrift" class="on">drift</button>',
   '    <button id="tDrift" class="on">drift</button>\n    <button id="tGlow" class="on">glow</button>'],

  ["document.getElementById('tDrift').onclick = e=>{ state.drift=!state.drift; e.target.classList.toggle('on', state.drift); };",
   `document.getElementById('tDrift').onclick = e=>{ state.drift=!state.drift; e.target.classList.toggle('on', state.drift); };
if(state.glow === undefined) state.glow = true;
document.getElementById('tGlow').classList.toggle('on', state.glow);
document.getElementById('tGlow').onclick = e=>{ state.glow=!state.glow; e.target.classList.toggle('on', state.glow); applyGlow(); };
function applyGlow(){
  const mode = state.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
  for(const spr of DATA.stars){ spr.material.blending = mode; spr.material.needsUpdate = true; }
  if(typeof runner !== 'undefined' && runner && runner.spr){ runner.spr.material.blending = mode; runner.spr.material.needsUpdate = true; }
}`],

  // run your path — a light circuit along the walk, flaring the pages it visits
  // ✧ present — the same walk read at D4, the tier an unknown peer may hold
  ['<button id="cSave" title="keep this walk as a named constellation">✦ save</button>',
   '<button id="cRun" title="run your path — a light circuit walks your constellation, flaring each page">▶ run</button>\n    <button id="cSave" title="keep this walk as a named constellation">✦ save</button>\n    <button id="cD4" title="present this walk at D4 — the shape and its digest, no page bodies">✧ present</button>'],

  // the D4 reading of the current walk (see D4_JS above)
  ['function rebuildTrail(){', D4_JS + '\nfunction rebuildTrail(){'],

  ['  pickStars();\n  controls.update();',
   '  runnerTick(dt);\n  pickStars();\n  controls.update();'],

  // focus mode + keepsake — clear the instruments / keep the image (City Key inside)
  ['<div id="tip"></div>',
   `<div id="tip"></div>
<div id="runCard"></div>
<div id="zenbar">
  <button id="focusBtn" title="hide the instruments — just the shape (Esc exits)">◌ focus</button>
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
    // the 32 bit-flip bonds of this axis: partner = index ^ 2^(seat mod 3).
    // 'seat' is TORUS SEATING ONLY -- it is not the lattice bit. The lattice value
    // is 'latticeAxisVertex' (game42 AXIOMS A1: protection 32 ... value 1).
    // (quotes, not backticks: this comment lives inside a template literal)
    const stride = 1 << (s.seat % 3), onU = s.seat < 3;
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

  // Phase 0 · posture seating: a page that carries a posture sits AT ITS VERTEX
  // GEM (the 8×8 codex: low 3 bits → u, high 3 bits → v — the gem's own seat),
  // jittered around it by its slug so siblings fan out rather than stack. A page
  // with no posture keeps its site-strand seat. Seating reads the posture; height
  // still reads the weave.
  ['  const [u0,v0] = strandUV(s, t);',
   '  const [u0,v0] = (pg.vertex!=null) ? [ (pg.vertex&7)/8*TAU, (pg.vertex>>3)/8*TAU ] : strandUV(s, t); // posture overrides strand'],
  ['    date:pg.date, strand:s.id,',
   '    date:pg.date, strand:s.id, vertex:(pg.vertex==null?null:pg.vertex), posture:pg.posture||null,'],

  // the hover tip names the vertex, and the lattice move from the last walked star
  ["      tip.innerHTML = `<b>${d.title}</b><br><span class=\"m\">${d.host} · ${s.lab}${age!==null?' · edited '+(age===0?'today':age+'d ago'):''}</span>`;",
   "      tip.innerHTML = `<b>${d.title}</b><br><span class=\"m\">${d.host} · ${s.lab}${age!==null?' · edited '+(age===0?'today':age+'d ago'):''}</span>` + postureTip(d);"],

  // the walk HUD names the move just made
  ["    ? trail.steps + ' page' + (trail.steps>1?'s':'') + ' walked · the dance, not the stance'",
   "    ? trail.steps + ' page' + (trail.steps>1?'s':'') + ' walked · ' + (lastMove() || 'the dance, not the stance')"],

  // strand isolation reads the posture: a postured star belongs to every strand
  // whose axis bit it carries; an unpostured star belongs to its site strand.
  ['    const on = (!state.iso || d.strand===state.iso)',
   '    const on = (!state.iso || (d.vertex!=null ? !!(d.vertex & ((DATA.byId[state.iso]||{}).latticeAxisVertex||0)) : d.strand===state.iso))'],

  // a pathway step carries its vertex — the element the PSI later commits to is derived from it
  [': trail.pts.map(d => ({ site: hnorm(d.host), slug: d.slug, title: d.title, strand: d.strand }))),',
   ': trail.pts.map(d => ({ site: hnorm(d.host), slug: d.slug, title: d.title, strand: d.strand, vertex: d.vertex }))),'],

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
// Superseded by the rail + drawer (the engine relocates every panel into one
// popout at boot). This block runs AFTER that relocation, so it must not
// re-attach the fold buttons or reapply a stored 'min' — a folded panel inside
// the drawer would render as an empty section. Kept, guarded, for any panel the
// drawer did not claim, and for charts built before the drawer existed.
const PKEY = 'chart-panels';
const pstate = (() => { try{ return JSON.parse(localStorage.getItem(PKEY)) || {}; }catch{ return {}; } })();
const psave = () => localStorage.setItem(PKEY, JSON.stringify(pstate));
const inDrawer = el => !!(el && el.closest && el.closest('#drawer'));
// The header no longer carries an about button — 📜 in the glyph bar opens the
// same text, and a second control under the title was one too many.
for(const [id, emo, name] of [['legend','🧵','the strands'], ['controls','🎛️','the instrument'], ['tracer','👣','the walk']]){
  const p = document.getElementById(id);
  if(!p || inDrawer(p)) continue;                 // the drawer owns it now
  p.classList.remove('min');
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
  if(!runner.on) runCardHide();
};
function flareStar(d){
  const spr = DATA.stars.find(s => s.userData === d);
  if(spr) runner.flares.push({ spr, life: 1 });
}
// the run card — as the circuit crosses a page-star, its information box rises
const runCard = document.getElementById('runCard');
var runCardTimer = null;
function runCardShow(d){
  if(!runCard || !d) return;
  const s = DATA.byId[d.strand];
  runCard.innerHTML = '<b>' + d.title + '</b><br><span class="m">' + d.host + (s ? ' · ' + s.lab : '') + '</span>';
  runCard.classList.remove('show');
  void runCard.offsetWidth;                 // restart the rise for every star
  runCard.classList.add('show');
  clearTimeout(runCardTimer);
  runCardTimer = setTimeout(() => runCard.classList.remove('show'), 2600);
}
function runCardHide(){ clearTimeout(runCardTimer); if(runCard) runCard.classList.remove('show'); }
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
    runCardShow(trail.pts[i]);
    if(i === segs.length - 1){ flareStar(trail.pts[i + 1]); runCardShow(trail.pts[i + 1]); }
  }
}

// ===== focus mode — clear the instruments, keep the shape =====
const setZen = on => document.body.classList.toggle('zen', on);
document.getElementById('focusBtn').onclick = () => setZen(!document.body.classList.contains('zen'));
// No single-letter shortcut. It used to be 'f', and it fired from inside the
// pathway search box — typing the letter blanked the screen. The ◌ focus button
// is the only way in; Escape still leaves, guarded so it does not fire while
// someone is typing (typingInField is defined with the drawer).
addEventListener('keydown', e => {
  if(e.key === 'Escape' && !typingInField(e)) setZen(false);
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

// Explicit local reading selection; no key mutation or proof claim.
window.addEventListener('guide-star-capture-path',()=>window.dispatchEvent(new CustomEvent('guide-star-chart-path',{detail:trail.pts.map(d=>({site:d.host,slug:d.slug}))})));

window.addEventListener('guide-star-show-path',e=>{if(!Array.isArray(e.detail)||e.detail.length>128)return;const pts=e.detail.map(p=>DATA.stars.find(s=>s.userData.host===p.site&&s.userData.slug===p.slug)?.userData);if(pts.some(p=>!p))return;trail.pts=pts;trail.steps=pts.length;trail.value=pts.reduce((v,p)=>v+1+p.lift*4,0);if(!pts.length)trail.line.geometry.setFromPoints([]);else rebuildTrail();tHud();});
document.getElementById('snapBtn').onclick = () => {
  renderer.render(scene, camera); // fresh buffer in the same task — no preserveDrawingBuffer needed
  const meta = {
    key: 'city-key', chart: 'privacy guide star chart',
    origin: 'https://guide.agentprivacy.ai/star-chart/',
    exported: new Date().toISOString(),
    sites: new Set(DATA.stars.map(s => s.userData.host)).size,
    pages: DATA.stars.length, links: DATA.links.length,
    strand: state.iso || 'all', fold: Number(state.fold.toFixed(3)),
    walk: trail.pts.map(d => ({ site: d.host, slug: d.slug, vertex: d.vertex })), T: Number(trail.value.toFixed(1)),
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

let sites = 0, pages = 0, postured = 0;
const manifest = [], baked = [];
for (const site of LOCAL) {
  const map = bakeSitemap(site);
  if (!map || !map.length) { console.log(`  · ${site.id}: no pages — skipped`); continue; }
  const dir = path.join(OUT, 'data', 'sitemaps', site.id, 'system');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'sitemap.json'), JSON.stringify(map));
  manifest.push({ host: site.id, strand: site.strand });
  baked.push({ site, map });
  sites++; pages += map.length; postured += map.filter(p => p.vertex != null).length;
}
// the per-page record (Phase 0) — what an agent reads, what a PSI commits to
const records = pageRecords(baked);
fs.writeFileSync(path.join(OUT, 'data', 'pages.json'), JSON.stringify({
  kind: 'guide.pages/1',
  note: 'One row per baked page. vertex = the page posture when it carries one (postured:true), else the site strand axis vertex. '
    + 'element = sha256("<vertex>|<slug>|<sorted_links joined by ,>") — the PSI element; never a bare vertex. '
    + 'priorVertex = the vertex of the page this one was forked from, when that source is charted and postured. '
    + 'Bit canon d1 protection=32 · d2 delegation=16 · d3 memory=8 · d4 connection=4 · d5 computation=2 · d6 value=1.',
  baked: new Date().toISOString(),
  count: { sites, pages, postured, vertices: new Set(records.filter(r => r.postured).map(r => r.vertex)).size },
  pages: records,
}, null, 0));
fs.writeFileSync(path.join(OUT, 'data', 'wiki-sites.json'), JSON.stringify({
  note: 'BAKED — generated by tools/star-chart.mjs from the local farm at snapshot time. ' +
    'Hosts are the static snapshot\'s site ids; each sitemap lives at data/sitemaps/<id>/system/sitemap.json. ' +
    'A sitemap row may carry vertex (0-63) + posture (six bits, d1..d6) from the page\'s posture item, and forkedFrom (a chart id). ' +
    'Remote sites with a url are still read live.',
  // seat EVERY page — the live engine's 24-per-site cap is for reading a farm
  // live; the baked chart charts the whole universe.
  pagesPerSite: 100000,
  sites: [...manifest, ...REMOTE],
}, null, 1));

// ---- VPKB: the pathway lane -------------------------------------------------
// The chart's constellations double as bounded-disclosure primitives (see
// ~/.claude/plans/vpkb-pathway-grants.md). Two things ride along:
//
//   sites.json  — the id↔farm-host table lives on the farm and is refreshed FROM
//                 this file, so the two can never drift. It is written to the
//                 farm, never into site/ — no dev-host names in the public page.
//   data/vpkb/  — the search core and the lexical index, so the public chart can
//                 SUGGEST pathways in the browser with no server at all. Vectors
//                 are deliberately not baked: they are large and the lexical
//                 floor is what makes the static page work everywhere.
const VPKB = path.join(os.homedir(), 'vpk', 'pathways');   // code
const VPKB_INDEX = path.join(WIKI, '.vpk', 'index');       // machine-local state
if (fs.existsSync(VPKB)) {
  // refresh the farm's site table from LOCAL — anti-drift, one direction only
  const sitesFile = path.join(VPKB, 'sites.json');
  if (fs.existsSync(sitesFile) && !process.argv.includes('--skip-vpk-site-sync')) {
    const doc = JSON.parse(fs.readFileSync(sitesFile, 'utf8'));
    const known = new Map(doc.sites.map(s => [s.host, s]));
    for (const s of LOCAL) {
      const row = known.get(s.dir);
      if (row) Object.assign(row, { id: s.id, sub: s.sub, strand: s.strand, charted: true });
      else doc.sites.push({ id: s.id, host: s.dir, sub: s.sub, strand: s.strand, charted: true });
    }
    for (const [host, row] of known) if (!LOCAL.some(s => s.dir === host)) row.charted = false;
    fs.writeFileSync(sitesFile, JSON.stringify(doc, null, 1));
  }

  const idxSrc = VPKB_INDEX;
  const vout = path.join(OUT, 'data', 'vpkb');
  fs.mkdirSync(path.join(vout, 'index'), { recursive: true });
  fs.copyFileSync(path.join(VPKB, 'search.js'), path.join(vout, 'search.js'));
  const manifest = [];
  let deepBytes = 0;
  if (fs.existsSync(idxSrc)) {
    for (const s of LOCAL) {
      const f = path.join(idxSrc, s.id + '.json');
      if (!fs.existsSync(f)) continue;
      fs.copyFileSync(f, path.join(vout, 'index', s.id + '.json'));
      const ix = JSON.parse(fs.readFileSync(f, 'utf8'));
      const row = { site: ix.site, strand: ix.strand, pages: ix.N, built: ix.built };
      // the dense index rides along when it exists — the page fetches it only if
      // someone turns deep search on, so it costs nothing to a normal visit
      const df = path.join(idxSrc, s.id + '.deep.json');
      if (fs.existsSync(df)) {
        fs.copyFileSync(df, path.join(vout, 'index', s.id + '.deep.json'));
        deepBytes += fs.statSync(df).size;
        row.deep = true;
      }
      manifest.push(row);
    }
  }
  fs.writeFileSync(path.join(vout, 'index', 'manifest.json'), JSON.stringify({
    note: 'Lexical BM25 index over the local knowledge-base fedwiki, baked for in-browser pathway '
      + 'suggestion. Built by ~/.wiki/vpkb/index.js; the same file the CLI and the live chart read.',
    sites: manifest,
  }, null, 1));
  const kb = manifest.length
    ? Math.round(manifest.reduce((a, m) => a + fs.statSync(path.join(vout, 'index', m.site + '.json')).size, 0) / 1024)
    : 0;
  const dmb = Math.round(deepBytes / 1024 / 102.4) / 10;
  console.log(`✓ vpkb baked → data/vpkb/ — search core + ${manifest.length} site indexes `
    + `(${manifest.reduce((a, m) => a + m.pages, 0)} pages, ${kb}KB) · pathways suggest in-browser`
    + (deepBytes ? `
  + deep index ${dmb}MB (${manifest.filter(m => m.deep).length} sites) — fetched only when deep search is turned on` : ''));
} else {
  console.log('· vpkb lane not installed on this farm — chart bakes without pathway suggestion');
}

console.log(`✓ star chart baked → site/star-chart/ — ${sites} local sites · ${pages} pages in the sitemaps · +${REMOTE.length} remote live`
  + `\n  · posture: ${postured} pages seat at their own vertex (data/pages.json carries the per-page record for all ${records.length})`);

installStarConnect(path.join(ROOT,'site'));
