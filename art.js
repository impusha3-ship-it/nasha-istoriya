// ===== Пиксельные примитивы и персонажи =====
const A = (() => {
  let c = null;                       // текущий контекст
  const use = ctx => { c = ctx; };
  const r = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };
  const px = (x, y, col) => r(x, y, 1, 1, col);

  // детерминированный шум
  const rnd = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

  // небо полосами с дизерингом между ними
  function sky(W, H, cols, horizon) {
    const n = cols.length, bh = horizon / n;
    for (let i = 0; i < n; i++) {
      r(0, i * bh, W, bh + 1, cols[i]);
      if (i < n - 1) for (let x = 0; x < W; x += 2) { px(x, (i + 1) * bh - 1, cols[i + 1]); px(x + 1, (i + 1) * bh - 2 - (x % 4 ? 0 : 1), cols[i + 1]); }
    }
  }
  function stars(W, H, cam, t, n = 40, maxY = 70) {
    for (let i = 0; i < n; i++) {
      const x = ((rnd(i) * 400 - cam * 0.02) % W + W) % W, y = rnd(i + 99) * maxY;
      const tw = Math.sin(t * 2 + i) > 0.6;
      px(x, y, tw ? '#ffffff' : '#b9c4e8');
    }
  }
  function disc(cx, cy, rad, col) {
    for (let y = -rad; y <= rad; y++) { const w = Math.floor(Math.sqrt(rad * rad - y * y)); r(cx - w, cy + y, w * 2 + 1, 1, col); }
  }
  // силуэт сопок: сумма синусов
  function hills(W, cam, par, baseY, amp, col, seed = 0, H = 144) {
    for (let x = 0; x < W; x++) {
      const wx = x + cam * par + seed * 97;
      const y = baseY - (Math.sin(wx * 0.021 + seed) * 0.5 + Math.sin(wx * 0.047 + seed * 2.3) * 0.3 + Math.sin(wx * 0.009 + seed * 5) * 0.6) * amp;
      r(x, y, 1, H - y, col);
    }
  }
  // городской силуэт: панельки с окнами
  function skyline(W, cam, par, baseY, col, win, seed = 0, minH = 14, maxH = 46, lit = 0.35) {
    const cell = 22;
    const first = Math.floor((cam * par) / cell) - 1;
    for (let i = first; i < first + W / cell + 3; i++) {
      const k = i + seed * 1000;
      const bw = 12 + Math.floor(rnd(k) * 12), bh = minH + Math.floor(rnd(k + 5) * (maxH - minH));
      const x = i * cell - cam * par + rnd(k + 9) * 6;
      r(x, baseY - bh, bw, bh, col);
      if (win) for (let wy = baseY - bh + 3; wy < baseY - 3; wy += 4)
        for (let wx = 2; wx < bw - 2; wx += 3)
          if (rnd(k * 7 + wx * 13 + wy * 3) < lit) r(x + wx, wy, 1, 2, win);
    }
  }
  function sea(W, y, h, cols, t, cam = 0) {
    r(0, y, W, h, cols[0]);
    for (let i = 0; i < 40; i++) {
      const yy = y + 1 + Math.floor(rnd(i + 3) * (h - 2));
      const xx = ((rnd(i) * 500 + Math.sin(t * 0.8 + i) * 4 - cam * 0.3) % W + W) % W;
      r(xx, yy, 2 + Math.floor(rnd(i + 7) * 5), 1, cols[1 + (i % (cols.length - 1))]);
    }
  }
  function ground(W, y, H, col, top, cam = 0, speck = null) {
    r(0, y, W, H - y, col); if (top) r(0, y, W, 1, top);
    if (speck) for (let i = 0; i < 60; i++) {
      const wx = Math.floor(rnd(i) * 320), x = ((wx - cam) % 320 + 320) % 320;
      if (x < W) px(x, y + 2 + Math.floor(rnd(i + 50) * (H - y - 3)), speck);
    }
  }
  function tree(x, gy, kind = 'bare', s = 1, pal) {
    if (kind === 'bare') {
      const k = (pal && pal[0]) || '#2b2238';
      r(x, gy - 18 * s, 2, 18 * s, k);
      r(x - 4, gy - 16 * s, 4, 1, k); r(x - 5, gy - 19 * s, 1, 3, k);
      r(x + 2, gy - 13 * s, 5, 1, k); r(x + 6, gy - 17 * s, 1, 4, k);
      r(x - 2, gy - 22 * s, 1, 5, k); r(x + 2, gy - 24 * s, 1, 6, k);
      if (pal && pal[1]) { r(x - 5, gy - 20 * s, 3, 1, pal[1]); r(x + 5, gy - 18 * s, 3, 1, pal[1]); r(x + 1, gy - 25 * s, 3, 1, pal[1]); r(x - 4, gy - 17 * s, 4, 1, pal[1]); }
    } else if (kind === 'pine') {
      const g = (pal && pal[0]) || '#1f4a3a', g2 = (pal && pal[1]) || '#2f6b4f';
      r(x, gy - 4, 2, 4, '#3a2a22');
      for (let i = 0; i < 5; i++) { r(x - 1 - i, gy - 8 - (4 - i) * 4, 4 + i * 2, 4, i % 2 ? g : g2); }
      if (pal && pal[2]) for (let i = 0; i < 5; i++) r(x - 1 - i, gy - 8 - (4 - i) * 4, 4 + i * 2, 1, pal[2]);
    } else { // round / blossom
      const g = (pal && pal[0]) || '#2f6b4f', g2 = (pal && pal[1]) || '#3f8a5f';
      r(x, gy - 12, 2, 12, '#4a3428');
      disc(x + 1, gy - 17, 7, g); disc(x - 2, gy - 19, 4, g2); disc(x + 4, gy - 15, 3, g2);
    }
  }
  function lamp(x, gy, on = true, col = '#2a2547') {
    r(x, gy - 26, 1, 26, col); r(x - 2, gy - 27, 5, 1, col); r(x - 1, gy - 29, 3, 2, on ? '#ffe9a8' : '#555');
    if (on) { c.globalAlpha = 0.12; disc(x, gy - 28, 9, '#ffe9a8'); c.globalAlpha = 0.07; r(x - 10, gy - 26, 21, 26, '#ffe9a8'); c.globalAlpha = 1; }
  }
  function bench(x, gy, col = '#6b4a34') { r(x, gy - 6, 16, 2, col); r(x, gy - 11, 16, 2, col); r(x + 1, gy - 9, 1, 9, '#2b2238'); r(x + 14, gy - 9, 1, 9, '#2b2238'); }
  function sign(x, gy, w, h, bg, fg, lines) {
    r(x, gy - h, w, h, '#14122b'); r(x + 1, gy - h + 1, w - 2, h - 2, bg);
    (lines || []).forEach((ln, i) => r(x + 3, gy - h + 3 + i * 3, Math.min(w - 6, ln), 1, fg));
  }
  function box(x, y, w, h, fill, edge) { r(x, y, w, h, edge); r(x + 1, y + 1, w - 2, h - 2, fill); }
  function windowLit(x, y, w, h, on, frame = '#14122b', glow = '#ffd98a', off = '#27304d') {
    r(x, y, w, h, frame); r(x + 1, y + 1, w - 2, h - 2, on ? glow : off);
    r(x + Math.floor(w / 2), y + 1, 1, h - 2, frame);
  }
  function cat(x, gy, col, t, flip = false, sit = true, eye = '#d8e85a') {
    const f = flip ? -1 : 1; const X = (dx, w) => flip ? x - dx - w + 1 : x + dx;
    const dark = '#00000055';
    if (sit) {
      r(X(0, 7), gy - 5, 7, 5, col); r(X(4, 5), gy - 9, 5, 5, col);
      px(X(4, 1), gy - 10, col); px(X(8, 1), gy - 10, col);
      px(X(5, 1), gy - 7, eye); px(X(7, 1), gy - 7, eye);
      const tw = Math.sin(t * 3) > 0 ? 1 : 0; r(X(-2, 2), gy - 2 - tw, 2, 1, col); px(X(-3, 1), gy - 3 - tw, col);
      r(X(0, 7), gy - 1, 7, 1, dark);
    } else {
      r(X(0, 9), gy - 5, 9, 3, col); r(X(7, 5), gy - 8, 5, 4, col); px(X(7, 1), gy - 9, col); px(X(11, 1), gy - 9, col);
      px(X(9, 1), gy - 6, eye); px(X(11, 1), gy - 6, eye);
      const s = Math.floor(t * 6) % 2; r(X(1, 1), gy - 2, 1, 2 - s, col); r(X(7, 1), gy - 2, 1, 1 + s, col); r(X(3, 1), gy - 2, 1, 1 + s, col);
      r(X(-2, 2), gy - 6, 2, 1, col); px(X(-3, 1), gy - 7, col);
    }
  }
  function dog(x, gy, col, t, flip = false) {
    const X = (dx, w) => flip ? x - dx - w + 1 : x + dx;
    r(X(0, 11), gy - 8, 11, 5, col); r(X(9, 6), gy - 12, 6, 6, col); r(X(14, 2), gy - 9, 2, 2, col);
    px(X(15, 1), gy - 9, '#14122b'); px(X(12, 1), gy - 10, '#14122b'); r(X(9, 2), gy - 13, 2, 3, '#00000044');
    const s = Math.floor(t * 6) % 2; r(X(1, 2), gy - 3, 2, 3 - s, col); r(X(8, 2), gy - 3, 2, 2 + s, col);
    r(X(-2, 2), gy - 10 - s, 2, 1, col);
  }
  function heart(x, y, col = '#ff7aa8', s = 1) {
    r(x - 2 * s, y - 1 * s, 2 * s, 2 * s, col); r(x + 1 * s, y - 1 * s, 2 * s, 2 * s, col);
    r(x - 2 * s, y, 5 * s, 2 * s, col); r(x - 1 * s, y + 2 * s, 3 * s, s, col); r(x, y + 3 * s, s, s, col);
    if (s === 1) px(x - 2, y - 1, '#ffffffaa');
  }
  function bubble(x, y, kind) { // значок над головой
    box(x - 5, y - 10, 11, 9, '#f6ecd9', '#14122b'); px(x, y - 1, '#14122b'); px(x, y - 2, '#f6ecd9');
    if (kind === '!') { r(x, y - 8, 1, 3, '#e0457b'); px(x, y - 4, '#e0457b'); }
    else if (kind === '?') { r(x - 1, y - 8, 3, 1, '#3d6bd6'); px(x + 1, y - 7, '#3d6bd6'); px(x, y - 6, '#3d6bd6'); px(x, y - 4, '#3d6bd6'); }
    else if (kind === '…') { px(x - 2, y - 5, '#14122b'); px(x, y - 5, '#14122b'); px(x + 2, y - 5, '#14122b'); }
    else if (kind === '♥') { px(x - 1, y - 7, '#e0457b'); px(x + 1, y - 7, '#e0457b'); r(x - 1, y - 6, 3, 1, '#e0457b'); px(x, y - 5, '#e0457b'); }
    else if (kind === '♪') { r(x + 1, y - 8, 1, 4, '#14122b'); r(x - 1, y - 5, 2, 2, '#14122b'); px(x + 2, y - 8, '#14122b'); }
    else if (kind === 'z') { r(x - 1, y - 8, 3, 1, '#3d6bd6'); px(x, y - 7, '#3d6bd6'); px(x - 1, y - 6, '#3d6bd6'); r(x - 1, y - 5, 3, 1, '#3d6bd6'); }
  }

  // ===== Персонаж =====
  // cfg: {skin, hair, hairStyle:'short'|'long'|'bob'|'tail', top, sleeves, bottom, bottomType:'pants'|'skirt'|'dress'|'shorts',
  //       coat, coatLen:'short'|'long', hat, hatType:'beanie'|'cap'|'ears'|'hood', scarf, shoes, glasses, bag, beard, legs}
  function person(cx, fy, cfg, pose = 'stand', t = 0, flip = false, opt = {}) {
    const P = (dx, dy, w, h, col) => { if (!col) return; const x = flip ? cx - dx - w : cx + dx; r(x, fy + dy, w, h, col); };
    const skin = cfg.skin || '#f2c9a5', sk2 = cfg.skin2 || '#d9a583';
    const hair = cfg.hair || '#3a2a22';
    const body = cfg.coat || cfg.top || '#4a6fa5';
    const bottom = cfg.bottom || '#2a2547';
    const shoes = cfg.shoes || '#14122b';
    const legsCol = (cfg.bottomType === 'skirt' || cfg.bottomType === 'dress' || cfg.bottomType === 'shorts') ? (cfg.legs || skin) : bottom;
    let bobY = 0, la = 0, lb = 0, armA = 0, armB = 0;
    if (pose === 'walk') { const f = Math.floor(t * 8) % 4; bobY = (f === 1 || f === 3) ? -1 : 0; la = [0, 2, 0, -2][f]; lb = -la; armA = [0, -1, 0, 1][f]; armB = -armA; }
    else if (pose === 'stand') { bobY = Math.sin(t * 2 + (cfg.phase || 0)) > 0.7 ? 1 : 0; }
    const sit = pose === 'sit';
    const top = (sit ? -22 : -27) + (pose === 'walk' ? bobY : 0);
    const br = pose === 'stand' ? bobY : 0;           // дыхание
    // тень
    c.globalAlpha = 0.25; r(cx - 5, fy, 10, 1, '#000'); c.globalAlpha = 1;

    // волосы сзади
    if (cfg.hairStyle === 'long') P(-5, top + 2, 10, 13, hair);
    if (cfg.hairStyle === 'bob') P(-5, top + 2, 10, 8, hair);
    if (cfg.hairStyle === 'tail') { P(-6, top + 4, 2, 7, hair); P(-7, top + 6, 1, 4, hair); }

    // ноги
    if (sit) {
      P(-1, -6, 7, 3, legsCol === skin ? skin : bottom); P(5, -5, 2, 5, legsCol); P(5, -1, 3, 1, shoes);
    } else {
      const lh = 9;
      P(-3 + (la > 0 ? 1 : 0), -lh, 3, lh - 1 - (la < 0 ? 1 : 0), legsCol);
      P(1 + (lb > 0 ? 1 : 0), -lh, 3, lh - 1 - (lb < 0 ? 1 : 0), legsCol);
      P(-3 + (la > 0 ? 1 : 0), -1 - (la < 0 ? 1 : 0), 4, 1, shoes);
      P(1 + (lb > 0 ? 1 : 0), -1 - (lb < 0 ? 1 : 0), 4, 1, shoes);
      if (cfg.bottomType === 'shorts') { P(-3, -lh, 3, 3, bottom); P(1, -lh, 3, 3, bottom); }
    }
    // корпус
    const ty = top + 10 + br;
    const th = sit ? 9 : 9 - br;
    P(-4, ty, 8, th, body);
    if (cfg.top && cfg.coat && !cfg.closed) P(-1, ty, 2, th, cfg.top);          // распахнутое пальто
    if (cfg.print) P(-2, ty + 2, 3, 3, cfg.print);
    if (cfg.spots) { const sp2 = cfg.spots2 || cfg.spots; [[-4, 0], [-2, 1], [1, 0], [3, 1], [-3, 3], [0, 3], [2, 4], [-4, 5], [-1, 6], [3, 6], [1, 8], [-3, 8]].forEach((s, i) => { P(s[0], ty + s[1], 1, 1, cfg.spots); if (i % 2 === 0) P(s[0] + 1, ty + s[1], 1, 1, sp2); }); if (cfg.coatLen === 'long' && !sit) [[-3, 10], [1, 11], [-5, 12], [3, 12], [-1, 9], [-2, 12]].forEach(s => P(s[0], ty + s[1], 1, 1, cfg.spots)); }
    // юбка / платье / длинное пальто
    if (!sit) {
      if (cfg.bottomType === 'skirt') { P(-4, ty + th - 1, 8, 2, bottom); P(-5, ty + th + 1, 10, cfg.skirtLen || 3, bottom); }
      if (cfg.bottomType === 'dress') { const col = cfg.coat ? bottom : (cfg.top || bottom); P(-4, ty + th - 1, 8, 2, col); P(-5, ty + th + 1, 10, cfg.skirtLen || 4, col); }
      if (cfg.coat && cfg.coatLen === 'long') { P(-4, ty + th, 8, 4, cfg.coat); P(-5, ty + th + 2, 10, 2, cfg.coat); if (cfg.top && !cfg.closed) P(-1, ty + th, 2, 4, legsCol === skin ? (cfg.bottom || cfg.top) : bottom); }
    } else if (cfg.bottomType === 'skirt' || cfg.bottomType === 'dress') { P(-4, -8, 9, 3, cfg.bottomType === 'dress' && !cfg.coat ? (cfg.top || bottom) : bottom); }
    // руки
    const sl = cfg.sleeves || body;
    if (pose === 'hug') { P(3, ty + 1, 5, 2, sl); P(7, ty + 1, 1, 2, skin); P(-5, ty, 2, 6, sl); }
    else if (pose === 'wave') { const w = Math.floor(t * 6) % 2; P(4, ty - 4 + w, 2, 6, sl); P(4, ty - 6 + w, 2, 2, skin); P(-5, ty, 2, 7, sl); P(-5, ty + 7, 2, 1, skin); }
    else if (pose === 'hold') { P(3, ty + 2, 4, 2, sl); P(6, ty + 2, 2, 2, skin); P(-5, ty, 2, 7, sl); P(-5, ty + 7, 2, 1, skin); }
    else { P(-5, ty + (armA > 0 ? 1 : 0), 2, 7, sl); P(-5, ty + 7 + (armA > 0 ? 1 : 0), 2, 1, skin); P(3, ty + (armB > 0 ? 1 : 0), 2, 7, sl); P(3, ty + 7 + (armB > 0 ? 1 : 0), 2, 1, skin); }
    if (cfg.spots && pose !== 'hug' && pose !== 'wave' && pose !== 'hold') { P(-5, ty + 2, 1, 1, cfg.spots); P(-4, ty + 5, 1, 1, cfg.spots); P(4, ty + 1, 1, 1, cfg.spots); P(3, ty + 4, 1, 1, cfg.spots); }
    if (cfg.bag) { P(-6, ty + 5, 3, 4, cfg.bag); P(-5, ty, 1, 5, cfg.bag); }
    if (cfg.backpack) { P(-7, ty + 1, 3, 7, cfg.backpack); }
    // шарф
    if (cfg.scarf) { P(-4, ty - 1, 8, 2, cfg.scarf); P(-4, ty + 1, 2, 4, cfg.scarf); }
    // голова
    P(-4, top + 2, 8, 8, skin);
    P(-4, top + 9, 8, 1, sk2);
    if (cfg.beard) { P(-2, top + 7, 6, 3, cfg.beard); P(3, top + 5, 1, 3, cfg.beard); }
    // лицо (смотрит вправо, если не flip)
    const blink = (Math.floor(t * 1.3 + (cfg.phase || 0)) % 5 === 0) && ((t * 1.3 + (cfg.phase || 0)) % 1 < 0.12);
    if (opt.closedEyes || blink) { P(0, top + 6, 2, 1, '#14122b'); P(3, top + 6, 1, 1, '#14122b'); }
    else { P(0, top + 5, 1, 2, '#14122b'); P(3, top + 5, 1, 2, '#14122b'); }
    if (cfg.glasses) { P(-1, top + 4, 3, 1, cfg.glasses); P(2, top + 4, 3, 1, cfg.glasses); P(-1, top + 7, 3, 1, cfg.glasses); P(2, top + 7, 3, 1, cfg.glasses); P(-1, top + 5, 1, 2, cfg.glasses); P(4, top + 5, 1, 2, cfg.glasses); P(-4, top + 5, 3, 1, cfg.glasses); }
    if (opt.blush || cfg.blush) { P(-1, top + 7, 1, 1, '#ff9aa8'); P(4, top + 7, 1, 1, '#ff9aa8'); }
    if (opt.smile) { P(1, top + 8, 2, 1, '#b5485a'); }
    // волосы спереди
    if (cfg.hairStyle !== 'bald') {
      P(-5, top + 1, 9, 3, hair); P(-4, top, 7, 1, hair); P(-5, top + 3, 2, cfg.hairStyle === 'short' ? 3 : 6, hair);
      if (cfg.hairStyle === 'long' || cfg.hairStyle === 'bob') { P(4, top + 2, 1, 4, hair); if (cfg.fringe) P(-3, top + 3, 6, 1, hair); }
      if (cfg.hairStyle === 'short') P(3, top + 2, 1, 2, hair);
      if (cfg.hairStyle === 'curly') { P(-5, top, 10, 4, hair); P(-6, top + 2, 2, 5, hair); P(4, top + 2, 1, 3, hair); px(flip ? cx + 3 : cx - 4, fy + top - 1, hair); px(flip ? cx - 2 : cx + 1, fy + top - 1, hair); }
    }
    // шапка
    if (cfg.hat) {
      if (cfg.hatType === 'cap') { P(-5, top, 9, 3, cfg.hat); P(3, top + 2, 4, 1, cfg.hat); }
      else if (cfg.hatType === 'ears') { P(-5, top - 1, 10, 4, cfg.hat); P(-5, top - 3, 2, 2, cfg.hat); P(3, top - 3, 2, 2, cfg.hat); }
      else if (cfg.hatType === 'hood') { P(-5, top, 10, 4, cfg.hat); P(-6, top + 2, 2, 8, cfg.hat); }
      else { P(-5, top, 10, 4, cfg.hat); P(-4, top - 1, 8, 1, cfg.hat); P(-1, top - 3, 2, 2, cfg.hat2 || '#f6ecd9'); P(-5, top + 3, 10, 1, cfg.hat2 || cfg.hat); }
    }
    if (cfg.headphones) { P(-5, top + 4, 2, 4, cfg.headphones); P(-4, top - 1, 8, 1, cfg.headphones); }
    if (cfg.bow) { P(-6, top + 1, 2, 2, cfg.bow); P(-4, top + 2, 1, 1, cfg.bow); }
    if (cfg.crown) { P(-4, top - 2, 8, 2, cfg.crown); P(-4, top - 3, 1, 1, cfg.crown); P(-1, top - 3, 2, 1, cfg.crown); P(3, top - 3, 1, 1, cfg.crown); }
    return top;
  }
  // портрет для диалога: рисуем голову в канвас 16x16
  function face(canvas, cfg) {
    const g = canvas.getContext('2d'); g.clearRect(0, 0, 16, 16);
    const prev = c; c = g; g.fillStyle = cfg.bg || '#2a2547'; g.fillRect(0, 0, 16, 16);
    person(8, 30, Object.assign({}, cfg, { phase: 0 }), 'still', 0.5, false, { smile: true });
    c = prev;
  }

  // частицы погоды
  function snow(W, H, t, cam, n = 50, col = '#ffffff') {
    for (let i = 0; i < n; i++) {
      const sp = 8 + rnd(i) * 14, x = ((rnd(i + 1) * 400 + Math.sin(t + i) * 6 - cam * 0.5) % W + W) % W, y = (rnd(i + 2) * H + t * sp) % H;
      px(x, y, col); if (i % 5 === 0) px(x + 1, y, col);
    }
  }
  function rain(W, H, t, cam, n = 60, col = '#9db7e8') {
    for (let i = 0; i < n; i++) {
      const x = ((rnd(i + 1) * 400 - t * 30 - cam * 0.5) % W + W) % W, y = (rnd(i + 2) * H + t * 170) % H;
      r(x, y, 1, 3, col);
    }
  }
  function petals(W, H, t, cam, n = 24, col = '#ffc2d6') {
    for (let i = 0; i < n; i++) {
      const x = ((rnd(i + 1) * 400 + t * 12 + Math.sin(t * 2 + i) * 8 - cam * 0.5) % W + W) % W, y = (rnd(i + 2) * H + t * (10 + rnd(i) * 10)) % H;
      px(x, y, col); px(x + 1, y + (i % 2), col);
    }
  }
  function vignette(W, H, a = 0.35) {
    c.globalAlpha = a; r(0, 0, W, 6, '#000'); r(0, H - 5, W, 5, '#000'); c.globalAlpha = a * 0.5; r(0, 6, W, 4, '#000'); c.globalAlpha = 1;
  }
  function tint(W, H, col, a) { c.globalAlpha = a; r(0, 0, W, H, col); c.globalAlpha = 1; }

  return { use, r, px, rnd, sky, stars, disc, hills, skyline, sea, ground, tree, lamp, bench, sign, box, windowLit, cat, dog, heart, bubble, person, face, snow, rain, petals, vignette, tint, get ctx() { return c; } };
})();
