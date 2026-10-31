/* Intro screen: animated name + progress counter, then slides up. */
(function(){
  var pre=document.getElementById('preloader'),nm=document.getElementById('intro-name'),
      line=document.getElementById('progress-line'),txt=document.getElementById('progress-text'),
      name='Omar Mohamed',root=document.documentElement;
  nm.innerHTML=name.split('').map(function(c,i){return '<span style="animation-delay:'+(i*0.1).toFixed(1)+'s">'+(c===' '?'&nbsp;':c)+'</span>'}).join('');
  root.style.overflow='hidden';
  var DUR=2500,t0=null;
  function step(t){
    if(t0===null)t0=t;
    var p=Math.min(1,(t-t0)/DUR);
    line.style.width=(p*100)+'%';txt.textContent=Math.round(p*100)+'%';
    if(p<1)requestAnimationFrame(step);else finish();
  }
  function finish(){
    setTimeout(function(){
      pre.classList.add('up');
      document.body.classList.add('ready');
      setTimeout(function(){pre.remove();root.style.overflow=''},850);
    },150);
  }
  requestAnimationFrame(step);
})();
