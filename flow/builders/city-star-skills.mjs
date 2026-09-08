// Targeted, manifest-first projection; preserves unrelated wiki contributions.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const home=process.env.CITY_STAR_CORPUS_ROOT||os.homedir();
const canon=path.join(home,'agentprivacy-skills'),guide=path.join(home,'agentprivacy.guide');
const farm=path.join(home,'.wiki','skill.localhost'),site=path.join(guide,'site','skill');
const manifest=JSON.parse(fs.readFileSync(path.join(canon,'CITY_STAR_DISTRIBUTION.json'),'utf8'));
const require=createRequire(path.join(guide,'package.json')), {marked}=require('marked');
const hash=s=>createHash('sha256').update(s).digest('hex');
const write=(p,s)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,s)};
const load=p=>fs.existsSync(p)?JSON.parse(fs.readFileSync(p,'utf8')):null;
const template=fs.readFileSync(path.join(site,'chronicler.html'),'utf8');
if(!/<main class="page">[\s\S]*?<\/main>/.test(template))throw Error('Guide template changed');
const out=[],pins=[];
function prepare(slug,title,text,source){
 if(title.replace(/\s/g,'-').replace(/[^A-Za-z0-9-]/g,'').toLowerCase()!==slug)throw Error('Slug mismatch');
 const file=path.join(farm,'pages',slug),old=load(file),page=old?structuredClone(old):{title,story:[],journal:[]};
 const itemId=hash('city-star:'+slug).slice(0,16),prior=page.story.find(x=>x.id===itemId);
 if(prior&&page.cityStarDigest!==hash(JSON.stringify(prior)))throw Error('Unmerged contribution in '+slug);
 const item={id:itemId,type:'markdown',text};
 if(!old)page.journal.push({type:'create',date:Date.now(),item:{title,story:[]}});
 if(!prior||JSON.stringify(prior)!==JSON.stringify(item)){
  if(prior)page.story[page.story.indexOf(prior)]=item;else page.story.push(item);
  page.journal.push({type:prior?'edit':'add',id:itemId,item,date:Date.now()});
 }
 page.cityStarDigest=hash(JSON.stringify(item));
 if(source)page.cityStarSource={path:source.path,sha256:hash(source.raw)};
 out.push({slug,title,page,source});
}
for(const row of manifest.records){
 if(row.classification!=='circulating'||!['role','persona'].includes(row.kind)||row.source.includes('..'))throw Error('Invalid manifest source');
 const raw=fs.readFileSync(path.join(canon,row.source),'utf8');
 if(/BEGIN .*PRIVATE KEY|ghp_[A-Za-z0-9]{20}|C:\\Users\\|sk_live_/.test(raw))throw Error('Distribution check: '+row.source);
 const body=raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');
 const text=row.kind==='persona'?body.slice(body.indexOf('## City and Star operating practice')):body;
 if(row.kind==='persona'&&!text.startsWith('## City'))throw Error('Missing persona practice');
 const navigation='\n\n## Related operating practices\n\n'+(row.skills||[]).map(s=>'[['+manifest.records.find(r=>r.slug===s).title+']]').join(' · ')+'\n\n[[City and Star Skills]]';
 prepare(row.slug,row.title,text+navigation,{path:row.source,raw});
 pins.push({node:row.node,source:row.source,sha256:hash(raw),site:'skill',slug:row.slug,classification:'circulating'});
}
prepare('city-and-star-skills','City and Star Skills','# City and Star Skills\n\nCarry a Star, choose what to disclose, agree to a bounded action, and keep its receipt. These operational skills connect the Guide journey with City invitations, the extension and MCP. Local runtime checks do not confer credentials or City membership.\n\n## Skills\n\n'+manifest.records.filter(r=>r.kind==='role').map(r=>'[['+r.title+']]').join(' · ')+'\n\n## Persona practice\n\n'+manifest.records.filter(r=>r.kind==='persona').map(r=>'[['+r.title+']]').join(' · ')+'\n\nThe Librarian is the Chronicler’s existing circulation attachment. No new primary persona or vertex is assigned. Explore the same skills and loadouts in [Spellweb](https://spellweb.ai/).');
prepare('welcome-visitors','Welcome Visitors','## City and Star operating skills\n\n[[City and Star Skills]] — eight practical skills and the existing personas that use them.');
prepare('role-skills','Role Skills','## City and Star operating skills\n\n[[City and Star Skills]] — VTA setup, private journeys, browser actions, review receipts and Namekeeper writes.');
// Validate all proposed pages before any mutation.
const slugs=new Set([...fs.readdirSync(path.join(farm,'pages')),...out.map(x=>x.slug)]);
const slugOf=t=>t.replace(/\s/g,'-').replace(/[^A-Za-z0-9-]/g,'').toLowerCase();
for(const x of out)for(const m of x.page.story.at(-1).text?.matchAll(/\[\[([^\]]+)\]\]/g)||[])if(!slugs.has(slugOf(m[1])))throw Error('Broken link '+m[1]);
function render(text){
 return marked.parse(text.replace(/\[\[([^\]]+)\]\]/g,(_,t)=>`[${t}](${slugOf(t)}.html)`).replace(/\]\((?:\.\.\/)+(?:role\/)?agentprivacy-([a-z0-9-]+)\/SKILL.md\)/g,(_,s)=>`](${s}.html)`));
}
if(process.argv.includes('--dry')){console.log(JSON.stringify({pages:out.length,pins}));process.exit(0)}
const search=load(path.join(guide,'site','search-index.json'))||[],sitemap=load(path.join(site,'system','sitemap.json'))||[];
for(const x of out){
 const {slug,title,page,source}=x,json=JSON.stringify(page,null,2);
 write(path.join(farm,'pages',slug),json);write(path.join(site,slug+'.json'),json);
 if(source){write(path.join(farm,'assets',slug,'SKILL.md'),source.raw);write(path.join(site,'assets',slug,'SKILL.md'),source.raw)}
 const body=page.story.map(i=>i.type==='markdown'?'<section class="md">'+render(i.text)+'</section>':i.type==='reference'?`<p>${i.title||''}</p>`:'').join('\n').replace(/<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (tag, href, label) => { if (/^(https?:|mailto:|#|\/)/.test(href)) return tag; const target = href.split('#')[0]; return fs.existsSync(path.join(site,target)) || out.some(r => target === r.slug+'.html') ? tag : label; });
 const html=template.replace(/<title>.*?<\/title>/,`<title>${title} · agentprivacy guide</title>`).replace(/<main class="page">[\s\S]*?<\/main>/,()=>`<main class="page"><p><a href="index.html">Skills</a> · <a href="city-and-star-skills.html">City and Star Skills</a></p><article>${body}</article><p><a href="${slug}.json">Forkable page JSON</a>${source?` · <a href="assets/${slug}/SKILL.md">Canonical SKILL.md</a>`:''}</p></main>`);
 write(path.join(site,slug+'.html'),html);
 const entry={slug,title,date:page.journal.at(-1)?.date||Date.now()},ix=sitemap.findIndex(r=>r.slug===slug);if(ix<0)sitemap.push(entry);else sitemap[ix]=entry;
 const s={s:'skill',u:slug,t:title,x:page.story.map(i=>i.text||'').join('\n')},sx=search.findIndex(r=>r.s==='skill'&&r.u===slug);if(sx<0)search.push(s);else search[sx]=s;
}
write(path.join(site,'system','sitemap.json'),JSON.stringify(sitemap));write(path.join(guide,'site','search-index.json'),JSON.stringify(search));
const index=path.join(site,'index.html');let html=fs.readFileSync(index,'utf8');if(!html.includes('href="city-and-star-skills.html"'))write(index,html.replace('</main>','<p><a href="city-and-star-skills.html">City and Star Skills</a></p></main>'));
write(path.join(guide,'flow','city-star-skills-manifest.json'),JSON.stringify({version:1,pins,sealed:manifest.sealed},null,2));
const cache=path.join(farm,'status','sitemap.json');if(fs.existsSync(cache))fs.unlinkSync(cache);
console.log(JSON.stringify({pages:out.length,sources:pins.length,status:'local-projection'}));
