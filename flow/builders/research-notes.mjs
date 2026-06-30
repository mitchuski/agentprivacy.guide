// flow/builders/research-notes.mjs — BUILD stage: surface the V6 working notes
// that the Research-Notes hub names but never paged. Each becomes a SUMMARY page
// (title + lead + source pointer) — not a full-prose copy, to avoid duplicating
// the canonical md. Title-dedups against existing research pages (e.g. the Lorenz
// note is the same content as the already-paged V6 research note → skipped).
// Run:  node flow/builders/research-notes.mjs

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const HOME = os.homedir();
const PAGES = path.join(HOME, '.wiki', 'research.localhost', 'pages');
const SRC = path.join(HOME, 'agentprivacy-docs', 'research');
const DATE = 1782603200000;
const asSlug = s => s.replace(/\s/g, '-').replace(/[^A-Za-z0-9-]/g, '').replace(/^-+|-+$/g, '').toLowerCase();
const rid = seed => createHash('sha1').update(seed).digest('hex').slice(0, 16);

// Curated DISTINCT facet notes (they share the generic "# Privacy Value Model: V6
// Research Note" heading, so titles are given explicitly). Known dups EXCLUDED:
// lorenz-attractor (= the V6 research note / Dynamical Ceiling, already paged),
// schrottenloher (= Existence-Leak/Falling-Z, paged), NOTE_agt_scales (= Dragon's
// Scales, paged), privacy_value_v6_research_note_eml (= eml-three-ceilings).
const NOTES = [
  { file: 'pvm-v6-1-bakhta-half-life.md', title: 'Bakhta Half-Life' },
  { file: 'pvm-v6-arch1-canonical-form.md', title: 'ARCH-1 Canonical Form' },
  { file: 'pvm-v6-arch1rt-operational-reachability.md', title: 'ARCH-1RT — Operational Reachability' },
  { file: 'pvm-v6-bakhta-integrity-gap-convergence.md', title: 'Bakhta Integrity-Gap Convergence' },
  { file: 'pvm-v6-convergence-wound-and-cap.md', title: 'The Convergence Wound and the Cap' },
  { file: 'pvm-v6-eml-three-ceilings.md', title: 'EML — The Three Ceilings' },
  { file: 'pvm-v6-visual-runtime-instruments.md', title: 'Visual Runtime Instruments' },
];

function parse(md) {
  let lines = md.split(/\r?\n/);
  if (lines[0]?.trim() === '---') { let i = 1; while (i < lines.length && lines[i].trim() !== '---') i++; lines = lines.slice(i + 1); }
  const title = (lines.find(l => /^#\s+/.test(l)) || '').replace(/^#\s+/, '').trim();
  const prose = [];
  for (const l of lines) {
    const t = l.trim();
    if (!t || /^#/.test(t) || /^[-*|>]/.test(t) || /^\*\*/.test(t) || t === '---' || /^```/.test(t) || /^!\[/.test(t)) continue;
    prose.push(t);
    if (prose.join(' ').length > 340) break;
  }
  let s = prose.join(' ').replace(/\s+/g, ' ');
  if (s.length > 380) s = s.slice(0, 380).replace(/\s+\S*$/, '') + '…';
  return { title, summary: s };
}

export function buildResearchNotes() {
  const created = [], skipped = [], linkTitles = [];
  for (const { file, title } of NOTES) {
    const fp = path.join(SRC, file);
    if (!fs.existsSync(fp)) { skipped.push(`${file} (no source)`); continue; }
    const { summary } = parse(fs.readFileSync(fp, 'utf8'));
    const slug = 'note-' + asSlug(file.replace(/\.md$/, ''));
    const pageTitle = `Note — ${title}`;
    const blocks = [
      `# 🔬 ${title}`,
      summary || '*(a V6 working research note)*',
      `*A V6 working research note. Full text: \`agentprivacy-docs/research/${file}\`.*`,
      `## Navigation\n← [[Welcome Visitors]] · [[The Research Notes]] · [[The Conjecture Register]]`,
    ];
    const story = blocks.map((t, i) => ({ type: 'markdown', id: rid(slug + '#' + i), text: t }));
    fs.writeFileSync(path.join(PAGES, slug), JSON.stringify({ title: pageTitle, story, journal: [{ type: 'create', item: { title: pageTitle, story }, date: DATE }] }, null, 2));
    created.push(slug); linkTitles.push(pageTitle);
  }
  // hub update
  const hubFile = path.join(PAGES, 'the-research-notes');
  if (fs.existsSync(hubFile) && linkTitles.length) {
    const p = JSON.parse(fs.readFileSync(hubFile, 'utf8'));
    const id = rid('the-research-notes#v6-notes');
    const text = `## V6 working notes\n\n*Companion notes behind the model — summaries pointing to the canonical \`agentprivacy-docs/research\`.*\n\n${linkTitles.map(t => `- [[${t}]]`).join('\n')}`;
    const item = { type: 'markdown', id, text };
    p.story = (p.story || []).filter(it => it.id !== id).concat(item);
    p.journal = (p.journal || []).filter(j => !(j.type === 'add' && j.id === id)).concat({ type: 'add', id, item, date: DATE });
    fs.writeFileSync(hubFile, JSON.stringify(p, null, 2));
  }
  return { created, skipped };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = buildResearchNotes();
  r.created.forEach(s => console.log(`  created  ${s}`));
  r.skipped.forEach(s => console.log(`  skipped  ${s}`));
  console.log(`research-notes build → ${r.created.length} created, ${r.skipped.length} skipped`);
}
