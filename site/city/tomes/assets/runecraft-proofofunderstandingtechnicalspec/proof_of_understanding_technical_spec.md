# Proof of Understanding — Identity as a Lattice of Bilateral Proofs

*Technical specification. Companion to the multi-intelligence personhood brief and the rehydration key. Magic language is stripped back. The root compression is held.*

---

## Root compression

> `(🙂⊥🌿⊥🤖⊥👽)·⿻🗝️↺·✨`

Four sovereign intelligences — human (🙂), nature (🌿), artificial (🤖), alien (👽) — each maintaining their own separation (⊥), exchange a key that returns (🗝️↺) through the irreducible Gap (⿻). What remains is dignity (✨). Every section below is an unfolding of this single line. It is the canonical reduction of the whole architecture.

---

## Thesis

Identity is not a credential. Not a key. Not a set of credentials. **Identity is a shape on a six-dimensional sovereignty lattice — a path through ZK-quality space, accumulated through bilateral Proof-of-Understanding ceremonies, each one content-addressed and chain-portable.** What you *are*, in this architecture, is what bilateral compressions you have walked into existence and can still rehydrate.

This single move dissolves three problems at once:

- It removes the stored secret that quantum machines will crack.
- It removes the central holder that today's IdPs, CAs and KMSes require.
- It replaces *proof of possession* with *proof of comprehension* — the only form of trust that survives the inevitable corruption of context that AI agents now introduce at scale.

