// flow/sync-apply.mjs — apply the SYNC MANIFEST to a local/carried FedWiki.
// Diffs a target wiki's pages against the manifest and writes only what changed,
// so a carried editable copy converges on the published guide. Additive: never
// deletes pages the target has that the guide doesn't.
//
//   node flow/sync-apply.mjs <targetWikiRoot> [sourceDir]
//     targetWikiRoot : a FedWiki farm root (e.g. ~/.wiki, or a carried copy)
//     sourceDir      : where to read authoritative JSON (default: ./site)
//
//   --dry   : report what would change, write nothing
//
// (To pull from the live URL instead of a local sourceDir, fetch each page's
//  `url` from sync-manifest.json — see SYNC.md.)

import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const args = process.argv.slice(2).filter(a => a !== '--dry');
const DRY = process.argv.includes('--dry');
const target = args[0];
const sourceDir = args[1] || path.join(ROOT, 'site');

if (!target) { console.error('usage: node flow/sync-apply.mjs <targetWikiRoot> [sourceDir] [--dry]'); process.exit(1); }

const sha = buf => createHash('sha256').update(buf).digest('hex').slice(0, 16);
const manifest = JSON.parse(fs.readFileSync(path.join(HERE, 'sync-manifest.json'), 'utf8'));

let added = 0, updated = 0, same = 0, missingSrc = 0;
for (const [site, info] of Object.entries(manifest.sites)) {
  const tdir = path.join(target, info.host, 'pages');
  fs.mkdirSync(tdir, { recursive: true });
  for (const p of info.pages) {
    const src = path.join(sourceDir, site, `${p.slug}.json`);
    if (!fs.existsSync(src)) { missingSrc++; continue; }
    const srcBuf = fs.readFileSync(src);
    const tfile = path.join(tdir, p.slug);
    const cur = fs.existsSync(tfile) ? sha(fs.readFileSync(tfile)) : null;
    const next = sha(srcBuf);
    if (cur === next) { same++; continue; }
    if (!DRY) fs.writeFileSync(tfile, srcBuf);
    if (cur === null) { added++; console.log(`  + ${site}/${p.slug}`); }
    else { updated++; console.log(`  ~ ${site}/${p.slug}`); }
  }
}
console.log(`\n${DRY ? '[dry] ' : ''}sync: +${added} added · ~${updated} updated · ${same} unchanged${missingSrc ? ` · ${missingSrc} missing in source` : ''}`);
console.log(`target: ${target}`);
