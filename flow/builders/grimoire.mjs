// flow/builders/grimoire.mjs — BUILD stage for the grimoire site.
// Fills the approved v10.4 gaps into the LIVE wiki (~/.wiki/grimoire.localhost):
//   9 forged blades · 9 blade-proverbs · 3 missing incantations · 7 principles
// Additive + idempotent: deterministic ids/dates, hub updates are refresh-in-place.
// Run:  node flow/builders/grimoire.mjs

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const HOME = os.homedir();
const PAGES = path.join(HOME, '.wiki', 'grimoire.localhost', 'pages');
const CANON = path.join(HOME, 'agentprivacy-docs', 'models', 'privacymage_grimoire_v10_4_0.json');
const DATE = 1782601033000; // fixed → idempotent file content

const asSlug = s => s.replace(/\s/g, '-').replace(/[^A-Za-z0-9-]/g, '').toLowerCase();
const rid = seed => createHash('sha1').update(seed).digest('hex').slice(0, 16);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

const created = [];
function writePage(title, blocks) {
  const slug = asSlug(title);
  const file = path.join(PAGES, slug);
  const existed = fs.existsSync(file);
  const story = blocks.filter(Boolean).map((t, i) => ({ type: 'markdown', id: rid(title + '#' + i), text: t }));
  fs.writeFileSync(file, JSON.stringify({ title, story, journal: [{ type: 'create', item: { title, story }, date: DATE }] }, null, 2));
  created.push({ slug, title, action: existed ? 'updated' : 'created' });
  return title;
}
function updateHub(hubSlug, headerText, linkTitles) {
  const file = path.join(PAGES, hubSlug);
  if (!fs.existsSync(file)) { console.warn('  ! hub missing:', hubSlug); return; }
  const page = JSON.parse(fs.readFileSync(file, 'utf8'));
  const idxId = rid(hubSlug + '#flow-index');
  const text = headerText + '\n\n' + linkTitles.map(t => `- [[${t}]]`).join('\n');
  const item = { type: 'markdown', id: idxId, text };
  page.story = (page.story || []).filter(it => it.id !== idxId).concat(item);
  page.journal = (page.journal || []).filter(j => !(j.type === 'add' && j.id === idxId))
    .concat({ type: 'add', id: idxId, item, date: DATE });
  fs.writeFileSync(file, JSON.stringify(page, null, 2));
}

export function buildGrimoire() {
  const G = JSON.parse(fs.readFileSync(CANON, 'utf8'));
  const blades = G.forged_blades.blades;
  const P = G.principles;
  const nav = (...hubs) => `## Navigation\n← [[Welcome Visitors]] · ${hubs.map(h => `[[${h}]]`).join(' · ')}`;

  // 1) forged blades
  const bladeTitles = [];
  for (const b of blades) {
    const t = b.title;
    bladeTitles.push(t);
    writePage(t, [
      `# ⚔️ ${t}`,
      `**${b.name}** · \`${b.signature}\``,
      b.proverb && `> ${b.proverb}`,
      b.inscribed_spell && `**Inscribed spell** — ${b.inscribed_spell}`,
      `Tier **${b.tier}** · Stratum ${b.stratum}/6 · Hex \`${b.hex}\` · ${b.nodes} nodes · ${b.laps} laps · ${b.spells_cast} spells cast · charge **${b.charge_level}**`,
      `Constellation \`${b.constellation_hash}\` · forged ${b.forged_at} · category *${b.category}*`,
      b.significance && `**Significance.** ${b.significance}`,
      b.reflection && `*Reflection: "${b.reflection}"*`,
      nav('The Forged Blades', 'The Proverbs'),
    ]);
  }

  // 2) blade-proverbs
  const proverbTitles = [];
  for (const b of blades) {
    const t = `Proverb of ${b.title}`;
    proverbTitles.push(t);
    writePage(t, [
      `# 📜 ${t}`,
      `> ${b.proverb}`,
      `— inscribed on [[${b.title}]]  ·  *${b.name}*`,
      nav('The Proverbs'),
    ]);
  }

  // 3) the 3 missing incantations
  const incMap = {
    closing_invocation: 'The Closing Invocation',
    emissary_dispersion: 'The Emissary Dispersion',
    dihedral_sovereignty: 'The Dihedral Sovereignty',
  };
  const incTitles = [];
  for (const [key, t] of Object.entries(incMap)) {
    const e = G.unified_incantations[key] || {};
    incTitles.push(t);
    const extra = Object.entries(e)
      .filter(([k, v]) => typeof v === 'string' && !['name', 'spell', 'proverb'].includes(k))
      .map(([k, v]) => `**${cap(k.replace(/_/g, ' '))}.** ${v}`);
    writePage(t, [
      `# ⬢ ${t}`,
      e.spell && `**${e.spell}**`,
      e.proverb && `> ${e.proverb}`,
      ...extra,
      nav('The Incantations'),
    ]);
  }

  // 4) principles (5 pentad + foundational-truths + sovereignty-aspects)
  const prinTitles = [];
  for (const [key, v] of Object.entries(P.pentad_positioning)) {
    const t = `The Pentad of ${cap(key)}`;
    prinTitles.push(t);
    writePage(t, [
      `# 📐 ${t}`,
      `**${v.question}**  ·  ${v.symbol}`,
      `Focus: *${v.focus}*`,
      `The **${key}** spellbook's position in the pentad of the privacy-value framework.`,
      nav('The Principles'),
    ]);
  }
  {
    const ft = P.foundational_truths;
    const t = 'The Foundational Truths';
    prinTitles.push(t);
    writePage(t, [
      `# 📐 ${t}`,
      `The ${ft.length} foundational truths beneath the framework.`,
      ft.map((x, i) => `${i + 1}. ${x}`).join('\n'),
      nav('The Principles'),
    ]);
  }
  {
    const sa = P.sovereignty_aspects;
    const t = 'The Sovereignty Aspects';
    prinTitles.push(t);
    writePage(t, [
      `# 📐 ${t}`,
      `The ${Object.keys(sa).length} aspects of sovereignty.`,
      Object.entries(sa).map(([k, val]) => `- **${k}** — ${val}`).join('\n'),
      nav('The Principles'),
    ]);
  }

  // 5) refresh the hubs to link the new atoms
  updateHub('the-forged-blades', `## The nine forged blades\n\n*${blades.length} blades, each a crystallised proof of attention across the 64-Tetrahedra Lattice.*`, bladeTitles);
  updateHub('the-proverbs', `## Proverbs of the blades\n\n*Each forged blade carries an inscribed proverb.*`, proverbTitles);
  updateHub('the-principles', `## The principles\n\n**${P.core_message}** — *${P.core_mission}*\n\n${P.tagline}`, prinTitles);
  updateHub('the-incantations', `## Also in the canon (v10.4)`, incTitles);

  return { created, counts: { blades: bladeTitles.length, proverbs: proverbTitles.length, incantations: incTitles.length, principles: prinTitles.length } };
}

// run directly
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = buildGrimoire();
  console.log('grimoire build →', JSON.stringify(r.counts));
  for (const c of r.created) console.log(`  ${c.action}  ${c.slug}`);
  console.log(`total pages written: ${r.created.length}`);
}
