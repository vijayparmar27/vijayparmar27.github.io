/* ==========================================================================
   Vijay Parmar — portfolio behaviour
   Ported from the Claude Design canvas component (DCLogic) to vanilla JS.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------- data --- */

  var PROJECTS = [
    {
      id: 'rummy3plus', title: '3+ Rummy — Multiplayer Engine', category: 'Real-time Games', years: '2021 — 2024',
      org: 'Artoon Solutions', img: 'assets/img/rummy3plus.jpg',
      blurb: 'Point, pool and deal rummy on one authoritative engine — the core that went on to power eleven more white-label platforms.',
      metric: '12 platforms', metricLabel: 'White-label launches from one standardized core engine',
      details: [
        'Built the table lifecycle end to end: seat allocation, turn timers, draw/discard validation, declare and bet settlement.',
        'Live game state held in Redis and match history in MongoDB, so a player who dropped mid-hand could rejoin the same hand instead of forfeiting.',
        'Socket.IO room topology per table, with reconnection replay so returning clients resync to the exact turn state.',
        'Standardized the engine so a new white-label platform could be configured rather than rebuilt — launch time fell from weeks to days.'
      ],
      stack: ['Node.js', 'TypeScript', 'Socket.IO', 'Redis', 'MongoDB', 'Express'],
      links: [{ label: '3+ Rummy platform', url: 'https://3plusgames.com/' }]
    },
    {
      id: 'hyze', title: 'Hyze — On-Demand Mobility', category: 'Mobile', years: '2024 — 2025',
      org: 'Elluminati Inc', img: null, glyph: 'HYZE', glyphLabel: 'Live on Google Play',
      chips: ['Node.js', 'Socket.IO', 'Redis', 'MongoDB'],
      blurb: 'Uber-style ride-hailing backend: trip lifecycle, live driver tracking, in-app chat and a multi-channel notification pipeline.',
      metric: '10,000+', metricLabel: 'Concurrent trips carried at peak across Socket.IO rooms',
      details: [
        'Built the backend for the full trip lifecycle — request, match, accept, en route, in progress, complete — with live driver location streaming throughout.',
        'Optimized driver geo-state modeling in Redis for low-latency nearest-driver lookups, and scaled Socket.IO rooms to 10,000+ concurrent trips at peak.',
        'Shipped in-app rider–driver chat plus a notification system spanning push, SMS and email.',
        'Designed and documented the REST API consumed by three clients: rider app, driver app and admin panel.'
      ],
      stack: ['Node.js', 'Express', 'TypeScript', 'Socket.IO', 'Redis', 'MongoDB', 'AWS SNS/SES'],
      links: [{ label: 'Hyze on Google Play', url: 'https://play.google.com/store/search?q=hyze&c=apps' }]
    },
    {
      id: 'wal', title: 'WAL — Freight Operations', category: 'Platforms', years: '2025',
      org: 'Logistic Infotech', img: null, glyph: 'WAL', glyphLabel: 'Freight ops · production',
      chips: ['React.js', 'Sails.js', 'MySQL', 'Socket.IO'],
      blurb: 'Quotes, Orders, Carriers and Customer Management as connected modules — built end to end, front end to database.',
      metric: '40% faster', metricLabel: 'Quote turnaround after the carrier-selection redesign',
      details: [
        'Built the platform end to end — Quotes, Orders, Carriers and Customer Management as connected modules — React front end on a Sails.js / MySQL backend.',
        'Architected a carrier-selection flow that ranks carriers on rate and availability, cutting quote turnaround time by 40%.',
        'Engineered live shipment tracking with Socket.IO so operations staff and customers see the same state at the same moment.'
      ],
      stack: ['React.js', 'Node.js', 'Sails.js', 'TypeScript', 'Socket.IO', 'MySQL', 'PostgreSQL', 'Redis'],
      links: []
    },
    {
      id: 'artoonmgp', title: 'Artoon MGP Rummy', category: 'Real-time Games', years: '2021 — 2024',
      org: 'Artoon Solutions', img: 'assets/img/artoon-mgp.jpg',
      blurb: 'Multi-game platform skin of the rummy engine, packaged and configured for white-label clients.',
      metric: 'Weeks → days', metricLabel: 'New-platform launch time after engine standardization',
      details: [
        'Packaged the core engine as a configurable multi-game platform — stakes, timers, rake and table sizes as client configuration.',
        'Shipped MultiTable Rummy so a player could hold concurrent seats across tables without state collisions.',
        'Kept per-client rules isolated from the shared codebase so a fix in the core reached every platform at once.'
      ],
      stack: ['Node.js', 'TypeScript', 'Socket.IO', 'Redis', 'MongoDB'],
      links: [{ label: 'Artoon Solutions', url: 'https://artoonsolutions.com/' }]
    },
    {
      id: 'team18', title: 'Team-18 MGP Rummy', category: 'Real-time Games', years: '2021 — 2024',
      org: 'Artoon Solutions', img: 'assets/img/team18-rummy.jpg',
      blurb: 'A second white-label deployment of the multi-game platform, live with its own economy and skin.',
      metric: null, metricLabel: null,
      details: [
        'Deployed the shared rummy core against a separate client economy, wallet and tournament configuration.',
        'Tuned turn-timer and reconnection windows for the client’s traffic profile and network conditions.',
        'Instrumented table events so operations could trace any hand from deal to settlement.'
      ],
      stack: ['Node.js', 'TypeScript', 'Socket.IO', 'Redis', 'MongoDB'],
      links: []
    },
    {
      id: 'callbreak', title: 'CallBreak, Teen Patti & Roulette', category: 'Real-time Games', years: '2021 — 2024',
      org: 'Artoon Solutions', img: 'assets/img/callbreak.jpg',
      blurb: 'Trick-taking, betting and wheel games sharing the same real-time backend primitives.',
      metric: null, metricLabel: null,
      details: [
        'Extended the engine beyond rummy: trick evaluation for CallBreak, blind/seen betting rounds for Teen Patti, timed spin settlement for Roulette.',
        'Reused the common layer — table lifecycle, turn timers, mid-hand reconnection, bet settlement — across every title.',
        'Kept authoritative state server-side so clients could never drive the outcome of a round.'
      ],
      stack: ['Node.js', 'TypeScript', 'Socket.IO', 'Redis', 'MongoDB'],
      links: []
    },
    {
      id: 'ttt', title: 'Real-time Tic-Tac-Toe', category: 'Experiments', years: '2024',
      org: 'Personal project', img: 'assets/img/tictactoe.jpg',
      blurb: 'A low-latency two-player engine — an excuse to push FastAPI, Socket.IO and BullMQ together.',
      metric: null, metricLabel: null,
      details: [
        'Engineered a low-latency game engine on FastAPI with Socket.IO handling real-time state between the two players.',
        'Redis for data persistence and BullMQ for task scheduling — turn expiry, cleanup and match resolution.',
        'Responsive React front end with Material-UI, Lottie animations and Redux Toolkit for state.'
      ],
      stack: ['FastAPI', 'Python', 'Socket.IO', 'Redis', 'BullMQ', 'React.js', 'Redux Toolkit', 'MUI'],
      links: [{ label: 'Walkthrough on LinkedIn', url: 'https://www.linkedin.com/in/vijay-parmar-00467b2b8/' }]
    },
    {
      id: 'skillwinz', title: 'Skillwinz & Rummy Challenge', category: 'Real-time Games', years: '2021 — 2024',
      org: 'Artoon Solutions', img: null, glyph: 'SKILL–WINZ', glyphLabel: 'White-label · live',
      chips: ['TypeScript', 'Socket.IO', 'Redis', 'MongoDB'],
      blurb: 'Two further production skins of the rummy engine, each with its own branding and tournament rules.',
      metric: null, metricLabel: null,
      details: [
        'Configured and launched two additional white-label platforms on the standardized core.',
        'Validated the engine’s multi-tenant assumptions under separate live traffic and payout rules.',
        'Fed production issues from each skin back into the shared core so every platform improved at once.'
      ],
      stack: ['Node.js', 'TypeScript', 'Socket.IO', 'Redis', 'MongoDB'],
      links: []
    },
    {
      id: 'slots', title: 'Slot Booking Platform', category: 'Platforms', years: 'In development',
      org: 'Personal project', img: null, glyph: 'SLOTS', glyphLabel: 'Active development',
      chips: ['Expo RN', 'Next.js', 'PostgreSQL', 'AWS'],
      blurb: 'Cross-platform booking product: React Native app, Next.js web front end, one Node backend on AWS.',
      metric: null, metricLabel: null,
      details: [
        'Expo React Native app for iOS and Android alongside a Next.js web front end, sharing one Express / TypeScript API.',
        'GPS-based location resolution to surface the right venues and slots for where the user actually is.',
        'Notification pipeline on AWS SNS and SES, PostgreSQL for relational booking data and MongoDB for flexible venue documents.'
      ],
      stack: ['Expo React Native', 'Next.js', 'Express', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS'],
      links: []
    }
  ];

  var BY_ID = {};
  PROJECTS.forEach(function (p) { BY_ID[p.id] = p; });

  /* ------------------------------------------------------------ utils --- */

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function metaLine(p) { return p.org + '  ·  ' + p.years; }
  function chipsOf(p) { return p.chips || p.stack.slice(0, 4); }
  function idxLabel(i) { return '/' + String(i + 1).padStart(2, '0'); }

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var prefersReduced = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  /* --------------------------------------------------------- featured --- */

  function glyphPanel(p, variant) {
    var cls = variant === 'card' ? 'card__glyph' : 'glyph-panel';
    var inner =
      '<div class="glyph-panel__head">' +
        '<span class="glyph-panel__dot"></span>' +
        '<span class="glyph-panel__label">' + esc(p.glyphLabel) + '</span>' +
      '</div>' +
      '<div>' +
        '<div class="glyph-panel__rule"></div>' +
        '<div class="glyph-panel__glyph">' + esc(p.glyph) + '</div>' +
      '</div>' +
      '<div class="glyph-panel__chips">' +
        (variant === 'card' ? chipsOf(p) : p.stack).map(function (s) {
          return '<span>' + esc(s) + '</span>';
        }).join('') +
      '</div>';
    return variant === 'card'
      ? '<div class="' + cls + '">' + inner + '</div>'
      : '<div class="glyph-panel">' + inner + '</div>';
  }

  function featuredMarkup(p) {
    var media = p.img
      ? '<div class="featured__media">' +
          '<img src="' + esc(p.img) + '" alt="' + esc(p.title) + '" loading="lazy" decoding="async">' +
          '<div class="featured__scrim"></div>' +
        '</div>'
      : glyphPanel(p, 'featured');

    var metric = p.metric
      ? '<div class="featured__metric">' +
          '<b>' + esc(p.metric) + '</b><span>' + esc(p.metricLabel) + '</span>' +
        '</div>'
      : '';

    return '' +
      '<article class="featured" data-spot="1" data-project="' + esc(p.id) + '"' +
        ' role="button" tabindex="0" aria-label="Open case study: ' + esc(p.title) + '">' +
        media +
        '<div class="featured__body">' +
          '<div class="featured__tags">' +
            '<span class="pill-featured">Featured</span>' +
            '<span class="featured__cat">' + esc(p.category) + '</span>' +
          '</div>' +
          '<h3 class="featured__title">' + esc(p.title) + '</h3>' +
          '<p class="featured__blurb">' + esc(p.blurb) + '</p>' +
          metric +
          '<div class="featured__foot">' +
            '<span class="featured__meta">' + esc(metaLine(p)) + '</span>' +
            '<span class="featured__more">Read case →</span>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  /* ----------------------------------------------------------- filter --- */

  var featuredSlot = $('#featured-slot');
  var grid = $('#project-grid');
  var emptyNote = $('#work-empty');
  var currentFilter = 'All';

  function applyFilter(next) {
    if (next === currentFilter) return;
    currentFilter = next;

    $$('.filter').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.filter === next));
    });

    var shown = PROJECTS.filter(function (p) {
      return next === 'All' || p.category === next;
    });

    featuredSlot.innerHTML = shown.length ? featuredMarkup(shown[0]) : '';

    var rest = shown.slice(1);
    var order = {};
    rest.forEach(function (p, i) { order[p.id] = idxLabel(i + 1); });

    $$('.card', grid).forEach(function (card) {
      var id = card.dataset.project;
      var visible = Object.prototype.hasOwnProperty.call(order, id);
      card.hidden = !visible;
      if (visible) {
        card.style.order = String(rest.findIndex(function (p) { return p.id === id; }));
        var idx = $('.card__idx', card);
        if (idx) idx.textContent = order[id];
      }
    });

    if (emptyNote) emptyNote.hidden = shown.length !== 0;
    revealScan();
  }

  $$('.filter').forEach(function (btn) {
    btn.addEventListener('click', function () { applyFilter(btn.dataset.filter); });
  });

  /* ----------------------------------------------------------- drawer --- */

  var drawer = $('#drawer');
  var drawerPanel = $('#drawer-panel');
  var lastFocus = null;

  function drawerMarkup(p) {
    var media = p.img
      ? '<div class="drawer__media">' +
          '<img src="' + esc(p.img) + '" alt="' + esc(p.title) + '" decoding="async">' +
        '</div>'
      : '';

    var metric = p.metric
      ? '<div class="drawer__metric">' +
          '<b>' + esc(p.metric) + '</b><span>' + esc(p.metricLabel) + '</span>' +
        '</div>'
      : '';

    var links = (p.links && p.links.length)
      ? '<div class="drawer__links">' +
          p.links.map(function (l) {
            return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' +
              '<span>' + esc(l.label) + '</span><span>Visit ↗</span></a>';
          }).join('') +
        '</div>'
      : '';

    return '' +
      '<div class="drawer__bar">' +
        '<span class="drawer__cat">' + esc(p.category) + '</span>' +
        '<button type="button" class="drawer__close" id="drawer-close" aria-label="Close case study">×</button>' +
      '</div>' +
      media +
      '<div class="drawer__body">' +
        '<h2 class="drawer__title" id="drawer-title">' + esc(p.title) + '</h2>' +
        '<div class="drawer__meta">' + esc(metaLine(p)) + '</div>' +
        metric +
        '<ul class="bullets">' +
          p.details.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') +
        '</ul>' +
        '<div class="drawer__label">Stack</div>' +
        '<div class="drawer__stack">' +
          p.stack.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') +
        '</div>' +
        links +
      '</div>';
  }

  function openProject(id, source) {
    var p = BY_ID[id];
    if (!p) return;
    lastFocus = source || document.activeElement;
    drawerPanel.innerHTML = drawerMarkup(p);
    drawerPanel.scrollTop = 0;
    drawer.hidden = false;
    document.body.style.overflow = 'hidden';
    var close = $('#drawer-close');
    if (close) close.focus();
  }

  function closeProject() {
    if (drawer.hidden) return;
    drawer.hidden = true;
    drawerPanel.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.isConnected) lastFocus.focus();
    lastFocus = null;
  }

  document.addEventListener('click', function (ev) {
    var close = ev.target.closest('#drawer-close');
    if (close) { closeProject(); return; }

    if (ev.target === drawer) { closeProject(); return; }

    var card = ev.target.closest('[data-project]');
    if (card && !drawer.contains(card)) openProject(card.dataset.project, card);
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { closeProject(); return; }

    if (ev.key !== 'Enter' && ev.key !== ' ' && ev.key !== 'Spacebar') return;
    var card = ev.target.closest ? ev.target.closest('[data-project][role="button"]') : null;
    if (!card) return;
    ev.preventDefault();
    openProject(card.dataset.project, card);
  });

  /* keep tab focus inside the open drawer */
  drawer.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Tab') return;
    var focusables = $$('a[href], button, [tabindex]:not([tabindex="-1"])', drawerPanel)
      .filter(function (el) { return el.offsetParent !== null; });
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
  });

  /* ----------------------------------------------------------- reveal --- */

  var revealObs = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-revealed');
          revealObs.unobserve(e.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    : null;

  function revealScan() {
    if (!revealObs) {
      $$('[data-reveal]').forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }
    $$('[data-reveal]').forEach(function (el) {
      if (el.dataset.revealBound) return;
      el.dataset.revealBound = '1';
      revealObs.observe(el);
    });
  }
  revealScan();

  /* -------------------------------------------------- section + rail ---- */

  var railLinks = $$('.rail a');
  var SECTIONS = ['top', 'work', 'experience', 'capabilities', 'stack', 'contact'];

  if ('IntersectionObserver' in window && railLinks.length) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        railLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + e.target.id;
          a.classList.toggle('is-active', on);
          if (on) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    SECTIONS.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) sectionObs.observe(el);
    });
  }

  /* -------------------------------------------------- mobile navigation --- */

  var menuToggle = $('#menu-toggle');
  var siteNav = $('#primary-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = siteNav.classList.contains('is-open');
      siteNav.classList.toggle('is-open', !isOpen);
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', function (e) {
      if (siteNav.classList.contains('is-open') && !siteNav.contains(e.target) && !menuToggle.contains(e.target)) {
        siteNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    $$('a', siteNav).forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------- scroll progress -- */

  var bar = $('#progress');
  if (bar) {
    var progressTicking = false;
    var updateProgress = function () {
      progressTicking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    };
    var onScroll = function () {
      if (!progressTicking) {
        progressTicking = true;
        requestAnimationFrame(updateProgress);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateProgress();
  }

  /* ------------------------------------------------ tilt + spotlight ---- */

  var finePointer = window.matchMedia
    ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
    : true;

  if (finePointer && !prefersReduced) {
    var tilt = $('[data-tilt]');
    var mouseX = 0;
    var mouseY = 0;
    var rafPending = false;
    var currentSpotCard = null;
    var activeSpotCard = null;

    var updatePointerEffects = function () {
      rafPending = false;

      if (tilt) {
        var t = tilt.getBoundingClientRect();
        var cx = t.left + t.width / 2;
        var cy = t.top + t.height / 2;
        var near = Math.abs(mouseX - cx) < t.width * 1.9 &&
                   Math.abs(mouseY - cy) < t.height * 1.4;
        if (near) {
          var ry = ((mouseX - cx) / t.width) * 7;
          var rx = ((cy - mouseY) / t.height) * 7;
          tilt.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateZ(0)';
        } else {
          tilt.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
        }
      }

      if (activeSpotCard && activeSpotCard !== currentSpotCard) {
        activeSpotCard.style.backgroundImage = '';
      }
      activeSpotCard = currentSpotCard;

      if (currentSpotCard) {
        var r = currentSpotCard.getBoundingClientRect();
        currentSpotCard.style.backgroundImage = 'radial-gradient(420px circle at ' +
          (mouseX - r.left).toFixed(1) + 'px ' + (mouseY - r.top).toFixed(1) + 'px, var(--accent-soft), transparent 62%)';
      }
    };

    document.addEventListener('mousemove', function (ev) {
      mouseX = ev.clientX;
      mouseY = ev.clientY;
      currentSpotCard = ev.target.closest ? ev.target.closest('[data-spot="1"]') : null;
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(updatePointerEffects);
      }
    }, { passive: true });
  }
})();
