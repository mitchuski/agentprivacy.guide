# agentprivacy.guide

The **published, static** projection of the agentprivacy guide federation —
served at **[guide.agentprivacy.ai](https://guide.agentprivacy.ai)** (Cloudflare Pages).

This repo holds the generated static site (`site/`) plus the tooling that builds
it (`tools/`, `flow/`). It is a *snapshot*: the living, editable wiki runs locally
from `~/.wiki` and is the source of truth; this repo is the public face.

---

## 1. The idea — live source, static publish

```
source repos ──build──▶ live ~/.wiki ──snapshot──▶ ./site ──push──▶ guide.agentprivacy.ai
  (canon)              (FedWiki farm)            (this repo)         (Cloudflare Pages)
                            │
                       (workshops / live governance — optional Cloudflare Tunnel)
```

- **`~/.wiki`** — the live [FedWiki](http://fed.wiki.org/) farm. Private, editable,
  the place real workshops and live governance happen. Holds farm secrets; never
  published. Can be exposed for a live session via a Cloudflare Tunnel.
- **this repo** — the *static snapshot* + the snapshotter. Public, safe to host.
  "Publishing" = re-snapshotting, committing, and pushing; Pages redeploys.

The snapshot is **hybrid**: every page is rendered both as a styled HTML document
(for readers) and as byte-faithful **JSON** (for machines — each page stays
forkable into any FedWiki). The dev-host names are stripped; the JSON points at
the public origin.

---

## 2. The federation

Path-based under one origin, so every page links to every other with plain
relative paths. Two spellbooks frame the canon:

| path | site | role |
|------|------|------|
| `/` | guide | the front door — website directory + federation map |
| `/spellbooks/` | **First Person Spellbook** ("I") | privacymage's narrative — Story · Zero · Canon · Society · Plurality + Selene's poems |
| `/city/` → `/city/tomes/` | **City of Mages** / **Second Person Spellbook** ("you") | the Tomes (acts I–IX), cast, City grimoire |
| `/grimoire/` | grimoire | the privacymage grimoire v10.4 as atoms — spells · vertices · incantations · blades · proverbs · principles |
| `/research/` | research | the privacy-value model V(π,t) + the conjecture register C1–C93 |
| `/atlas/` | atlas | the knowledge graph — one page per node, edges as wikilinks |
| `/skill/` | skill | the skill library — 165 skills + 42 personas |

**Sibling wikis** (own hosts, folded into the snapshot, single source each):
`/game42/` and `/mouse-spellbook/`.

Source hosts live at `~/.wiki/<host>.localhost/pages/` (`spellbooks`, `tomes`,
`grimoire`, `research`, `atlas`, `skill`, `guide`, `city`, `game42`, `spellbook`).

---

## 3. The snapshotter — `tools/snapshot.mjs`

Reads the live farm and emits `./site`. One pass produces, per page:
`<slug>.html` (styled) · `<slug>.json` (forkable) · per-site `system/sitemap.json`
· a client-side `search-index.json`.

What it handles:

- **Path-based projection** — each host maps to an output path (`library` →
  `/spellbooks/`, `tomes` → `/city/tomes/`), with cross-site links rewritten to
  match.
- **Link resolution** — FedWiki `[[Page Title]]` links resolve against the real
  page *filenames and titles* (so emoji / apostrophe titles don't 404).
- **Mojibake repair** — emoji stored double-encoded (UTF-8-as-CP1252) are
  recovered for display; the JSON is left byte-faithful.
- **De-localhost** — every `*.localhost:3030` dev-host name is stripped from the
  published HTML / JSON / search / assets (JSON → `guide.agentprivacy.ai`).
- **Dead-link sweep** — a final pass de-links any local target that doesn't
  resolve (dead repo-file `.md` refs, missing images → alt text), so **nothing
  errors**. Nested anchors are flattened.
- **Theme** — agentprivacy × soulbis: navy ground, Fraunces italic display, DM
  Sans body, JetBrains Mono metadata; cyan / coral / lavender accents.

Output is anchored to the repo (`<repo>/site`), and the build clears the
directory *contents* (not the dir) so it works while a preview server holds it.

---

## 4. The dream cycle — `flow/`

A standing research loop that keeps the static guide rebound to the source.
Four stages, one human gate. See [`flow/DREAM-CYCLE.md`](flow/DREAM-CYCLE.md).

```
1. RESEARCH   node flow/run.mjs audit          → which canon is the wiki missing?
2. GATE       (you) decide what to fill
3. BUILD      node flow/run.mjs build <site>    → write canon into ~/.wiki
4. SNAPSHOT   node flow/run.mjs snapshot        → ./site
   VERIFY     node flow/run.mjs verify          → integrity gate (must PASS)
```

**Builders** (`flow/builders/`) — each writes versioned, `[[linked]]`,
hub-backlinked pages into the live wiki, additively and idempotently:

| builder | fills |
|---------|-------|
| `grimoire.mjs` | v10.4 atoms — forged blades · proverbs · principles · incantations |
| `research.mjs` | Band IX conjectures C90–C93 + the Limitative Reading |
| `research-notes.mjs` | the distinct V6 working notes (title-deduped) |
| `crosslinks.mjs` | prev/next on sequential acts (tomes + spellbooks) |
| `skills-cleanup.mjs` | linkify reverts + duplicate-block removal on skill pages |

This pipeline is itself a skill in the agentprivacy suite:
`wikis/agentprivacy-wiki-dream-cycle` (kept by the Librarian 🗃️, authored by the
Chronicler 🧙📖).

### The pre-deploy gate — `flow/audit-snapshot.mjs`

Walks every emitted page and link. **PASS** means: no empty pages, no broken
links of any kind, every page has its `.json` sibling, no dev-host leaks — every
destination is a real text document.

```sh
node flow/run.mjs verify
```

### Carry-able sync — `SYNC.md`

`flow/sync-manifest.mjs` + `flow/sync-apply.mjs` let a separate local FedWiki pull
the guide by content hash (forkable, no duplication). See [`SYNC.md`](SYNC.md).

---

## 5. Repo layout

```
agentprivacy.guide/
├── site/                  the published static site (committed; Pages serves this)
├── tools/snapshot.mjs     the snapshotter (~/.wiki → ./site)
├── flow/
│   ├── run.mjs            orchestrator: audit | build <site> | snapshot | verify | cycle
│   ├── audit.mjs          stage 1 — diff sources vs the live wiki
│   ├── audit-snapshot.mjs the pre-deploy integrity gate
│   ├── builders/          one builder per fillable area
│   ├── sync-manifest.mjs  + sync-apply.mjs — carry-able-wiki sync
│   └── DREAM-CYCLE.md     the loop convention
├── README.md · FLOW.md · SYNC.md
└── package.json           (only dependency: marked, for snapshot rendering)
```

Not committed (local-only): `flow/.farm-backups/`, `flow/.hub-backups/`,
`flow/dream/`, `flow/GUIDE-DREAM-SUGGESTIONS.md`, `node_modules/`.

---

## 6. Build & deploy

```sh
npm install                 # once — installs marked
node tools/snapshot.mjs     # build ./site from ~/.wiki
node flow/run.mjs verify    # integrity gate — must PASS before deploy

# preview locally (serve from a cwd OUTSIDE ./site):
python -m http.server 3200 --directory site
#   → http://127.0.0.1:3200/

# publish:
git add -A && git commit -m "snapshot: <date>" && git push
```

**Cloudflare Pages** (serves the prebuilt `site/` — no cloud build, since it
can't reach `~/.wiki`):

- Connect this repo · Production branch `main`
- Framework preset **None** · Build command **(empty)** · Output directory **`site`**
- Custom domain → `guide.agentprivacy.ai`

Every push to `main` redeploys.

---

## 7. Status

~1,840 pages across the federation, **0 broken links** (integrity-audited). Built
from the live `~/.wiki` farm; canon at grimoire v10.4 / conjecture register C93.

*The git repositories remain the source of truth; this wiki is a projection that
records its origin. Read it, fork it, carry it away with its lineage.*
