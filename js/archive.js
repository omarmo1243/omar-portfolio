/* Poster archive: filter bar, search, masonry wall, "view more". */
const wall=$('#wall');

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;setTimeout(()=>el.classList.add('in'),(el._d||0)*90);io.unobserve(el)}}),{threshold:.08});

function buildBar(){
  const q=$('#q'),v=q?q.value:'';
  $('#bar').innerHTML=cats.map(c=>`<button class="f${c==cat?' on':''}" data-c="${c}">${cl(c)}</button>`).join('')
    +`<input id="q" type="search" placeholder="${tx('ph')}" aria-label="${tx('ph')}">`;
  $('#q').value=v;
}

function render(){
  const s=qs.toLowerCase();
  const want=P.filter(p=>(cat=='All'||p.category==cat)&&(!s||p.title.toLowerCase().includes(s)||p.titleAr.includes(s)||cl(p.category).toLowerCase().includes(s)));
  list=want;
  wall.querySelectorAll('.card').forEach(c=>c.classList.add('out'));
  setTimeout(()=>{
    wall.innerHTML='';
    if(!want.length)wall.innerHTML=`<p class="empty">${tx('none')}</p>`;
    want.slice(0,shown).forEach((p,i)=>{
      const d=document.createElement('div');d.className='card';d._d=i%3;
      d.innerHTML=`<div class="tilt"><img loading="lazy" src="${im(p)}" width="${p.w}" height="${p.h}" alt="${ti(p)}"><div class="ex">⤢</div></div>`;
      d.onclick=()=>openLightbox(i);
      const t=d.firstChild;
      d.onmousemove=e=>{const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(1.03)`};
      d.onmouseleave=()=>t.style.transform='';
      wall.appendChild(d);io.observe(d);
    });
    $('#more').style.display=want.length>shown?'block':'none';
  },260);
}

$('#bar').onclick=e=>{const b=e.target.closest('.f');if(!b)return;document.querySelectorAll('.f').forEach(x=>x.classList.remove('on'));b.classList.add('on');cat=b.dataset.c;shown=12;render()};
$('#bar').oninput=e=>{if(e.target.id!='q')return;qs=e.target.value.toLowerCase();shown=12;render()};
$('#more').onclick=()=>{shown+=12;render()};
