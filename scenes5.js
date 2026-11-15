// ===== scenes5.js — устойчивый рендер предметов, самолёт, вагон поезда =====
(() => {
  const S = SCENES, BG = S.BG, P = S.P, { r, px, rnd, disc } = A, ln = S.ln;
  const { f, al, mix } = S.fx;

  // ---- 1) предметы рисуются в мировых координатах: случайные узоры, зависящие от x, больше не «дрожат» при ходьбе ----
  const call = (fn, p, e, gyOff) => {
    const x = Math.round(p.x - e.cam * (p.par || 1)); if (x < -260 || x > e.W + 60) return;
    const g = A.ctx, wx = p.x; g.save(); g.translate(x - wx, 0); fn(wx, e.GY + (p.dy || 0), p, e); g.restore();
  };
  const world = function (e) {
    (BG[e.o.bg || 'city'] || BG.black)(e);
    for (const p of (e.o.props || [])) { if (p.fg) continue; const fn = P[p.k]; if (fn) call(fn, p, e); }
  };
  const old = S.world;
  world.fg = function (e) {
    for (const p of (e.o.props || [])) { if (!p.fg) continue; const fn = P[p.k]; if (fn) call(fn, p, e); }
    const fx = e.o.fx;
    if (fx === 'snow') A.snow(e.W, e.H, e.t, e.cam, 55);
    else if (fx === 'snowlight') A.snow(e.W, e.H, e.t, e.cam, 22);
    else if (fx === 'rain') A.rain(e.W, e.H, e.t, e.cam, 60);
    else if (fx === 'petals') A.petals(e.W, e.H, e.t, e.cam, 22);
    else if (fx === 'fog') { al(0.35, () => r(0, 60, e.W, 60, '#d6dadd')); al(0.2, () => r(0, 30, e.W, 100, '#d6dadd')); }
    if (e.o.tint) A.tint(e.W, e.H, e.o.tint[0], e.o.tint[1]);
    if (e.o.caption) S.txt(e.W / 2, 10, e.o.caption, '#f6ecd9', 8, 'center');
    A.vignette(e.W, e.H, 0.3);
  };
  S.world = world;

  // ---- 2) самолёт в небе: детальный, в сетке 0.5 ----
  P.jet = (x, gy, p, e) => {
    const y = gy - (p.y || 70) + Math.round(Math.sin(e.t * 2) * 2) + 0.5;
    // инверсионный след
    for (let k = 0; k < 22; k++) al(0.34 - k * 0.014, () => f(x - 8 - k * 4.5, y + 6.2 + Math.sin(e.t * 3 + k) * 0.4, 4, 1 + k * 0.05, '#ffffff'));
    al(0.2, () => f(x - 20, y + 2, 16, 0.5, '#ffffff'));
    // дальнее крыло
    f(x + 20, y - 1, 12, 1, '#b8c0cc'); f(x + 18, y, 12, 0.5, '#9aa4b2');
    // фюзеляж
    f(x, y, 58, 9, '#f6f4ee'); f(x + 56, y + 0.5, 3, 8, '#f6f4ee'); f(x + 59, y + 1.5, 2.5, 6, '#f6f4ee'); f(x + 61.5, y + 3, 1.5, 3, '#e8e4da');
    f(x + 1, y - 0.5, 54, 0.5, '#ffffff'); f(x + 54, y, 4, 0.5, '#ffffff');
    f(x, y + 6.5, 59, 2.5, '#d4d8e0'); f(x + 2, y + 8.5, 54, 0.5, '#aab2c0'); f(x, y + 4.8, 60, 0.7, '#2f5fd0'); f(x, y + 5.5, 60, 0.4, '#c8323c');
    // окна и кабина
    for (let i = 0; i < 19; i++) f(x + 10 + i * 2.2, y + 2.4, 1, 1.4, '#3a5a8a');
    f(x + 56, y + 1.5, 2.5, 1.6, '#243a60'); f(x + 56.5, y + 1.7, 1, 0.5, '#8fb8f0');
    // хвост
    f(x - 7, y - 11, 7, 12, '#f6f4ee'); f(x - 5, y - 11, 6, 0.5, '#fff'); f(x - 7, y - 11, 4, 3, '#c8323c'); f(x - 7, y - 8, 7, 3.5, '#2f5fd0'); f(x - 1, y - 6, 1, 7, '#d0d4dc');
    f(x - 9, y + 1, 9, 2, '#d8dce4'); f(x - 12, y + 1.5, 5, 1, '#c0c6d0');
    // ближнее крыло с закрылками и двигателем
    f(x + 14, y + 6, 28, 2.5, '#e6e8ee'); f(x + 18, y + 8, 22, 2.5, '#d8dce4'); f(x + 22, y + 10, 14, 1, '#c8ccd6'); f(x + 40, y + 6, 2.5, 5, '#c8323c');
    f(x + 14, y + 6, 28, 0.5, '#ffffff'); for (let k = 0; k < 4; k++) f(x + 20 + k * 5, y + 8.5, 0.5, 2, '#aab2c0');
    f(x + 22, y + 10.5, 11, 3.5, '#9aa0ac'); f(x + 22, y + 10.5, 2, 3.5, '#4a5060'); f(x + 24, y + 11, 8, 0.5, '#c8ccd6');
    al(0.35 + 0.15 * Math.sin(e.t * 30), () => f(x + 22.5, y + 11, 1, 2.5, '#fff'));
    al(0.25, () => f(x + 2, y + 9, 56, 1.5, '#8a96aa'));
    if (Math.floor(e.t * 2) % 2) { px(x + 41, y + 8, '#ff5a5a'); px(x - 7, y - 10, '#ffffff'); }
  };
  const plane0 = P.plane;
  P.plane = (x, gy, p, e) => {
    plane0(x, gy, p, e);
    f(x + 0.5, gy - 39.5, 44, 0.5, '#ffd8a0'); f(x, gy - 33.5, 44, 0.5, '#8a4a10'); f(x + 14, gy - 34, 16, 0.5, '#fff'); f(x + 18.5, gy - 30, 0.5, 30, '#b8c0cc');
    for (let i = 0; i < 9; i++) f(x + 6 + i * 4, gy - 38, 1.5, 1.2, '#7a5a30'); al(0.25, () => f(x - 4, gy - 0.5, 52, 1.5, '#000'));
  };

  // ---- 3) вагон электрички: за окном бежит пейзаж ----
  BG.train = function (e) {
    const W = e.W, H = e.H, GY = e.GY, t = e.t, bob = Math.sin(t * 13) * 0.25;
    // стена и потолок
    r(0, 0, W, GY, '#d8d1bd'); al(0.18, () => f(0, 0, W, 8, '#000')); f(0, 8, W, 1, '#f0ead8'); f(0, 9, W, 0.5, '#9a937f');
    for (let x = 6; x < W; x += 26) { f(x, 3, 14, 2.5, '#fffbe8'); al(0.12, () => f(x - 4, 5, 22, 18, '#fff6c8')); }
    r(0, GY - 36, W, 36, '#3f6a5a'); f(0, GY - 36, W, 1, '#7aa896'); f(0, GY - 35, W, 0.5, '#1f3a30');
    for (let x = 0; x < W; x += 12) al(0.18, () => f(x, GY - 34, 0.5, 30, '#000'));
    // большое окно: пейзаж
    const wx = Math.round(W / 2) - 60, wy = 16, ww = 120, wh = 66;
    f(wx - 3, wy - 3, ww + 6, wh + 6, '#5a4a3a'); f(wx - 2, wy - 2, ww + 4, 0.5, '#8a7a62'); r(wx, wy, ww, wh, '#bfe0f2');
    const c = A.ctx; c.save(); c.beginPath(); c.rect(wx, wy + bob, ww, wh); c.clip();
    for (let k = 0; k < 4; k++) f(wx, wy + k * 8, ww, 8, ['#9cc4e6', '#b4d4ee', '#cfe4f4', '#e4f0f6'][k]);
    // далёкий лес и холмы
    for (let i = -2; i < 12; i++) { const hx = wx + ((i * 38 - t * 6) % (ww + 80) + ww + 80) % (ww + 80) - 40; disc(Math.round(hx), wy + 44, 14, '#9fb4c8'); }
    for (let i = 0; i < 14; i++) { const hx = wx + ((i * 24 - t * 16) % (ww + 40) + ww + 40) % (ww + 40) - 20; f(hx, wy + 34, 2, 12, '#5a7a6a'); f(hx - 1.5, wy + 38, 5, 8, '#4a6a5a'); f(hx - 2.5, wy + 42, 7, 5, '#3f5f50'); al(0.8, () => f(hx - 1, wy + 38, 4, 0.5, '#fff')); }
    f(wx, wy + 46, ww, wh - 46, '#eef3f8');
    for (let i = 0; i < 12; i++) f(wx + ((i * 31 - t * 40) % (ww + 30) + ww + 30) % (ww + 30), wy + 50 + (i % 4) * 3, 12, 0.5, '#c4d2e2');
    // столбы и деревья у самых путей
    for (let i = 0; i < 4; i++) { const px0 = wx + ((i * 70 - t * 110) % (ww + 70) + ww + 70) % (ww + 70) - 20; f(px0, wy + 8, 1.5, 52, '#4a3a2a'); f(px0 - 4, wy + 14, 10, 1, '#4a3a2a'); f(px0 - 4, wy + 20, 10, 0.5, '#4a3a2a'); }
    for (let i = 0; i < 5; i++) { const tx = wx + ((i * 47 + 10 - t * 70) % (ww + 50) + ww + 50) % (ww + 50) - 25; f(tx, wy + 40, 2, 26, '#3a2a22'); for (let k = 0; k < 4; k++) f(tx - 4 + k, wy + 36 + k * 5, 10 - k * 2, 5, k % 2 ? '#1f4a3a' : '#2f6b4f'); f(tx - 4, wy + 36, 10, 0.5, '#fff'); }
    al(0.35, () => { ln(wx + 8, wy + 2, wx + 30, wy + wh - 2, '#fff'); ln(wx + 14, wy + 2, wx + 28, wy + 30, '#fff'); });
    c.restore();
    f(wx + ww / 2 - 1, wy, 2, wh, '#5a4a3a'); f(wx + ww / 2 - 0.5, wy, 0.5, wh, '#8a7a62'); f(wx - 4, wy + wh + 3, ww + 8, 3, '#6a5a48'); f(wx - 4, wy + wh + 3, ww + 8, 0.5, '#9a8a72');
    // поручень и багажная полка
    f(0, 20, 22, 1.5, '#8a6a42'); f(W - 22, 20, 22, 1.5, '#8a6a42'); f(0, 21.5, 22, 0.5, '#4a3a22'); f(W - 22, 21.5, 22, 0.5, '#4a3a22');
    // скамьи под героями: напротив друг друга
    const sx = Math.round(W / 2) - 4 - (e.W < 200 ? 0 : 0);
    for (const [bx, dir] of [[90, 1], [124, -1]]) {
      const x0 = dir > 0 ? bx : bx - 20;
      f(bx - (dir > 0 ? 1 : -1) * 0, GY - 34, 4, 28, '#a8452f'); f(x0, GY - 8, 22, 3, '#c8573a'); f(x0, GY - 8, 22, 0.5, '#e87a5a'); f(x0, GY - 5, 22, 5, '#7a2e1f');
      f(dir > 0 ? bx : bx, GY - 34, 4, 0.5, '#e87a5a');
    }
    f(104, GY - 12, 10, 1, '#d8cfb6'); f(104, GY - 11, 10, 0.5, '#8a7a5a'); f(108, GY - 11, 2, 11, '#6a5a48');   // столик у окна
    // пол: линолеум с полосой
    r(0, GY, W, H - GY, '#6a6258'); f(0, GY, W, 1, '#8a8274'); for (let x = 0; x < W; x += 18) al(0.25, () => f(x, GY, 0.5, H - GY, '#000'));
    f(0, GY + 10, W, 2, '#c8b878'); al(0.22, () => f(0, GY, W, 3, '#000')); al(0.1, () => f(0, H - 6, W, 6, '#000'));
    // лёгкая тряска света
    al(0.04 + 0.03 * Math.sin(t * 7), () => f(0, 0, W, H, '#fff'));
  };
})();
