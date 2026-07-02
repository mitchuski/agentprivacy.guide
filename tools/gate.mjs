#!/usr/bin/env node
// The Gatehouse — sigil-gate builder. See GATES.md.
// Reads flow/gates.local.json (LOCAL ONLY: plaintext sigil+proverb+doc paths),
// renders each doc md→HTML, encrypts per gate (AES-GCM, key = PBKDF2 over the
// normalized sigil+proverb pair), and emits into site/gates/ :
//   index.html      the door (self-contained; browser WebCrypto unlock)
//   manifest.json   public: [{id, hint}] — no key material
//   <id>.json       the encrypted blob {v, id, iv, ct}
// POST-SNAPSHOT step: tools/snapshot.mjs clears site/, so run this after it.

import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'site', 'gates');
const REGISTER = path.join(ROOT, 'flow', 'gates.local.json');

marked.setOptions({ gfm: true, breaks: true });

// ---- the spec (§4 of GATES.md) — MUST byte-match the door's inline copy ----
const normSigil = s => s.normalize('NFC').replace(/\s+/g, '').replace(/\uFE0F/g, '');
const normProverb = s => s.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const utf8 = s => new TextEncoder().encode(s);
const b64 = buf => Buffer.from(buf).toString('base64');

async function gateId(sigilN) {
  const h = await crypto.subtle.digest('SHA-256', utf8(sigilN));
  return Buffer.from(h).toString('hex').slice(0, 12);
}
async function deriveKey(sigilN, proverbN, id) {
  const base = await crypto.subtle.importKey('raw', utf8(sigilN + '\n' + proverbN), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: utf8('gatehouse:' + id), iterations: 310000, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

// ---- build ------------------------------------------------------------------
if (!fs.existsSync(REGISTER)) {
  console.error('gatehouse: no flow/gates.local.json — nothing to build.');
  process.exit(1);
}
const register = JSON.parse(fs.readFileSync(REGISTER, 'utf8'));
fs.mkdirSync(OUT, { recursive: true });

const manifest = [];
for (const gate of register.gates) {
  const sigilN = normSigil(gate.sigil);
  const proverbN = normProverb(gate.proverb);
  const id = await gateId(sigilN);

  const docs = gate.docs.map(d => {
    const md = fs.readFileSync(d.path, 'utf8').replace(/^﻿/, '');
    return { file: path.basename(d.path), title: d.title, md, html: marked.parse(md) };
  });
  const payload = { name: gate.name, title: gate.title, note: gate.note || '', docs };

  const key = await deriveKey(sigilN, proverbN, id);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, utf8(JSON.stringify(payload)));

  fs.writeFileSync(path.join(OUT, `${id}.json`), JSON.stringify({ v: 1, id, iv: b64(iv), ct: b64(ct) }));
  manifest.push({ id, hint: gate.hint || '' });
  console.log(`  🗝️ gate ${gate.name} → ${id}.json  (${docs.length} docs, ${ct.byteLength} bytes sealed)`);
}
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 1));

