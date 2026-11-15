// ===== scenes12.js — Севкабель: зал-купол с видео из белых частиц и пуфиками (по кадру и рассказу) =====
(() => {
  const S = SCENES, P = S.P, BG = S.BG, { r, px, rnd, disc } = A, ln = S.ln;
  const { f, al, mix } = S.fx;

  BG.dome = e => {
    const { W, H, GY, t } = e, cx = W / 2 - e.cam * 0.2, cy = 36;
    f(0, 0, W, H, '#03050a');
    // купол: тёмно-синяя чаша с мягкой кромкой
    for (let y = 0; y < 66; y++) { const w = Math.sqrt(Math.max(0, 1 - Math.pow((y - 66) / 66, 2))) * W * 0.62; f(cx - w, y, w * 2, 1, y < 20 ? '#0a1224' : '#080e1c'); }
    al(0.35, () => { for (let y = 0; y < 66; y += 2) { const w = Math.sqrt(Math.max(0, 1 - Math.pow((y - 66) / 66, 2))) * W * 0.62; f(cx - w, y, 1, 2, '#6a86c0'); f(cx + w - 1, y, 1, 2, '#6a86c0'); } });
    // анимация: «цветок» из белых частиц, кольца и искры
    const N = 360, R = 34 + 6 * Math.sin(t * 0.5);
    for (let i = 0; i < N; i++) {
      const th = i / N * 6.2832 * 3, k = 0.25 + 0.75 * Math.abs(Math.cos(2.5 * th + t * 0.35)), rr = R * k * (0.75 + 0.25 * Math.sin(t * 0.3 + i * 0.07)), x = cx + rr * Math.cos(th) * 2.1, y = cy + rr * Math.sin(th) * 0.78;
      const a = i % 3 === 0 ? 0.9 : 0.4; al(a, () => f(x, y, i % 7 === 0 ? 1 : 0.6, i % 7 === 0 ? 1 : 0.6, '#f4f8ff'));
    }
    for (let k = 0; k < 5; k++) { const ang = t * 0.12 + k * 0.62, rx = 44 + k * 10, ry = 20 + k * 3; for (let j = 0; j < 90; j++) { const u = j / 90 * 6.2832, x0 = rx * Math.cos(u), y0 = ry * Math.sin(u), x = cx + x0 * Math.cos(ang) - y0 * Math.sin(ang) * 0.6, y = cy + 4 + x0 * Math.sin(ang) * 0.5 + y0 * Math.cos(ang) * 0.6; al(0.3 + 0.25 * Math.sin(u * 3 + t), () => f(x, y, 0.6, 0.6, '#dfe8ff')); } }
    for (let i = 0; i < 40; i++) { const sx = mod(rnd(i + 11) * W * 1.2 + t * (2 + rnd(i) * 4) - e.cam * 0.2, W + 20) - 10, sy = mod(rnd(i + 70) * 70 - t * (1 + rnd(i + 3) * 2), 70) + 2; al(0.5, () => f(sx, sy, 0.6, 0.6, '#fff')); }
    for (let k = 0; k < 4; k++) al(0.035, () => disc(cx, cy, 56 - k * 9, '#9ab4ff'));
    // тёмный зал и пол с отсветом
    f(0, 66, W, GY - 66, '#04060c'); for (let x = 0; x < W; x += 30) al(0.15, () => f(x, 66, 1, GY - 66, '#2a3a5a'));
    f(0, GY, W, H - GY, '#070a12'); al(0.2, () => { for (let k = 0; k < 6; k++) disc(cx, GY + 6, 70 - k * 10, '#2a3a60'); });
    al(0.25, () => f(0, GY, W, 1, '#6a86c0'));
  };
  const mod = (a, n) => ((a % n) + n) % n;

  // два пуфика на полу и два лежащих человека (лицом вверх, на купол)
  P.domeBeans = (x, gy, p, e) => {
    const t = e.t, wx = 40;
    const o = typeof OUTFITS !== 'undefined' ? OUTFITS : null;
    const dm = o ? Object.assign({}, o.d.base, o.d.summer || {}) : {}, ol = o ? Object.assign({}, o.o.base, o.o.yellowSkirt || {}) : {};
    const bag = (bx, by, w) => { f(bx + 2, by - 1, w - 4, 7, '#262838'); f(bx, by + 1, w, 5, '#2e3042'); f(bx + 3, by - 1, w - 6, 1, '#4a4e66'); f(bx + 1, by + 5, w - 2, 1, '#14151e'); al(0.25, () => f(bx + 4, by, w - 8, 1, '#aab4e0')); };
    const lie = (bx, by, c, flip) => {
      const br = Math.sin(t * 1.4 + (flip ? 1 : 0)) * 0.25, d = flip ? -1 : 1, hx = bx + (flip ? 4 : 32);
      // ноги, туловище, голова (лежит на спине, смотрит вверх)
      const L = (dx, dy, w, h, col) => f(flip ? bx + 36 - dx - w : bx + dx, by + dy, w, h, col);
      L(3, -3, 11, 3.5, c.bottom || '#3a3d55'); L(3, -3, 11, 0.5, mix(c.bottom || '#3a3d55', 0.25)); L(3, 0, 11, 0.5, mix(c.bottom || '#3a3d55', -0.3)); L(1, -1.5, 4, 1.8, c.shoes || '#14122b');
      L(14, -4.5 + br, 10, 4.5 - br, c.top || '#4a6fa5'); L(14, -4.5 + br, 10, 0.5, mix(c.top || '#4a6fa5', 0.25)); L(14, -0.5, 10, 0.5, mix(c.top || '#4a6fa5', -0.3));
      L(24, -2.5, 3, 2, c.skin || '#f2c9a5');
      // голова
      const hxx = flip ? bx + 5 : bx + 27; f(hxx, by - 5.5 + br, 5, 4.5, c.skin || '#f2c9a5'); f(hxx, by - 5.5 + br, 5, 1.5, c.hair || '#5a4030'); f(hxx + (flip ? 0 : 4), by - 4.5 + br, 1, 3, c.hair || '#5a4030');
      if (c.hairStyle === 'long') { f(flip ? hxx + 5 : hxx - 6, by - 5 + br, 6, 3, c.hair); f(flip ? hxx + 6 : hxx - 9, by - 3.5 + br, 5, 2, c.hair); }
      if (c.glasses) { f(hxx + (flip ? 0.5 : 2), by - 4.5 + br, 2.5, 1.5, c.glasses); al(0.8, () => px(hxx + (flip ? 1 : 2.5), by - 4.5 + br, '#fff')); }
      al(0.12, () => f(bx, by - 6, 36, 7, '#dfe8ff'));
    };
    const by = gy - 2;
    bag(wx + 18, by - 2, 44); lie(wx + 22, by - 2, dm, false);
    bag(wx + 74, by - 2, 44); lie(wx + 78, by - 2, ol, true);
    al(0.25, () => f(wx + 14, gy, 110, 2, '#000'));
  };
})();
