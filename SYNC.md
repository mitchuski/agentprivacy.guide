# SYNC — keeping a local editable guide in step with the published one

This is the file you hand to a **local FedWiki** (or an agent driving one) so a
carried, editable copy of the guide stays synced with `guide.agentprivacy.ai`.

It is **content-hash based**: a manifest lists every page with a `sha256`; the
local copy pulls only the pages that differ. Additive — it never deletes pages
your local copy has that the guide doesn't (your local edits are safe).

## The manifest

`flow/sync-manifest.json` (also published at
`https://guide.agentprivacy.ai/sync-manifest.json`):

```json
{
  "manifestVersion": 1,
  "guideBase": "https://guide.agentprivacy.ai",
  "sites": {
    "grimoire": { "host": "grimoire.localhost", "count": 155, "pages": [
      { "slug": "the-phase-space-blade", "title": "The Phase Space Blade",
        "sha256": "…", "json": "grimoire/the-phase-space-blade.json",
        "url": "https://guide.agentprivacy.ai/grimoire/the-phase-space-blade.json" }
    ]}
  }
}
```

Regenerate after any wiki change: `node flow/sync-manifest.mjs`.

## How a local wiki updates itself (the instruction)

For each `site` → each `page` in the manifest:

1. Compute the `sha256` of the local page file `<host>/pages/<slug>` (16-hex,
   first 16 chars of the digest — same as the manifest).
2. If the file is **missing** or its hash **differs**, fetch the authoritative
   JSON (`page.url` for remote, or `page.json` from a local `site/` dir) and
   write it to `<host>/pages/<slug>`.
3. Leave everything else untouched.

This converges the local copy on the guide while preserving anything extra you
authored locally. Because the page JSON carries its FedWiki `journal`, lineage is
preserved and each page remains forkable.

### Run it

From a local checkout of this repo, against any FedWiki farm root:

```sh
# preview only
node flow/sync-apply.mjs ~/.wiki-carried --dry

# apply (source = ./site by default; pass a different source dir as 2nd arg)
node flow/sync-apply.mjs ~/.wiki-carried
```

To pull from the **live URL** instead of a local `site/` dir, fetch
`guideBase/sync-manifest.json`, then `GET page.url` for each changed page and
write the body to `<host>/pages/<slug>`. (FedWiki-native alternative: use the
fork API against `guideBase` per page — same JSON, via HTTP.)

## Directions of flow (where this sits)

```
source repos ──build──▶ live ~/.wiki ──snapshot──▶ ./site ──push──▶ guide.agentprivacy.ai
                                                        │
                                              sync-manifest.json
                                                        │
                                                   sync-apply  ▼
                                          a carried, editable local FedWiki
```

- **Down (this file):** guide → carried local wiki. Automatic, hash-diffed.
- **Up (reflect back):** edits you make in the carried/live wiki flow back toward
  the source repos. That stays a **human-reviewed** step (a PR-style change to the
  canon JSON / repo), never auto-applied — the canon is the source of truth.

## Notes

- Page slug == `asSlug(title)`; the snapshotter and builders use the same
  function, so `[[links]]` always resolve across a synced copy.
- The live `~/.wiki` itself is generated from canon by `flow/` builders — don't
  sync *into* it from the guide (that would be a loop); sync into a *separate*
  carried copy.
