/* ──────────────────────────────────────────────
   Etna Racing Club — Global Navigation Bar
   Drop <script src="nav.js"></script> (or ../nav.js
   for pages inside campionati/ and risultati/)
   right after <body> or before </body>.
   ────────────────────────────────────────────── */
(function(){

  /* ── path helpers ── */
  var loc  = window.location.pathname;
  var inSub = /\/(campionati|risultati)\//.test(loc);
  var B = inSub ? '../' : '';            // base prefix

  /* ── detect active page ── */
  var pg = loc.split('/').pop() || 'index.html';
  if (pg === '') pg = 'index.html';

  function isActive(file){
    if (file === 'index.html')        return pg === 'index.html' || pg === '';
    if (file === 'archivio.html')     return pg === 'archivio.html';
    if (file === 'calendario.html')   return pg === 'calendario.html';
    if (file === 'piloti_gt7.html')   return pg === 'piloti_gt7.html';
    if (file === 'social.html')       return pg === 'social.html';
    if (file === 'statistiche.html')  return pg === 'statistiche.html';
    if (file === 'albo-doro.html')    return pg === 'albo-doro.html';
    if (file === 'regolamento_etna_racing_club.html') return pg === 'regolamento_etna_racing_club.html';
    return false;
  }

  /* ── nav items ── */
  var items = [
    { label: 'Home',        href: 'index.html' },
    { label: 'Calendario',  href: 'calendario.html' },
    { label: 'Archivio',    href: 'archivio.html' },
    { label: 'Piloti',      href: 'piloti_gt7.html' },
    { label: 'Social',       href: 'social.html' },
    { label: 'Statistiche', href: 'statistiche.html' },
    { label: "Albo d'Oro", href: 'albo-doro.html' },
    { label: 'Regolamento', href: 'regolamento_etna_racing_club.html' }
  ];

  /* ── build links HTML ── */
  var linksHTML = '';
  for (var i = 0; i < items.length; i++) {
    var it  = items[i];
    var cls = isActive(it.href) ? ' erc-nav__link--active' : '';
    linksHTML += '<a href="' + B + it.href + '" class="erc-nav__link' + cls + '">' + it.label + '</a>';
  }

  /* ── inject CSS ── */
  var style = document.createElement('style');
  style.textContent = [
    /* ── NAV BAR ── */
    '.erc-nav{',
      'position:fixed;top:0;left:0;right:0;z-index:9999;',
      'height:54px;',
      'display:flex;align-items:center;justify-content:space-between;',
      'padding:0 24px;',
      'background:rgba(7,7,15,0.92);',
      'backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);',
      'border-bottom:1px solid rgba(201,162,39,0.25);',
      'box-shadow:0 2px 20px rgba(0,0,0,0.6);',
      'font-family:"Teko",sans-serif;',
      'transition:background 0.3s,box-shadow 0.3s;',
    '}',

    /* ── BRAND (left) ── */
    '.erc-nav__brand{',
      'display:flex;align-items:center;gap:10px;',
      'text-decoration:none;',
      'flex-shrink:0;',
    '}',
    '.erc-nav__logo{',
      'width:34px;height:34px;',
      'object-fit:contain;',
      'border-radius:6px;',
      'filter:drop-shadow(0 0 8px rgba(201,162,39,0.35));',
      'transition:filter 0.25s;',
    '}',
    '.erc-nav__brand:hover .erc-nav__logo{',
      'filter:drop-shadow(0 0 14px rgba(232,197,71,0.6));',
    '}',
    '.erc-nav__title{',
      'font-family:"Russo One",sans-serif;',
      'font-size:16px;',
      'letter-spacing:2px;',
      'color:#c9a227;',
      'text-transform:uppercase;',
      'line-height:1;',
    '}',

    /* ── LINKS (right, desktop) ── */
    '.erc-nav__links{',
      'display:flex;align-items:center;gap:4px;',
    '}',
    '.erc-nav__link{',
      'font-size:15px;',
      'font-weight:400;',
      'letter-spacing:2.5px;',
      'text-transform:uppercase;',
      'color:rgba(201,184,163,0.55);',
      'text-decoration:none;',
      'padding:6px 14px;',
      'border-radius:6px;',
      'transition:color 0.2s,background 0.2s;',
      'white-space:nowrap;',
    '}',
    '.erc-nav__link:hover{',
      'color:#e8c547;',
      'background:rgba(201,162,39,0.08);',
    '}',
    '.erc-nav__link--active{',
      'color:#e8c547;',
      'background:rgba(201,162,39,0.10);',
      'border-bottom:2px solid #c9a227;',
      'border-radius:6px 6px 0 0;',
    '}',

    /* ── HAMBURGER (mobile) ── */
    '.erc-nav__burger{',
      'display:none;',
      'flex-direction:column;justify-content:center;align-items:center;gap:5px;',
      'width:36px;height:36px;',
      'background:none;border:none;cursor:pointer;',
      'padding:4px;',
      'border-radius:6px;',
      'transition:background 0.2s;',
    '}',
    '.erc-nav__burger:hover{background:rgba(201,162,39,0.10);}',
    '.erc-nav__burger span{',
      'display:block;width:20px;height:2px;',
      'background:#c9a227;',
      'border-radius:2px;',
      'transition:transform 0.25s,opacity 0.25s;',
    '}',
    '.erc-nav__burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}',
    '.erc-nav__burger.open span:nth-child(2){opacity:0;}',
    '.erc-nav__burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}',

    /* ── MOBILE MENU ── */
    '.erc-nav__mobile{',
      'display:none;',
      'position:fixed;top:54px;left:0;right:0;bottom:0;',
      'z-index:9998;',
      'background:rgba(7,7,15,0.97);',
      'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);',
      'flex-direction:column;',
      'align-items:center;',
      'justify-content:center;',
      'gap:6px;',
      'padding:40px 20px;',
      'overflow-y:auto;',
    '}',
    '.erc-nav__mobile.open{display:flex;}',
    '.erc-nav__mobile .erc-nav__link{',
      'font-size:22px;',
      'letter-spacing:4px;',
      'padding:14px 28px;',
      'width:100%;max-width:320px;',
      'text-align:center;',
      'border-radius:10px;',
    '}',
    '.erc-nav__mobile .erc-nav__link:hover{',
      'background:rgba(201,162,39,0.12);',
    '}',
    '.erc-nav__mobile .erc-nav__link--active{',
      'border-bottom:none;',
      'border-radius:10px;',
      'background:rgba(201,162,39,0.12);',
      'border-left:3px solid #c9a227;',
    '}',

    /* ── BODY SPACER ── */
    'body.erc-has-nav{padding-top:54px!important;}',

    /* ── RESPONSIVE ── */
    '@media(max-width:880px){',
      '.erc-nav__links{display:none;}',
      '.erc-nav__burger{display:flex;}',
    '}',
    '@media(max-width:480px){',
      '.erc-nav{padding:0 14px;}',
      '.erc-nav__title{font-size:14px;letter-spacing:1.5px;}',
      '.erc-nav__logo{width:30px;height:30px;}',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  /* ── inject HTML ── */
  var nav = document.createElement('nav');
  nav.className = 'erc-nav';
  nav.innerHTML = [
    '<a href="' + B + 'index.html" class="erc-nav__brand">',
      '<img src="' + B + 'etna-logo.jpg" alt="ERC" class="erc-nav__logo" onerror="this.style.display=\'none\'">',
      '<span class="erc-nav__title">ERC</span>',
    '</a>',
    '<div class="erc-nav__links">' + linksHTML + '</div>',
    '<button class="erc-nav__burger" aria-label="Menu">',
      '<span></span><span></span><span></span>',
    '</button>'
  ].join('');

  /* ── mobile overlay ── */
  var mob = document.createElement('div');
  mob.className = 'erc-nav__mobile';
  mob.innerHTML = linksHTML;

  /* ── insert into page ── */
  document.body.insertBefore(nav, document.body.firstChild);
  document.body.insertBefore(mob, nav.nextSibling);
  document.body.classList.add('erc-has-nav');

  /* ── hamburger toggle ── */
  var burger = nav.querySelector('.erc-nav__burger');
  burger.addEventListener('click', function(){
    burger.classList.toggle('open');
    mob.classList.toggle('open');
    /* prevent body scroll when menu open */
    if (mob.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  /* ── close mobile menu on link click ── */
  var mobLinks = mob.querySelectorAll('.erc-nav__link');
  for (var j = 0; j < mobLinks.length; j++) {
    mobLinks[j].addEventListener('click', function(){
      burger.classList.remove('open');
      mob.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

})();
