/* English / Arabic switch. English text is captured from the HTML; Arabic comes from translations.js. */
const EN_T={};
document.querySelectorAll('[data-i18n]').forEach(el=>EN_T[el.dataset.i18n]=el.innerHTML);

function setLang(l){
  lang=l;
  const r=document.documentElement;r.lang=l;r.dir=l=='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.innerHTML=(l=='ar'?AR_T:EN_T)[el.dataset.i18n]});
  document.title=META[l].t;
  document.querySelector('meta[name=description]').content=META[l].d;
  $('#lang').textContent=l=='ar'?'EN':'العربية';
  buildBar();render();
  if($('#lb').classList.contains('on'))openLightbox(cur);
}
$('#lang').onclick=()=>setLang(ar()?'en':'ar');
