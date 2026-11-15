// ===== scenes10.js — залы вокзала и аэропортов (по фото) и «мелкая жизнь» в сценах =====
(() => {
  const S = SCENES, P = S.P, BG = S.BG, { r, px, rnd, disc } = A, ln = S.ln;
  const { f, al, mix } = S.fx;
  const mod = (a, n) => ((a % n) + n) % n;
  const arch = (cx, y, w, col) => { f(cx - w / 2, y, w, 0.5, col); f(cx - w / 2 + 0.5, y - 0.5, w - 1, 0.5, col); f(cx - w / 2 + 1, y - 1, w - 2, 0.5, col); };
  const walker = (x, y, c, t, ph) => { const s = Math.sin(t * 6 + ph) > 0 ? 0.5 : 0; f(x, y - 11, 3, 4, '#d8b898'); f(x - 0.5, y - 8, 4, 5, c); f(x, y - 3, 1.2, 3 - s, '#2a2a38'); f(x + 1.8, y - 3, 1.2, 2.5 + s, '#2a2a38'); };
  const walkers = (e, y, n, seed, par) => { for (let i = 0; i < n; i++) { const sp = 6 + rnd(seed + i) * 9, dir = i % 2 ? 1 : -1, x = mod(rnd(seed + i + 40) * (e.W + 80) + dir * e.t * sp - e.cam * par, e.W + 80) - 40; walker(x, y - (i % 3), ['#3a4a68', '#8a3a3a', '#2a2a38', '#4a6a58', '#b88a3a'][i % 5], e.t, i * 2); } };
  const floor = (e, base, tone, tact) => { const { W, H, GY, cam } = e; f(0, GY, W, H - GY, base); for (let x = -(cam % 26) - 26; x < W + 26; x += 26) { al(0.18, () => { ln(x, GY, x + 14, H, '#000'); ln(x + 13, GY, x - 1, H, '#000'); }); } for (const y of [GY + 7, GY + 16]) al(0.15, () => f(0, y, W, 0.5, '#000')); if (tact) { for (let x = -(cam % 8); x < W; x += 8) f(x, GY + 13, 5, 1, '#e8c23a'); } al(0.18, () => f(0, GY, W, 3, '#000')); al(0.22, () => f(0, GY + 3, W, 5, '#fff')); al(0.1, () => f(0, H - 6, W, 6, '#000')); };

  // ---------- Финляндский вокзал: жёлтые стены, белый свод с круглым плафоном ----------
  BG.hallFin = e => {
    const { W, H, GY, cam, t } = e;
    f(0, 0, W, GY, '#e8e08e'); al(0.1, () => f(0, 46, W, GY - 46, '#fff'));
    f(0, 0, W, 46, '#f6f4ec'); al(0.25, () => f(0, 30, W, 16, '#c8c4b0')); f(0, 44, W, 2, '#c8b878'); f(0, 46, W, 1, '#8a7a4a');
    // круглый плафон
    const px0 = 110 - cam * 0.3; disc(px0, 10, 30, '#b8b4a4'); disc(px0, 10, 28, '#3a4a4a'); for (let k = 0; k < 16; k++) ln(px0, 10, px0 + Math.cos(k * 0.39) * 27, 10 + Math.sin(k * 0.39) * 27, '#dfe6e6'); disc(px0, 10, 7, '#f6f6ee'); al(0.5, () => disc(px0, 10, 20, '#fff'));
    f(0, 0, W, 7, '#f6f4ec');
    // арочные окна под сводом
    for (let x = -(cam * 0.6 % 44) - 44; x < W + 44; x += 44) { f(x, 34, 40, 11, '#3a4a58'); for (let k = 0; k < 40; k += 5) f(x + k, 34, 0.5, 11, '#dfe6ee'); f(x, 34, 40, 0.5, '#8a7a4a'); al(0.3, () => ln(x + 4, 36, x + 14, 44, '#fff')); }
    // часы
    const cx = 150 - cam * 0.8; disc(cx, 68, 8, '#f4f0e0'); disc(cx, 68, 7, '#fff'); for (let k = 0; k < 12; k++) px(cx + Math.cos(k * 0.52) * 6, 68 + Math.sin(k * 0.52) * 6, '#2a2a2a'); ln(cx, 68, cx + 2, 64, '#2a2a2a'); ln(cx, 68, cx + 4, 70, '#2a2a2a');
    // табло отправления
    for (const bx of [30, 218, 290]) { const x = bx - cam * 0.8; f(x, 54, 34, 20, '#26283a'); f(x, 54, 34, 0.5, '#7a7e98'); for (let k = 0; k < 6; k++) { f(x + 2, 57 + k * 3, 6, 1, '#f0a030'); f(x + 10, 57 + k * 3, 14 + (k * 3) % 8, 1, k % 2 ? '#e8e4d0' : '#f0d878'); f(x + 27, 57 + k * 3, 5, 1, '#6fd16a'); } }
    // аркада с высокими тёмными проёмами
    for (let x = -(cam % 46) - 46; x < W + 46; x += 46) { f(x, GY - 62, 8, 62, '#dcd2a4'); f(x, GY - 62, 0.5, 62, '#f6eec0'); f(x + 7.5, GY - 62, 0.5, 62, '#a89c74'); f(x + 8, GY - 58, 34, 38, '#2a3340'); f(x + 8, GY - 58, 34, 0.5, '#7a8a9a'); for (let k = 0; k < 34; k += 6) f(x + 8 + k, GY - 58, 0.5, 38, '#4a5668'); f(x + 8, GY - 38, 34, 0.5, '#4a5668'); al(0.18, () => ln(x + 12, GY - 56, x + 24, GY - 24, '#fff')); }
    f(0, GY - 20, W, 20, '#d8cfa0'); f(0, GY - 20, W, 1, '#f0e8b8'); f(0, GY - 3, W, 3, '#b8ac84');
    walkers(e, GY - 3, 5, 100, 0.6);
    floor(e, '#e0d8bc', 0, true);
  };

  // ---------- Пулково: золотистый «граненый» потолок, серебристые эскалаторы, стальные тумбы ----------
  BG.hallPulk = e => {
    const { W, H, GY, cam, t } = e;
    f(0, 0, W, GY, '#cfc8bc');
    // потолок из треугольных граней
    f(0, 0, W, 52, '#b89a6a'); for (let x = -(cam * 0.5 % 34) - 34; x < W + 34; x += 34) { for (let k = 0; k < 3; k++) { const y0 = k * 17; ln(x, y0, x + 17, y0 + 17, '#8a6a42'); ln(x + 17, y0 + 17, x + 34, y0, '#d8bc8a'); f(x + 16.5, y0, 0.5, 17, '#a07e50'); } }
    al(0.25, () => f(0, 40, W, 12, '#5a3a22')); f(0, 52, W, 2, '#6a4a2e');
    // косая светлая прорезь и фиолетовые огни колонн
    al(0.75, () => { for (let i = 0; i < 40; i++) f(60 - cam * 0.2 + i * 1.1, i * 0.9, 12 - i * 0.2, 1.2, '#f6f6f2'); });
    for (const lx of [40, 150, 250]) { const x = lx - cam * 0.5; f(x - 1, 40, 3, 20, '#8a8a92'); al(0.7, () => disc(x + 0.5, 42, 5, '#c04ae0')); al(0.25, () => disc(x + 0.5, 42, 14, '#c04ae0')); }
    // антресоль со стеклянным парапетом
    f(0, 62, W, 14, '#e8e6e0'); f(0, 62, W, 0.5, '#fff'); f(0, 76, W, 3, '#9a9ea8'); for (let x = -(cam * 0.7 % 14) - 14; x < W + 14; x += 14) { f(x, 56, 0.5, 6, '#9a9ea8'); } f(0, 56, W, 0.5, '#aab0b8'); al(0.2, () => f(0, 56, W, 6, '#aee0f0'));
    // эскалаторы: две параллельные серебристые ленты
    const ex = 120 - cam * 0.6; for (let k = 0; k < 2; k++) { const o = k * 11; for (let i = 0; i < 56; i++) { f(ex + o + i, GY - 14 - i * 0.55, 1, 6, i % 4 < 2 ? '#aab2bc' : '#8a929c'); f(ex + o + i, GY - 22 - i * 0.55, 1, 1.5, '#4a4e58'); } f(ex + o, GY - 14, 56, 1, '#6a727c'); }
    f(ex - 6, GY - 6, 80, 6, '#8a929c'); f(ex - 6, GY - 6, 80, 0.5, '#d8e0e8');
    // синяя колонна и серые панели
    f(10 - cam * 0.9, 56, 8, GY - 56, '#2a4ab8'); f(10 - cam * 0.9, 56, 1, GY - 56, '#5a7ae0'); f(200 - cam * 0.9, 60, 8, GY - 60, '#2a4ab8');
    f(0, GY - 18, W, 18, '#9aa0a8'); f(0, GY - 18, W, 1, '#d0d6dc');
    walkers(e, GY - 2, 4, 200, 0.7);
    floor(e, '#8e9096', 0, false);
    for (let k = 0; k < 14; k++) { const bx = mod(k * 28 - cam, W + 40) - 8; f(bx, GY + 16, 3, 7, '#b8bec8'); f(bx, GY + 16, 0.5, 7, '#fff'); f(bx, GY + 18, 3, 1, '#e8c23a'); al(0.3, () => f(bx - 1, GY + 23, 5, 1, '#000')); }
  };

  // ---------- Калининград (Храброво): белые стены, большие экраны, стойки проката, синие кресла ----------
  BG.hallKgd = e => {
    const { W, H, GY, cam, t } = e;
    f(0, 0, W, GY, '#e6eaee'); f(0, 0, W, 30, '#aeb4ba'); for (let x = -(cam % 28) - 28; x < W + 28; x += 28) f(x, 0, 1.5, 30, '#7a828a'); f(0, 30, W, 1, '#6a727a');
    for (let x = -(cam * 0.9 % 52) - 52; x < W + 52; x += 52) { f(x, 12, 6, 2, '#fff6c8'); al(0.25, () => f(x - 4, 14, 14, 10, '#fff6c8')); }
    // большие экраны на стене
    const ax = 30 - cam * 0.8, bx = 130 - cam * 0.8; f(ax, 36, 40, 26, '#f4f6f8'); f(ax + 3, 40, 12, 8, '#c84a3a'); f(ax + 17, 40, 12, 8, '#3a78c8'); f(ax + 3, 52, 30, 1, '#aab0b8'); f(bx, 38, 44, 24, '#1a1c22'); al(0.6, () => { f(bx + 8, 42, 10, 14, '#e8e8ee'); f(bx + 26, 44, 8, 8, '#e0a830'); });
    // стойки проката: четыре цветных вывески
    const cx = 200 - cam * 0.9; f(cx - 26, 66, 120, 20, '#cfd4d8'); for (const [dx, w, c, tc] of [[-24, 28, '#2a9a4a', '#fff'], [6, 22, '#f0c830', '#222'], [30, 24, '#e8782a', '#fff'], [56, 30, '#d8282c', '#fff']]) { f(cx + dx, 62, w, 6, c); f(cx + dx + 2, 64, w - 4, 1.5, tc); }
    f(cx - 26, 82, 120, 3, '#b8bcc4'); f(cx - 26, 86, 120, 10, '#e8eef0');
    // белые колонны, стеклянная стена слева
    for (const lx of [90, 260]) { const x = lx - cam * 0.9; f(x, 30, 8, GY - 30, '#f2f4f6'); f(x + 6, 30, 2, GY - 30, '#b8bcc4'); }
    f(0, 40, 6, GY - 40, '#8ab4d4'); f(0, 40, 6, GY - 40, '#8ab4d4'); al(0.4, () => { for (let k = 0; k < 4; k++) ln(0, 46 + k * 16, 6, 36 + k * 16, '#fff'); });
    f(0, GY - 8, W, 8, '#c8ccd4'); f(0, GY - 8, W, 0.5, '#fff');
    walkers(e, GY - 2, 4, 300, 0.8);
    floor(e, '#b8b4a8', 0, false);
  };

  // ---------- табло прибытия ----------
  P.arrivalBoard = (x, gy, p, e) => { const w = p.w || 64, h = p.h || 40; f(x - 1, gy - h - 12, w + 2, 6, '#2a4ab8'); f(x - 1, gy - h - 12, w + 2, 0.5, '#7a9aff'); f(x, gy - h - 6, w, h, '#14161e'); for (let k = 0; k < 9; k++) { f(x + 3, gy - h - 3 + k * 4, 10, 1.5, '#f0d84a'); f(x + 16, gy - h - 3 + k * 4, 24 - (k * 5) % 9, 1.5, '#f0d84a'); f(x + 46, gy - h - 3 + k * 4, 10, 1.5, k % 3 ? '#f0d84a' : '#6fd16a'); } f(x - 1, gy - 6, w + 2, 0.5, '#aab0b8'); };

  // ---------- мелкая жизнь: чайки, пыль в свете, самолёт на закате, люди на фоне ----------
  const fg0 = S.world.fg;
  S.world.fg = function (e) {
    fg0(e);
    const o = e.o, bg = o.bg, t = e.t, W = e.W, H = e.H, GY = e.GY, time = o.time || 'day', day = !(time === 'night' || time === 'eve' || time === 'fogn');
    if ((bg === 'city' || bg === 'shore' || bg === 'piter' || bg === 'shCity') && day && !o.ice && time !== 'fog' && time !== 'storm') {
      for (let i = 0; i < 3; i++) { const sp = 7 + i * 3, x = mod(i * 97 + t * sp - e.cam * 0.2, W + 60) - 30, y = 24 + i * 11 + Math.sin(t * 0.7 + i * 2) * 3, wing = Math.sin(t * 7 + i * 1.7) > 0 ? 1 : -0.5; f(x - 3, y + wing * 0.5, 3, 0.5, '#f4f4f4'); f(x, y, 1, 0.5, '#f4f4f4'); f(x + 1, y + wing * 0.5, 3, 0.5, '#f4f4f4'); }
    }
    if (bg === 'city' && (time === 'eve' || time === 'dawn' || time === 'gold')) { const x = mod(t * 3 - 20 + (e.cam * 0.05), W + 80) - 40; f(x, 40, 3, 0.5, '#fff6d8'); f(x + 3, 40, 2, 0.5, '#ff4a4a'); al(0.2, () => f(x - 8, 40, 8, 0.5, '#fff')); }
    if (bg === 'room') { al(0.35, () => { for (let i = 0; i < 12; i++) { const x = mod(rnd(i + 900) * W + Math.sin(t * 0.4 + i) * 6 - e.cam * 0.3, W), y = mod(rnd(i + 910) * 100 + t * (1.2 + rnd(i) * 1.5), 110) + 6; f(x, y, 0.6, 0.6, '#fff6d8'); } }); }
    if (bg === 'hallFin' || bg === 'hallPulk' || bg === 'hallKgd') { al(0.08 + 0.03 * Math.sin(t * 1.3), () => f(0, 0, W, 50, '#fff')); }
  };
})();
