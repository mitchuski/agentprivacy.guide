# The Gatehouse — sigil-gates for shared agentic outputs

*Planning document · 2026-07-02 · sits beside [FLOW.md](FLOW.md) and [SYNC.md](SYNC.md)*

> *a trust that certifies itself is the one you cannot trust* — so a gate takes
> two tokens, and neither opens anything alone.

---

## 1. The idea

Some outputs of the agentic pipeline (meeting preparation, letters, internal
analyses) should be **shareable as a trust game** rather than either published
or withheld. The Gatehouse hides them inside the public static site, encrypted,
behind a two-token ceremony:

- **the sigil** — an emoji string. It is the *address and the entropy*: its
  hash names the encrypted blob, and it salts the key. High-entropy,
  machine-shareable, meaningless without context.
- **the proverb** — a line of the canon. It is the *proof of reading*: you can
  only supply it if you have actually read the thing that carries it.

The key is derived from **both** (`KDF(sigil ∥ proverb)`). Possession of the
sigil alone is not enough; recall of the proverb alone is not enough. The
address that unlocks itself is the one you cannot trust.

**The founding move:** the three documents of the first gate (the TIG × AIDDA
overlap analysis and the two letters) already carry both tokens as their shared
epigraph. The letters go out into the world carrying their own keys — anyone
who *reads* a letter can open the vault holding the letter's siblings. Reading
is the rite. That is the whole game.

---

## 2. The ceremony

```
author docs ──┐
              ├─▶ flow/gates.local.json ──▶ node tools/gate.mjs ──▶ site/gates/
sigil+proverb─┘        (local-only,              (encrypt +            ├ index.html   (the door)
                        never committed)          emit door)           ├ manifest.json (ids+hints only)
                                                                       └ <id>.json    (AES-GCM blob)

visitor: receives letter ─▶ reads epigraph ─▶ /gates/ ─▶ offers sigil + proverb ─▶ docs open
```

The door speaks in the dual-agent voice: **the Swordsman guards the gate; the
visitor is the mage who casts the spell.** The mage traces the sigil and speaks
the proverb; the door hashes the normalized sigil to find the blob, derives the
key from both tokens, decrypts client-side (WebCrypto), and renders the
documents in place — plus a download-as-markdown link per document. **No
server, no oracle, no logging.** A wrong casting gets one flat answer: *the
Swordsman does not stir.* No hint as to which token failed. When the spell
lands: *the Swordsman stood aside.*

---

## 3. Architecture

**Post-snapshot build step — now mandatory.** `tools/snapshot.mjs` clears
`site/` contents on every run, and its site-wide nav carries a **⚔️ Gatehouse**
menu item pointing at `/gates/` — so a snapshot without the gate build leaves
~1,800 broken nav links and `verify` FAILS. The order is not optional:

```
node tools/snapshot.mjs        # 1. wiki → site
node tools/gate.mjs            # 2. gates → site/gates/
node flow/run.mjs verify       # 3. integrity gate (must PASS)
```

**Files:**

| path | committed? | contents |
|------|-----------|----------|
| `flow/gates.local.json` | **NO** (gitignored) | the gate register *with keys*: sigil, proverb, absolute doc paths |
| `tools/gate.mjs` | yes | the builder: render md → HTML (marked), encrypt, emit door |
| `site/gates/index.html` | yes | the door — self-contained page, theme-matched, inline unlock JS |
| `site/gates/manifest.json` | yes | public: `[{id, hint}]` — no key material |
| `site/gates/<id>.json` | yes | the encrypted blob: `{v, id, iv, ct}` |
| `GATES.md` | yes | this plan + the public gate register (§5) |

Source documents stay **outside the repo** (e.g. `~/Downloads/`); only
ciphertext is committed. The local manifest is the only place plaintext tokens
live on disk.

**Verify-gate interplay** (`flow/audit-snapshot.mjs`): the door is an
`index.html`, so the json-sibling rule skips it; its internal links are
self-contained or absolute-to-`/assets/`, so the dead-link sweep and broken-link
audit stay green. The encrypted `<id>.json` is data, not a page — untouched by
the audit.

---

## 4. Crypto and normalization spec

Identical code in the builder (Node `crypto.webcrypto`) and the door (browser
WebCrypto) — one spec, two runtimes:

