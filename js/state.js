/* Shared state and small helpers used by every other script. */
const $=s=>document.querySelector(s);

let lang='en';                 // the site always opens in English
let cat='All',qs='',shown=12;  // archive filter, search text, cards shown
let cur=-1,list=[];            // lightbox position, currently filtered posters

const cats=['All',...new Set(P.map(p=>p.category))];

const ar=()=>lang=='ar';
const tx=k=>UI[lang][k];                                   // UI string
const cl=c=>ar()?CA[c]:c;                                  // category label
const ti=p=>ar()?p.titleAr:p.title;                        // poster title
const sy=p=>ar()?p.storyAr:p.story;                        // poster story
const im=p=>ar()&&p.imageAr?p.imageAr:p.image;             // poster image
