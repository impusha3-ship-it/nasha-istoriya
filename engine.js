// ===== Движок: главы → шаги (walk / say / phone) =====
(() => {
  const $ = id => document.getElementById(id);
  const cv = $('cv'), ctx = cv.getContext('2d');
  const H = 144, GY = 118;
  let W = 256;
  const SAVE = 'nasha-istoriya-v1';
  const S = { mode: 'menu', ch: 0, st: 0, t: 0, fade: 1, step: null, keys: { l: false, r: false }, actReq: false, parts: [] };
  let save = { ch: 0, max: 0 };
  try { save = Object.assign(save, JSON.parse(localStorage.getItem(SAVE) || '{}')); } catch (e) {}
  const persist = () => { try { localStorage.setItem(SAVE, JSON.stringify(save)); } catch (e) {} };

  // ---------- звук ----------
  let ac = null, muted = false;
  function blip(f = 520, d = 0.03, v = 0.03, type = 'square') {
    if (muted) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = type; o.frequency.value = f; g.gain.value = v; g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + d);
      o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + d);
    } catch (e) {}
  }
  const chime = () => { [660, 880, 1320].forEach((f, i) => setTimeout(() => blip(f, 0.12, 0.04, 'triangle'), i * 90)); };

  // ---------- музыка: тихая петля из арпеджио ----------
  const SONG = [[262, 330, 392, 494], [220, 262, 330, 392], [175, 220, 262, 330], [196, 247, 294, 392]];
  let mStep = 0, mTimer = null;
  // записанные дорожки: шаг с полем music играет файл audio/<имя>.m4a; на экране телефона музыка не меняется
  const TR = { name: null, els: {}, fades: {} };
  function setTrack(name) {
    name = name || null;
    const cur = TR.name && TR.els[TR.name];
    if (name === TR.name) { if (cur && !cur.ended) { cur.muted = muted; if (!muted && cur.paused) cur.play().catch(() => {}); } return; }
    if (cur) { const o = cur, k = TR.name; clearInterval(TR.fades[k]); TR.fades[k] = setInterval(() => { o.volume = Math.max(0, o.volume - 0.06); if (o.volume <= 0.01) { o.pause(); clearInterval(TR.fades[k]); } }, 60); }   // пауза с сохранением места
    TR.name = null;
    if (!name) return;
    let a = TR.els[name];
    if (!a) { a = TR.els[name] = new Audio('audio/' + (name.includes('.') ? name : name + '.m4a')); a.loop = false; a.addEventListener('ended', () => { a.done = true; if (TR.name === name) TR.name = null; }); }
    if (a.done) return;                          // трек уже доиграл — дальше обычная фоновая музыка
    clearInterval(TR.fades[name]); a.volume = 0; a.muted = muted; TR.name = name; a.play().catch(() => {});
    let n = 0; TR.fades[name] = setInterval(() => { if (TR.name !== name) return clearInterval(TR.fades[name]); n++; const k = Math.min(1, n / 140); a.volume = 0.5 * k * k * (3 - 2 * k); if (k >= 1) clearInterval(TR.fades[name]); }, 50);   // с нуля до обычной громкости плавно, ~7 секунд
  }
  // пока играет видео со своим звуком, дорожка тише
  let ducked = false;   // громкость трогаем, только когда видео реально включается/выключается, иначе рвётся плавный подъём
  function duck(on) { const a = TR.name && TR.els[TR.name]; if (!a) return; if (on) { ducked = true; a.volume = 0.08; } else if (ducked) { ducked = false; a.volume = 0.5; } }
  function musicTick() {
    if (muted || !ac || document.hidden || TR.name) return;
    const bar = SONG[Math.floor(mStep / 8) % SONG.length], i = mStep % 8;
    const pat = [0, 1, 2, 3, 2, 1, 2, 3];
    const tn = (f, d, v, type) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0.0001, ac.currentTime); g.gain.linearRampToValueAtTime(v, ac.currentTime + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + d); o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + d + 0.02); };
    tn(bar[pat[i]] * (S.mode === 'phone' ? 2 : 1), 0.5, 0.022, 'triangle');
    if (i === 0) tn(bar[0] / 2, 1.6, 0.03, 'sine');
    if (i === 4 && Math.floor(mStep / 8) % 2) tn(bar[3] * 2, 0.9, 0.012, 'sine');
    mStep++;
  }
  function startMusic() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); } catch (e) {} if (!mTimer) mTimer = setInterval(musicTick, 300); }
  addEventListener('pointerdown', startMusic, { once: true }); addEventListener('keydown', startMusic, { once: true });

  // ---------- размер ----------
  function resize() {
    const b = $('stage').getBoundingClientRect();
    if (!b.height) return;
    W = Math.max(150, Math.min(340, Math.round(H * b.width / b.height)));
    cv.width = W * 2; cv.height = H * 2; ctx.imageSmoothingEnabled = false;   // внутреннее разрешение ×2 (сетка 0.5)
  }
  addEventListener('resize', resize); addEventListener('orientationchange', () => setTimeout(resize, 200));

  // ---------- наряды ----------
  const outfit = (who, name) => {
    const base = (OUTFITS[who] && OUTFITS[who].base) || {};
    const o = (OUTFITS[who] && OUTFITS[who][name || 'base']) || {};
    return Object.assign({}, base, o);
  };
  const NAMES = { d: 'Дима', o: 'Оля', n: '' };

  // ---------- диалог ----------
  const D = { q: [], i: 0, shown: 0, full: '', cb: null, active: false };
  function say(lines, cb) {
    if (!lines || !lines.length) { cb && cb(); return; }
    D.q = lines; D.i = 0; D.cb = cb; D.active = true; S.prevMode = S.mode === 'dialog' ? S.prevMode : S.mode; S.mode = 'dialog';
    $('dlg').classList.remove('hidden'); $('pad').classList.add('hidden'); showLine();
  }
  function showLine() {
    const ln = D.q[D.i]; const who = ln[0], text = ln[1], o = ln[2] || {};
    D.full = text; D.shown = 0; D.who = who;
    const nm = $('dlgName'), fc = $('dlgFace');
    nm.className = who === 'd' ? 'd' : who === 'o' ? 'o' : '';
    nm.textContent = NAMES[who] !== undefined ? NAMES[who] : who;
    const cast = (S.step && S.step.cast) || {};
    if (who === 'd' || who === 'o') { fc.classList.remove('none'); A.face(fc, outfit(who, o.outfit || (cast[who] && cast[who].outfit))); }
    else if (o.face) { fc.classList.remove('none'); A.face(fc, o.face); }
    else fc.classList.add('none');
    $('dlgText').style.fontStyle = who === 'n' ? 'italic' : 'normal';
    $('dlgText').textContent = '';
    const ph = $('photo'), vd = ph.querySelector('video');
    if (o.video) {   // видео в рамке-полароиде, играет, пока открыта реплика
      ph.querySelector('img').classList.add('hidden'); vd.classList.remove('hidden'); if (vd.getAttribute('src') !== o.video) vd.src = o.video;
      vd.muted = muted; duck(true); vd.currentTime = 0; vd.play().catch(() => { vd.muted = true; vd.play().catch(() => {}); });
      ph.querySelector('span').textContent = o.cap || ''; ph.classList.remove('rot'); ph.classList.add('vid'); ph.classList.remove('hidden');
    } else { vd.pause(); duck(false); vd.classList.add('hidden'); ph.querySelector('img').classList.remove('hidden'); ph.classList.remove('vid'); }
    if (o.video) { /* уже показано */ } else if (o.img) { { const im = ph.querySelector('img'); im.src = o.img; im.style.aspectRatio = o.crop ? o.crop[0] : ''; im.style.objectFit = o.crop ? 'cover' : ''; im.style.objectPosition = o.crop ? o.crop[1] : ''; im.style.width = o.crop ? 'min(40vw, 230px)' : ''; } ph.querySelector('span').textContent = o.cap || ''; ph.classList.toggle('rot', !!o.rot); ph.classList.remove('hidden'); } else ph.classList.add('hidden');
    if (o.emote && S.actors) { const a = S.actors[o.emote[0]]; if (a) { a.emote = o.emote[1]; a.emoteT = 2.2; } }
    if (o.fx === 'hearts') burst(o.at);
    if (o.fx === 'chime') chime();
    if (o.do) o.do(S);
  }
  function advance() {
    if (!D.active) return;
    if (D.shown < D.full.length) { D.shown = D.full.length; $('dlgText').textContent = D.full; return; }
    D.i++; blip(330, 0.04, 0.03);
    if (D.i >= D.q.length) {
      D.active = false; $('dlg').classList.add('hidden'); $('photo').classList.add('hidden'); $('photo').querySelector('video').pause(); duck(false); S.mode = S.prevMode || 'walk';
      if (S.mode === 'walk') $('pad').classList.remove('hidden');
      const cb = D.cb; D.cb = null; cb && cb();
    } else showLine();
  }
  $('dlg').addEventListener('click', advance);

  // ---------- частицы-сердечки ----------
  function burst(who) {
    const a = S.actors && (S.actors[who] || S.actors[S.player]);
    const x = a ? a.x : (S.cam || 0) + W / 2;
    for (let i = 0; i < 9; i++) S.parts.push({ x: x + (Math.random() * 30 - 15), y: GY - 30 - Math.random() * 10, vy: -8 - Math.random() * 10, vx: Math.random() * 8 - 4, life: 1.6 + Math.random(), s: Math.random() < 0.3 ? 2 : 1 });
    chime();
  }

  // ---------- шаги ----------
  function startChapter(i, skipCard) {
    S.ch = i; S.st = -1; save.ch = i; save.max = Math.max(save.max, i); persist();
    const c = STORY[i];
    $('menu').classList.add('hidden'); $('phone').classList.add('hidden'); $('dlg').classList.add('hidden'); $('pad').classList.add('hidden');
    if (skipCard) return nextStep();
    if (i === 0 && !S.introDone) { S.introDone = true; return runIntro(() => showCard(c, i)); }
    showCard(c, i);
  }
  function runIntro(cb) {
    const st = { t: 'say', scene: 'intro', cast: {}, opts: { n: 0 } }; S.step = st; S.fade = 1; S.t0 = S.t; setupScene(st); S.mode = 'say';
    $('hudDate').textContent = ''; $('hudPlace').textContent = ''; $('pad').classList.add('hidden');
    setTimeout(() => say((META.intro || []).map((l, k) => ['n', l, { do: s => { s.sceneState.n = k; } }]), () => { S.step = null; cb(); }), 300);
  }
  function showCard(c, i) {
    S.mode = 'card';
    $('cardNum').textContent = c.num || ('ГЛАВА ' + (i + 1));
    $('cardDate').textContent = c.date || ''; $('cardTitle').textContent = c.title || ''; $('cardSub').textContent = c.sub || '';
    $('card').classList.remove('hidden');
  }
  $('card').addEventListener('click', () => { if (S.mode !== 'card') return; $('card').classList.add('hidden'); blip(440, 0.06); nextStep(); });

  function nextStep() {
    const c = STORY[S.ch]; if (S.st >= 0 && window.FX && FX.stepEnd) FX.stepEnd(S.ch, S.st); S.st++;
    if (S.st >= c.steps.length) {
      if (S.ch + 1 < STORY.length) return startChapter(S.ch + 1);
      save.max = STORY.length - 1; persist(); setTrack(null); return (window.FX && FX.finale) ? FX.finale(() => openMenu(true)) : openMenu(true);
    }
    const st = c.steps[S.st]; S.step = st; S.fade = 1; S.parts = []; S.t0 = S.t;
    $('hudDate').textContent = st.date || c.date || ''; $('hudPlace').textContent = st.place || c.place || '';
    if (st.t === 'phone') return startPhone(st);
    setTrack(st.music);
    setupScene(st);
    if (st.t === 'say') { S.mode = 'say'; $('pad').classList.add('hidden'); setTimeout(() => say(st.lines, nextStep), 350); }
    else { S.mode = 'walk'; $('pad').classList.remove('hidden'); if (st.intro) setTimeout(() => say(st.intro), 350); else hint(st.hint || ''); }
  }

  function setupScene(st) {
    S.sceneW = st.w || W; S.actors = {}; S.extras = (st.extras || []).map(e => Object.assign({}, e));
    const cast = st.cast || {};
    for (const k of ['d', 'o']) if (cast[k]) {
      const c = cast[k];
      S.actors[k] = { x: c.x, cfg: outfit(k, c.outfit), pose: c.pose || 'stand', flip: !!c.flip, follow: !!c.follow, hidden: !!c.hidden, emote: null, emoteT: 0, moving: false, dy: c.dy || 0 };
      S.actors[k].cfg.phase = k === 'd' ? 0 : 1.7;
    }
    S.player = st.player || (S.actors.o ? 'o' : 'd');
    S.spots = (st.spots || []).map(s => Object.assign({ done: false }, s));
    S.cam = 0; S.ended = false; S.sceneState = Object.assign({}, st.opts || {});
    S.am = st === STORY[S.ch].steps[S.st] ? amFor(S.ch, S.st, st) : null; if (S.am) S.am.got = save.am.includes(S.am.key); amHud();
    if (S.actors[S.player]) S.cam = Math.max(0, Math.min(S.sceneW - W, S.actors[S.player].x - W / 2));
    // сцены-диалоги без ходьбы: камера по центру между героями, чтобы на узком экране (телефон) были видны оба
    if (st.t === 'say') { const xs = Object.values(S.actors).filter(a => !a.hidden).map(a => a.x); if (xs.length) S.cam = Math.max(0, Math.min(S.sceneW - W, (Math.min(...xs) + Math.max(...xs)) / 2 - W / 2)); }
  }

  // --- собираемые амнямы: по одному почти в каждой сцене с ходьбой ---
  function amFor(ci, si, st) {
    if (!META.amnyams) return null; // сбор амнямов выключен, включается в story.js: META.amnyams = true
    if (!st || st.t !== 'walk' || st.slope || st.noAm) return null; const cast = st.cast || {}, pk = st.player || (cast.o ? 'o' : 'd'); if (!cast[pk]) return null;
    const w = st.w || 240, spots = st.spots || []; let maxX = (typeof st.exit === 'number' ? st.exit : w) - 22;
    spots.forEach(s => { if (s.end) maxX = Math.min(maxX, s.x - 18); }); const minX = cast[pk].x + 26; if (maxX - minX < 24) return null;
    for (const f of [0.55, 0.3, 0.8, 0.42, 0.68, 0.15, 0.92]) { const x = Math.round(minX + (maxX - minX) * ((f + ci * 0.137 + si * 0.31) % 1)); if (!spots.some(s => Math.abs(s.x - x) < 16)) return { x, hat: ['#c8323c', '#ffd166', '#6fb7ff', '#b58cff', null, '#ff7aa8', '#7ad6a0'][(ci + si * 3) % 7], key: ci + '.' + si }; }
    return null;
  }
  let AM_TOTAL = 0; STORY.forEach((c, ci) => c.steps.forEach((st, si) => { if (amFor(ci, si, st)) AM_TOTAL++; }));
  if (!Array.isArray(save.am)) save.am = [];
  const amHud = () => { $('hudAm').textContent = AM_TOTAL ? 'Ам Нямы: ' + save.am.length + ' / ' + AM_TOTAL : ''; };
  let hintT = 0;
  function hint(txt, sec = 3) { const h = $('hint'); if (!txt) { h.classList.remove('on'); return; } h.textContent = txt; h.classList.add('on'); hintT = sec; }

  // ---------- телефон ----------
  const P = { msgs: [], i: 0 };
  function startPhone(st) {
    S.mode = 'phone'; P.msgs = st.msgs; P.i = 0;
    $('pad').classList.add('hidden'); $('phone').classList.remove('hidden');
    $('phName').textContent = st.title || 'Дима'; $('phStatus').textContent = st.status || 'в сети';
    $('phAva').textContent = (st.title || 'Дима')[0]; $('phAva').style.background = st.ava || '#6fb7ff';
    $('phList').innerHTML = ''; $('phTap').textContent = 'нажимай, чтобы читать дальше';
    phoneNext();
  }
  function phoneNext() {
    if (P.i >= P.msgs.length) { $('phone').classList.add('hidden'); return nextStep(); }
    let again;
    do {
      const m = P.msgs[P.i++]; const el = document.createElement('div');
      again = false;
      if (m[0] === 'day') { el.className = 'ph-day'; el.textContent = m[1]; again = true; }
      else if (m[0] === 'note') { el.className = 'ph-note'; el.textContent = m[1]; }
      else {
        const im = m[3] && m[3].img; el.className = 'ph-m ' + m[0] + (m[3] && !im ? ' media' : ''); el.textContent = m[1];
        if (im) { const pic = document.createElement('img'); pic.src = im; if (m[3].crop) { pic.style.aspectRatio = m[3].crop[0]; pic.style.objectFit = 'cover'; pic.style.objectPosition = m[3].crop[1]; pic.style.width = '100%'; pic.style.maxHeight = 'none'; } pic.alt = ''; pic.onload = () => { $('phList').scrollTop = $('phList').scrollHeight; }; el.insertBefore(pic, el.firstChild); }
        if (m[2]) { const s = document.createElement('small'); s.textContent = m[2]; el.appendChild(s); }
        blip(m[0] === 'o' ? 700 : 520, 0.05, 0.03, 'triangle');
      }
      $('phList').appendChild(el);
    } while (again && P.i < P.msgs.length);
    $('phList').scrollTop = $('phList').scrollHeight;
    if (P.i >= P.msgs.length) $('phTap').textContent = 'нажми, чтобы убрать телефон';
  }
  $('phone').addEventListener('click', () => { if (S.mode === 'phone') phoneNext(); });

  // ---------- меню ----------
  function openMenu(finished) {
    S.mode = 'menu'; $('menu').classList.remove('hidden'); $('pad').classList.add('hidden'); $('dlg').classList.add('hidden'); $('card').classList.add('hidden'); $('phone').classList.add('hidden');
    $('menuTitle').textContent = META.title; $('menuSub').textContent = finished ? META.outro : META.sub;
    const b = $('menuBtns'); b.innerHTML = '';
    const add = (txt, fn, main) => { const e = document.createElement('button'); e.className = 'mb' + (main ? ' main' : ''); e.textContent = txt; e.onclick = () => { blip(520, 0.06); fn(); }; b.appendChild(e); };
    if (save.max > 0 || save.ch > 0) add('Продолжить', () => startChapter(Math.min(save.ch, STORY.length - 1)), true);
    add(save.max > 0 ? 'Начать сначала' : 'Начать', () => startChapter(0), !(save.max > 0 || save.ch > 0));
    add('Главы', () => { const l = $('chapList'); l.classList.toggle('hidden'); });
    add(muted ? 'Звук: выкл' : 'Звук: вкл', () => { muted = !muted; for (const k in TR.els) TR.els[k].muted = muted; openMenu(finished); });
    const l = $('chapList'); l.innerHTML = '';
    STORY.forEach((c, i) => {
      const e = document.createElement('div'); const open = i <= save.max || META.unlockAll;
      e.className = 'ch' + (open ? '' : ' lock'); e.innerHTML = '<b></b><span></span>';
      e.firstChild.textContent = c.short || c.date || ''; e.lastChild.textContent = open ? c.title : '???';
      if (open) e.onclick = () => startChapter(i);
      l.appendChild(e);
    });
    if (window.FX && FX.menu) FX.menu(finished);
  }
  $('btnMenu').addEventListener('click', e => { e.stopPropagation(); if (S.mode !== 'menu') { S.resume = S.mode; openMenu(false); const b = $('menuBtns'); const e2 = document.createElement('button'); e2.className = 'mb'; e2.textContent = 'Вернуться в игру'; e2.onclick = () => { $('menu').classList.add('hidden'); S.mode = S.resume; if (S.mode === 'walk') $('pad').classList.remove('hidden'); if (S.mode === 'dialog') $('dlg').classList.remove('hidden'); if (S.mode === 'card') $('card').classList.remove('hidden'); if (S.mode === 'phone') $('phone').classList.remove('hidden'); }; b.insertBefore(e2, b.firstChild); } });

  // ---------- ввод ----------
  const keymap = { ArrowLeft: 'l', a: 'l', A: 'l', 'ф': 'l', 'Ф': 'l', ArrowRight: 'r', d: 'r', D: 'r', 'в': 'r', 'В': 'r' };
  addEventListener('keydown', e => {
    if (keymap[e.key]) { S.keys[keymap[e.key]] = true; e.preventDefault(); }
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'e' || e.key === 'E' || e.key === 'у' || e.key === 'ArrowUp') {
      e.preventDefault(); if (e.repeat) return;
      if (S.mode === 'dialog') advance(); else if (S.mode === 'card') $('card').click(); else if (S.mode === 'phone') phoneNext(); else if (S.mode === 'walk') S.actReq = true;
    }
    if (e.key === 'Escape') $('btnMenu').click();
  });
  addEventListener('keyup', e => { if (keymap[e.key]) S.keys[keymap[e.key]] = false; });
  const hold = (el, k) => {
    const on = e => { e.preventDefault(); S.keys[k] = true; el.classList.add('on'); }, off = e => { S.keys[k] = false; el.classList.remove('on'); };
    el.addEventListener('pointerdown', on); el.addEventListener('pointerup', off); el.addEventListener('pointerleave', off); el.addEventListener('pointercancel', off);
    el.addEventListener('contextmenu', e => e.preventDefault());
  };
  hold($('bL'), 'l'); hold($('bR'), 'r');
  $('bA').addEventListener('pointerdown', e => { e.preventDefault(); S.actReq = true; });
  // нажатие на сцену: идти в ту сторону / действие
  let stageHold = null;
  $('stage').addEventListener('pointerdown', e => {
    if (e.target.id === 'btnMenu') return;
    if (S.mode === 'dialog') return advance();
    if (S.mode !== 'walk') return;
    const b = cv.getBoundingClientRect(), fx = (e.clientX - b.left) / b.width;
    const pl = S.actors[S.player]; const sx = (pl.x - S.cam) / W;
    if (Math.abs(fx - sx) < 0.09 && S.near) { S.actReq = true; return; }
    stageHold = fx > sx ? 'r' : 'l'; S.keys[stageHold] = true;
  });
  const relStage = () => { if (stageHold) { S.keys[stageHold] = false; stageHold = null; } };
  addEventListener('pointerup', relStage); addEventListener('pointercancel', relStage);
  addEventListener('blur', () => { S.keys.l = S.keys.r = false; });

  // ---------- обновление ----------
  function update(dt) {
    S.t += dt; if (S.fade > 0) S.fade = Math.max(0, S.fade - dt * 2.2);
    if (hintT > 0) { hintT -= dt; if (hintT <= 0) $('hint').classList.remove('on'); }
    if (D.active && D.shown < D.full.length) {
      const before = Math.floor(D.shown); D.shown = Math.min(D.full.length, D.shown + dt * 46);
      if (Math.floor(D.shown) !== before) { $('dlgText').textContent = D.full.slice(0, Math.floor(D.shown)); if (Math.floor(D.shown) % 3 === 0) blip(D.who === 'o' ? 620 : D.who === 'd' ? 400 : 500, 0.02, 0.015); }
    }
    for (const p of S.parts) { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; }
    S.parts = S.parts.filter(p => p.life > 0);
    if (!S.actors) return;
    for (const k in S.actors) { const a = S.actors[k]; if (a.emoteT > 0) a.emoteT -= dt; a.moving = false; }
    if (S.mode !== 'walk') { S.actReq = false; return; }
    const pl = S.actors[S.player]; if (!pl) return;
    const dir = (S.keys.r ? 1 : 0) - (S.keys.l ? 1 : 0);
    if (dir) {
      const sp = (S.step.speed || 52) * dt; const nx = Math.max(8, Math.min(S.sceneW - 8, pl.x + dir * sp));
      // мягкая стена: дальше нельзя, пока не случилось обязательное
      const wall = S.spots.find(s => s.req && !s.done && nx > s.x + 22 && pl.x <= s.x + 22);
      if (!wall) { pl.x = nx; } else hint('Кажется, я что-то пропустила…', 2);
      pl.flip = dir < 0; pl.moving = true; pl.pose = 'walk';
      if (Math.floor(S.t * 8) % 4 === 0 && Math.floor((S.t - dt) * 8) % 4 !== 0) blip(120, 0.02, 0.012, 'triangle');
    } else if (pl.pose === 'walk') pl.pose = 'stand';
    // спутник
    for (const k in S.actors) {
      const a = S.actors[k]; if (k === S.player || !a.follow) continue;
      const hold = !!(window.FX && FX.holding && FX.holding(S, a, pl)), gap = hold ? 8 : 15, tx = pl.x - (pl.flip ? -gap : gap); const dx = tx - a.x;
      if (Math.abs(dx) > 3) { a.x += Math.sign(dx) * Math.min(Math.abs(dx), (S.step.speed || 52) * dt * (Math.abs(dx) > 30 ? 1.25 : 0.95)); a.flip = dx < 0; a.pose = 'walk'; a.moving = true; }
      else { a.pose = 'stand'; a.flip = pl.flip; }
    }
    S.cam += (Math.max(0, Math.min(S.sceneW - W, pl.x - W / 2 + (pl.flip ? -14 : 14))) - S.cam) * Math.min(1, dt * 5);
    if (S.am && !S.am.got && Math.abs(pl.x - S.am.x) < 9) { S.am.got = true; save.am.push(S.am.key); persist(); chime(); amHud(); hint('Ам Ням! ' + save.am.length + ' из ' + AM_TOTAL, 2); }
    // точки интереса
    let near = null;
    for (const s of S.spots) { if (s.done && !s.repeat) continue; if (Math.abs(pl.x - s.x) < (s.r || 13)) { near = s; break; } }
    S.near = near && !near.auto ? near : null;
    $('bA').classList.toggle('show', !!S.near);
    if (near && (near.auto || S.actReq)) trigger(near);
    S.actReq = false;
    // выход
    const st = S.step;
    if (!S.ended && st.exit !== false && pl.x >= (typeof st.exit === 'number' ? st.exit : S.sceneW - 14)) {
      if (S.spots.some(s => s.req && !s.done)) hint('Кажется, я что-то пропустила…', 2);
      else { S.ended = true; if (st.outro) say(st.outro, nextStep); else nextStep(); }
    }
  }
  function trigger(s) {
    s.done = true; S.keys.l = S.keys.r = false; blip(780, 0.07, 0.04, 'triangle');
    const pl = S.actors[S.player]; pl.pose = 'stand';
    if (s.face) for (const k in S.actors) { const a = S.actors[k]; if (k !== S.player && !a.follow) { pl.flip = a.x < pl.x; a.flip = pl.x < a.x; } }
    if (s.pre) s.pre(S);
    say(s.lines, () => {
      if (s.join) { [].concat(s.join).forEach(k => { if (S.actors[k]) { S.actors[k].follow = true; S.actors[k].hidden = false; if (S.actors[k].pose !== 'walk') S.actors[k].pose = 'stand'; } }); }
      if (s.set) Object.assign(S.sceneState, s.set);
      if (s.fn) s.fn(S);
      if (s.end) { S.ended = true; nextStep(); }
    });
  }

  // ---------- отрисовка ----------
  function draw() {
    if (window.TITLE) TITLE.frame(S.mode === 'menu', S.t);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); ctx.setTransform(2, 0, 0, 2, 0, 0); ctx.imageSmoothingEnabled = false;
    A.use(ctx);
    const st = S.step;
    const mc = $('mapcv'); if (st && st.scene === 'map' && SCENES.mapHi) { mc.classList.remove('hidden'); SCENES.mapHi(mc, S.sceneState || {}, S.t); } else mc.classList.add('hidden');
    if (!st || st.t === 'phone' && !S.actors) { drawTitle(); return; }
    const sc = SCENES[st.scene] || SCENES.black;
    const env = { W, H, GY, cam: Math.round(S.cam || 0), t: S.t, o: S.sceneState || {}, w: S.sceneW };
    if (!SCENES[st.scene]) st.scene = 'black';
    sc(env);
    // доп. объекты и персонажи, по x
    const list = [], hug = !!(S.actors.d && S.actors.o && S.actors.d.pose === 'hug' && S.actors.o.pose === 'hug');   // в объятиях руки обнимающего — Димины
    (S.extras || []).forEach(e => list.push({ z: e.z || 0, x: e.x, f: () => drawExtra(e, env) }));
    for (const k in S.actors) { const a = S.actors[k]; if (!a.hidden) list.push({ z: hug ? (k === 'd' ? 3 : 1) : k === S.player ? 2 : 1, x: a.x, f: () => drawActor(a, env, hug && k === 'o' ? 'stand' : null) }); }
    list.sort((a, b) => a.z - b.z).forEach(o => o.f());
    if (S.am && !S.am.got) { const ax = Math.round(S.am.x - env.cam); if (ax > -8 && ax < W + 8) SCENES.P.amnyam(ax - 3, GY, { y: 1 + Math.abs(Math.round(Math.sin(S.t * 5) * 3)), hat: S.am.hat }, env); }
    // маркеры
    if (S.mode === 'walk') for (const s of S.spots) {
      if (s.done || s.hidden) continue;
      const x = s.x - env.cam, y = GY - (s.h || 40) - (st.slope ? Math.round(Math.max(0, st.slope.down ? st.slope.x + st.slope.len - s.x : s.x - st.slope.x) * st.slope.k) : 0) + Math.round(Math.sin(S.t * 4 + s.x) * 1.5);
      if (x > -8 && x < W + 8) A.bubble(Math.round(x), y, s.icon || '!');
    }
    if (window.FX && FX.afterActors) FX.afterActors(ctx, env, S, GY);
    if (SCENES[st.scene] && SCENES[st.scene].fg) SCENES[st.scene].fg(env);
    for (const p of S.parts) { ctx.globalAlpha = Math.min(1, p.life); A.heart(Math.round(p.x - env.cam), Math.round(p.y), p.s === 2 ? '#ff5c93' : '#ff9ac0', 1); ctx.globalAlpha = 1; }
    if (S.fade > 0) { ctx.globalAlpha = S.fade; A.r(0, 0, W, H, '#0b0a18'); ctx.globalAlpha = 1; }
  }
  function drawActor(a, env, poseOver) {
    const x = Math.round(a.x - env.cam); if (x < -20 || x > W + 20) return;
    const sp = S.step.slope, sl = sp ? -Math.round(Math.max(0, sp.down ? sp.x + sp.len - a.x : a.x - sp.x) * sp.k) : 0, dy = (a.dy || 0) + sl;
    const top = A.person(x, GY + dy, a.cfg, poseOver || a.pose, S.t, a.flip, { blush: a.blush, closedEyes: a.sleep, smile: a.smile });
    if (a.emoteT > 0 && a.emote) A.bubble(x, GY + top - 2 + dy, a.emote);
  }
  function drawExtra(e, env) {
    const x = Math.round(e.x - env.cam * (e.par || 1)); if (x < -40 || x > W + 40) return;
    const gy = GY + (e.dy || 0);
    if (e.kind === 'cat') A.cat(x, gy, e.col || '#8a8f9c', S.t + (e.ph || 0), e.flip, e.sit !== false, e.eye);
    else if (e.kind === 'dog') A.dog(x, gy, e.col || '#c9a46b', S.t, e.flip);
    else if (e.kind === 'fn') e.fn(x, gy, env, S);
    else { const top = A.person(x, gy, Object.assign({ phase: e.x }, e.cfg), e.pose || 'stand', S.t + (e.ph || 0), e.flip); if (e.emote) A.bubble(x, gy + top - 2, e.emote); }
  }
  function drawTitle() { (SCENES.title || SCENES.black)({ W, H, GY, cam: Math.round(S.t * 6), t: S.t, o: {}, w: 9999 }); }

  // ---------- цикл ----------
  let last = performance.now();
  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    update(dt); draw(); requestAnimationFrame(loop);
  }
  // подгружаем фото заранее, чтобы они открывались без задержки
  (function pre(o) { if (!o || typeof o !== 'object') return; if (Array.isArray(o)) return o.forEach(pre); for (const k in o) { if (k === 'img' && typeof o[k] === 'string') { const im = new Image(); im.src = o[k]; } else if (typeof o[k] === 'object') pre(o[k]); } })(STORY);
  resize(); openMenu(false); requestAnimationFrame(loop);
  window.__G = { S, startChapter, nextStep, say, advance, setTrack, tick: update, draw, get W() { return W; }, get muted() { return muted; } };
})();
