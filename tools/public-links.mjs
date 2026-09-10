import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const policy=JSON.parse(fs.readFileSync(new URL('../flow/public-link-policy.json',import.meta.url)));
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n));
const slug=s=>decode(s.replace(/<[^>]*>/g,'')).toLowerCase().replace(/[^\p{L}\p{N}_\-\s]/gu,'').replace(/\s/g,'-');
export function repairPublicLinks(root){
const files=[];function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.isDirectory()){if(e.name!=='gates')walk(path.join(d,e.name));}else if(e.name.endsWith('.html'))files.push(path.join(d,e.name));}}walk(root);
const anchorPages=new Set();for(const f of files){const base='https://guide.agentprivacy.ai/'+path.relative(root,f).replaceAll('\\','/');for(const m of fs.readFileSync(f,'utf8').matchAll(/href=["']([^"']*#[^"']+)["']/g)){try{const u=new URL(decode(m[1]),base);if(u.origin!=='https://guide.agentprivacy.ai')continue;let t=path.join(root,decodeURIComponent(u.pathname));if(!path.extname(t))t+='.html';if(u.pathname.endsWith('/'))t=path.join(root,u.pathname,'index.html');anchorPages.add(t);}catch{}}}
let replaced=0,unlinked=0,headingIds=0,fragments=0;const content=new Map(),changed=[];
for(const f of files){let s=fs.readFileSync(f,'utf8');const used=new Set([...s.matchAll(/\bid=["']([^"']+)/g)].map(m=>m[1]));
if(anchorPages.has(f))s=s.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,(m,n,a,label)=>{if(/\bid=/.test(a))return m;let id=slug(label);if(!id)return m;let base=id,i=0;while(used.has(id))id=base+'-'+(++i);used.add(id);headingIds++;return '<h'+n+a+' id="'+id+'">'+label+'</h'+n+'>';});
s=s.replace(/<a\b([^>]*?)href=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi,(m,a,href,b,label)=>{
let u=decode(href);try{if(/^https?:/.test(u))u=new URL(u).href;}catch{}let local=false;try{const h=new URL(u).hostname;local=h==='localhost'||h==='127.0.0.1'||h.endsWith('.local')||h.endsWith('.localhost')||(!h.includes('.')&&h!=='');}catch{}
if(local||(Object.hasOwn(policy.destinations,u)&&policy.destinations[u]===null)){unlinked++;return '<span class="source-reference">'+label+'</span>';}
if(policy.destinations[u]){replaced++;return '<a'+a+'href="'+policy.destinations[u]+'"'+b+'>'+label+'</a>';}return m;});
content.set(f,s);
}
// Retain TOC links only where the rendered target exists. Source text remains intact.
for(const [f,html] of content){const base='https://guide.agentprivacy.ai/'+path.relative(root,f).replaceAll('\\','/');let s=html.replace(/<a\b([^>]*?)href=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi,(m,a,href,b,label)=>{
let u;try{u=new URL(decode(href),base);}catch{return m;}
if(u.origin!=='https://guide.agentprivacy.ai'||!u.hash||u.hash.startsWith('#:~:'))return m;
let target=path.join(root,decodeURIComponent(u.pathname));if(!path.extname(target))target+='.html';if(u.pathname.endsWith('/'))target=path.join(root,u.pathname,'index.html');
const page=content.get(target);if(!page)return m;
const ids=[...page.matchAll(/\bid=["']([^"']+)/g)].map(x=>decode(x[1]));const id=decodeURIComponent(u.hash.slice(1));if(ids.includes(id))return m;
const compact=x=>x.replace(/[^\p{L}\p{N}]/gu,'').toLowerCase();const matches=ids.filter(x=>compact(x)===compact(id));
if(matches.length===1){fragments++;return '<a'+a+'href="'+href.split('#')[0]+'#'+matches[0]+'"'+b+'>'+label+'</a>';}
fragments++;return '<span>'+label+'</span>';});
if(s!==fs.readFileSync(f,'utf8')){fs.writeFileSync(f,s);changed.push(path.relative(root,f).replaceAll('\\','/'));}
}
return {files:files.length,replaced,unlinked,headingIds,fragments,changed};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
const root=path.resolve(process.argv[2]||new URL('../site',import.meta.url).pathname.replace(/^\/([A-Z]:)/i,'$1'));
const result=repairPublicLinks(root);console.log(JSON.stringify({...result,changed:result.changed.length}));
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(result,null,2));
}
