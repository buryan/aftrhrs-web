const RAIDS=[ /* EDITUJ ZDE: kills = počet poražených bossů */
 {name:"Onyxia's Lair",size:"40 hráčů",bosses:1,kills:0,status:"Od 9. 12. 2026",note:"Attunement: Drakefire Amulet",img:"dragon.jpg"},
 {name:"Hyjal Summit",size:"20 hráčů",bosses:13,kills:0,status:"Od 9. 12. 2026",note:"Nový raid · 13 bossů*",img:"gryphon.jpg"},
 {name:"The Barrow Deeps",size:"10 hráčů",bosses:8,kills:0,status:"Od 9. 12. 2026",note:"Nový raid · 8 bossů*",img:"forge.jpg"}];
const DUNGEONS=[
 {tier:"Začátek · cca 13–30",list:["Ragefire Chasm","★ Hall of Thanes","The Deadmines","Wailing Caverns","Shadowfang Keep","The Stockade","★ Ruins of Lordaeron","★ Excavation Site"]},
 {tier:"Střed · cca 28–45",list:["Blackfathom Deeps","Gnomeregan","Razorfen Kraul","Scarlet Monastery","★ City of Dalaran","★ The Drowned City","★ Krol'dok Stronghold"]},
 {tier:"Endgame · cca 35–60",list:["Razorfen Downs","Uldaman","Zul'Farrak","Maraudon","Sunken Temple","★ Alcaz Prison","Blackrock Depths","Blackrock Spire","Dire Maul","Scholomance","Stratholme","★ Blackmaw Hold","★ Shaper's Terrace"]}];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const STATIC=/static=1/.test(location.search),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(STATIC)document.documentElement.classList.add('static');
$('#raids').innerHTML=RAIDS.map(r=>`<div class="raid rv"><div class="ri" style="background-image:url(${r.img})"></div><div class="rc"><div class="rn">${r.name}</div><div class="rs">${r.size}</div><div class="num">${r.kills}<small>/${r.bosses}</small></div><div class="bar"><i data-w="${Math.round(r.kills/r.bosses*100)}"></i></div><div class="rm"><span>${r.note}</span><b>${r.kills==r.bosses?'Cleared':r.status}</b></div></div></div>`).join('');
$('#dungeons').innerHTML=DUNGEONS.map(t=>`<div class="tier"><h4>${t.tier}</h4><div class="pills">${t.list.map(d=>d.startsWith('★')?`<span class="n">${d}</span>`:`<span>${d}</span>`).join('')}</div></div>`).join('');

$$('.rv').forEach(e=>{if(STATIC||RM){e.classList.add('in');e.querySelectorAll('.bar i').forEach(b=>b.style.width=b.dataset.w+'%')}});
if(!(STATIC||RM)){const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');e.target.querySelectorAll('.bar i').forEach(b=>b.style.width=b.dataset.w+'%');io.unobserve(e.target)}),{threshold:.15});$$('.rv').forEach(e=>io.observe(e))}
const mb=$('#mbar'),vis=new Set();const upd=()=>mb.classList.toggle('on',vis.size==0);
const mo=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?vis.add(e.target):vis.delete(e.target));upd()},{threshold:0});
[$('.hero'),...$$('main .btn')].forEach(e=>mo.observe(e));

(function(){const L=Date.parse('2026-11-05T00:00:00+01:00'),R=Date.parse('2026-12-09T00:00:00+01:00');const l=$('#cdl'),b=$$('#cdn b');
function t(){let n=Date.now(),T=L,lab='START WOW: FOREVER';if(n>=L){T=R;lab='PRVNÍ RAIDY · 9. 12.'}if(n>=R){$('#cd').style.display='none';return}
let d=Math.max(0,T-n)/1000;const v=[Math.floor(d/86400),Math.floor(d%86400/3600),Math.floor(d%3600/60),Math.floor(d%60)];l.textContent=lab;v.forEach((x,i)=>b[i].textContent=String(x).padStart(2,'0'))}
t();setInterval(t,1000)})();
