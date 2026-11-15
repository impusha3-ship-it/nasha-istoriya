// ===== scenes13.js — Китай: лесистые холмы у Великой стены (раньше там стояли казахстанские горы) =====
(() => {
  const S = SCENES, P = S.P, { rnd } = A;
  const { f, al } = S.fx;
  P.wallHills = (x, gy, p) => {
    const base = gy - 30, L = 300;
    const far = u => 30 + 9 * Math.sin(u * 0.036 + 0.6) + 5 * Math.sin(u * 0.095 + 1.4) + 2 * Math.sin(u * 0.23);
    const near = u => 18 + 8 * Math.sin(u * 0.052 + 2.1) + 4 * Math.sin(u * 0.13 + 0.2);
    for (let u = 0; u < L; u++) {
      const h = far(u); f(x + u, base - h, 1, h + 2, '#8aa596'); f(x + u, base - h, 1, 2, '#a9c0b0');          // дальний хребет в дымке
    }
    al(0.35, () => f(x, base - 26, L, 12, '#dfe8e0'));
    for (let u = 0; u < L; u++) {
      const h = near(u); f(x + u, base - h, 1, h + 2, '#4f7a56'); f(x + u, base - h, 1, 1.5, '#6a9a68');
      if (u % 3 === 0) f(x + u, base - h + 3 + (u % 5), 1, 2, '#3a6040');                                         // деревья на склоне
      if (u % 11 === 4) f(x + u, base - h - 1, 1, 1.5, '#2f5236');
    }
    // сторожевая башня на гребне
    const tx = x + 210, th = near(210); f(tx, base - th - 7, 7, 7, '#a89a86'); f(tx, base - th - 8, 7, 1.5, '#7a4a3a'); f(tx + 2, base - th - 5, 2, 2.5, '#3a3226'); f(tx - 1, base - th - 9, 9, 1, '#5a3a2e');
  };

  // ---------- Ботанический сад в Петербурге: стеклянные оранжереи за густой живой изгородью (по фото) ----------
  S.BG.botGarden = e => {
    const W = e.W, H = e.H, GY = e.GY, cam = e.cam, ln = S.ln;
    A.sky(W, H, ['#e4e8e6', '#eceeec', '#f3f4f1', '#f6f6f2'], GY);
    // оранжерея: башня-павильон и длинное сводчатое крыло
    const o = cam * 0.28, base = GY - 36;
    const glass = (x, y, w, h, c) => f(x, y, w, h, c);
    // длинное крыло справа
    const wx = 100 - o, ww = 520;
    glass(wx, base - 44, ww, 44, '#dbe6e2'); al(0.5, () => glass(wx, base - 44, ww, 14, '#f2f6f4'));
    for (let x = 0; x < ww; x += 9) { f(wx + x, base - 44, 0.5, 44, '#fbfdfc'); }
    for (let y = 0; y < 44; y += 11) f(wx, base - 44 + y, ww, 0.5, '#aebfb8');
    for (let x = 0; x < ww; x += 36) f(wx + x, base - 44, 1, 44, '#9fb2ab');
    f(wx, base - 46, ww, 2, '#cfdcd6'); f(wx, base - 47, ww, 0.5, '#8fa49c');              // верхний ригель с переплётом
    // башня-павильон слева
    const tx = -10 - o, tw = 120;
    glass(tx, base - 58, tw, 58, '#d4e2dc');
    for (let x = 0; x < tw; x += 8) f(tx + x, base - 58, 0.5, 58, '#f6faf8');
    for (let y = 0; y < 58; y += 10) f(tx, base - 58 + y, tw, 0.5, '#a4b8b0');
    for (let i = 0; i < 26; i++) { const w = tw - i * 3.4; f(tx + i * 1.7, base - 58 - i, w, 1, i % 4 === 0 ? '#9fb2ab' : (i % 2 ? '#dde9e4' : '#eaf2ee')); }   // ступенчатая крыша
    f(tx + tw / 2 - 0.5, base - 90, 1, 10, '#8a9a94'); f(tx + tw / 2 + 0.5, base - 90, 4, 3, '#c8654a');           // шпиль с флажком
    al(0.5, () => { for (let i = 0; i < 6; i++) f(tx + 12 + i * 17, base - 40, 7, 9, '#b6c8c0'); });
    al(0.14, () => f(0, 0, W, GY - 30, '#ffffff'));                                                                  // дымка пасмурного дня
    // живая изгородь: густая, с листвой
    const hx0 = Math.floor(cam) - 2;
    for (let x = hx0; x < hx0 + W + 4; x++) {
      const top = base + 2 + 3 * Math.sin(x * 0.13) + 2 * Math.sin(x * 0.41 + 1) + (rnd(x) > 0.82 ? -2 : 0), sx = x - cam;
      f(sx, top, 1, GY - 2 - top, '#33603a'); f(sx, top, 1, 2, '#5a9150');
    }
    for (let i = 0; i < 520; i++) { const wx2 = hx0 + rnd(i) * (W + 4), y = base + 4 + rnd(i + 900) * (GY - base - 8), sx = wx2 - cam; f(sx, y, 1.5, 1, rnd(i + 3) > 0.55 ? '#4f8a48' : '#1f4426'); if (i % 23 === 0) f(sx, y, 1, 1, '#c8483a'); }
    al(0.2, () => f(0, GY - 14, W, 12, '#142a18'));
    // бордюр и плитка дорожки
    f(0, GY - 3, W, 3, '#a2a29c'); f(0, GY - 3, W, 0.5, '#c4c4be');
    f(0, GY, W, H - GY, '#8f8c8a');
    for (let r2 = 0, y = GY; y < H; r2++, y += 7) { f(0, y, W, 0.5, '#74716e'); for (let x = -((cam + (r2 % 2) * 7) % 14) - 14; x < W + 14; x += 14) f(x, y, 0.5, 7, '#74716e'); }
    al(0.12, () => f(0, GY, W, 6, '#fff'));
  };
})();
