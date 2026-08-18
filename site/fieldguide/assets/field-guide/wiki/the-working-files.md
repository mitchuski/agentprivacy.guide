# The Working Files

The other pages in this space *describe* the work. This one carries it.

Everything below is served by this wiki rather than linked off somebody's laptop — 59 files, 394.1 kB, with a sha256 for each in [MANIFEST.json](/assets/field-guide/MANIFEST.json) so you can tell whether what you downloaded is what was published.

Suites at time of publishing: **all green**.

## Read

* [counter-spec-meet-and-overlay.md](/assets/field-guide/docs/counter-spec-meet-and-overlay.md) — the counter-spec that went back to the Field Guide side · 30.1 kB
* [note-oasis-cred-spec-alignment.md](/assets/field-guide/docs/note-oasis-cred-spec-alignment.md) — where the OASIS server could meet the credentials spec · 13.6 kB
* [note-zk-path-for-arworld.md](/assets/field-guide/docs/note-zk-path-for-arworld.md) — could the trust layer be zero-knowledge, and in what order · 9.0 kB
* [question-map.md](/assets/field-guide/docs/question-map.md) — all 20 questions in the ARWorld pack, each anchored to the properties that answer it · 6.5 kB
* [reflection-map.md](/assets/field-guide/docs/reflection-map.md) — ARWorld set against the DTG lab, every row anchored to a checked property · 9.9 kB

Also [MANIFEST.md](/assets/field-guide/MANIFEST.md) for the file table in human form, and [reports/verify.txt](/assets/field-guide/reports/verify.txt) for the captured output of the suites.

## Run

The whole model is here and it needs nothing installed — Node and Python standard libraries only, offline.

    curl -O /assets/field-guide/field-guide-lab.tar.gz
    tar xzf field-guide-lab.tar.gz
    cd runtimes && node verify.mjs

Or read the 28 source files one at a time, starting with [the rite](/assets/field-guide/runtimes/meet-overlay/src/meet.mjs), [the disclosure layer](/assets/field-guide/runtimes/meet-overlay/src/promise.mjs), and [the suite that holds this against the task force lab](/assets/field-guide/runtimes/lab-bridge/test.mjs).

## The record travels too

Every page in this space is in the lane as plain markdown, under `wiki/` — including both chronicles and [[Proverbs Of The Trust Overlay]]. The suites say what was decided; the chronicles say why, and a bundle carrying one without the other is half an archive.

## Both strands are here

Under `source/` are the three ARWorld documents from the map side — the handoff and the two specs that prompted all of this — unaltered, so nobody has to read a reply without the thing it replies to. See [[The ARWorld Pack]]. Everything else in the lane came back down the graph strand.

Absent: anything needing a key, a token or a JWT. Nothing here talks to a live service, and this wiki is tailnet-only.

> If you disagree with any of it, the useful reply is a failing test. The suites are right there.
