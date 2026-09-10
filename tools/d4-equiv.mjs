// tools/d4-equiv.mjs — the drift guard for the chart D4 reading.
//
// The ✧ present panel recomputes a walk digest and its move labels IN THE BROWSER.
// The MCP computes the same two things in node (lib/key.mjs walkDigest, lib/lattice.mjs
// moveName/moveLabel). Two copies of one rule drift silently — that is the failure this
// repository met on 2026-09-08 from the other direction, when a bake regenerated without
// its postures and every check stayed green.
//
// So this pulls the D4 helpers OUT OF THE SHIPPED PAGE and proves them against the MCP:
// 300 random walks, and every one of the 4,096 vertex pairs on the lattice.
//
//   node tools/d4-equiv.mjs        # run after tools/star-chart.mjs; exits 1 on any drift
//
// Requires ~/agentprivacy-mcp as a sibling checkout (github.com/mitchuski/agentprivacy-mcp).
import fs from 'node:fs';
import { walkDigest } from 'file:///C:/Users/mitch/agentprivacy-mcp/lib/key.mjs';
import { moveName, moveLabel } from 'file:///C:/Users/mitch/agentprivacy-mcp/lib/lattice.mjs';

// pull the D4 helpers OUT OF THE SHIPPED PAGE — test the bytes that deploy
const html = fs.readFileSync('./site/star-chart/index.html', 'utf8');
const a = html.indexOf('const D4DIMS'), b = html.indexOf('function d4Panel');
if (a < 0 || b < 0) { console.error('could not locate the D4 block'); process.exit(1); }
const src = html.slice(a, b);
const F = new Function(src + '; return { d4Canon, d4Move, d4Sha };')();

const pages = JSON.parse(fs.readFileSync('./site/star-chart/data/pages.json','utf8')).pages;
let dOK=0, dBad=0, mOK=0, mBad=0; const bad=[];
for (let t=0; t<300; t++){
  const n = 2 + (t % 5);
  const steps = Array.from({length:n}, () => {
    const p = pages[Math.floor(Math.random()*pages.length)];
    return { site:p.site, slug:p.slug, vertex:p.vertex, element:p.element };
  });
  const mine = await F.d4Sha(F.d4Canon(steps));
  const theirs = walkDigest(steps);
  if (mine === theirs) dOK++; else { dBad++; if(bad.length<3) bad.push({mine, theirs}); }
  for (let i=1; i<steps.length; i++){
    const m1 = F.d4Move(steps[i-1].vertex, steps[i].vertex);
    const m2 = moveLabel(moveName(steps[i-1].vertex, steps[i].vertex));
    if (m1 === m2) mOK++; else { mBad++; if(bad.length<6) bad.push({a:steps[i-1].vertex,b:steps[i].vertex,m1,m2}); }
  }
}
console.log('digest  agree', dOK, ' disagree', dBad);
console.log('moves   agree', mOK, ' disagree', mBad);
if (bad.length) console.log('samples:', JSON.stringify(bad, null, 1));
// exhaustive move check over the whole lattice
let ex=0, exBad=0;
for (let x=0;x<64;x++) for (let y=0;y<64;y++){
  if (F.d4Move(x,y) === moveLabel(moveName(x,y))) ex++; else { exBad++; if(exBad<4) console.log('  MOVE MISMATCH', x, y, F.d4Move(x,y), '!=', moveLabel(moveName(x,y))); }
}
console.log('moves   exhaustive 64x64:', ex, 'agree,', exBad, 'disagree');
process.exit(dBad+mBad+exBad ? 1 : 0);