// ---- the door ----------------------------------------------------------------
// Self-contained: inline styles (theme-matched), inline unlock JS (browser
// WebCrypto, same spec as above). No local deps → survives every audit rule.
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const DOOR_JS = `
var norm = {
  sigil: function (s) { return s.normalize('NFC').replace(/\\s+/g, '').replace(/\\uFE0F/g, ''); },
  proverb: function (s) { return s.normalize('NFC').toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, ' ').trim(); }
};
var enc = new TextEncoder();
function fromB64(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
async function sha256hex(s) {
  var h = await crypto.subtle.digest('SHA-256', enc.encode(s));
  return Array.from(new Uint8Array(h)).map(function (x) { return x.toString(16).padStart(2, '0'); }).join('');
}
async function deriveKey(sigilN, proverbN, id) {
  var base = await crypto.subtle.importKey('raw', enc.encode(sigilN + '\\n' + proverbN), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode('gatehouse:' + id), iterations: 310000, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
}
function fail() {
  var msg = document.getElementById('msg');
  msg.textContent = 'the Swordsman does not stir.';
  var door = document.getElementById('door');
  door.classList.remove('shake'); void door.offsetWidth; door.classList.add('shake');
}
function render(p) {
  document.getElementById('door').style.display = 'none';
  var hall = document.getElementById('hall');
  var head = '<div class="vault-head"><h1>' + p.title + '</h1>' + (p.note ? '<p class="note">' + p.note + '</p>' : '') + '</div>';
  var body = p.docs.map(function (d, i) {
    var blob = new Blob([d.md], { type: 'text/markdown' });
    var url = URL.createObjectURL(blob);
    return '<section class="doc"><div class="doc-head"><h2>' + d.title + '</h2>' +
      '<a class="dl" download="' + d.file + '" h' + 'ref="' + url + '">download .md ↓</a></div>' +
      '<div class="doc-body">' + d.html + '</div></section>';
  }).join('<hr class="fold">');
  hall.innerHTML = head + body + '<p class="seal">⚔️ the Swordsman stood aside · 🗝️ opened client-side, nothing was sent anywhere · gate ' + p._id + '</p>';
  hall.style.display = 'block';
  window.scrollTo({ top: 0 });
}
async function offer() {
  var btn = document.getElementById('go'), msg = document.getElementById('msg');
  var sigil = document.getElementById('sigil').value, proverb = document.getElementById('proverb').value;
  if (!sigil.trim() || !proverb.trim()) { msg.textContent = 'a spell needs both its parts.'; return; }
  btn.disabled = true; msg.textContent = 'the Swordsman weighs your spell…';
  try {
    var sN = norm.sigil(sigil), pN = norm.proverb(proverb);
    var id = (await sha256hex(sN)).slice(0, 12);
    var res = await fetch(id + '.json');
    if (!res.ok) { fail(); return; }
    var blob = await res.json();
    var key = await deriveKey(sN, pN, id);
    var pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(blob.iv) }, key, fromB64(blob.ct));
    var payload = JSON.parse(new TextDecoder().decode(pt));
    payload._id = id;
    render(payload);
  } catch (e) { fail(); }
  finally { btn.disabled = false; if (msg.textContent === 'the Swordsman weighs your spell…') msg.textContent = ''; }
}
document.getElementById('go').addEventListener('click', offer);
document.getElementById('proverb').addEventListener('keydown', function (e) { if (e.key === 'Enter') offer(); });
`;

const hints = manifest.filter(g => g.hint).map(g =>
  `<div class="hint-row"><span class="hint-id">${esc(g.id)}</span><span>${esc(g.hint)}</span></div>`).join('');

