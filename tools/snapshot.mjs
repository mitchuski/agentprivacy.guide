#!/usr/bin/env node
// Static snapshot of the agentprivacy guide FedWiki federation.
// Reads the live, private farm at ~/.wiki and emits a styled, path-based,
// hybrid static site into ./site :
//   - human pages   /<site>/<slug>.html   (agentprivacy x soulbis theme)
//   - data pages    /<site>/<slug>.json   (full page incl. journal -> forkable)
//   - per-site map  /<site>/system/sitemap.json
//   - search index  /search-index.json    (client-side search)
// Read-only by design; live editing/forking-in stays in ~/.wiki (local + tunnel).

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { marked } from 'marked';
import { fileURLToPath } from 'node:url';

const WIKI = path.join(os.homedir(), '.wiki');
// anchor output to the repo root (script is at <repo>/tools/), not cwd
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'site');

// Wiki sites. group:'federation' = the 7-site guide federation; group:'sibling'
// = standalone wiki hosts folded into the snapshot (own single source, linked,
// not re-projected). glyph/color from the live federationmap.
const SITES = [
  { id: 'guide',     label: 'Guide',      glyph: '🧭', color: '#8a6d3b', path: 'guide',      group: 'federation', blurb: 'The front door — the path through the federated agentprivacy canon.' },
  { id: 'spellbooks',label: 'Spellbooks', glyph: '📚', color: '#5b6e9c', path: 'spellbooks', group: 'federation', blurb: 'The First Person Spellbook (“I”) — privacymage’s narrative: Story (Acts I–XXXI) · Zero · Canon · Society · Plurality, + Selene’s poems.',
    groups: [
      { label: '📜 First Person · The Story', re: /^story-/ },
      { label: '🔮 Zero — the Privacymage Grimoire', re: /^zero-/ },
      { label: '📜 Canon', re: /^canon-/ },
      { label: '🏛️ Society — Parallel Society', re: /^society-/ },
      { label: '⿻ Plurality', re: /^plurality-/ },
      { label: '🪶 Poems — Selene’s Spellbook', re: /^poem-/ },
    ] },
  { id: 'grimoire',  label: 'Grimoire',   glyph: '🔮', color: '#7a3b8c', path: 'grimoire',   group: 'federation', blurb: 'The privacymage grimoire (v10.4) as atoms — spells, vertices, incantations, blades, poems.' },
  { id: 'research',  label: 'Research',   glyph: '🧮', color: '#3d7c47', path: 'research',   group: 'federation', blurb: 'The privacy-value model V(π,t) and the conjecture register (C1–C96).' },
  { id: 'atlas',     label: 'Atlas',      glyph: '🌐', color: '#6a5acd', path: 'atlas',      group: 'federation', blurb: 'The knowledge graph — the backbone hyperlinking every site.' },
  { id: 'skill',     label: 'Skill',      glyph: '🗃️', color: '#2a7d8c', path: 'skill',      group: 'federation', blurb: '163 forkable skills — 42 personas + role / privacy-layer / meta.' },
  { id: 'city',      label: 'City of Mages', glyph: '🏛️', color: '#a23a3a', path: 'city', group: 'federation', blurb: 'The City of Mages — the Second Person Spellbook (“you”): the Tomes, its cast, and the City’s structural grimoire.' },
  { id: 'tomes',     label: 'Tomes',      glyph: '📖', color: '#a23a3a', path: 'city/tomes', group: 'federation', nested: 'city', blurb: 'The Second Person Spellbook (“you”) — City of Mages acts I–X (incl. IX the Horizon and X the Hearth) + cast + specs.' },
  { id: 'game42',    label: 'Game of 42', glyph: '🎲', color: '#c98a2a', path: 'game42',         group: 'sibling', blurb: 'The Game of 42 — its own wiki (sibling host).' },
  { id: 'spellbook', label: 'Mouse Spellbook', glyph: '🐭', color: '#6a8c3b', path: 'mouse-spellbook', group: 'sibling', host: 'spellbook', blurb: 'The Mouse Spellbook — a wiki-native agentic directory pathway (the mouse rendering of the First Person Spellbook), walked through in the wiki itself.' },
];
// host = the live .wiki host (defaults to id); path = output subpath in the snapshot.
const hostOf = s => s.host || s.id;
const PATHS = Object.fromEntries(SITES.map(s => [s.id, s.path]));
PATHS.library = 'spellbooks'; PATHS.spellbook = 'mouse-spellbook'; // alias by host id too
const pathOf = id => PATHS[id] || id;
const labelOf = id => id === 'city' ? 'City of Mages' : (SITES.find(s => s.id === id) || SITES.find(s => hostOf(s) === id) || {}).label || id;
const FEDERATION = SITES.filter(s => s.group === 'federation');
const SIBLINGS = SITES.filter(s => s.group === 'sibling');
const SITE_IDS = new Set(SITES.flatMap(s => [s.id, hostOf(s)]));

