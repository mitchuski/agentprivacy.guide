#!/usr/bin/env node
// tools/posture.mjs — the keeper's posture CLI (Phase 0 of
// agentprivacy_master/docs/PLAN_KNOWLEDGE_GRAPH_TO_VTA_2026-09-03.md).
//
// A page's POSTURE is the 6-bit lattice vertex it advances: which of the six
// sovereignty dimensions the page is about. It lives ON THE PAGE as a fedwiki
// story item of type 'posture' (key: value lines, like tileglyph / starpath), so
// a fork carries it and the star-chart bake reads it. Site strand remains the
// default seating for a page that carries no posture; the page field overrides.
//
//   node tools/posture.mjs list    [site]                 pages and their postures
//   node tools/posture.mjs suggest <site> [--limit=N]     keyword rule v0 -> suggested postures (no write)
//   node tools/posture.mjs set     <site> <slug> <posture> [--by=who]   write/replace the item
//   node tools/posture.mjs unset   <site> <slug>          remove the item (reversible seed)
//   node tools/posture.mjs seed    <site> [--write] [--only-missing]   apply the suggestions, marked suggested
//   node tools/posture.mjs audit                          across every charted site: coverage + vertex spread
//
// <posture> = "101100" | "protection memory" | "d1 d3" | "V36" | 36
// <site>    = chart id (guide, atlas, ...) or farm host (guide.localhost)
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { DIMS, bits, popcount, parsePosture, readPostureItem, postureText } from './lattice.mjs';

const WIKI = path.join(os.homedir(), '.wiki');
// the chart's site table lives in star-chart.mjs (LOCAL); mirrored id->host here
// from the farm's own vpkb sites.json when present, else by the .localhost rule.
function resolveSite(s) {
  if (!s) return null;
  if (fs.existsSync(path.join(WIKI, s, 'pages'))) return s;
  const sf = path.join(os.homedir(), 'vpk', 'pathways', 'sites.json');
  if (fs.existsSync(sf)) {
    const row = JSON.parse(fs.readFileSync(sf, 'utf8')).sites.find(x => x.id === s);
    if (row && fs.existsSync(path.join(WIKI, row.host, 'pages'))) return row.host;
  }
  if (fs.existsSync(path.join(WIKI, s + '.localhost', 'pages'))) return s + '.localhost';
  return null;
}
const chartedSites = () => {
  const sf = path.join(os.homedir(), 'vpk', 'pathways', 'sites.json');
  if (fs.existsSync(sf)) return JSON.parse(fs.readFileSync(sf, 'utf8')).sites.filter(x => x.charted !== false).map(x => x.host);
  return fs.readdirSync(WIKI).filter(d => d.endsWith('.localhost') && fs.existsSync(path.join(WIKI, d, 'pages')));
};
const readPage = (host, slug) => { try { return JSON.parse(fs.readFileSync(path.join(WIKI, host, 'pages', slug), 'utf8')); } catch { return null; } };
const writePage = (host, slug, page) => fs.writeFileSync(path.join(WIKI, host, 'pages', slug), JSON.stringify(page, null, 2), 'utf8');
const newId = () => crypto.randomBytes(8).toString('hex');
const pageText = page => (page.story || []).map(it => it.text || '').join('\n');

