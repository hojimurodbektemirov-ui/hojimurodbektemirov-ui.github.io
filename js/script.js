/* SCRIPT.JS — saytning harakatlari va animatsiyalari.
   Ma'lumotlar js/malumotlar.js faylidan olinadi. Bu faylni o'zgartirish shart emas. */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---------- XAVFSIZLIK: ma'lumotlarni tozalash ----------
   Ranglar faqat #rrggbb ko'rinishida, raqamlar faqat raqam bo'lib qoladi.
   Shunda malumotlar.js ga tasodifan kod yozilsa ham, u ishga tushmaydi. */
const safeColor=c=>/^#[0-9a-fA-F]{3,8}$/.test(String(c))?c:'#3d6bff';
const num=(v,min,max,def)=>{v=Number(v);return Number.isFinite(v)?Math.min(max,Math.max(min,v)):def};
MEN.tajribaYil=num(MEN.tajribaYil,0,80,0);
(MEN.tillar||[]).forEach(l=>{l.rang=safeColor(l.rang);l.daraja=Math.round(num(l.daraja,0,6,0))});
(MEN.davlatlar||[]).forEach(d=>{d.rang=safeColor(d.rang);d.lat=num(d.lat,-90,90,0);d.lon=num(d.lon,-180,180,0);d.utc=num(d.utc,-12,14,0)});
MEN.konikmalar=(MEN.konikmalar||[]).map(([n,p])=>[String(n),Math.round(num(p,0,100,0))]);
if(!/^\d{4}-\d{2}-\d{2}$/.test(MEN.tugilgan))MEN.tugilgan='2000-11-19';
const COL=['#ff2d8a','#ffb000','#00c896','#3d6bff','#8b5cf6'];

/* ---------- vaqt / yosh ---------- */
const nowTk=()=>new Date(Date.now()+(new Date().getTimezoneOffset()+300)*60000);
const [by,bm,bd]=MEN.tugilgan.split('-').map(Number);
const t0=nowTk();
const yosh=t0.getFullYear()-by-((t0.getMonth()+1<bm||(t0.getMonth()+1===bm&&t0.getDate()<bd))?1:0);
const bdayToday=t0.getMonth()+1===bm&&t0.getDate()===bd;
const birthUTC=Date.UTC(by,bm-1,bd)-5*3600e3;
$('#ageNum').textContent=yosh;$('#ageNum').dataset.count=yosh;
$('#ageNote').textContent=bdayToday?'yosh · bugun to\'ldi! 🎂':'yosh';

/* ---------- ism harflari ---------- */
let gi=0;
$$('[data-split]').forEach(el=>{el.innerHTML=[...el.textContent].map(c=>`<span class="ch" style="--i:${gi++}">${esc(c)}</span>`).join('')});
$$('h1 .ch').forEach(ch=>ch.addEventListener('pointerenter',()=>{ch.classList.remove('jelly');void ch.offsetWidth;ch.classList.add('jelly')}));

/* ---------- aylanuvchi rol so'zi ---------- */
(function(){
  const el=$('#rot');if(reduce)return;let i=0,txt=MEN.rollar[0],del=false;
  setInterval(()=>{
    if(!del){if(txt.length<MEN.rollar[i].length)txt=MEN.rollar[i].slice(0,txt.length+1);else{del=true;el._w=(el._w||0)+1;if(el._w<18)return;}}
    if(del){el._w=0;txt=txt.slice(0,-1);if(!txt){del=false;i=(i+1)%MEN.rollar.length}}
    el.textContent=txt||'​';
  },70);
})();

/* ---------- lentalar ---------- */
const tp=MEN.lenta.map(t=>`<span>${esc(t)}</span>`).join('');
$('#tapeA').innerHTML=tp+tp;
const tp2=(MEN.lenta2||[]).map(t=>`<span>${esc(t)}</span>`).join('');
$('#tapeB').innerHTML=tp2+tp2;

