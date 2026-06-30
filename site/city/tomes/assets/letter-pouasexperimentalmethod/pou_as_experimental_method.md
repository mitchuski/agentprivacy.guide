# Proof of Understanding as Experimental Method

## A protocol for evaluating multi-intelligence assemblies

*Companion to the City of Mages research package. Integrates the BabelFish evaluation frame with the lattice-of-blades identity architecture. Designed to turn Proof of Understanding from a principle into a testable method.*

---

## Root compression

> `(🙂⊥🌿⊥🤖⊥👽)·⿻🗝️↺·✨`

Four sovereign intelligences — human (🙂), nature (🌿), artificial (🤖), alien (👽) — each maintaining their own separation (⊥), exchange a key that returns (🗝️↺) through the irreducible Gap (⿻). What remains is dignity (✨). This document specifies how the architecture proves it can deliver on that compression — through experiment, not through assertion.

---

## §0 — Why this document exists

The Proof of Understanding architecture has been specified at the protocol layer (Compression-Rehydration Pathway), at the identity layer (Technical Specification), and at the multi-intelligence framing layer (the four-intelligence root compression). What it has lacked is an *evaluation method* — a way to know whether the architecture actually does what it claims to do, when deployed in a real multi-intelligence assembly.

This document is that method. It builds on a frame developed by David Bovill in conversation with the City of Mages, and adds a specific contribution from the architecture itself: a four-axis reading of the *direction of PoU* that, together with the BabelFish trust graph, gives the experiment a richer measurement instrument than a single trust score.

The frame here is not a thought experiment. It is a falsifiable protocol that can be run, scored, and replicated. The architecture's claim — that comprehension-based attestation produces better collective intelligence than possession-based authentication — is either true under measurement or it is not. This document specifies how to find out.

---

## §1 — Central hypothesis

> **H:** Groups that generate stronger, more diverse, and more repairable Proofs of Understanding produce outputs with higher reality contact than groups that do not.

The hypothesis is deliberately blunt. It is falsifiable. It is comparable across groups. It admits null results.

Three sub-hypotheses make the central claim specific enough to test:

- **H₁ (process → output):** Higher Process Quality (Section §4) predicts higher Output Quality (§5), independent of expert composition or facilitation style.
- **H₂ (output → reality):** Higher Output Quality predicts higher Reality Contact (§6), as assessed by external reviewers blind to internal scores.
- **H₃ (multi-intelligence value):** Assemblies that include AI characters and natural-intelligence representations score higher on Reality Contact than expert-only or human-only controls, after accounting for facilitation effects.

H₃ is the strongest claim and the one most likely to be falsified. It must be tested explicitly. A pilot that confirms H₁ and H₂ but falsifies H₃ would be an important negative result for the architecture and a finding worth publishing.

---

## §2 — The three-layer assessment

Every assembly is evaluated on three orthogonal layers. Each layer has its own metrics, its own reviewers, and its own data sources.

| Layer | What it measures | Who scores it |
|---|---|---|
| **Process Quality** | Whether PoU is happening inside the assembly | BabelFish trust-graph instrumentation; observer panel |
| **Output Quality** | Whether the assembly produced something coherent | Peer reviewers, domain experts |
| **Reality Contact** | Whether the something survives the world | Affected communities, ecological monitors, rival assemblies, time |

Critical requirement: **Reality Contact reviewers must be blind to the Process Quality score** at the time of initial assessment. This is the basic experimental control that lets H₁–H₂ be tested rather than confounded by reviewer halo effects. The blinding can be released after the initial assessment is recorded, for later analysis.

Each layer is specified in §§4–6. The four-axis direction-of-PoU reading in §3 applies to all three layers.

---

## §3 — Direction of PoU — four orthogonal axes

A PoU edge in the trust graph is not a scalar. It is a four-axis tagged object. The single trust score that most deliberative-democracy projects compute collapses these axes and loses most of the signal. The architecture provides them explicitly.

### Axis 1 — Symmetry