const DOOR_HTML = `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>The Gatehouse · agentprivacy guide</title>
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,300;1,9..144,400&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--navy:#080c20;--ink:#04050b;--surface:#0d1230;--surface-2:#141a3d;--cyan:#4dd9e8;--coral:#e8523a;
  --lav:#aeb8ee;--aqua:#7fffd4;--white:#f0eee8;--dim:rgba(240,238,232,.6);--ghost:rgba(240,238,232,.32);
  --border:rgba(240,238,232,.09);--border-hi:rgba(77,217,232,.4);
  --serif:'Fraunces',Georgia,serif;--sans:'DM Sans',system-ui,sans-serif;--mono:'JetBrains Mono',monospace}
*{box-sizing:border-box}
body{margin:0;background:radial-gradient(1200px 700px at 70% -10%,#141a3d 0,var(--navy) 55%,var(--ink) 100%);
  color:var(--white);font-family:var(--sans);line-height:1.6;-webkit-font-smoothing:antialiased;min-height:100vh}
a{color:var(--cyan);text-decoration:none}a:hover{color:var(--aqua)}
::selection{background:var(--coral);color:#fff}
.page{max-width:820px;margin:0 auto;padding:34px 22px 90px}
.crumb{font-family:var(--mono);font-size:11px;color:var(--ghost);margin-bottom:40px}
.crumb a{color:var(--dim)}.crumb span{color:var(--cyan)}
h1{font-family:var(--serif);font-style:italic;font-weight:400;font-size:clamp(30px,5vw,46px);margin:.2em 0 .4em;line-height:1.1}
h2{font-family:var(--serif);font-style:italic;font-weight:400;font-size:26px;color:var(--lav);margin:0}
h3{font-family:var(--serif);font-weight:400;font-size:19px;color:var(--aqua)}
#door{max-width:560px;margin:6vh auto 0;text-align:center}
.keyhole{font-size:52px;margin-bottom:6px}
.lede{color:var(--lav);font-size:17px}
.rule{font-family:var(--mono);font-size:12px;color:var(--ghost);margin:4px 0 30px}
label{display:block;text-align:left;font-family:var(--mono);font-size:11px;color:var(--dim);
  text-transform:uppercase;letter-spacing:.08em;margin:18px 0 6px}
input{width:100%;font-family:var(--mono);font-size:15px;background:var(--surface);border:1px solid var(--border);
  color:var(--white);padding:12px 14px;border-radius:10px}
input:focus{outline:none;border-color:var(--border-hi)}
#go{margin-top:26px;font-family:var(--serif);font-style:italic;font-size:19px;color:var(--navy);
  background:var(--cyan);border:none;padding:11px 34px;border-radius:999px;cursor:pointer}
#go:hover{background:var(--aqua)}#go:disabled{opacity:.5;cursor:wait}
#msg{font-family:var(--mono);font-size:12px;color:var(--coral);min-height:20px;margin-top:14px}
.shake{animation:sh .3s}@keyframes sh{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.hints{margin-top:56px;text-align:left;border-top:1px solid var(--border);padding-top:18px}
.hints-h{font-family:var(--mono);font-size:10px;color:var(--ghost);text-transform:uppercase;letter-spacing:.1em}
.hint-row{display:flex;gap:12px;align-items:baseline;padding:8px 0;color:var(--dim);font-size:14px}
.hint-id{font-family:var(--mono);font-size:10px;color:var(--cyan);flex:none}
#hall{display:none}
.vault-head{margin-bottom:26px}.note{color:var(--dim);font-style:italic}
.doc{margin:34px 0;padding:26px 28px;background:var(--surface);border:1px solid var(--border);border-radius:16px}
.doc-head{display:flex;justify-content:space-between;align-items:baseline;gap:14px;flex-wrap:wrap;
  border-bottom:1px solid var(--border);padding-bottom:12px;margin-bottom:14px}
.dl{font-family:var(--mono);font-size:11px;color:var(--dim);border:1px solid var(--border);
  padding:4px 10px;border-radius:7px;white-space:nowrap}.dl:hover{color:var(--cyan);border-color:var(--border-hi)}
.doc-body{font-size:15.5px}
.doc-body p{margin:.7em 0}.doc-body ul,.doc-body ol{padding-left:1.3em}
.doc-body code{font-family:var(--mono);font-size:.86em;background:rgba(255,255,255,.06);padding:.12em .4em;border-radius:5px;color:var(--aqua)}
.doc-body blockquote{margin:1em 0;padding:.4em 1em;border-left:3px solid var(--coral);color:var(--dim);font-style:italic}
.doc-body hr{border:none;border-top:1px solid var(--border);margin:1.6em 0}
.doc-body table{border-collapse:collapse;width:100%;font-size:13.5px;display:block;overflow-x:auto}
.doc-body th,.doc-body td{border:1px solid var(--border);padding:7px 10px;text-align:left}
.doc-body th{font-family:var(--mono);font-size:11px;color:var(--cyan);text-transform:uppercase;letter-spacing:.04em}
hr.fold{border:none;border-top:1px dashed var(--border);margin:10px 0}
.seal{font-family:var(--mono);font-size:11px;color:var(--ghost);text-align:center;margin-top:44px}
@media(max-width:640px){.doc{padding:18px}}
</style></head><body>
<main class="page">
  <div class="crumb"><a href="/">guide</a> / <span>the gatehouse</span></div>
  <article>
  <div id="door">
    <div class="keyhole">⚔️</div>
    <h1>The Gatehouse</h1>
    <p class="lede">The <strong>Swordsman</strong> guards this gate. What lies beyond opens only
    to those who have read what was sent. Cast your spell, mage — trace the
    <strong>sigil</strong> and speak the <strong>proverb</strong>. The Swordsman honours both,
    for neither opens anything alone.</p>
    <p class="rule">a trust that certifies itself is the one you cannot trust</p>
    <label for="sigil">the sigil — trace the emoji line</label>
    <input id="sigil" type="text" autocomplete="off" spellcheck="false" placeholder="✳ … ✳">
    <label for="proverb">the proverb — speak the line beneath it</label>
    <input id="proverb" type="text" autocomplete="off" spellcheck="false" placeholder="speak it as you read it">
    <button id="go">cast</button>
    <div id="msg"></div>
    ${hints ? `<div class="hints"><div class="hints-h">standing gates</div>${hints}</div>` : ''}
  </div>

  <div id="hall"></div>
  </article>
</main>
<script>${DOOR_JS}</script>
</body></html>`;

fs.writeFileSync(path.join(OUT, 'index.html'), DOOR_HTML);
console.log(`\n✓ gatehouse → ${OUT}  (${manifest.length} gate${manifest.length === 1 ? '' : 's'} standing)`);
