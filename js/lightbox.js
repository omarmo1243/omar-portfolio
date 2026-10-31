/* Full-screen poster viewer: zoom, pan, details panel, keyboard navigation. */
let s=1,x=0,y=0,drag=null;
const li=$('#li'),st=$('#stage');
const tf=()=>li.style.transform=`translate(-50%,-50%) translate(${x}px,${y}px) scale(${s})`;

function openLightbox(i){
  cur=(i+list.length)%list.length;
  const p=list[cur];
  s=1;x=y=0;li.src=im(p);li.alt=ti(p);tf();
  $('#lb').classList.add('on');document.documentElement.style.overflow='hidden';
  $('#pn').innerHTML=`<small class="an ltr" style="color:var(--ac)">${String(cur+1).padStart(2,'0')} / ${String(list.length).padStart(2,'0')}</small><h2>${ti(p)}</h2><dl><dt>${tx('cl')}</dt><dd>${tx('cv')}</dd><dt>${tx('yr')}</dt><dd>${p.year}</dd><dt>${tx('tl')}</dt><dd><bdi>${p.tools}</bdi></dd><dt>${tx('ty')}</dt><dd>${cl(p.category)}</dd></dl><p>${sy(p)}</p><div class="dots">${p.colors.map(k=>`<i title="${k}" style="background:${k}"></i>`).join('')}</div><a class="btn" download="${p.titleEn}.webp" href="${im(p)}">${tx('dl')}</a><button class="btn o" id="nx">${tx('nx')}</button><button class="btn o" id="cl">${tx('cx')}</button>`;
  $('#nx').onclick=()=>openLightbox(cur+1);
  $('#cl').onclick=closeLightbox;
  $('#cl').focus();
}
function closeLightbox(){$('#lb').classList.remove('on');document.documentElement.style.overflow=''}

/* zoom / pan */
st.addEventListener('wheel',e=>{e.preventDefault();s=Math.min(5,Math.max(1,s*(e.deltaY<0?1.12:.89)));if(s==1)x=y=0;tf()},{passive:false});
st.onpointerdown=e=>{drag=[e.clientX-x,e.clientY-y];st.setPointerCapture(e.pointerId)};
st.onpointermove=e=>{if(drag&&s>1){x=e.clientX-drag[0];y=e.clientY-drag[1];tf()}};
st.onpointerup=()=>drag=null;
st.ondblclick=()=>{s=s>1?1:2.5;x=y=0;tf()};

/* keyboard: next/previous arrows follow the reading direction */
addEventListener('keydown',e=>{
  if(!$('#lb').classList.contains('on'))return;
  const f=ar()?'ArrowLeft':'ArrowRight',b=ar()?'ArrowRight':'ArrowLeft';
  if(e.key==f)openLightbox(cur+1);
  if(e.key==b)openLightbox(cur-1);
  if(e.key=='Escape')closeLightbox();
});