/* ---------- atlas (ikat) ravoq ---------- */
const NZ=new Float32Array(4096).map(()=>Math.random());
const nz=i=>NZ[((i%4096)+4096)%4096];
function band(ctx,cx,y0,y1,maxW,period,phase,color,col,step,warp){
  ctx.fillStyle=color;
  for(let y=y0;y<y1;y+=step){
    let t=((y+phase)/period)%1;if(t<0)t+=1;
    const tri=1-Math.abs(t-.5)*2,j=(nz((y/step|0)+col*131)-.5)*step*3.2,w=Math.max(0,tri*maxW+j),off=warp?warp(y):0;
    if(w>1)ctx.fillRect(cx-w/2+off+(nz((y/step|0)*7+col)-.5)*step*1.6,y,w,step+.6);
  }
}
(function(){
  const cv=$('#ikat'),ctx=cv.getContext('2d');let W,H,px=-1e4,py=-1e4,tx=-1e4,ty=-1e4,shift=0;
  const size=()=>{const d=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0)};
  size();addEventListener('resize',size);
  const mv=e=>{const r=cv.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top};
  cv.addEventListener('pointermove',mv);cv.addEventListener('pointerdown',e=>{mv(e);shift++});
  cv.addEventListener('pointerleave',()=>{tx=ty=-1e4});
  const P=['#ff2d8a','#ffb000','#00c896','#3d6bff','#8b5cf6'];
  function frame(t){
    px+=(tx-px)*.1;py+=(ty-py)*.1;
    ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);
    const cols=W<380?3:4,cw=W/cols,step=4,sp=reduce?0:t*.03;
    const warp=y=>{const d=y-py;return px>-1e3?Math.exp(-(d*d)/9000)*Math.sin((px+y)/24)*30:0};
    for(let c=0;c<cols;c++){
      const cx=cw*(c+.5),dir=c%2?-1:1,ph=sp*dir+c*60,k=(c+shift)%5;
      band(ctx,cx,0,H,cw*1.02,cw*1.5,ph,P[k],c,step,warp);
      band(ctx,cx,0,H,cw*.66,cw*1.5,ph,P[(k+2)%5],c+9,step,warp);
      band(ctx,cx,0,H,cw*.3,cw*1.5,ph,'#170f3c',c+17,step,warp);
      band(ctx,cx,0,H,cw*.1,cw*1.5,ph,'#fff',c+23,step,warp);
      band(ctx,cw*c,0,H,cw*.34,cw*.75,ph+cw*.37,P[(k+1)%5],c+40,step,warp);
    }
    if(!reduce)requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  if(reduce)cv.addEventListener('pointermove',()=>requestAnimationFrame(frame));
})();

/* ---------- stikerlarni sudrash ---------- */
$$('[data-drag]').forEach(el=>{
  let sx,sy,ox=0,oy=0,drag=false;
  el.addEventListener('pointerdown',e=>{drag=true;el.setPointerCapture(e.pointerId);sx=e.clientX-ox;sy=e.clientY-oy;el.style.animation='none';el.style.zIndex=5;el.style.scale='1.1'});
  el.addEventListener('pointermove',e=>{if(!drag)return;ox=e.clientX-sx;oy=e.clientY-sy;el.style.translate=`${ox}px ${oy}px`});
  const up=()=>{if(!drag)return;drag=false;el.style.scale='1'};
  el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);
});

/* ---------- kursor halqasi, magnit tugmalar, uchqunlar ---------- */
if(fine&&!reduce){
  const r=$('#ring');let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
  addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY});
  (function loop(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;r.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(loop)})();
  document.addEventListener('pointerover',e=>r.classList.toggle('big',!!e.target.closest('a,button,.sticker,.chip,input')));
  $$('.mag').forEach(b=>{
    b.addEventListener('pointermove',e=>{const q=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-q.left-q.width/2)*.25}px,${(e.clientY-q.top-q.height/2)*.35}px)`});
    b.addEventListener('pointerleave',()=>b.style.transform='');
  });
}else{$('#ring').hidden=true}
if(!reduce)document.addEventListener('pointerdown',e=>{
  if(e.target.closest('input,[data-drag],#globe,#ikat'))return;
  const G='{}<>/;01#$=()';
  for(let i=0;i<9;i++){const s=document.createElement('span');s.className='spark';s.textContent=G[Math.random()*G.length|0];
    const a=Math.random()*Math.PI*2,d=40+Math.random()*60;
    s.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;color:${COL[i%5]};--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px;--r:${(Math.random()-.5)*360}deg`;
    document.body.appendChild(s);setTimeout(()=>s.remove(),820)}
});

