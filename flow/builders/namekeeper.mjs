// Targeted Guide projection. No whole-farm or static-site clearing.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const home=process.env.NAMEKEEPER_CORPUS_ROOT||os.homedir();
const root=process.env.NAMEKEEPER_GUIDE_ROOT||path.join(home,'agentprivacy.guide');
const farm=process.env.NAMEKEEPER_WIKI_ROOT||path.join(home,'.wiki','guide.localhost');
const source=path.join(home,'cityofmages','mages-city','NAMEKEEPER.md');
const slug='the-namekeeper',title='The Namekeeper';
const manifest={kind:'agentprivacy.namekeeper-projection/1',circulating:['cityofmages/mages-city/NAMEKEEPER.md'],sealed:['private journeys','credentials and keystores','Namekeeper operational data','demo working notes'],site:'guide',slug,title};
manifest.sourceFiles=fs.readdirSync(path.dirname(source),{withFileTypes:true}).filter(x=>x.isFile()).map(x=>({file:x.name,classification:x.name==='NAMEKEEPER.md'?'circulating':'sealed-for-this-projection'}));
const text=fs.readFileSync(source,'utf8');
if(/C:\\|Users\\|BEGIN .*PRIVATE KEY|ghp_|sk_live_/.test(text))throw Error('Source distribution check failed');
const id=s=>crypto.createHash('sha256').update(s).digest('hex').slice(0,16);
const story=[{id:id(slug+':posture'),type:'posture',text:'posture: 010101\ndims: delegation connection value\nby: builder (namekeeper; page topic only)'},{id:id(slug+':body'),type:'markdown',text},{id:id(slug+':assets-heading'),type:'markdown',text:'# Assets'},{id:id(slug+':assets'),type:'assets',text:slug}];
const pageFile=path.join(farm,'pages',slug),previous=fs.existsSync(pageFile)?JSON.parse(fs.readFileSync(pageFile,'utf8')):null;
// Refuse to overwrite a page whose content diverged from our last build.
if(previous&&(!previous.namekeeperBuilderDigest||previous.namekeeperBuilderDigest!==id(JSON.stringify(previous.story))))throw Error('Existing page has unmerged contributions; review before rebuilding');
const now=Date.now();
const journal=previous?[...previous.journal]:[{type:'create',date:now,item:{title,story:[]}}];
if(!previous||JSON.stringify(previous.story)!==JSON.stringify(story)){
 for(const item of story){const old=previous?.story.find(x=>x.id===item.id);if(!old||JSON.stringify(old)!==JSON.stringify(item))journal.push({type:old?'edit':'add',id:item.id,item,date:now});}
 for(const item of previous?.story||[])if(!story.some(x=>x.id===item.id))journal.push({type:'remove',id:item.id,date:now});
}
const page=previous&&JSON.stringify(previous.story)===JSON.stringify(story)?previous:{title,story,journal,namekeeperBuilderDigest:id(JSON.stringify(story))};
const require=createRequire(path.join(root,'package.json'));const {marked}=require('marked');
const template=fs.readFileSync(path.join(root,'site','guide','the-city-board.html'),'utf8');
const html=template.replaceAll('The City Board','The Namekeeper').replace(/<main class="page">[\s\S]*?<\/main>/,`<main class="page"><p><a href="index.html">Guide</a> · <a href="the-city-board.html">The City Board</a></p><article><div class="md">${marked.parse(text)}</div></article><p><a href="the-namekeeper.json">View forkable page JSON</a> · <a href="assets/the-namekeeper/NAMEKEEPER.md">Canonical source</a></p></main>`);
if(!html.includes('View forkable page JSON'))throw Error('Guide template mismatch');
if(process.argv.includes('--dry')){console.log(JSON.stringify({...manifest,status:'ready',pageChanged:previous!==page}));process.exit(0);}
const write=(file,data)=>{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,data);};
write(pageFile,JSON.stringify(page,null,2));write(path.join(farm,'assets',slug,'NAMEKEEPER.md'),text);
write(path.join(root,'site','guide',slug+'.json'),JSON.stringify(page,null,2));write(path.join(root,'site','guide',slug+'.html'),html);write(path.join(root,'site','guide','assets',slug,'NAMEKEEPER.md'),text);
// Add one discoverable link; preserve existing wiki story and journal.
const welcomeFile=path.join(farm,'pages','welcome-visitors');const welcome=JSON.parse(fs.readFileSync(welcomeFile,'utf8'));
if(!welcome.story.some(it=>String(it.text||'').includes('[[The Namekeeper]]'))){const item={id:id(slug+':welcome'),type:'markdown',text:'## Agent spaces and names\n\n[[The Namekeeper]] — Labs work on VTA-authorized knowledge spaces and earned Mages City names. Live Star-login/wiki-write demonstration pending.'};welcome.story.push(item);welcome.journal??=[];welcome.journal.push({type:'add',id:item.id,item,date:now});write(welcomeFile,JSON.stringify(welcome,null,2));}
const idxFile=path.join(root,'site','guide','index.html');let idx=fs.readFileSync(idxFile,'utf8');if(!idx.includes('href="the-namekeeper.html"'))write(idxFile,idx.replace('</main>','<p><a href="the-namekeeper.html">The Namekeeper — agent spaces and earned names</a></p></main>'));
const mapFile=path.join(root,'site','guide','system','sitemap.json');const map=JSON.parse(fs.readFileSync(mapFile,'utf8'));const row={slug,title,date:now};const ix=map.findIndex(p=>p.slug===slug);if(ix<0)map.push(row);else map[ix]=row;write(mapFile,JSON.stringify(map,null,1));
const searchFile=path.join(root,'site','search-index.json');const search=JSON.parse(fs.readFileSync(searchFile,'utf8'));const hit={s:'guide',u:slug,t:title,x:text};const sx=search.findIndex(p=>p.s==='guide'&&p.u===slug);if(sx<0)search.push(hit);else search[sx]=hit;write(searchFile,JSON.stringify(search));
// Remove only the farm's derived sitemap cache, so the native server rescans its pages.
const cache=path.join(farm,'status','sitemap.json');if(fs.existsSync(cache))fs.unlinkSync(cache);
console.log(JSON.stringify({...manifest,status:'built-local',publication:'not-deployed'}));