// Hosted websites → their wiki expansion. The front-door directory: every live
// site you host, linkable, then opened into its wiki (single source each).
const WEBSITES = [
  { name: 'agentprivacy.ai', url: 'https://agentprivacy.ai', desc: 'The canonical site — the model, the city, the tomes.', wikis: ['research', 'tomes', 'grimoire'] },
  { name: 'soulbis.com', url: 'https://soulbis.com', desc: 'The Swordsman layer — /star, /lattice, /sigil, the City-Key loop.', wikis: ['atlas', 'guide'] },
  { name: 'spellweb.ai', url: 'https://spellweb.ai', desc: 'The knowledge-graph app — nodes, edges, the blade forge.', wikis: ['atlas'] },
  { name: '42.agentprivacy.ai', url: 'https://42.agentprivacy.ai', desc: 'The Game of 42 — the visualization engine.', wikis: ['game42'] },
  { name: "Swordsman's Key (star)", url: 'https://github.com/mitchuski/star', desc: 'The first holospace — landing → portal, City Keys.', wikis: ['atlas'] },
  { name: 'myTerms + extensions', url: 'https://myterms.info', desc: 'The agreement layer (IEEE 7012) + the Mage / Swordsman browser extensions.', wikis: ['research', 'skill'] },
  // Mouse Spellbook is NOT a hosted site / git repo — it is a wiki agentic directory
  // pathway, surfaced under "Sibling wikis" (the spellbook host), not here.
];

// ---- mojibake repair (UTF-8 stored as CP1252 -> recover) -------------------
const CP1252 = { 0x20AC:0x80,0x201A:0x82,0x0192:0x83,0x201E:0x84,0x2026:0x85,0x2020:0x86,0x2021:0x87,0x02C6:0x88,0x2030:0x89,0x0160:0x8A,0x2039:0x8B,0x0152:0x8C,0x017D:0x8E,0x2018:0x91,0x2019:0x92,0x201C:0x93,0x201D:0x94,0x2022:0x95,0x2013:0x96,0x2014:0x97,0x02DC:0x98,0x2122:0x99,0x0161:0x9A,0x203A:0x9B,0x0153:0x9C,0x017E:0x9E,0x0178:0x9F };
function fixText(s) {
  if (typeof s !== 'string' || !/[-￿]/.test(s)) return s;
  const bytes = [];
  for (const ch of s) {
    const c = ch.codePointAt(0);
    if (c <= 0xff) bytes.push(c);
    else if (CP1252[c] !== undefined) bytes.push(CP1252[c]);
    else return s; // contains a char not from the cp1252 set -> not double-encoded
  }
  const dec = Buffer.from(bytes).toString('utf8');
  return dec.includes('�') ? s : dec; // keep only clean recoveries
}

// ---- helpers ---------------------------------------------------------------
// FedWiki slug: space→dash, DELETE other non-alphanumerics (so Drake's→drakes),
// then trim leading/trailing dashes (so 📜 The Story→the-story).
const asSlug = s => s.replace(/\s/g, '-').replace(/[^A-Za-z0-9-]/g, '').replace(/^-+|-+$/g, '').toLowerCase();
// alt collapsing form (runs→one dash) for fuzzy fallback against real filenames
const altSlug = s => s.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();
// per-site real page-filename sets + title→filename maps, filled in a pre-scan;
// used to resolve [[links]] (FedWiki links by the target page's TITLE, not its file)
const SLUGS = {};
const TITLES = {};
function resolveSlug(title, siteId) {
  const set = SLUGS[siteId], tmap = TITLES[siteId] || {};
  const a = asSlug(title), b = altSlug(title);
  if (set) { if (set.has(a)) return a; if (set.has(b)) return b; }
  if (tmap[a]) return tmap[a];
  if (tmap[b]) return tmap[b];
  return a;
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const stripHost = h => String(h || '').replace(/\.localhost(:\d+)?$/, '').replace(/\.agentprivacy\.ai$/, '');

marked.setOptions({ gfm: true, breaks: true });

// Rewrite FedWiki link forms inside a markdown string, then render.
function renderMarkdown(raw, site) {
  let t = fixText(raw);
  // cross-site explicit links -> /<site>/<slug>.html
  t = t.replace(/https?:\/\/([a-z]+)\.localhost(?::\d+)?\/view\/([\w-]+)/gi,
    (m, s, slug) => SITE_IDS.has(s) ? `/${pathOf(s)}/${slug}.html` : m);
  // same-origin /view/<slug> -> relative within this site
  t = t.replace(/\(\/view\/([\w-]+)\)/g, (m, slug) => `(${slug}.html)`);
  t = t.replace(/(\s)\/view\/([\w-]+)/g, (m, sp, slug) => `${sp}${slug}.html`);
  // FedWiki internal links [[Page Title]] -> same-site relative (resolved against
  // the real page filenames so emoji/apostrophe titles don't 404)
  t = t.replace(/\[\[([^\]]+)\]\]/g, (m, title) =>
    `<a class="wlink" href="${resolveSlug(title, site)}.html">${esc(title)}</a>`);
  // FedWiki external links [url label] (url then space then label, no parens)
  t = t.replace(/\[((?:https?:)?\/?\/?[^\]\s)]+)\s+([^\]]+)\]/g, (m, url, label) =>
    /^https?:|^\//.test(url) ? `<a href="${esc(url)}">${esc(label)}</a>` : m);
  return marked.parse(t);
}

