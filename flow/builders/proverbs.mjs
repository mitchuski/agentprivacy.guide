// flow/builders/proverbs.mjs — surface the proverbs of the canon into the grimoire
// site. Privacymage's grimoire (First Person) above — the Master Invocation, then
// one wiki PER spellbook, the incantations, the forged blades, the foundations.
// The City of Mages (Second Person) below — the cast/personas' proverbs.
// All scrollable collection pages. Additive/idempotent.
// Run:  node flow/builders/proverbs.mjs

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const HOME = os.homedir();
const PAGES = path.join(HOME, '.wiki', 'grimoire.localhost', 'pages');
const CANON = path.join(HOME, 'agentprivacy-docs', 'models', 'privacymage_grimoire_v10_4_0.json');
const PERSONA = path.join(HOME, 'agentprivacy_master', 'agentprivacy-skills', 'agentprivacy-skills-v5', 'persona');
const DATE = 1782604300000;
const asSlug = s => s.replace(/\s/g, '-').replace(/[^A-Za-z0-9-]/g, '').replace(/^-+|-+$/g, '').toLowerCase();
const rid = seed => createHash('sha1').update(seed).digest('hex').slice(0, 16);
const esc = s => String(s).replace(/\n+/g, ' ').trim();
const cap = s => s.replace(/\b\w/g, c => c.toUpperCase());

function collect(o, name, out) {
  if (Array.isArray(o)) { for (const v of o) collect(v, name, out); return; }
  if (o && typeof o === 'object') {
    const n = o.name || o.title || o.act_number || o.part_name || name;
    if (typeof o.proverb === 'string' && o.proverb.trim()) out.push({ name: typeof n === 'string' ? n : name, proverb: o.proverb.trim() });
    for (const [k, v] of Object.entries(o)) if (k !== 'proverb' && v && typeof v === 'object') collect(v, typeof n === 'string' ? n : name, out);
  }
}
const dedup = arr => { const seen = new Set(), r = []; for (const x of arr) if (!seen.has(x.proverb)) { seen.add(x.proverb); r.push(x); } return r; };
const provList = arr => arr.map(p => `> ${esc(p.proverb)}${p.name ? `\n> <span class="prov-from">— ${esc(p.name)}</span>` : ''}`).join('\n\n');
const nav = (...hubs) => `## Navigation\n← [[Welcome Visitors]] · ${hubs.map(h => `[[${h}]]`).join(' · ')}`;

const created = [];
function writePage(title, blocks) {
  const slug = asSlug(title);
  const story = blocks.filter(Boolean).map((t, i) => ({ type: 'markdown', id: rid(slug + '#' + i), text: t }));
  fs.writeFileSync(path.join(PAGES, slug), JSON.stringify({ title, story, journal: [{ type: 'create', item: { title, story }, date: DATE }] }, null, 2));
  created.push(title);
  return title;
}

