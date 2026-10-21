/* ~1 KB vanilla JS: stat counters + native <dialog> lightbox. No dependencies. */
(function(){
  var d=document;
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;io.unobserve(e.target);
      var el=e.target,n=+el.dataset.n,sf=el.dataset.sf||'',t0;
      requestAnimationFrame(function f(t){t0=t0||t;var p=Math.min((t-t0)/1400,1);el.textContent=Math.floor((1-Math.pow(1-p,3))*n).toLocaleString('en-US')+sf;if(p<1)requestAnimationFrame(f)});
    })},{threshold:.5});
    d.querySelectorAll('[data-n]').forEach(function(el){io.observe(el)});
  }
  var g=d.querySelector('.masonry'),lb=d.querySelector('dialog.lb');
  if(g&&lb){
    var im=lb.querySelector('img'),btns=[].slice.call(g.querySelectorAll('button')),i=0;
    function show(n){i=(n+btns.length)%btns.length;im.src=btns[i].dataset.full;im.alt=btns[i].firstChild.alt||''}
    g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;show(btns.indexOf(b));lb.showModal()});
    lb.addEventListener('click',function(e){if(e.target===lb||e.target.closest('.x'))lb.close();else if(e.target.closest('.pv'))show(i-1);else if(e.target.closest('.nx'))show(i+1)});
    d.addEventListener('keydown',function(e){if(!lb.open)return;if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
  }
})();
