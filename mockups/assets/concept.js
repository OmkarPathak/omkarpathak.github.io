/* ~0.6 KB: animated stat counters. Everything else in these concepts is CSS-only. */
(function(){
  if(!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;io.unobserve(e.target);
    var el=e.target,n=+el.dataset.n,sf=el.dataset.sf||'',t0;
    requestAnimationFrame(function f(t){t0=t0||t;var p=Math.min((t-t0)/1400,1);el.textContent=Math.floor((1-Math.pow(1-p,3))*n).toLocaleString('en-US')+sf;if(p<1)requestAnimationFrame(f)});
  })},{threshold:.5});
  document.querySelectorAll('[data-n]').forEach(function(el){io.observe(el)});
})();
