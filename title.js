// ===== Титульный кадр и фон меню: Оля и Лахта (ночь), Дима и Золотой мост (рассвет) =====
// Рисуется на отдельном холсте #titlecv с разрешением вдвое выше игрового.
(() => {
  const cv = document.getElementById('titlecv'); if (!cv) return;
  const c = cv.getContext('2d');
  let W = 0, H = 0, bg = null, L = null, shown = false, phC = null;
  const K = 2;   // холст вдвое плотнее логической сетки: фон остаётся пиксельным, портреты чётче
  const ph = new Image(); ph.onload = () => { W = 0; }; ph.src = 'img/dress.jpg';
  const ph2 = new Image(); ph2.onload = () => { W = 0; }; ph2.src = 'img/dima_k.webp'; // Дима с квиза; кадр довёрнут, чтобы глаза стояли ровно   // Оля с фотосессии 24.10.2026
  const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const mk = (w, h) => { const k = document.createElement('canvas'); k.width = w; k.height = h; return k; };
  const fill = (g, col, f) => { g.fillStyle = col; g.beginPath(); f(g); g.fill(); };
  const line = (g, col, w, f) => { g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); f(g); g.stroke(); };
  const R = (g, x, y, w, h, col) => { g.fillStyle = col; g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };

  function layout() {
    const b = cv.getBoundingClientRect(); if (!b.width || !b.height) return false;
    const asp = b.width / b.height, port = asp < 0.9;
    const h = port ? Math.round(Math.max(300, Math.min(600, 250 / asp))) : 270, w = port ? 250 : Math.round(Math.max(330, Math.min(640, 270 * asp)));
    if (w === W && h === H) return true;
    W = w; H = h; cv.width = w * K; cv.height = h * K; phC = null;
    L = port
      ? { port, hy: H * 0.30, ox: W * 0.25, dx: W * 0.76, fy: H * 0.385, s: 1.22, tx: W * 0.49, th: H * 0.235, p1: W * 0.68, p2: W * 0.95, ph: H * 0.17, m0: 0.50, m1: 0.62, sun: W * 0.80 }
      : { hy: H * 0.64, ox: W * 0.145, dx: W * 0.855, fy: H * 0.50, s: 1.6, tx: W * 0.315, th: H * 0.52, p1: W * 0.655, p2: W * 0.965, ph: H * 0.40, m0: 0.40, m1: 0.60, sun: W * 0.735 };
    bg = build(); return true;
  }

  // ---------- ночь над Финским заливом ----------
  function night() {
    const k = mk(W, H), g = k.getContext('2d'), hy = L.hy;
    let gr = g.createLinearGradient(0, 0, 0, hy);
    gr.addColorStop(0, '#090b26'); gr.addColorStop(0.45, '#161d4f'); gr.addColorStop(0.8, '#33367a'); gr.addColorStop(1, '#6a5596');
    g.fillStyle = gr; g.fillRect(0, 0, W, hy + 1);
    // северное свечение белой ночи у горизонта
    gr = g.createRadialGradient(L.tx, hy, 2, L.tx, hy, L.th * 0.9); gr.addColorStop(0, 'rgba(170,150,220,.55)'); gr.addColorStop(1, 'rgba(170,150,220,0)');
    g.fillStyle = gr; g.fillRect(0, 0, W, hy);
    for (let i = 0; i < 150; i++) { const x = rnd(i) * W, y = rnd(i + 500) * hy * 0.92, b = rnd(i + 900); R(g, x, y, 1, 1, b > 0.85 ? '#ffffff' : b > 0.5 ? '#c9d2ff' : '#7f88c8'); if (b > 0.96) { R(g, x - 1, y, 3, 1, '#c9d2ff'); R(g, x, y - 1, 1, 3, '#c9d2ff'); } }
    // месяц
    const mx = L.port ? W * 0.12 : W * 0.05 + 22, my = L.port ? H * 0.06 : H * 0.13;
    gr = g.createRadialGradient(mx, my, 2, mx, my, 34); gr.addColorStop(0, 'rgba(230,236,255,.35)'); gr.addColorStop(1, 'rgba(230,236,255,0)'); g.fillStyle = gr; g.fillRect(mx - 40, my - 40, 80, 80);
    fill(g, '#f3f1dc', q => q.arc(mx, my, 9, 0, 7)); fill(g, '#141a48', q => q.arc(mx + 4.5, my - 2.5, 8, 0, 7));
    // облака-полосы
    for (let i = 0; i < 5; i++) { const x = rnd(i + 40) * W, y = hy * (0.45 + rnd(i + 44) * 0.42), w = 40 + rnd(i + 48) * 60; g.globalAlpha = 0.28; R(g, x, y, w, 2, '#5a5fa8'); R(g, x + 8, y + 2, w * 0.7, 1, '#7a78c0'); g.globalAlpha = 1; }
    // дальний берег: низкий Петербург с куполом и шпилем
    const sk = '#141638';
    for (let x = 0; x < W; x += 3) { const hh = 3 + Math.floor(rnd(x + 70) * 5) + (rnd(Math.floor(x / 21) + 3) > 0.6 ? 3 : 0); R(g, x, hy - hh, 3, hh, sk); if (rnd(x + 71) > 0.55) R(g, x + 1, hy - 2 - Math.floor(rnd(x + 72) * (hh - 2)), 1, 1, rnd(x + 73) > 0.4 ? '#ffd98a' : '#9fc4ff'); }
    const dm = L.tx - L.th * 0.42; fill(g, sk, q => { q.arc(dm, hy - 8, 6, Math.PI, 0); q.rect(dm - 6, hy - 8, 12, 8); }); R(g, dm - 0.5, hy - 19, 1, 6, sk); R(g, dm - 0.5, hy - 20, 1, 1, '#ffd98a');
    const sp = L.tx + L.th * 0.34; R(g, sp - 2, hy - 9, 4, 9, sk); fill(g, sk, q => { q.moveTo(sp - 1.5, hy - 9); q.lineTo(sp, hy - 26); q.lineTo(sp + 1.5, hy - 9); }); R(g, sp - 0.5, hy - 27, 1, 1, '#ffd98a');
    lakhta(g, L.tx, hy, L.th);
    // вода
    gr = g.createLinearGradient(0, hy, 0, H); gr.addColorStop(0, '#2c2f6e'); gr.addColorStop(0.25, '#151a48'); gr.addColorStop(1, '#070818');
    g.fillStyle = gr; g.fillRect(0, hy, W, H - hy);
    // отражение башни
    for (let y = 2; y < Math.min(H - hy, L.th * 0.95); y += 2) { const w = Math.max(1, (L.th * 0.07) * (1 - y / L.th)) + rnd(y) * 3; g.globalAlpha = 0.5 * (1 - y / (L.th * 0.95)); R(g, L.tx - w + (rnd(y + 9) - 0.5) * 3, hy + y, w * 2, 1, y % 6 < 2 ? '#ffe3a0' : '#7fb4f0'); } g.globalAlpha = 1;
    for (let i = 0; i < 90; i++) { const y = hy + 3 + rnd(i + 300) * (H - hy), x = rnd(i + 340) * W; g.globalAlpha = 0.22; R(g, x, y, 4 + rnd(i + 380) * 12, 1, '#6f78c8'); g.globalAlpha = 1; }
    return k;
  }

  // Лахта-центр: закрученная игла со светящимися гранями и арка у подножия
  function lakhta(g, x, hy, h) {
    const top = hy - h, bw = h * 0.085;
    // свечение
    let gr = g.createRadialGradient(x, top + h * 0.3, 2, x, top + h * 0.3, h * 0.5); gr.addColorStop(0, 'rgba(140,190,255,.30)'); gr.addColorStop(1, 'rgba(140,190,255,0)'); g.fillStyle = gr; g.fillRect(x - h * 0.5, top - 10, h, h + 10);
    const wAt = f => bw * (0.06 + 0.94 * Math.pow(f, 0.82)) * (1 + 0.10 * Math.sin(f * 5.2));  // f: 0 верх … 1 низ
    for (let y = 0; y < h; y++) {
      const f = y / h, w = wAt(f), yy = Math.round(top + y), tw = Math.sin(f * 4.4 + 0.6);  // закрутка граней
      const mid = x + tw * w * 0.55;
      R(g, x - w, yy, Math.max(1, mid - (x - w)), 1, '#5f93d6'); R(g, mid, yy, Math.max(1, x + w - mid), 1, '#27407e');
      R(g, x - w, yy, 1, 1, '#b9dcff'); if (w > 2) R(g, mid, yy, 1, 1, '#8cc0f4');
      if (y % 3 === 0 && w > 1.6) for (let k2 = 0; k2 < w * 2; k2 += 2) { const r = rnd(y * 13 + k2); if (r > 0.52) R(g, x - w + 1 + k2, yy, 1, 1, r > 0.86 ? '#fff3c4' : r > 0.7 ? '#ffd98a' : '#a8d4ff'); }
    }
    R(g, x - 0.5, top - h * 0.05, 1, h * 0.05, '#d8ecff');
    // арка «Лахта-2» и стилобат
    const aw = h * 0.42, ay = hy; g.lineCap = 'butt';
    line(g, '#3d5fa6', 3, q => { q.moveTo(x + bw * 1.6, ay); q.quadraticCurveTo(x + bw * 1.6 + aw * 0.5, ay - h * 0.11, x + bw * 1.6 + aw, ay); });
    line(g, '#9fd0ff', 1, q => { q.moveTo(x + bw * 1.6, ay - 1.5); q.quadraticCurveTo(x + bw * 1.6 + aw * 0.5, ay - h * 0.11 - 1.5, x + bw * 1.6 + aw, ay - 1.5); });
    R(g, x - bw * 2.6, hy - 5, bw * 4, 5, '#2b437f'); for (let i = 0; i < bw * 4; i += 2) if (rnd(i + 5) > 0.35) R(g, x - bw * 2.6 + i, hy - 3, 1, 1, '#ffe3a0');
  }

  // ---------- рассвет над Золотым Рогом ----------
  function dawn() {
    const k = mk(W, H), g = k.getContext('2d'), hy = L.hy, sx = L.sun;
    let gr = g.createLinearGradient(0, 0, 0, hy);
    gr.addColorStop(0, '#2b2f6c'); gr.addColorStop(0.35, '#6b4f96'); gr.addColorStop(0.62, '#d0688a'); gr.addColorStop(0.85, '#f79a6a'); gr.addColorStop(1, '#ffd58a');
    g.fillStyle = gr; g.fillRect(0, 0, W, hy + 1);
    gr = g.createRadialGradient(sx, hy - 2, 2, sx, hy - 2, L.ph * 1.5); gr.addColorStop(0, 'rgba(255,244,190,.95)'); gr.addColorStop(0.25, 'rgba(255,200,120,.55)'); gr.addColorStop(1, 'rgba(255,170,110,0)');
    g.fillStyle = gr; g.fillRect(0, 0, W, hy + 1);
    fill(g, '#fff6cf', q => q.arc(sx, hy - 3, Math.max(7, L.ph * 0.10), 0, 7));
    // облака с подсвеченным низом
    for (let i = 0; i < 9; i++) {
      const x = W * 0.35 + rnd(i + 20) * W * 0.7, y = hy * (0.16 + rnd(i + 24) * 0.6), w = 26 + rnd(i + 28) * 54;
      g.globalAlpha = 0.75; R(g, x, y, w, 3, '#7a5a9c'); R(g, x + 5, y - 2, w * 0.6, 2, '#8a66a8'); R(g, x + 2, y + 3, w * 0.86, 1, '#ffb27a'); R(g, x + 9, y + 4, w * 0.5, 1, '#ffd9a0'); g.globalAlpha = 1;
    }
    // сопки: дальняя и ближняя, с домами
    const hill = (col, base, amp, seed, lights) => {
      g.fillStyle = col; g.beginPath(); g.moveTo(0, hy);
      for (let x = 0; x <= W; x += 2) { const f = x / W; g.lineTo(x, hy - base - amp * (0.5 + 0.5 * Math.sin(f * 6.3 + seed)) * (0.55 + 0.45 * Math.sin(f * 15 + seed * 2.1)) - amp * 0.9 * Math.max(0, f - 0.72)); }
      g.lineTo(W, hy); g.fill();
      if (lights) for (let i = 0; i < 70; i++) { const x = W * 0.4 + rnd(i + seed * 10) * W * 0.6, f = x / W; const top = base + amp * (0.5 + 0.5 * Math.sin(f * 6.3 + seed)) * (0.55 + 0.45 * Math.sin(f * 15 + seed * 2.1)) + amp * 0.9 * Math.max(0, f - 0.72); const y = hy - 1 - rnd(i + 77) * (top - 2); R(g, x, y, 2, 2 + rnd(i + 5) * 3, '#3a2a55'); if (rnd(i + 31) > 0.45) R(g, x, y + 1, 1, 1, '#ffd98a'); }
    };
    hill('#7a5490', L.ph * 0.10, L.ph * 0.26, 1.3, false);
    hill('#4c3568', L.ph * 0.04, L.ph * 0.20, 4.1, true);
    // вода
    gr = g.createLinearGradient(0, hy, 0, H); gr.addColorStop(0, '#ffc58a'); gr.addColorStop(0.12, '#e8859a'); gr.addColorStop(0.4, '#6f4f92'); gr.addColorStop(1, '#1d1a40');
    g.fillStyle = gr; g.fillRect(0, hy, W, H - hy);
    for (let y = 1; y < H - hy; y += 2) { const w = 4 + y * 0.22 + rnd(y + 3) * 8; g.globalAlpha = Math.max(0.12, 0.85 - y / (H - hy) * 0.9); R(g, sx - w / 2 + (rnd(y + 17) - 0.5) * 6, hy + y, w, 1, y < 14 ? '#fff3c4' : '#ffc890'); } g.globalAlpha = 1;
    for (let i = 0; i < 90; i++) { const y = hy + 3 + rnd(i + 600) * (H - hy), x = rnd(i + 640) * W; g.globalAlpha = 0.25; R(g, x, y, 4 + rnd(i + 680) * 12, 1, y - hy < 30 ? '#ffe0b0' : '#a084c8'); g.globalAlpha = 1; }
    bridge(g);
    // кораблик у причала
    const bx = L.p1 + (L.p2 - L.p1) * 0.36, by = hy + 5; fill(g, '#2a2044', q => { q.moveTo(bx - 12, by - 3); q.lineTo(bx + 13, by - 3); q.lineTo(bx + 9, by + 1); q.lineTo(bx - 9, by + 1); }); R(g, bx - 4, by - 7, 9, 4, '#3a2c58'); R(g, bx + 1, by - 11, 2, 4, '#3a2c58'); R(g, bx - 2, by - 6, 1, 1, '#ffd98a'); R(g, bx + 2, by - 6, 1, 1, '#ffd98a');
    return k;
  }

  // Золотой мост: два V-образных пилона, веер вант, полотно над бухтой
  function bridge(g) {
    const hy = L.hy, dk = hy - L.ph * 0.17, top = hy - L.ph, p1 = L.p1, p2 = L.p2, sp = (p2 - p1);
    const dark = '#2b2146', lit = '#ffb877', deckY = x => dk + Math.pow((x - (p1 + p2) / 2) / sp, 2) * 5;
    // ванты
    g.lineCap = 'butt';
    for (const [px, dir] of [[p1, -1], [p1, 1], [p2, -1], [p2, 1]]) for (let i = 1; i <= 11; i++) {
      const ex = px + dir * i * sp * 0.043, ty = top + (i - 1) * L.ph * 0.028 * 0.8;
      g.globalAlpha = 0.75; line(g, i % 2 ? '#ffe3b0' : '#e9b98c', 0.7, q => { q.moveTo(px + dir * L.ph * 0.055 * (1 - (i - 1) * 0.02), ty); q.lineTo(ex, deckY(ex)); }); g.globalAlpha = 1;
    }
    // полотно
    for (let x = Math.floor(p1 - sp * 0.62); x < W + 2; x++) { const y = Math.round(deckY(x)); R(g, x, y, 1, 3, dark); R(g, x, y, 1, 1, lit); if (x % 9 === 0) R(g, x, y - 2, 1, 2, '#ffe9b8'); }
    // опоры полотна на подходах
    for (let x = p1 - sp * 0.5; x < W; x += sp * 0.25) if (Math.abs(x - p1) > 8 && Math.abs(x - p2) > 8 && (x < p1 - 6 || x > p2 + 6)) R(g, x, deckY(x) + 3, 2, hy - deckY(x) - 3, dark);
    // пилоны
    for (const px of [p1, p2]) {
      const sw = L.ph * 0.055, lw = Math.max(2.4, L.ph * 0.028);
      line(g, dark, lw + 1.4, q => { q.moveTo(px, hy + 2); q.lineTo(px, dk + 2); q.moveTo(px - 1, dk + 4); q.lineTo(px - sw, top); q.moveTo(px + 1, dk + 4); q.lineTo(px + sw, top); });
      line(g, '#5a3f72', lw * 0.5, q => { q.moveTo(px - 0.6, dk + 4); q.lineTo(px - sw - 0.6, top); });
      line(g, lit, lw * 0.45, q => { q.moveTo(px + 1.4 + lw * 0.3, dk + 4); q.lineTo(px + sw + lw * 0.3, top); q.moveTo(px + lw * 0.3, hy); q.lineTo(px + lw * 0.3, dk + 6); });
      R(g, px - sw - 1, top - 2, 2, 2, '#ff6a5a'); R(g, px + sw - 1, top - 2, 2, 2, '#ff6a5a');
      R(g, px - lw - 1, hy - 1, lw * 2 + 3, 4, dark);
    }
  }

  function build() {
    const a = night(), b = dawn(), m = mk(W, H), g = m.getContext('2d');
    g.drawImage(b, 0, 0);
    const gr = g.createLinearGradient(W * L.m0, 0, W * L.m1, 0); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,1)');
    g.globalCompositeOperation = 'destination-in'; g.fillStyle = gr; g.fillRect(0, 0, W, H);
    a.getContext('2d').drawImage(m, 0, 0);
    return a;
  }

  // ---------- портреты ----------
  const OUT = '#2a1626';
  function olya(g, x, y, s, t) {
    g.save(); g.translate(x, y + Math.sin(t * 1.3) * 0.6); g.scale(s, s); g.rotate(0.05);
    const H1 = '#7a2116', H2 = '#a5301d', H3 = '#cf5530', H4 = '#ee8a55', SK = '#f8e0d1', SK2 = '#eabfab';
    // волосы сзади
    const back = q => { q.moveTo(0, -37); q.bezierCurveTo(-31, -39, -39, -10, -37, 14); q.bezierCurveTo(-47, 34, -37, 52, -45, 72); q.bezierCurveTo(-50, 94, -38, 108, -44, 140); q.lineTo(44, 140); q.bezierCurveTo(38, 108, 50, 92, 43, 70); q.bezierCurveTo(37, 50, 45, 34, 36, 14); q.bezierCurveTo(39, -10, 31, -39, 0, -37); };
    fill(g, H1, back); line(g, OUT, 1, back);
    // платье и плечи
    const body = q => { q.moveTo(-10, 30); q.quadraticCurveTo(-30, 36, -47, 50); q.quadraticCurveTo(-58, 70, -56, 140); q.lineTo(56, 140); q.quadraticCurveTo(58, 70, 47, 50); q.quadraticCurveTo(30, 36, 10, 30); };
    fill(g, SK, body);
    fill(g, SK2, q => { q.moveTo(-9, 24); q.lineTo(9, 24); q.lineTo(12, 40); q.quadraticCurveTo(0, 46, -12, 40); });           // тень под подбородком
    fill(g, SK, q => { q.rect(-8, 16, 16, 20); });
    fill(g, SK2, q => { q.moveTo(-8, 22); q.quadraticCurveTo(0, 33, 8, 22); q.lineTo(8, 27); q.quadraticCurveTo(0, 37, -8, 27); });
    const dress = q => { q.moveTo(-27, 58); q.quadraticCurveTo(-14, 52, 0, 60); q.quadraticCurveTo(14, 52, 27, 58); q.lineTo(34, 140); q.lineTo(-34, 140); };
    fill(g, '#fbf5ea', dress);
    for (let i = -3; i <= 3; i++) line(g, '#e3d6c2', 0.8, q => { q.moveTo(i * 7, 60 + Math.abs(i) * 0.6); q.quadraticCurveTo(i * 8.4, 90, i * 9.5, 140); });
    line(g, '#d9c9b2', 1, q => { q.moveTo(-27, 58); q.quadraticCurveTo(-14, 52, 0, 60); q.quadraticCurveTo(14, 52, 27, 58); });
    for (const k of [-1, 1]) {   // рукава-фонарики
      fill(g, '#fbf5ea', q => q.ellipse(k * 43, 62, 15, 17, k * 0.3, 0, 7)); line(g, '#d9c9b2', 1, q => q.ellipse(k * 43, 62, 15, 17, k * 0.3, 0, 7));
      line(g, '#e3d6c2', 0.8, q => { q.moveTo(k * 36, 50); q.quadraticCurveTo(k * 40, 62, k * 37, 77); q.moveTo(k * 46, 48); q.quadraticCurveTo(k * 50, 62, k * 47, 78); });
    }
    line(g, OUT, 1, q => { q.moveTo(-10, 30); q.quadraticCurveTo(-30, 36, -47, 50); q.moveTo(10, 30); q.quadraticCurveTo(30, 36, 47, 50); });
    // лицо
    const face = q => { q.moveTo(-20, -6); q.bezierCurveTo(-21, -35, 21, -35, 20, -6); q.bezierCurveTo(20, 9, 13, 23, 0, 27); q.bezierCurveTo(-13, 23, -20, 9, -20, -6); };
    fill(g, SK, face);
    g.save(); g.beginPath(); face(g); g.clip();
    fill(g, SK2, q => { q.moveTo(-22, -10); q.bezierCurveTo(-15, 6, -10, 22, 2, 28); q.lineTo(-22, 30); });  // тень слева
    g.globalAlpha = 0.3; fill(g, '#f39a94', q => { q.ellipse(-11, 9, 6.5, 3.6, 0, 0, 7); q.ellipse(12, 9, 6.5, 3.6, 0, 0, 7); }); g.globalAlpha = 1;
    g.restore();
    line(g, '#c98d78', 0.9, face);
    // брови
    line(g, '#4a2a20', 2.1, q => { q.moveTo(-15.5, -9.5); q.quadraticCurveTo(-10, -13.6, -4, -11); q.moveTo(4.5, -11); q.quadraticCurveTo(10.5, -13.8, 16, -9.8); });
    // глаза
    const blink = (t % 4.3) < 0.13;
    for (const k of [-1, 1]) {
      const ex = k * 9.6 + 0.4, ey = -3.4;
      g.globalAlpha = 0.55; fill(g, '#e79b83', q => q.ellipse(ex, ey - 2.2, 5.6, 2.8, 0, 0, 7)); g.globalAlpha = 1;
      if (!blink) {
        fill(g, '#ffffff', q => { q.moveTo(ex - 5, ey + 0.4); q.quadraticCurveTo(ex, ey - 3.8, ex + 5, ey); q.quadraticCurveTo(ex, ey + 3, ex - 5, ey + 0.4); });
        fill(g, '#7a5330', q => q.arc(ex + 0.5, ey - 0.1, 2.5, 0, 7)); fill(g, '#22120c', q => q.arc(ex + 0.5, ey - 0.1, 1.2, 0, 7)); fill(g, '#ffffff', q => q.arc(ex - 0.4, ey - 1, 0.75, 0, 7));
        line(g, '#2a1512', 1.4, q => { q.moveTo(ex - 5.2, ey + 0.5); q.quadraticCurveTo(ex, ey - 4, ex + 5.2, ey - 0.1); q.lineTo(ex + k * 7.6, ey - 2.2 + (k < 0 ? 0 : 0)); });
        line(g, '#b98474', 0.6, q => { q.moveTo(ex - 4, ey + 1.6); q.quadraticCurveTo(ex, ey + 3.2, ex + 4, ey + 1.4); });
      } else line(g, '#2a1512', 1.4, q => { q.moveTo(ex - 5, ey); q.quadraticCurveTo(ex, ey + 2.4, ex + 5, ey); });
    }
    // нос
    line(g, '#dba691', 1.1, q => { q.moveTo(2, -2); q.quadraticCurveTo(3.6, 6, 1.2, 9.2); });
    fill(g, '#c98d78', q => { q.ellipse(-2.4, 10, 1.3, 0.8, 0, 0, 7); q.ellipse(3, 10, 1.3, 0.8, 0, 0, 7); });
    fill(g, '#fff3ea', q => q.ellipse(0.4, 6.5, 1.2, 1.6, 0, 0, 7));
    // губы
    fill(g, '#c2595f', q => { q.moveTo(-7.2, 16.4); q.quadraticCurveTo(-3, 14.3, 0.2, 15.6); q.quadraticCurveTo(3.4, 14.3, 7.6, 16.1); q.quadraticCurveTo(0.2, 18.4, -7.2, 16.4); });
    fill(g, '#de8183', q => { q.moveTo(-6.6, 16.9); q.quadraticCurveTo(0.2, 22.4, 7, 16.6); q.quadraticCurveTo(0.2, 18.6, -6.6, 16.9); });
    line(g, '#8f3a40', 0.7, q => { q.moveTo(-8.2, 15.8); q.quadraticCurveTo(0.2, 18.6, 8.6, 15.4); });
    // пряди спереди, прямой пробор
    const lockL = q => { q.moveTo(1, -35.5); q.bezierCurveTo(-20, -38, -27, -22, -24.5, 0); q.bezierCurveTo(-25, 20, -34, 34, -32, 56); q.bezierCurveTo(-31, 80, -40, 96, -36, 118); q.lineTo(-22, 118); q.bezierCurveTo(-25, 92, -17, 76, -19, 52); q.bezierCurveTo(-20, 34, -17, 20, -19.5, 6); q.bezierCurveTo(-20, -8, -13, -21, 1, -27.5); };
    const lockR = q => { q.moveTo(1, -35.5); q.bezierCurveTo(20, -38, 27, -22, 24.5, 0); q.bezierCurveTo(26, 20, 33, 34, 31, 56); q.bezierCurveTo(29, 80, 39, 96, 35, 118); q.lineTo(23, 118); q.bezierCurveTo(26, 92, 17, 76, 19.5, 52); q.bezierCurveTo(21, 34, 18, 20, 20, 6); q.bezierCurveTo(21, -8, 13, -21, 1, -27.5); };
    fill(g, H2, lockL); fill(g, H2, lockR); line(g, OUT, 0.9, lockL); line(g, OUT, 0.9, lockR);
    // блики и тени в волосах: волнистые пряди
    const wave = (x0, y0, x1, y1, ph, amp, col, w, al) => { g.globalAlpha = al; line(g, col, w, q => { for (let i = 0; i <= 24; i++) { const f = i / 24, yy = y0 + (y1 - y0) * f, xx = x0 + (x1 - x0) * f + Math.sin(f * 7 + ph) * amp * f; i ? q.lineTo(xx, yy) : q.moveTo(xx, yy); } }); };
    for (const k of [-1, 1]) {
      for (let i = 0; i < 5; i++) { g.globalAlpha = 0.55; line(g, i % 2 ? H3 : H1, 1, q => { q.moveTo(k * (3 + i * 2.2), -34 + i * 0.6); q.bezierCurveTo(k * (16 + i), -33, k * (22 + i * 0.5), -16, k * (21.6 + i * 0.5), 2 + i * 2); }); }
      wave(k * 23, 4, k * 27, 116, 0.5 + k, 3.2, H3, 1.2, 0.7); wave(k * 26, 10, k * 31, 116, 1.4 + k, 3.4, H4, 0.8, 0.6); wave(k * 21, 20, k * 24, 116, 2.2, 2.6, H1, 1.1, 0.6);
      wave(k * 33, 14, k * 41, 136, 0.2 + k, 3.6, H2, 1.4, 0.7); wave(k * 36, 30, k * 45, 136, 1.9, 3, H3, 0.9, 0.5);
    }
    g.globalAlpha = 1;
    g.restore();
  }

  function dima(g, x, y, s, t) {
    g.save(); g.translate(x, y + Math.sin(t * 1.3 + 2) * 0.6); g.scale(s, s); g.rotate(-0.035);
    const SK = '#f3d0b4', SK2 = '#dfae90', HR = '#3f3028', HR2 = '#6b584b', SH = '#22222e', SH2 = '#34343f';
    // рубашка
    const body = q => { q.moveTo(-12, 30); q.quadraticCurveTo(-36, 36, -52, 50); q.quadraticCurveTo(-63, 70, -61, 140); q.lineTo(61, 140); q.quadraticCurveTo(63, 70, 52, 50); q.quadraticCurveTo(36, 36, 12, 30); };
    fill(g, SH, body); line(g, OUT, 1, body);
    fill(g, '#f4ecdc', q => { q.moveTo(-14, 31); q.lineTo(14, 31); q.lineTo(9, 66); q.lineTo(-7, 66); });                      // футболка
    fill(g, SK2, q => { q.rect(-9.5, 16, 19, 22); });
    fill(g, SK, q => { q.rect(-9.5, 22, 19, 14); });
    fill(g, SK2, q => { q.moveTo(-9.5, 22); q.quadraticCurveTo(0, 33, 9.5, 22); q.lineTo(9.5, 26); q.quadraticCurveTo(0, 37, -9.5, 26); });
    line(g, '#e2d6c0', 2.4, q => { q.moveTo(-11, 35); q.quadraticCurveTo(0, 42, 11, 35); });
    fill(g, SH2, q => { q.moveTo(-13, 29); q.lineTo(-27, 38); q.lineTo(-12, 62); q.lineTo(-3, 70); q.lineTo(-13, 44); });        // воротник
    fill(g, SH2, q => { q.moveTo(13, 29); q.lineTo(27, 38); q.lineTo(13, 62); q.lineTo(1, 70); q.lineTo(13, 44); });
    line(g, '#0f0f18', 1, q => { q.moveTo(-13, 29); q.lineTo(-27, 38); q.lineTo(-12, 62); q.lineTo(-3, 70); q.lineTo(-1, 140); q.moveTo(13, 29); q.lineTo(27, 38); q.lineTo(13, 62); q.lineTo(1, 70); });
    fill(g, '#c9c2b0', q => q.arc(-1, 88, 1.8, 0, 7)); fill(g, '#c9c2b0', q => q.arc(-1, 116, 1.8, 0, 7));
    line(g, SH2, 1, q => { q.moveTo(-40, 62); q.quadraticCurveTo(-44, 100, -42, 140); q.moveTo(40, 62); q.quadraticCurveTo(44, 100, 42, 140); });
    // уши
    for (const k of [-1, 1]) { fill(g, SK2, q => q.ellipse(k * 21.3, 0, 3.6, 6.4, k * 0.12, 0, 7)); line(g, '#b98468', 0.8, q => q.ellipse(k * 21.3, 0, 3.6, 6.4, k * 0.12, 0, 7)); fill(g, '#c9977a', q => q.ellipse(k * 21.6, 0.5, 1.4, 3.4, 0, 0, 7)); }
    // голова
    const face = q => { q.moveTo(-20, -8); q.bezierCurveTo(-21, -40, 21, -40, 20, -8); q.bezierCurveTo(20.5, 6, 18, 17, 12.5, 24.5); q.quadraticCurveTo(6, 30.5, 0, 30.5); q.quadraticCurveTo(-6, 30.5, -12.5, 24.5); q.bezierCurveTo(-18, 17, -20.5, 6, -20, -8); };
    fill(g, SK, face);
    g.save(); g.beginPath(); face(g); g.clip();
    g.globalAlpha = 0.6; fill(g, SK2, q => { q.moveTo(22, -12); q.bezierCurveTo(17, 6, 13, 22, 4, 31); q.lineTo(22, 32); }); g.globalAlpha = 1;                         // тень справа
    // щетина
    g.globalAlpha = 0.17; fill(g, '#7a5a48', q => { q.moveTo(-19.5, 6); q.quadraticCurveTo(-14, 26, 0, 31); q.quadraticCurveTo(14, 26, 19.5, 6); q.quadraticCurveTo(13, 15, 7.5, 13.2); q.quadraticCurveTo(0, 11.4, -7.5, 13.2); q.quadraticCurveTo(-13, 15, -19.5, 6); });
    g.globalAlpha = 1;
    g.restore();
    line(g, '#b98468', 0.9, face);
    // короткая стрижка
    const cap = q => { q.moveTo(-21, -5); q.bezierCurveTo(-23, -43, 23, -43, 21, -5); q.lineTo(18.6, -12); q.bezierCurveTo(17.5, -22, 12, -27.5, 0, -27); q.bezierCurveTo(-12, -27.5, -17.5, -22, -18.6, -12); };
    fill(g, HR, cap); line(g, OUT, 0.9, q => { q.moveTo(-21, -5); q.bezierCurveTo(-23, -43, 23, -43, 21, -5); });
    g.save(); g.beginPath(); cap(g); g.clip();
    
    for (let i = 0; i < 70; i++) { const a = rnd(i + 3) * Math.PI, r = 22 + rnd(i + 9) * 16; R(g, Math.cos(a) * r * 0.55, -6 - Math.sin(a) * r, 1, 1.6, rnd(i) > 0.5 ? '#3a2c24' : '#665246'); }
    g.restore();
    // брови
    line(g, '#5a4436', 2, q => { q.moveTo(-15.5, -11.5); q.quadraticCurveTo(-10, -13.2, -4.5, -11.8); q.moveTo(4.5, -11.8); q.quadraticCurveTo(10, -13.2, 15.5, -11.5); });
    // глаза
    const blink = ((t + 1.7) % 5.1) < 0.13;
    for (const k of [-1, 1]) {
      const ex = k * 9.8 - 0.3, ey = -4;
      if (!blink) {
        fill(g, '#ffffff', q => { q.moveTo(ex - 4.2, ey + 0.2); q.quadraticCurveTo(ex, ey - 2.7, ex + 4.2, ey + 0.2); q.quadraticCurveTo(ex, ey + 2.2, ex - 4.2, ey + 0.2); });
        fill(g, '#6f8fa8', q => q.arc(ex - 0.4, ey - 0.1, 2, 0, 7)); fill(g, '#1c232c', q => q.arc(ex - 0.4, ey - 0.1, 1, 0, 7)); fill(g, '#ffffff', q => q.arc(ex - 1.2, ey - 0.9, 0.7, 0, 7));
        line(g, '#3a2a22', 1.1, q => { q.moveTo(ex - 4.8, ey + 0.2); q.quadraticCurveTo(ex, ey - 3.4, ex + 4.8, ey + 0.2); });
      } else line(g, '#3a2a22', 1.1, q => { q.moveTo(ex - 4.6, ey); q.quadraticCurveTo(ex, ey + 2, ex + 4.6, ey); });
    }
    // нос
    line(g, '#cf9a7e', 1.2, q => { q.moveTo(-1.6, -4); q.quadraticCurveTo(-3.8, 7, -1.2, 10.4); });
    fill(g, '#b98468', q => { q.ellipse(-3.2, 11.2, 1.5, 0.9, 0, 0, 7); q.ellipse(3, 11.2, 1.5, 0.9, 0, 0, 7); });
    line(g, '#cf9a7e', 0.9, q => { q.moveTo(-5.2, 10.6); q.quadraticCurveTo(-5.6, 8.6, -4, 8); q.moveTo(5, 10.6); q.quadraticCurveTo(5.5, 8.6, 3.9, 8); });
    fill(g, '#fbe2cc', q => q.ellipse(-0.4, 7.4, 1.3, 1.8, 0, 0, 7));
    // рот
    line(g, '#a2584f', 1.5, q => { q.moveTo(-7, 18.6); q.quadraticCurveTo(0, 20.4, 7.4, 18); });
    line(g, '#a2584f', 0.9, q => { q.moveTo(7.4, 18); q.lineTo(8.6, 17); q.moveTo(-7, 18.6); q.lineTo(-8, 17.9); });
    line(g, '#d99c8c', 1, q => { q.moveTo(-3.6, 21.6); q.quadraticCurveTo(0, 22.6, 3.8, 21.4); });
    // очки
    for (const k of [-1, 1]) {
      g.globalAlpha = 0.13; fill(g, '#dff0ff', q => q.arc(k * 10.4, -3.2, 9.4, 0, 7)); g.globalAlpha = 0.5;
      line(g, '#ffffff', 1, q => { q.moveTo(k * 10.4 - 5.5, -7.5); q.lineTo(k * 10.4 - 2, -10.2); }); g.globalAlpha = 1;
      line(g, '#8f7446', 1.25, q => q.arc(k * 10.4, -3.2, 9.4, 0, 7)); g.globalAlpha = 0.8; line(g, '#d8be88', 0.5, q => q.arc(k * 10.4, -3.2, 9.4, 3.4, 5.6)); g.globalAlpha = 1;
      line(g, '#b99a5c', 1, q => { q.moveTo(k * 19.8, -5); q.lineTo(k * 22.4, -5.6); });
    }
    line(g, '#b99a5c', 1.1, q => { q.moveTo(-1.4, -4.6); q.quadraticCurveTo(0, -6.6, 1.4, -4.6); });
    g.restore();
  }

  // фото героев: вырезка с мягкими краями, лицо попадает в ту же точку, что и рисованный портрет
  const PHOTO = {
    o: { im: ph, sx: 0, sy: 175, sw: 588, sh: 880, fx: 330, fy: 400, fh: 230, rot: 0, cx: -10, cy: 105, r0: 120, r1: 212 },
    d: { im: ph2, sx: 700, sy: 40, sw: 1100, sh: 1200, fx: 1222, fy: 428, fh: 250, rot: 0.2, raw: true, cx: 4, cy: 70, r0: 80, r1: 135, t: { cx: 4, cy: 190, sy: 0.9, r0: 150, r1: 230 } },
  };
  function photo(q) {
    const s = L.s * 50 / q.fh * K, w = Math.round(q.sw * s), h = Math.round(q.sh * s), k = mk(w, h), g = k.getContext('2d'), fx = (q.fx - q.sx) * s, fy = (q.fy - q.sy) * s;
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.save(); g.translate(fx, fy); g.rotate(q.rot); g.translate(-fx, -fy); g.drawImage(q.im, q.sx, q.sy, q.sw, q.sh, 0, 0, w, h); g.restore();
    if (q.raw) return { k, fx, fy };   // вырезка по контуру: маска не нужна
    const mk2 = mk(w, h), m = mk2.getContext('2d');
    const blob = (cx, cy, sy, r0, r1) => { m.save(); m.translate(fx + cx * s, fy + cy * s); m.scale(1, sy); const gr = m.createRadialGradient(0, 0, r0 * s, 0, 0, r1 * s); gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); m.fillStyle = gr; m.fillRect(-w * 2, -h * 2, w * 4, h * 4); m.restore(); };
    m.globalCompositeOperation = 'lighter';
    blob(q.cx, q.cy, 1.5, q.r0, q.r1);                          // голова
    if (q.t) blob(q.t.cx, q.t.cy, q.t.sy, q.t.r0, q.t.r1);      // плечи
    g.globalCompositeOperation = 'destination-in'; g.drawImage(mk2, 0, 0);
    return { k, fx, fy };
  }
  const person = (key, x, t, ph0, draw) => {
    const q = PHOTO[key]; if (!(q.im.complete && q.im.naturalWidth)) return draw();
    phC = phC || {}; const p = phC[key] || (phC[key] = photo(q));
    c.imageSmoothingEnabled = true; c.drawImage(p.k, x - p.fx / K, L.fy - p.fy / K + Math.sin(t * 1.3 + ph0) * 0.5, p.k.width / K, p.k.height / K); c.imageSmoothingEnabled = false;
  };

  // ---------- кадр ----------
  function frame(on, t) {
    if (on !== shown) { shown = on; cv.classList.toggle('hidden', !on); W = 0; }
    if (!on || !layout()) return;
    c.setTransform(K, 0, 0, K, 0, 0); c.imageSmoothingEnabled = false; c.drawImage(bg, 0, 0);
    const hy = L.hy;
    // мерцание звёзд и маяк на шпиле
    for (let i = 0; i < 26; i++) { const x = rnd(i + 2000) * W * L.m0, y = rnd(i + 2100) * hy * 0.8; if (Math.sin(t * (1.5 + rnd(i) * 2) + i) > 0.6) { R(c, x, y, 1, 1, '#ffffff'); R(c, x - 1, y, 3, 1, 'rgba(200,210,255,.5)'); R(c, x, y - 1, 1, 3, 'rgba(200,210,255,.5)'); } }
    if (Math.sin(t * 2.4) > 0) { R(c, L.tx - 1, hy - L.th * 1.05 - 1, 2, 2, '#ff5a5a'); c.globalAlpha = 0.3; R(c, L.tx - 2, hy - L.th * 1.05 - 2, 4, 4, '#ff8a8a'); c.globalAlpha = 1; }
    // рябь
    for (let i = 0; i < 40; i++) { const ph = Math.floor(t * 1.6 + rnd(i + 50) * 9), x = rnd(i * 7 + ph) * W, y = hy + 3 + rnd(i * 5 + ph + 3) * (H - hy); c.globalAlpha = 0.35; R(c, x, y, 3 + rnd(i) * 8, 1, x / W > (L.m0 + L.m1) / 2 ? '#ffe0b0' : '#9fb0ff'); c.globalAlpha = 1; }
    // машины на мосту
    const dk = hy - L.ph * 0.17, sp = L.p2 - L.p1;
    for (let i = 0; i < 6; i++) { const f = ((t * (0.03 + i * 0.004) + i * 0.19) % 1), x = L.p1 - sp * 0.5 + f * (W - L.p1 + sp * 0.5), y = dk + Math.pow((x - (L.p1 + L.p2) / 2) / sp, 2) * 5 - 1; if (x / W > L.m1) R(c, x, y, 1, 1, i % 2 ? '#fff6cf' : '#ff6a5a'); }
    person('o', L.ox, t, 0, () => olya(c, L.ox, L.fy, L.s, t)); person('d', L.dx, t, 2, () => dima(c, L.dx, L.fy, L.s, t));
    // лёгкая виньетка снизу, чтобы кнопки читались
    const gr = c.createLinearGradient(0, H * (L.port ? 0.5 : 0.8), 0, H); gr.addColorStop(0, 'rgba(8,7,20,0)'); gr.addColorStop(1, 'rgba(8,7,20,' + (L.port ? 0.85 : 0.5) + ')'); c.fillStyle = gr; c.fillRect(0, 0, W, H);
  }
  addEventListener('resize', () => { W = 0; });
  window.TITLE = { frame };
})();
