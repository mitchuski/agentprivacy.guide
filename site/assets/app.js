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
// mobile nav toggle — inject a minimise/expand button so the menu can be folded away for reading
(function(){var top=document.querySelector('.top');if(!top)return;top.classList.add('js-nav');
  var b=document.createElement('button');b.type='button';b.className='nav-toggle';
  b.setAttribute('aria-label','Toggle navigation menu');b.setAttribute('aria-expanded','false');
  b.innerHTML='<span class="nt-bars">☰ menu</span><span class="nt-x">✕ close</span>';
  var brand=top.querySelector('.brand');
  if(brand&&brand.nextSibling)top.insertBefore(b,brand.nextSibling);else top.appendChild(b);
  b.addEventListener('click',function(){var open=top.classList.toggle('nav-open');b.setAttribute('aria-expanded',open?'true':'false');});}());