export function buildProverbs() {
  const G = JSON.parse(fs.readFileSync(CANON, 'utf8'));
  const order = []; // hub order, grouped

  // ── Privacymage's Grimoire (First Person) ──
  // 1. the Master Invocation (its own page, above the blades)
  const mi = G.master_invocation || {};
  writePage('The Master Invocation', [
    `# 🪄 The Master Invocation`,
    `*The spell at the centre of the privacymage grimoire — the inscription every other spell is read against.*`,
    mi.spell ? `**${esc(mi.spell)}**` : '',
    mi.proverb ? `> ${esc(mi.proverb)}` : '',
    nav('The Proverbs'),
  ]); order.push('The Master Invocation');

  // 2. one wiki per spellbook
  const BOOKS = [
    ['story', 'The Proverbs of the Story', '📜', 'the founding journey'],
    ['zero', 'The Proverbs of Zero', '🔮', 'the Privacymage Grimoire — zero-knowledge'],
    ['canon', 'The Proverbs of Canon', '📜', 'the principles that do not change'],
    ['parallel', 'The Proverbs of Society', '🏛️', 'the parallel society'],
    ['plurality', 'The Proverbs of Plurality', '⿻', 'coordination across difference'],
  ];
  for (const [k, title, glyph, sub] of BOOKS) {
    const out = []; collect(G.spellbooks?.[k], '', out); const d = dedup(out);
    if (!d.length) continue;
    writePage(title, [
      `# ${glyph} ${title}`,
      `*${cap(sub)} — ${d.length} proverbs, one line carried from each spell.*`,
      provList(d), nav('The Proverbs'),
    ]); order.push(title);
  }

  // 3. incantations
  { const inc = dedup((() => { const o = []; collect(G.unified_incantations, '', o); return o; })());
    writePage('The Proverbs of the Incantations', [
      `# ⬢ The Proverbs of the Incantations`, `*One proverb per incantation — the ${inc.length} master spells.*`,
      provList(inc), nav('The Proverbs', 'The Incantations')]); order.push('The Proverbs of the Incantations'); }

  // 4. forged blades (linked to the blade pages)
  { const blades = (G.forged_blades?.blades || []).filter(b => b.proverb);
    writePage('The Proverbs of the Forged Blades', [
      `# ⚔️ The Proverbs of the Forged Blades`, `*Each forged blade carries an inscribed proverb — ${blades.length} blades.*`,
      blades.map(b => `> ${esc(b.proverb)}\n> <span class="prov-from">— inscribed on [[${b.title}]]</span>`).join('\n\n'),
      nav('The Proverbs', 'The Forged Blades')]); order.push('The Proverbs of the Forged Blades'); }

  // 5. foundations (genesis, notation, ceremonies, attachment — master invocation now its own page)
  { const found = []; for (const sec of ['city_of_mages_genesis', 'attachment_architecture', 'notation', 'ceremonies']) collect(G[sec], sec.replace(/_/g, ' '), found);
    const d = dedup(found);
    writePage('The Proverbs of the Foundations', [
      `# 🜔 The Proverbs of the Foundations`, `*The grimoire's own ground — its genesis, attachment architecture, notation, and ceremonies. ${d.length} proverbs.*`,
      provList(d), nav('The Proverbs')]); order.push('The Proverbs of the Foundations'); }

  // ── The City of Mages (Second Person) — below, the cast/personas ──
  const cityOrder = [];
  if (fs.existsSync(PERSONA)) {
    const rows = { mage: [], swordsman: [], balanced: [] };
    for (const dir of fs.readdirSync(PERSONA)) {
      const f = path.join(PERSONA, dir, 'SKILL.md'); if (!fs.existsSync(f)) continue;
      const t = fs.readFileSync(f, 'utf8'); const fm = t.split('---')[1] || t;
      const al = (fm.match(/alignment:\s*"?([a-z]+)/) || [, ''])[1];
      const pv = (fm.match(/proverb:\s*"([^"]+)"/) || fm.match(/proverb:\s*'([^']+)'/) || fm.match(/proverb:\s*(.+)/) || [])[1];
      if (!pv || !rows[al]) continue;
      rows[al].push({ name: cap(dir.replace(/^agentprivacy-/, '').replace(/-/g, ' ')), proverb: pv.trim().replace(/^["']|["']$/g, '') });
    }
    const sec = (label, glyph, key) => rows[key].length ? `## ${glyph} ${label}  <span class="prov-n">${rows[key].length}</span>\n\n${provList(rows[key])}` : '';
    const total = rows.mage.length + rows.swordsman.length + rows.balanced.length;
    writePage('The Proverbs of the Cast', [
      `# 🏛️ The Proverbs of the Cast`,
      `*The City of Mages, the Second-Person spellbook — each persona of the cast carries a proverb. ${total} across mages, swordsmen, and the balanced.*`,
      sec('The Mages', '🧙', 'mage'), sec('The Swordsmen', '⚔️', 'swordsman'), sec('The Balanced', '☯️', 'balanced'),
      nav('The Proverbs')]); cityOrder.push('The Proverbs of the Cast');
  }

  // remove the old combined spellbooks page (replaced by per-book wikis)
  try { fs.rmSync(path.join(PAGES, 'the-proverbs-of-the-spellbooks')); } catch {}

  // hub — privacymage above, City of Mages below
  const hub = path.join(PAGES, 'the-proverbs');
  if (fs.existsSync(hub)) {
    const p = JSON.parse(fs.readFileSync(hub, 'utf8'));
    const id = rid('the-proverbs#collections');
    const text = `## The proverb collections\n\n*The compression layer of the canon — one line carried from each spell, act, blade, and persona.*\n\n` +
      `### 🪄 Privacymage's Grimoire — First Person\n${order.map(t => `- [[${t}]]`).join('\n')}\n\n` +
      `### 🏛️ The City of Mages — Second Person\n${cityOrder.map(t => `- [[${t}]]`).join('\n')}`;
    const item = { type: 'markdown', id, text };
    p.story = (p.story || []).filter(it => it.id !== id).concat(item);
    p.journal = (p.journal || []).filter(j => !(j.type === 'add' && j.id === id)).concat({ type: 'add', id, item, date: DATE });
    fs.writeFileSync(hub, JSON.stringify(p, null, 2));
  }
  return { created, sections: order.length + cityOrder.length };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = buildProverbs();
  r.created.forEach(t => console.log('  ' + t));
  console.log(`proverbs → ${r.created.length} collection pages`);
}