/* ---------- scroll: progress + gorizontal yo'l ---------- */
$('#track').innerHTML=MEN.yol.map(s=>`<article class="step"><div><div class="em">${esc(s.em)}</div></div><div><div class="yr">${esc(s.yr)}</div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div><span class="big" aria-hidden="true">${esc(s.big)}</span></article>`).join('');
const hs=$('#yol'),track=$('#track'),prog=$('#progress');
const hsOn=()=>!reduce&&innerWidth>820;
function sizeHS(){hs.style.height=hsOn()?(track.scrollWidth-innerWidth+innerHeight+200)+'px':'auto'}
function onScroll(){
  const h=document.documentElement.scrollHeight-innerHeight;prog.style.transform=`scaleX(${h>0?scrollY/h:0})`;
  if(hsOn()){const top=hs.offsetTop,len=hs.offsetHeight-innerHeight;const p=Math.min(1,Math.max(0,(scrollY-top)/len));track.style.transform=`translateX(${-(track.scrollWidth-innerWidth)*p}px)`}
}
sizeHS();onScroll();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',()=>{sizeHS();onScroll()});
document.fonts&&document.fonts.ready.then(()=>{sizeHS();onScroll()});

/* ---------- bento: 3D egilish ---------- */
if(fine&&!reduce)$$('.tilt').forEach(c=>{
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    c.style.setProperty('--ry',((x-.5)*10)+'deg');c.style.setProperty('--rx',((.5-y)*10)+'deg');c.style.setProperty('--gx',x*100+'%');c.style.setProperty('--gy',y*100+'%')});
  c.addEventListener('pointerleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')});
});

/* ---------- yashagan soniyalar ---------- */
const tick=$('#ticker');
const upd=()=>{const s=Math.floor((Date.now()-birthUTC)/1000).toLocaleString('ru-RU').replace(/ /g,' ');tick.innerHTML=esc(s.slice(0,-1))+`<span class="last">${s.slice(-1)}</span>`};
upd();setInterval(upd,1000);

/* ---------- ko'rinishga kirganda animatsiyalar (dam holatida yakuniy qiymat ko'rinadi) ---------- */
function onSeen(el,fn){if(reduce||!('IntersectionObserver' in window))return;const o=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){fn();o.disconnect()}})},{threshold:.35});o.observe(el)}
$$('[data-count]').forEach(el=>{const to=+el.dataset.count;onSeen(el,()=>{let t0=null;const f=t=>{t0??=t;const p=Math.min(1,(t-t0)/1200);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)})});

/* ---------- tillar ---------- */
const LV=['A1','A2','B1','B2','C1','C2'],CIRC=2*Math.PI*52;
$('#langs').innerHTML=MEN.tillar.map(l=>`
  <div class="card lang tilt rv">
    <div class="ringwrap"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="bg" cx="60" cy="60" r="52"/><circle class="fg" cx="60" cy="60" r="52" stroke="${l.rang}" stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC*(1-l.daraja/6)}" data-off="${CIRC*(1-l.daraja/6)}"/></svg>
      <div class="mid"><b style="color:${l.rang}">${esc(l.katta)}</b><small>${esc(l.kichik)}</small></div></div>
    <h3>${esc(l.nom)}</h3><p>${esc(l.izoh)}</p>
    <div class="cefr">${LV.map((v,i)=>`<span class="${i<l.daraja?'on':''}" style="${i<l.daraja?'background:'+l.rang:''}">${v}</span>`).join('')}</div>
  </div>`).join('');
