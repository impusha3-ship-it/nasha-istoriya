// ===== scenes3.js — Шанхай и особые локации: дорисовка поверх оригиналов (shanghai.js, places.js) =====
(() => {
  const S = SCENES, BG = S.BG, P = S.P, { r, px, rnd, disc } = A, ln = S.ln;
  const { f, al, mix, skyline, groundDetail } = S.fx;
  const wrap = (name, fn) => { const old = P[name]; if (!old) return; P[name] = (x, gy, p, e) => { old(x, gy, p, e); fn(x, gy, p || {}, e); }; };
  const wrx = (e, n, s, par = 1) => ((n * s - e.cam * par) % (e.W + 40) + e.W + 40) % (e.W + 40) - 20;

  // плитка/камень/красное покрытие/набережная: швы и блики
  function paving(e, g, night) {
    const W = e.W, H = e.H, GY = e.GY, cam = e.cam;
    const seam = night ? '#0e0c20' : '#4a4d58';
    if (g === 'tile') { al(0.35, () => { for (let x = -(cam % 16); x < W; x += 16) f(x, GY, 0.5, H - GY, '#2a2c60'); for (const y of [GY + 5, GY + 11, GY + 18]) f(0, y, W, 0.5, '#2a2c60'); }); al(0.5, () => { for (let i = 0; i < 10; i++) f(wrx(e, rnd(i + 5), 500), GY + 2 + rnd(i) * 22, 5, 0.5, '#c9ccf5'); }); }
    else if (g === 'stone') { al(0.4, () => { for (const [k, y] of [[0, GY + 4], [1, GY + 10], [2, GY + 17]]) { f(0, y, W, 0.5, seam); for (let x = -(cam % 24) + k * 8; x < W; x += 24) f(x, y, 0.5, 6, seam); } }); al(0.25, () => f(0, GY + 0.5, W, 1, '#fff')); }
    else if (g === 'red') { al(0.3, () => { for (let i = 0; i < 24; i++) f(wrx(e, rnd(i + 3), 400), GY + 2 + rnd(i) * 22, 4 + rnd(i + 2) * 8, 0.5, '#6a2218'); }); al(0.35, () => f(0, GY + 1, W, 0.5, '#ffd0c0')); }
    else if (g === 'bund') { al(0.5, () => { for (let x = -(cam % 18); x < W; x += 18) f(x + 0.5, GY + 1, 0.5, H - GY, '#7a6aa8'); for (let i = 0; i < 12; i++) f(wrx(e, rnd(i + 9), 450), GY + 2 + rnd(i) * 22, 4, 0.5, '#8a7ab8'); }); }
    else groundDetail(e, g === 'grass' ? 'grass' : 'road');
    al(0.1, () => f(0, H - 6, W, 6, '#000'));
  }

  // ---------- основной фон Шанхая ----------
  const sh0 = BG.shCity;
  BG.shCity = function (e) {
    const o = e.o, t = o.time || 'cloud', W = e.W, H = e.H, GY = e.GY, cam = e.cam, night = t === 'night' || t === 'fogn';
    const old = A.skyline;
    A.skyline = (w, c, par, by, col, win, seed, mn, mx, lit) => skyline(w, c, par, by, col, win, seed, mn, mx, lit, win === '#ffd98a');
    try { sh0(e); } finally { A.skyline = old; }
    // дымка и блики
    al(night ? 0.12 : 0.14, () => f(0, 80, W, 14, night ? '#8a6a88' : '#ffffff'));
    if (!night) {
      al(0.5, () => { for (let x = -(cam * 0.5 % 10) - 5; x < W + 6; x += 10) { f(x - 2, 94, 2, 0.5, '#8ad0a0'); f(x + 2, 97, 1.5, 0.5, '#8ad0a0'); f(x - 3, 100, 2, 0.5, '#1f4a30'); } });
    } else al(0.2, () => f(0, 96, W, 2, '#ffd98a'));
    if (o.lake) { for (let i = 0; i < 30; i++) { const x = ((rnd(i + 70) * W * 1.3 + Math.sin(e.t + i) * 3 - cam * 0.3) % W + W) % W; if (Math.sin(e.t * 2 + i * 3) > 0) f(x, 91 + rnd(i + 71) * 15, 1.5, 0.5, '#ffffff'); } }
    if (o.pudong) {
      f(0, GY - 12, W, 0.5, '#8a7ab8'); al(0.35, () => f(0, GY - 11.5, W, 2, '#000'));
      for (let x = -(cam % 14) + 7; x < W; x += 28) { f(x - 0.5, GY - 29, 1.5, 5, '#a79cc4'); f(x - 1.5, GY - 31, 3.5, 2, '#ffe9b0'); al(0.18, () => disc(x + 0.5, GY - 30, 7, '#ffe9b0')); }
      for (let i = 0; i < 20; i++) { const x = wrx(e, rnd(i + 90), 400, 0.5); if (Math.sin(e.t * 2 + i) > 0.3) f(x, 90 + rnd(i + 91) * 16, 1.5, 0.5, ['#ffd98a', '#ff8ac8', '#8ad0ff'][i % 3]); }
    }
    paving(e, o.ground || (night ? 'nroad' : 'road'), night);
  };

  // ---------- вид с высоты ----------
  const sv0 = BG.skyView;
  BG.skyView = function (e) {
    sv0(e);
    const o = e.o, W = e.W, H = e.H, GY = e.GY;
    if (o.mode === 'deck') {
      for (let i = 0; i < 60; i++) if (Math.sin(e.t * 1.5 + i * 2.3) > 0.4) f(rnd(i + 300) * W, 70 + rnd(i + 301) * 60, 1, 0.5, '#ffffff');
      al(0.12, () => { for (let k = 0; k < 6; k++) ln(10 + k * 50, 0, 50 + k * 50, GY - 6, '#ffffff'); });
      al(0.25, () => { for (let x = 0; x < W; x += 6) f(x + rnd(x) * 3, GY - 3 + rnd(x + 4) * 8, 2, 0.5, '#ffd98a'); });
    } else {
      al(0.3, () => { for (let i = 0; i < 24; i++) f(rnd(i + 330) * W, 56 + rnd(i + 331) * 70, 8 + rnd(i + 332) * 24, 0.5, '#ffffff'); });
      al(0.2, () => f(0, GY - 8, W, 2, '#fff'));
    }
    al(0.14, () => f(0, GY - 5, W, 1, '#fff')); al(0.12, () => f(0, H - 7, W, 7, '#000'));
  };

  // ---------- ангар ----------
  const hg0 = BG.hangar;
  BG.hangar = function (e) {
    hg0(e);
    const W = e.W, H = e.H, GY = e.GY, cam = e.cam;
    const first = Math.floor(cam * 0.6 / 150) - 1;
    for (let i = first; i < first + Math.ceil(W / 150) + 3; i++) {
      const x = Math.round(i * 150 - cam * 0.6);
      al(0.3, () => { for (let k = 0; k < 148; k += 5) if (rnd(i * 13 + k) < 0.4) f(x + k, GY - 50 + rnd(i + k) * 38, 3, 0.5, '#2a1a14'); });
      al(0.35, () => { for (let k = 0; k < 3; k++) { f(x + 18 + k * 44, GY - 38, 9, 0.5, '#fff'); f(x + 21 + k * 44, GY - 33, 0.5, 4, '#6a4a3a'); } });
      al(0.2, () => f(x, GY - 10, 148, 2, '#000'));
    }
    const bo = Math.round(cam * 0.9);
    al(0.5, () => { for (let wx = -(bo % 40) - 40; wx < W + 40; wx += 40) { f(wx + 3, 10, 0.5, 20, '#c2683a'); f(wx + 22, 10, 0.5, 20, '#c2683a'); } });
    al(0.1, () => { for (let k = 0; k < 4; k++) ln(20 + k * 60, 41, 60 + k * 60, GY, '#ffe9b0'); });
    al(0.35, () => { for (let i = 0; i < 4; i++) { const x = wrx(e, rnd(i + 400), 300); f(x, GY + 14 + rnd(i) * 8, 10 + rnd(i + 3) * 8, 1, '#7a8a9a'); f(x + 2, GY + 14.5, 4, 0.5, '#fff'); } });
  };

  // ---------- оранжерея ----------
  const gh0 = BG.greenhouse;
  BG.greenhouse = function (e) {
    gh0(e);
    const W = e.W, H = e.H, GY = e.GY, cam = e.cam;
    al(0.1, () => f(0, 0, W, 20, '#fff'));
    al(0.5, () => { for (let i = 0; i < 40; i++) f(rnd(i + 500) * W, rnd(i + 501) * (GY - 20), 0.5, 1, '#ffffff'); });
    al(0.2, () => { for (let k = 0; k < 5; k++) ln(30 + k * 55, 0, 70 + k * 55, GY, '#ffffff'); });
    al(0.35, () => { for (let i = 0; i < 18; i++) f(wrx(e, rnd(i + 520), 500, 0.9), GY - 8 + rnd(i) * 7, 1.5, 0.5, '#a8f0b8'); });
    for (let i = Math.floor(cam / 40) - 1; i < Math.floor(cam / 40) + 9; i++) { const sx = i * 40 - cam; al(0.5, () => { f(sx + 12, GY + 9.5, 8, 0.5, '#fff'); if (Math.sin(e.t * 2 + i) > 0) f(sx + 14 + (i % 3) * 2, GY + 10.5, 2, 0.5, '#fff'); }); }
    al(0.22, () => f(0, GY + 1, W, 3, '#000')); f(0, GY, W, 0.5, '#e4ece6');
    al(0.1, () => f(0, H - 6, W, 6, '#000'));
  };

  // ---------- сад Юйюань ----------
  const yg0 = BG.yuGarden;
  const rain = BG.yuGarden;
  BG.yuGarden = function (e) {
    { const W0 = e.W, GY0 = e.GY, c0 = e.cam; f(0, 92, W0, GY0 - 92, '#2f5a3a'); al(0.8, () => { for (let x = -(c0 * 0.6 % 9); x < W0; x += 9) { disc(x + 4, 100, 5, '#3a6a44'); } for (let i = 0; i < 70; i++) f(rnd(i + 700) * W0, 98 + rnd(i + 701) * (GY0 - 100), 1.5, 0.5, i % 2 ? '#5a9a60' : '#1f4028'); }); f(0, GY0 - 6, W0, 6, '#7a8a70'); f(0, GY0 - 6, W0, 0.5, '#a8b8a0'); }
    yg0(e);
    const W = e.W, H = e.H, GY = e.GY, cam = e.cam, t = e.t;
    const px0 = Math.round(150 - cam * 0.7), cx = px0 + 60;
    const tiles = (c, y, hw) => { al(0.4, () => { for (let i = 0; i < 9; i++) { const w = hw - i * hw * 0.07; for (let k = -w + 2; k < w - 1; k += 3) f(cx + k, y - i, 0.5, 1, '#1a171e'); } f(cx - hw, y + 1, hw * 2, 0.5, '#8a8590'); }); };
    tiles(cx, GY - 36, 52); tiles(cx, GY - 64, 40);
    al(0.35, () => { for (let i = 0; i < 88; i += 11) f(cx - 44 + i + 2, GY - 34, 0.5, 34, '#d07a5a'); f(cx - 44, GY - 34, 88, 0.5, '#d07a5a'); });
    al(0.4, () => { for (let k = 0; k < 6; k++) { const x = wrx(e, rnd(k + 600), 380, 0.7); f(x, GY + 11 + rnd(k) * 8, 6, 1, '#4a7a4a'); f(x + 1, GY + 10.5, 4, 0.5, '#7ab07a'); } });
    al(0.25, () => f(px0 + 14, GY + 7, 92, 6, '#c8d8d0'));
    f(0, GY + 4.5, W, 0.5, '#d8d3c6'); al(0.2, () => f(0, GY + 5.5, W, 2, '#000'));
    al(0.12, () => f(0, H - 6, W, 6, '#000'));
  };
  BG.yuGarden.fgRail = true;

  // ---------- предметы Шанхая ----------
  wrap('glassBlock', (x, gy, p) => { const w = p.w || 24, h = p.h || 44; al(0.3, () => { ln(x + 3, gy - h + 4, x + 9, gy - h + 16, '#ffffff'); ln(x + 8, gy - h + 4, x + 14, gy - h + 18, '#ffffff'); }); f(x, gy - h, w, 0.5, '#9ab6d0'); f(x + w - 3, gy - h, 0.5, h, '#1a2a40'); al(0.4, () => { for (let y = gy - h + 3; y < gy - 3; y += 8) f(x + 2, y + 1, w - 6, 0.5, '#d0e4f4'); }); al(0.22, () => f(x - 1, gy - 0.5, w + 2, 1.5, '#000')); });
  wrap('stoneBld', (x, gy, p) => { const w = p.w || 50, h = p.h || 96; for (let wy = gy - h + 6; wy < gy - 14; wy += 8) { f(x, wy + 6, w, 0.5, '#8f8676'); for (let wx = 4; wx < w - 6; wx += 7) { f(x + wx - 0.5, wy + 5, 5, 0.5, '#c4bba8'); f(x + wx, wy, 4, 0.5, '#5a5448'); f(x + wx + 1.5, wy, 0.5, 5, '#8a8272'); } } al(0.25, () => f(x, gy - 2, w, 2, '#000')); f(x, gy - h + 0.5, w, 0.5, '#e0d8c4'); });
  wrap('bush', (x, gy, p) => { al(0.85, () => { for (let i = 0; i < 14; i++) f(x - 2 + rnd(i + x) * 18, gy - 9 + rnd(i + 9) * 8, 1.5, 0.5, i % 2 ? '#7aca80' : '#2a5a30'); }); al(0.25, () => f(x - 6, gy - 0.5, 24, 1.5, '#000')); });
  wrap('willow', (x, gy) => { al(0.6, () => { for (let i = 0; i < 20; i++) f(x - 20 + rnd(i + x) * 40, gy - 50 + rnd(i + 3) * 26, 0.5, 3, i % 2 ? '#a8e888' : '#3a7a38'); }); f(x, gy - 38, 0.5, 38, '#7a6448'); f(x - 1, gy - 2, 5, 2, '#4a3a2a'); al(0.22, () => f(x - 8, gy - 0.5, 20, 1.5, '#000')); });
  wrap('brickTower', (x, gy, p) => { const h = p.h || 100; al(0.3, () => { for (let y = gy - h + 8; y < gy - 8; y += 4) for (let k = ((y / 4) | 0) % 2 * 3; k < 34; k += 6) f(x + k, y, 0.5, 4, '#5a2a20'); }); f(x + 33, gy - h, 1, h, '#7a3a2e'); al(0.25, () => f(x - 2, gy - 0.5, 38, 1.5, '#000')); });
  wrap('cableBridge', (x, gy) => { const L = x - 110; f(L, gy - 16.5, 230, 0.5, '#c8946a'); al(0.4, () => { for (let i = 0; i < 230; i += 12) f(L + i, gy - 15, 0.5, 12, '#fff'); }); al(0.2, () => f(L, gy - 0.5, 230, 1.5, '#000')); });
  wrap('metroSign', (x, gy) => { f(x + 1, gy - 61.5, 38, 0.5, '#7aaaf0'); f(x + 18.5, gy - 30, 0.5, 30, '#6a6f7f'); al(0.22, () => f(x + 8, gy - 0.5, 24, 1.5, '#000')); });
  wrap('hdKiosk', (x, gy) => { f(x + 1, gy - 23.5, 24, 0.5, '#fff'); for (let k = 0; k < 7; k++) f(x - 1 + k * 4, gy - 28, 2, 4.5, '#ffffff55'); f(x + 4, gy - 10.5, 18, 0.5, '#bfb494'); al(0.22, () => f(x - 1, gy - 0.5, 28, 1.5, '#000')); });
  wrap('dept', (x, gy) => { for (let k = 0; k < 11; k++) { f(x + 4 + k * 8, gy - 30, 4, 0.5, '#d8e4ee'); f(x + 6 + k * 8, gy - 30, 0.5, 8, '#5a6a78'); } f(x, gy - 34, 90, 0.5, '#fff6e0'); al(0.22, () => f(x - 2, gy - 0.5, 94, 1.5, '#000')); });
})();
