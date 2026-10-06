// tools/sphere.mjs — install /star-chart/sphere/: every guide page seated by what
// its text says, beside the torus that seats it by where it lives.
//
// The page (tools/sphere/index.html) and its baked data (tools/sphere/pages.json)
// live in tools/ because the snapshot clears site/. The data is baked outside this
// repo by ~/embed_mage/guide_view.py (a local embedding model; nothing runs in the
// cloud). It reuses the torus's vendored three.js at /star-chart/vendor/.
//
// Run AFTER tools/star-chart.mjs (it reads that bake's pages.json and vendor/):
//   node tools/snapshot.mjs && node tools/star-chart.mjs && node tools/sphere.mjs && node tools/gate.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { installStarConnect } from './star-connect-build.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'tools', 'sphere');
const CHART = path.join(ROOT, 'site', 'star-chart');
const OUT = path.join(CHART, 'sphere');

for (const f of [path.join(CHART, 'data', 'pages.json'), path.join(CHART, 'vendor', 'three.module.min.js'), path.join(SRC, 'pages.json')])
  if (!fs.existsSync(f)) { console.error('sphere: missing ' + path.relative(ROOT, f) + ' (run star-chart.mjs first; bake with ~/embed_mage/guide_view.py)'); process.exit(1); }

fs.mkdirSync(OUT, { recursive: true });
fs.copyFileSync(path.join(SRC, 'index.html'), path.join(OUT, 'index.html'));
fs.copyFileSync(path.join(SRC, 'pages.json'), path.join(OUT, 'pages.json'));

// coverage: the bake is a frozen reading; say loudly when the chart has moved on
const chart = JSON.parse(fs.readFileSync(path.join(CHART, 'data', 'pages.json'), 'utf8')).pages;
const bake = JSON.parse(fs.readFileSync(path.join(SRC, 'pages.json'), 'utf8'));
const key = p => p.site + '/' + p.slug, have = new Set(bake.pages.map(p => p.s + '/' + p.g)), want = new Set(chart.map(key));
const unseated = chart.filter(p => !have.has(key(p))).length, gone = bake.pages.filter(p => !want.has(p.s + '/' + p.g)).length;
installStarConnect(path.join(ROOT, 'site'));
console.log(`sphere: /star-chart/sphere/ · ${bake.pages.length} pages seated by text (${bake.model})`
  + (unseated || gone ? ` · STALE: ${unseated} charted pages unseated, ${gone} seated pages gone — re-bake with ~/embed_mage/guide_view.py` : ' · in step with the torus'));