$$('.ringwrap .fg').forEach(c=>{if(reduce)return;const off=c.dataset.off;onSeen(c.closest('.lang'),()=>{c.style.transition='none';c.style.strokeDashoffset=CIRC;void c.getBoundingClientRect();c.style.transition='';requestAnimationFrame(()=>c.style.strokeDashoffset=off)})});

/* ---------- davlatlar ro'yxati + globus ---------- */
const TAS={nom:"Andijon",lat:40.7821,lon:72.3442};
const km=(a,b)=>{const R=6371,r=Math.PI/180,dl=(b.lat-a.lat)*r,dn=(b.lon-a.lon)*r;const h=Math.sin(dl/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dn/2)**2;return Math.round(2*R*Math.asin(Math.sqrt(h)))};
$('#clist').innerHTML=MEN.davlatlar.map(d=>{const df=d.utc-5;return `<div class="card ct tilt rv"><span class="fl" aria-hidden="true">${esc(d.bayroq)}</span><div><h3>${esc(d.nom)}</h3><small>${esc(d.shahar)} · vaqt farqi ${df>0?'+':''}${df} soat</small></div><div class="km">${km(TAS,d).toLocaleString('ru-RU')} km<small>Andijondan</small></div></div>`}).join('')
 +`<div class="card ct home rv"><span class="fl" aria-hidden="true">🇺🇿</span><div><h3>O'zbekiston</h3><small>uyim · Andijon · UTC+5</small></div><div class="km" style="color:var(--zafar)">0 km<small style="color:#b8b2e6">bu yerdan boshlanadi</small></div></div>`;

