// Refresh presentation in an existing public snapshot without rebuilding the farm or gates.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { enhanceGuidespace } from './guidespace.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../site');
let changed = 0;
function visit(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.isSymbolicLink()) continue;
    const file = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (dir === root && ['gates', 'star-chart'].includes(item.name)) continue;
      visit(file);
    } else if (item.name.endsWith('.html')) {
      const original = fs.readFileSync(file, 'utf8');
      const next = enhanceGuidespace(original, { home: file === path.join(root, 'index.html') });
      if (next !== original) { fs.writeFileSync(file, next); changed++; }
    }
  }
}
visit(root);
console.log(`Updated ${changed} public HTML pages; JSON, assets, gates and Star Chart untouched.`);
