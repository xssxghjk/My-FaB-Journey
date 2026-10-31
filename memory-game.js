/*
 * memory-game.js — shared Memory game engine.
 *
 * Flow: memorize the cards → timer starts → the recall test unlocks when the
 * timer ends → recall → result. With two players the cards alternate between
 * them while memorizing; each player then recalls their own cards in turn.
 * The active session is kept in localStorage, so it survives closing or
 * reloading the page. While a session exists, a bar at the top of every page
 * that loads this script links back to it.
 *
 * Pages call MemoryGame.mount(root, { label, returnUrl, build, setupRender })
 * and supply the setup form (setupRender) and the card list (build).
 */
(function () {
  'use strict';
  if (window.MemoryGame) return;

  var BASE = (document.currentScript && document.currentScript.src || '').replace(/[^\/]*$/, '');
  var SESSION_KEY   = 'fab_memory_session_v1';
  var DELAY_KEY     = 'fab_memory_delay_v1';
  var DEFAULT_DELAY = 30;     // minutes
  var MAX_DELAY     = 1440;   // minutes
  var BASE_TITLE    = document.title;

  /* ── Storage ─────────────────────────────────────────────────────── */

  function loadSession() {
    try {
      var s = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (!s || !s.phase || !Array.isArray(s.sequence) || !s.sequence.length) return null;
      // Sessions saved by earlier versions: one player, recall counted in sequence order.
      s.players = s.players === 2 ? 2 : 1;
      if (typeof s.recallStep !== 'number') s.recallStep = s.recallIndex || 0;
      if (typeof s.ackStep !== 'number') s.ackStep = -1;
      if (!Array.isArray(s.recallAnswers)) s.recallAnswers = [];
      return s;
    } catch (e) { return null; }
  }
  function saveSession() {
    if (!session) return;
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) { /* storage blocked or full */ }
  }
  function clearSession() {
    session = null;
    try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
  }
  function validDelay(d) { return Number.isInteger(d) && d >= 1 && d <= MAX_DELAY; }
  function loadDelay() {
    var v = NaN;
    try { v = parseInt(localStorage.getItem(DELAY_KEY), 10); } catch (e) { /* ignore */ }
    return validDelay(v) ? v : DEFAULT_DELAY;
  }
  function saveDelay(d) {
    try { localStorage.setItem(DELAY_KEY, String(d)); } catch (e) { /* ignore */ }
  }

  /* ── Helpers ─────────────────────────────────────────────────────── */

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function isDue() { return !!session && Date.now() >= session.dueAt; }
  function formatTime(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000));
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    var pad = function (v) { return String(v).padStart(2, '0'); };
    return (h ? h + ':' + pad(m) : String(m)) + ':' + pad(sec);
  }
  function sample(items, n) {
    var a = items.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a.slice(0, Math.min(n, a.length));
  }
  function sessionLabel(s) {
    return (s.label || 'Memory test') + (s.players > 1 ? ' · 2 players' : '');
  }
  function sessionReturnUrl(s) { return s.returnUrl || BASE + 'memory-game/'; }

  // With two players, card i belongs to player i % 2. Each player recalls
  // their own cards in order: all of player 1's first, then player 2's.
  function ownerOf(i, players) { return i % players; }
  function recallOrderFor(n, players) {
    var order = [];
    for (var p = 0; p < players; p++) {
      for (var i = 0; i < n; i++) if (ownerOf(i, players) === p) order.push(i);
    }
    return order;
  }
  function isGroupStart(order, players, step) {
    return step > 0 && step < order.length &&
      ownerOf(order[step], players) !== ownerOf(order[step - 1], players);
  }

  /* ── State ───────────────────────────────────────────────────────── */

  var session = loadSession();
  var config = null;   // { root, label(), returnUrl(), build(n, opts), setupRender(el, api) }
  var state = {
    screen: 'setup',
    sequence: [], pool: [],
    memorizeIndex: 0,
    players: 1,
    recallOrder: [], recallStep: 0, recallAnswers: [], recallLocked: false,
    cardCount: 10,
    delayMinutes: loadDelay(),
    buildOpts: null,
  };

  /* ── Screens ─────────────────────────────────────────────────────── */

  function ensureShell() {
    if (document.getElementById('mem-screen-setup')) return;
    config.root.innerHTML = `
      <div id="mem-screen-setup"    class="mem-screen"></div>
      <div id="mem-screen-wait"     class="mem-screen"></div>
      <div id="mem-screen-memorize" class="mem-screen"></div>
      <div id="mem-screen-handover" class="mem-screen"></div>
      <div id="mem-screen-recall"   class="mem-screen"></div>
      <div id="mem-screen-result"   class="mem-screen"></div>`;
  }

  function showScreen(name) {
    document.querySelectorAll('.mem-screen').forEach(function (el) { el.classList.remove('active'); });
    var el = document.getElementById('mem-screen-' + name);
    if (el) { el.classList.add('active'); state.screen = name; }
  }

  // Picks the screen that matches the saved session, or the setup form.
  function route() {
    if (!config) return;
    ensureShell();
    if (state.screen === 'memorize' || state.screen === 'result') return;
    if (session) {
      if (session.phase === 'recall') resumeRecall(); else renderWait();
    } else {
      showSetup();
    }
  }

  function showSetup() {
    ensureShell();
    var el = document.getElementById('mem-screen-setup');
    el.innerHTML = '';
    config.setupRender(el, api);
    showScreen('setup');
  }

  function start(count, buildOpts, delayMinutes, players) {
    var built = config.build(count, buildOpts);
    if (!built || !built.sequence.length) {
      alert('No cards available for this selection.');
      return;
    }
    state.cardCount    = count;
    state.buildOpts    = buildOpts || null;
    state.players      = players === 2 ? 2 : 1;
    state.delayMinutes = validDelay(delayMinutes) ? delayMinutes : state.delayMinutes;
    saveDelay(state.delayMinutes);
    state.pool          = built.pool;
    state.sequence      = built.sequence;
    state.memorizeIndex = 0;
    showScreen('memorize');
    renderMemorize();
  }

  /* ── Memorize ────────────────────────────────────────────────────── */

  function renderMemorize() {
    var el = document.getElementById('mem-screen-memorize');
    el.innerHTML = `
      <div class="mem-progress" id="mem-progress"></div>
      <div class="mem-memorize-wrap" id="mem-wrap">
        <div class="mem-card-anim" id="mem-card-anim"></div>
        <p class="mem-hint">Tap / click to advance</p>
      </div>`;
    showCard(0);
    document.getElementById('mem-wrap').addEventListener('click', function () {
      var next = state.memorizeIndex + 1;
      if (next < state.sequence.length) {
        state.memorizeIndex = next;
        showCard(next);
      } else {
        showMemorizeDone();
      }
    });
  }

  function showCard(index) {
    var card  = state.sequence[index];
    var total = state.sequence.length;
    var prog  = document.getElementById('mem-progress');
    if (prog) {
      var who = state.players > 1 ? 'Player ' + (ownerOf(index, state.players) + 1) + ' · ' : '';
      prog.textContent = who + 'Card ' + (index + 1) + ' / ' + total;
    }
    var animEl = document.getElementById('mem-card-anim');
    if (!animEl) return;
    var fresh = animEl.cloneNode(false);
    if (card.imgUrl) {
      var img = document.createElement('img');
      img.className = 'mem-card-img';
      img.src = card.imgUrl;
      img.alt = card.name;
      fresh.appendChild(img);
    }
    var nameEl = document.createElement('div');
    nameEl.className = 'mem-card-name';
    nameEl.textContent = card.name;
    fresh.appendChild(nameEl);
    animEl.replaceWith(fresh);
  }

  function showMemorizeDone() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(28,24,20,0.94);display:flex;align-items:center;justify-content:center;font-family:\'Cormorant Garamond\',Georgia,serif;font-style:italic;font-size:2.2rem;font-weight:900;color:var(--accent);';
    overlay.textContent = 'Memorization complete…';
    document.body.appendChild(overlay);
    setTimeout(function () {
      overlay.remove();
      beginWait();
    }, 1000);
  }

  /* ── Timed wait ──────────────────────────────────────────────────── */

  function beginWait() {
    session = {
      label:        config.label(),
      returnUrl:    config.returnUrl(),
      buildOpts:    state.buildOpts,
      cardCount:    state.cardCount,
      delayMinutes: state.delayMinutes,
      players:      state.players,
      sequence:     state.sequence,
      pool:         state.pool,
      phase:        'waiting',
      dueAt:        Date.now() + state.delayMinutes * 60000,
      recallStep:   0,
      ackStep:      -1,
      recallAnswers: [],
    };
    saveSession();
    renderWait();
  }

  function renderWait() {
    ensureShell();
    if (!session) { showSetup(); return; }
    var s = session, due = isDue();
    document.getElementById('mem-screen-wait').innerHTML = `
      <div class="mem-setup-card" data-state="${due ? 'due' : 'waiting'}">
        <div class="mem-setup-title">Memory Test</div>
        <div class="mem-session-set">${esc(sessionLabel(s))} · ${s.sequence.length} cards</div>
        <div class="mem-session-msg">${due ? 'Your test is ready.' : 'Memorization done. Your test unlocks in'}</div>
        <div class="mem-countdown" id="mem-wait-count">${due ? 'Now' : formatTime(s.dueAt - Date.now())}</div>
        <p class="mem-hint">${due ? 'Begin when you are ready.' : 'You can close this page. The test will be waiting when you come back.'}</p>
        <button class="mem-btn-start" id="mem-btn-begin" type="button" ${due ? '' : 'disabled'}>Begin test</button>
        <button class="mem-btn-result secondary mem-btn-abandon" id="mem-btn-abandon" type="button">Abandon session</button>
      </div>`;
    showScreen('wait');
    document.getElementById('mem-btn-begin').addEventListener('click', function () {
      if (isDue()) beginRecall();
    });
    document.getElementById('mem-btn-abandon').addEventListener('click', function () {
      if (!confirm('Abandon this memory test? Your progress will be lost.')) return;
      clearSession();
      updateBanner();
      showSetup();
    });
    updateBanner();
  }

  /* ── Recall ──────────────────────────────────────────────────────── */

  function loadRecallState(s) {
    state.sequence      = s.sequence;
    state.pool          = s.pool;
    state.players       = s.players;
    state.cardCount     = s.cardCount;
    state.buildOpts     = s.buildOpts || null;
    state.delayMinutes  = s.delayMinutes;
    state.recallOrder   = recallOrderFor(s.sequence.length, s.players);
    state.recallStep    = s.recallStep;
    state.recallAnswers = s.recallAnswers;
    state.recallLocked  = false;
  }

  function beginRecall() {
    session.phase         = 'recall';
    session.recallStep    = 0;
    session.ackStep       = -1;
    session.recallAnswers = new Array(session.sequence.length).fill(null);
    saveSession();
    loadRecallState(session);
    showRecallStep();
  }

  // Restores an in-progress recall, including the slots already answered.
  function resumeRecall() {
    loadRecallState(session);
    showRecallStep();
  }

  function persistRecall() {
    if (!session) return;
    session.recallStep    = state.recallStep;
    session.recallAnswers = state.recallAnswers;
    saveSession();
    updateBanner();
  }

  // Shows the recall screen for the current step, the handover between players, or the result.
  function showRecallStep() {
    var n = state.sequence.length;
    if (state.recallStep >= n) { showResult(); return; }
    if (isGroupStart(state.recallOrder, state.players, state.recallStep) && session.ackStep !== state.recallStep) {
      renderHandover();
      return;
    }
    showScreen('recall');
    renderRecall();
    updateBanner();
  }

  function renderHandover() {
    var step = state.recallStep;
    var next = ownerOf(state.recallOrder[step], state.players);
    var prev = next - 1;
    var answers = state.recallAnswers, score = 0, total = 0;
    state.recallOrder.forEach(function (pos) {
      if (ownerOf(pos, state.players) !== prev) return;
      total++;
      if (answers[pos] && answers[pos].correct) score++;
    });
    document.getElementById('mem-screen-handover').innerHTML = `
      <div class="mem-setup-card">
        <div class="mem-setup-title">Player ${prev + 1} finished</div>
        <div class="mem-session-msg">Score: ${score} / ${total}</div>
        <p class="mem-hint">Pass the device to Player ${next + 1}.</p>
        <button class="mem-btn-start" id="mem-btn-handover" type="button">Player ${next + 1}: recall my cards</button>
      </div>`;
    showScreen('handover');
    document.getElementById('mem-btn-handover').addEventListener('click', function () {
      session.ackStep = step;
      saveSession();
      showRecallStep();
    });
  }

  function renderRecall() {
    var n     = state.sequence.length;
    var el    = document.getElementById('mem-screen-recall');
    var players = state.players;

    var slotsHtml = '';
    for (var p = 0; p < players; p++) {
      var positions = [];
      for (var i = 0; i < n; i++) if (ownerOf(i, players) === p) positions.push(i);
      if (players > 1) slotsHtml += '<div class="mem-pool-label">Player ' + (p + 1) + '</div>';
      slotsHtml += '<div class="mem-slots-wrap"><div class="mem-slots">';
      positions.forEach(function (pos, k) {
        slotsHtml += '<div class="mem-slot" id="mem-slot-' + pos + '">' + (k + 1) + '</div>';
      });
      slotsHtml += '</div></div>';
    }

    var poolHtml = '<div class="mem-pool-label">Pick the cards in order</div><div class="mem-pool" id="mem-pool">';
    state.pool.forEach(function (card) {
      var en = esc(card.name);
      var imgTag = card.imgUrl ? '<img src="' + card.imgUrl + '" alt="' + en + '" />' : '';
      poolHtml += '<div class="mem-pool-card" data-card-id="' + esc(card.id) + '">' + imgTag + '<div class="mem-pool-card-name">' + en + '</div></div>';
    });
    poolHtml += '</div>';

    el.innerHTML = slotsHtml + poolHtml;

    // Answered slots keep their result; the current slot is highlighted.
    state.recallAnswers.forEach(function (ans, pos) { if (ans) fillSlot(pos, ans.card, ans.correct); });
    updateActiveSlot();

    document.getElementById('mem-pool').addEventListener('click', function (e) {
      var cardEl = e.target.closest('.mem-pool-card');
      if (!cardEl || state.recallLocked) return;
      handlePick(cardEl.dataset.cardId, cardEl);
    });
  }

  function handlePick(pickedId, pickedEl) {
    if (state.recallLocked || state.recallStep >= state.sequence.length) return;
    var pos     = state.recallOrder[state.recallStep];
    var correct = state.sequence[pos];
    var isRight = pickedId === correct.id;

    state.recallAnswers[pos] = { card: correct, correct: isRight };
    state.recallLocked = true;

    if (isRight) {
      pickedEl.style.animation   = 'correctPulse 0.5s ease both';
      pickedEl.style.borderColor = '#4ade80';
      fillSlot(pos, correct, true);
      setTimeout(function () {
        pickedEl.style.animation = ''; pickedEl.style.borderColor = '';
        advanceRecall();
      }, 500);
    } else {
      pickedEl.style.animation   = 'incorrectShake 0.4s ease both';
      pickedEl.style.borderColor = '#e05040';
      var correctEl = document.querySelector('[data-card-id="' + correct.id.replace(/"/g, '\\"') + '"]');
      if (correctEl) { correctEl.style.animation = 'correctPulse 0.55s ease 0.1s both'; correctEl.style.borderColor = '#4ade80'; }
      fillSlot(pos, correct, false);
      setTimeout(function () {
        pickedEl.style.animation = ''; pickedEl.style.borderColor = '';
        if (correctEl) { correctEl.style.animation = ''; correctEl.style.borderColor = ''; }
        advanceRecall();
      }, 800);
    }
  }

  function advanceRecall() {
    state.recallLocked = false;
    state.recallStep++;
    persistRecall();
    showRecallStep();
  }

  function fillSlot(pos, card, isCorrect) {
    var slot = document.getElementById('mem-slot-' + pos);
    if (!slot) return;
    slot.classList.remove('active');
    var imgTag = card.imgUrl ? '<img src="' + card.imgUrl + '" alt="' + esc(card.name) + '" />' : '';
    slot.innerHTML = imgTag + '<div class="mem-slot-badge ' + (isCorrect ? 'correct' : 'incorrect') + '">' + (isCorrect ? '✓' : '✗') + '</div>';
  }

  function updateActiveSlot() {
    document.querySelectorAll('#mem-screen-recall .mem-slot.active').forEach(function (el) { el.classList.remove('active'); });
    if (state.recallStep >= state.sequence.length) return;
    var slot = document.getElementById('mem-slot-' + state.recallOrder[state.recallStep]);
    if (slot) slot.classList.add('active');
  }

  /* ── Result ──────────────────────────────────────────────────────── */

  function showResult() {
    clearSession();
    updateBanner();
    showScreen('result');
    var answers = state.recallAnswers;
    var n       = answers.length;
    var players = state.players;
    var el      = document.getElementById('mem-screen-result');

    var scores = [], totals = [];
    for (var p = 0; p < players; p++) { scores.push(0); totals.push(0); }
    for (var i = 0; i < n; i++) {
      var o = ownerOf(i, players);
      totals[o]++;
      if (answers[i] && answers[i].correct) scores[o]++;
    }
    var scoreHtml = players === 1
      ? `<div class="mem-score-block">
          <div class="mem-score-label">Your Score</div>
          <div class="mem-score-value">
            <span class="mem-score-num">${scores[0]}</span><span class="mem-score-denom"> / ${totals[0]}</span>
          </div>
        </div>`
      : `<div class="mem-score-block">
          <div class="mem-score-players">${scores.map(function (sc, k) {
            return `<div class="mem-score-player">
              <div class="mem-score-label">Player ${k + 1}</div>
              <div class="mem-score-value"><span class="mem-score-num">${sc}</span><span class="mem-score-denom"> / ${totals[k]}</span></div>
            </div>`;
          }).join('')}</div>
        </div>`;

    var html = `<div class="mem-result-wrap">
      ${scoreHtml}
      <div class="mem-result-actions">
        <button class="mem-btn-result primary" id="mem-btn-again">Play again</button>
        <button class="mem-btn-result secondary" id="mem-btn-back-setup">Change settings</button>
      </div>
      <div class="mem-replay-label">Sequence Replay</div>
      <div class="mem-replay-grid">`;

    for (var j = 0; j < n; j++) {
      var ans  = answers[j];
      var card = ans ? ans.card : null;
      var isOk = ans && ans.correct;
      html += '<div class="mem-replay-card ' + (isOk ? 'correct' : 'incorrect') + '">';
      if (card && card.imgUrl) {
        html += '<img src="' + card.imgUrl + '" alt="' + esc(card.name) + '" />';
      } else {
        html += '<div class="mem-no-image">' + (card ? esc(card.name) : '?') + '</div>';
      }
      var num = players > 1 ? (j + 1) + ' · P' + (ownerOf(j, players) + 1) : String(j + 1);
      html += '<div class="mem-replay-num">' + num + '</div>'
        + '<div class="mem-replay-overlay"></div>'
        + '<div class="mem-replay-badge">' + (isOk ? '✓' : '✗') + '</div>'
        + '</div>';
    }
    html += '</div></div>';
    el.innerHTML = html;

    document.getElementById('mem-btn-again').addEventListener('click', function () {
      start(state.cardCount, state.buildOpts, state.delayMinutes, state.players);
    });
    document.getElementById('mem-btn-back-setup').addEventListener('click', function () {
      showSetup();
    });

    var total = scores.reduce(function (a, b) { return a + b; }, 0);
    if (total > 0) {
      var colors = ['#c4864a', '#e8dfd0', '#4ade80', '#60a5fa', '#fb7185'];
      for (var k = 0; k < 40; k++) {
        var c = document.createElement('div');
        c.style.cssText = 'position:fixed;top:-10px;z-index:999;pointer-events:none;'
          + 'left:' + (Math.random() * 100) + 'vw;'
          + 'width:' + (6 + Math.random() * 8) + 'px;height:' + (6 + Math.random() * 8) + 'px;'
          + 'background:' + colors[Math.floor(Math.random() * colors.length)] + ';'
          + 'border-radius:' + (Math.random() > 0.5 ? '50%' : '3px') + ';'
          + 'animation:confettiFall ' + (1.5 + Math.random() * 2) + 's ease-in ' + (Math.random() * 0.8) + 's forwards';
        document.body.appendChild(c);
        c.addEventListener('animationend', function (ev) { ev.target.remove(); });
      }
    }
  }

  /* ── Notification bar (every page that loads this script) ────────── */

  function updateBanner() {
    document.title = (isDue() ? '● ' : '') + BASE_TITLE;
    var b = document.getElementById('mem-session-banner');
    if (!b) return;
    var s = session;
    if (!s) { b.hidden = true; return; }
    var text, cta, extra = '';
    if (s.phase === 'recall') {
      text = 'Memory test in progress · ' + s.recallStep + ' / ' + s.sequence.length + ' · ' + sessionLabel(s);
      cta = 'Resume';
    } else if (isDue()) {
      text = 'Memory test ready · ' + sessionLabel(s);
      cta = 'Begin';
      extra = ' ready';
    } else {
      text = 'Memory test in ' + formatTime(s.dueAt - Date.now()) + ' · ' + sessionLabel(s);
      cta = 'View';
    }
    b.className = 'mem-banner' + extra;
    b.innerHTML = '<span class="mem-banner-text">' + esc(text) + '</span><span class="mem-banner-cta">' + cta + ' →</span>';
    b.hidden = false;
  }

  function buildBanner() {
    if (document.getElementById('mem-session-banner')) return;
    var b = document.createElement('div');
    b.id = 'mem-session-banner';
    b.hidden = true;
    b.setAttribute('role', 'status');
    b.addEventListener('click', function () {
      if (session) location.href = sessionReturnUrl(session);
    });
    document.body.appendChild(b);
  }

  function injectStyles() {
    if (document.querySelector('link[data-mem-styles]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE + 'memory-game.css';
    link.setAttribute('data-mem-styles', '');
    document.head.appendChild(link);
  }

  // Refreshes the countdown and unlocks the wait screen when the time is up.
  function tick() {
    updateBanner();
    if (!session || session.phase !== 'waiting' || state.screen !== 'wait' || !config) return;
    var card = document.querySelector('#mem-screen-wait .mem-setup-card');
    if (!card) return;
    if (isDue()) {
      if (card.dataset.state !== 'due') renderWait();
    } else {
      var c = document.getElementById('mem-wait-count');
      if (c) c.textContent = formatTime(session.dueAt - Date.now());
    }
  }

  /* ── Public API ──────────────────────────────────────────────────── */

  var api = {
    get defaultDelay() { return state.delayMinutes; },
    start: start,
    saveDelay: saveDelay,
  };

  window.MemoryGame = {
    baseUrl: BASE,
    esc: esc,
    sample: sample,
    validDelay: validDelay,
    maxDelay: MAX_DELAY,
    // Mounts the game into `root`. `build(count, opts)` must return { sequence, pool }.
    // setupRender(el, api) builds the form; api.start(count, opts, delayMinutes, players).
    mount: function (root, opts) {
      config = {
        root: root,
        label: opts.label,
        returnUrl: opts.returnUrl,
        build: opts.build,
        setupRender: opts.setupRender,
      };
      root.innerHTML = '';
      route();
    },
    // Re-checks the session and re-renders the setup form (e.g. after data loads).
    refresh: route,
    session: function () { return session; },
  };

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    injectStyles();
    buildBanner();
    setInterval(tick, 1000);
    window.addEventListener('storage', function (e) {
      if (e.key !== SESSION_KEY) return;
      session = loadSession();
      updateBanner();
      if (state.screen === 'setup' || state.screen === 'wait') route();
    });
    updateBanner();
  });
})();
