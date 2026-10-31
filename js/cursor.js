/* Custom "VIEW" cursor that follows the mouse and grows over poster cards. */
(function(){
  const c=$('#cur');
  addEventListener('mousemove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';c.classList.toggle('v',!!e.target.closest('.card'))});
})();
