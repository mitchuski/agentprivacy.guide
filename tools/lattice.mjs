// tools/lattice.mjs — the 64-vertex sovereignty lattice, one small module the
// posture CLI and the star-chart bake both import so the bit canon never drifts.
//
// Bit canon (game42 data/game-of-42.json axisSpace · AXIOMS A1; soulbis /sigil;
// agentprivacy_master lib/lattice-vertex.ts; spellweb vertex nodes all agree):
//   d1 protection  = bit 5 = 32     d4 connection  = bit 2 = 4
//   d2 delegation  = bit 4 = 16     d5 computation = bit 1 = 2
//   d3 memory      = bit 3 = 8      d6 value       = bit 0 = 1
// A vertex's binary string b5b4b3b2b1b0 reads d1..d6 left to right.

export const N = 64;
export const DIMS = [
  { d: 1, id: 'protection',  bit: 5, weight: 32, glyph: '🛡️', label: 'Protection'  },
  { d: 2, id: 'delegation',  bit: 4, weight: 16, glyph: '🤝', label: 'Delegation'  },
  { d: 3, id: 'memory',      bit: 3, weight: 8,  glyph: '📜', label: 'Memory'      },
  { d: 4, id: 'connection',  bit: 2, weight: 4,  glyph: '🔗', label: 'Connection'  },
  { d: 5, id: 'computation', bit: 1, weight: 2,  glyph: '⚡', label: 'Computation' },
  { d: 6, id: 'value',       bit: 0, weight: 1,  glyph: '💎', label: 'Value'       },
];
// the star chart's strand ids use 'compute' for d5 — accept both spellings
export const DIM_ALIAS = { compute: 'computation', computing: 'computation', protect: 'protection',
  delegate: 'delegation', connect: 'connection', remember: 'memory', worth: 'value' };
export const byId = Object.fromEntries(DIMS.map(x => [x.id, x]));

export const succ = x => (x + 1) & 63;            // the wheel — visits all 64, returns to 0
export const neg  = x => (64 - x) & 63;           // ⚔️ Swordsman reflection
export const bnot = x => 63 - x;                  // 🧙 Mage antipode
export const popcount = x => { let c = 0; while (x) { c += x & 1; x >>= 1; } return c; };
export const bits = x => x.toString(2).padStart(6, '0');   // "101100" reads d1..d6
export const fromBits = s => { if (!/^[01]{6}$/.test(s)) return null; return parseInt(s, 2); };
export const dimsOf = x => DIMS.filter(d => x & d.weight).map(d => d.id);
export function vertexFromDims(list) {
  let v = 0;
  for (let id of list) { id = String(id).toLowerCase().trim(); id = DIM_ALIAS[id] || id;
    const d = byId[id]; if (!d) return { error: `unknown dimension: ${id}` }; v |= d.weight; }
  return { vertex: v };
}
/** Parse "101100" | "protection memory" | "d1 d3" | "V44" | "44" → vertex or null. */
export function parsePosture(raw) {
  const s = String(raw || '').trim();
  if (!s) return null;
  if (/^[01]{6}$/.test(s)) return fromBits(s);
  const mv = s.match(/^v?(\d{1,2})$/i); if (mv) { const n = +mv[1]; return n >= 0 && n < 64 ? n : null; }
  const toks = s.split(/[\s,+·|]+/).filter(Boolean).map(t => t.replace(/^d([1-6])$/i, (_, k) => DIMS[+k - 1].id));
  const r = vertexFromDims(toks); return r.error ? null : r.vertex;
}
/**
 * Name the lattice move from vertex a to vertex b. The three named operators of
 * the lattice first; then a single bit-flip (a Hamming-1 edge, ∂M); otherwise a
 * multi-bit jump flagged as such with the dimensions that changed.
 */
export function moveName(a, b) {
  if (a == null || b == null) return { op: 'none', flipped: [] };
  if (a === b) return { op: 'stay', flipped: [] };
  const x = a ^ b, flipped = DIMS.filter(d => x & d.weight).map(d => d.id);
  if (b === succ(a)) return { op: 'succ', flipped };
  if (b === neg(a))  return { op: 'neg',  flipped };
  if (b === bnot(a)) return { op: 'bnot', flipped };
  if (flipped.length === 1) return { op: 'flip', flipped };
  return { op: 'jump', flipped, bitsChanged: flipped.length };
}
export const moveLabel = m => m.op === 'flip' ? `flip ${m.flipped[0]}`
  : m.op === 'jump' ? `jump ×${m.bitsChanged} (${m.flipped.join(' ')})` : m.op;

// ---- the posture story item ---------------------------------------------------
// Fedwiki-native: a story item of type 'posture' whose text is key: value lines,
// the same shape as tileglyph / starpath / roster on this farm. Forks carry it.
//   posture: 101100
//   dims: protection memory
//   by: keeper | suggested (keyword rule v0) | <anyone>
export function readPostureItem(page) {
  for (const it of (Array.isArray(page?.story) ? page.story : [])) {
    if (it.type !== 'posture') continue;
    const kv = {};
    for (const line of String(it.text || '').split('\n')) {
      const m = line.match(/^\s*([a-z]+)\s*:\s*(.+)$/i); if (m) kv[m[1].toLowerCase()] = m[2].trim();
    }
    const v = parsePosture(kv.posture) ?? parsePosture(kv.dims);
    if (v == null) continue;
    return { vertex: v, bits: bits(v), dims: dimsOf(v), by: kv.by || '', id: it.id };
  }
  return null;
}
export function postureText(v, by) {
  return `posture: ${bits(v)}\ndims: ${dimsOf(v).join(' ') || 'none'}\nby: ${by || 'keeper'}`;
}