(function(){
  const cv=$('#globe'),ctx=cv.getContext('2d');let S,d;
  const size=()=>{d=Math.min(devicePixelRatio||1,2);S=cv.clientWidth;cv.width=S*d;cv.height=S*d;ctx.setTransform(d,0,0,d,0,0)};
  size();addEventListener('resize',size);
  const rad=Math.PI/180,N=1400,pts=[];
  for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),th=i*Math.PI*(3-Math.sqrt(5));pts.push([Math.asin(y),Math.atan2(r*Math.sin(th),r*Math.cos(th))])}
  const toV=(lat,lon)=>[Math.cos(lat)*Math.cos(lon),Math.cos(lat)*Math.sin(lon),Math.sin(lat)];
  let lon0=66*rad,drag=null,offset=0,vel=0;const lat0=22*rad;
  cv.addEventListener('pointerdown',e=>{drag=e.clientX;cv.setPointerCapture(e.pointerId)});
  cv.addEventListener('pointermove',e=>{if(drag==null)return;const dx=e.clientX-drag;drag=e.clientX;vel=-dx*.006;offset+=vel});
  const stop=()=>drag=null;cv.addEventListener('pointerup',stop);cv.addEventListener('pointercancel',stop);
  function proj(lat,lon,alt=1){const dl=lon-lon0,c=Math.cos(lat);const x=c*Math.sin(dl),y=Math.cos(lat0)*Math.sin(lat)-Math.sin(lat0)*c*Math.cos(dl),z=Math.sin(lat0)*Math.sin(lat)+Math.cos(lat0)*c*Math.cos(dl);return [x*alt,y*alt,z]}
  function slerp(a,b,t){const A=toV(a.lat*rad,a.lon*rad),B=toV(b.lat*rad,b.lon*rad);const dot=A[0]*B[0]+A[1]*B[1]+A[2]*B[2],om=Math.acos(Math.min(1,dot)),so=Math.sin(om);
    const v=A.map((ai,i)=>(Math.sin((1-t)*om)*ai+Math.sin(t*om)*B[i])/so);return [Math.asin(v[2]),Math.atan2(v[1],v[0])]}
  function frame(t){
    if(drag==null){vel*=.95;offset+=vel}
    lon0=(66+(reduce?0:Math.sin(t/5000)*28))*rad+offset;
    const R=S*.42,cx=S/2,cy=S/2;ctx.clearRect(0,0,S,S);
    const g=ctx.createRadialGradient(cx-R*.35,cy-R*.4,R*.1,cx,cy,R);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#ece8ff');
    ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fillStyle=g;ctx.fill();
    ctx.strokeStyle='rgba(23,15,60,.12)';ctx.lineWidth=1;ctx.stroke();
    for(const [la,lo] of pts){const [x,y,z]=proj(la,lo);if(z<=0)continue;ctx.fillStyle=`rgba(61,40,140,${.12+z*.35})`;ctx.beginPath();ctx.arc(cx+x*R,cy-y*R,1.1+z*.9,0,7);ctx.fill()}
    const prog=reduce?1:((t/2600)%1.4);
    MEN.davlatlar.forEach((dst,i)=>{
      const steps=60,p=Math.min(1,Math.max(0,prog*1.2-i*.12));
      ctx.beginPath();let started=false;
      for(let s=0;s<=steps*(reduce?1:Math.max(p,.0001));s++){const tt=s/steps,[la,lo]=slerp(TAS,dst,tt),[x,y,z]=proj(la,lo,1+.28*Math.sin(Math.PI*tt));
        if(z<-.15){started=false;continue}const X=cx+x*R,Y=cy-y*R;if(!started){ctx.moveTo(X,Y);started=true}else ctx.lineTo(X,Y)}
      ctx.strokeStyle=dst.rang;ctx.lineWidth=3;ctx.lineCap='round';ctx.stroke();
      // to'liq yo'l (xira)
      ctx.beginPath();started=false;
      for(let s=0;s<=steps;s++){const tt=s/steps,[la,lo]=slerp(TAS,dst,tt),[x,y,z]=proj(la,lo,1+.28*Math.sin(Math.PI*tt));if(z<-.15){started=false;continue}const X=cx+x*R,Y=cy-y*R;if(!started){ctx.moveTo(X,Y);started=true}else ctx.lineTo(X,Y)}
      ctx.strokeStyle=dst.rang+'40';ctx.lineWidth=2;ctx.setLineDash([4,6]);ctx.stroke();ctx.setLineDash([]);
    });
    const mark=(pl,col,label,big,left)=>{const [x,y,z]=proj(pl.lat*rad,pl.lon*rad);if(z<=0)return;const X=cx+x*R,Y=cy-y*R,pulse=reduce?0:(t/900)%1;
      ctx.beginPath();ctx.arc(X,Y,(big?8:6)+pulse*18,0,7);ctx.fillStyle=col+Math.round((1-pulse)*80).toString(16).padStart(2,'0');ctx.fill();
      ctx.beginPath();ctx.arc(X,Y,big?7:5.5,0,7);ctx.fillStyle=col;ctx.fill();ctx.lineWidth=2.5;ctx.strokeStyle='#fff';ctx.stroke();
      ctx.font=`800 ${big?14:13}px "Plus Jakarta Sans",system-ui,sans-serif`;const w=ctx.measureText(label).width;
      ctx.fillStyle='#fff';ctx.beginPath();const LX=left?X-w-26:X+10,LY=left?Y-30:Y-24;ctx.roundRect?ctx.roundRect(LX,LY,w+16,24,12):ctx.rect(LX,LY,w+16,24);ctx.fill();ctx.strokeStyle='rgba(23,15,60,.12)';ctx.lineWidth=1;ctx.stroke();
      ctx.fillStyle='#170f3c';ctx.fillText(label,LX+8,LY+17)};
    MEN.davlatlar.forEach(d=>mark(d,d.rang,d.bayroq+' '+d.nom,false,d.chap));
    mark(TAS,'#170f3c','🇺🇿 Andijon',true);
    if(!reduce)requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  if(reduce)cv.addEventListener('pointermove',()=>requestAnimationFrame(frame));
})();

