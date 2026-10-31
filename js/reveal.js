/* Scroll reveal: elements with .rv fade in when they enter the viewport. */
var rvIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rvIO.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=(el.parentElement.classList.contains('sv')?(i%4)*.08:0)+'s';rvIO.observe(el)});
