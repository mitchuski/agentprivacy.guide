// Presentation only: no farm reads, content projection, key transfer or gate rebuild.
export function enhanceGuidespace(html, { home = false } = {}) {
  if (!html.includes('<header class="top">') || html.includes('data-guidespace="1"')) return html;
  html = html.replace('<body ', '<body data-guidespace="1" ');
  html = html.replace('<nav class="sites">', '<details class="guide-collections"><summary>Browse collections</summary><nav class="sites" aria-label="Guide collections">');
  html = html.replace('</nav>', '</nav></details>');
  html = html.replace('<div class="search">', '<details class="star-connection"><summary class="star-connect">Connect with Star</summary><div class="star-connection-body"><strong>Your VTA, your chosen perspective</strong><p>The planned connection uses your VTA and the Trust Spanning Protocol to carry a scoped exchange for you or your agent. You choose what is presented; the receiving service checks the request before a view is shared.</p><p>This guide has no VTA connection adapter yet. Opening Star does not connect an identity or send a key.</p><a href="https://soulbis.com/star">Open Star ↗</a> · <a href="https://agentprivacy.ai/city">Inspect your City Key ↗</a></div></details><div class="search">');
  html = html.replace('id="q" type="search"', 'id="q" aria-label="Search the guide" type="search"');
  if (home) {
    const start = html.indexOf('<section class="hero">');
    const end = html.indexOf('</section>', start);
    if (start >= 0 && end >= 0) html = html.slice(0, start) + `<section class="hero">
      <h1>A space<br><em>to find your way.</em></h1>
      <p class="lede">Read a source, follow a question, or find a method to try. The guide connects the model, stories and practical knowledge of agentprivacy.</p>
      <nav class="guide-paths" aria-label="Start reading"><a href="https://skills.agentprivacy.ai/#loadouts"><strong>Practise in the Skills garden ↗</strong><span>Choose a deck, follow its Star path, then bring a scoped contribution to Mages City.</span></a>
        <a href="/research/welcome-visitors.html"><strong>Understand the model</strong><span>Research, assumptions and conjectures.</span></a>
        <a href="/spellbooks/welcome-visitors.html"><strong>Read the spellbooks</strong><span>Stories and the ideas they carry.</span></a>
        <a href="/skill/welcome-visitors.html"><strong>Use a skill</strong><span>Methods for a bounded piece of work.</span></a>
      </nav>
      <p class="guide-context">Reading here is public. Page JSON keeps the wiki lineage available for forking. <a href="https://agentprivacy.ai/model">Explore the interactive model</a> · <a href="https://mages.city/">Find an agent path in Mages City</a>.</p>
    </section>` + html.slice(end + '</section>'.length);
    html = html.replace('<h2 class="hub-h">The federation</h2>', '<details class="guide-directory"><summary>Browse the full federation and site directory</summary><h2 class="hub-h">The federation</h2>');
    html = html.replace('<p class="enter-guide">', '</details><p class="enter-guide">');
  }
  return html.replace('</head>', `<style>
    .guide-collections{position:relative}.guide-collections summary,.guide-directory summary{cursor:pointer;color:var(--cyan);padding:8px 0}
    .guide-collections:not([open])>.sites{display:none!important}
    .guide-collections[open]>.sites{position:absolute;top:100%;left:0;width:min(700px,85vw);max-height:65vh;overflow:auto;display:flex!important;flex-wrap:wrap;background:var(--navy);padding:18px;border:1px solid var(--border-hi);box-shadow:0 12px 40px #0008}
    .star-connection{position:relative}.star-connection summary{cursor:pointer;color:var(--cyan)}.star-connection-body{position:absolute;right:0;top:100%;width:min(360px,85vw);padding:18px;background:var(--navy);border:1px solid var(--border-hi);box-shadow:0 12px 40px #0008;font-size:14px;z-index:25}.star-connection:not([open])>.star-connection-body{display:none}.star-connect{padding:8px 12px;border:1px solid var(--border-hi);border-radius:8px;white-space:nowrap;font-size:13px}
    .guide-paths{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:26px 0}
    .guide-paths a{border:1px solid var(--border-hi);border-radius:12px;padding:18px;background:var(--surface)}
    .guide-paths strong,.guide-paths span{display:block}.guide-paths span,.guide-context{font-size:14px;color:var(--dim);margin-top:8px}
    .guide-directory{border-top:1px solid var(--border);margin-top:24px;padding-top:12px}
    .page article{overflow-wrap:anywhere}.page article p,.page article li{line-height:1.8}
    :focus-visible{outline:2px solid var(--cyan);outline-offset:4px}
    @media(max-width:700px){.guide-paths{grid-template-columns:1fr}.top{gap:10px}.guide-collections{position:static}.guide-collections[open]>.sites{left:10px;width:calc(100vw - 20px)}.star-connect{font-size:12px}}
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
  </style></head>`);
}
