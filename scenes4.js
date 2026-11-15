// ===== scenes4.js — дорисовка предметов из places.js (локации по фото); размеры и привязки не меняются =====
(() => {
  const S = SCENES, P = S.P, { r, px, rnd, disc } = A, ln = S.ln;
  const { f, al, mix } = S.fx;
  const wrap = (name, fn) => { const old = P[name]; if (!old) return; P[name] = (x, gy, p, e) => { old(x, gy, p, e); fn(x, gy, p || {}, e); }; };
  const sh = (x, gy, w, a = 0.22, dx = 0) => al(a, () => f(x + dx, gy - 0.5, w, 1.5, '#000'));

  // ---- Владивосток ----
  wrap('vokzalVl', (x, gy, p, e) => {
    for (let i = 0; i < 112; i += 5) f(x + i + 0.5, gy - 72, 0.5, 44, '#4a5a7a');
    al(0.3, () => { ln(x + 8, gy - 70, x + 30, gy - 32, '#fff'); ln(x + 40, gy - 70, x + 52, gy - 44, '#fff'); ln(x + 78, gy - 70, x + 100, gy - 36, '#fff'); });
    f(x - 2, gy - 74, 116, 0.5, '#fff'); f(x, gy - 71.5, 112, 0.5, '#00000050');
    for (let j = 0; j < 44; j += 7) f(x, gy - 72 + j + 0.5, 112, 0.5, '#0a0f1c');
    for (let i = 0; i < 190; i += 14) { f(x + 4 + i, gy - 16, 8, 0.5, '#5a6478'); f(x + 4 + i, gy - 8.5, 8, 0.5, '#1a2030'); }
    f(x + 112, gy - 60, 78, 0.5, '#fff'); f(x + 116, gy - 52, 70, 0.5, '#4a5878'); f(x + 116, gy - 42, 70, 0.5, '#4a5878');
    f(x + 96, gy - 34, 120, 0.5, '#fff'); al(0.3, () => f(x + 96, gy - 30, 120, 2, '#000'));
    f(x, gy - 20, 190, 0.5, '#aab0ba'); f(x, gy - 1, 190, 1, '#5a5f6a'); sh(x - 30, gy, 224, 0.2);
    f(x - 30, gy - 30.5, 70, 0.5, '#fff'); al(0.3, () => f(x - 30, gy - 27, 70, 1.5, '#000'));
  });
  wrap('steamLoco', (x, gy, p, e) => {
    f(x + 10, gy - 22, 40, 0.5, '#4a4a60'); f(x + 66, gy - 24, 30, 0.5, '#4a4a60'); f(x + 14, gy - 31, 4, 0.5, '#4a4a60');
    al(0.6, () => { f(x + 12, gy - 20, 36, 0.5, '#fff'); f(x + 68, gy - 22, 26, 0.5, '#8a8a9a'); });
    for (const k of [20, 30, 40, 50, 72, 80, 90]) { f(x + k - 0.5, gy - 8.5, 1, 1, '#d8d8e8'); disc(x + k, gy - 8, 1, '#7a1a18'); }
    f(x + 6, gy - 11, 92, 0.5, '#f06a60'); f(x - 4, gy - 3, 104, 0.5, '#aab0ba'); sh(x - 4, gy, 108, 0.28);
  });
  wrap('theatreMol', (x, gy, p, e) => {
    const CR = '#f1edc8';
    f(x, gy - 76, 150, 0.5, '#fffbe0'); f(x - 2, gy - 75.5, 154, 0.5, '#4a2a24'); f(x, gy - 24.5, 150, 0.5, '#d8d0a8');
    for (const k of [50, 62, 84, 96]) { f(x + k + 4, gy - 70, 1, 44, '#c8c4a8'); f(x + k, gy - 70, 0.5, 44, '#fff'); }
    for (const k of [10, 24, 38, 110, 124, 138]) { const wx = x + k; f(wx - 0.5, gy - 51.5, 9, 0.5, '#e8e4d0'); f(wx + 1, gy - 61, 3, 0.5, '#7a98a0'); ln(wx + 2, gy - 60, wx + 5, gy - 54, '#ffffff55'); }
    for (const k of [56, 71, 88]) f(x + k + 1, gy - 63, 3, 0.5, '#7a98a0');
    al(0.12, () => { for (let i = 0; i < 150; i += 6) f(x + i, gy - 24, 3, 24, '#000'); });
    al(0.3, () => f(x - 20, gy - 1.5, 192, 2, '#000'));
    f(x + 48, gy - 24, 102, 0.5, '#fff0d8');
    for (const k of [58, 72, 86]) f(x + k + 1, gy - 16, 5, 0.5, '#9ab8c0');
    // тёплое свечение окон и фонари у входа
    if (S.fx.dark(e.o.time)) al(0.18, () => { for (const k of [10, 24, 38, 110, 124, 138, 56, 71, 88]) f(x + k, gy - 62, 8, 11, '#ffd98a'); });
  });
  // ---- Лима ----
  wrap('limaWall', (x, gy) => {
    for (let i = 0; i < 9; i++) { f(x + 2 + i * 11, gy - 36, 10, 0.5, '#fff'); f(x + 2 + i * 11, gy - 31.5, 10, 0.5, '#00000040'); f(x + 3 + i * 11, gy - 35, 1.5, 0.5, '#3a3d4a'); }
    al(0.4, () => { const nx = x + 132, ny = gy - 64; disc(nx, ny, 20, '#4a7aff'); });
    al(0.25, () => f(x, gy - 8, 280, 8, '#000')); sh(x, gy, 280, 0.2);
  });
  wrap('limaSofa', (x, gy, p) => { const c = p.col || '#e8703a'; f(x + 0.5, gy - 17.5, 37, 0.5, mix(c, 0.3)); f(x + 18.5, gy - 18, 0.5, 10, mix(c, -0.25)); for (const bx of [6, 14, 22, 30]) px(x + bx, gy - 13, mix(c, -0.35)); f(x, gy - 8, 38, 0.5, mix(c, -0.3)); sh(x, gy, 38, 0.22); });
  wrap('armchair', (x, gy, p) => { const c = p.col || '#f2c62a'; f(x + 0.5, gy - 15.5, 11, 0.5, mix(c, 0.35)); f(x, gy - 8, 13, 0.5, mix(c, -0.3)); f(x + 6, gy - 16, 0.5, 8, mix(c, -0.2)); sh(x, gy, 14, 0.22); });
  wrap('roundTable', (x, gy, p) => { const w = p.w || 20; f(x, gy - 13, w, 0.5, '#fff0c0'); f(x + 1, gy - 10.5, w - 2, 0.5, '#8a6a2a'); f(x + (w >> 1) - 0.5, gy - 10, 0.5, 9, '#c8ced6'); sh(x + (w >> 1) - 5, gy, 11, 0.25); });
  // ---- ИБМ и лёд ----
  wrap('ibm', (x, gy) => {
    al(0.35, () => { for (let j = 0; j < 4; j++) for (let i = 0; i < 24; i++) { const xx = x + 2 + i * 4; if (xx > x + 92) break; f(xx, gy - 28 + j * 5 + 2, 1, 0.5, '#fff'); } });
    f(x + 18, gy - 34, 56, 0.5, '#c8644a'); f(x, gy - 30, 22, 0.5, '#c8644a'); f(x + 70, gy - 28, 24, 0.5, '#c8644a'); f(x + 62, gy - 26, 0.5, 20, '#fff'); al(0.25, () => { ln(x + 63, gy - 25, x + 68, gy - 12, '#fff'); });
    f(x - 6, gy - 12, 104, 0.5, '#fff'); sh(x - 6, gy, 104, 0.25);
  });
  wrap('iceFishers', (x, gy, p) => { al(0.3, () => { for (let i = 0; i < 18; i++) f(x + rnd(i + 55) * (p.w || 300), gy - 3 + rnd(i + 56) * 3, 3, 0.5, '#9fb6cc'); }); });
  // ---- спальни ----
  wrap('bedWood', (x, gy, p) => { const w = p.w || 64, pl = p.plaid || '#b99a86'; f(x + 4, gy - 9.5, w, 0.5, '#fff0d0'); for (let k = 0; k < w - 20; k += 7) { f(x + 26 + k, gy - 16, 0.5, 7, mix(pl, -0.22)); f(x + 28 + k, gy - 14, 3, 0.5, mix(pl, 0.2)); } f(x + 24, gy - 8.5, w - 20, 0.5, mix(pl, -0.3)); f(x + 5, gy - 21, 11, 0.5, '#fff'); f(x + 13, gy - 21.5, 11, 0.5, '#fff'); f(x, gy - 30, 0.5, 30, '#fff0d0'); sh(x, gy, w + 6, 0.22); });
  wrap('curtainWin', (x, gy, p) => { const c = p.col || '#c2a58a'; for (const k of [-14, 46]) { for (let i = 1; i < 18; i += 5) f(x + k + i + 0.5, gy - 84, 0.5, 80, mix(c, 0.2)); f(x + k, gy - 4.5, 18, 0.5, mix(c, -0.3)); } f(x - 14, gy - 86.5, 78, 0.5, '#fff'); al(0.3, () => { ln(x + 6, gy - 78, x + 16, gy - 40, '#fff'); ln(x + 30, gy - 78, x + 40, gy - 44, '#fff'); }); f(x + 2, gy - 32.5, 46, 0.5, '#fff'); });
  wrap('slopeCeil', (x, gy, p) => { const w = p.w || 150, h = p.h || 74; al(0.15, () => { for (let i = 0; i < w; i += 3) f(x + i, gy - 104 + (h * i / w) - 2, 3, 2, '#000'); }); al(0.25, () => { for (let i = 0; i < 46; i++) { const xx = x + w * 0.42 + i, yy = gy - 104 + h * ((w * 0.42 + i) / w) - 9; f(xx, yy + 0.5, 1, 2, '#fff'); } }); });
  wrap('floorlamp', (x, gy, p) => { f(x + 0.5, gy - 44, 0.5, 44, '#c8ced6'); f(x - 3, gy - 1.5, 7, 0.5, '#c8ced6'); f(x - 4, gy - 51, 9, 0.5, '#fff'); if (p.on) al(0.1, () => f(x - 10, gy - 1.5, 21, 1.5, '#fff3c4')); sh(x - 3, gy, 8, 0.25); });
  wrap('carpet', (x, gy, p) => { const w = p.w || 80; for (let i = 0; i < w; i += 2) f(x + i, gy + 17, 1, 1, '#e8d8b0'); f(x, gy + 3, w, 0.5, '#f0c070'); f(x, gy + 16.5, w, 0.5, '#6a3a10'); al(0.15, () => f(x, gy + 3, w, 14, '#000')); });
  wrap('dresser', (x, gy) => { for (let j = 0; j < 4; j++) { f(x + 1, gy - 28 + j * 7, 24, 0.5, '#f4d090'); f(x + 1, gy - 22.5 + j * 7, 24, 0.5, '#8a5a1a'); } f(x, gy - 30, 26, 0.5, '#fff0c0'); f(x + 25.5, gy - 30, 0.5, 30, '#8a5a1a'); sh(x, gy, 26, 0.25); });
  wrap('greyKitchen', (x, gy) => { f(x, gy - 84, 44, 0.5, '#b8bec8'); f(x + 46, gy - 34.5, 110, 0.5, '#fff0d0'); for (let i = 0; i < 110; i += 22) f(x + 46 + i, gy - 31, 0.5, 31, '#5a5d65'); al(0.25, () => f(x + 46, gy - 62, 110, 8, '#ffd98a')); sh(x, gy, 156, 0.25); });
  wrap('dog2', (x, gy, p) => { const s = p.s || 1; sh(x - 8 * s, gy, 20 * s, 0.25); });
  // ---- квартира Кати ----
  wrap('katyaKitchen', (x, gy) => { f(x + 28, gy - 92, 0.5, 92, '#fff'); f(x, gy - 34.5, 28, 0.5, '#fff'); f(x + 31, gy - 60, 20, 0.5, '#4a4a58'); al(0.3, () => ln(x + 34, gy - 56, x + 40, gy - 46, '#fff')); for (const k of [62, 70]) { f(x + k + 1, gy - 15.5, 1, 14, '#e2f1f6'); f(x + k, gy - 0.5, 7, 0.5, '#6f9bd0'); } sh(x, gy, 78, 0.25); });
  wrap('greenSofa', (x, gy) => { f(x, gy - 27, 70, 0.5, '#3a8a70'); f(x + 34.5, gy - 27, 0.5, 14, '#0a2a20'); f(x, gy - 13, 70, 0.5, '#4aa088'); f(x - 3, gy - 20, 0.5, 18, '#3a8a70'); f(x + 72.5, gy - 20, 0.5, 18, '#0a2a20'); sh(x - 3, gy, 76, 0.25); });
  wrap('doorway', (x, gy) => { f(x, gy - 84, 26, 0.5, '#4a4458'); al(0.3, () => f(x, gy - 84, 3, 84, '#000')); f(x + 12, gy - 40, 0.5, 40, '#fff'); });
  // ---- nodcafe ----
  wrap('ficus', (x, gy, p) => { f(x - 6, gy - 16, 13, 0.5, '#e8627a'); f(x - 6, gy - 1, 13, 0.5, '#6a141c'); f(x + 4, gy - 15, 2, 15, '#8a1f2a'); sh(x - 7, gy, 15, 0.25); });
  wrap('nodNeon', (x, gy, p) => { const y = gy - (p.y || 74); al(0.5 + 0.2 * Math.sin(Date.now() / 400), () => f(x + 1, y + 1, 20, 0.5, '#fff')); });
  wrap('haring', (x, gy) => { f(x, gy - 26, 30, 0.5, '#fff'); sh(x, gy, 30, 0.2); });
  wrap('wallArt', (x, gy, p) => { const y = gy - (p.y || 84), w = p.w || 34, h = p.h || 30; f(x, y, w, 0.5, '#ffffff66'); f(x, y + h, w, 0.5, '#00000050'); f(x + 1, y + h + 0.5, w, 1, '#00000025'); });
  // ---- аэропорт, зелень ----
  wrap('khrabrovo', (x, gy, p, e) => { for (let i = 0; i < 230; i += 9) f(x + i + 0.5, gy - 58, 0.5, 36, '#ffffff66'); al(0.3, () => { for (let k = 0; k < 6; k++) ln(x + 12 + k * 36, gy - 56, x + 36 + k * 36, gy - 24, '#fff'); }); f(x - 2, gy - 60, 234, 0.5, '#fff'); f(x + 24, gy - 30.5, 62, 0.5, '#c8ced6'); if (S.fx.dark(e.o.time)) al(0.25, () => f(x, gy - 54, 230, 32, '#ffe9a8')); sh(x, gy, 230, 0.25); });
  wrap('thuja', (x, gy, p) => { const h = p.h || 30; al(0.35, () => f(x + 1, gy - h + 3, 0.5, h - 4, '#6aa878')); sh(x - 5, gy, 11, 0.25); });
  wrap('arcBench', (x, gy, p) => { const w = p.w || 46; f(x, gy - 8, w, 0.5, '#c88a60'); f(x, gy - 4.5, w, 0.5, '#4a2418'); sh(x, gy, w, 0.2); });
  wrap('ostankino', (x, gy, p) => { const h = p.h || 100; al(0.4, () => f(x - 0.5, gy - 14 - h * 0.6, 0.5, h * 0.6, '#fff')); sh(x - 8, gy, 16, 0.2); });
  wrap('msuBlock', (x, gy, p) => { const w = p.w || 60, h = p.h || 40; f(x, gy - h, w, 0.5, '#fff'); f(x + w - 1.5, gy - h, 1.5, h, '#00000030'); });
  // ---- Шанхай: храм, 1933, магазины ----
  wrap('stoneRail', (x, gy, p) => { const w = p.w || 120; f(x, gy - 12, w, 0.5, '#fff'); f(x, gy - 10.5, w, 0.5, '#8a857a'); for (let i = 0; i < w; i += 20) { f(x + i, gy - 15, 0.5, 15, '#fff'); f(x + i + 3.5, gy - 15, 0.5, 15, '#9a958a'); } sh(x, gy, w, 0.2); });
  wrap('goldStatues', (x, gy, p, e) => { for (let k = 0; k < 6; k++) { const sx = x + 16 + k * 40; al(0.5, () => { f(sx - 5, gy - 60 - (k % 3) * 8, 0.5, 30, '#fff7c0'); }); al(0.2, () => f(sx - 12, gy - 1, 24, 1.5, '#000')); } });
  wrap('b1933', (x, gy) => { al(0.25, () => { for (let i = 0; i < 150; i += 8) f(x + i, gy - 104, 0.5, 74, '#000'); }); f(x, gy - 104, 150, 0.5, '#bdb8ae'); f(x + 36, gy - 12, 78, 0.5, '#c8c3b8'); sh(x, gy, 150, 0.28); });
  wrap('dollShop', (x, gy) => { al(0.35, () => f(x + 96, gy - 80, 44, 0.5, '#fff')); f(x - 4, gy - 104, 250, 0.5, '#3a3248'); al(0.15, () => f(x, gy - 8, 240, 8, '#e8c04a')); sh(x, gy, 240, 0.2); });
  wrap('feastRound', (x, gy) => { f(x, gy - 13, 86, 0.5, '#e8627a'); f(x + 2, gy - 8.5, 82, 0.5, '#4a0a12'); sh(x, gy, 86, 0.25); });
  wrap('lantern', (x, gy, p) => { const y = gy - (p.y || 86); f(x - 4, y, 9, 0.5, '#ff8a6a'); for (let k = -2; k < 4; k += 2) f(x + k, y + 1, 0.5, 9, '#a01a18'); });
  wrap('photoTank', (x, gy, p, e) => { const w = p.w || 110; al(0.18, () => { f(x - 4, gy - 0.5, w + 8, 3, '#6fb7ff'); }); al(0.12, () => f(x + 6, gy + 2.5, w - 12, 2, '#9de8ff')); });
})();
