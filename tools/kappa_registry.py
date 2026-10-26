# The guide's κ-registry: every published page of the snapshot named by the κ of its content, folded into one root
# per site and one root for the federation, each snapshot a step that names the one before.
#
#   page κ   = kappa-label (dCBOR, sha256) of {"title", "story": items without their random "id"}: the content alone,
#              so the hash moves when the words change and not when the page is merely re-saved; no journal.
#   site     = packets rule over "<slug>|<page κ>" (sorted, sha256(a|b), odd node promoted: the City Key's rule)
#   gates    = a site of their own: "<gate id>|<κ of the sealed blob's bytes>"; the opened text is never read
#   root     = κ of {schema, snapshot day, federation root (packets over "<site>|<site root>"), prior, counts}
#
# Two hashes per page: the published κ goes in site/kappa/registry.json (public, with the snapshot); the κ of the
# live farm page it was made from (~/.wiki/<host>.localhost/pages/<slug>, same content rule) goes in
# flow/kappa/source.json (local). Later, `--diverge` compares the live farm against that source record: an edit in
# the farm after the snapshot is a divergence, which is the point (the snapshot rewrites links, so published and
# live are compared each to its own kind).
#
# usage (repo root, right after `node tools/snapshot.mjs`, the star chart and `node tools/gate.mjs`):
#   py -3 tools/kappa_registry.py            mint: site/kappa/registry.json + flow/kappa/<day>-<root8>.json + source
#   py -3 tools/kappa_registry.py --diverge  report: live farm vs the last mint's source record
#   py -3 tools/kappa_registry.py --verify   re-derive the published registry from site/ alone
import hashlib, json, os, re, sys, datetime
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE, FLOW = os.path.join(ROOT, "site"), os.path.join(ROOT, "flow", "kappa")
WIKI = os.path.join(os.path.expanduser("~"), ".wiki")
sys.path.insert(0, os.environ.get("KAPPA_LIB", os.path.join(os.path.expanduser("~"), "kappa_evidence_mage")))
import kappa as K   # kappa_evidence_mage/kappa.py: the UOR kappa-label over dCBOR

SCHEMA = "agentprivacy.guide.kappa-registry/1"

def federation():
    """The snapshot's own site list (tools/snapshot.mjs FEDERATION): id, output path, live host, group."""
    src = open(os.path.join(ROOT, "tools", "snapshot.mjs"), encoding="utf-8").read()
    out = []
    for m in re.finditer(r"\{ id: '([\w-]+)'(.*?)\}", src, re.S):   # an entry may run over several lines
        body = m.group(2); g = lambda k: (re.search(rf"\b{k}: '([^']*)'", body) or [None, None])[1]
        if g("path") is None: continue
        out.append(dict(id=m.group(1), path=g("path"), host=g("host") or m.group(1), group=g("group") or "federation", nested=g("nested")))
    return out

def content(page):
    return {"title": page.get("title", ""), "story": [{k: v for k, v in it.items() if k != "id"} for it in page.get("story", []) if isinstance(it, dict)]}

def page_k(page):
    return K.kappa_from_value(content(page))

def packets(items):
    lv = sorted(x for x in items if x)
    if not lv: return None
    while len(lv) > 1:
        lv = ["sha256:" + hashlib.sha256((lv[i] + "|" + lv[i + 1]).encode()).hexdigest() if i + 1 < len(lv) else lv[i] for i in range(0, len(lv), 2)]
    return lv[0]

def published(F):
    """{slug: page κ} for one site of the snapshot (its own folder; a nested site's pages are not its parent's)."""
    d = os.path.join(SITE, *F["path"].split("/"))
    if not os.path.isdir(d): return {}
    out = {}
    for f in sorted(os.listdir(d)):
        if not f.endswith(".json") or f.startswith("_") or f in ("sitemap.json",): continue
        try: p = json.load(open(os.path.join(d, f), encoding="utf-8"))
        except Exception: continue
        if isinstance(p, dict) and "story" in p: out[f[:-5]] = page_k(p)
    return out

def live(F):
    d = os.path.join(WIKI, F["host"] + ".localhost", "pages")
    if not os.path.isdir(d): return {}
    out = {}
    for f in sorted(os.listdir(d)):
        try: p = json.load(open(os.path.join(d, f), encoding="utf-8"))
        except Exception: continue
        if isinstance(p, dict) and "story" in p: out[f] = page_k(p)
    return out

def gates():
    d = os.path.join(SITE, "gates")
    if not os.path.isdir(d): return {}
    return {f[:-5]: K.kappa_from_bytes(open(os.path.join(d, f), "rb").read()) for f in sorted(os.listdir(d)) if re.fullmatch(r"[0-9a-f]{12}\.json", f)}

