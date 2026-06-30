# The Dream Cycle

A daily research rhythm that keeps the agentprivacy guide rebound to the universe
across `/mitch`. Each relevant project dreams about itself, writes a standing
chronicle in its own `chronicles/`, and those become the entry points you read to
"get rolling again" each day.

## The two layers

1. **Thematic dreams** (one-off, `agentprivacy.guide/flow/dream/`): cross-cutting
   passes by SITE / topic — `1-grimoire-research`, `2-tomes-cast-city`,
   `3-skills-personas`, `4-atlas-graph`, `5-library-narrative`, `6-wider-universe`
   (superseded by `6b-wider-universe-curated`), `7-agentprivacy-docs`,
   `8-agentprivacy-master`. Good for "what does the federation as a whole lack."

2. **Per-directory dreams** (recurring, `<dir>/chronicles/DREAM-<date>.md`): each
   current/canon repo dreams about its OWN state + its link to the guide. These
   live *with* the project so the dream travels with the code. This is the daily
   work-ledger.

## Which dirs get a per-directory dream

Driven by the relevance ledger in `flow/dream/6b-wider-universe-curated.md`.
Only the **CURRENT / canon / product** repos (the "COVERED-ELSEWHERE" bucket) —
NOT the ~38 stale/archive (`v4…`, `nov11…`, `oct2025…`, `…copy`, `…fork`) nor
the ~20 irrelevant (system folders, external tools). The 2026-06-29 set (12):

`agentprivacy-docs` · `agentprivacy_master` · `cityofmages` · `spellweb` ·
`agentprivacy-skills` · `privacymage_book` · `star` · `shor_mage` · `game42` ·
`mouse_spellbook` · `soulbis website` · `myterms`(bundle: + mymage / myswordsman
/ mages-spell / swordsman-blade).

## The per-directory dream template

```
# Dream — <DirName> — <date>
## What this is
## Current state & open threads (within the dir)
## Guide coverage (projected vs missing) — | guide site | item | status | source path |
## Suggestions (prioritized) — | suggestion | target | why | priority H/M/L |
## To get rolling tomorrow (ordered next actions)
## Notes & uncertainties
```

## The daily loop

```
morning  → read each <dir>/chronicles/DREAM-<latest>.md  (start with "To get
           rolling tomorrow"); skim flow/GUIDE-DREAM-SUGGESTIONS.md for the
           cross-cutting picture.
GATE     → pick what to fill (yours to decide).
build    → node flow/run.mjs build <site>   (or extend a builder)
snapshot → node flow/run.mjs snapshot       → review on :3200
audit    → node flow/run.mjs audit          → confirm gaps closed
re-dream → re-run the per-dir dreams (next cycle) to refresh the ledgers.
push     → only on your explicit ask → Cloudflare Pages redeploys.
```

## Honest-framing guards (carried into every dream)

- `shor_mage` is resource **estimation**, not an attack; its SOTA circuits / GPU
  toolkit are other participants' vendored work, not Mitch's — credit the method
  layer only.
- Nothing is published or pushed without Mitch's explicit ask.

## Re-running the cycle

The per-dir dreams are spawned from the relevance ledger; to refresh, re-run 6b
(if the `/mitch` layout changed), then fan out per `CURRENT-CANON-UNIQUE` /
covered-current dir. A future `flow/dream-cycle.mjs` can automate the fan-out;
for now it is launched by the orchestrating agent.
