/* =====================================================================
   FX.JS — qo'shimcha vizual effektlar
   preloader, sarlavha so'zlari, yorug'lik dog'i, menyu harflari,
   yozuvli kursor, lenta egilishi, ulkan footer, plyonka donadorligi
   ===================================================================== */
(function(){
  const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(pointer:fine)').matches;

  /* ---------- 1. Preloader (bir sessiyada bir marta) ---------- */
  (function(){
    const el=document.getElementById('preload');if(!el)return;
    try{sessionStorage.setItem('xb_seen','1')}catch(_){}
    const H=document.documentElement;
    if(rm||!H.classList.contains('pl')){el.parentNode.removeChild(el);H.classList.remove('loading');return}
    const num=el.querySelector('.pl-num'),bar=el.querySelector('.pl-bar i');let t0=null;const dur=1300;
    const step=t=>{t0??=t;const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);num.textContent=String(Math.round(e*100)).padStart(2,'0');bar.style.width=e*100+'%';
      if(p<1)requestAnimationFrame(step);else{el.classList.add('go');document.documentElement.classList.remove('loading');setTimeout(()=>el.parentNode&&el.parentNode.removeChild(el),1000)}};
    requestAnimationFrame(step);
  })();

  /* ---------- 3. Sarlavha so'zlari ---------- */
  document.querySelectorAll('h2').forEach(h=>{
    let wi=0;
    const wrap=node=>{
      [...node.childNodes].forEach(n=>{
        if(n.nodeType===3){
          const frag=document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part=>{
            if(!part)return;
            if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(part));return}
            const w=document.createElement('span');w.className='w';const i=document.createElement('span');i.textContent=part;i.style.setProperty('--wi',wi++);w.appendChild(i);frag.appendChild(w);
          });
          node.replaceChild(frag,n);
        }else if(n.nodeType===1&&!n.classList.contains('w'))wrap(n);
      });
    };
    wrap(h);
    if(rm||!('IntersectionObserver' in window))return;
    const r=h.getBoundingClientRect();if(r.top<innerHeight)return; // ko'rinib turgan sarlavha o'zgarmaydi
    h.classList.add('pre');
    const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){h.classList.remove('pre');o.disconnect()}}),{threshold:.3});o.observe(h);
  });

  /* ---------- 4. Yorug'lik dog'i ---------- */
  document.querySelectorAll('.card,.now li,.fcard,.lk,.ct').forEach(c=>c.classList.add('spot'));
  if(fine)document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.spot');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--sx',(e.clientX-r.left)+'px');c.style.setProperty('--sy',(e.clientY-r.top)+'px')},{passive:true});
  // fikrlar devori keyin yuklanadi — yangi kartalarni ham belgilaymiz
  const wall=document.getElementById('wall');
  if(wall&&'MutationObserver' in window)new MutationObserver(()=>wall.querySelectorAll('.fcard:not(.spot)').forEach(c=>c.classList.add('spot'))).observe(wall,{childList:true});

  /* ---------- 5. Menyu harflari aralashuvi ---------- */
  if(!rm){
    const G='ABDEFGHIJKLMNOPQRSTUVXYZ0123456789<>/{}';
    document.querySelectorAll('.pill a.l, .pill a.go').forEach(a=>{
      const orig=a.textContent;let raf;
      a.addEventListener('pointerenter',()=>{cancelAnimationFrame(raf);let f=0;const run=()=>{f++;
        a.textContent=[...orig].map((c,i)=>c===' '?' ':(i<f/2?orig[i]:G[Math.random()*G.length|0])).join('');
        if(f/2<orig.length)raf=requestAnimationFrame(run);else a.textContent=orig};run()});
      a.addEventListener('pointerleave',()=>{cancelAnimationFrame(raf);a.textContent=orig});
    });
  }

  /* ---------- 6. Yozuvli kursor ---------- */
  if(fine&&!rm){
    const lab=document.createElement('div');lab.className='clabel';lab.setAttribute('aria-hidden','true');document.body.appendChild(lab);
    let x=0,y=0,lx=0,ly=0,on=false;
    addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;const t=e.target.closest&&e.target.closest('[data-cursor]');
      if(t){lab.textContent=t.dataset.cursor;if(!on){lab.classList.add('on');on=true;lx=x;ly=y}}else if(on){lab.classList.remove('on');on=false}},{passive:true});
    (function loop(){lx+=(x-lx)*.22;ly+=(y-ly)*.22;lab.style.left=lx+'px';lab.style.top=(ly+34)+'px';requestAnimationFrame(loop)})();
  }

  /* ---------- 7. Lenta egilishi ---------- */
  const tapes=document.querySelector('.tapes');
  if(tapes&&!rm){let last=scrollY,sk=0,raf=0;
    addEventListener('scroll',()=>{const v=scrollY-last;last=scrollY;sk=Math.max(-8,Math.min(8,v*.25));tapes.style.setProperty('--skew',sk+'deg');
      clearTimeout(raf);raf=setTimeout(()=>tapes.style.setProperty('--skew','0deg'),120)},{passive:true});}

  /* ---------- 8. Ulkan footer ---------- */
  const giant=document.querySelector('.giant');
  // telefonda (hover yo'q) — ekranga chiqqanda rang bilan to'ladi
  if(giant&&'IntersectionObserver' in window){const o=new IntersectionObserver(es=>es.forEach(e=>giant.classList.toggle('lit',e.isIntersecting&&!fine)),{threshold:.6});o.observe(giant)}
  const top=document.getElementById('toTop');
  if(top)top.addEventListener('click',()=>scrollTo({top:0,behavior:rm?'auto':'smooth'}));

  /* ---------- 9. Plyonka donadorligi ---------- */
  if(!rm){try{
    const c=document.createElement('canvas');c.width=c.height=160;const g=c.getContext('2d'),d=g.createImageData(160,160);
    for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255|0;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}
    g.putImageData(d,0,0);const f=document.createElement('div');f.className='film';f.setAttribute('aria-hidden','true');f.style.setProperty('--noise',`url(${c.toDataURL()})`);document.body.appendChild(f);
  }catch(_){}}
})();