// Strip dev-host names from PUBLISHED output. By the time this runs on rendered
// HTML, federation /view/ links are already relative; this catches stragglers,
// roster rows, prose, and non-federation hosts so no *.localhost:3030 leaks.
// sites that are also a hosted product → bare-localhost dev URLs map to the public product
const PRODUCT_URL = { game42: 'https://42.agentprivacy.ai' };
function deLocalhost(s, site) {
  // any leftover federation /view/ link → relative path
  s = s.replace(/https?:\/\/([a-z][a-z0-9]*)\.localhost(?::\d+)?\/view\/([\w-]+)/gi,
    (m, h, slug) => SITE_IDS.has(h) ? `/${pathOf(h)}/${slug}.html` : 'https://guide.agentprivacy.ai');
  // other *.localhost URLs → the public guide
  s = s.replace(/https?:\/\/[a-z0-9.-]+\.localhost(?::\d+)?(\/[^\s"'<)]*)?/gi, 'https://guide.agentprivacy.ai');
  // bare host.localhost text → the site Label (federation) or the stripped host
  s = s.replace(/\b([a-z][a-z0-9.-]*)\.localhost(?::\d+)?/gi, (m, h) => {
    const first = h.split('.')[0];
    const st = SITES.find(x => x.id === first || hostOf(x) === first);
    return st ? st.label : h;
  });
  // on a product site, localhost dev-server refs → its public product
  const prod = PRODUCT_URL[site];
  if (prod) {
    s = s.replace(/https?:\/\/localhost(?::\d+)?/gi, prod);           // full URLs (path kept)
    s = s.replace(/\blocalhost(?::\d+)?/gi, prod.replace(/^https?:\/\//, '')); // bare mentions → domain
  }
  return s.replace(/:3030\b/g, '');
}
// JSON variant: keep it valid data but point the public origin, no localhost
function deLocalhostJson(s, site) {
  s = s.replace(/https?:\/\/[a-z0-9.-]+\.localhost(?::\d+)?/gi, 'https://guide.agentprivacy.ai')
    .replace(/([a-z0-9.-]+)\.localhost(?::\d+)?/gi, '$1.guide.agentprivacy.ai');
  const prod = PRODUCT_URL[site];
  if (prod) s = s.replace(/https?:\/\/localhost(?::\d+)?/gi, prod).replace(/\blocalhost(?::\d+)?/gi, prod.replace(/^https?:\/\//, ''));
  return s.replace(/:3030\b/g, '');
}

// Parse the `key: value` line-block plugins (tileglyph, roster, federationmap).
function kv(text) {
  const o = {}; const lines = fixText(text).split('\n');
  for (const ln of lines) {
    const m = ln.match(/^([a-z]+):\s*(.*)$/i);
    if (m) o[m[1].toLowerCase()] = m[2];
  }
  return { lines, kv: o };
}

function renderItem(item, site) {
  const type = item.type;
  if (type === 'markdown' || type === 'paragraph') {
    return `<div class="md">${renderMarkdown(item.text || '', site)}</div>`;
  }
  if (type === 'pagefold') return `<hr class="fold" data-label="${esc(fixText(item.text||''))}">`;
  if (type === 'reference') {
    const s = stripHost(item.site);
    const sid = (SITES.find(x => x.id === s || hostOf(x) === s) || {}).id;
    const target = sid || site;
    const exists = SLUGS[target]?.has(item.slug);
    const badge = SITES.find(x => x.id === (sid || s));
    const inner = `<span class="ref-glyph">${badge ? badge.glyph : '↪'}</span>
      <span class="ref-body"><span class="ref-title">${esc(fixText(item.title || item.slug))}</span>
      <span class="ref-text">${esc(fixText(item.text || ''))}</span>
      <span class="ref-site">${esc(s || item.site || '')}${exists ? '' : ' · not yet published'}</span></span>`;
    // dangling reference (e.g. a held draft act) → plain card, no broken link
    return exists ? `<a class="ref" href="/${pathOf(target)}/${item.slug}.html">${inner}</a>`
      : `<div class="ref ref-pending">${inner}</div>`;
  }
  if (type === 'image') {
    let url = fixText(item.url || '');
    if (url.startsWith('/assets/')) url = `/${pathOf(site)}${url}`;
    return `<figure class="img"><img loading="lazy" src="${esc(url)}" alt="${esc(fixText(item.caption||item.text||''))}">
      ${item.caption ? `<figcaption>${esc(fixText(item.caption))}</figcaption>` : ''}
      ${item.text ? `<div class="md">${renderMarkdown(item.text, site)}</div>` : ''}</figure>`;
  }
  if (type === 'tileglyph') {
    const { kv: k } = kv(item.text || '');
    const s = stripHost(k.site);
    const link = k.link ? (SITE_IDS.has(s) ? `/${pathOf(s)}/${k.link}.html` : `${k.link}.html`) : '#';
    const title = fixText((item.text || '').split('\n')[0] || 'tile');
    return `<a class="tile" href="${link}" style="--tile:${esc(k.color || 'var(--cyan)')}">
      <span class="tile-glyph">${esc(fixText(k.glyph || '◆'))}</span>
      <span class="tile-label">${esc(title)}</span>
      ${k.category ? `<span class="tile-cat">${esc(fixText(k.category))}</span>` : ''}</a>`;
  }
  if (type === 'roster' || type === 'federationmap') {
    const { lines } = kv(item.text || '');
    const rows = lines.filter(Boolean).map(ln => {
      const m = ln.match(/^([a-z]+)\.localhost\s+(#[0-9a-f]{3,6})?\s*(.*)$/i);
      if (m) {
        const s = m[1];
        return SITE_IDS.has(s)
          ? `<a class="roster-row" href="/${pathOf(s)}/welcome-visitors.html"><span class="dot" style="background:${m[2]||'var(--cyan)'}"></span>${esc(fixText(m[3]||s))}</a>`
          : `<div class="roster-row"><span class="dot"></span>${esc(fixText(ln))}</div>`;
      }
      return `<div class="roster-head">${esc(fixText(ln))}</div>`;
    }).join('');
    return `<div class="roster">${rows}</div>`;
  }
  if (type === 'assets') {
    return `<div class="assets-note">📎 ${esc(fixText(item.text || 'assets'))}</div>`;
  }
  if (type === 'html') return `<div class="raw">${fixText(item.text || '')}</div>`;
  if (type === 'search' || type === 'activity') {
    return `<div class="dyn-note">⚙️ <em>${esc(type)}</em> — live-only widget (use the local wiki)</div>`;
  }
  // fallback
  return item.text ? `<div class="md">${renderMarkdown(item.text, site)}</div>` : '';
}

// ---- page shell ------------------------------------------------------------
function nav(active) {
  const link = s => `<a class="nav-site${s.id === active ? ' on' : ''}" href="/${s.path}/welcome-visitors.html"><span>${s.glyph}</span>${s.label}</a>`;
  // federation, minus the nested Tomes (reached via the City parent)
  const fed = FEDERATION.filter(s => !s.nested).map(link).join('');
  const sib = SIBLINGS.map(link).join('');
  // the Gatehouse — built by tools/gate.mjs AFTER the snapshot (which clears site/)
  const gate = `<a class="nav-site${active === 'gates' ? ' on' : ''}" href="/gates/"><span>⚔️</span>Gatehouse</a>`;
  return `<header class="top">
    <a class="brand" href="/">guide <em>to</em> agentprivacy</a>
    <nav class="sites">${fed}<span class="nav-sep"></span>${sib}${gate}</nav>
    <div class="search"><input id="q" type="search" placeholder="search the canon…" autocomplete="off"><div id="results"></div></div>
  </header>`;
}

function shell({ title, site, body, lineage, slug }) {
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} · agentprivacy guide</title>
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/assets/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,300;1,9..144,400&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
</head><body data-site="${esc(site)}">
${nav(site)}
<main class="page">
  <div class="crumb"><a href="/">guide</a> / <a href="/${pathOf(site)}/welcome-visitors.html">${esc(labelOf(site))}</a> / <span>${esc(title)}</span></div>
  <article>${body}</article>
  <footer class="page-foot">
    ${lineage}
    ${slug === 'index' ? '' : `<a class="json-link" href="${esc(slug)}.json">view page JSON · forkable into any wiki ↗</a>`}
  </footer>
</main>
<script src="/assets/app.js"></script>
</body></html>`;
}

// ---- build -----------------------------------------------------------------
function rmrf(p) { fs.rmSync(p, { recursive: true, force: true }); }
// clear the CONTENTS of a dir but keep the dir itself — avoids EBUSY rmdir on
// Windows when a preview server holds an open handle to the output directory
function clearContents(p) {
  if (!fs.existsSync(p)) return;
  for (const e of fs.readdirSync(p)) { try { fs.rmSync(path.join(p, e), { recursive: true, force: true }); } catch {} }
}
function copyDir(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const a = path.join(src, e.name), b = path.join(dst, e.name);
    if (e.isDirectory()) { copyDir(a, b); continue; }
    if (/\.(md|json|txt|markdown)$/i.test(e.name)) {
      // sanitize dev-host names out of copied text assets (e.g. downloadable SKILL.md)
      fs.writeFileSync(b, deLocalhostJson(fs.readFileSync(a, 'utf8')));
    } else fs.copyFileSync(a, b);
  }
}

const searchIndex = [];
const siteIndexes = {};

console.log('snapshot → reading', WIKI);
fs.mkdirSync(OUT, { recursive: true }); clearContents(OUT);

// pre-scan real page filenames + titles per site, so [[links]] resolve against truth
for (const site of SITES) {
  const dir = path.join(WIKI, `${hostOf(site)}.localhost`, 'pages');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  SLUGS[site.id] = new Set(files);
  const tmap = {};
  for (const f of files) {
    try { const t = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).title; if (t) tmap[asSlug(fixText(t))] = f; } catch {}
  }
  TITLES[site.id] = tmap;
}

for (const site of SITES) {
  const pagesDir = path.join(WIKI, `${hostOf(site)}.localhost`, 'pages');
  const outDir = path.join(OUT, site.path);
  fs.mkdirSync(path.join(outDir, 'system'), { recursive: true });
  // copy any real assets (uploads) for this site
  copyDir(path.join(WIKI, `${hostOf(site)}.localhost`, 'assets'), path.join(outDir, 'assets'));

  const entries = fs.existsSync(pagesDir) ? fs.readdirSync(pagesDir) : [];
  const sitemap = [];
  let n = 0;
  for (const slug of entries) {
    const raw = fs.readFileSync(path.join(pagesDir, slug), 'utf8');
    let page; try { page = JSON.parse(raw); } catch { continue; }
    const title = fixText(page.title || slug);
    const story = Array.isArray(page.story) ? page.story : [];
    const body = deLocalhost(story.map(it => renderItem(it, site.id)).join('\n'), site.id);

    // lineage from journal
    const journal = Array.isArray(page.journal) ? page.journal : [];
    const forks = journal.filter(j => j.type === 'fork');
    const origin = forks.length ? stripHost(forks[forks.length - 1].site) : null;
    const lineage = `<div class="lineage">${journal.length} revision${journal.length === 1 ? '' : 's'}` +
      (origin ? ` · forked from <strong>${esc(origin)}</strong>` : '') + `</div>`;

    fs.writeFileSync(path.join(outDir, `${slug}.html`),
      shell({ title, site: site.id, body, lineage, slug }));
    // emit the page json — dev-host names rewritten to the public origin
    fs.writeFileSync(path.join(outDir, `${slug}.json`), deLocalhostJson(raw, site.id));

    const plain = story.filter(s => s.text).map(s => fixText(s.text)).join(' ')
      .replace(/[#*_`>\[\]()]/g, ' ').replace(/\s+/g, ' ').slice(0, 280);
    searchIndex.push({ s: site.path, u: slug, t: title, x: deLocalhost(plain) });
    sitemap.push({ slug, title, date: page.journal?.slice(-1)[0]?.date || 0 });
    n++;
  }
  // per-site sitemap + index
  fs.writeFileSync(path.join(outDir, 'system', 'sitemap.json'), JSON.stringify(sitemap, null, 1));
  siteIndexes[site.id] = sitemap;
  const li = p => `<li><a href="/${site.path}/${p.slug}.html">${esc(p.title)}</a></li>`;
  const byTitle = (a, b) => a.title.localeCompare(b.title);
  let indexBody;
  if (site.groups) {
    // grouped index (e.g. the Spellbooks, by book)
    const used = new Set();
    const sections = site.groups.map(g => {
      const items = sitemap.filter(p => g.re.test(p.slug)).sort(byTitle);
      items.forEach(p => used.add(p.slug));
      return items.length ? `<h3 class="book-h">${g.label} <span class="book-n">${items.length}</span></h3><ul class="page-list">${items.map(li).join('')}</ul>` : '';
    }).join('');
    const rest = sitemap.filter(p => !used.has(p.slug)).sort(byTitle);
    const other = rest.length ? `<h3 class="book-h">✦ Frames & guides <span class="book-n">${rest.length}</span></h3><ul class="page-list">${rest.map(li).join('')}</ul>` : '';
    indexBody = sections + other;
  } else {
    indexBody = `<ul class="page-list">${[...sitemap].sort(byTitle).map(li).join('')}</ul>`;
  }
  fs.writeFileSync(path.join(outDir, 'index.html'), shell({
    title: `${site.label} — index`, site: site.id, slug: 'index', lineage: '',
    body: `<h1 class="site-h"><span>${site.glyph}</span> The ${site.label}</h1>
      <p class="lede">${esc(site.blurb)}</p>
      <p class="muted">${n} pages · <a href="welcome-visitors.html">enter →</a></p>
      ${indexBody}`,
  }));
  console.log(`  ${site.glyph} ${site.id}: ${n} pages`);
}

// search index + root hub + theme + script
fs.writeFileSync(path.join(OUT, 'search-index.json'), JSON.stringify(searchIndex));

const card = (s, href, n) =>
  `<a class="hub-card" href="${href || `/${s.path}/welcome-visitors.html`}" style="--c:${s.color}">
    <span class="hub-glyph">${s.glyph}</span>
    <span class="hub-name">${s.label}</span>
    <span class="hub-blurb">${esc(s.blurb)}</span>
    <span class="hub-n">${(n ?? siteIndexes[s.id]?.length) || 0} pages</span></a>`;
// federation cards: drop guide (it's the hub) + the nested Tomes (reached via City)
const fedCards = FEDERATION.filter(s => s.id !== 'guide' && !s.nested)
  .map(s => card(s, undefined, s.id === 'city' ? (siteIndexes['tomes']?.length || 0) : undefined)).join('');
const sibCards = SIBLINGS.map(s => card(s)).join('');

const wikiLink = id => { const s = SITES.find(x => x.id === id || hostOf(x) === id); return s ? `<a href="/${s.path}/welcome-visitors.html">${s.glyph} ${s.label}</a>` : id; };
const siteRows = WEBSITES.map(w =>
  `<div class="site-row">
    <div class="site-main"><a class="site-name" href="${esc(w.url)}">${esc(w.name)} ↗</a>
      <span class="site-desc">${esc(w.desc)}</span></div>
    <div class="site-wikis">${w.wikis.map(wikiLink).join(' · ')}</div>
  </div>`).join('');

fs.writeFileSync(path.join(OUT, 'index.html'), shell({
  title: 'The Guide', site: 'guide', slug: 'index', lineage: '',
  body: `<section class="hero">
    <h1>Guide<br><em>to Privacy</em></h1>
    <p class="lede">A federated, forkable projection of the agentprivacy universe — the dual-agent
    privacy framework, the skills its agents carry, the lore that grounds it, the city it lives in,
    and the sites you can open. This is the <strong>static snapshot</strong>; the living wiki runs
    locally for workshops & governance.</p>
  </section>

  <h2 class="hub-h">The federation</h2>
  <p class="muted">Two spellbooks frame the canon: 📚 <strong>Spellbooks = the First Person Spellbook</strong> (“I” — privacymage's whole narrative) ⟂ 🏛️ <strong>City › Tomes = the Second Person Spellbook</strong> (“you” — the City of Mages). 🔮 Grimoire holds the first-person atoms; 🐭 the Mouse Spellbook is its mouse rendering.</p>
  <section class="hub-grid">${fedCards}</section>

  <h2 class="hub-h">Open the experience — the sites</h2>
  <p class="muted">Every site you host, linkable, and opened into its wiki.</p>
  <section class="site-dir">${siteRows}</section>

  <h2 class="hub-h">Sibling wikis</h2>
  <p class="muted">Their own wiki hosts, browsable here, single source each.</p>
  <section class="hub-grid">${sibCards}</section>

  <p class="enter-guide"><a href="/guide/welcome-visitors.html">Enter the Guide hub →</a></p>`,
}));

fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
// favicon — the guide's compass-star: navy ground · cyan 8-point star · coral core
fs.writeFileSync(path.join(OUT, 'assets', 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#080c20"/>
  <path d="M32 6 L36 24 L44 14 L40 28 L58 32 L40 36 L44 50 L36 40 L32 58 L28 40 L20 50 L24 36 L6 32 L24 28 L20 14 L28 24 Z" fill="#4dd9e8"/>
  <circle cx="32" cy="32" r="4.5" fill="#e8523a"/>
</svg>`);
fs.writeFileSync(path.join(OUT, 'assets', 'style.css'), THEME_CSS());
fs.writeFileSync(path.join(OUT, 'assets', 'app.js'), APP_JS());

// final pass: de-link any anchor whose LOCAL target doesn't resolve (dead .md
// repo-file refs, etc.) — guarantees no broken destinations in the published site.
function deadLinkSweep() {
  const all = [];
  (function w(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name); if (e.isDirectory()) w(p); else if (e.name.endsWith('.html')) all.push(p);
  } })(OUT);
  const isFile = p => { try { return fs.statSync(p).isFile(); } catch { return false; } };
  let fixed = 0;
  for (const f of all) {
    const dir = path.dirname(f);
    let html = fs.readFileSync(f, 'utf8'); const orig = html;
    const resolves = href => {
      if (/^(https?:|mailto:|#|data:)/i.test(href)) return true;
      if (href === '/gates/') return true; // built AFTER the snapshot by tools/gate.mjs; audit enforces it exists
      const t = href.split('#')[0].split('?')[0]; if (!t) return true;
      let tgt = t.startsWith('/') ? path.join(OUT, t) : path.join(dir, t);
      if (t.endsWith('/')) tgt = path.join(tgt, 'index.html');
      return isFile(tgt);
    };
    // 0. flatten nested anchors (keep the outer, which usually resolves)
    let prev; do { prev = html; html = html.replace(/(<a\b[^>]*>)\s*<a\b[^>]*>([\s\S]*?)<\/a>\s*<\/a>/g, '$1$2</a>'); } while (html !== prev);
    // 1. de-link dead anchors
    html = html.replace(/<a\b[^>]*?href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (m, href, label) =>
      resolves(href) ? m : (fixed++, `<span class="deadlink" title="reference (not a live page)">${label}</span>`));
    // 2. neutralize dead images → their alt text
    html = html.replace(/<img\b[^>]*?>/g, m => {
      const s = m.match(/src="([^"]+)"/); if (!s || resolves(s[1])) return m;
      const a = m.match(/alt="([^"]*)"/); fixed++;
      return a && a[1] ? `<span class="deadimg">🖼 ${a[1]}</span>` : '';
    });
    if (html !== orig) fs.writeFileSync(f, html);
  }
  return fixed;
}
const deadFixed = deadLinkSweep();

console.log(`\n✓ ${searchIndex.length} pages → ${OUT}  (dead-link sweep: ${deadFixed} de-linked)`);

// ---- theme (agentprivacy × soulbis) ---------------------------------------
function THEME_CSS() { return `:root{
  --navy:#080c20; --navy-2:#0b1024; --ink:#04050b; --surface:#0d1230; --surface-2:#141a3d;
  --cyan:#4dd9e8; --coral:#e8523a; --lav:#aeb8ee; --aqua:#7fffd4; --violet:#8b5cf6;
  --white:#f0eee8; --dim:rgba(240,238,232,.6); --ghost:rgba(240,238,232,.32);
  --border:rgba(240,238,232,.09); --border-hi:rgba(77,217,232,.4);
  --serif:'Fraunces',Georgia,serif; --sans:'DM Sans',system-ui,sans-serif; --mono:'JetBrains Mono',monospace;
}
*{box-sizing:border-box} html{scroll-behavior:smooth}
body{margin:0;background:radial-gradient(1200px 700px at 70% -10%,#141a3d 0,var(--navy) 55%,var(--ink) 100%);
  color:var(--white);font-family:var(--sans);line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:var(--cyan);text-decoration:none} a:hover{color:var(--aqua)}
::selection{background:var(--coral);color:#fff}
/* top nav */
.top{position:sticky;top:0;z-index:20;display:flex;gap:18px;align-items:center;flex-wrap:wrap;
  padding:12px 20px;background:rgba(8,12,32,.82);backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}
.brand{font-family:var(--serif);font-style:italic;font-size:20px;color:var(--white);white-space:nowrap}
.brand em{color:var(--dim);font-size:15px} .brand-mark{color:var(--cyan);font-style:normal}
.sites{display:flex;gap:4px;flex-wrap:wrap;flex:1}
.nav-site{font-family:var(--mono);font-size:11.5px;letter-spacing:.02em;color:var(--dim);
  padding:5px 9px;border-radius:7px;border:1px solid transparent;display:inline-flex;gap:5px;align-items:center}
.nav-site:hover{color:var(--white);background:rgba(255,255,255,.04)}
.nav-site.on{color:var(--cyan);border-color:var(--border-hi);background:rgba(77,217,232,.08)}
.search{position:relative}
#q{font-family:var(--mono);font-size:12px;background:var(--surface);border:1px solid var(--border);
  color:var(--white);padding:7px 11px;border-radius:8px;width:200px}
#q:focus{outline:none;border-color:var(--border-hi)}
#results{position:absolute;right:0;top:38px;width:340px;max-height:60vh;overflow:auto;background:var(--surface-2);
  border:1px solid var(--border);border-radius:10px;display:none}
#results.on{display:block}
#results a{display:block;padding:9px 12px;border-bottom:1px solid var(--border);color:var(--white);font-size:13px}
#results a:hover{background:rgba(77,217,232,.1)} #results .rsite{font-family:var(--mono);font-size:10px;color:var(--cyan);text-transform:uppercase}
/* page */
.page{max-width:820px;margin:0 auto;padding:34px 22px 90px}
.crumb{font-family:var(--mono);font-size:11px;color:var(--ghost);margin-bottom:22px}
.crumb a{color:var(--dim)} .crumb span{color:var(--cyan)}
article{font-size:16.5px}
h1,h2,h3,h4{font-family:var(--serif);font-weight:400;line-height:1.15;color:var(--white)}
h1{font-style:italic;font-size:clamp(30px,5vw,46px);letter-spacing:-.01em;margin:.2em 0 .5em}
h2{font-style:italic;font-size:27px;color:var(--lav);margin:1.6em 0 .5em}
h3{font-size:20px;color:var(--aqua);margin:1.4em 0 .4em}
article p{margin:.7em 0} article ul,article ol{padding-left:1.3em}
article li{margin:.3em 0} article code{font-family:var(--mono);font-size:.86em;background:rgba(255,255,255,.06);
  padding:.12em .4em;border-radius:5px;color:var(--aqua)}
article pre{background:var(--ink);border:1px solid var(--border);border-radius:10px;padding:14px 16px;overflow:auto}
article pre code{background:none;color:var(--white)}
article blockquote{margin:1em 0;padding:.4em 1em;border-left:3px solid var(--coral);color:var(--dim);font-style:italic}
.prov-from{display:block;font-style:normal;font-family:var(--mono);font-size:11px;color:var(--ghost);margin-top:3px}
.prov-n{font-family:var(--mono);font-size:12px;color:var(--cyan);font-style:normal}
article hr{border:none;border-top:1px solid var(--border);margin:2em 0}
.wlink{border-bottom:1px dotted var(--border-hi)}
.deadlink{color:var(--dim)}
.deadimg{font-family:var(--mono);font-size:12px;color:var(--ghost)}
hr.fold{position:relative;border-top:1px dashed var(--border)}
/* references */
.ref{display:flex;gap:12px;align-items:flex-start;margin:10px 0;padding:13px 15px;background:var(--surface);
  border:1px solid var(--border);border-radius:11px}
.ref:hover{border-color:var(--border-hi);background:var(--surface-2)}
.ref-pending{opacity:.55;cursor:default}
.ref-glyph{font-size:20px} .ref-body{display:flex;flex-direction:column;gap:2px}
.ref-title{font-family:var(--serif);font-style:italic;font-size:17px;color:var(--white)}
.ref-text{color:var(--dim);font-size:14px} .ref-site{font-family:var(--mono);font-size:10px;color:var(--cyan);text-transform:uppercase;letter-spacing:.05em}
/* tiles */
.tile{display:inline-flex;flex-direction:column;gap:3px;width:150px;padding:16px;margin:6px 8px 6px 0;border-radius:14px;
  background:color-mix(in srgb,var(--tile) 22%,var(--surface));border:1px solid color-mix(in srgb,var(--tile) 50%,transparent);
  vertical-align:top;transition:transform .15s}
.tile:hover{transform:translateY(-3px)} .tile-glyph{font-size:26px}
.tile-label{font-family:var(--serif);font-style:italic;font-size:18px;color:var(--white)}
.tile-cat{font-family:var(--mono);font-size:10px;color:var(--dim);text-transform:uppercase}
/* roster / federationmap */
.roster{display:flex;flex-direction:column;gap:2px;margin:14px 0;padding:12px 14px;background:var(--surface);border:1px solid var(--border);border-radius:11px}
.roster-head{font-family:var(--mono);font-size:10px;color:var(--ghost);text-transform:uppercase;letter-spacing:.08em;margin-top:8px}
.roster-row{display:flex;gap:9px;align-items:center;padding:4px 0;color:var(--white)}
.dot{width:9px;height:9px;border-radius:50%;background:var(--cyan);flex:none}
.assets-note,.dyn-note{font-family:var(--mono);font-size:12px;color:var(--ghost);margin:8px 0}
figure.img{margin:1.2em 0} figure.img img{max-width:100%;border-radius:10px;border:1px solid var(--border)}
figcaption{font-family:var(--mono);font-size:11px;color:var(--dim);margin-top:6px}
/* footer */
.page-foot{margin-top:48px;padding-top:18px;border-top:1px solid var(--border);display:flex;justify-content:space-between;
  gap:12px;flex-wrap:wrap;font-family:var(--mono);font-size:11px}
.lineage{color:var(--ghost)} .json-link{color:var(--dim)} .json-link:hover{color:var(--cyan)}
/* index lists */
.site-h{display:flex;gap:12px;align-items:center} .site-h span{font-size:.8em}
.lede{font-size:18px;color:var(--lav)} .muted{color:var(--dim);font-size:14px;font-family:var(--mono)}
.book-h{font-family:var(--serif);font-style:italic;font-size:22px;color:var(--lav);margin:32px 0 4px;border-bottom:1px solid var(--border);padding-bottom:6px}
.book-n{font-family:var(--mono);font-size:12px;color:var(--cyan);font-style:normal}
.page-list{columns:2;gap:30px;list-style:none;padding:0;margin-top:22px}
.page-list li{margin:.35em 0;break-inside:avoid;font-size:14.5px}
/* hub */
.hero{max-width:760px;margin:30px auto 10px;text-align:center}
.hero h1{font-size:clamp(40px,8vw,76px);line-height:.95}
.hub-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px;margin:34px 0}
.hub-card{display:flex;flex-direction:column;gap:6px;padding:20px;border-radius:16px;background:var(--surface);
  border:1px solid var(--border);border-top:3px solid var(--c)}
.hub-card:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--c) 60%,transparent)}
.hub-glyph{font-size:30px} .hub-name{font-family:var(--serif);font-style:italic;font-size:22px;color:var(--white)}
.hub-blurb{color:var(--dim);font-size:13.5px} .hub-n{font-family:var(--mono);font-size:10px;color:var(--cyan);text-transform:uppercase}
.enter-guide{text-align:center;font-family:var(--serif);font-style:italic;font-size:19px;margin-top:36px}
.nav-sep{width:1px;align-self:stretch;background:var(--border);margin:0 4px}
.hub-h{font-family:var(--serif);font-style:italic;font-size:26px;color:var(--lav);margin:40px 0 6px}
.site-dir{display:flex;flex-direction:column;gap:8px;margin:16px 0}
.site-row{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;
  padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:12px}
.site-row:hover{border-color:var(--border-hi)}
.site-main{display:flex;flex-direction:column;gap:3px;min-width:240px;flex:1}
.site-name{font-family:var(--serif);font-style:italic;font-size:19px;color:var(--white)}
.site-desc{color:var(--dim);font-size:13.5px}
.site-wikis{font-family:var(--mono);font-size:12px;color:var(--cyan);display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
@media(max-width:640px){.page-list{columns:1}.search{order:3;width:100%}#q{width:100%}#results{width:100%}}
`; }

function APP_JS() { return `// client-side search over /search-index.json
let IDX=null;const q=document.getElementById('q'),box=document.getElementById('results');
async function load(){if(IDX)return;IDX=await (await fetch('/search-index.json')).json();}
function run(v){if(!v||v.length<2){box.classList.remove('on');box.innerHTML='';return;}
  v=v.toLowerCase();const hits=[];
  for(const p of IDX){const t=p.t.toLowerCase();let sc=t.includes(v)?2:0;if(!sc&&p.x.toLowerCase().includes(v))sc=1;
    if(sc)hits.push([sc,p]);if(hits.length>400)break;}
  hits.sort((a,b)=>b[0]-a[0]);
  box.innerHTML=hits.slice(0,40).map(([,p])=>'<a href="/'+p.s+'/'+p.u+'.html"><span class="rsite">'+p.s+'</span> '+p.t+'</a>').join('')||'<a>no matches</a>';
  box.classList.add('on');}
if(q){q.addEventListener('focus',load);q.addEventListener('input',e=>run(e.target.value));
  document.addEventListener('click',e=>{if(!e.target.closest('.search'))box.classList.remove('on');});}
`; }
