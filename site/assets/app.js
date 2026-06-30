// client-side search over /search-index.json
let IDX=null;const q=document.getElementById('q'),box=document.getElementById('results');
async function load(){if(IDX)return;IDX=await (await fetch('/search-index.json')).json();}
function run(v){if(!v||v.length<2){box.classList.remove('on');box.innerHTML='';return;}
  v=v.toLowerCase();const hits=[];
  for(const p of IDX){const t=p.t.toLowerCase();let sc=t.includes(v)?2:0;if(!sc&&p.x.toLowerCase().includes(v))sc=1;
    if(sc)hits.push([sc,p]);if(hits.length>400)break;}
  hits.sort((a,b)=>b[0]-a[0]);
  box.innerHTML=hits.slice(0,40).map(([,p])=>'<a href="/'+p.s+'/'+p.u+'.html"><span class="rsite">'+p.s+'</span> '+p.t+'</a>').join('')||'<a>no matches</a>';
  box.classList.add('on');}
if(q){q.addEventListener('focus',load);q.addEventListener('input',e=>run(e.target.value));
  document.addEventListener('click',e=>{if(!e.target.closest('.search'))box.classList.remove('on');});}
