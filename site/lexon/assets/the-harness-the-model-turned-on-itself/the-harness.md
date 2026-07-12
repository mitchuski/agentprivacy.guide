# The harness: the model, turned on itself

*The work was not done by hand. It was done by a dual-agent research loop that
is the same architecture the Privacy Value Model describes — which is the
point.*

## The idea

The PVM says: keep two agents separate, let one propose and one verify, and
hold them apart with a third seat so that neither can tune to the other. That
is not only a privacy design. It is also a recipe for *trustworthy research* —
because the thing that makes a research result believable is exactly that the
person checking it could not have rigged the check.

So the project was run as a **dual-agent harness**: a generic skeleton
(shared across several of the author's projects) that was fitted to this
domain. The harness turns the privacy architecture into a research instrument
and points it at the privacy model. The harness that produced this work is
itself an instance of the pattern the work describes.

## The seven seats

Each run of the loop is played by seven roles ("seats"). No seat sees more
than its card allows — the separation is enforced, not requested.

- **Measure** — opens the round with fresh, verified numbers. No advocacy.
- **Propose** (the Mage 🧙) — proposes one *lever*: a reusable recipe for
  expressing a family of canon terms, plus worked examples. It is blind to how
  it will be tested.
- **Hold-apart** (the Gap ⿻) — takes the finished proposal, serializes it,
  hashes it, and from that hash draws the held-out terms the prover must
  express. Because the draw comes from the proposal's own fingerprint, the
  proposer provably could not have tuned to it.
- **Assay** (the Swordsman ⚔️) — runs the *full* gate: expresses each drawn
  term from the recipe alone, checks every claim, and returns a verdict. A
  candidate that passes a cheap check but fails the full gate is a **mirage**,
  named without softening.
- **Critic** — classifies the whole round and hands the next round exactly one
  lead. It red-teams the proposer's reasoning, never the prover's verdict.
- **Chronicle** — writes the round's record so the next session can resume
  cold.
- **Keystone** — the pair itself, held apart, in the main session. It folds
  validated results into the permanent lexicon, and it makes the door visible
  without ever opening it.

## The six-phase loop

```
Measure  →  Propose  →  Hold-apart  →  Assay  →  Critic  →  Chronicle
 (numbers)  (Mage:      (Gap: hash     (Sword:   (classify) (record)
             a recipe)   the proposal,  run the
                         draw witnesses)full gate)
```

Then, between rounds, the **keystone fold**: verified expressions are written
into `artifact/LEXICON.lexon.md`, the metric is re-derived, and the frontier
advances. A run is several rounds until it goes dry or hits its cap.

## Why the Gap is the whole thing

The subtle part is the Gap. Notice what the model's separation trust does
*not* say: it does not ask either agent to *promise* separation. Neither
can — an agent can only promise its own behavior, and "I will not learn what
the other knows" is not something either seat can enforce from the inside. The
separation lives in the promises they *don't* make to each other, held open by
a third seat whose only job is to derive what neither may choose.

Concretely: the proposer never sees the test. The Gap hashes the proposal and
draws held-out terms from the digest. The prover must then express those terms
*using only the proposer's recipe*. If the recipe is genuinely general, the
prover succeeds; if it only worked on the examples the proposer hand-picked,
it fails. This is a Fiat-Shamir construction — the same cryptographic idea
that makes a proof non-interactive — repurposed to make research honest.

## What the loop caught (and this is the evidence it works)

A believable instrument is one that catches its own mistakes. Over five runs
the loop named, and did not soften:

- **Two false self-certifications** — proposals that claimed to be clean and
  were not (one em dash out of place). Found by having the prover scan the
  bytes rather than trust the claim.
- **A vacuity class** — coverage bought by hiding content in name strings the
  checker cannot inspect. Named, then made mechanical.
- **Template-stamping** — one clause skeleton dressed up as many terms.
- **Lens convergence** — the discovery that three supposedly different
  approaches had become one method validated many times over, so the metric
  was over-counting. The next run fixed it by construction.
- **A lever that killed itself** — a recipe that honestly reported it could
  not express a class of terms, citing a *previous* run's refusal as binding
  precedent. Discipline had propagated into the agents' own reasoning.

Two structural kills were filed, each with a re-open condition, because a
killed idea is not an impossible one. This is the harness doing its job: the
wins and the kills are recorded with equal prominence.

## The reflexive turn

There is a pleasing loop-closure here. The harness expresses the PVM's canon
in Lexon; and the harness's own constitution — the trusts and seats that
govern it — is *also* expressed in Lexon, as thirteen verified spells (see
[the results](the-results.md)). The instrument wrote its own law in the
language its own loop gates. That was the operator's stated goal from day one:
"lexon your own dual agents."
