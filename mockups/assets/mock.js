/* ~1 KB of vanilla JS: theme toggle, stat counters, lightbox. No dependencies. */
(function(){
  var d=document,h=d.documentElement,s;
  try{s=localStorage}catch(e){s={getItem:function(){},setItem:function(){}}}
  var t=s.getItem('theme'),m=s.getItem('mode');
  if(t)h.dataset.theme=t;if(m)h.dataset.mode=m;
  d.addEventListener('click',function(e){
    var b=e.target.closest('[data-theme-set],[data-mode-toggle]');
    if(b){
      if(b.dataset.themeSet){h.dataset.theme=b.dataset.themeSet;s.setItem('theme',b.dataset.themeSet);
        d.querySelectorAll('[data-theme-set]').forEach(function(x){x.setAttribute('aria-pressed',x===b)})}
      else{var dark=h.dataset.mode?h.dataset.mode==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
        h.dataset.mode=dark?'light':'dark';s.setItem('mode',h.dataset.mode)}
    }
  });
  var dk=d.querySelector('.mk');if(dk&&t)dk.querySelectorAll('[data-theme-set]').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.themeSet===t)});
  /* counters */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;io.unobserve(e.target);
      var el=e.target,n=+el.dataset.n,sf=el.dataset.sf||'',t0=null;
      (function f(t){t0=t0||t;var p=Math.min((t-t0)/1400,1);el.textContent=Math.floor((1-Math.pow(1-p,3))*n).toLocaleString('en-US')+sf;if(p<1)requestAnimationFrame(f)})(performance.now());
    })},{threshold:.4});
    d.querySelectorAll('[data-n]').forEach(function(el){io.observe(el)});
  }
  /* lightbox */
  var g=d.querySelector('.masonry'),lb=d.querySelector('dialog.lb');
  if(g&&lb){
    var im=lb.querySelector('img'),btns=[].slice.call(g.querySelectorAll('button')),i=0;
    function show(n){i=(n+btns.length)%btns.length;im.src=btns[i].dataset.full;im.alt=btns[i].firstChild.alt||''}
    g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;show(btns.indexOf(b));lb.showModal()});
    lb.addEventListener('click',function(e){if(e.target===lb||e.target.closest('.x'))lb.close();else if(e.target.closest('.pv'))show(i-1);else if(e.target.closest('.nx'))show(i+1)});
    d.addEventListener('keydown',function(e){if(!lb.open)return;if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
  }
})();
