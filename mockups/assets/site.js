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

/* Motion: scroll reveals, timeline draw, auto-rotating editor tabs. Skipped for reduced-motion users. */
(function(){
  var d=document,h=d.documentElement;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver' in window))return;
  var start=function(){
  h.classList.add('js');
  var vh=innerHeight,io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
  })},{rootMargin:'0px 0px -8% 0px',threshold:.08});
  var sel='main .card,main .stat,main .tl .it,main .testi,main .hl,main .arch li,main .sk,main .art-card,main .award li,main .shot,main .work-split,main .strip img';
  var seen=new Map(),list=[].slice.call(d.querySelectorAll(sel)).filter(function(el){
    return !(el.closest('.tl .it')&&el!==el.closest('.tl .it'))&&!el.closest('.hero');
  });
  var tops=list.map(function(el){return el.getBoundingClientRect().top});   /* all reads first, then all writes: no forced reflow */
  list.forEach(function(el,n){
    if(tops[n]<vh*0.92)return;
    var p=el.parentNode,i=seen.get(p)||0;seen.set(p,i+1);
    el.style.setProperty('--d',Math.min(i,5));el.classList.add('rv');io.observe(el);
  });
  d.querySelectorAll('.tl').forEach(function(t){
    t.classList.add('draw');
    t.querySelectorAll('.it').forEach(function(it,i){it.querySelector('.dot')&&it.querySelector('.dot').style.setProperty('--d',Math.min(i,8))});
    io.observe(t);
  });
  d.querySelectorAll('.sk .pills').forEach(function(p){p.querySelectorAll('span').forEach(function(s,i){s.style.setProperty('--k',i)})});
  /* hero editor: auto-rotate tabs until the visitor interacts */
  var win=d.querySelector('.win'),radios=win&&win.querySelectorAll('input[name=t]');
  if(radios&&radios.length===3){
    var i=0,timer,stop=function(){clearInterval(timer);win.removeAttribute('data-auto')};
    win.setAttribute('data-auto','1');
    timer=setInterval(function(){if(d.hidden)return;i=(i+1)%3;radios[i].checked=true},6000);
    win.addEventListener('pointerdown',stop,{once:true});win.addEventListener('keydown',stop,{once:true});
  }
  };
  if('requestIdleCallback' in window)requestIdleCallback(start,{timeout:600});else setTimeout(start,200);
})();
