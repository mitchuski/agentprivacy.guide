# The core flow — keeping the guide rebound to source

A standing loop that keeps the **static** `guide.agentprivacy.ai` rebound to the
**live** FedWiki (`~/.wiki`) and to the `/mitch` source repos. Four stages, one
human gate, repeated until you're comfortable to push.

```
1. RESEARCH   node flow/run.mjs audit
              scan source dirs → diff vs live FedWiki → flow/gap-report.json

2. GATE       (you) read the report, decide which gaps to fill

3. BUILD      node flow/run.mjs build <site>
              write FedWiki pages into ~/.wiki  (journal-versioned, [[linked]],
              hub backlinks). Additive + idempotent.

4. SNAPSHOT   node flow/run.mjs snapshot
              ~/.wiki → ./site  (then: serve & review on :3200)

   ↺ loop until comfortable → commit + push → Cloudflare Pages redeploys
     (the live ~/.wiki stays your editable, tunnel-able carry copy)
```

One-shot: `node flow/run.mjs cycle grimoire` (audit → build → snapshot → audit).

Preview locally:
`python -m http.server 3200 --directory site` *(run from a cwd OUTSIDE `site/`)*.

## Audit modes

- **precise** — grimoire: entity-level diff against canon
  `agentprivacy-docs/models/privacymage_grimoire_v10_4_0.json`.
- **signal** — other sites: source item count vs live page count (heuristic;
  verify before building). Current signals: skill ✅, research ✅, tomes ✅,
  **atlas ⚠️ ~62 possible node gap** (the `id:` grep over-counts — confirm first).

## Builders

| site | builder | status |
|------|---------|--------|
| grimoire | `flow/builders/grimoire.mjs` | ✅ blades · proverbs · incantations · principles |
| atlas | — | TODO (verify the node-gap signal first) |
| skill / tomes / research | — | covered; add builders when a real gap appears |

Each builder: deterministic ids (`sha1(title#i)`) + fixed date → idempotent file
content; page slug = `asSlug(title)` (same function the snapshotter uses, so
`[[links]]` always resolve); hubs refreshed via a single `flow-index` block.
Hub backups: `flow/.hub-backups/`.

## Source → site registry

| source | site | mode |
|--------|------|------|
| privacymage_grimoire_v10_4_0.json | grimoire | precise |
| agentprivacy-skills-v5 | skill | signal |
| spellweb/src/data/nodes.ts + edges.ts | atlas | signal |
| agentprivacy-docs (C1–C89 + PVM v6) | research | signal |
| cityofmages/tomes | tomes | signal |
| agentprivacy_master | (indexed by guide) | — |
