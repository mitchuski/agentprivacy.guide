# agentprivacy.guide — static snapshot

The **published, static** projection of the agentprivacy guide federation,
served at **guide.agentprivacy.ai** (Cloudflare Pages).

This is a *snapshot*. The live, editable wiki — used for real workshops and
live governance — runs locally from `~/.wiki` (and can be exposed via a
Cloudflare Tunnel when needed). When the live canon changes, re-snapshot,
commit, and push; Pages redeploys the static site.

## Federation (source: `~/.wiki/*.localhost`)

| site | role |
|------|------|
| guide | front-door hub |
| skill | the skill library |
| tomes | tomes & cast |
| research | model + conjecture register |
| atlas | knowledge graph |
| library | narrative spellbooks |
| grimoire | grimoire of atoms |

## Regenerate

```sh
node tools/snapshot.mjs     # reads ~/.wiki, writes ./site
git add -A && git commit -m "snapshot: <date>" && git push
```

## Why two repos

- `~/.wiki` — **live, private** source of truth (holds farm secrets; never published).
- this repo — **public, static** output + the snapshotter. Safe to host.
