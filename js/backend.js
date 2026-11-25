/* =====================================================================
   BACKEND.JS — "Hozir" bo'limi va backend bilan ishlaydigan qismlar:
   fikrlar devori, aloqa formasi, yurakcha va ko'rishlar hisoblagichi.
   Backend manzili js/malumotlar.js dagi MEN.API_URL da. U bo'sh bo'lsa,
   bu bo'limlar yashirin qoladi va sayt odatdagidek ishlayveradi.
   ===================================================================== */
(function(){
  /* ---------- hozir: yutuq, ish joyi, Mutolaa, loyihalar ---------- */
  const H=MEN.hozir||{};
  const safeUrl=u=>/^https:\/\//i.test(String(u||''))?String(u):'';
  const safeImg=u=>/^(img\/[a-z0-9._-]+|data:image\/)/i.test(String(u||''))?String(u):'';
  let html='';
  if(H.mukofot){const m=H.mukofot,o=Math.max(1,Math.min(999,Number(m.orin)||1)),t=Math.max(o,Math.min(400,Number(m.top)||100));
    html+=`<article class="nw nw-award rv"><div class="aw-head"><span class="kick">🏆 ${esc(m.kichik)}</span>${m.holat?`<span class="livechip">${esc(m.holat)}</span>`:''}</div>
      <div class="aw-main"><div class="aw-rank"><b>${o}</b><span>-o'rin</span></div>
      <div class="aw-txt"><h3>TOP-${t} o'qituvchi ichida <em>${o}-o'rin</em></h3><p>${esc(m.loyiha)} ${esc(m.turi||'')}</p>
      <div class="aw-chips">${m.sovrin?`<span class="prize">💰 ${esc(m.sovrin)} sovrindori</span>`:''}<span>TOP-${t}</span></div></div></div>
      <div class="aw-grid" aria-label="${t} ta o'qituvchi ichida ${o}-o'rin">${Array.from({length:t},(_,i)=>`<i class="${i+1===o?'me':i<o?'up':''}"></i>`).join('')}</div><p class="aw-legend"><span><i></i>${o}-o'rin</span><span>har bir nuqta — bitta o'qituvchi (TOP-${t})</span></p></article>`}
  if(H.ish){const w=H.ish,lg=safeImg(w.logo);
    html+=`<article class="nw nw-work rv">${lg?`<img class="zis" src="${esc(lg)}" alt="${esc(w.nom)} logotipi" width="160" height="174">`:''}
      <div><span class="kick">💼 ${esc(w.yil)}</span><h3>${esc(w.nom)}'da dars beryapman</h3><p>${esc(w.lavozim)}</p><span class="livechip g">hozir shu yerda</span></div></article>`}
  if(H.mutolaa){const t=H.mutolaa,u=safeUrl(t.url);
    html+=`<article class="nw nw-read rv"><div class="bk" aria-hidden="true"><svg viewBox="0 0 64 48"><path d="M32 8C24 2 12 2 4 5v38c8-3 20-3 28 3 8-6 20-6 28-3V5C52 2 40 2 32 8z" fill="#fff"/><path d="M32 8v38" stroke="#FF6900" stroke-width="2.5"/><path d="M10 13c6-1.5 12-1 17 1M10 20c6-1.5 12-1 17 1M10 27c6-1.5 12-1 17 1M37 14c5-2 11-2.5 17-1M37 21c5-2 11-2.5 17-1M37 28c5-2 11-2.5 17-1" stroke="#ffb58a" stroke-width="2" stroke-linecap="round"/></svg></div>
      <span class="kick">📚 Mutolaa</span><h3>Mutolaa'da kitob o'qiyapman</h3>${t.kitob?`<p class="book">Hozir: <b>${esc(t.kitob)}</b></p>`:''}
      <dl><div><dt>ID</dt><dd>${esc(t.id)}</dd></div><div><dt>Nik</dt><dd>${esc(t.nik)}</dd></div></dl>
      <div class="rd-btns"><button type="button" data-copy="${esc(t.id)}">ID nusxalash</button>${u?`<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">Mutolaa ↗</a>`:''}</div></article>`}
  if(H.loyiha){const l=H.loyiha;
    html+=`<article class="nw nw-proj rv"><span class="rk" aria-hidden="true">🚀</span><div><span class="kick">⚙️ Jarayonda</span><h3>${esc(l.t)}</h3><p>${esc(l.d)}</p></div>
      <div class="bars" aria-hidden="true"><i></i><i></i><i></i></div></article>`}
  $('#now').innerHTML=html;
  if(/^\d{4}-\d{2}-\d{2}$/.test(H.yangilangan||'')){const [y,m,d]=H.yangilangan.split('-');$('#hozirSana').textContent=`Oxirgi yangilanish: ${d}.${m}.${y}. Bu bo'lim vaqti-vaqti bilan yangilanadi.`}

  /* ---------- ish joylari ---------- */
  const jb=$('#jobs');
  if(jb)jb.innerHTML=(MEN.ish||[]).map(([y,j,l],i)=>`<li class="${i===0?'now':''}"><span class="yrs">${esc(y)}</span><b>${esc(j)}</b><small>${esc(l)}</small>${i===0?'<span class="live">hozir shu yerda</span>':''}</li>`).join('');

  /* ---------- API ---------- */
  const raw=String(MEN.API_URL||'').trim().replace(/\/+$/,'');
  const API=/^(https:\/\/[a-z0-9.-]+|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?)$/i.test(raw)?raw:''; // lokal sinov uchun localhost ham
  if(!API)return; // backend ulanmagan
  async function api(path,data){
    const ctl=new AbortController(),tm=setTimeout(()=>ctl.abort(),10000);
    try{
      const r=await fetch(API+path,data?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:ctl.signal}:{signal:ctl.signal});
      const j=await r.json().catch(()=>({}));
      if(!r.ok)throw Object.assign(new Error(j.xato||'Xatolik'),{server:!!j.xato});
      return j;
    }finally{clearTimeout(tm)}
  }
  const NET="Internet bilan bog'lanib bo'lmadi. Qayta urinib ko'ring yoki Telegram orqali yozing.";
  const fmt=n=>Number(n||0).toLocaleString('ru-RU').replace(/ /g,' ');

  /* ---------- ko'rishlar va yurakcha ---------- */
  const lb=$('#likeBtn'),ln=$('#likeN');
  const setStats=s=>{if(!s)return;ln.textContent=fmt(s.yurakcha);lb.setAttribute('aria-pressed',s.bosgan?'true':'false');$('#viewsN').textContent=fmt(s.korish);lb.hidden=false;$('#views').hidden=false};
  api('/api/view',{}).then(setStats).catch(()=>{});
  let busy=false;
  async function toggleLike(){
    if(busy)return;busy=true;
    const on=lb.getAttribute('aria-pressed')!=='true',n=Number(ln.textContent.replace(/\D/g,''))||0;
    lb.setAttribute('aria-pressed',on?'true':'false');ln.textContent=fmt(n+(on?1:-1));
    if(on&&!reduce){
      lb.classList.toggle('pop',false);void lb.offsetWidth;lb.classList.add('pop');
      for(let i=0;i<8;i++){
        const s=document.createElement('span');s.className='burst';s.textContent=['❤','✦','💖'][i%3];
        const a=i/8*Math.PI*2;
        s.style.cssText=`color:${COL[i%5]};--dx:${Math.cos(a)*44}px;--dy:${Math.sin(a)*44}px;--r:${(Math.random()-.5)*90}deg`;
        lb.appendChild(s);setTimeout(()=>s.parentNode&&s.parentNode.removeChild(s),720);
      }
    }
    try{setStats(await api('/api/like',{}))}
    catch(e){lb.setAttribute('aria-pressed',on?'false':'true');ln.textContent=fmt(n);toast(e.server?e.message:NET)}
    busy=false;
  }
  lb.addEventListener('click',toggleLike);
  if(typeof CMDS==='object'){
    CMDS.like=()=>{toggleLike();return `<span class="k">❤</span> Rahmat! Yurakcha yuborildi.`};
    CMDS.fikr=()=>{$('#fikrlar').scrollIntoView({behavior:reduce?'auto':'smooth'});return "Fikrlar devoriga o'tdik 👇"};
  }

  /* ---------- fikrlar devori ---------- */
  const wall=$('#wall');$('#fikrlar').hidden=false;
  const p2=n=>String(n).padStart(2,'0');
  const ago=iso=>{const s=(Date.now()-new Date(iso))/1000;if(!(s>=0))return'';
    if(s<60)return'hozirgina';if(s<3600)return`${Math.floor(s/60)} daqiqa oldin`;if(s<86400)return`${Math.floor(s/3600)} soat oldin`;if(s<86400*30)return`${Math.floor(s/86400)} kun oldin`;
    const d=new Date(iso);return`${p2(d.getDate())}.${p2(d.getMonth()+1)}.${d.getFullYear()}`};
  const card=(f,i)=>{const c=COL[i%5],h=([...String(f.ism||'?')][0]||'?').toUpperCase();
    return `<figure class="fcard" style="--q:${c};animation-delay:${Math.min(i,8)*60}ms"><p>${esc(f.matn)}</p><figcaption class="who"><span class="av" aria-hidden="true">${esc(h)}</span><span><b>${esc(f.ism)}</b><small>${esc([f.kasb,ago(f.vaqt)].filter(Boolean).join(' · '))}</small></span></figcaption></figure>`};
  wall.innerHTML='<div class="sk"></div><div class="sk"></div><div class="sk"></div>';
  api('/api/fikrlar').then(d=>{const L=Array.isArray(d.fikrlar)?d.fikrlar:[];
    wall.innerHTML=L.length?L.map(card).join(''):`<div class="empty"><b>Hali fikr yo'q</b>Birinchi bo'lib fikr qoldiring: formani to'ldiring.</div>`;
  }).catch(()=>{wall.innerHTML=`<div class="empty"><b>Fikrlarni yuklab bo'lmadi</b>Sahifani biroz keyin yangilab ko'ring.</div>`});

  /* ---------- formalar ---------- */
  $$('.cnt').forEach(c=>{const t=document.getElementById(c.dataset.for);const u=()=>c.textContent=`${t.value.length} / ${t.maxLength}`;t.addEventListener('input',u);u()});
  function wire(form,path,rules,okText){
    const started=Date.now(),msg=form.querySelector('.fmsg'),btn=form.querySelector('button[type=submit]');
    const field=n=>form.elements[n];
    const check=n=>{const [min,txt]=rules[n],el=field(n),bad=el.value.trim().length<min;el.setAttribute('aria-invalid',bad?'true':'false');return bad?txt:''};
    Object.keys(rules).forEach(n=>{
      field(n).addEventListener('blur',()=>{if(field(n).value)check(n)});
      field(n).addEventListener('input',()=>{if(field(n).getAttribute('aria-invalid')==='true')check(n)});
    });
    form.addEventListener('submit',async e=>{
      e.preventDefault();msg.className='fmsg';msg.textContent='';
      const errs=Object.keys(rules).map(check).filter(Boolean);
      if(errs.length){msg.className='fmsg err';msg.textContent=errs[0];const bad=form.querySelector('[aria-invalid="true"]');if(bad)bad.focus();return}
      const data=Object.fromEntries(new FormData(form));data.vaqt=Date.now()-started;
      btn.disabled=true;const old=btn.innerHTML;btn.innerHTML='<span>Yuborilmoqda…</span>';
      try{
        await api(path,data);form.reset();
        form.querySelectorAll('.cnt').forEach(c=>c.textContent=`0 / ${document.getElementById(c.dataset.for).maxLength}`);
        msg.className='fmsg ok';msg.textContent=okText;
        if(typeof confetti==='function'&&!reduce)confetti();
      }catch(err){msg.className='fmsg err';msg.textContent=err.server?err.message:NET}
      finally{btn.disabled=false;btn.innerHTML=old}
    });
  }
  wire($('#fikrForm'),'/api/fikr',{ism:[2,"Ismingizni yozing (kamida 2 ta harf)."],matn:[10,"Fikringiz juda qisqa. Kamida 10 ta belgi yozing."]},"Rahmat! Fikringiz tekshirilgandan keyin devorda chiqadi.");
  const xf=$('#xabarForm');xf.hidden=false;
  wire(xf,'/api/xabar',{ism:[2,"Ismingizni yozing (kamida 2 ta harf)."],aloqa:[5,"Javob berishim uchun telefon, Telegram yoki email yozing."],matn:[5,"Xabar matnini yozing."]},"Xabaringiz yuborildi! Tez orada javob beraman.");
})();
