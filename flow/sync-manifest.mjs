// flow/sync-manifest.mjs — emit the SYNC MANIFEST.
// Inventories every guide page with a content hash + its JSON URL, so a local
// FedWiki (or an agent driving one) can diff and pull only what changed.
// Reads the live wiki (source of truth); writes flow/sync-manifest.json and a
// published copy at site/sync-manifest.json (→ guide.agentprivacy.ai/sync-manifest.json).
//
// Run:  node flow/sync-manifest.mjs

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HOME = os.homedir();
const WIKI = path.join(HOME, '.wiki');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const SITES = ['guide', 'skill', 'spellbooks', 'grimoire', 'research', 'atlas', 'city', 'tomes', 'game42', 'spellbook'];
const GUIDE_BASE = 'https://guide.agentprivacy.ai';

const sha = buf => createHash('sha256').update(buf).digest('hex').slice(0, 16);

const manifest = {
  manifestVersion: 1,
  guideBase: GUIDE_BASE,
  note: 'Source of truth = the live FedWiki this was generated from. Use to sync a local/carried wiki.',
  sites: {},
  totals: { sites: 0, pages: 0 },
};

for (const site of SITES) {
  const dir = path.join(WIKI, `${site}.localhost`, 'pages');
  if (!fs.existsSync(dir)) continue;
  const pages = [];
  for (const slug of fs.readdirSync(dir)) {
    const raw = fs.readFileSync(path.join(dir, slug));
    let title = slug; try { title = JSON.parse(raw.toString('utf8')).title || slug; } catch {}
    pages.push({ slug, title, sha256: sha(raw), json: `${site}/${slug}.json`, url: `${GUIDE_BASE}/${site}/${slug}.json` });
  }
  pages.sort((a, b) => a.slug.localeCompare(b.slug));
  manifest.sites[site] = { host: `${site}.localhost`, count: pages.length, pages };
  manifest.totals.sites++;
  manifest.totals.pages += pages.length;
}

const json = JSON.stringify(manifest, null, 1);
fs.writeFileSync(path.join(HERE, 'sync-manifest.json'), json);
const sitePath = path.join(ROOT, 'site', 'sync-manifest.json');
if (fs.existsSync(path.dirname(sitePath))) fs.writeFileSync(sitePath, json);
console.log(`sync-manifest → ${manifest.totals.pages} pages across ${manifest.totals.sites} sites`);
console.log(`  flow/sync-manifest.json  +  site/sync-manifest.json`);
