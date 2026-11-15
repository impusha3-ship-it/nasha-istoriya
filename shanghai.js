// ===== Шанхай и Лахта: новые фоны и предметы =====
(() => {
  const { r, px, rnd, disc, box } = A, BG = SCENES.BG, P = SCENES.P, txt = SCENES.txt, ln = SCENES.ln;
  const al = (a, f) => { const c = A.ctx; c.globalAlpha = a; f(); c.globalAlpha = 1; };
  const IM = {}; const pic = s => IM[s] || (IM[s] = Object.assign(new Image(), { src: s }));
  const puff = (x, y, s, c1, c2) => { x = Math.round(x); disc(x, y, 5 * s, c1); disc(x + 7 * s, y - 2 * s, 7 * s, c1); disc(x + 15 * s, y, 5 * s, c1); r(x - 5 * s, y, 26 * s, 4 * s, c1); r(x - 5 * s, y + 3 * s, 26 * s, 2 * s, c2); };
  const halfDisc = (cx, cy, ra, col) => { for (let dy = 0; dy <= ra; dy++) { const w = Math.floor(Math.sqrt(ra * ra - dy * dy)); r(cx - w, cy - dy, 2 * w + 1, 1, col); } };

  // ---------- небо и земля ----------
  const SKY2 = {
    cloud: ['#8f9db1', '#a4b2c4', '#bcc8d5', '#d3dae1'],
    sunny: ['#4a8ad6', '#6fa8e4', '#9cc6ee', '#cfe3f4'],
    storm: ['#3f4759', '#555e73', '#717b91', '#9ea7b8'],
    night: ['#171029', '#281d40', '#46325a', '#7a5470'],
    fogn: ['#3a3040', '#5a4a58', '#86707a', '#b09a96'],
  };
  const GR = { red: ['#9d3d2f', '#bf5744', '#852f25'], tile: ['#5b5fa6', '#8a90d8', '#464a8a'], stone: ['#8d909a', '#b0b3bc', '#757884'], grass: ['#58a862', '#86cf80', '#44904f'], bund: ['#3a2f55', '#5a4a80', '#2c2342'], road: ['#4a4a58', '#6a6a7c', '#363644'], nroad: ['#23203a', '#3e3a62', '#1a1830'] };

  function hill1000(x, base, s, night) { // гора из бетона, на которой растёт лес
    for (let l = 0; l < 9; l++) {
      const w = Math.round((120 - l * 11) * s), hx = x + Math.round(l * 5.5 * s), y = base - Math.round(l * 9 * s);
      r(hx, y - 8 * s, w, 8 * s, night ? '#2a2540' : l % 2 ? '#8e9a98' : '#7f8c8a');
      for (let k = 0; k < w - 4; k += 8) { disc(hx + 4 + k, y - 9 * s, 3 * s, night ? '#1d3a34' : '#3f7a55'); if (k % 16 === 0) r(hx + 4 + k, y - 6 * s, 1, 4 * s, night ? '#274a3e' : '#4f8f66'); }
      if (night) for (let k = 0; k < w; k += 5) if (rnd(l * 9 + k) < 0.4) px(hx + k, y - 4 * s, '#ffd98a');
    }
  }

  // Пудун ночью: Жемчужина, Цзинь Мао, «открывашка», Шанхайская башня, неон
  function pudong(e) {
    const W = e.W, cam = e.cam, par = 0.18, B = 88, t = e.t, X = k => Math.round(k - cam * par);
    A.skyline(W, cam, par, B, '#241a44', '#ffd98a', 11, 10, 40, 0.5);
    // Жемчужина
    let x = X(34);
    ln(x - 6, B, x - 1, B - 34, '#b8a0d8'); ln(x + 6, B, x + 1, B - 34, '#b8a0d8'); r(x - 1, B - 80, 3, 50, '#cdb8e0');
    disc(x, B - 34, 7, '#c466c0'); disc(x, B - 34, 5, '#ee9be4'); disc(x, B - 62, 5, '#c466c0'); disc(x, B - 62, 3, '#ee9be4'); r(x - 1, B - 100, 2, 20, '#cdb8e0');
    for (let k = 0; k < 6; k++) { px(x - 5 + k * 2, B - 34 + (k % 2) * 3, Math.sin(t * 4 + k) > 0 ? '#fff' : '#ffd98a'); }
    al(0.35 + 0.2 * Math.sin(t * 3), () => disc(x, B - 102, 5, '#ff6ad0')); px(x, B - 103, '#ffb0f4');
    // Цзинь Мао
    x = X(176);
    for (let k = 0; k < 7; k++) { const w = 18 - k * 2; r(x - w / 2, B - 10 - k * 9, w, 10, '#6a5e3c'); r(x - w / 2, B - 10 - k * 9, w, 1, '#ffd98a'); for (let j = 0; j < w - 3; j += 3) px(x - w / 2 + 2 + j, B - 6 - k * 9, '#ffe9b0'); }
    r(x, B - 82, 1, 8, '#ffd98a');
    // «открывашка» (SWFC)
    x = X(208);
    for (let i = 0; i < 78; i++) { const w = 12 - Math.floor(i / 28); r(x - w / 2, B - i, w, 1, i % 3 ? '#39446a' : '#2b3558'); r(x + w / 2 - 1, B - i, 1, 1, '#4aa0ff'); r(x - w / 2, B - i, 1, 1, '#2f6fc8'); }
    r(x - 2, B - 82, 4, 6, '#241a44'); al(0.3, () => r(x + 4, B - 70, 3, 70, '#4aa0ff'));
    // Шанхайская башня
    x = X(236);
    for (let i = 0; i < 92; i++) { const off = Math.round(Math.sin(i * 0.09) * 2), w = 12 - Math.floor(i / 16); r(x - w / 2 + off, B - i, w, 1, i % 4 < 2 ? '#667296' : '#55618a'); if (i % 5 === 0) px(x - w / 2 + off + 2 + (i % 3), B - i, '#ffe9b0'); }
    px(x + 1, B - 93, '#bfe0ff');
    // неоновые экраны
    const nb = (bx, col, h) => { r(bx, B - h, 12, h, shade2(col)); r(bx + 1, B - h + 1, 10, h - 2, col); for (let k = 0; k < 4; k++) r(bx + 2, B - h + 3 + k * 4, 8, 2, '#ffffff'); };
    nb(X(120), Math.sin(t * 2) > 0 ? '#ff3fa8' : '#ff5cb8', 26); nb(X(142), '#3fd08a', 30); nb(X(266), '#3f86e8', 24);
    // туман съедает верхушки
    al(0.5, () => r(0, 0, W, 34, '#6a4a64')); al(0.3, () => r(0, 34, W, 16, '#7a5870')); al(0.18, () => r(0, 50, W, 12, '#8a6880'));
    // вода и отражения
    r(0, B, W, 20, '#22174a');
    for (let i = 0; i < 46; i++) { const xx = ((rnd(i) * W * 1.2 + Math.sin(t * 1.2 + i) * 3) % W + W) % W, yy = B + 1 + rnd(i + 3) * 17; r(xx, yy, 2 + rnd(i + 5) * 5, 1, ['#f0a0e8', '#ffd98a', '#5aa8ff', '#3a2f6a'][i % 4]); }
    for (const [rx, col] of [[34, '#ee9be4'], [176, '#ffd98a'], [208, '#4aa0ff'], [120, '#ff3fa8'], [142, '#3fd08a']]) al(0.35 + 0.1 * Math.sin(t * 2 + rx), () => r(X(rx) - 1, B + 2, 3, 15, col));
  }
  function shade2(c) { return SCENES.shade(c, -50); }

  // ---------- основной фон Шанхая ----------
  BG.shCity = (e) => {
    const o = e.o, t = o.time || 'cloud', W = e.W, H = e.H, GY = e.GY, cam = e.cam, night = t === 'night' || t === 'fogn';
    A.sky(W, H, SKY2[t], 92);
    if (night) { A.stars(W, H, cam, e.t, 14, 30); }
    const cc = { cloud: ['#e4e9ee', '#c3ccd6'], sunny: ['#ffffff', '#cfdff0'], storm: ['#4c5468', '#363d4e'] }[t];
    if (cc) for (let i = 0; i < 6; i++) puff(((i * 74 - cam * 0.04 - e.t * 1.5 + 40) % (W + 120) + W + 120) % (W + 120) - 40, 14 + (i * 23) % 50, 2 + (i % 2), cc[0], cc[1]);
    if (t === 'storm') al(0.55, () => r(0, 82, W, 4, '#e8c26a'));
    if (!o.pudong) {
      const bc = { cloud: '#8793a6', sunny: '#8aa6c6', storm: '#4a5268', night: '#1a1230', fogn: '#5a4a5a' }[t];
      A.skyline(W, cam, 0.25, 96, bc, night ? '#ffd98a' : (t === 'storm' ? '#8a93a6' : '#c9d6e6'), 6, 16, o.tall || 56, night ? 0.5 : 0.28);
    }
    r(0, 96, W, GY - 96, { cloud: '#6f7c78', sunny: '#7d8aa0', storm: '#46524e', night: '#150f2a', fogn: '#4a3e4a' }[t]);   // низ фона: живая изгородь и фасады
    if (!night) for (let x = -(cam * 0.5 % 12) - 6; x < W + 6; x += 10) disc(x, 98, 6, t === 'storm' ? '#34503a' : '#3f7a55');
    else for (let x = -(cam * 0.5 % 9); x < W; x += 9) if (rnd(x + cam) < 0.0 || ((x / 9) | 0) % 3) px(x, 100 + ((x / 9) | 0) % 4 * 4, '#ffd98a');
    if (o.hill !== undefined) hill1000(Math.round(o.hill - cam * 0.35), 96, o.hillS || 1, night);
    if (o.pudong) {
      pudong(e);
      r(0, GY - 12, W, 12, '#2a2046'); r(0, GY - 12, W, 1, '#5a4a80');                         // парапет набережной
      r(0, GY - 24, W, 1, '#a79cc4'); r(0, GY - 18, W, 1, '#8a7fb0');                         // перила
      for (let x = -(cam % 14); x < W; x += 14) r(x, GY - 24, 1, 12, '#a79cc4');
    }
    if (o.lake) {                                                                                  // озеро с отражением
      r(0, 90, W, 18, t === 'storm' ? '#56657a' : '#6a7e92'); r(0, 90, W, 3, '#7d8fa3');
      for (let i = 0; i < 40; i++) { const xx = ((rnd(i) * W * 1.3 + Math.sin(e.t + i) * 3 - cam * 0.3) % W + W) % W; r(xx, 92 + rnd(i + 4) * 15, 3 + rnd(i + 8) * 8, 1, i % 3 ? '#8d9fb3' : '#475567'); }
      r(0, 108, W, GY - 108, '#4f9e58'); r(0, 108, W, 1, '#74c27a');
    }
    const g = GR[o.ground || (night ? 'nroad' : 'road')];
    A.ground(W, GY, H, g[0], g[1], cam, g[2]);
    if (o.ground === 'red') r(0, GY + 12, W, 1, '#f1e0d8');
    if (o.ground === 'tile') for (let i = 0; i < 16; i++) { const x = ((i * 41 - cam) % (W + 30) + W + 30) % (W + 30) - 15, y = GY + 3 + (rnd(i) * 20 | 0); r(x, y, 3, 1, '#d9dcf5'); px(x + 1, y - 1, '#d9dcf5'); }
    if (o.ground === 'bund') for (let x = -(cam % 18); x < W; x += 18) r(x, GY + 1, 1, H - GY, '#2c2342');
  };

  // ---------- вид с высоты: Лахта днём (лёд залива) / смотровая ночью ----------
  BG.skyView = (e) => {
    const o = e.o, W = e.W, H = e.H, GY = e.GY, t = e.t;
    if (o.mode === 'deck') {
      A.sky(W, H, ['#0d0b20', '#1a1238', '#2d1e4a', '#503560'], 64);
      r(0, 64, W, H - 64, '#120d28');
      for (let i = 0; i < 40; i++) { const bx = rnd(i) * W, bw = 8 + rnd(i + 2) * 16, by = 56 + rnd(i + 5) * 40; r(bx, by, bw, H - by, '#1b1438'); for (let k = 0; k < bw / 3; k++) if (rnd(i * 9 + k) < 0.45) px(bx + 1 + k * 3, by + 2 + rnd(i + k) * 14, '#ffd98a'); }
      for (let i = 0; i < 220; i++) px(rnd(i + 40) * W, 70 + rnd(i + 90) * 70, ['#ffd98a', '#ff8ac8', '#8ad0ff', '#fff2c0'][i % 4]);
      for (let k = 0; k < 3; k++) for (let x = 0; x < W; x++) { const y = 80 + k * 20 + Math.sin(x * 0.05 + k * 2) * 8; px(x, y, '#2f1f5a'); }
      al(0.32, () => r(0, 40, W, 30, '#8a6a88')); al(0.2, () => r(0, 70, W, 20, '#6a4a70'));
    } else {
      A.sky(W, H, ['#aebcc9', '#bccad6', '#c9d5df', '#d9e2e8'], 50);
      r(0, 50, W, H - 50, '#cfdbe4');
      for (let i = 0; i < 90; i++) { const x = rnd(i) * W, y = 54 + rnd(i + 3) * (H - 56); r(x, y, 5 + rnd(i + 8) * 22, 1 + (i % 3 === 0), i % 2 ? '#e9f1f7' : '#a9c0d2'); }
      for (let k = 0; k < 4; k++) for (let x = 0; x < W; x++) { const y = 62 + k * 16 + Math.sin(x * 0.04 + k * 1.7) * 6; r(x, y, 1, 2, '#7f9db4'); }
      r(W - 80, 46, 80, 8, '#6a7a6c'); for (let k = 0; k < 16; k++) disc(W - 78 + k * 5, 46 - (k % 3), 3, '#4f6a54');
      r(W - 120, 56, 30, 5, '#f4f7f9'); r(W - 124, 54, 6, 8, '#f4f7f9');
      al(0.3, () => r(0, 40, W, 14, '#eef2f4'));
    }
    // стеклянная стена: белые косые стойки и пол
    for (const sx of [Math.round(W * 0.07), Math.round(W * 0.93)]) { ln(sx - 4, 0, sx + 4, H, '#e9eef2'); ln(sx - 3, 0, sx + 5, H, '#d7dee5'); }
    r(0, GY - 6, W, H - GY + 6, o.mode === 'deck' ? '#2a2342' : '#aab1ba'); r(0, GY - 7, W, 2, o.mode === 'deck' ? '#6a5a90' : '#eef2f4');
    al(0.1, () => { for (let k = 0; k < 4; k++) ln(20 + k * 60, 0, 60 + k * 60, GY, '#ffffff'); });
  };

  // ---------- предметы ----------
  // 1000 Trees крупно (для фона)
  P.mountain1000 = (x, gy, p) => hill1000(x, gy, p.s || 1, false);

  // пешеходный мост на вантах, красное покрытие
  P.cableBridge = (x, gy, p) => {
    const top = gy - 104;
    r(x - 2, top, 5, 104, '#f2f5f7'); r(x - 1, top, 1, 104, '#ffffff'); r(x + 2, top, 1, 104, '#cfd6dc');
    for (let k = -9; k <= 9; k++) { if (k === 0) continue; ln(x, top + 3 + Math.abs(k) % 4, x + k * 9, gy - 16, '#e8edf0'); }
    ln(x, top + 1, x - 100, gy - 30, '#e8edf0'); ln(x, top + 1, x + 100, gy - 30, '#e8edf0');
    const L = x - 110;
    r(L, gy - 16, 230, 2, '#7a5238'); r(L, gy - 15, 230, 1, '#a07a58');
    for (let i = 0; i < 230; i += 4) { px(L + i, gy - 13, '#e8edf0'); px(L + i + 2, gy - 11, '#e8edf0'); px(L + i, gy - 9, '#e8edf0'); px(L + i + 2, gy - 7, '#e8edf0'); px(L + i, gy - 5, '#e8edf0'); }
    r(L, gy - 3, 230, 3, '#f2f5f7');
  };

  // старое здание из серого камня (торговая улица)
  P.stoneBld = (x, gy, p) => {
    const w = p.w || 50, h = p.h || 96, c = p.col || '#a69c8a';
    r(x, gy - h, w, h, c); r(x, gy - h, w, 2, '#c4bba8'); r(x + w - 2, gy - h, 2, h, '#7f7666');
    for (let wy = gy - h + 6; wy < gy - 14; wy += 8) for (let wx = 4; wx < w - 6; wx += 7) { r(x + wx, wy, 4, 5, '#6a6458'); px(x + wx, wy, '#8a8272'); }
    r(x - 2, gy - h - 3, w + 4, 3, '#8f8676');
  };
  // здание с золотой надписью, шпилем и куполом (универмаг)
  P.dept = (x, gy, p) => {
    r(x, gy - 34, 90, 34, '#e8dcc2'); r(x - 2, gy - 36, 94, 3, '#c7b58a'); for (let k = 0; k < 11; k++) r(x + 4 + k * 8, gy - 30, 4, 8, '#8f9aa6');
    r(x + 30, gy - 44, 30, 10, '#d9c9a0'); txt(x + 45, gy - 43, '百', '#c8323c', 8, 'center');
    ln(x + 76, gy - 36, x + 76, gy - 76, '#e8dcc2'); r(x + 74, gy - 62, 5, 26, '#e8dcc2'); disc(x + 76, gy - 66, 3, '#b8c4d0'); px(x + 76, gy - 78, '#c8323c');
  };
  // киоск с мороженым
  P.hdKiosk = (x, gy) => { box(x, gy - 24, 26, 24, '#f6f2ea', '#14122b'); r(x - 1, gy - 28, 28, 5, '#ffd23d'); txt(x + 13, gy - 36, 'H-D', '#3a2a22', 8, 'center'); r(x + 4, gy - 18, 18, 8, '#e8dcc2'); };
  // табличка метро
  P.metroSign = (x, gy) => { r(x + 18, gy - 30, 2, 30, '#3a3d4a'); box(x, gy - 62, 40, 14, '#1f5fb8', '#ffffff'); disc(x + 8, gy - 55, 4, '#c8323c'); txt(x + 28, gy - 59, '2 14', '#ffffff', 8, 'center'); };
  // вывески-тайлы
  P.neonSign = (x, gy, p, e) => { const on = Math.floor(e.t * 2) % 2; box(x, gy - (p.y || 50), p.w || 44, 12, '#14122b', p.col || '#ff3fa8'); txt(x + (p.w || 44) / 2, gy - (p.y || 50) + 2, p.s, on ? (p.col || '#ff3fa8') : '#ffffff', 8, 'center'); };

  // высокая башня на первом плане (смотрим снизу вверх)
  P.bigWfc = (x, gy) => {
    for (let y = 0; y < gy; y++) { const k = y / gy, w = Math.round(30 + 8 * k); r(x - w / 2, y, w, 1, y % 3 ? '#8c9099' : '#6f737d'); r(x - w / 2 - 1, y, 3, 1, '#3f8cff'); }
    for (let y = 4; y < gy - 4; y += 6) for (let k = 3; k < 28; k += 4) if (rnd(y * 7 + k) < 0.22) px(x - 14 + k, y, '#ffe9b0');
    al(0.25, () => r(x - 22, 0, 6, gy, '#3f8cff'));
  };
  P.bigJin = (x, gy) => {
    for (let i = 0; i < 7; i++) { const w = 46 - i * 6, y1 = gy - i * 19; r(x - w / 2, y1 - 19, w, 19, i % 2 ? '#c4b384' : '#b9a878'); r(x - w / 2, y1 - 19, w, 1, '#e8dbb0'); r(x + w / 2 - 3, y1 - 19, 3, 19, '#8a7a4a'); for (let wy = y1 - 16; wy < y1 - 2; wy += 4) for (let wx = 3; wx < w - 5; wx += 4) if (rnd(i * 31 + wx + wy) < 0.6) px(x - w / 2 + wx, wy, '#fff2c8'); }
  };
  P.bigSht = (x, gy) => {
    for (let y = 0; y < gy; y++) { const off = Math.round(Math.sin(y * 0.045) * 5), w = 40 - Math.floor(y / 14); r(x - w / 2 + off, y, w, 1, y % 3 ? '#b5ae82' : '#9a9470'); r(x + w / 2 + off - 4, y, 4, 1, '#6f6a4c'); if (y % 6 === 0) for (let k = 2; k < w - 6; k += 4) px(x - w / 2 + off + k, y, '#fff2c8'); }
  };
  P.fogOver = (x, gy, p, e) => { const W = e.W; al(0.75, () => r(0, 0, W, 26, '#bfae9e')); al(0.5, () => r(0, 26, W, 22, '#bfae9e')); al(0.25, () => r(0, 48, W, 26, '#bfae9e')); };

  // колесо обозрения
  P.wheel = (x, gy, p, e) => {
    const cx = x, cy = gy - 62, R = 50, a0 = e.t * 0.12;
    ln(cx, cy, cx - 28, gy, '#c9c0e0'); ln(cx, cy, cx + 28, gy, '#c9c0e0'); ln(cx + 1, cy, cx - 27, gy, '#9a90c0'); ln(cx + 1, cy, cx + 29, gy, '#9a90c0');
    for (let a = 0; a < 360; a += 2) { const rad = a * Math.PI / 180; px(cx + Math.cos(rad) * R, cy + Math.sin(rad) * R, ((a / 6 | 0) + (e.t * 3 | 0)) % 3 ? '#ffd98a' : '#ff8ac8'); px(cx + Math.cos(rad) * (R - 9), cy + Math.sin(rad) * (R - 9), '#a79cc4'); }
    for (let k = 0; k < 12; k++) { const rad = a0 + k * Math.PI / 6; ln(cx, cy, cx + Math.cos(rad) * R, cy + Math.sin(rad) * R, '#8f86b4'); const gx = cx + Math.cos(rad) * R, gyy = cy + Math.sin(rad) * R; box(gx - 3, gyy, 7, 6, ['#ff7aa8', '#6fb7ff', '#ffd166', '#7ad6a0'][k % 4], '#14122b'); px(gx, gyy + 2, '#fff6cf'); px(gx + 2, gyy + 2, '#fff6cf'); }
    disc(cx, cy, 4, '#e8e2f4'); al(0.12, () => disc(cx, cy, R + 8, '#ff8ac8'));
  };

  // кафе nod: окно, дождь, осьминог
  P.cafeWindow = (x, gy, p, e) => {
    const w = p.w || 150, h = p.h || 66, y = gy - 98, rain = !!e.o.rain;
    r(x - 2, y - 2, w + 4, h + 4, '#2b2630'); r(x, y, w, h, rain ? '#6d7886' : '#a9c4dc'); r(x, y, w, 18, rain ? '#5d6876' : '#8fb0cc');
    for (let l = 0; l < 6; l++) { const ww = 64 - l * 8; r(x + w - 90 + l * 4, y + h - 8 - l * 7, ww, 7, l % 2 ? '#6f7d77' : '#5f6d68'); for (let k = 0; k < ww - 3; k += 8) disc(x + w - 87 + l * 4 + k, y + h - 10 - l * 7, 2, '#3f6a52'); }
    r(x, y + h - 8, w, 8, '#4a4f58');
    if (rain) {
      for (let i = 0; i < 46; i++) { const rx = x + rnd(i) * w, ry = y + ((e.t * 70 * (0.7 + rnd(i + 4) * 0.6) + rnd(i + 9) * h) % (h - 4)); r(rx, ry, 1, 4, '#cfdbe6'); }
      for (let i = 0; i < 14; i++) { const dx = x + 3 + rnd(i + 20) * (w - 6), dy = y + ((rnd(i + 30) * h + e.t * (3 + rnd(i) * 4)) % (h - 2)); px(dx, dy, '#e8f0f8'); px(dx, dy + 1, '#aebccb'); }
    }
    r(x + w / 2 - 1, y, 2, h, '#2b2630'); r(x - 4, y + h + 2, w + 8, 3, '#6b5a4a');
  };
  P.octoSign = (x, gy) => { // чёрный осьминог с белым глазом
    disc(x, gy - 78, 11, '#14121c'); disc(x, gy - 78, 4, '#ffffff'); disc(x + 1, gy - 78, 2, '#14121c');
    for (let k = 0; k < 4; k++) for (let i = 0; i < 12; i++) px(x - 9 + k * 6 + Math.round(Math.sin(i * 0.6 + k) * 2), gy - 68 + i, '#14121c');
  };
  P.stool = (x, gy) => { r(x, gy - 12, 8, 2, '#2b2630'); r(x + 1, gy - 10, 1, 10, '#2b2630'); r(x + 6, gy - 10, 1, 10, '#2b2630'); };
  P.pendant = (x, gy, p, e) => { r(x, 0, 1, p.len || 26, '#2b2630'); disc(x, (p.len || 26) + 3, 4, '#ffe9a8'); al(0.18, () => disc(x, (p.len || 26) + 6, 14, '#ffe9a8')); };

  // стена лабубу в Pop Mart
  P.labWall = (x, gy, p, e) => {
    const pal = ['#e8457b', '#ffd166', '#6fb7ff', '#7ad6a0', '#b58cff', '#f6f2ea', '#ff8a5c', '#3d3a55'];
    r(x, gy - 100, 170, 100, '#a898dc');
    for (let c = 0; c < 5; c++) for (let rw = 0; rw < 6; rw++) {
      const cx = x + c * 34, cy = gy - 100 + rw * 16 + 1;
      for (let k = 0; k < 3; k++) { const fx = cx + 4 + k * 10, s = c * 17 + rw * 5 + k, body = pal[(rnd(s) * 8) | 0]; r(fx, cy + 8, 5, 6, body); r(fx + 1, cy + 5, 3, 3, '#f2e8dc'); px(fx, cy + 3, '#f2e8dc'); px(fx + 4, cy + 3, '#f2e8dc'); px(fx, cy + 4, '#f2e8dc'); px(fx + 4, cy + 4, '#f2e8dc'); px(fx + 1, cy + 6, '#14122b'); px(fx + 3, cy + 6, '#14122b'); if (rnd(s + 5) < 0.5) r(fx + 1, cy + 4, 3, 1, pal[(rnd(s + 9) * 8) | 0]); }
      r(cx, cy + 14, 34, 1, '#f4f4f8'); r(cx, cy - 1, 1, 16, '#f4f4f8');
    }
    r(x + 170, gy - 100, 1, 100, '#f4f4f8'); r(x, gy - 101, 171, 1, '#f4f4f8');
    al(0.1 + 0.05 * Math.sin(e.t * 2), () => r(x, gy - 100, 170, 100, '#ffffff'));
  };
  // фасад Pop Mart
  P.popFront = (x, gy, p, e) => {
    r(x, gy - 62, 96, 62, '#f4f2ee'); r(x, gy - 62, 96, 2, '#c8323c');
    box(x + 6, gy - 58, 84, 14, '#c8323c', '#ffffff'); txt(x + 48, gy - 55, 'POP MART', '#ffffff', 8, 'center');
    r(x + 8, gy - 40, 34, 36, '#cfe6f2'); r(x + 54, gy - 40, 34, 36, '#cfe6f2'); r(x + 43, gy - 40, 10, 40, '#6a6f7f');
    for (let k = 0; k < 4; k++) { r(x + 12 + k * 8, gy - 30, 4, 5, ['#e8457b', '#ffd166', '#6fb7ff', '#7ad6a0'][k]); r(x + 58 + k * 8, gy - 24, 4, 5, ['#b58cff', '#ff8a5c', '#7ad6a0', '#ffd166'][k]); }
  };

  // мост с аркадами и стройка под грозовым небом
  P.archBridge = (x, gy, p, e) => {
    const L = p.len || 270, N = 11;
    r(x, gy - 12, L, 12, '#e6dfcf'); r(x, gy - 14, L, 2, '#f6efdf'); for (let i = 0; i < L; i += 4) r(x + i, gy - 17, 1, 3, '#f6efdf'); r(x, gy - 18, L, 1, '#f6efdf');
    for (let i = 0; i < N; i++) { const cx = x + 12 + i * ((L - 24) / (N - 1)), ra = 4 + Math.round(5 * Math.cos((i - (N - 1) / 2) / ((N - 1) / 2) * 1.2)); halfDisc(Math.round(cx), gy, ra, '#566472'); }
    al(0.45, () => { r(x, gy + 1, L, 7, '#d9d6cc'); for (let i = 0; i < N; i++) { const cx = x + 12 + i * ((L - 24) / (N - 1)); r(Math.round(cx) - 3, gy + 1, 7, 5, '#3a4452'); } });
  };
  P.constructTower = (x, gy, p) => {
    const h = p.h || 80, w = p.w || 22;
    r(x, gy - h, w, h, '#3a4150'); for (let y = gy - h + 4; y < gy; y += 6) r(x, y, w, 1, '#59627a'); for (let k = 0; k <= w; k += 6) r(x + k, gy - h, 1, h, '#59627a');
    if (p.cap) r(x, gy - h - 8, w, 8, '#4a9ad0');
    const top = gy - h - (p.cap ? 8 : 0); r(x + w / 2, top - 14, 1, 14, '#d9603a'); r(x - 8, top - 14, w + 30, 2, '#e8803a'); r(x + w + 18, top - 12, 1, 6, '#d9603a');
  };
  P.glassBlock = (x, gy, p) => { const w = p.w || 24, h = p.h || 44, c = p.col || '#3f5a78'; r(x, gy - h, w, h, c); for (let y = gy - h + 3; y < gy - 3; y += 4) r(x + 1, y, w - 2, 1, '#6a8aa8'); r(x + w - 3, gy - h, 3, h, '#2a3f58'); };
  P.willow = (x, gy) => {
    r(x, gy - 38, 3, 38, '#4a3a2a');
    for (let i = 0; i < 18; i++) { const sx = x + 1 + (i - 9) * 3, len = 18 + (i % 4) * 5; for (let y = 0; y < len; y++) px(sx + Math.round(Math.sin(y * 0.3 + i) * 0.8), gy - 52 + y + Math.abs(i - 9) * 0.6, y % 5 ? '#6fae5a' : '#8fce6a'); }
    disc(x + 1, gy - 54, 10, '#5f9e50'); disc(x - 9, gy - 49, 7, '#5f9e50'); disc(x + 11, gy - 49, 7, '#6fae5a');
  };
  P.bush = (x, gy, p) => { disc(x + 6, gy - 5, 7, p.col || '#3f7a45'); disc(x - 2, gy - 3, 5, '#4a8a50'); disc(x + 14, gy - 3, 5, '#4a8a50'); };


  // ---------- заброшенный ангар на Балтийской косе (по фото) ----------
  BG.hangar = (e) => {
    const W = e.W, H = e.H, GY = e.GY, cam = e.cam;
    A.sky(W, H, ['#aeb4ba', '#bcc2c7', '#cdd1d4', '#dcdfe0'], 96);
    for (let i = 0; i < 4; i++) puff(((i * 90 - cam * 0.05 - e.t * 1.2 + 30) % (W + 100) + W + 100) % (W + 100) - 30, 40 + (i * 17) % 30, 3, '#c6cbcf', '#a9afb5');
    for (let x = -14 - (cam * 0.2 % 11); x < W + 14; x += 11) disc(x, 92 + ((rnd(Math.floor((x + cam * 0.2) / 11)) * 4) | 0), 8, '#4a6a4a');
    r(0, 96, W, GY - 96, '#4f6a46');
    const first = Math.floor(cam * 0.6 / 150) - 1;
    for (let i = first; i < first + Math.ceil(W / 150) + 3; i++) {
      const x = Math.round(i * 150 - cam * 0.6), plaster = ((i % 3) + 3) % 3 === 1, c = plaster ? '#c9c0aa' : '#8f4c3a';
      r(x, GY - 52, 148, 44, c);
      for (let k = 0; k < 148; k += 6) r(x + k, GY - 55 + ((rnd(i * 9 + k) * 4) | 0), 6, 4, c);
      if (!plaster) for (let yy = GY - 48; yy < GY - 10; yy += 4) r(x, yy, 148, 1, '#7a3e30'); else for (let k = 0; k < 6; k++) ln(x + 10 + k * 22, GY - 50, x + 14 + k * 22, GY - 22, '#8a8272');
      for (let k = 0; k < 3; k++) r(x + 18 + k * 44, GY - 38, 9, 5, '#2b2a30');
    }
    for (let x = -(cam * 0.8 % 17) - 17; x < W + 17; x += 17) { const k = Math.floor((x + cam * 0.8) / 17); disc(x, GY - 6, 8 + ((rnd(k) * 4) | 0), '#3f7a3f'); disc(x + 5, GY - 9, 5, '#5a9a4a'); }
    // ржавая ферма поверх всего (par 0.9)
    const bo = Math.round(cam * 0.9);
    r(0, 6, W, 3, '#5a3a2c'); r(0, 32, W, 4, '#6a4030'); r(0, 36, W, 5, '#4a2e24');
    for (let wx = -(bo % 40) - 40; wx < W + 40; wx += 40) { ln(wx, 9, wx + 20, 32, '#7a4a34'); ln(wx + 20, 32, wx + 40, 9, '#7a4a34'); r(wx, 9, 1, 23, '#5a3a2c'); r(wx + 20, 9, 1, 23, '#5a3a2c'); }
    for (let x = -(bo % 7); x < W; x += 7) if (rnd(Math.floor((x + bo) / 7)) < 0.5) px(x, 5, '#6f9a4a');
    for (let wx = -(bo % 90) - 90; wx < W + 90; wx += 90) r(wx + 40, 41, 4, GY - 41 - 10, '#4a2e24');
    al(0.18, () => r(0, 41, W, 12, '#14122b'));
    A.ground(W, GY, H, '#aaa696', '#c3bfae', cam, '#8d8979');
    r(0, GY + 9, W, 1, '#8d8979'); for (let x = -(cam % 46); x < W; x += 46) { r(x, GY + 1, 1, 8, '#8d8979'); r(x + 23, GY + 10, 1, 14, '#8d8979'); }
    for (let x = -(cam % 6); x < W; x += 6) if (rnd(Math.floor((x + cam) / 6) + 7) < 0.45) { px(x, GY + 8, '#6f9a4a'); px(x + 1, GY + 7, '#8fba5a'); }
  };
  P.brickTower = (x, gy, p) => { const h = p.h || 100; r(x, gy - h, 34, h, '#9a4a3a'); r(x - 2, gy - h - 4, 38, 5, '#7a3a2e'); for (let y = gy - h + 6; y < gy - 8; y += 4) r(x, y, 34, 1, '#7a3e30'); for (let k = 0; k < 4; k++) r(x + 20, gy - h + 12 + k * 18, 6, 8, '#2b2a30'); r(x, gy - h, 3, h, '#b86a54'); };

  // эмблема «Вкусно — и точка»: оранжевый знак с белой «и» и точкой
  P.vit = (x, gy, p) => { const y = gy - (p.y || 96); r(x - 18, y - 12, 36, 24, '#e0751a'); r(x - 16, y - 10, 32, 20, '#f08a2a'); for (const k of [-8, 2]) r(x + k, y - 5, 3, 10, '#ffffff'); ln(x - 5, y + 4, x + 2, y - 4, '#ffffff'); ln(x - 4, y + 4, x + 3, y - 4, '#ffffff'); disc(x + 11, y + 5, 2, '#c8323c'); txt(x, y + 14, 'ВКУСНО И ТОЧКА', '#7a3a10', 8, 'center'); };

  // аквариум с настоящей фотографией (двигается, светится)
  P.photoTank = (x, gy, p, e) => {
    const w = p.w || 110, h = p.h || 88, y0 = gy - h - 12, c = A.ctx, im = pic(p.src);
    al(0.22 + 0.1 * Math.sin(e.t * 2), () => r(x - 5, y0 - 5, w + 10, h + 10, '#9de8ff'));
    box(x, y0, w, h, '#0e2a5c', '#9de8ff');
    if (im.complete && im.naturalWidth) {
      c.save(); c.beginPath(); c.rect(x + 1, y0 + 1, w - 2, h - 2); c.clip(); c.imageSmoothingEnabled = true;
      const ox = im.naturalWidth * (p.cx || 0), iw = im.naturalWidth - ox, sc = Math.max((w - 2) / iw, (h - 2) / im.naturalHeight) * 1.08, sw = (w - 2) / sc, sh = (h - 2) / sc, sx0 = ox + (iw - sw) / 2, sy0 = (im.naturalHeight - sh) / 2;
      const bob = Math.sin(e.t * 1.1) * 2.5;   // вся толща воды медленно дышит, медузы плывут
      for (let yy = 0; yy < h - 2; yy += 2) { const off = Math.sin(e.t * 1.7 + yy * 0.22) * 1.6 + Math.sin(e.t * 0.7 + yy * 0.05) * 1.2, sy = Math.max(0, Math.min(im.naturalHeight - 2 / sc, sy0 + (yy + bob) / sc)); c.drawImage(im, sx0, sy, sw, 2 / sc, x + 1 + off, y0 + 1 + yy, w - 2, 2); }
      c.imageSmoothingEnabled = false; c.restore();
    } else {
      r(x + 1, y0 + 1, w - 2, h - 2, '#0f3a78');
      for (let i = 0; i < 5; i++) { const jx = x + 14 + rnd(i + 3) * (w - 40), jy = y0 + 12 + ((rnd(i) * h + e.t * (6 + i * 2)) % (h - 40)), s = 2 + (i % 2), pu = Math.sin(e.t * 2.4 + i) > 0 ? 1 : 0, col = ['#ffb3de', '#b9e3ff', '#d6c2ff', '#fff1a8', '#a8ffe0'][i];
        disc(jx, jy, 5 * s, col); r(jx - 5 * s, jy, 10 * s + 1, s, shade3(col)); al(0.6, () => { for (let k = -4; k <= 4; k += 2) r(jx + k * s, jy + 2 * s, 1, (6 + pu * 2 + (k & 3)) * s, col); }); }
    }
    al(0.14, () => r(x + 1, y0 + 1, w - 2, 10, '#ffffff'));
    for (let i = 0; i < 5; i++) px(x + 6 + rnd(i) * (w - 12), y0 + h - ((e.t * (8 + i * 3) + rnd(i) * h) % h), '#d9f6ff');
  };
  const shade3 = c => SCENES.shade(c, -40);
})();
