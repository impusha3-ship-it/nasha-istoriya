// ===== features.js — счётчик до встречи, ачивки, альбом, финал, прогулки за руку =====
// Подключается перед engine.js; движок зовёт FX.menu / FX.stepEnd / FX.finale / FX.holding / FX.afterActors.
(() => {
  const $ = id => document.getElementById(id);
  const KEY = 'nasha-istoriya-fx';
  let st = { ach: {}, done: false };
  try { st = Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  // ---------- стили ----------
  const css = document.createElement('style');
  css.textContent = `
#cd{font-size:20px;line-height:1.25;color:var(--gold);margin:-4px 0 16px;white-space:pre-wrap}
#cd small{display:block;font-size:13px;opacity:.6;color:var(--paper)}
#toast{position:absolute;left:50%;top:10px;transform:translate(-50%,-140%);z-index:30;display:flex;gap:10px;align-items:center;background:#14122b;border:3px solid var(--gold);box-shadow:0 0 0 3px #14122b,5px 5px 0 3px rgba(0,0,0,.5);padding:8px 14px 8px 10px;pointer-events:none;transition:transform .45s steps(6);max-width:calc(100% - 20px)}
#toast.on{transform:translate(-50%,0)}
#toast canvas{width:40px;height:40px;image-rendering:pixelated;background:#2a2547;border:2px solid var(--paper);flex:none}
#toast b{display:block;font-family:var(--ft);font-size:8px;color:var(--gold);margin-bottom:5px;letter-spacing:1px}
#toast span{font-size:19px;line-height:1.1;display:block}
.ov{position:absolute;inset:0;z-index:40;background:rgba(8,7,20,.96);display:flex;flex-direction:column;align-items:center;overflow:hidden}
.ov h2{font-family:var(--ft);font-size:clamp(11px,3.4vw,16px);color:var(--pink);margin:16px 0 4px;text-align:center;line-height:1.5}
.ov .sub{font-size:15px;opacity:.7;margin-bottom:8px}
.ov .scroll{flex:1;width:100%;overflow-y:auto;padding:10px 12px 20px;scrollbar-width:thin}
.ov .bar{width:100%;display:flex;justify-content:center;padding:8px 10px calc(10px + env(safe-area-inset-bottom))}
#achList{display:flex;flex-direction:column;gap:8px;max-width:520px;margin:0 auto}
.ac{display:flex;gap:12px;align-items:center;padding:8px 10px;border:2px solid #3b3660;background:#1c1938}
.ac canvas{width:40px;height:40px;image-rendering:pixelated;background:#2a2547;border:2px solid var(--paper);flex:none}
.ac b{display:block;font-size:19px;font-weight:600;line-height:1.1}
.ac i{display:block;font-style:normal;font-size:14px;opacity:.75;line-height:1.2;margin-top:2px}
.ac.lock{opacity:.45}.ac.lock canvas{filter:grayscale(1) brightness(.35)}
#wall{display:flex;flex-wrap:wrap;gap:18px 14px;justify-content:center;max-width:980px;margin:0 auto;padding:6px 0 30px}
.ovAlb{background:#2b2118;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1.5px);background-size:9px 9px}
.pol{width:148px;background:#f7f2e8;padding:8px 8px 6px;box-shadow:0 5px 12px rgba(0,0,0,.55);cursor:pointer;color:#2a2230;transition:transform .15s;text-align:center;position:relative}
.pol:hover{transform:scale(1.07) rotate(0deg)!important;z-index:2}
.pol .im{width:100%;aspect-ratio:1/1;overflow:hidden;background:#222}
.pol img{width:100%;height:100%;object-fit:cover;display:block}
.pol img.rot{transform:rotate(-90deg) scale(1.34)}
.pol u{display:block;text-decoration:none;font-size:15px;margin-top:5px;line-height:1.05;font-weight:600}
.pol s{display:block;text-decoration:none;font-size:12px;opacity:.7;line-height:1.05;margin-top:2px;min-height:12px}
.pol:before{content:'';position:absolute;top:-7px;left:50%;width:34px;height:13px;margin-left:-17px;background:rgba(255,226,140,.55);transform:rotate(-3deg)}
#lb{z-index:50;justify-content:center;cursor:pointer;background:rgba(5,4,12,.92)}
#lb img{max-width:92%;max-height:74%;border:10px solid #f7f2e8;border-bottom-width:42px;box-shadow:0 8px 40px #000}
#lb img.rot{transform:rotate(-90deg);max-width:70vh;max-height:80vw}
#lb p{font-size:20px;margin:14px 20px 0;text-align:center;line-height:1.2}
#fin{justify-content:center;gap:12px;text-align:center;padding:24px;background:#0b0a18}
#fin h2{margin:0 0 6px}
#fin .tx{font-size:21px;line-height:1.3;white-space:pre-wrap;max-width:26em}
#fin .bt{display:flex;flex-direction:column;gap:10px;margin-top:18px;width:min(320px,100%)}
@media (max-width:520px){.pol{width:calc(50% - 10px)}}
`;
  document.head.appendChild(css);

  // ---------- счётчик до встречи: 12 декабря 2026, 7:00 по Владивостоку (UTC+10) ----------
  const TARGET = Date.UTC(2026, 11, 11, 21, 0, 0);
  const plural = (n, a, b, c) => { const m = n % 100, k = n % 10; return (m > 10 && m < 15) ? c : k === 1 ? a : (k > 1 && k < 5) ? b : c; };
  function cdText() {
    const ms = TARGET - Date.now();
    if (ms <= 0) return 'мы вместе';
    const m = Math.floor(ms / 60000), d = Math.floor(m / 1440), h = Math.floor(m % 1440 / 60), mi = m % 60;
    return 'до 12 декабря, 7 утра — ' + d + ' ' + plural(d, 'день', 'дня', 'дней') + ', ' + h + ' ' + plural(h, 'час', 'часа', 'часов') + ', ' + mi + ' ' + plural(mi, 'минута', 'минуты', 'минут');
  }
  const cdNodes = new Set();
  function cdNode() { const e = el('div'); e.id = 'cd'; cdNodes.add(e); e.textContent = cdText(); return e; }
  setInterval(() => cdNodes.forEach(e => { if (!e.isConnected) cdNodes.delete(e); else e.textContent = cdText(); }), 1000);

  // ---------- ачивки: шутки из переписки ----------
  // ch — индекс главы, s — индекс шага (-1 = конец главы); награда выдаётся, когда шаг закончился
  const ACH_ON = false;   // ачивки пока выключены: поставить true, чтобы вернуть всплывашки и экран
  const ACH = [
    { id: 'tale', ch: 1, s: -1, ic: 'star', t: 'Новогодняя сказка', d: 'Первый раз вдвоём в театре' },
    { id: 'door', ch: 2, s: -1, ic: 'key', t: 'Откройте дом, пожалуйста', d: 'Леонид сказал: «ты знаешь короткий путь»' },
    { id: 'race', ch: 3, s: -1, ic: 'hat', t: 'Гонка за амнямами', d: 'Переписываться каждый день' },
    { id: 'whale', ch: 8, s: -1, ic: 'whale', t: 'Позвоночник кита', d: 'Сбылось желание двух последних лет' },
    { id: 'jelly', ch: 10, s: -1, ic: 'jelly', t: 'Напихать кучу медуз', d: 'Хочу, чтобы мне приснилось, как мы смотрим на медуз' },
    { id: 'pancake', ch: 11, s: -1, ic: 'pan', t: 'Первый блин не комом', d: 'Блины на Нерчинской' },
    { id: 'comma', ch: 12, s: -1, ic: 'comma', t: 'Запятая, а не точка', d: 'Последний вечер перед Петербургом' },
    { id: 'land', ch: 14, s: -1, ic: 'plane', t: 'Первый раз приземлился', d: 'Владивосток — Москва — Пулково' },
    { id: 'esc', ch: 16, s: -1, ic: 'stairs', t: 'Эскалатор', d: 'Самое глубокое метро в мире. Очень кстати' },
    { id: 'fence', ch: 17, s: -1, ic: 'fence', t: 'Через загородку', d: 'Лучший визит в Питер' },
    { id: 'count', ch: 18, s: -1, ic: 'num', t: 'Считай', d: 'С какого дня вести счёт' },
    { id: 'hundred', ch: 22, s: -1, ic: 'heart', t: 'Сто дней', d: 'Четыре цифры' },
    { id: 'chose', ch: 23, s: -1, ic: 'heart', t: 'Я выбрала тебя', d: 'Ты — на Великой стене, я — в Петербурге' },
    { id: 'trap', ch: 24, s: -1, ic: 'bus', t: 'Трап или автобус', d: 'Сто один день после Пулково' },
    { id: 'rainbow', ch: 25, s: -1, ic: 'rain', t: 'Двойная радуга', d: 'Три недели в одном городе' },
    { id: 'station', ch: 25, s: 10, ic: 'metro', t: 'Ещё три станции', d: '«Побудь со мной ещё 3 станции»' },
    { id: 'dream', ch: 25, s: 10, ic: 'moon', t: 'Приснились друг другу в одну ночь', d: 'Была такая ачивка. Теперь есть' },
    { id: 'taxi', ch: 26, s: 23, ic: 'car', t: 'Такси в Шанхае', d: 'Дорога, которой не хотелось заканчиваться' },
    { id: 'real', ch: 26, s: -1, ic: 'star', t: 'Это реальность?', d: 'Шанхай' },
    { id: 'melissa', ch: 27, s: -1, ic: 'leaf', t: 'Мелисса от Оли', d: 'Растёт на Нерчинской' },
    { id: 'photo', ch: 28, s: 2, ic: 'cam', t: 'Фотосессия', d: 'Вайб Офелии немного такой' },
    { id: 'video', ch: 28, s: -1, ic: 'phone', t: 'Свидание на девять тысяч километров', d: 'Воскресенье по видеосвязи' },
    { id: 'month', ch: 29, s: -1, ic: 'clock', t: 'Меньше месяца', d: 'Знание, что вместе' },
    { id: 'seven', ch: 30, s: -1, ic: 'sun', t: 'Я встречу тебя в 7 утра', d: 'Конец главы, которая ещё не случилась' },
  ];
  // пиксельные иконки 8×8: x — основной цвет, o — светлый, k — тёмный
  const ICONS = {
    heart: ['.xx..xx.', 'xooxxxxx', 'xooxxxxx', 'xxxxxxxx', '.xxxxxx.', '..xxxx..', '...xx...', '........'],
    star: ['...xx...', '...xx...', 'xxxxxxxx', '.xooxxx.', '..xxxx..', '..xxxx..', '.xx..xx.', '........'],
    key: ['..xxxx..', '.xooxxx.', '.xx..xx.', '.xxxxxx.', '...xx...', '...xxx..', '...xx...', '...xxx..'],
    hat: ['..xxxx..', '.xooxxx.', '.xxxxxx.', 'xxxxxxxx', '.kkkkkk.', '.k.kk.k.', '.kk..kk.', '........'],
    whale: ['........', '..xxxx..', '.xxxxxxx', 'xxooxxxx', 'xxxxxxxk', '.xxxxxx.', '..kkkk..', '........'],
    jelly: ['..xxxx..', '.xooxxx.', 'xxxxxxxx', 'xxxxxxxx', '.x.x.x.x', '.x.x.x.x', 'x.x.x.x.', '........'],
    pan: ['........', '..xxxx..', '.xooxxx.', 'xxxxxxxx', 'xxxxxxxx', 'kkkkkkkk', '.kkkkkk.', '........'],
    comma: ['..xxxx..', '.xxooxx.', '.xx..xx.', '.xx..xx.', '..xxxx..', '...xx...', '..xx....', '.xx.....'],
    plane: ['....x...', '...xx...', 'xxxxxxx.', 'xooxxxxx', 'xxxxxxx.', '...xx...', '....x...', '........'],
    stairs: ['......xx', '.....xxx', '....xxx.', '...xxx..', '..xxx...', '.xxx....', 'xxx.....', 'xx......'],
    fence: ['.x..x..x', 'xxxxxxxx', 'xxxxxxxx', '.x..x..x', 'xxxxxxxx', 'xxxxxxxx', '.x..x..x', '.x..x..x'],
    num: ['..xx....', '.xxx....', '..xx..xx', '..xx.x..', '..xx..x.', '..xx...x', '.xxxx.xx', '........'],
    bus: ['.xxxxxx.', 'xooxxoox', 'xxxxxxxx', 'xooxxoox', 'xxxxxxxx', 'xxxxxxxx', '.kk..kk.', '........'],
    rain: ['..xxxx..', '.xkkkkx.', 'xk.xx.kx', 'k.x..x.k', 'k.x..x.k', '........', '........', '........'],
    metro: ['.xxxxxx.', 'xooxxoox', 'xxxxxxxx', 'xxxxxxxx', 'xxooooxx', 'xxxxxxxx', '.k.kk.k.', '..k..k..'],
    moon: ['..xxx...', '.xxo....', 'xxo.....', 'xx......', 'xx......', 'xxx.....', '.xxxxxx.', '..xxxx..'],
    car: ['........', '..xxxx..', '.xooxxx.', 'xxxxxxxx', 'xxxxxxxx', '.kk..kk.', '.kk..kk.', '........'],
    leaf: ['......xx', '....xxxo', '..xxxxxx', '.xxoxxx.', '.xxxxx..', 'kxxxx...', 'kk......', 'k.......'],
    cam: ['..xxx...', 'xxxxxxxx', 'xooxxxxx', 'xo.kkxxx', 'xokkkxxx', 'xxkkkxxx', 'xxxxxxxx', '........'],
    phone: ['.xxxxxx.', '.xooooxx', '.xooooxx', '.xooooxx', '.xooooxx', '.xxxxxx.', '.xx..xx.', '.xxxxxx.'],
    clock: ['..xxxx..', '.xooxxx.', 'xoxxxkxx', 'xoxxkxxx', 'xxxkkkxx', 'xxxxxxxx', '.xxxxxx.', '..xxxx..'],
    sun: ['x..xx..x', '..xxxx..', '.xooxxx.', 'xxxxxxxx', 'xxxxxxxx', '.xxxxxx.', '..xxxx..', 'x..xx..x'],
  };
  const PAL = { heart: ['#ff5c93', '#ffb0cc', '#c23468'], star: ['#ffd166', '#fff2b8', '#c8962c'], key: ['#ffd166', '#fff2b8', '#c8962c'], hat: ['#e84a5f', '#ff9aa8', '#5a2a30'], whale: ['#6fb7ff', '#bfe0ff', '#2f5f9a'], jelly: ['#d99aff', '#f2d4ff', '#8a52b8'], pan: ['#e8b05a', '#ffe0a0', '#9a6a2a'], comma: ['#ffd166', '#fff2b8', '#c8962c'], plane: ['#e6ebf5', '#ffffff', '#8aa0c8'], stairs: ['#9aa6d8', '#c8d0f0', '#5a6498'], fence: ['#c9a46b', '#e8cf9c', '#7a5a30'], num: ['#ff7aa8', '#ffc0d6', '#a8406a'], bus: ['#7ad6a0', '#d4fbe4', '#2f7a50'], rain: ['#ff7aa8', '#ffd166', '#6fb7ff'], metro: ['#6fb7ff', '#d4ecff', '#2f5f9a'], moon: ['#ffd166', '#fff2b8', '#c8962c'], car: ['#ffd23d', '#fff0a0', '#222'], leaf: ['#7ad6a0', '#d4fbe4', '#2f7a50'], cam: ['#c8d0e0', '#ffffff', '#33384a'], phone: ['#9aa6d8', '#14122b', '#5a6498'], clock: ['#ffd166', '#fff2b8', '#5a3a10'], sun: ['#ffb347', '#fff2b8', '#c86a1c'] };
  function icon(name, size) {
    const c = el('canvas'); c.width = c.height = 8; const g = c.getContext('2d'), m = ICONS[name] || ICONS.star, p = PAL[name] || PAL.star;
    m.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === '.') return; g.fillStyle = ch === 'x' ? p[0] : ch === 'o' ? p[1] : p[2]; g.fillRect(x, y, 1, 1); }));
    return c;
  }

  let toast = null, queue = [], showing = false;
  function chime() {
    try {
      if (window.__G && __G.muted) return;
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      [784, 988, 1319].forEach((f, i) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = 'square'; o.frequency.value = f; const t0 = ac.currentTime + i * 0.09; g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(0.035, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16); o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + 0.18); });
      setTimeout(() => ac.close(), 800);
    } catch (e) {}
  }
  function pump() {
    if (showing || !queue.length) return;
    const a = queue.shift(); showing = true;
    if (!toast) { toast = el('div'); toast.id = 'toast'; $('app').appendChild(toast); }
    toast.innerHTML = ''; toast.appendChild(icon(a.ic));
    const box = el('div'); box.appendChild(el('b', null, 'ACHIEVEMENT UNLOCKED')); box.appendChild(el('span', null, a.t.replace(/&/g, '&amp;').replace(/</g, '&lt;'))); toast.appendChild(box);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('on'))); chime();
    setTimeout(() => { toast.classList.remove('on'); setTimeout(() => { showing = false; pump(); }, 600); }, 3800);
  }
  function unlock(a) { if (!ACH_ON || st.ach[a.id]) return; st.ach[a.id] = Date.now(); persist(); queue.push(a); pump(); }

  function achScreen() {
    const ov = el('div', 'ov'), n = Object.keys(st.ach).length;
    ov.appendChild(el('h2', null, 'ДОСТИЖЕНИЯ'));
    ov.appendChild(el('div', 'sub', n + ' из ' + ACH.length));
    const sc = el('div', 'scroll'), list = el('div'); list.id = 'achList';
    ACH.forEach(a => { const got = !!st.ach[a.id], r = el('div', 'ac' + (got ? '' : ' lock')); r.appendChild(icon(a.ic)); const b = el('div'); b.appendChild(el('b', null, got ? a.t : '???')); b.appendChild(el('i', null, got ? a.d : 'ещё не открыто')); r.appendChild(b); list.appendChild(r); });
    sc.appendChild(list); ov.appendChild(sc);
    const bar = el('div', 'bar'), back = el('button', 'mb main', 'Назад'); back.style.minWidth = '200px'; back.onclick = () => ov.remove(); bar.appendChild(back); ov.appendChild(bar);
    $('app').appendChild(ov);
  }

  // ---------- альбом: все фото игры стеной полароидов ----------
  function photos() {
    const out = [], seen = new Set();
    const add = (o, date, place) => { if (!o || !o.img || seen.has(o.img)) return; seen.add(o.img); out.push({ img: o.img, cap: o.cap || '', rot: !!o.rot, crop: o.crop, date, place }); };
    const dd = s => String(s || '').split(',')[0].trim();
    STORY.forEach(c => {
      const year = (String(c.date || '').match(/\d{4}/) || ['2026'])[0];
      c.steps.forEach(s => {
        const date = dd(s.date || c.date), place = s.place || c.place || '';
        const lines = a => (a || []).forEach(l => add(l[2], date, place));
        lines(s.lines); lines(s.intro); lines(s.outro); (s.spots || []).forEach(sp => lines(sp.lines));
        if (s.t === 'phone') { let day = date; (s.msgs || []).forEach(m => { if (m[0] === 'day') day = /\d{4}/.test(m[1]) ? dd(m[1]) : dd(m[1]) + ' ' + year; else if (m[3] && m[3].img) add(m[3], day, s.title ? 'переписка' : ''); }); }
      });
    });
    return out;
  }
  function albumScreen() {
    const ov = el('div', 'ov ovAlb'), ph = photos();
    ov.appendChild(el('h2', null, 'АЛЬБОМ'));
    ov.appendChild(el('div', 'sub', ph.length + ' фото'));
    const sc = el('div', 'scroll'), wall = el('div'); wall.id = 'wall';
    ph.forEach((p, i) => {
      const f = el('div', 'pol'); const rz = ((i * 37) % 11 - 5) * 0.9; f.style.transform = 'rotate(' + rz + 'deg)';
      const im = el('div', 'im'), img = el('img'); img.src = p.img; img.alt = ''; if (p.rot) img.className = 'rot'; if (p.crop && p.crop[1]) img.style.objectPosition = p.crop[1]; im.appendChild(img); f.appendChild(im);
      f.appendChild(el('u', null, p.date)); f.appendChild(el('s', null, p.cap || p.place || ''));
      f.onclick = () => {
        const lb = el('div', 'ov'); lb.id = 'lb'; const big = el('img'); big.src = p.img; if (p.rot) big.className = 'rot'; lb.appendChild(big);
        lb.appendChild(el('p', null, p.date + (p.cap ? ' — ' + p.cap : p.place ? ' — ' + p.place : ''))); lb.onclick = () => lb.remove(); $('app').appendChild(lb);
      };
      wall.appendChild(f);
    });
    sc.appendChild(wall); ov.appendChild(sc);
    const bar = el('div', 'bar'), back = el('button', 'mb main', 'Назад'); back.style.minWidth = '200px'; back.onclick = () => ov.remove(); bar.appendChild(back); ov.appendChild(bar);
    $('app').appendChild(ov);
  }

  // ---------- финал ----------
  let voiceOk = false;
  fetch('audio/voice.m4a', { method: 'HEAD' }).then(r => { voiceOk = r.ok && /audio|octet/.test(r.headers.get('content-type') || 'audio'); }).catch(() => {});
  function finale(cb) {
    st.done = true; persist();
    const ov = el('div', 'ov'); ov.id = 'fin';
    ov.appendChild(el('h2', null, 'НАША ИСТОРИЯ'));
    ov.appendChild(el('div', 'tx', 'Продолжение пишется прямо сейчас.\nСтавлю запятую, а не точку.'));
    ov.appendChild(cdNode());
    const bt = el('div', 'bt');
    const btn = (txt, fn, main) => { const b = el('button', 'mb' + (main ? ' main' : ''), txt); b.onclick = fn; bt.appendChild(b); return b; };
    if (voiceOk) { let au = null; btn('▶ Голос Димы', function () { if (!au) au = new Audio('audio/voice.m4a'); if (au.paused) { au.play().catch(() => {}); this.textContent = '❚❚ Голос Димы'; } else { au.pause(); this.textContent = '▶ Голос Димы'; } }, true); }
    btn('Альбом', albumScreen);
    if (ACH_ON) btn('Достижения', achScreen);
    btn('В меню', () => { ov.remove(); cb(); });
    ov.appendChild(bt); $('app').appendChild(ov);
  }

  // ---------- меню ----------
  function menu(finished) {
    const sub = $('menuSub'); if (sub && !$('cd')) sub.parentNode.insertBefore(cdNode(), sub.nextSibling);
    const b = $('menuBtns'); if (!b) return;
    const add = (txt, fn) => { const e = el('button', 'mb', txt); e.onclick = fn; b.insertBefore(e, b.lastChild); };
    if (ACH_ON) add('Достижения ' + Object.keys(st.ach).length + ' / ' + ACH.length, achScreen);
    if (st.done) add('Альбом', albumScreen);
  }

  // ---------- шаги ----------
  function stepEnd(ch, s) {
    const last = STORY[ch].steps.length - 1;
    ACH.forEach(a => { if (a.ch === ch && (a.s === s || (a.s === -1 && s === last))) unlock(a); });
  }

  // ---------- прогулки за руку: с Шанхая герои идут рядом ----------
  const HOLD_FROM = 26;
  const holding = (S, a, pl) => S.ch >= HOLD_FROM && !a.hidden && S.actors.d && S.actors.o && S.actors.d.pose !== 'hug';
  function afterActors(ctx, env, S, GY) {
    if (S.ch < HOLD_FROM || !S.actors || !S.actors.d || !S.actors.o || S.mode === 'dialog' && false) return;
    const pl = S.actors[S.player]; if (!pl) return;
    for (const k in S.actors) {
      const a = S.actors[k]; if (k === S.player || !a.follow || a.hidden || pl.hidden) continue;
      if (a.pose === 'hug' || pl.pose === 'hug' || a.pose === 'sit' || pl.pose === 'sit') continue;
      const dx = pl.x - a.x; if (Math.abs(dx) > 16 || Math.abs(dx) < 4) continue;
      // руки рядом, как у пары: вместе идут, над ними иногда всплывает маленькое сердечко
      const ph = (S.t * 0.22) % 1, mid = (a.x + pl.x) / 2 - env.cam, sp = S.step.slope, sl = sp ? -Math.round(Math.max(0, sp.down ? sp.x + sp.len - a.x : a.x - sp.x) * sp.k) : 0;
      if (a.moving || pl.moving) { ctx.globalAlpha = Math.sin(ph * Math.PI) * 0.95; A.heart(Math.round(mid), Math.round(GY + sl - 36 - ph * 9), '#ff9ac0', 1); ctx.globalAlpha = 1; }
    }
  }

  window.FX = { menu, stepEnd, finale, holding, afterActors, unlock, ACH, state: () => st, album: albumScreen, achievements: achScreen, countdown: cdText };
})();