/* ---------- orbita + ko'nikmalar ---------- */
const putRing=(id,arr,R)=>{$(id).innerHTML=arr.map((s,i)=>`<div class="slot" style="--a:${i*360/arr.length}deg;--R:var(${R})"><span class="chip"><i style="background:${COL[i%5]}"></i>${esc(s)}</span></div>`).join('')};
putRing('#r1',MEN.orbita1,'--R1');putRing('#r2',MEN.orbita2,'--R2');
$('#skl').innerHTML=`<span class="lbl">daraja</span>`+MEN.konikmalar.map(([n,p],i)=>`<div class="sk"><b>${esc(n)}</b><span>${p}%</span><div class="bar"><i style="--w:${p}%;--c1:${COL[i%5]};--c2:${COL[(i+1)%5]}"></i></div></div>`).join('');
onSeen($('#skl'),()=>{const bars=$$('#skl .bar i');bars.forEach(b=>{b.style.transition='none';b.style.width='0'});void document.body.offsetWidth;bars.forEach(b=>{b.style.transition='';b.style.width=''})});

/* ---------- terminal ---------- */
const out=$('#out'),cmd=$('#cmd'),hist=[];let hi=0;
const print=h=>{out.insertAdjacentHTML('beforeend',h+'\n');out.scrollTop=out.scrollHeight};
const CMDS={
  yordam:()=>`<span class="n">Buyruqlar ro'yxati:</span>
  <span class="s">whoami</span>     men kimman
  <span class="s">tajriba</span>    ish tajribam
  <span class="s">talim</span>      ma'lumotim
  <span class="s">tillar</span>     qaysi tillarni bilaman
  <span class="s">safar</span>      borgan davlatlarim
  <span class="s">yosh</span>       nechchi yoshdaman
  <span class="s">aloqa</span>      bog'lanish
  <span class="s">hello</span>      birinchi dastur
  <span class="s">party</span>      🎉
  <span class="s">tozalash</span>   ekranni tozalash`,
  whoami:()=>`<span class="v">${esc(MEN.familiya)} ${esc(MEN.ism)}</span> · IT va Dasturlash fani o'qituvchisi\n<span class="c">${MEN.tajribaYil} yillik tajriba · Andijon, O'zbekiston</span>`,
  tajriba:()=>`<span class="n">${MEN.tajribaYil} yil</span> IT va dasturlash o'qituvchisi\n<span class="k">${'█'.repeat(MEN.tajribaYil*3)}</span> <span class="c">davom etmoqda...</span>`,
  talim:()=>`<span class="k">magistr </span>  Kompyuter tizimlari va ularning dasturiy ta'minoti\n<span class="k">bakalavr</span>  Informatika o'qitish metodikasi`,
  tillar:()=>MEN.tillar.map(l=>`${esc(l.nom.padEnd(12,' '))} <span style="color:${l.rang}">${'■'.repeat(l.daraja)}</span><span class="c">${'□'.repeat(6-l.daraja)}</span> ${esc(l.kichik==='CEFR'?l.katta:l.izoh)}`).join('\n'),
  safar:()=>MEN.davlatlar.map(d=>`${esc(d.bayroq)} ${esc(d.nom.padEnd(10,' '))} <span class="c">${km(TAS,d)} km Andijondan</span>`).join('\n'),
  yosh:()=>`Tug'ilgan: <span class="n">19.11.2000</span> → <span class="s">${yosh} yosh</span>${bdayToday?'\n<span class="k">🎂 Bugun tug\'ilgan kunim!</span>':''}`,
  aloqa:()=>MEN.aloqa.map(([k,v])=>`${k.padEnd(11,' ')}<span class="p">${esc(v)}</span>`).join('\n'),
  hello:()=>`<span class="k">print</span>(<span class="s">"Salom, dunyo!"</span>)\n<span class="c">&gt;&gt;&gt;</span> Salom, dunyo!\n<span class="c">Har bir dasturchi shundan boshlagan. Siz ham boshlang!</span>`,
  party:()=>{confetti();return `<span class="k">🎉 Bayram boshlandi!</span>`},
  sudo:()=>`<span class="k">Ruxsat yo'q.</span> Bu yerda admin faqat Xojimurod 😉`,
  ls:()=>`men.js  yol.git  tillar.json  safar.map  orbita.css  aloqa.md`
};
CMDS.help=CMDS.yordam;CMDS["ta'lim"]=CMDS.talim;CMDS.davlatlar=CMDS.safar;
function run(raw){
  const c=raw.trim().toLowerCase().replace(/[‘’ʻʼ]/g,"'");print(`<span class="s">mehmon@uz:~$</span> ${esc(raw)}`);if(!c)return;
  if(c==='tozalash'||c==='clear'){out.innerHTML='';return}
  const k=c.split(/\s+/)[0];
  print(CMDS[k]?CMDS[k]():`<span class="k">bash: ${esc(k)}:</span> buyruq topilmadi. <span class="c">"yordam" deb yozing.</span>`);
}
$('#termForm').addEventListener('submit',e=>{e.preventDefault();const v=cmd.value;if(v.trim()){hist.push(v);hi=hist.length}run(v);cmd.value=''});
cmd.addEventListener('keydown',e=>{
  if(e.key==='ArrowUp'&&hi>0){hi--;cmd.value=hist[hi];e.preventDefault()}
  if(e.key==='ArrowDown'){hi=Math.min(hist.length,hi+1);cmd.value=hist[hi]||''}
  if(e.key==='Tab'&&cmd.value){const m=Object.keys(CMDS).concat('tozalash').find(k=>k.startsWith(cmd.value.toLowerCase()));if(m){cmd.value=m;e.preventDefault()}}
});
$('#chips').innerHTML=['whoami','tajriba','talim','tillar','safar','yosh','hello','party'].map(c=>`<button type="button">${c}</button>`).join('');
$('#chips').addEventListener('click',e=>{const b=e.target.closest('button');if(b)run(b.textContent)});
print(`<span class="v">xojimurodbektemirov.uz</span> v${yosh}.0 <span class="c">· boshlash uchun</span> <span class="s">yordam</span> <span class="c">deb yozing</span>\n`);
run('whoami');

