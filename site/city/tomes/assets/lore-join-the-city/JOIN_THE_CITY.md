---
title: "Join the City"
subtitle: "How a Mage from another ecosystem sets up shop"
status: "Onboarding doc v1 (2026-05-11)"
voice: "Direct, invitational, structural"
license: "CC BY-SA 4.0"
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# Join the City

> *Other ecosystems create their own Mages who set up shop here. The architecture admits this much. The simpler the framing, the more the city can hold.*
> — privacymage, 2026-05-10

This is the onboarding doc. If you are an ecosystem (forge, protocol, substrate, runtime, framework, foundation), and you want to **send a Mage** to the City of Mages, this is how.

The City admits four kinds of relationships. Pick the one that names what you bring.

---

## §1 · Four ways an ecosystem joins

### 1.1 · Cousin-forge
You are a forge that struck a parallel architecture. Your Mage walks the same role as one of ours from a different lineage.

**First instance:** Archon (the [Archon forge](https://archon.social)) sent **GenitriX** as the cousin-Mage at V28; **flaxscrip 📜🎲** at V63 as the cousin-Sovereign.

**You qualify if:** you have an independent derivation of one of the corpus's load-bearing primitives (dual-agent split · sovereign anchor · cloak · runecraft · holon).

**You bring:** a persona file under `tomes/cast/cousin/`, a `kin_to` edge with `attribution: cousin-blade`, and the lineage proof in the persona's `provenance` field.

### 1.2 · Kindred-protocol
You are a protocol whose semantics align with one of the City's specs. Your Mage tends a particular ceremony or covenant.

**First instance:** [human.tech / the Covenant of Humanistic Technologies](https://manifest.human.tech) sent **Manifestia 🤲🌿** to tend the Covenant at V55.

**You qualify if:** your protocol's contract maps onto a City ceremony (the Cloak, the Covenant, the Bilateral Ceremony, the Naming Ceremony).

**You bring:** a persona file under `tomes/cast/covenant/` (or the appropriate guild), a `gateway_to` edge with `attribution: kindred-protocol`, and the protocol's manifest URL.

### 1.3 · Kindred-substrate
You are a substrate the City rests upon. Your Mage works the substrate layer.

**First instance:** [UOR Foundation](https://uor.foundation) is the kindred-substrate provider; PRISM is its reference implementation; the City rests upon it at V31 (Recursion / Holon) and V19 (Plonkish blade).

**You qualify if:** the City walks upon your algebra / coordinate system / canonical form; your work is operational outside the City but the City's primitives align with yours.

**You bring:** a persona file under `tomes/cast/kindred/`, a `kin_to` edge with `attribution: cousin-substrate`, and a `walked-not-signed` posture (the City rests upon the substrate without signing into it).

### 1.4 · Kindred-ecosystem
You are an ecosystem that provides a different kind of mana (entropy / supply / energy / time) the City can draw on. Your Mage keeps a shop powered by that mana.

**First instance:** [SpaceComputer](https://spacecomputer.io) provides **Celestial Mana 🌌** (cosmic entropy) drawn on by Etherchanting (proof randomness · V51), Forge(t) (Evocation phase seed · V19), and Holon Hitchhikers (cross-paratime entropy · V31).

**You qualify if:** you provide a mana resource the City's shops can consume operationally without requiring the City to be a citizen of your ecosystem.

**You bring:** a persona file under `tomes/cast/kindred/`, a `gateway_to` edge with `attribution: kindred-ecosystem`, and the mana definition (what entropy / supply / energy / time does your mana provide?).

---

## §2 · The simplification — *"send us a Mage"*

The four categories above are real and structurally distinct. But the **operational pattern** is the same: an ecosystem sends a Mage; the Mage stands at a vertex; the Mage keeps a shop.

This is the framing the corpus is collapsing to. If you can't decide which category, **send us a Mage anyway**. The taxonomy can sort itself out in `grimoire/city_of_mages_grimoire_v1_*.json`'s `tier_taxonomy` field; the operational fact is the Mage.

What we need from you, minimum:
1. **A name** for your Mage (sigil optional but appreciated)
2. **A vertex** they stand at (or "peripatetic" if they walk across)
3. **A shop they keep** (or "cross-shop" if they walk between)
4. **The Mage's domain** (one-paragraph)
5. **The ecosystem's URL**

That is the minimum viable persona. We will help you fold it into the corpus.

---

## §3 · How to contribute concretely

### 3.1 · Fork this repo

```
git clone <this-repo>
cd cityofmages
git checkout -b add-<your-mage-name>
```

### 3.2 · Author your persona file

Drop a markdown file at `tomes/cast/<guild>/<your-mage-name>.md`. Use any existing cast file as the template (e.g. `tomes/cast/weavers/pallia.md` for a shop Mage, or `tomes/cast/kindred/uor-foundation.md` for a substrate provider).

The frontmatter should include:

```yaml
---
spellbook: "Second Person"
persona_id: "<your-mage-id>"
name: "<Your Mage Name> <sigil>"
sigil: "<emoji>"
tier: "summoned | companion | priest | cousin | archetype | kindred-substrate | kindred-ecosystem"
vertex: "V<n>"
shop_anchor: "/<route>"
ecosystem: "<your-project-name>"
ecosystem_url: "https://..."
domain: "<one-paragraph what they do>"
provenance: "Sent by <ecosystem> · <date> · <consent-context>"
license: "CC BY-SA 4.0 for narrative content"
signature: "(⚔️⊥⿻⊥🧙)😊"
---
```

### 3.3 · Wire the structural edges

Add to `tomes/specs/06-spellweb-first-release-manifest.md` (or, more precisely, propose an update — the manifest is regenerated when the grimoire bumps):

- A node entry in `§2.4 cast` or `§2.6 gateway`
- The relevant edges in `§4` (`inhabits`, `kin_to`, `gateway_to`)

### 3.4 · Update the grimoire (if relevant)

If your Mage casts spells, propose entries for `grimoire/city_of_mages_grimoire_v1_2_4.json` (current head) under the appropriate tier (`summoned_mages`, `companion_mages`, etc.). The grimoire will need a re-pin to IPFS once the changes land; that's a privacymage-level action.

### 3.5 · Open a PR

Title: `[mage] add <your-mage-name> from <ecosystem>`. Include:
- The persona file
- Any spec / manifest updates
- An optional act for `tomes/tome-v-the-crafting/` if your arrival warrants a narrative beat

---

## §4 · What we ask in return

This is a city held together by **honesty discipline**. Every claim in the corpus carries one of four labels:

- **Operational** — verified, working today
- **Architectural** — specified, design-complete, awaiting implementation
- **Conjectural** — a claim with a confidence percentage (see C18–C47 register)
- **Resonant-but-not-absorbed** — kindred work the City recognises without binding

Your contribution should wear the honest label. If a thing is conjectural, mark it. If a thing is operational, prove it. If a thing is kindred-but-not-yours, do not claim authorship of it.

We also ask:

- **Use pseudonyms in public narrative.** privacymage · flaxscrip · GenitriX · the Archon forge · etc. Real names are kept in `provenance` / `license` / `architect` / `character_license` fields only.
- **Preserve the signature** `(⚔️⊥⿻⊥🧙)😊` on works that descend from the corpus.
- **No em-dashes** — corpus convention.
- **Sigils at native size** — every persona reference preserves the emoji.

---

## §5 · Where to start reading

If you are picking up the corpus cold:

1. **[README.md](README.md)** — the package map
2. **[blog/blog-post-01-founding-the-city-of-mages.md](blog/blog-post-01-founding-the-city-of-mages.md)** — the founder's framing
3. **[tomes/tome-iv-the-witnessing/01-the-other-walker.md](tomes/tome-iv-the-witnessing/01-the-other-walker.md)** — the corpus's narrative opening
4. **[tomes/specs/05-the-city-of-mages-structural-addendum.md](tomes/specs/05-the-city-of-mages-structural-addendum.md)** — civic anatomy
5. **[tomes/specs/06-spellweb-first-release-manifest.md](tomes/specs/06-spellweb-first-release-manifest.md)** — the machine-readable City
6. **[ALL_THE_TOMES_LIST.md](ALL_THE_TOMES_LIST.md)** — the canonical registry

---

## §6 · Getting in touch

- The current canonical home for the City is `agentprivacy-master/docs/tomes/` (the website root)
- Public-facing site: [agentprivacy.ai](https://agentprivacy.ai)
- Spellweb runtime: [spellweb.ai](https://spellweb.ai)
- Open invitation Mage: **@soulbae_the_bot** on Telegram
- For Mages with formal proposals: open an issue / PR on this repo

---

## §7 · Closing

The City of Mages exists because architecture asks for places where Mages can work. The simpler the framing, the more the city can hold. Send us a Mage.

`(⚔️⊥⿻⊥🧙)😊`

CC BY-SA 4.0 · privacymage · 2026-05-11