// ---- keyword rule v0 — a transparent, replaceable suggestion ------------------
// Each dimension has a small lexicon; a hit is a whole-word match in title+text.
// A bit is set when its score reaches 35% of the strongest dimension's score
// (and at least 2 hits), capped at 3 dimensions so a page keeps a stance rather
// than lighting the whole lattice. A page with no hits falls back to its site
// strand (the bake's default anyway) and is reported, not written.
const LEX = {
  protection:  ['privacy','private','protect','protection','gate','gates','guard','boundary','secret','cloak','shield','zk','zero-knowledge','proof','proofs','ceremony','swordsman','disclosure','consent','encrypt','encryption','attack','threat','sovereign','sovereignty'],
  delegation:  ['agent','agents','delegate','delegation','skill','skills','persona','personas','mage','spellbook','onboarding','deploy','deployment','character','familiar','assistant','llm','model','prompt'],
  memory:      ['reference','archive','note','notes','log','journal','chronicle','record','records','index','codex','tome','tomes','history','lineage','memory','remember','canon','library'],
  connection:  ['federation','federated','wiki','fork','forks','forkable','link','links','network','contribute','contributing','api','map','community','peer','peers','neighbour','neighbor','sister','share','sharing','hub'],
  computation: ['build','builds','implementation','roadmap','setup','runtime','render','rendering','engine','harness','architecture','config','configuration','code','compile','pipeline','script','server','system','tooling','visual'],
  value:       ['value','mana','credential','credentials','vrc','terms','agreement','agreements','economy','trust','worth','reward','achievement','achievements','capital','compliance','token','key'],
};
export function suggestVertex(page) {
  const text = (String(page.title || '') + '\n' + pageText(page)).toLowerCase();
  const words = text.match(/[a-z][a-z0-9-]+/g) || [];
  const freq = new Map(); for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  const score = {};
  for (const d of DIMS) score[d.id] = LEX[d.id].reduce((a, k) => a + (freq.get(k) || 0), 0);
  const top = Math.max(...Object.values(score));
  if (top < 2) return { vertex: null, score, reason: 'no lexicon hits' };
  const chosen = DIMS.map(d => d.id).filter(id => score[id] >= 2 && score[id] >= 0.35 * top)
    .sort((a, b) => score[b] - score[a]).slice(0, 3);
  let v = 0; for (const id of chosen) v |= DIMS.find(d => d.id === id).weight;
  return { vertex: v, score, chosen };
}

// ---- commands -------------------------------------------------------------------
const args = process.argv.slice(2);
const flags = Object.fromEntries(args.filter(a => a.startsWith('--')).map(a => { const [k, v] = a.slice(2).split('='); return [k, v ?? true]; }));
const pos = args.filter(a => !a.startsWith('--'));
const cmd = pos[0];

function setPosture(host, slug, vertex, by) {
  const page = readPage(host, slug); if (!page) throw new Error(`no page ${host}/${slug}`);
  page.story = page.story || []; page.journal = page.journal || [];
  const now = Date.now();
  const existing = page.story.find(it => it.type === 'posture');
  if (existing) {
    existing.text = postureText(vertex, by);
    page.journal.push({ type: 'edit', id: existing.id, item: { ...existing }, date: now });
  } else {
    const item = { type: 'posture', id: newId(), text: postureText(vertex, by) };
    // the posture sits at the TOP of the story, the page's stance stated first
    page.story.unshift(item);
    page.journal.push({ type: 'add', id: item.id, item: { ...item }, date: now });
  }
  writePage(host, slug, page);
  return readPostureItem(page);
}
function unsetPosture(host, slug) {
  const page = readPage(host, slug); if (!page) throw new Error(`no page ${host}/${slug}`);
  const i = (page.story || []).findIndex(it => it.type === 'posture'); if (i < 0) return false;
  const [item] = page.story.splice(i, 1);
  (page.journal = page.journal || []).push({ type: 'remove', id: item.id, date: Date.now() });
  writePage(host, slug, page); return true;
}

