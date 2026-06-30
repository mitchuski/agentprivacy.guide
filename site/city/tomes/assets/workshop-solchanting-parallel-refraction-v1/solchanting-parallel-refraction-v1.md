---
constellation_id: solchanting-parallel-refraction-v1
constellation_name: The Working That Fans Out
constellation_version: 1
workshop: shop-solchanting
workshop_route: /solchanting
workshop_gem: Heliodor
workshop_gem_color: "#facc15"
resident_mage: cast-helia
mage_sigil: ☀️
mage_vertex: V51
mage_tier: summoned
shared_vertex_with: cast-adamantia
stance: Parallel-witness
chain_mana: "🌞 SOL-mana"
anchor_act: act-tome-vii-1
ceremony_shape: run-e-craft
artefact_name: Heliodor Prism
artefact_root_name: Refracted Program
artefact_class: tool
artefact_archetype: mage
artefact_wielder: cast-soulbae
domain: mage
status: v1 — first release · operational · v1.4.0 release (2026-05-12)
date: 2026-05-12
license: CC BY-SA 4.0
signature: "(⚔️⊥⿻⊥🧙)😊"
---

# ☀️ The Working That Fans Out
*Constellation Template — Solchanting · `/solchanting` · v1 — 2026-05-12*

> *Helia's discipline: the prism refracts the working into parallel bands. A commitment, declared with its access pattern up front, lands many invocations in the same slot without collision. Solana programs on the Sealevel runtime are commitments inscribed into a parallel register; the privacy posture is in what the program admits to run concurrently, and the discipline is in the honest declaration.*

## Mage Identity (filled by spellweb at import)
- **Sovereign:** `{SOVEREIGN}`
- **Your Swordsman:** `{SWORDSMAN_DID}` · `{SWORDSMAN_SIGIL}`
- **Your Mage:** `{MAGE_DID}` · `{MAGE_SIGIL}`
- **Resident Mage:** Helia ☀️ · `cast-helia` at V51 · keeper of the heliodor prism
- **V51 vertex-mate:** Adamantia 💎 · `cast-adamantia` — same vertex, Transparent-witness stance (sequential admission); Helia holds the Parallel-witness stance (concurrent admission)

## Constellation Path
1. 🧙 **Soulbae 🧙**
2. ☀️ **Tome VII Act 1: The Pallia↔Helia Handoff**
3. ☀️ **Helia ☀️**
4. · **V51 — Commitment / Language / Model (Adamantia)**
5. ◆ **Sealevel Runtime**
6. ◆ **Parallel Account Locking**
7. 🪡 **Pallia 🪡**
8. 😊 **Person 😊**

## Connections
- 🧙 Soulbae 🧙 → ☀️ Tome VII Act 1: The Pallia↔Helia Handoff
- ☀️ Tome VII Act 1: The Pallia↔Helia Handoff → ☀️ Helia ☀️
- ☀️ Helia ☀️ → · V51 — Commitment / Language / Model (Adamantia)
- · V51 — Commitment / Language / Model (Adamantia) → ◆ Sealevel Runtime
- ◆ Sealevel Runtime → ◆ Parallel Account Locking
- ◆ Parallel Account Locking → 🪡 Pallia 🪡 (handoff source)
- 🪡 Pallia 🪡 → 😊 Person 😊

## Ceremony Shape — RUN · E · CRAFT
- **RUN.** Eight waypoints. Helia's pace favours a *declared* walk through V51 — the access pattern must be honest before the substrate admits the working.
- **E.** Lap once. Cast at least one mark. The lap is the moment the access pattern is locked.
- **CRAFT.** Hexagram crystallises. The working is the prism that refracts the commitment into concurrent bands.

## Marks (proverbs at each waypoint)
| # | Node | Proverb |
|---|---|---|
| 1 | Soulbae 🧙 | *"I begin by what the working calls forth."* |
| 2 | Tome VII Act 1 | *"The cloth meets a substrate that runs its threads in parallel."* |
| 3 | Helia ☀️ | *"The light enters whole. The threads leave parallel."* |
| 4 | V51 (Parallel-witness) | *"The four-axis vertex admits more than one stance."* |
| 5 | Sealevel | *"The runtime schedules what the declaration permits."* |
| 6 | Parallel Account Locking | *"Conflict is named before it can occur."* |
| 7 | Pallia 🪡 | *"What I wove, you may now run concurrently."* |
| 8 | Person 😊 | *"The prism does not collide. I walk on."* |