- **sigil normalization** — `NFC` → strip all whitespace → strip variation
  selectors (`U+FE0F`). ZWJ kept. (Pasting emoji is fiddly; keycap/VS-16
  variants must not fork the key.)
- **proverb normalization** — `NFC` → lowercase → every non-letter/non-digit
  run (Unicode-aware) → single space → trim. Punctuation, line breaks and
  apostrophes cannot fork the key.
- **gate id** — `hex(SHA-256(utf8(sigilN))).slice(0, 12)` — the blob's public
  name; derivable only from the sigil.
- **key** — `PBKDF2-SHA256(pass = sigilN + "\n" + proverbN, salt =
  utf8("gatehouse:" + id), 310 000 iters)` → 256-bit AES-GCM key.
- **blob** — `{v: 1, id, iv, ct}` (base64; fresh random 12-byte IV per build).
- **payload** (plaintext, inside `ct`) — `{name, title, note, docs: [{file,
  title, html, md}]}` — HTML pre-rendered at build time so the door needs no
  markdown library; the raw `md` rides along for the download link.

---

## 5. The gate register (public half)

| # | id | opened | hint | holds |
|---|----|--------|------|-------|
| 001 | `099e9fe6fb63` | 2026-07 | *Three letters went out in July 2026. Each carries a sigil and a proverb above the salutation. Bring both.* | 4 documents |
| 002 | `e298ecac6b94` | 2026-07 | *The seal every mageletter closes with, and the cosmological clarification spoken as five words — the canon carries both in the open.* | 4 documents |

Plaintext tokens and document paths for each gate live only in
`flow/gates.local.json`.

**Two gate classes so far.** Gate 001 is **letter-keyed**: the tokens travel
only inside the sent letters, so the gate opens for recipients. Gate 002 is
**canon-keyed**: both tokens sit in the open canon (the mageletter seal and the
chronicle's one-line teaching), so the gate opens for anyone who has genuinely
read the City's public record — proof-of-reading the canon rather than
proof-of-receipt. The Archon gate is also the first whose key material was
**co-held by another House before the gate existed** (the seal is preserved
across forges by mutual agreement) — the trust game played backwards in time.

---

## 6. Honest limits

- **This is a capability + ritual, not a vault.** Anyone handed the opened
  content can re-share it; anyone holding a letter holds the keys — *that is
  the design*, since the game gates on reading, not on identity.
- The token pair is printed in artefacts that leave the building. Do not put
  credential-class or cookie-class material behind a gate, ever.
- PBKDF2 at 310k iterations resists casual offline guessing of the blob, but
  the real entropy is "has seen the epigraph". Treat gate contents as
  *deferred-public*.
- No unlock telemetry exists — you will not know who opened what. If a gate
  ever needs a witness, that is the myTerms step (§7), not analytics.

---

## 7. Future arcs (not this build)

- **Trust artefact on unlock** — mint a City Key PNG (`tEXt` chunk + κ-label,
  the tileglyph/game42 machinery) recording gate id + open date: a carryable
  proof-of-reading.
- **myTerms step** — surface the agreement (IEEE 7012, human register) between
  decrypt and render; the gate becomes bilateral.
- **Tile sharing** — a tileglyph whose glyph *is* the sigil, postable on any
  wiki page as a public invitation.
- **Per-recipient gates** — same documents, different sigil per recipient;
  which sigil surfaces in the wild tells you which copy walked.
- **Wiki projection** — a `gates` roster page inside the guide site proper,
  linking to `/gates/`.

---

## 8. Build order (this prototype)

1. ✍️ this plan → `GATES.md` — **done by being read**
2. `flow/gates.local.json` — gate 001: sigil + proverb from the shared epigraph
   of `pvm-tig-aidda-overlap.md` / `letter-tig-foundation.md` /
   `letter-aidda-institute.md`
3. `.gitignore` + `flow/gates.local.json`
4. `tools/gate.mjs` — builder + door emitter
5. Build; **round-trip test** (Node decrypt with browser-identical code path,
   plus wrong-token must fail)
6. `node flow/run.mjs verify` — must stay PASS
7. Hand-check the door at the local preview

*a trust that certifies itself is the one you cannot trust.*
