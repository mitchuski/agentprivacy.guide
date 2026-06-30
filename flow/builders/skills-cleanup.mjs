// flow/builders/skills-cleanup.mjs — repair linkify corruption + de-duplicated
// blocks in skill.localhost persona/skill pages (a quality pass, no deletes of
// pages). Three fixes:
//   1. revert [[Agentprivacy X]] that the linkifier injected INTO urls/paths/code
//   2. drop redundant markdown items that are exact- or prefix-duplicates
//   3. (1) also catches the code-span/path cases
// Run:  node flow/builders/skills-cleanup.mjs   [--dry]

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';

const PAGES = path.join(os.homedir(), '.wiki', 'skill.localhost', 'pages');
const DRY = process.argv.includes('--dry');
const norm = t => t.replace(/\s+/g, ' ').trim();

let linkifyFixes = 0;
function fixLinkify(text) {
  // inside inline code spans `...` → revert any [[Agentprivacy X]] to lowercase x
  text = text.replace(/`[^`]*`/g, code =>
    code.replace(/\[\[Agentprivacy ([A-Za-z]+)\]\]/g, (m, n) => { linkifyFixes++; return n.toLowerCase(); }));
  // in url/domain/path context: preceded by sync. / . / slash
  text = text.replace(/(sync\.|[\/.])\[\[Agentprivacy ([A-Za-z]+)\]\]/g, (m, pre, n) => { linkifyFixes++; return pre + n.toLowerCase(); });
  // followed by a TLD or slash
  text = text.replace(/\[\[Agentprivacy ([A-Za-z]+)\]\](\.com|\.eth|\.ai|\.club|\/)/g, (m, n, suf) => { linkifyFixes++; return n.toLowerCase() + suf; });
  return text;
}

function clean(page) {
  let story = page.story.map(it => it.type === 'markdown' ? { ...it, text: fixLinkify(it.text) } : it);
  const drop = new Set();
  const seen = new Set();
  for (let i = 0; i < story.length; i++) {
    const it = story[i];
    if (it.type !== 'markdown') continue;
    const ni = norm(it.text);
    if (ni.length < 40) continue;               // leave short items alone
    if (seen.has(ni)) { drop.add(i); continue; } // exact duplicate
    // prefix-duplicate of a longer markdown item that we're keeping?
    const isPrefix = story.some((o, j) => j !== i && o.type === 'markdown' && !drop.has(j) && (() => {
      const no = norm(o.text); return no.length > ni.length && no.startsWith(ni);
    })());
    if (isPrefix) { drop.add(i); continue; }
    seen.add(ni);
  }
  let cleaned = story.filter((_, i) => !drop.has(i));
  // de-duplicate the Skills-Loaded list: when it appears in BOTH a giant "Identity"
  // block and a separate standalone block, strip the TRAILING copy from the giant
  // block (the standalone is the canonical structured section).
  const sl = cleaned.map((s, i) => ({ s, i })).filter(x => x.s.type === 'markdown' && /## Skills Loaded/.test(x.s.text || ''));
  if (sl.length >= 2) {
    const giant = sl.reduce((a, b) => (b.s.text.length > a.s.text.length ? b : a));
    const after = giant.s.text.split('## Skills Loaded')[1] || '';
    if (!/\n## (?!Skills)/.test(after)) { // Skills Loaded is the trailing section → safe to cut
      const head = giant.s.text.split('## Skills Loaded')[0].replace(/\s+$/, '');
      if (norm(head).length < 10) cleaned = cleaned.filter((_, i) => i !== giant.i);
      else cleaned[giant.i] = { ...cleaned[giant.i], text: head };
      drop.add('sl-' + giant.i); // count it
    }
  }
  return { story: cleaned, removed: drop.size };
}

export function cleanupSkills() {
  let pagesChanged = 0, itemsRemoved = 0;
  linkifyFixes = 0;
  for (const f of fs.readdirSync(PAGES)) {
    const fp = path.join(PAGES, f);
    let page; try { page = JSON.parse(fs.readFileSync(fp, 'utf8')); } catch { continue; }
    if (!Array.isArray(page.story)) continue;
    const before = JSON.stringify(page.story);
    const linkBefore = linkifyFixes;
    const { story, removed } = clean(page);
    const after = JSON.stringify(story);
    if (after !== before) {
      page.story = story;
      // keep the create-journal snapshot coherent with the cleaned story
      if (page.journal?.[0]?.type === 'create' && page.journal[0].item) page.journal[0].item.story = story;
      if (!DRY) fs.writeFileSync(fp, JSON.stringify(page, null, 2));
      pagesChanged++; itemsRemoved += removed;
    }
    void linkBefore;
  }
  return { pagesChanged, itemsRemoved, linkifyFixes };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = cleanupSkills();
  console.log(`${DRY ? '[dry] ' : ''}skills-cleanup → ${r.pagesChanged} pages changed · ${r.itemsRemoved} dup items removed · ${r.linkifyFixes} linkify reverts`);
}