A PoU edge can be **bilateral** (both parties have rehydrated each other's compression) or **unilateral** (only one direction verified). Bilateral edges are the canonical case the protocol is built for; unilateral edges are common at intermediate stages of a ceremony and are themselves informative. The **symmetry ratio** of an assembly's trust graph — the proportion of edges that are bilateral — is a measurable quality variable independent of edge count.

### Axis 2 — Power gradient

A PoU edge runs between parties of asymmetric standing. *Upward* PoU: a participant rehydrates an expert's compression. *Downward* PoU: an expert rehydrates a participant's compression. Most existing expert-panel methods test only the upward direction. The architecture's claim is that **downward PoU is where reality contact lives**, because the expert's map of the world is the one most likely to be missing the relevant terrain. Power-gradient tagging is therefore the most diagnostic axis for the multi-intelligence value hypothesis (H₃).

### Axis 3 — Time vector

A PoU edge formed at week 1 is different from one formed at week 6. An assembly can be characterised by the trajectory of its trust-graph density over time, not just its endpoint. Three trajectories are diagnostic:

- **Convergent** — early edges thin, late edges thick. The assembly is learning to understand each other.
- **Divergent** — early edges thick, late edges thin. Trust collapsed; the assembly failed.
- **Differentiating** — edge density rises, *but* disagreement also rises. The gold standard. The trust graph thickens enough that disagreement can travel without being destroyed.

The path integral $T_\int(\pi)$ over the assembly's trust-graph trajectory is the right mathematical object for this axis. It is order-sensitive: two assemblies that end at the same graph but traversed different paths are different experiments.

### Axis 4 — Intelligence-pair type

A PoU edge between two humans (🙂↔🙂) is structurally different from one between a human and an AI character (🙂↔🤖), from one between a human and a natural-intelligence proxy (🙂↔🌿), and so on. The architecture's substrate-neutrality says the *form* of the ceremony is the same, but the *evidential weight* of a successful rehydration differs by pair type. A river that has been "understood" by a human via a guardian carries a higher rehydration risk than a human–human edge, and confidence intervals on its quality should reflect that.

Pair types to tag explicitly: 🙂↔🙂 · 🙂↔🤖 · 🙂↔🌿 · 🤖↔🤖 · 🤖↔🌿 · 🌿↔🌿. Each gets its own row in the assessment table, with its own n, its own mean, and its own confidence interval.

### Combined notation

Each PoU edge in the trust graph carries four tags: `⟨symmetry, gradient, time, pair-type⟩`. An edge tagged `⟨bilateral, downward, week-4, 🙂↔🌿⟩` means: a human and a river-guardian have mutually rehydrated each other's compressions; the gradient flowed downward (the expert rehydrated the indigenous knowledge-holder, not just the reverse); it happened mid-assembly; it is a human-to-natural-intelligence pair. The trust-graph dashboards should display these four axes as filterable dimensions, not collapsed into a single number.

---

## §4 — Process Quality measurement

What we measure: whether PoU is happening, and whether it is happening across the four-axis space.

| Metric | Definition | Architecture mapping |
|---|---|---|
| **Validated PoU count** | Number of bilateral commitments forged and rehydrated successfully | Each is a blade with chain anchor and verified rehydration |
| **Symmetry ratio** | Proportion of trust-graph edges that are bilateral | Axis 1 across the graph |
| **Repair rate** | Failed rehydrations that successfully re-ceremonied at higher visibility | Visibility-budget complement: $\sum_i (1-\sigma_i) \cdot \rho_i$ for repair events |
| **Perspective change rate** | Documented instances of a party revising position after rehydration | Behavioural density $\rho_i$ on edges where revision occurred |
| **Weak-signal inclusion** | Edges to marginal, dissenting, ecological, or non-dominant participants | Pair-type breakdown (Axis 4); proportion of edges in non-majority pair types |
| **Differentiating trajectory** | Whether edge density rises while disagreement also rises | Path integral signature (Axis 3) |
| **Dissent preservation** | Quality of dissenting voices represented in final output | Manual coding of output against initial trust-graph diversity |

The BabelFish instrumentation (§7) captures these metrics directly from interaction logs. The observer panel (a small group of trained reviewers external to the assembly) cross-validates by independent coding of a 10% sample.

---

## §5 — Output Quality measurement

What we measure: whether the assembly produced something coherent, useful, and reviewable.

Output type determines the rubric. For governance outputs (constitutions, protocols, policy proposals), reviewers score on clarity, coherence, legitimacy, ecological sensitivity, legal plausibility, adaptability, conflict-resolution capacity, enforceability, protection of non-human interests, resistance to capture. For research outputs (scientific arguments, existential-risk recommendations, mathematical results), reviewers score on factual accuracy, novelty, explanatory power, engagement with existing literature, uncertainty handling, practical relevance, falsifiability, quality of reasoning.

Output Quality scoring is blinded — reviewers do not know which assembly produced which output, and they do not know the Process Quality scores of the producing assemblies. This is the basic experimental control that lets H₁ be tested.

Two reviewer panels score each output independently. Inter-rater agreement is itself a reported metric (low agreement indicates the rubric is doing more work than it should). A minimum of three reviewers per output, ideally five, with at least one from outside the academic mainstream.

---

## §6 — Reality Contact measurement

What we measure: whether the output's map survives contact with the world.

This is the hardest, slowest, and most important layer. Reality Contact cannot be scored at publication. It accrues across months or years, as the output is used, ignored, contested, implemented, or refuted. Six measurable forms of Reality Contact:

1. **Predictive accuracy.** Did the output make falsifiable predictions? Did those predictions come true?
2. **Community recognition.** Did affected communities recognise the output as useful, and use it?
3. **Ecological signal.** Did relevant ecological indicators improve, stabilise, or were they at least *represented* in a way that allows future monitoring?
4. **Implementation experience.** When the output was acted on, did implementation reveal fewer blind spots than expected, or more?
5. **Rival assessment.** Could a hostile reviewer or rival assembly find a fatal omission that the producing assembly missed?
6. **Decision quality.** Did the output lead to better practical decisions, where "better" is operationalised against the assembly's own stated objectives?

Reality Contact is the layer where the architecture's deepest claim is tested. *Comprehension-based attestation should produce maps of the world that survive the world more reliably than possession-based attestation.* If H₂ is confirmed, the architecture has moved from interesting protocol to demonstrated method.

Reality Contact assessment must include time-lagged measurement. A first read at 3 months, a second at 12 months, a third at 36 months. Pre-registration of the assessment protocol is required.

---

## §7 — The 42-person Palava — protocol

The assembly structure is 42 participants in 7 groups of 6 over 6 weeks. The numbers are not arbitrary: 7×6 gives each participant 5 within-group counterparts (manageable for high-bandwidth bilateral PoU), and 36 cross-group counterparts (broad enough for trust-graph diversity testing). The 6-week duration is long enough for the differentiating trajectory of Axis 3 to manifest, short enough to remain instrumentable.

**Six-week phase structure:**

1. **Week 1 — Orientation and identity formation.** Participants meet, exchange vocabularies, agree on the substrate of the assembly's work. (Maps to Steps 1–2 of the Compression-Rehydration Pathway.)
2. **Week 2 — One-to-one PoU sessions.** Each participant completes a target number of bilateral compressions with within-group counterparts. (Step 3–6 of the Pathway, at low tier.)
3. **Week 3 — Small-group synthesis.** Groups of 6 work on assembly sub-problems. Cross-group sessions begin.
4. **Week 4 — AI character challenge sessions.** Marvin, Deep Thought, BabelFish, and any other AI characters engage the assembly. Pair-type 🙂↔🤖 edges are forged.
5. **Week 5 — Natural-intelligence representation sessions.** Guardians, ecological-monitoring data, indigenous knowledge-holders bring 🙂↔🌿 and 🤖↔🌿 edges into the trust graph.
6. **Week 6 — Drafting, peer review, and red-team challenge.** Assembly produces its output. External reviewers and adversarial red team test it. Revisions are incorporated. Final output is published.

**Variant arms for testing.** To isolate effects, run multiple cohorts in parallel:

- Cohort A: full Palava protocol with all AI characters and natural-intelligence representation.
- Cohort B: Marvin only (sceptical critic).
- Cohort C: Deep Thought only (long-range constitutional reasoner).
- Cohort D: BabelFish only (translation and misunderstanding detector).
- Cohort E: no AI characters.
- Cohort F: no natural-intelligence representation.
- Cohort G: expert facilitation only (no Palava structure, no AI, no natural-intelligence) — the baseline.

Comparing Cohort A against G tests the package's overall value. Comparing B/C/D against E isolates the contribution of each AI character. Comparing A against F isolates the natural-intelligence contribution.

---

## §8 — BabelFish as measurement instrument

BabelFish is not a translator. It is the assembly's assessment instrument.

The BabelFish protocol logs a PoU edge when, and only when, all six of the following are observed in an interaction:

1. **Restatement.** Party A states Party B's position in A's own words.
2. **Confirmation or correction.** Party B confirms the restatement, corrects it, or rejects it.
3. **Revision.** If correction occurred, Party A revises the restatement.
4. **Recognition.** Party B recognises the revised restatement as adequate.
5. **Consequence.** Party A demonstrates a changed behaviour, wording, priority, decision, or model in response.
6. **Record.** The interaction is committed to the trust graph as a tagged edge `⟨symmetry, gradient, time, pair-type⟩`.

The sixth step is non-trivial. It is the chain-anchored commitment of the PoU into the assembly's persistent record. Without it, the interaction was a conversation, not a Proof of Understanding.

BabelFish's role across the assembly:

- During Weeks 1–2, BabelFish primes the protocol — it teaches participants what counts as a PoU edge.
- During Weeks 3–5, BabelFish *measures* — it captures edges as they form, surfaces missed-rehydration opportunities, and flags interactions where understanding was claimed but not demonstrated.
- During Week 6, BabelFish *audits* — it confirms the trust-graph trajectory is complete and that the assembly's claims about its own understanding are supported by the edge log.

BabelFish runs as a verified AI character on the assembly's compute infrastructure. Its outputs are reviewable. Its measurement protocol is open and falsifiable. It is itself subject to the assembly's PoU process — participants can challenge BabelFish's coding, and BabelFish must demonstrate rehydration of contested edges.

---

## §9 — The trust graph

The trust graph of an assembly is a directed multigraph $G = (V, E)$, where:

- $V$ = the 42 participants plus any AI characters and natural-intelligence representations active in the assembly.
- $E$ = the set of PoU edges. Each edge $e \in E$ carries the four-axis tag $\langle s_e, g_e, t_e, p_e \rangle$, the chain anchor of the underlying commitment, and the rehydration-fidelity score.

Edge types tracked:

- **Verified understanding** — the canonical case.
- **Repair after misunderstanding** — a follow-on edge in the trust graph, tagged as repair.
- **Reliable representation** — Party A successfully rehydrated Party B's position in a different group, in B's absence.
- **Predictive accuracy** — Party A predicted what Party B would reject or accept, before the interaction.
- **Translation** — fair carriage of an argument across a power-gradient or pair-type boundary.

A strong trust graph is not one where everyone agrees. It is one where **disagreement can travel without being destroyed**. The architecture's contribution is to give this property a measurable form: a high symmetry ratio combined with sustained or rising disagreement metrics in the assembly's deliberation, across the time vector of Axis 3.

---

## §10 — Control groups

Five controls are required for the central hypothesis to be testable. Each isolates a different alternative explanation for any observed assembly performance.

1. **Classic Expert Panel.** A conventional group of domain experts produces the same output. Tests whether the Palava beats standard peer review.
2. **Human-Only Assembly.** A 42-person deliberative group with no AI characters and no natural-intelligence representation. Tests whether the multi-intelligence layer adds value.
3. **AI-Only Drafting Group.** AI systems generate the output from the same briefing materials. Tests whether the human and dialogic process improves on machine synthesis.
4. **Standard Citizens' Assembly.** A conventional deliberative method (sortition, expert testimony, facilitated discussion). Tests whether the Palava adds anything beyond existing democratic-innovation methods.
5. **Adversarial Red Team.** A separate group whose only task is to break the outputs — legally, scientifically, ethically, politically, ecologically. Tests robustness.

The Adversarial Red Team is itself subject to a parallel measurement: it should *also* generate PoU edges (with the assembly being challenged). A red team that successfully rehydrates the producing assembly's compressions and *then* finds fatal omissions is the strongest test the system can sustain.

---

## §11 — First pilot — Constitution for a Multi-Intelligence Commons

The first pilot's output should be: *A draft constitution for a multi-intelligence commons.*

Why this output:

- It directly tests the architecture's own governance assumptions.
- It is concrete enough to be reviewed by lawyers, ecologists, technologists, and philosophers — covering all major reviewer-class blind spots.
- It invites Marvin, Deep Thought, BabelFish, humans, and natural-intelligence proxies into meaningful roles.
- It creates a reusable protocol for later assemblies on different objects.
- Its Reality Contact can be measured by attempted adoption: a forest, river, or commons that elects to operate under the constitution becomes a longitudinal test of the architecture's deepest claim.

Two public artefacts emerge from the pilot:

- **The Draft Constitution for a Multi-Intelligence Commons** — the assembly's output.
- **The BabelFish Evaluation Report: Does Proof of Understanding Improve Collective Intelligence?** — the experiment's findings.

The evaluation report is published whether the hypothesis is confirmed or falsified. Pre-registration of the experimental protocol with a public registry (e.g. OSF) is required before the pilot begins.

---

## §12 — Open questions and next steps

The protocol above is a working draft. Several questions remain open and should be resolved before the first pilot:

- **The trust-graph commit format.** Should PoU edges anchor to Zcash (privacy-preserving), Ethereum (composability), or a private mesh (assembly-internal)? The four-axis tagging is independent of anchor, but the choice of anchor affects who can later verify the trust graph and how.

- **The pair-type evidential weight calibration.** Confidence intervals on 🙂↔🌿 and 🙂↔🤖 pair types should differ from 🙂↔🙂. What is the calibration? An initial proposal is to weight by the inverse of the rehydration risk — pair types where rehydration is more likely to fail get wider confidence intervals — but the calibration itself needs an experimental basis.

- **The natural-intelligence representation problem.** Whanganui-style guardianship, Mar Menor-style citizen-guardianship, ecological-monitoring data, indigenous knowledge-holders — these are heterogeneous. The protocol treats them as 🌿 substrate but they are not interchangeable. A typology of natural-intelligence representations and their differential evidential weights is owed.

- **The AI character problem.** Marvin, Deep Thought, and BabelFish are presented here as if their roles are fixed. They are not. Each AI character is itself a participant subject to PoU; their persona drift across the assembly is a measurable risk to the protocol's integrity. Continuous rehydration testing of AI characters by the human participants is a candidate mitigation.

- **Pre-registration discipline.** All variant cohort arms and all sub-hypotheses must be pre-registered with the experimental protocol. The temptation to derive H₃ post-hoc from any positive result must be foreclosed.

These open questions are the next layer of City of Mages research. Subsequent patches will address each in turn.

---

## §13 — Acknowledgement

The three-layer assessment frame, the central hypothesis formulation, the five-control structure, the 42-person Palava architecture, the BabelFish-as-measurement-instrument reading, and the first-pilot proposal are owed to David Bovill. The evaluation method documented here is built on his frame; it is published with his collaboration and recognition.

The four-axis direction-of-PoU reading (Section §3) is the City of Mages' contribution to the protocol. It is offered as the architecture's answer to the question David flagged at the close of his original frame.

The integration of the two — David's evaluation frame with the architecture's lattice — is the work this document does. Errors and over-reaches are the City of Mages'.

---

## §14 — References

- **Compression-Rehydration Pathway** — `compression_rehydration_pathway.md`
- **Proof of Understanding — Technical Specification** — `proof_of_understanding_technical_spec.md`
- **City of Mages Research Patch ᚢ** — `research_patch_city_of_mages.md`
- **Understanding as Key** — `sync.soulbis.com/p/understanding-as-key`
- **github.com/mitchuski/blades** — ZK Swordsman Blade Forge
- **github.com/mitchuski/agentprivacy-docs** — V5 formal specification

— privacymage, for the City of Mages