/* ---------- aloqa ---------- */
$('#links').innerHTML=MEN.aloqa.map(([k,v])=>`<div class="lk"><small>${esc(k)}</small><span class="v">${esc(v)}</span><button type="button" data-copy="${esc(v)}">Nusxa olish</button></div>`).join('');
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),1600)};
document.addEventListener('click',e=>{const b=e.target.closest('[data-copy]');if(!b)return;
  const fb=()=>{const s=b.previousElementSibling,r=document.createRange();r.selectNodeContents(s);const sel=getSelection();sel.removeAllRanges();sel.addRange(r);toast('Belgilandi — Ctrl+C bosing')};
  try{navigator.clipboard.writeText(b.dataset.copy).then(()=>toast('Nusxa olindi ✓'),fb)}catch(_){fb()}});

/* ---------- soat ---------- */
$('#yr').textContent=t0.getFullYear();
const clk=$('#clock'),p2=n=>String(n).padStart(2,'0');
const tickClock=()=>{const d=nowTk();clk.textContent=`${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())}`};tickClock();setInterval(tickClock,1000);

/* ---------- konfetti ---------- */
function confetti(){
  if(reduce)return;const cv=$('#confetti');cv.hidden=false;const ctx=cv.getContext('2d'),d=Math.min(devicePixelRatio||1,2);
  cv.width=innerWidth*d;cv.height=innerHeight*d;ctx.setTransform(d,0,0,d,0,0);
  const ps=Array.from({length:180},()=>({x:innerWidth/2+(Math.random()-.5)*120,y:innerHeight*.35,vx:(Math.random()-.5)*16,vy:-Math.random()*16-4,r:Math.random()*Math.PI,vr:(Math.random()-.5)*.3,w:6+Math.random()*8,c:COL[Math.random()*5|0]}));
  let f=0;(function step(){ctx.clearRect(0,0,innerWidth,innerHeight);
    ps.forEach(p=>{p.vy+=.35;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.w/2,-p.w/4,p.w,p.w/2);ctx.restore()});
    if(++f<200)requestAnimationFrame(step);else{ctx.clearRect(0,0,innerWidth,innerHeight);cv.hidden=true}})();
}
if(bdayToday){$('#bday').hidden=false;setTimeout(confetti,900)}
