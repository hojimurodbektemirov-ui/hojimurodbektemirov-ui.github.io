/* PRE.JS — <head> da ishlaydi: preloader faqat sessiyadagi birinchi tashrifda ko'rsatiladi */
(function(){try{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(sessionStorage.getItem('xb_seen')!=='1')document.documentElement.classList.add('pl','loading');
}catch(_){}})();