def build():
    fed, sites, pages = federation(), {}, []
    for F in fed:
        P = published(F)
        if not P: continue
        sites[F["id"]] = dict(group=F["group"], path=F["path"], count=len(P), root=packets([f"{s}|{k}" for s, k in P.items()]))
        pages += [dict(site=F["id"], slug=s, k=k) for s, k in P.items()]
    G = gates()
    if G: sites["gates"] = dict(group="gates", path="gates", count=len(G), root=packets([f"{i}|{k}" for i, k in G.items()]))
    pages += [dict(site="gates", slug=i, k=k) for i, k in G.items()]
    fed_root = packets([f"{i}|{s['root']}" for i, s in sorted(sites.items())])
    return fed, sites, pages, fed_root

def last_mint():
    if not os.path.isdir(FLOW): return None
    ms = sorted(f for f in os.listdir(FLOW) if re.fullmatch(r"\d{4}-\d{2}-\d{2}-[0-9a-f]{8}\.json", f))
    return json.load(open(os.path.join(FLOW, ms[-1]), encoding="utf-8")) if ms else None

def open_to_federation():
    """site/_headers: the published pages may be read from any site, as a FedWiki federation reads them; the seal
    reader at sigil.mages.city fetches a page's json to re-derive its κ. The snapshot clears site/, so every mint writes it."""
    p, rule = os.path.join(SITE, "_headers"), "/*\n  Access-Control-Allow-Origin: *\n"
    old = open(p, encoding="utf-8").read() if os.path.exists(p) else ""
    if "Access-Control-Allow-Origin" not in old: open(p, "w", encoding="utf-8").write((old.rstrip() + "\n\n" if old.strip() else "") + rule)

def mint():
    open_to_federation()
    fed, sites, pages, fed_root = build()
    prev = last_mint()
    day = datetime.date.today().isoformat()
    head = dict(schema=SCHEMA, snapshot=day, federation_root=fed_root, prior=(prev or {}).get("root"),
                sites=len(sites), pages=len(pages))
    if prev and prev.get("federation_root") == fed_root:
        print(f"unchanged: federation root {fed_root} is the last mint's ({prev['root']}); nothing minted"); return
    root = K.kappa_from_value(head)
    reg = dict(head, root=root, site_roots=sites, entries=pages)
    os.makedirs(os.path.join(SITE, "kappa"), exist_ok=True); os.makedirs(FLOW, exist_ok=True)
    json.dump(reg, open(os.path.join(SITE, "kappa", "registry.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    json.dump(reg, open(os.path.join(FLOW, f"{day}-{root.split(':')[1][:8]}.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    src = {F["id"]: live(F) for F in fed}   # the live pages each published page was made from, by the same content rule
    json.dump(dict(registry=root, snapshot=day, sources=src), open(os.path.join(FLOW, "source.json"), "w", encoding="utf-8"), indent=0)
    print(f"minted {root}\n  federation root {fed_root}\n  {len(sites)} sites · {len(pages)} pages · prior {head['prior']}")
    for i, s in sorted(sites.items(), key=lambda kv: -kv[1]["count"]): print(f"  {i:18s} {s['count']:5d}  {s['group']:10s} {s['root']}")

def verify():
    reg = json.load(open(os.path.join(SITE, "kappa", "registry.json"), encoding="utf-8"))
    _, sites, pages, fed_root = build()
    head = {k: reg[k] for k in ("schema", "snapshot", "federation_root", "prior", "sites", "pages")}
    ok = fed_root == reg["federation_root"] and K.kappa_from_value(head) == reg["root"] and \
         all(sites.get(i, {}).get("root") == s["root"] for i, s in reg["site_roots"].items())
    print(("✓ the registry re-derives from site/: " if ok else "✗ the registry does NOT re-derive: ") + reg["root"]); return ok

def diverge():
    S = json.load(open(os.path.join(FLOW, "source.json"), encoding="utf-8"))
    rows = {"edited": [], "new": [], "gone": []}
    for F in federation():
        was, now = S["sources"].get(F["id"], {}), live(F)
        for slug, k in now.items():
            if slug not in was: rows["new"].append(f"{F['id']}/{slug}")
            elif was[slug] != k: rows["edited"].append(f"{F['id']}/{slug}")
        rows["gone"] += [f"{F['id']}/{s}" for s in was if s not in now]
    print(f"the live farm against the snapshot of {S['snapshot']} (registry {S['registry']}):")
    for k, v in rows.items(): print(f"  {k:7s} {len(v):5d}  " + " · ".join(v[:8]) + (" …" if len(v) > 8 else ""))
    return rows

if __name__ == "__main__":
    a = sys.argv[1:]
    if "--verify" in a: sys.exit(0 if verify() else 1)
    elif "--diverge" in a: diverge()
    else: mint()
