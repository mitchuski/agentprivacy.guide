// vpkb/search.js — the pathway search core, shared verbatim by node and browser.
//
// One implementation, three homes: vpkb/suggest.js at the CLI, the live star
// chart on the local farm, and the baked static chart on guide.agentprivacy.ai.
// Written to run in all three without a build step — CommonJS when there is a
// module object, window.VPKBSearch when there is not.
//
// Retrieval is BM25 over the compact per-site index (vpkb/index.js), scored with
// a df merged across every loaded site so cross-site scores are comparable.
// Then the link graph fills the walk in, and relevance orders it.

(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.VPKBSearch = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {

  const STOP = new Set(('a an and are as at be been but by can do does for from had has have how i if in into is it its'
    + ' its of on or that the their then there these they this to was were what when where which who will with you your'
    + ' not no nor so than too very just also may might must shall should would could about after all any because before'
    + ' between both each few more most other some such only own same s t don now here his her he she them we us our')
    .split(' '));

  function terms(text) {
    const out = [];
    const re = /[a-z][a-z0-9'-]{1,}/g;
    let m;
    const s = String(text).toLowerCase();
    while ((m = re.exec(s))) {
      const w = m[0].replace(/['-]+$/, '');
      if (w.length < 3 || STOP.has(w)) continue;
      out.push(w);
    }
    return out;
  }

  // ---- 1 · retrieve ---------------------------------------------------------
  const K1 = 1.2, B = 0.75;

  function cosine(a, b) {
    let dot = 0, na = 0, nb = 0;
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
    return (na && nb) ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
  }

  // Blend semantic similarity into the lexical ranking, when — and only when —
  // the caller supplies an embedded query. BM25 is unbounded and cosine is
  // [-1,1], so neither can be added to the other raw: each side is normalised by
  // its own best score first, then mixed. The browser has no embedder and passes
  // no vector, so it runs pure lexical; that is the documented floor, not a bug.
  function blend(hits, indexes, qv, weight) {
    const vecs = new Map();
    for (const ix of indexes) if (ix.vectors) vecs.set(ix.site, ix.vectors);
    if (!vecs.size) return hits;
    let maxLex = 0, maxCos = 0;
    for (const h of hits) {
      const m = vecs.get(h.site);
      const v = m && (m.get ? m.get(h.slug) : m[h.slug]);
      h.cos = v ? cosine(qv, v) : 0;
      if (h.score > maxLex) maxLex = h.score;
      if (h.cos > maxCos) maxCos = h.cos;
    }
    if (maxCos <= 0) return hits;
    const w = weight == null ? 0.5 : weight;
    for (const h of hits) {
      h.lex = h.score;
      h.score = (1 - w) * (h.score / (maxLex || 1)) + w * (h.cos / maxCos);
    }
    hits.sort((a, b) => b.score - a.score);
    return hits;
  }

  function retrieve(indexes, query, opts) {
    const q = [];
    for (const t of terms(query)) if (q.indexOf(t) < 0) q.push(t);
    if (!q.length) throw new Error('query has no searchable terms');

    // df merged across every loaded site, N summed — otherwise a term common in
    // atlas and rare in kyra scores incomparably between them
    let N = 0, totalDl = 0, totalPages = 0;
    const df = new Map();
    const vpos = [];
    indexes.forEach((ix, n) => {
      N += ix.N; totalDl += ix.avgdl * ix.N; totalPages += ix.N;
      const pos = new Map();
      for (const t of q) {
        const i = ix.vocab.indexOf(t);
        if (i >= 0) { pos.set(i, t); df.set(t, (df.get(t) || 0) + ix.df[i]); }
      }
      vpos[n] = pos;
    });
    const avgdl = totalDl / (totalPages || 1);
    const idf = new Map();
    for (const t of q) { const n = df.get(t) || 0; idf.set(t, Math.log(1 + (N - n + 0.5) / (n + 0.5))); }

    const hits = [];
    indexes.forEach((ix, n) => {
      const qi = vpos[n];
      if (!qi.size) return;
      ix.pages.forEach((pg, pos) => {
        let score = 0, matched = 0;
        for (const kv of pg.k) {
          const t = qi.get(kv[0]);
          if (!t) continue;
          matched++;
          const tf = kv[1];
          score += idf.get(t) * (tf * (K1 + 1)) / (tf + K1 * (1 - B + B * pg.dl / avgdl));
        }
        if (score <= 0) return;
        // a page matching more of the query is more on-topic than one hammering
        // a single term — reward coverage explicitly
        score *= 1 + 0.25 * (matched - 1);
        hits.push({ site: ix.site, pos, slug: pg.s, title: pg.t, strand: pg.x, score, words: pg.w, ix });
      });
    });
    hits.sort((a, b) => b.score - a.score);
    if (opts && opts.queryVector) blend(hits, indexes, opts.queryVector, opts.vectorWeight);
    return { hits, q };
  }

  // ---- 2 · expand along the link graph --------------------------------------
  // A link is an invitation, not a licence to widen the disclosure. Only pages
  // strongly relevant in their own right come along, at most two per seed —
  // otherwise a hub page's link list quietly doubles what the grant opens.
  function expand(hits, seeds, floor, perSeed) {
    const byKey = new Map(hits.map(h => [h.site + '/' + h.slug, h]));
    const taken = new Set(seeds.map(h => h.site + '/' + h.slug));
    for (const seed of seeds) {
      const cand = [];
      for (const li of seed.ix.pages[seed.pos].l) {
        const k = seed.site + '/' + seed.ix.pages[li].s;
        if (taken.has(k)) continue;
        const h = byKey.get(k);
        if (h && h.score >= Math.max(floor, seed.score * 0.6)) cand.push(h);
      }
      cand.sort((a, b) => b.score - a.score);
      for (const h of cand.slice(0, perSeed)) {
        h.viaLink = seed.slug;
        taken.add(h.site + '/' + h.slug);
        (seed.companions = seed.companions || []).push(h);
      }
    }
    return seeds;
  }

  // ---- 3 · order into a walk ------------------------------------------------
  // Relevance sets the spine, links fill it in: each seed in score order, then
  // the pages it linked to that earned their way in. That reads like a
  // curriculum instead of a random walk stranding a strong page behind a weak one.
  function order(seeds) {
    const walk = [];
    let lastSite = null;
    for (const seed of seeds.slice().sort((a, b) => b.score - a.score)) {
      if (lastSite && seed.site !== lastSite) seed.jump = true;
      walk.push(seed);
      for (const c of (seed.companions || []).sort((a, b) => b.score - a.score)) walk.push(c);
      lastSite = seed.site;
    }
    return walk;
  }

  // ---- the walk -------------------------------------------------------------
  // Returns the ordered steps plus how each one was found. Shaping it into a
  // pathway.v1 is the caller's job — node does it through vpkb/pathway.js, the
  // chart does it in the page.
  function walk(indexes, query, opts) {
    opts = opts || {};
    const limit = opts.limit || 9;
    const perSite = opts.perSite || 3;
    const r = retrieve(indexes, query, opts);
    if (!r.hits.length) return null;

    const top = r.hits[0].score;
    // A per-site cap keeps an index site (atlas is 848 pages of summaries that
    // mention everything) from swallowing a pathway that should span the
    // federation. Raise it when the query really is about one site.
    const used = new Map(), seeds = [];
    for (const h of r.hits) {
      if (h.score < top * 0.45) break;
      const n = used.get(h.site) || 0;
      if (n >= perSite) continue;
      used.set(h.site, n + 1); seeds.push(h);
      if (seeds.length >= limit) break;
    }
    const steps = order(expand(r.hits, seeds, top * 0.5, opts.perSeed == null ? 2 : opts.perSeed));

    const shape = (h, via) => ({
      site: h.site, slug: h.slug, title: h.title, strand: h.strand, words: h.words,
      score: Math.round(h.score * 1000) / 1000,
      cos: h.cos == null ? null : Math.round(h.cos * 1000) / 1000,
      via: via || (h.viaLink ? 'link from ' + h.viaLink : (h.jump ? 'jump' : 'seed')),
    });

    // The runners-up. Auto-selection has to draw a line somewhere, and the page
    // just below it is often the one a person actually wanted — so hand back what
    // was ranked and passed over, rather than silently discarding it. The caller
    // decides whether to show them; the CLI prints the walk, the chart lets you
    // promote from this list.
    const chosen = new Set(steps.map(h => h.site + '/' + h.slug));
    const candidates = r.hits
      .filter(h => !chosen.has(h.site + '/' + h.slug))
      .slice(0, opts.candidates == null ? 14 : opts.candidates)
      .map(h => shape(h, 'not chosen'));

    return {
      query,
      scanned: indexes.reduce((a, i) => a + i.N, 0),
      semantic: !!(opts.queryVector && indexes.some(i => i.vectors)),
      matched: r.hits.length,
      steps: steps.map(h => shape(h)),
      candidates,
    };
  }

  // ---- dream ----------------------------------------------------------------
  // A walk with no query behind it. Not noise: a weighted random walk over the
  // link graph the federation already has, biased by whatever traces the dreamer
  // brings — the sites it has walked before, and, more importantly, the FRONTIER
  // of those walks: pages linked from somewhere known that were never themselves
  // visited. That is where a dream is worth having.
  //
  // It crosses sites using a fact the index records almost by accident: every
  // page keeps the link names it could NOT resolve inside its own site (`L`).
  // Those are usually pages on other sites, so following one is how a walk
  // leaves home — the federation's real link structure, not a random hop.
  //
  // For an agent pointed at the map with nothing asked of it, this is the move:
  // dream a path, look at what it found, then decide whether to share or request it.
  function dream(indexes, opts) {
    opts = opts || {};
    const rng = opts.rng || Math.random;
    const len = Math.max(2, opts.length || 9);
    const temp = opts.temperature == null ? 0.6 : opts.temperature;  // 0 = greedy, 1 = loose

    // where every slug lives, so an unresolved link name can be followed across sites
    const home = new Map();
    indexes.forEach(ix => ix.pages.forEach((pg, pos) => {
      if (!home.has(pg.s)) home.set(pg.s, { ix, pos, site: ix.site });
    }));

    const traced = new Set(), tracedSite = new Map();
    for (const t of (opts.traces || [])) {
      traced.add(t.site + '/' + t.slug);
      tracedSite.set(t.site, (tracedSite.get(t.site) || 0) + 1);
    }
    // the frontier: linked from something known, never walked itself
    const frontier = new Set();
    for (const t of (opts.traces || [])) {
      const h = home.get(t.slug);
      if (!h) continue;
      const pg = h.ix.pages[h.pos];
      for (const li of pg.l) {
        const k = h.site + '/' + h.ix.pages[li].s;
        if (!traced.has(k)) frontier.add(k);
      }
      for (const nm of (pg.L || [])) {
        const o = home.get(nm);
        if (o && !traced.has(o.site + '/' + nm)) frontier.add(o.site + '/' + nm);
      }
    }

    // How many pages link TO each page. Needed to tell a page that is central
    // because it MATTERS from one that is central because it is a table of
    // contents — every site's welcome page is linked from everywhere, and
    // dreaming into it repeatedly is how this stopped being interesting.
    const indeg = new Map();
    indexes.forEach(ix => ix.pages.forEach(pg => {
      for (const li of pg.l) {
        const k = ix.site + '/' + ix.pages[li].s;
        indeg.set(k, (indeg.get(k) || 0) + 1);
      }
    }));

    const weightOf = (ix, pg, pos) => {
      const key = ix.site + '/' + pg.s;
      let w = 1;
      w += Math.min(pg.l.length, 8) / 8;               // some connection, not a directory
      w += Math.min(pg.w || 0, 1200) / 900;            // substance over stubs
      if (tracedSite.has(ix.site)) w += 1.2;           // familiar ground
      if (frontier.has(key)) w += 3;                   // the adjacent unknown
      if (traced.has(key)) w *= 0.15;                  // been here
      // navigation, not content: linked from a large share of its own site
      if ((indeg.get(key) || 0) > Math.max(6, ix.N * 0.15)) w *= 0.12;
      return w;
    };

    // weighted sample, softened by temperature
    const pick = list => {
      if (!list.length) return null;
      const ws = list.map(c => Math.pow(Math.max(c.w, 1e-6), 1 / Math.max(temp, 0.05)));
      let r = rng() * ws.reduce((a, b) => a + b, 0);
      for (let i = 0; i < list.length; i++) { r -= ws[i]; if (r <= 0) return list[i]; }
      return list[list.length - 1];
    };

    const pool = [];
    indexes.forEach(ix => ix.pages.forEach((pg, pos) =>
      pool.push({ ix, pos, pg, site: ix.site, w: weightOf(ix, pg, pos) })));
    if (!pool.length) return null;

    const seen = new Set();
    const steps = [];

    // Seeding is where traces have to bite. A weight bonus does not survive
    // contact with two thousand pages — a handful of frontier pages will lose to
    // the pool almost every time. So when there IS a frontier, start on it: the
    // dream begins at the edge of what the dreamer already knows, and wanders
    // outward from there. Without traces it starts anywhere, which is the point.
    const frontierPool = pool.filter(c => frontier.has(c.site + '/' + c.pg.s));
    let cur = (frontierPool.length && rng() < 0.8) ? pick(frontierPool) : pick(pool);

    while (cur && steps.length < len) {
      const key = cur.site + '/' + cur.pg.s;
      if (seen.has(key)) break;
      seen.add(key);
      steps.push({
        site: cur.site, slug: cur.pg.s, title: cur.pg.t, strand: cur.pg.x, words: cur.pg.w,
        via: steps.length === 0 ? 'seed' : cur.via,
      });

      // where could this page lead?
      const next = [];
      for (const li of cur.pg.l) {
        const pg = cur.ix.pages[li];
        if (seen.has(cur.site + '/' + pg.s)) continue;
        next.push({ ix: cur.ix, pos: li, pg, site: cur.site, w: weightOf(cur.ix, pg, li), via: 'link' });
      }
      for (const nm of (cur.pg.L || [])) {           // the door out of this site
        const o = home.get(nm);
        if (!o || o.site === cur.site) continue;
        const pg = o.ix.pages[o.pos];
        if (seen.has(o.site + '/' + pg.s)) continue;
        next.push({ ix: o.ix, pos: o.pos, pg, site: o.site, w: weightOf(o.ix, pg, o.pos) * 1.4, via: 'across' });
      }

      // a dream leaps when there is nowhere good to go — a page whose only exit
      // is its site's contents page is a dead end dressed as a link — and
      // occasionally anyway, because that is what makes it a dream
      const best = next.reduce((m, c) => Math.max(m, c.w), 0);
      const leap = !next.length || best < 0.6 || rng() < 0.18;
      if (leap) {
        const far = pool.filter(c => !seen.has(c.site + '/' + c.pg.s)
          && (c.pg.x !== cur.pg.x || !next.length));      // prefer another strand
        const c = pick(far.length ? far : pool.filter(x => !seen.has(x.site + '/' + x.pg.s)));
        if (!c) break;
        cur = { ...c, via: 'leap' };
      } else {
        cur = pick(next);
      }
    }

    return {
      dreamed: true,
      scanned: pool.length,
      traces: (opts.traces || []).length,
      frontier: frontier.size,
      steps,
      candidates: [],
    };
  }

  return { terms, retrieve, expand, order, walk, dream, cosine, blend, STOP };
}));