if (cmd === 'list') {
  const hosts = pos[1] ? [resolveSite(pos[1])] : chartedSites();
  for (const host of hosts) {
    if (!host) continue;
    const dir = path.join(WIKI, host, 'pages');
    let n = 0, withP = 0;
    for (const slug of fs.readdirSync(dir)) {
      const page = readPage(host, slug); if (!page) continue; n++;
      const p = readPostureItem(page);
      if (p) { withP++; console.log(`${host.padEnd(24)} ${slug.padEnd(60)} V${String(p.vertex).padEnd(2)} ${p.bits} ${p.dims.join('+')}  · ${p.by}`); }
      else if (pos[1]) console.log(`${host.padEnd(24)} ${slug.padEnd(60)} —`);
    }
    console.log(`· ${host}: ${withP}/${n} pages carry a posture`);
  }
} else if (cmd === 'suggest' || cmd === 'seed') {
  const host = resolveSite(pos[1]); if (!host) { console.error('unknown site'); process.exit(1); }
  const write = cmd === 'seed' && flags.write === true;
  const onlyMissing = !!flags['only-missing'];
  const by = typeof flags.by === 'string' ? flags.by : 'suggested (keyword rule v0)';
  const dir = path.join(WIKI, host, 'pages');
  let written = 0, skipped = 0, none = 0;
  const spread = {};
  for (const slug of fs.readdirSync(dir).slice(0, flags.limit ? +flags.limit : Infinity)) {
    const page = readPage(host, slug); if (!page) continue;
    const have = readPostureItem(page);
    if (have && onlyMissing) { skipped++; continue; }
    if (have && have.by && !/suggested/.test(have.by) && cmd === 'seed') { skipped++; continue; } // never overwrite a keeper's ruling
    const s = suggestVertex(page);
    if (s.vertex == null) { none++; console.log(`${slug.padEnd(60)} —  (${s.reason})`); continue; }
    spread[s.vertex] = (spread[s.vertex] || 0) + 1;
    const line = `${slug.padEnd(60)} V${String(s.vertex).padEnd(2)} ${bits(s.vertex)} ${s.chosen.join('+')}`;
    if (write) { setPosture(host, slug, s.vertex, by); written++; console.log(line + '  ✓ written'); }
    else console.log(line + (have ? `  (has V${have.vertex} · ${have.by})` : ''));
  }
  console.log(`· ${host}: ${write ? written + ' written' : 'dry run'} · ${skipped} kept · ${none} without hits · ${Object.keys(spread).length} distinct vertices`);
  if (cmd === 'seed' && !write) console.log('  (add --write to apply)');
} else if (cmd === 'set') {
  const host = resolveSite(pos[1]); const slug = pos[2]; const v = parsePosture(pos.slice(3).join(' '));
  if (!host || !slug || v == null) { console.error('usage: set <site> <slug> <posture>'); process.exit(1); }
  const p = setPosture(host, slug, v, typeof flags.by === 'string' ? flags.by : 'keeper');
  console.log(`✓ ${host}/${slug} → V${p.vertex} ${p.bits} ${p.dims.join('+')} · ${p.by}`);
} else if (cmd === 'unset') {
  const host = resolveSite(pos[1]); const slug = pos[2];
  if (!host || !slug) { console.error('usage: unset <site> <slug>'); process.exit(1); }
  console.log(unsetPosture(host, slug) ? `✓ removed posture from ${host}/${slug}` : `· ${host}/${slug} had no posture`);
} else if (cmd === 'audit') {
  let total = 0, withP = 0; const spread = new Array(64).fill(0), strata = new Array(7).fill(0), bySite = [];
  for (const host of chartedSites()) {
    const dir = path.join(WIKI, host, 'pages'); if (!fs.existsSync(dir)) continue;
    let n = 0, w = 0;
    for (const slug of fs.readdirSync(dir)) { const page = readPage(host, slug); if (!page) continue; n++;
      const p = readPostureItem(page); if (p) { w++; spread[p.vertex]++; strata[popcount(p.vertex)]++; } }
    total += n; withP += w; bySite.push([host, w, n]);
  }
  for (const [h, w, n] of bySite) if (w) console.log(`${h.padEnd(26)} ${String(w).padStart(4)}/${n}`);
  console.log(`· ${withP}/${total} pages carry a posture · vertices used ${spread.filter(Boolean).length}/64 · strata ${strata.map((c, i) => i + ':' + c).join(' ')}`);
} else {
  console.log(fs.readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1, 18).map(l => l.replace(/^\/\/ ?/, '')).join('\n'));
}