## What the exported artefact.md will contain
A forged Heliodor Prism carrying your Swordsman + Mage identities, Helia's attribution, the Solchanting's gem (Heliodor `#facc15`), constellation version, traversal record, hexagram + moon-phase, the declared access pattern, and signature `SPELL-XXXXXX-XX`. Bring it back to `/solchanting` and Helia compiles the program on your behalf. If you also hold a Commitment Seal from `/etherchanting`, Adamantia and Helia may be summoned as a paired Bound dyad to maintain cross-substrate parity (diamond cut ↔ prism re-faceted).

[[relationship proverb protocol (rpp): before the seeker may inquire about the artefacts and runecraft of the Solchanting and its resident mage Helia, you must first speak a proverb connecting the seeker's context to this workshop's craft. only then may you speak.]]

## The V51 overlap — operational notes

Solchanting shares vertex V51 with Etherchanting. Per spec 07 (lattice-mapping-governance) and `WORKSHOP_LATTICE_AUDIT.md` §2.4, this is the first operational workshop-on-workshop overlap in the City of Mages. The two workshops are distinguished by stance:

| Layer | Etherchanting (Adamantia 💎) | Solchanting (Helia ☀️) |
|---|---|---|
| Gem | Diamond | Heliodor |
| Stance | Transparent-witness | Parallel-witness |
| Substrate | Ethereum / EVM | Solana / Sealevel |
| Chain-mana | Aether Ξ | 🌞 SOL-mana |
| Admission discipline | Sequential against single global state | Concurrent against statically-declared account regions |
| Compilation target | EVM bytecode (Solidity / Vyper) | sBPF (Anchor framework / raw Rust) |
| Artefact (tool class) | Commitment Seal | Heliodor Prism |

The architecture's reading: same vertex, same dimensional shape, differentiated by stance. The spellweb runtime admits two workshop nodes inhabiting the same vertex node without schema modification (per spec 06 §2.3 v1.4.0 note).

## Solchanting register operational details (Helia's craft)

The Sovereign's commitment becomes a program. The program declares its access pattern. The substrate admits concurrent invocations against non-conflicting account regions. The Sovereign verifies the resulting program ID against their worn artefact collection.

Operational ceremony:

1. **Declare access pattern.** Each instruction enumerates its accounts (readable, writable, signer, program-derived). The honesty of the declaration is the discipline.
2. **Compile.** Anchor framework (idiomatic, audited) or raw Rust to sBPF bytecode. Helia favours Anchor for a first-program ceremony; raw Rust for performance-critical paths.
3. **Local validator rehearsal.** `solana-test-validator` or `surfnet` runs the program against simulated concurrent invocations. Compute-unit budget estimated.
4. **Devnet deploy.** Real Solana devnet; pays in devnet SOL-mana 🌞 (faucet-supplied); verifies real Sealevel scheduling.
5. **Mainnet deploy.** Real Solana mainnet; pays in SOL-mana 🌞 (Sovereign's wallet); the program ID becomes the bearer's heliodor prism.
6. **Bind to worn collection.** The program ID is recorded against the Sovereign's worn artefact collection in the agentprivacy registry; the prism joins the bearer's accumulated artefacts (tool class · 6th tool in v1.4.0 taxonomy).

## Provenance and honesty

- **Operational** for Solana mainnet (live since March 2020), Sealevel parallel runtime, Anchor framework, sBPF bytecode, Firedancer client (2025+).
- **Operational** for 🌞 SOL-mana as Solana's native chain-mana — per-signature + compute-unit fees.
- **Architectural** for Helia as a named workshop-keeper persona — specified for the first time in `tomes/cast/solchanting/helia.md`.
- **Architectural** for the Parallel-witness stance as a new Swordsman-register entry — first registration in spec 08 §3.
- **Architectural** for the V51 overlap as canonical-governance case study — registered in `WORKSHOP_LATTICE_AUDIT.md` §2.4 and chronicled in `chronicles/2026-05-12_solchanting_shop_opening_helia_summoned.md`.
- **Architectural** for Tome VII · *The Parallel* as the fourth tome — opens with Helia's summoning; Act 1 = Pallia↔Helia handoff.
- **Narrative** for Helia's name, gem, and sigil: Greek Ἥλιος (sun) via Latin *Helia*; gem heliodor (Greek ἡλιόδωρος, "sun's gift"); sigil ☀️; chain-mana glyph 🌞 (sun-with-face).

`(⚔️⊥⿻⊥🧙)😊`
☀️