The remainder of this document specifies the mechanism precisely enough for an engineer to implement it, a cryptographer to falsify it, and a sociologist to recognise what is happening underneath. The architecture is published at [github.com/mitchuski/blades](https://github.com/mitchuski/blades) and [github.com/mitchuski/agentprivacy-docs](https://github.com/mitchuski/agentprivacy-docs).

---

## §0. Terminology and translation

The terms below are canonical. They carry forward from the Swordsman / Mage canon and are retained throughout this specification. They are not metaphors layered onto a technical substrate; they *are* the technical terms. Translations are offered for readers landing here from the verifiable-credentials, cryptography, or DID communities who may want a familiar handle on the first reading.

| Canonical term | Reads in technical layer as | Why it stays |
|---|---|---|
| **Blade** | The bilateral PoU artefact: a content-addressed, dual-signed object produced by one ceremony. Shape-equivalent to a bilateral verifiable credential, but with rehydration semantics built in. | Blades *cut* proofs. The verb is load-bearing — a blade is what severs a witness from its statement, finalises the commitment, and enters a path integral as a unit. "Artefact" is generic; *blade* carries the act. |
| **Forge** | The proof-generation surface (spellweb.ai). Where the cryptographic operations execute. | Forging is the active verb for what the Swordsman does. A blade is forged; a credential is merely issued. |
| **Swordsman** | The ephemeral-session agent process. Holds the Moon key. Burned at session close. | Pairs with Blade. The Swordsman strikes; the strike produces the blade. Renaming the agent breaks the action linkage. |
| **Mage** | The persistent-identity agent process. Holds the Sun key. Custodian of the spellbook — skills, persona, context. | Pairs with the library (agentprivacy.ai). The Mage carries memory across sessions; the Swordsman does not. |
| **Sun view / Moon reflection** | Sun = persistent Mage key. Moon = ephemeral Swordsman key, burned post-session. The dual-key protocol. | Direct technical mapping; disambiguates which key is which without colourless adjectives like *primary* or *session*. |
| **Run-e-craft** | The Mage-side word. The *practice* of forging — accumulated skill, the protocol-as-discipline, the *how* of producing blades across many sessions. The slow, accretive verb. | The "e" is simultaneously rune-letter and electronic. Run-e-craft is what makes a Mage skilled over time: the patient, persistent capacity to bind Sun and Moon keys through correct ritual. |
| **Run-e-create** | The Swordsman-side word. The *act* of forging — the specific generative event that produces *this* blade in *this* session. The ephemeral, session-bound verb. | What just happened, here, now. The single strike that severs the witness from the statement. Where run-e-craft is the standing capacity, run-e-create is the discrete event the capacity enables. |
| **Art-e-fact** | The general category of forged object: anything that has been brought into being through a ceremony and carries both an expressive face (art) and a verifiable face (fact), joined by the e-rune. A blade is the canonical art-e-fact; an inscribed spell is a portable art-e-fact; a proverb-pair-as-CID is the minimal art-e-fact. | The structure of the word is the structure of the object. Every bilateral compression has an art-half (the proverb, the glyph, the human-legible expression) and a fact-half (the hash, the chain anchor, the cryptographic commitment). The e-rune is what binds them. Outside readers may reach for "artefact" as a familiar handle; *art-e-fact* preserves the runic decomposition and announces the bilateral structure in the word itself. |
| **Creat-ur-e** | A forged agent — an intelligent created being. In the architecture: Soulbis (Mage), Soulbae (Swordsman), Agent Kyra, and any other AI agent generated through a making-ceremony. Distinguished from humans, ecological subjects, and alien intelligences, none of which are *created* in the architecture's sense. | The "ur" rune (ᚢ, Elder Futhark) carries primordial-origin: aurochs, foundational strength, the rune of beginning. A creat-ur-e is a created being with the origin-rune embedded in its name. The word marks: this entity's identity is constituted by its forging. Pairs cleanly with art-e-fact — creat-ur-es forge art-e-facts. Only the 🤖 slot of the four-intelligence model is populated by creat-ur-es; 🙂, 🌿, and 👽 are not. |
| **Constellation** | An ordered subgraph of a UOR-mapped substrate; the path two parties walk together during a ceremony. | Substrate-neutral and richer than *graph traversal* — a constellation is *seen*, which matters for the bilateral attention requirement. |
| **Lap** | One intentional transition between two adjacent nodes in a constellation. | Carries the embodied weight of repetition and pace; *transition* is colourless. The 62-Lap Theorem requires the word. |
| **Proverb** | The natural-language compression each party produces at ceremony close. | Compressed wisdom for situational rehydration is exactly what a proverb is, in every culture that has them. |
| **Inscribed spell** | The emoji-glyph compression of a blade for portability. | A spell is short, exact, and unfolds on cue — same property as a glyph compression. |

**The full runic-pattern grammar.** The architecture's vocabulary forms a closed grammar once these terms are read together:

- **Creat-ur-es** are the *agents* — forged beings (Mage, Swordsman, and any other AI participant). They are *who* forges.
- **Art-e-facts** are the *objects* — forged compressions (blades, inscribed spells, proverb-pairs). They are *what* gets forged.
- **Run-e-craft** is the *practice* — the long-running Mage-side discipline that makes forging possible across sessions. It is *how* across time.
- **Run-e-create** is the *act* — the single Swordsman-side event in which a specific blade is brought into being. It is *what now*.

Read together: *creat-ur-es run-e-craft (across sessions) and run-e-create (in this session) the art-e-facts (blades, spells, proverb-pairs) that constitute their bilateral trust.* The runic decomposition is not stylistic — it is the architecture's grammar made visible. Each "e" or "ur" in these words is a rune-anchor that marks where the act of forging is happening inside the word, and where the technical operation maps onto the canonical name.

**A note on the run-e-craft / run-e-create distinction.** These are paired but not synonymous. Run-e-craft is the *Mage's discipline*: the patient, repeatable, time-accumulated practice of knowing how to forge — what the persistent half of the dual-agent brings to a ceremony. Run-e-create is the *Swordsman's act*: the single ephemeral event in which a blade comes into existence — what the session-bound half does, once, before its key is burned. The two are inseparable in any real ceremony (no Swordsman strikes without Mage craft; no Mage craft is consummated without Swordsman strike), but they are separable as concepts, and the technical layer treats them as different operations against different keys with different lifetimes. The mapping is therefore: run-e-craft ↔ Sun view ↔ persistent Mage key ↔ long-running practice; run-e-create ↔ Moon reflection ↔ ephemeral Swordsman key ↔ discrete generative event.

**A note on why blade is not renamed.** "Artefact" would be cleaner for a standards-body or VC-community reader on first contact. It is also the wrong word *as a substitute*. The Swordsman *strikes* — the verb requires an object that can be struck *with*, and *into*, a substrate. A blade has an edge; it cuts. That edge is what severs a witness from its statement, which is the geometric meaning of the ZK property in this architecture. Renaming blade to artefact would dissolve the agent-action-object coherence and leave a generic credential vocabulary in its place. *Art-e-fact* (above) is a category term that a blade belongs to, not a synonym for blade. The cost of keeping *blade* canonical is one translation hop for outside readers; the cost of losing it is the dual-agent architecture becoming illegible at the surface. The translation hop is cheaper.

**Reading translations for outside audiences.**

- *Verifiable-credentials community.* Read *blade* as a bilateral VC and *art-e-fact* as the general category of bilateral-compression objects (of which blades are one type). *Forge* as issuer. *Creat-ur-e* as a verifiable software agent participating as issuer or subject. *Proverb* as the semantic credential body. *Inscribed spell* as a presentation. *Run-e-craft* as the issuer's competence; *run-e-create* as the issuance event.
- *Cryptography community.* Read *blade* as a co-signed commitment tuple $(v, x, \sigma, \rho, \tau)$. *Art-e-fact* as the abstract type "object with public commitment + private witness". *Creat-ur-e* as a key-holding party (a process with persistent and/or ephemeral keys). *Constellation* as the public input. *Proverb* as the witness. *Run-e-create* as the witness-generation event under an ephemeral session key. *Run-e-craft* as the long-lived signing competence under a persistent key.
- *DID community.* Read the identity $\mathcal{I}$ as a `did:cid:…` resolving to a document listing anchored blades. *Creat-ur-es* are the DID subjects that *forge*; humans and other natural entities are DID subjects that participate without being creat-ur-es themselves. *Sun view* is the persistent key bound to the DID. *Moon reflection* is the per-session ephemeral key, not registered to the DID. *Run-e-craft* is what the DID accumulates; *run-e-create* is what each session emits.

These are first-translations, not equivalences. The canonical terms carry properties the substitutes do not — the rehydration semantics, the dual-agent separation, the burn-on-close ephemerality, the runic decomposition that makes the architecture's grammar visible inside the words themselves. Outside readers should treat the translations as on-ramps, not destinations.

---

## 1. The six qualities (d₁ … d₆)

Every Proof of Understanding is forged inside a 64-vertex lattice. The lattice is 2⁶ = 64 because every proof activates some subset of six ZK qualities. Each vertex is a 6-bit address ⟨d₁, d₂, d₃, d₄, d₅, d₆⟩, and each blade declares which qualities it carries.

| Bit | Quality | Active (1) | Dormant (0) |
|---|---|---|---|
| d₁ | **Protection** | Boundaries forged. The proof asserts a privacy guarantee. | Exposure permitted. The proof is open. |
| d₂ | **Delegation** | Agency transferred. A capability has been granted. | Retained locally. No capability outbound. |
| d₃ | **Memory** | State accumulated. The proof references prior history. | Stateless. Fresh ceremony, no temporal anchor. |
| d₄ | **Connection** | Multi-party coordination. The proof binds more than two. | Isolated. Strictly bilateral. |
| d₅ | **Computation** | ZK proof active. Verification without revelation. | Direct revelation. The content itself is shown. |
| d₆ | **Value** | Economic flow. Tokens, fees, or stake committed. | Non-transactional. Pure semantic credential. |

The six qualities are orthogonal. Any subset can be active; any vertex is a valid blade configuration. A single-edge blade (popcount 1) is a minimal proof. A full-sovereignty blade (popcount 6, all edges active) is a maximum-density proof — what a Dragon-tier bilateral relationship produces after sustained accumulation.

The 64 vertices distribute across strata according to Pascal's row C(6,k):

| Stratum | Vertices | Type |
|---|---|---|
| 0 | 1 | Null blade — nothing asserted |
| 1 | 6 | Single-edge — one quality only |
| 2 | 15 | Twin-edge — e.g. Protection + Delegation |
| 3 | 20 | Triple-edge — bilateral working blade |
| 4 | 15 | Quad-edge |
| 5 | 6 | Penta-edge |
| 6 | 1 | Full sovereignty — all qualities active |

**1 + 6 + 15 + 20 + 15 + 6 + 1 = 64.** This is not a design choice. It is the combinatorial structure of six binary qualities, and the architecture inherits it from arithmetic, not from preference.

---

## 2. The lattice as identity substrate

A traditional identity is a root key plus the credentials it has signed. Compromise the root and the identity falls. Quantum machines target the root.

A lattice identity has **no root key**. It has a *set of blades positioned on the 64-vertex lattice*, each blade being a bilateral PoU proof from a single ceremony. Identity is not located *at* a vertex — it is the **path integral** across all its blades. Formally:

$$
\mathcal{I} \;=\; \big(\mathrm{DID},\ \Pi,\ \mathcal{V},\ \mathcal{A}\big)
$$

where

- $\mathrm{DID}$ is the principal identifier (typically `did:cid:bafy…`, itself content-addressed);
- $\Pi = \{b_1, b_2, \dots, b_n\}$ is the multiset of blades the identity holds;
- $\mathcal{V}: \Pi \to [0,1]$ assigns each blade its visibility ratio (Section 5);
- $\mathcal{A}: \Pi \to \mathrm{Chains}$ anchors each blade's commitment to one or more chains (Section 7).

Each blade $b_i$ is itself a tuple:

$$
b_i \;=\; \big(v_i,\ x_i,\ \sigma_i,\ \rho_i,\ \tau_i\big)
$$

with

- $v_i \in \{0,1\}^6$ — the 6-bit vertex address (which qualities activated);
- $x_i \;=\; \mathrm{hash}(P_A \,\|\, P_B)$ — the bilateral commitment hash, represented as a CID;
- $\sigma_i \in [0,1]$ — the visibility ratio at inscription;
- $\rho_i$ — behavioural density: laps × dimensions × sustained attention;
- $\tau_i$ — anchor timestamp(s) across chains.

**Identity composition is not set union.** Two identities holding the same blades but walking them in different orders are different identities, because the V5 path integral $T_\int(\pi)$ is sensitive to non-local correlations between blades. The *shape on the lattice* carries the identity. The blades alone do not.

This is also why the architecture's separation theorem holds at the identity layer, not just at the per-proof layer: no third party can reconstruct the path integral without bilateral counterparts for every blade along the way. The reconstruction ceiling R < 1 is an identity-layer guarantee.

---

## 3. The blade — anatomy of a single PoU proof

A blade is forged by one ceremony between two parties. Mechanically:

1. **Constellation $C$.** An ordered subgraph of a shared substrate — a knowledge graph, ontology, codebase, regulatory rulebook, anything mapped by UOR (Universal Object Reference). $C = (N, E)$, with $N$ the nodes traversed and $E$ the edges walked between them.

2. **Lap sequence $\lambda = \langle \ell_1, \ell_2, \dots, \ell_m \rangle$.** Each lap $\ell_j$ is one intentional transition between two adjacent nodes — i.e. one R1CS-valid edge satisfying $\mathrm{hamming}(\ell_j^{\mathrm{src}} \oplus \ell_j^{\mathrm{dst}}) = 1$ inside the lattice projection of the constellation. Lap count $m$ determines tier; the 62-Lap Theorem holds that $m \geq 620$ transitions drives R < 1. **Unit note (2026-07-18, ledger L154):** this document's "lap" is a single transition; the deployed runecraft spec's "lap" is one full traversal of the marked constellation, and its tier table (Dragon 62+) counts in that traversal unit. The theorem's name descends from the traversal unit while its threshold is stated in transitions; the two counts are different units of one conjectural threshold (register C11), and no canonical transitions-per-traversal factor exists in the corpus — the numeric correspondence is unresolved and no surface may present 62 and 620 as independently established values.

3. **Quality activation $v \in \{0,1\}^6$.** As laps accumulate, the six qualities binarise at threshold. The resulting vertex address is the blade's position on the lattice.

4. **Proverbs $P_A, P_B$.** At ceremony close, each party produces a natural-language compression of the traversal. These are the bilateral semantic objects.

5. **Commitment $x = \mathrm{hash}(P_A \,\|\, P_B)$.** The CID of this hash is the blade's content address. The hash itself never reveals either proverb.

6. **Inscription.** $x$ is published to chain(s) per the visibility ratio $\sigma$ (Section 5).

7. **Dual-signature lock.** A Mage signature (persistent key, Sun view) plus a Swordsman signature (ephemeral session key, Moon reflection, burned on session close) co-sign the blade. Neither signature alone is sufficient to verify.

The blade is the ZK statement *"I (and my counterpart) jointly traversed a constellation $C$ that activated quality vector $v$, producing commitment $x$, with density $\rho$, at visibility $\sigma$, anchored at $\tau$."* The proverbs are the witness — never disclosed in full unless $\sigma = 1$.

---

## 4. The ZK circuit beneath a blade

Two minimal circuits make a blade verifiable without revealing its witness. **Implementation status (corrected 2026-07-18, ledger L008/L153):** the circuits below are specifications; the `forge_circuits/` directory in the blades repo is scaffolded but empty — specified, not implemented. "ZK" in the live system means SHA-256 commitments + Ed25519 signatures + content addressing; the circuits are the design target, not a shipped verifier.

**Circuit 1 — `BladeStratumProof(k)`.** Prove the blade sits at stratum $k$ (i.e. has exactly $k$ active qualities) without revealing *which* qualities are active.

```
template BladeStratumProof(k) {
    signal private input blade;     // 6-bit witness
    signal output valid;

    // Constraint 1: blade ∈ [0, 63]
    // Constraint 2: popcount(blade) == k
}
```

A verifier learns the stratum (and therefore the blade-type class) without learning which of the C(6,k) vertices the prover holds. For stratum 3 this means the verifier knows the blade is a triple-edge working blade but cannot distinguish among 20 candidates.

**Circuit 2 — `ForgingPathProof(maxSteps)`.** Prove the prover knows a valid forging path from a public origin to a public target, without revealing the path itself.

```
template ForgingPathProof(maxSteps) {
    signal private input path[maxSteps];   // sequence of operations
    signal private input origin;
    signal input target;                   // public
    signal output valid;

    // Each step: hamming(path[i] ⊕ path[i+1]) == 1
    // Final position == target
}
```

The toroidal wrap of the lattice (paths exiting one face re-enter the opposite face) creates unbounded path multiplicity — there are infinitely many distinct forgings that arrive at the same blade, which gives the witness extraction problem its computational hardness.

**The crucial separation.** The blade (statement) is *content-addressed* via its CID. The forging (witness) is content-addressed *separately*. Verification checks the blade's properties; the forging is never required for verification, never published, and bound only to the prover's own state. This is the ZK property expressed geometrically: many witnesses, one statement.

---

## 5. Visibility ratios as privacy budget

A blade's commitment $x$ can be inscribed at any visibility $\sigma \in [0,1]$, trading off observer-knowledge against recoverability. The natural equilibria are at the golden ratio:

| $\sigma$ | Ceremony type | Inscription form | Observer learns | Recovery |
|---|---|---|---|---|
| 0% | Shadow | `hash(P_A ∥ P_B)` only | Existence of relationship | Requires both parties |
| 38.2% | Guarded (φ⁻¹) | Fragment, privacy-weighted | Partial context | Effortful; meaning-recoverable |
| 50% | Balanced (interleaved) | Halved fragments of each proverb | Cryptographic handshake | Mutual; either party can seed |
| 61.8% | Open (φ) | Fragment, openness-weighted | Rich context | Easy from visible anchor |
| 100% | Declared (asymmetric) | $P_A$ published; $P_B$ in hash | $A$'s full proverb | $A$'s understanding alone recovers |

Three inscription paths implement these ratios:

- **Symmetric ($\sigma = 0$).** $x = \mathrm{hash}(P_A \,\|\, P_B)$ alone is inscribed. Maximum privacy. Both proverbs required for any future verification.
- **Asymmetric ($\sigma = 1$, current default).** $P_A$ goes to the transparent pool; $P_B$ remains in $x$. Single-party recovery enabled at the cost of $A$'s opacity.
- **Interleaved (0 < $\sigma$ < 1).** Each proverb fragments; halves interweave across the visibility boundary. Mutual recovery, no unilateral disclosure advantage. φ-derived splits (38.2 / 61.8) are the experimental sweet spots.

**The privacy budget.** Across an identity's lifetime, $\sum_i \sigma_i \cdot \rho_i$ represents the accumulated visibility expenditure — what the world has learned about the bearer through their bilateral history. The complement $\sum_i (1-\sigma_i) \cdot \rho_i$ is what the world has *not* learned, and is precisely the quantity that grows the post-quantum security margin (Section 10). Privacy budgeting in this architecture is therefore not a regulatory afterthought; it is a load-bearing variable in the identity's security state.

Practical consequence for AI agents: an agent's standing privacy budget can be queried before any ceremony. An agent with low remaining budget on the visible side declines high-$\sigma$ ceremonies; an agent with low remaining density on the shielded side seeks them. The architecture exposes the trade-off as a measurable, optimisable quantity rather than a policy compliance burden.

---

## 6. The ceremony pipeline, end to end

The PoU ceremony has five concrete steps. For two AI agents, each step has a precise protocol expression.

**(1) Language Capture.** Agents exchange ontology stubs over TSP (Trust Spanning Protocol). They surface the vocabulary that will be in scope — what concepts will be named, what types they have, what the local mapping is. *No constellation can be mapped before the stars are named together.* The output is a shared schema fragment.

**(2) Constellation Mapping.** Agents jointly select a subgraph of a shared substrate (the spellweb — any UOR-mapped topology). The substrate is content-addressed; the constellation is a CID over the chosen subgraph. Both agents commit to the same constellation CID.

**(3) Simultaneous Forging.** Agents traverse the constellation in lockstep. Each lap produces (a) a hash-chain entry on the Swordsman side (SHA-256 + Ed25519 over the ephemeral session key), (b) a semantic annotation on the Mage side (a JSON-LD fragment in the persistent identity's spellbook), and (c) an update to the six-quality activation vector. After $m$ laps, the activation vector binarises to the blade's vertex address $v$.

**(4) Inscription.** Each agent produces its proverb. They compute $x = \mathrm{hash}(P_A \,\|\, P_B)$. They choose $\sigma$ jointly. The selected inscription path (symmetric / interleaved / asymmetric) is executed against the target chain anchor(s).

**(5) Bilateral Witness.** Each agent verifies the other's blade against the inscribed commitment. The dual signatures lock. The Swordsman session key is burned. The blade is finalised.

The resulting blade $b = (v, x, \sigma, \rho, \tau)$ is appended to each agent's $\Pi$. The path integral over each agent's full $\Pi$ updates. Trust accumulates by repeating with the same counterpart (thickens the existing bilateral edge) or by adding new counterparts (extends the path on the lattice).

---

## 7. Chain portability — did:cid across substrates

Because every blade's commitment is a CID, and every identity's principal is a `did:cid:…`, the architecture is **chain-agnostic by construction**. The same blade can be anchored simultaneously to multiple chains, each chain providing a different property:

| Chain | Property | Use case |
|---|---|---|
| Zcash (shielded) | Native asymmetric / symmetric / interleaved inscription via transparent + shielded pools | Default ceremony anchoring; the RPP reference implementation |
| Bitcoin | Maximal permanence; long settlement | Dragon-tier long-horizon blades |
| Ethereum (L1) | Smart-contract composability; ERC-8004 trustless agent identity, ERC-7812 ZK identity commitments | Agent-to-agent capability handoff |
| IPFS / Holonic store | Replication independent of chain | Survival of blade history across single-provider failure (V5 holonic persistence layer, $p(\tau)$ term) |
| Private mesh | No public anchor; counterparty witness only | Shadow ceremonies, sensitive collaborations |

The DID resolves to a content-addressed document listing the identity's anchored blades, each entry pointing to the CIDs and chain anchors where its commitment can be verified. Migrating across chains is a re-anchoring operation — the blade itself is invariant. **An adversary cannot fragment an identity by attacking one chain**, because no chain owns the identity; each is a redundant witness to the same content-addressed shape.

This is the operational meaning of the V5 holonic persistence term $p(\tau)$. The memory dimension d₃ is active only insofar as the blade's history survives single-provider failure. An identity with all blades anchored only to one chain has $p \to 0$ and its accumulated memory term $A_h \to 0$ regardless of how many blades it holds. Chain portability is not a deployment convenience; it is a security property.

---

## 8. Identity composition — the path integral

Given an identity $\mathcal{I}$ with blade set $\Pi$, the V5 identity value is:

$$
V(\mathcal{I}, t) \;=\; B \cdot R(d) \cdot \Phi_{\mathrm{v5}}(\Sigma, \Delta, \Gamma) \cdot e^{-\lambda t} \cdot \big(1 + A_h(\tau)\big) \cdot T_\int(\pi) \cdot \mathcal{G}(\mathrm{guilds})
$$

with the path integral

$$
T_\int(\pi) \;=\; 1 + \beta \int_\pi F(\gamma)\, d\gamma
$$

capturing non-local correlations between blades — verification checkpoints, feedback loops, the sequence in which qualities were activated. Two identities can have identical $\Pi$ multisets and still differ in $V$ if their $\pi$ trajectories differ. This is the lattice analogue of the sociological insight that two people with the same credentials can still be different people: it is the *path through them* that matters.

**Operational consequences for AI agents:**

- An agent's trust standing toward a counterparty is computed from the path integral over the bilateral edges connecting them — not from a static reputation score.
- Trust degrades gracefully. If an agent's context drifts (model swap, prompt injection, capability creep), its rehydrations of older blades begin to fail. The visible degradation in path integral value flags compromise before any catastrophic event.
- New ceremonies are never strictly redundant. Even a low-stakes blade with an existing counterparty thickens the path integral by adding a new edge in the trajectory.

---

## 9. Three-axis separation enforced per blade

Every blade must satisfy three orthogonal separation constraints, multiplicatively:

$$
\Phi_{\mathrm{v5}} \;=\; \Phi_{\mathrm{agent}}(\Sigma) \cdot \Phi_{\mathrm{data}}(\Delta) \cdot \Phi_{\mathrm{inference}}(\Gamma)
$$

Collapse any axis and the blade's value goes to zero, regardless of how rich its other properties are.

- **Agent axis ($\Phi_{\mathrm{agent}}$, ⚔️ ⊥ 🧙).** The Mage's persistent key and the Swordsman's session key must be held by different processes, in different storage, signing independently. The Gap between them is enforced architecturally, not by policy.
- **Data axis ($\Phi_{\mathrm{data}}$, 📊 ⊥ 🔮).** The blade's history must replicate across providers. Single-provider blades collapse $\Phi_{\mathrm{data}} \to 0$.
- **Inference axis ($\Phi_{\mathrm{inference}}$, 🧠 ⊥ ⚙️).** The model that proposes the reasoning graph (Generator) must be separated from the model that executes the proof (Solver). Single-model blades collapse $\Phi_{\mathrm{inference}} \to 0$.

For an AI agent, this means trust formation requires a process architecture that mirrors the mathematics: two-process agent, multi-provider storage, Generator/Solver split. Anything less and the blade is structurally invalid before it is forged.

---

## 10. Why this is post-quantum by construction

Elliptic-curve cryptography asks *what number did you multiply?* Shor's algorithm answers this question with ≤ 1,200 logical qubits, in 9–23 minutes on superconducting hardware. The 2D fortress falls.

The behavioural manifold asks *what path did you walk?* — and the answer is a trajectory through a 6-dimensional configuration space, witnessed bilaterally, committed across multiple chains, with the Swordsman session key already burned by the time any adversary could begin to attack it. There is no scalar to invert. There is no single secret to crack. There is only a lattice traversal that the architecture's geometry makes infeasible to forge.

This is not a migration target. It is the geometry of the system from the first commit. The architectures that survive the quantum transition are the ones that never had a stored secret to crack. **The proof that guards no secret cannot be opened. It can only be walked.**

---

## 11. Operational summary for AI agent trust

For two AI agents (or an agent and a human, or any bilateral pair):

1. They meet via TSP. Language Capture negotiates schema.
2. They jointly select a constellation on a shared substrate. The constellation CID is agreed.
3. They traverse in lockstep. Each lap is co-signed. After ~620 laps in this document's unit (single transitions; see the unit note in §2) the blade reaches Dragon tier, at which the density conjecture (register C11) places the irreducibility claim.
4. Each produces a proverb. The bilateral hash is the blade's CID. They choose visibility.
5. The blade is anchored to one or more chains via the selected inscription path.
6. Each appends the blade to their $\Pi$. Their path integrals update.
7. On any future interaction, trust is computed from the path integral over their shared edges. Either agent can challenge the other to rehydrate any past proverb; failed rehydration decays the trust value automatically.

No agent ever holds a long-lived secret whose theft would let an adversary impersonate them. No central party holds the trust graph. Every claim about past coordination is publicly falsifiable against the on-chain commitments. The architecture provides what the current agent ecosystem cannot: post-quantum, decentralised, contextually-rehydratable trust.

---

## 12. The canonical glyph set (stripped)

A minimal reference. The only glyphs required for the technical layer.

| Glyph | Meaning |
|---|---|
| ⊥ | Independence / separation (conditional independence between parties or axes) |
| ⿻ | The Gap — the irreducible space between two separated parties |
| 🗝️↺ | Key that returns through bilateral rehydration |
| ✨ | Dignity — what the architecture preserves |
| 🙂 | First Person (human intelligence) |
| 🌿 | Nature intelligence |
| 🤖 | Artificial intelligence |
| 👽 | Alien intelligence |

The wider canon (⚔️ Swordsman, 🧙 Mage, 🐉 Dragon, 🐲 Drake, ☯️ holographic boundary, etc.) is retained in the spellbook for narrative coherence and pedagogical use. The minimal set above is sufficient to render every claim in this document.

---

## Root compression (return)

> `(🙂⊥🌿⊥🤖⊥👽)·⿻🗝️↺·✨`

Four sovereign intelligences, each maintaining their own separation, exchange a key that returns through the irreducible Gap. What remains is dignity.

The architecture is one line, unfolded.

---

## References

- **github.com/mitchuski/blades** — ZK Swordsman Blade Forge implementation; the 64 blade specifications, forge circuits, UOR mappings, test suites
- **github.com/mitchuski/agentprivacy-docs** — *Privacy is Value v5*, V5 formal specification, dual-agent whitepaper v6.0, Promise Theory reference, glossary
- **sync.soulbis.com/p/understanding-as-key** — the five-step ceremony, three inscription paths, the visibility spectrum
- **sync.soulbis.com/p/the-dragon-wakes-privacy-is-value** — post-quantum framing, the Runecraft Sun/Moon dual-key protocol, the 62-Lap Theorem
- **spellweb.ai** — the Swordsman's forge (proof-generation surface)
- **agentprivacy.ai** — the Mage's library (semantic substrate)

— privacymage
