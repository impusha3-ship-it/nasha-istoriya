// ===== art2.js — детальные персонажи на сетке 0.5 (холст игры в 2× разрешении) =====
// Переопределяет A.person, A.face, A.cat, A.dog. Рост, ширина, точка опоры и возвращаемое значение — как в art.js.
(() => {
  const OL = '#1b1730';                       // цвет обводки
  const pc = {};
  const rgb = c => { if (pc[c]) return pc[c]; const m = /^#([0-9a-f]{3,8})$/i.exec(c || ''); let v = [128, 128, 128]; if (m) { let h = m[1]; if (h.length < 6) h = h.split('').map(x => x + x).join(''); v = [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; } return pc[c] = v; };
  // k<0 — темнее, k>0 — светлее
  const sh = (c, k) => { const key = c + '|' + k; if (pc[key]) return pc[key]; const v = rgb(c), t = k < 0 ? 0 : 255, a = Math.abs(k); return pc[key] = '#' + v.map(x => Math.round(x + (t - x) * a).toString(16).padStart(2, '0')).join(''); };
  const lum = c => { const v = rgb(c); return 0.3 * v[0] + 0.59 * v[1] + 0.11 * v[2]; };
  const isDima = cfg => cfg.glasses === '#d9b860' && cfg.hairStyle === 'short';
  const isGirl = cfg => cfg.hairStyle === 'long' || cfg.hairStyle === 'bob' || cfg.hairStyle === 'tail';

  // список прямоугольников: сначала обводка всех «основных» частей, затем заливка по порядку
  function mk(g, cx, cy, flip, ex) {
    const L = [];
    const P = (dx, dy, w, h, col, o = 1) => { if (!col) return; L.push([flip ? cx - dx - w : cx + dx, cy + dy, w, h, col, o]); };
    const fin = () => {
      g.fillStyle = OL;
      for (const q of L) if (q[5]) g.fillRect(q[0] - ex, q[1] - ex, q[2] + 2 * ex, q[3] + 2 * ex);
      for (const q of L) { g.fillStyle = q[4]; g.fillRect(q[0], q[1], q[2], q[3]); }
    };
    return { P, fin };
  }

  // ===================== Персонаж =====================
  function person(cx, fy, cfg, pose = 'stand', t = 0, flip = false, opt = {}) {
    const g = A.ctx;
    const skin = cfg.skin || '#f2c9a5', sk2 = cfg.skin2 || sh(skin, -0.12);
    const hair = cfg.hair || '#3a2a22', hl = sh(hair, 0.28), hd = sh(hair, -0.3);
    const body = cfg.coat || cfg.top || '#4a6fa5';
    const bottom = cfg.bottom || '#2a2547';
    const shoes = cfg.shoes || '#14122b';
    const bare = (cfg.bottomType === 'skirt' || cfg.bottomType === 'dress' || cfg.bottomType === 'shorts');
    const legsCol = bare ? (cfg.legs || skin) : bottom;
    const dima = isDima(cfg), girl = isGirl(cfg);
    let bobY = 0, la = 0, lb = 0, armA = 0, armB = 0;
    if (pose === 'walk') { const f = Math.floor(t * 8) % 4; bobY = (f === 1 || f === 3) ? -1 : 0; la = [0, 2, 0, -2][f]; lb = -la; armA = [0, -1, 0, 1][f]; armB = -armA; }
    else if (pose === 'stand') { bobY = Math.sin(t * 2 + (cfg.phase || 0)) > 0.7 ? 1 : 0; }
    const sit = pose === 'sit';
    const top = (sit ? -22 : -27) + (pose === 'walk' ? bobY : 0);
    const br = pose === 'stand' ? bobY : 0;
    const ty = top + 10 + br, th = sit ? 9 : 9 - br;

    // мягкая тень под ногами
    g.globalAlpha = 1;
    g.fillStyle = 'rgba(0,0,0,0.10)'; g.fillRect(cx - 7, fy - 0.5, 14, 1.5);
    g.fillStyle = 'rgba(0,0,0,0.13)'; g.fillRect(cx - 5.5, fy - 0.5, 11, 1);
    g.fillStyle = 'rgba(0,0,0,0.16)'; g.fillRect(cx - 4, fy - 0.5, 8, 0.5);

    const { P, fin } = mk(g, cx, fy, flip, 0.5);
    const sole = lum(shoes) < 70 ? '#7a7490' : sh(shoes, -0.35);
    const shoe = (dx, dy) => { P(dx, dy, 4.5, 1, shoes); P(dx, dy + 0.5, 4.5, 0.5, sole, 0); P(dx + 1, dy, 1, 0.5, sh(shoes, 0.25), 0); };

    // --- волосы сзади ---
    if (cfg.hairStyle === 'long') {
      for (let i = 0; i < 14; i++) {
        const w1 = i > 4 ? Math.round(Math.sin(i * 0.85) * 1) / 2 : 0, w2 = i > 4 ? Math.round(Math.sin(i * 0.85 + 1.7) * 1) / 2 : 0;
        const taper = i > 11 ? (i - 11) * 0.5 : 0;
        P(-5 - w1 + taper, top + 2 + i, 10 + w1 + w2 - taper * 2, 1, hair);
      }
      for (let i = 2; i < 13; i += 3) { P(-3.5, top + 2 + i, 0.5, 2, hd, 0); P(-1.5, top + 3 + i, 0.5, 2, hd, 0); }
      P(-4.5, top + 5, 0.5, 2, hl, 0); P(-4, top + 9, 0.5, 2, hl, 0); P(-4.5, top + 12, 0.5, 1.5, hl, 0);
    } else if (cfg.hairStyle === 'bob') {
      for (let i = 0; i < 8; i++) { const tp = i > 6 ? 0.5 : 0; P(-5 + tp, top + 2 + i, 10 - tp * 2, 1, hair); }
      P(-3.5, top + 5, 0.5, 3, hd, 0); P(-1, top + 6, 0.5, 2, hd, 0); P(-4.5, top + 4, 0.5, 2, hl, 0);
    } else if (cfg.hairStyle === 'tail') {
      P(-6, top + 4, 2, 7, hair); P(-7, top + 6, 1, 4, hair); P(-6, top + 4, 2, 1, cfg.bow || sh(hair, -0.5), 0); P(-5.5, top + 6, 0.5, 3, hl, 0);
    }

    // --- ноги ---
    if (sit) {
      P(-1, -6, 7, 3, legsCol === skin ? skin : bottom); P(-1, -3.5, 7, 0.5, sh(legsCol === skin ? skin : bottom, -0.22), 0);
      P(5, -5, 2, 5, legsCol); P(5, -5, 0.5, 5, sh(legsCol, -0.2), 0); P(5, -1, 3.5, 1, shoes); P(5, -0.5, 3.5, 0.5, sole, 0);
    } else {
      const lh = 9;
      const l1x = -3 + (la > 0 ? 1 : 0), l2x = 1 + (lb > 0 ? 1 : 0), l1h = lh - 1 - (la < 0 ? 1 : 0), l2h = lh - 1 - (lb < 0 ? 1 : 0);
      const leg = (x, h) => { P(x, -lh, 3, h, legsCol); P(x, -lh, 0.5, h, sh(legsCol, -0.22), 0); if (legsCol !== skin) { P(x + 1, -5, 1.5, 0.5, sh(legsCol, -0.18), 0); P(x + 2.5, -lh + 1, 0.5, h - 2, sh(legsCol, 0.12), 0); } else P(x + 2.5, -lh + 1, 0.5, h - 2, sh(skin, 0.12), 0); };
      leg(l1x, l1h); leg(l2x, l2h);
      shoe(l1x, -1 - (la < 0 ? 1 : 0)); shoe(l2x, -1 - (lb < 0 ? 1 : 0));
      if (cfg.bottomType === 'shorts') { P(-3, -lh, 3, 3, bottom); P(1, -lh, 3, 3, bottom); }
    }

    // --- корпус ---
    P(-4, ty, 8, th, body);
    P(-4, ty, 1, th, sh(body, -0.2), 0);                 // тень с тыльной стороны
    P(3.5, ty + 1, 0.5, th - 2, sh(body, 0.15), 0);      // свет спереди
    P(-4, ty + th - 0.5, 8, 0.5, sh(body, -0.28), 0);    // низ
    const quilted = cfg.coat && cfg.coatLen === 'long' && !cfg.spots;
    if (quilted && !sit) { for (let k = ty + 2.5; k < ty + th + 3; k += 2.5) P(-4, k, 8, 0.5, sh(body, -0.2), 0), P(-4, k + 0.5, 8, 0.5, sh(body, 0.1), 0); }
    else if (!cfg.spots) { P(-2, ty + 5, 0.5, 3, sh(body, -0.16), 0); P(1.5, ty + 4, 0.5, 4, sh(body, -0.12), 0); }
    if (cfg.top && cfg.coat && !cfg.closed) { P(-1, ty, 2, th, cfg.top); P(-1.5, ty, 0.5, th, sh(cfg.coat, -0.35), 0); P(1, ty, 0.5, th, sh(cfg.coat, -0.35), 0); }
    if (cfg.print) { P(-2, ty + 2, 3, 3, cfg.print, 0); P(-1.5, ty + 2.5, 2, 2, sh(cfg.print, -0.12), 0); P(-1, ty + 3, 0.5, 0.5, sh(cfg.print, 0.3), 0); }
    if (cfg.spots) {
      const sp2 = cfg.spots2 || cfg.spots;
      const rose = (x, y) => { P(x, y, 1, 0.5, cfg.spots, 0); P(x, y + 0.5, 0.5, 1, cfg.spots, 0); P(x + 0.5, y + 0.5, 0.5, 0.5, sp2, 0); P(x + 0.5, y + 1, 1, 0.5, cfg.spots, 0); };
      [[-4, 0], [-1.5, 0.5], [1, 0], [3, 1], [-3.5, 3], [-0.5, 3], [2, 3.5], [-4, 6], [-1, 6], [3, 6.5], [1, 8], [-3, 8.5]].forEach(s => { if (s[1] + 1.5 <= th + 0.5) rose(s[0], ty + s[1]); });
      if (cfg.coatLen === 'long' && !sit) [[-3, 10], [1, 10.5], [-4.5, 12], [3, 12], [-1, 12.5]].forEach(s => rose(s[0], ty + s[1]));
    }
    // юбка / платье / длинная одежда
    if (!sit) {
      if (cfg.bottomType === 'skirt') { P(-4, ty + th - 1, 8, 2, bottom); const h = cfg.skirtLen || 3; P(-5, ty + th + 1, 10, h, bottom); for (let x = -4; x < 4; x += 2.5) P(x, ty + th + 1, 0.5, h, sh(bottom, -0.2), 0); P(-5, ty + th + h, 10, 0.5, sh(bottom, -0.3), 0); }
      if (cfg.bottomType === 'dress') { const col = cfg.coat ? bottom : (cfg.top || bottom), h = cfg.skirtLen || 4; P(-4, ty + th - 1, 8, 2, col); P(-5, ty + th + 1, 10, h, col); for (let x = -4; x < 4; x += 2.5) P(x, ty + th + 1, 0.5, h, sh(col, -0.2), 0); P(-5, ty + th + h, 10, 0.5, sh(col, -0.3), 0); P(-4, ty + th - 1.5, 8, 0.5, sh(col, -0.3), 0); }
      if (cfg.coat && cfg.coatLen === 'long') {
        P(-4, ty + th, 8, 4, cfg.coat); P(-5, ty + th + 2, 10, 2, cfg.coat);
        P(-4, ty + th, 1, 4, sh(cfg.coat, -0.2), 0); P(-5, ty + th + 2, 1, 2, sh(cfg.coat, -0.2), 0);
        P(-5, ty + th + 3.5, 10, 0.5, sh(cfg.coat, -0.3), 0);
        if (quilted) { P(-5, ty + th + 1.5, 10, 0.5, sh(body, -0.2), 0); P(0.5, ty + th, 0.5, 4, sh(body, -0.22), 0); }
        else { P(-5, ty + th + 3, 10, 0.5, sh(cfg.coat, 0.2), 0); P(0.5, ty + th, 0.5, 4, sh(cfg.coat, -0.25), 0); }
        if (cfg.top && !cfg.closed) P(-1, ty + th, 2, 4, legsCol === skin ? (cfg.bottom || cfg.top) : bottom);
      }
    } else if (cfg.bottomType === 'skirt' || cfg.bottomType === 'dress') { const col = cfg.bottomType === 'dress' && !cfg.coat ? (cfg.top || bottom) : bottom; P(-4, -8, 9, 3, col); P(-4, -5.5, 9, 0.5, sh(col, -0.28), 0); }
    // леопардовая шуба чуть длиннее
    if (cfg.coat && cfg.spots && cfg.coatLen !== 'long' && !sit) {
      const sp2 = cfg.spots2 || cfg.spots;
      P(-4, ty + th, 8, 3, cfg.coat); P(-5, ty + th + 1.5, 10, 2, cfg.coat);
      P(-4, ty + th, 1, 3, sh(cfg.coat, -0.2), 0); P(-5, ty + th + 1.5, 1, 2, sh(cfg.coat, -0.2), 0);
      [[-3, 0.2], [1, 0.8], [-4.5, 2.2], [3, 2.2], [-0.5, 2.4]].forEach(s => { P(s[0], ty + th + s[1], 1, 0.5, cfg.spots, 0); P(s[0], ty + th + s[1] + 0.5, 0.5, 1, cfg.spots, 0); P(s[0] + 0.5, ty + th + s[1] + 0.5, 0.5, 0.5, sp2, 0); });
      P(-5, ty + th + 3.5, 10, 0.5, sh(cfg.coat, 0.25), 0); P(0.5, ty + th, 0.5, 3.5, sh(cfg.coat, -0.25), 0);
    }
    // застёжка / воротник
    if (cfg.coat && cfg.closed) {
      P(1.5, ty + 0.5, 0.5, th - 0.5, sh(cfg.coat, -0.42), 0);
      if (quilted) { P(1.5, ty + 2, 0.5, 0.5, '#d8dde8', 0); P(1.5, ty + 5, 0.5, 0.5, '#d8dde8', 0); }
      else { P(1, ty + 2.5, 0.5, 0.5, '#2b1a18', 0); P(1, ty + 5, 0.5, 0.5, '#2b1a18', 0); }
      P(-3.5, ty, 7, 1, sh(cfg.coat, 0.2), 0);                // воротник
      if (cfg.spots) { P(-3.5, ty, 7, 0.5, sh(cfg.coat, 0.35), 0); P(-1.5, ty + 0.5, 0.5, 0.5, cfg.spots, 0); P(1, ty + 0.5, 0.5, 0.5, cfg.spots, 0); }
    } else { P(-3, ty, 6, 0.5, sh(body, 0.22), 0); P(-1, ty, 2, 1, skin, 0); P(-1, ty + 0.5, 2, 0.5, sk2, 0); }

    // --- руки ---
    const sl = cfg.sleeves || body;
    const sleeve = (dx, dy, w, h) => { P(dx, dy, w, h, sl); P(dx, dy, 0.5, h, sh(sl, -0.22), 0); P(dx + w - 0.5, dy + 1, 0.5, h - 2, sh(sl, 0.12), 0); P(dx, dy + h - 0.5, w, 0.5, sh(sl, -0.3), 0); };
    const hand = (dx, dy, w, h) => { P(dx, dy, w, h, skin); P(dx, dy + h - 0.5, w, 0.5, sk2, 0); P(dx + w - 0.5, dy, 0.5, 0.5, sh(skin, 0.18), 0); };
    if (pose === 'hug') { sleeve(3, ty + 1, 5, 2); hand(7, ty + 1, 1.5, 2); sleeve(-5, ty, 2, 6); hand(-5, ty + 6, 2, 1); }
    else if (pose === 'wave') { const w = Math.floor(t * 6) % 2; sleeve(4, ty - 4 + w, 2, 6); hand(4, ty - 6 + w, 2, 2); sleeve(-5, ty, 2, 7); hand(-5, ty + 7, 2, 1); }
    else if (pose === 'hold') { sleeve(3, ty + 2, 4, 2); hand(6, ty + 2, 2, 2); sleeve(-5, ty, 2, 7); hand(-5, ty + 7, 2, 1); }
    else { sleeve(-5, ty + (armA > 0 ? 1 : 0), 2, 7); hand(-5, ty + 7 + (armA > 0 ? 1 : 0), 2, 1); sleeve(3, ty + (armB > 0 ? 1 : 0), 2, 7); hand(3, ty + 7 + (armB > 0 ? 1 : 0), 2, 1); }
    if (cfg.spots && pose !== 'hug' && pose !== 'wave' && pose !== 'hold') { P(-5, ty + 2, 1, 0.5, cfg.spots, 0); P(-4.5, ty + 5, 1, 0.5, cfg.spots, 0); P(4, ty + 1, 1, 0.5, cfg.spots, 0); P(3, ty + 4, 1, 0.5, cfg.spots, 0); P(-4.5, ty + 3.5, 0.5, 0.5, cfg.spots2 || cfg.spots, 0); }
    if (cfg.bag) { P(-6, ty + 5, 3, 4, cfg.bag); P(-6, ty + 5, 3, 1, sh(cfg.bag, -0.25), 0); P(-4.5, ty + 6, 0.5, 0.5, '#e8c860', 0); P(-5, ty, 1, 5, cfg.bag); P(-5, ty, 0.5, 5, sh(cfg.bag, -0.25), 0); }
    if (cfg.backpack) { P(-7, ty + 1, 3, 7, cfg.backpack); P(-7, ty + 1, 0.5, 7, sh(cfg.backpack, -0.25), 0); P(-6.5, ty + 4.5, 2, 2, sh(cfg.backpack, -0.15), 0); P(-6, ty + 5, 1, 0.5, sh(cfg.backpack, 0.3), 0); }
    // шарф
    if (cfg.scarf) { P(-4, ty - 1, 8, 2, cfg.scarf); P(-4, ty + 1, 2, 4, cfg.scarf); P(-4, ty - 0.5, 8, 0.5, sh(cfg.scarf, 0.2), 0); P(-3.5, ty + 1.5, 0.5, 3, sh(cfg.scarf, -0.22), 0); P(-4, ty + 4.5, 2, 0.5, sh(cfg.scarf, -0.3), 0); }

    // --- голова ---
    P(-2.5, top + 9, 5, 2, sk2);                                  // шея
    P(-4, top + 2.5, 8, 7, skin); P(-3.5, top + 2, 7, 0.5, skin); P(-3.5, top + 9.5, 7, 0.5, sk2);   // скруглённая голова
    P(-4, top + 6, 0.5, 3, sh(skin, -0.07), 0);
    if (cfg.hairStyle !== 'long' && cfg.hairStyle !== 'bob') { P(-4.5, top + 5, 1, 2, skin); P(-4, top + 5.5, 0.5, 1, sk2, 0); }   // ухо
    P(4, top + 6.5, 0.5, 1, skin);                                // нос выступает
    P(2.5, top + 7, 1, 0.5, sk2, 0); P(3.5, top + 6.5, 0.5, 0.5, sh(skin, 0.16), 0);
    if (cfg.beard) { P(-2, top + 7, 6, 3, cfg.beard); P(3, top + 5, 1, 3, cfg.beard); }
    // лицо
    const blink = (Math.floor(t * 1.3 + (cfg.phase || 0)) % 5 === 0) && ((t * 1.3 + (cfg.phase || 0)) % 1 < 0.12);
    const iris = cfg.eye || (dima ? '#6f93ad' : girl ? '#5a4a60' : '#3a3050'), lash = '#1b1830';
    const brow = cfg.brow || (lum(hair) > 70 ? sh(hair, -0.55) : hair);
    const by = cfg.glasses ? top + 3.5 : top + 4;
    P(-0.5, by, 1.5, 0.5, brow, 0); P(2.5, by - (dima ? 0.5 : 0), 1.5, 0.5, brow, 0);
    if (girl) { P(-0.5, by, 0.5, 0.5, sh(brow, -0.2), 0); }
    const eye = x => {
      if (opt.closedEyes || blink) { P(x, top + 6.5, 1, 0.5, lash, 0); if (girl) P(x + 1, top + 6, 0.5, 0.5, lash, 0); }
      else { P(x, top + 5.5, 1, 0.5, lash, 0); P(x, top + 6, 1, 1, iris, 0); P(x + 0.5, top + 6.5, 0.5, 0.5, lash, 0); P(x + 0.5, top + 6, 0.5, 0.5, '#ffffff', 0); if (girl) { P(x + 1, top + 5.5, 0.5, 0.5, lash, 0); P(x - 0.5, top + 5.5, 0.5, 0.5, lash, 0); } }
    };
    eye(0); eye(3);
    if (cfg.glasses) {
      const gl = cfg.glasses, ring = lx => { P(lx + 0.5, top + 4.5, 1.5, 0.5, gl, 0); P(lx + 0.5, top + 7, 1.5, 0.5, gl, 0); P(lx, top + 5, 0.5, 2, gl, 0); P(lx + 2, top + 5, 0.5, 2, gl, 0); P(lx + 1.5, top + 5, 0.5, 0.5, '#ffffffcc', 0); };
      ring(-1); ring(2.5); P(1.5, top + 5.5, 1, 0.5, gl, 0); P(-4, top + 5, 3, 0.5, gl, 0);
    }
    if (opt.blush || cfg.blush) { P(-0.5, top + 7.5, 1.5, 1, '#ff8fa099', 0); P(3, top + 7.5, 1, 1, '#ff8fa099', 0); }
    const mc = girl ? '#c0505e' : '#a0505a';
    if (opt.smile) { P(1.5, top + 8, 0.5, 0.5, mc, 0); P(2, top + 8.5, 1.5, 0.5, mc, 0); P(3.5, top + 8, 0.5, 0.5, mc, 0); }
    else P(2, top + 8.5, 1.5, 0.5, girl ? mc : sh(sk2, -0.3), 0);

    // --- волосы спереди ---
    if (cfg.hairStyle !== 'bald') {
      const st = cfg.hairStyle;
      if (st === 'short') {
        P(-5, top + 1, 9, 2.5, hair); P(-4, top, 7, 1, hair); P(-4.5, top + 0.5, 0.5, 0.5, hair); P(-5, top + 3.5, 2, 2.5, hair); P(3, top + 2.5, 1, 1, hair); P(3.5, top + 3, 0.5, 0.5, hair);
        P(-3, top + 0.5, 4, 0.5, hl, 0); P(-1, top + 1.5, 3, 0.5, hl, 0); P(-4, top + 2, 0.5, 1.5, hd, 0); P(-2, top + 1.5, 0.5, 1.5, hd, 0); P(1, top + 2, 0.5, 1, hd, 0); P(-4.5, top + 4.5, 0.5, 1, hd, 0);
      } else if (st === 'curly') {
        P(-5, top, 10, 4, hair); P(-6, top + 2, 2, 5, hair); P(4, top + 2, 1, 3, hair); P(-4, top - 0.5, 3, 0.5, hair); P(0.5, top - 0.5, 3, 0.5, hair);
        P(-4, top + 0.5, 2, 0.5, hl, 0); P(0, top + 1, 2, 0.5, hl, 0); P(-5, top + 3, 0.5, 2, hd, 0); P(2, top + 2, 0.5, 1, hd, 0);
      } else {
        P(-5, top + 1, 9, 3, hair); P(-4, top, 7, 1, hair); P(-5, top + 3, 2, 6, hair);
        if (st === 'long' || st === 'bob') { P(4, top + 2, 1, 4, hair); P(4.5, top + 2.5, 0.5, 3, hl, 0); if (cfg.fringe) { P(-3, top + 3, 6, 1.5, hair); P(-1, top + 4.5, 2, 0.5, hair); } else P(-0.5, top + 1, 0.5, 2.5, skin, 0); }
        P(-3.5, top + 0.5, 3, 0.5, hl, 0); P(0.5, top + 1, 3, 0.5, hl, 0); P(-4.5, top + 1.5, 0.5, 5, hl, 0); P(-2.5, top + 1.5, 0.5, 2, hd, 0); P(2, top + 2, 0.5, 1.5, hd, 0); P(-4, top + 4, 0.5, 4, hd, 0);
      }
    }
    // --- шапка ---
    if (cfg.hat) {
      const h = cfg.hat, h2 = cfg.hat2 || h;
      if (cfg.hatType === 'cap') { P(-5, top, 9, 3, h); P(3, top + 2, 4, 1, h); P(3, top + 2.5, 4, 0.5, sh(h, -0.3), 0); P(-3, top + 0.5, 5, 0.5, sh(h, 0.2), 0); P(-1, top - 0.5, 1, 0.5, h); }
      else if (cfg.hatType === 'ears') { P(-5, top - 1, 10, 4, h); P(-5, top - 3, 2, 2, h); P(3, top - 3, 2, 2, h); P(-4.5, top - 2.5, 1, 1.5, '#f2a0b0', 0); P(3.5, top - 2.5, 1, 1.5, '#f2a0b0', 0); P(-3, top - 0.5, 5, 0.5, sh(h, 0.2), 0); }
      else if (cfg.hatType === 'hood') { P(-5, top, 10, 4, h); P(-6, top + 2, 2, 8, h); P(-6, top + 2, 0.5, 8, sh(h, -0.25), 0); P(-3, top + 0.5, 5, 0.5, sh(h, 0.2), 0); P(-4, top + 3.5, 8, 0.5, sh(h, -0.3), 0); }
      else {   // вязаная шапка с помпоном
        P(-5, top, 10, 4, h); P(-4, top - 1, 8, 1, h); P(-1.5, top - 3.5, 3, 2.5, h2); P(-1, top - 3, 1, 0.5, sh(h2, 0.2), 0); P(0.5, top - 2, 1, 0.5, sh(h2, -0.15), 0);
        P(-5, top + 3, 10, 1, h2);
        for (let x = -4.5; x < 4.5; x += 1) P(x, top + 3, 0.5, 1, sh(h2, -0.1), 0);
        for (let x = -4; x < 4; x += 1.5) { P(x, top + 0.5, 0.5, 2, sh(h, -0.08), 0); }
        P(-3.5, top - 0.5, 3, 0.5, sh(h, 0.2), 0); P(-4.5, top + 0.5, 0.5, 2.5, sh(h, -0.18), 0);
      }
    }
    if (cfg.headphones) { P(-5, top + 4, 2, 4, cfg.headphones); P(-4, top - 1, 8, 1, cfg.headphones); P(-5, top + 4, 0.5, 4, sh(cfg.headphones, 0.25), 0); }
    if (cfg.bow) { P(-6, top + 1, 2, 2, cfg.bow); P(-4, top + 2, 1, 1, cfg.bow); P(-5.5, top + 1.5, 0.5, 0.5, sh(cfg.bow, 0.3), 0); }
    if (cfg.crown) { P(-4, top - 2, 8, 2, cfg.crown); P(-4, top - 3, 1, 1, cfg.crown); P(-1, top - 3, 2, 1, cfg.crown); P(3, top - 3, 1, 1, cfg.crown); P(-3, top - 1.5, 6, 0.5, sh(cfg.crown, 0.35), 0); }
    fin();
    return top;
  }

  // ===================== Портрет 32×32 =====================
  // настоящие лица из меню: Дима (img/dima.webp) и Оля (img/dress.jpg)
  const PH = { d: { src: 'img/dima_k.webp', crop: [1075, 238, 330, 330] }, o: { src: 'img/dress.jpg', crop: [0, 190, 588, 588] } };
  Object.values(PH).forEach(p => { p.img = new Image(); p.img.src = p.src; });
  function photoFace(canvas, who) {
    const p = PH[who]; if (!p || !p.img.complete || !p.img.naturalWidth) return false;
    canvas.width = canvas.height = 128;
    const g = canvas.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.fillStyle = '#2a2547'; g.fillRect(0, 0, 128, 128); g.drawImage(p.img, p.crop[0], p.crop[1], p.crop[2], p.crop[3], 0, 0, 128, 128);
    return true;
  }
  function face(canvas, cfg) {
    const who = cfg.__who || (isDima(cfg) ? 'd' : (cfg.hairStyle === 'long' && cfg.hair === '#b3261e') ? 'o' : null);
    if (who && photoFace(canvas, who)) return;
    if (canvas.width !== 32) { canvas.width = 32; canvas.height = 32; }
    const g = canvas.getContext('2d'); g.imageSmoothingEnabled = false;
    const Wd = canvas.width;
    g.setTransform(Wd / 32, 0, 0, Wd / 32, 0, 0);
    g.clearRect(0, 0, 32, 32);
    const bg = cfg.bg || '#2a2547';
    g.fillStyle = bg; g.fillRect(0, 0, 32, 32);
    g.fillStyle = sh(bg, 0.07); g.fillRect(0, 0, 32, 14); g.fillStyle = sh(bg, 0.04); g.fillRect(0, 14, 32, 6);
    const skin = cfg.skin || '#f2c9a5', sk2 = cfg.skin2 || sh(skin, -0.12), sk3 = sh(skin, -0.22);
    const hair = cfg.hair || '#3a2a22', hl = sh(hair, 0.3), hd = sh(hair, -0.3);
    const body = cfg.coat || cfg.top || '#4a6fa5';
    const dima = isDima(cfg), girl = isGirl(cfg);
    const { P, fin } = mk(g, 0, 0, false, 1);
    const row = (y, x0, x1, col, o = 1) => P(x0, y, x1 - x0, 1, col, o);

    // плечи
    const sdim = sh(body, -0.2);
    row(25, 8, 24, body); row(26, 5, 27, body); for (let y = 27; y < 32; y++) row(y, 3, 29, body);
    P(3, 27, 2, 5, sdim, 0); P(27, 27, 2, 5, sh(body, -0.12), 0); P(5, 26, 1, 1, sdim, 0);
    const quilted = cfg.coat && cfg.coatLen === 'long' && !cfg.spots;
    if (quilted) { P(3, 29, 26, 1, sh(body, -0.2), 0); P(3, 30, 26, 1, sh(body, 0.1), 0); }
    if (cfg.coat && cfg.closed) { P(16, 26, 1, 6, sh(cfg.coat, -0.4), 0); P(17, 28, 1, 1, '#d8dde8', 0); P(17, 31, 1, 1, '#d8dde8', 0); }
    else if (cfg.top && cfg.coat) { P(12, 25, 8, 7, cfg.top, 0); P(11, 26, 1, 6, sdim, 0); P(20, 26, 1, 6, sdim, 0); }
    if (cfg.print) { P(12, 27, 8, 5, cfg.print, 0); P(13, 28, 6, 3, sh(cfg.print, -0.12), 0); P(14, 28, 1, 1, sh(cfg.print, 0.3), 0); }
    if (cfg.spots) {
      const sp2 = cfg.spots2 || cfg.spots;
      for (let i = 0; i < 17; i++) { const x = 4 + ((i * 7) % 24), y = 26 + ((i * 5) % 6); P(x, y, 2, 1, cfg.spots, 0); P(x, y + 1, 1, 1, cfg.spots, 0); P(x + 1, y + 1, 1, 1, sp2, 0); }
    }
    // длинные волосы позади (волной)
    if (cfg.hairStyle === 'long') {
      for (let y = 8; y < 32; y++) { const w = Math.round(Math.sin(y * 0.55) * 1.4); P(5 - w, y, 22 + w * 2 - 0, 1, hair); }
      for (let y = 12; y < 32; y += 4) { P(7, y, 1, 3, hd, 0); P(24, y + 1, 1, 3, hd, 0); }
      for (let y = 10; y < 30; y += 5) { P(6, y, 1, 2, hl, 0); P(25, y + 2, 1, 2, hl, 0); }
    } else if (cfg.hairStyle === 'bob') { for (let y = 8; y < 24; y++) { const tp = y > 21 ? 1 : 0; P(6 + tp, y, 20 - tp * 2, 1, hair); } P(7, 14, 1, 6, hd, 0); }
    else if (cfg.hairStyle === 'tail') { P(23, 10, 5, 11, hair); P(26, 14, 3, 6, hair); P(23, 10, 5, 2, cfg.bow || hd, 0); }
    // шея и воротник
    P(13, 21, 6, 6, sk2); P(13, 22, 6, 1, sk3, 0);
    if (cfg.coat && cfg.closed) { P(9, 23, 14, 4, sh(cfg.coat, 0.14)); P(9, 26, 14, 1, sh(cfg.coat, -0.2), 0); P(15, 23, 2, 4, sh(cfg.coat, -0.35), 0); if (cfg.spots) { for (let x = 9; x < 23; x += 2) P(x, 23, 1, 1, cfg.spots, 0); } }
    else { P(10, 25, 12, 1, sh(body, 0.18), 0); P(13, 24, 6, 2, skin, 0); P(14, 25, 4, 1, sk2, 0); }
    if (cfg.scarf) { P(7, 23, 18, 4, cfg.scarf); P(7, 27, 6, 5, cfg.scarf); P(7, 23, 18, 1, sh(cfg.scarf, 0.2), 0); for (let x = 8; x < 24; x += 3) P(x, 25, 1, 2, sh(cfg.scarf, -0.2), 0); }
    // голова
    const hrow = [[10, 22], [9, 23], [8, 24], [8, 24], [8, 24], [8, 24], [8, 24], [8, 24], [8, 24], [8, 24], [8, 24], [8, 24], [8, 24], [8, 24], [8, 24], [9, 23], [9, 23], [10, 22], [11, 21], [13, 19]];
    hrow.forEach((r, i) => row(5 + i, r[0], r[1], skin));
    row(24, 13, 19, sk2, 0); row(23, 11, 21, sk2, 0); row(22, 10, 22, sh(skin, -0.07), 0);
    P(8, 13, 1, 6, sh(skin, -0.08), 0); P(23, 12, 1, 5, sh(skin, 0.1), 0);   // объём щёк
    if (cfg.hairStyle !== 'long' && cfg.hairStyle !== 'bob') { P(7, 13, 1, 4, skin); P(8, 14, 1, 2, sk2, 0); P(24, 13, 1, 4, skin); P(24, 14, 1, 2, sk2, 0); }
    if (cfg.beard) { P(10, 18, 12, 6, cfg.beard); P(13, 18, 6, 1, sk2, 0); }
    // глаза и брови
    const iris = cfg.eye || (dima ? '#6f93ad' : girl ? '#5a4a60' : '#3a3050'), lash = '#1b1830';
    const brow = cfg.brow || (lum(hair) > 70 ? sh(hair, -0.55) : hair);
    const eyeAt = (x, side) => {
      P(x, 14, 4, 2, '#f4f0f4', 0); P(x + 1, 14, 2, 2, iris, 0); P(x + 1, 15, 2, 1, sh(iris, -0.25), 0); P(x + (side ? 2 : 1), 14, 1, 2, lash, 0);
      P(x + 2, 14, 1, 1, '#ffffff', 0); P(x, 13, 4, 1, lash, 0);
      if (girl) { P(side ? x + 4 : x - 1, 12.5, 1, 1.5, lash, 0); P(x, 16, 4, 1, '#d8a090aa', 0); }
    };
    eyeAt(10.5, 0); eyeAt(18, 1);
    const by = cfg.glasses ? 10 : 11;
    P(10, by, 5, 1, brow, 0); P(11, by - 1, 3, 1, brow, 0); P(18, by - (dima ? 1 : 0), 5, 1, brow, 0); P(19, by - 1 - (dima ? 1 : 0), 3, 1, brow, 0);
    // нос, рот, румянец
    P(15.5, 15, 1.5, 4, sk2, 0); P(15, 19, 3, 1, sk2, 0); P(16.5, 18, 1, 1, sh(skin, 0.2), 0); P(15, 19.5, 1, 1, sk3, 0);
    const mc = girl ? '#c0505e' : '#a0505a';
    P(14, 21.5, 5, 1, mc, 0); P(13, 20.5, 1, 1, mc, 0); P(19, 20.5, 1, 1, mc, 0); P(15, 22.5, 3, 1, sh(mc, 0.15), 0);
    if (cfg.blush) { P(10, 18, 3, 2, '#ff8fa077', 0); P(20, 18, 3, 2, '#ff8fa077', 0); } else { P(10, 18, 3, 1, '#ff8fa033', 0); P(20, 18, 3, 1, '#ff8fa033', 0); }
    if (cfg.glasses) {
      const gl = cfg.glasses, ring = x => { P(x + 1, 12, 5, 1, gl, 0); P(x + 1, 18, 5, 1, gl, 0); P(x, 13, 1, 5, gl, 0); P(x + 6, 13, 1, 5, gl, 0); P(x + 1, 13, 1, 1, '#ffffffcc', 0); P(x + 2, 13, 1, 1, '#ffffff66', 0); };
      ring(9); ring(17); P(15, 14, 2, 1, gl, 0); P(7, 14, 2, 1, gl, 0); P(24, 14, 1, 1, gl, 0);
    }
    // волосы
    const st = cfg.hairStyle;
    if (st !== 'bald') {
      if (st === 'short') {
        row(2, 11, 22, hair); row(3, 9, 24, hair); row(4, 8, 25, hair); row(5, 7, 26, hair); row(6, 7, 26, hair); row(7, 7, 14, hair); row(7, 17, 26, hair);
        row(8, 7, 11, hair); row(8, 19, 26, hair); P(7, 9, 2, 5, hair); P(24, 9, 2, 4, hair); P(7, 14, 1, 1, hair); P(22, 8, 2, 1, hair);
        row(3, 12, 18, hl, 0); row(4, 10, 14, hl, 0); row(4, 17, 22, hl, 0); P(11, 5, 1, 2, hd, 0); P(15, 5, 1, 2, hd, 0); P(20, 5, 1, 2, hd, 0); P(8, 8, 1, 4, hd, 0);
      } else if (st === 'curly') {
        row(1, 11, 21, hair); row(2, 8, 24, hair); row(3, 7, 25, hair); for (let y = 4; y < 9; y++) row(y, 6, 26, hair); P(5, 8, 3, 6, hair); P(24, 8, 3, 5, hair); row(9, 8, 12, hair); row(9, 20, 24, hair);
        for (let x = 8; x < 24; x += 4) { P(x, 2, 2, 1, hl, 0); P(x + 1, 5, 1, 2, hd, 0); }
      } else {   // long, bob, tail
        row(2, 11, 21, hair); row(3, 9, 23, hair); row(4, 8, 24, hair); row(5, 7, 25, hair); row(6, 7, 25, hair); row(7, 7, 25, hair);
        for (let k = 0; k < 4; k++) { row(8 + k, 7, 11 - k, hair); row(8 + k, 21 + k, 25, hair); }   // пряди сходят со лба к вискам
        P(7, 12, 3, 10, hair); P(23, 12, 3, 10, hair);
        if (cfg.fringe) { row(8, 8, 24, hair); row(9, 8, 24, hair); row(10, 8, 12, hair); row(10, 20, 24, hair); P(14, 10, 4, 1, hair); }
        else P(15, 3, 1, 6, skin, 0);                        // прямой пробор
        P(15, 3, 1, 1, sh(skin, 0.1), 0);
        row(3, 10, 15, hl, 0); row(4, 17, 22, hl, 0); row(5, 9, 13, hl, 0); P(8, 14, 1, 6, hl, 0); P(24, 14, 1, 5, hl, 0);
        P(10, 5, 1, 3, hd, 0); P(19, 5, 1, 3, hd, 0); P(8, 10, 1, 3, hd, 0); P(23, 8, 1, 4, hd, 0);
      }
    }
    // шапка
    if (cfg.hat) {
      const h = cfg.hat, h2 = cfg.hat2 || h;
      if (cfg.hatType === 'cap') { row(2, 9, 23, h); row(3, 7, 25, h); for (let y = 4; y < 9; y++) row(y, 6, 26, h); P(20, 8, 9, 2, h); P(20, 9, 9, 1, sh(h, -0.3), 0); P(10, 3, 8, 1, sh(h, 0.2), 0); P(15, 1, 2, 1, h); }
      else if (cfg.hatType === 'ears') { row(3, 8, 24, h); for (let y = 4; y < 10; y++) row(y, 6, 26, h); P(6, 0, 4, 4, h); P(22, 0, 4, 4, h); P(7, 1, 2, 3, '#f2a0b0', 0); P(23, 1, 2, 3, '#f2a0b0', 0); }
      else if (cfg.hatType === 'hood') { row(2, 9, 23, h); row(3, 7, 25, h); for (let y = 4; y < 12; y++) row(y, 5, 27, h); P(4, 12, 4, 14, h); P(24, 12, 4, 14, h); P(9, 10, 14, 2, sh(h, -0.3), 0); }
      else {
        row(3, 9, 23, h); row(4, 7, 25, h); for (let y = 5; y < 8; y++) row(y, 6, 26, h); P(6, 8, 20, 3, h2); P(13, 0, 6, 4, h2); P(14, 0, 3, 1, sh(h2, 0.2), 0); P(17, 2, 2, 1, sh(h2, -0.15), 0);
        for (let x = 7; x < 25; x += 2) P(x, 8, 1, 3, sh(h2, -0.1), 0);
        for (let x = 8; x < 24; x += 3) P(x, 4, 1, 4, sh(h, -0.08), 0); P(10, 4, 8, 1, sh(h, 0.2), 0);
      }
    }
    if (cfg.headphones) { P(5, 11, 4, 8, cfg.headphones); P(23, 11, 4, 8, cfg.headphones); P(7, 1, 18, 3, cfg.headphones); }
    if (cfg.bow) { P(5, 5, 5, 4, cfg.bow); P(9, 7, 2, 1, cfg.bow); }
    if (cfg.crown) { P(9, 0, 14, 4, cfg.crown); P(9, -1, 2, 2, cfg.crown); P(15, -1, 2, 2, cfg.crown); P(21, -1, 2, 2, cfg.crown); }
    fin();
    g.setTransform(1, 0, 0, 1, 0, 0);
  }

  // ===================== Кошка =====================
  function cat(x, gy, col, t, flip = false, sit = true, eye = '#d8e85a') {
    const g = A.ctx;
    const X = (dx, w) => flip ? x - dx - w + 1 : x + dx;
    const bl = (c1, c2, k) => { const a = rgb(c1), b = rgb(c2); return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
    const sab = col === '#c98a4b';                          // Сабля — рыжая бобтейл с коротким хвостом
    col = sab ? '#b8763c' : bl(col, '#8a6e56', 0.3);                       // Фасоль — серо-коричневая полосатая, с тёплой грудкой и лапками
    const dk = sh(col, -0.3), lt = sab ? '#f0d4b0' : bl(col, '#d0a468', 0.55), muz = sab ? '#f4e0c4' : '#d6c6ae', pink = '#e8a0b0', iris = sab ? '#b8c060' : '#c9cf3f';
    g.fillStyle = 'rgba(0,0,0,0.14)'; g.fillRect(X(-1, 9), gy - 0.5, 9, 1.5);
    const L = [];
    const P = (dx, dy, w, h, c, o = 1) => { const xx = flip ? x - dx - w + 1 : x + dx; L.push([xx, gy + dy, w, h, c, o]); };
    if (sit) {
      const tw = Math.sin(t * 3) > 0 ? 0.5 : 0;
      // хвост
      if (sab) { P(-1, -3 - tw, 2, 2, col); P(-1, -3 - tw, 0.5, 2, dk, 0); } else { P(-2, -2.5 - tw, 2.5, 1.5, col); P(-3, -4.5 - tw, 1.5, 2.5, col); P(-2.5, -5 - tw, 1, 1, col); P(-3, -3.5 - tw, 1.5, 0.5, dk, 0); }
      // туловище
      P(0, -4.5, 7, 4.5, col); P(0.5, -5, 6, 0.5, col); P(0, -4.5, 1.5, 4.5, dk, 0); P(1.5, -4, 0.5, 2, dk, 0); P(3, -4.5, 0.5, 2, dk, 0); P(2.2, -3, 0.5, 2.5, dk, 0);
      P(4.5, -3.5, 2.5, 3.5, lt, 0); P(5, -1, 2.5, 1, lt);
      for (let k = 0; k < 3; k++) P(4.8, -3.2 + k * 1.1, 2, 0.5, sh(lt, -0.18), 0);   // полоски на груди
      P(0, -0.5, 7.5, 0.5, dk, 0);
      // лапки
      P(5, -1.5, 1.5, 1.5, lt); P(3, -1, 1.5, 1, col); P(5.2, -0.5, 1, 0.5, sh(lt, 0.2), 0);
      // голова, уши, мордочка
      P(3.5, -8.8, 6, 4.3, col); P(4.5, -9.3, 4, 0.5, col); P(4, -9.8, 1.2, 1.8, col); P(8, -9.8, 1.2, 1.8, col); P(4.2, -10.8, 0.8, 1, col); P(8.4, -10.8, 0.8, 1, col);
      P(4.6, -9.6, 0.6, 1.2, pink, 0); P(8.2, -9.6, 0.6, 1.2, pink, 0); P(3.5, -5.8, 0.6, 0.6, col); P(8.9, -5.8, 0.6, 0.6, col);
      P(6, -9.2, 0.5, 1.3, dk, 0); P(7, -9.2, 0.5, 1.3, dk, 0); P(5, -9, 0.5, 1, dk, 0); P(8, -9, 0.5, 1, dk, 0);
      P(5.2, -6.8, 3, 1.6, muz, 0);
      if (sab) { P(4.4, -7.4, 1.8, 0.9, iris, 0); P(7, -7.4, 1.8, 0.9, iris, 0); P(4.4, -7.9, 1.8, 0.5, '#6a3a1a', 0); P(7, -7.9, 1.8, 0.5, '#6a3a1a', 0); P(5, -7.3, 0.6, 0.7, '#14100c', 0); P(7.6, -7.3, 0.6, 0.7, '#14100c', 0); }
      else { P(4.4, -8, 1.7, 1.7, iris, 0); P(7, -8, 1.7, 1.7, iris, 0); P(4.9, -7.7, 0.9, 1.2, '#0e0c14', 0); P(7.5, -7.7, 0.9, 1.2, '#0e0c14', 0); P(5, -7.7, 0.4, 0.4, '#ffffff', 0); P(7.6, -7.7, 0.4, 0.4, '#ffffff', 0); }
      P(6.1, -6.9, 1.2, 0.6, '#b8806a', 0); P(6.5, -6.3, 0.5, 0.5, dk, 0);
      P(9.4, -6.6, 1.5, 0.5, '#ffffff99', 0); P(9.4, -6, 1.5, 0.5, '#ffffff66', 0); P(2.5, -6.6, 1.2, 0.5, '#ffffff99', 0);
    } else {
      const s = Math.floor(t * 6) % 2;
      if (sab) P(-1.5, -5.5, 2, 2, col); else { P(-2, -6, 2, 1, col); P(-3, -7.5, 1.5, 2, col); }                       // хвост
      P(0, -5.5, 9, 3.5, col); P(0.5, -6, 8, 0.5, col); P(0, -5.5, 9, 1, dk, 0); P(2, -4.5, 0.5, 2, dk, 0); P(4, -4.5, 0.5, 2, dk, 0); P(6, -4.5, 0.5, 2, dk, 0); P(1, -3, 8, 1, lt, 0);
      P(1, -2, 1, 2 - s, col); P(3, -2, 1, 1 + s, dk); P(7, -2, 1, 1 + s, col); P(8.5, -2, 1, 2 - s, lt);   // лапы шагают
      P(7, -8.5, 5, 4.5, col); P(7, -9.5, 1, 1.5, col); P(11, -9.5, 1, 1.5, col); P(7, -10, 1, 0.5, col); P(11, -10, 1, 0.5, col); P(7.5, -9.5, 0.5, 1, pink, 0); P(11, -9.5, 0.5, 1, pink, 0);
      P(8, -9, 0.5, 1, dk, 0); P(9.5, -9, 0.5, 1, dk, 0); P(8, -7, 4, 0.5, lt, 0);
      P(9, -7, 1, 1, eye, 0); P(11, -7, 1, 1, eye, 0); P(9.5, -7, 0.5, 1, '#14122b', 0); P(11.5, -7, 0.5, 1, '#14122b', 0); P(11.5, -6, 0.5, 0.5, pink, 0);
    }
    g.fillStyle = OL; for (const q of L) if (q[5]) g.fillRect(q[0] - 0.5, q[1] - 0.5, q[2] + 1, q[3] + 1);
    for (const q of L) { g.fillStyle = q[4]; g.fillRect(q[0], q[1], q[2], q[3]); }
  }

  // ===================== Собака =====================
  function dog(x, gy, col, t, flip = false) {
    const g = A.ctx;
    const dk = sh(col, -0.3), lt = sh(col, 0.25);
    g.fillStyle = 'rgba(0,0,0,0.14)'; g.fillRect(flip ? x - 12 : x - 1, gy - 0.5, 14, 1.5);
    const L = [];
    const P = (dx, dy, w, h, c, o = 1) => { const xx = flip ? x - dx - w + 1 : x + dx; L.push([xx, gy + dy, w, h, c, o]); };
    const s = Math.floor(t * 6) % 2, wag = s ? 0 : 1;
    P(-2, -10.5 - wag, 2.5, 1.5, col); P(-3, -11 - wag, 1, 1, col);            // хвост
    P(0, -8, 11, 5, col); P(0.5, -8.5, 10, 0.5, col); P(0, -8, 11, 1, dk, 0); P(2, -7, 0.5, 2, dk, 0); P(5, -7, 0.5, 2, dk, 0); P(1, -4, 9, 1, lt, 0);   // туловище, пятна, брюхо
    P(8, -8.5, 2, 1, '#c8323c', 0);                                              // ошейник
    P(1, -3, 2, 3 - s, col); P(1, -0.5 - s, 2, 0.5, dk, 0); P(4, -3, 2, 2 + s, dk); P(8, -3, 2, 2 + s, col); P(6.5, -3, 2, 3 - s, lt);       // лапы
    P(9, -12, 6, 6, col); P(9.5, -12.5, 5, 0.5, col); P(9, -13, 2, 3, dk); P(9, -13.5, 2, 0.5, dk);        // голова и висячее ухо
    P(14, -9, 2, 2, lt); P(15.5, -9.5, 1, 1, '#14122b', 0); P(13, -10, 0.5, 1, '#14122b', 0); P(13, -10, 0.5, 0.5, '#ffffff', 0);
    P(11.5, -10.5, 0.5, 0.5, dk, 0); P(14, -7.5, 1.5, 1, '#e87a8a', wag ? 1 : 0);
    g.fillStyle = OL; for (const q of L) if (q[5]) g.fillRect(q[0] - 0.5, q[1] - 0.5, q[2] + 1, q[3] + 1);
    for (const q of L) { g.fillStyle = q[4]; g.fillRect(q[0], q[1], q[2], q[3]); }
  }

  A.person = person; A.face = face; A.cat = cat; A.dog = dog;
})();
