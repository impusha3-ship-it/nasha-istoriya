// ===== scenes6.js — места по фото: дом на Нерчинской, Ленин, музей кита, Выборг, Петропавловка =====
(() => {
  const S = SCENES, P = S.P, { r, px, rnd, disc } = A, ln = S.ln;
  const { f, al, mix } = S.fx;
  const sh = (x, gy, w, a = 0.22) => al(a, () => f(x, gy - 0.5, w, 1.5, '#000'));
  const arch = (cx, y, w, col) => { f(cx - w / 2, y, w, 0.5, col); f(cx - w / 2 + 0.5, y - 0.5, w - 1, 0.5, col); f(cx - w / 2 + 1, y - 1, w - 2, 0.5, col); };

  // ---------- мой дом на Нерчинской: двенадцатиэтажка с синими остеклёнными балконами ----------
  P.nerchHouse = (x, gy, p, e) => {
    const BL = '#2f5fc8', BL2 = '#1f46a0', BG = '#d9cf98', BG2 = '#c0b47a', WH = '#f2f2ee', GL = '#8fb4d8', night = S.fx.dark(e.o.time);
    const win = (wx, wy, w, h) => { f(wx, wy, w, h, WH); f(wx + 0.5, wy + 0.5, w - 1, h - 1, night ? '#ffd98a' : GL); f(wx + w / 2 - 0.25, wy, 0.5, h, WH); al(0.3, () => f(wx + 0.5, wy + 0.5, w - 1, 1, '#fff')); };
    // боковой низкий корпус слева
    f(x, gy - 78, 34, 78, BG); f(x + 33, gy - 78, 1, 78, BG2);
    for (let fl = 0; fl < 9; fl++) { const y = gy - 76 + fl * 8; f(x + 2, y, 24, 6.5, BL); f(x + 2, y + 6, 24, 0.5, BL2); for (let k = 0; k < 3; k++) win(x + 3 + k * 8, y + 1, 7, 4.5); f(x + 28, y + 1, 3, 4, BG2); f(x + 28, y + 1, 3, 0.5, '#fff6d0'); }
    // главная башня
    f(x + 34, gy - 104, 8, 104, BG); f(x + 34, gy - 104, 0.5, 104, '#f0e8b8'); f(x + 41, gy - 104, 1, 104, BG2);
    f(x + 42, gy - 104, 38, 104, BL2); f(x + 80, gy - 104, 8, 104, BG); f(x + 87, gy - 104, 1, 104, '#a89c5c'); f(x + 34, gy - 105, 54, 1.5, '#b8ac70'); f(x + 34, gy - 106, 54, 0.5, '#e8e0a8');
    for (let fl = 0; fl < 12; fl++) { const y = gy - 102 + fl * 8; f(x + 42.5, y, 37, 6.5, BL); f(x + 42.5, y, 37, 0.5, mix(BL, 0.3)); f(x + 42.5, y + 6, 37, 0.5, BL2); for (let k = 0; k < 3; k++) win(x + 44 + k * 11.5, y + 1, 10, 4.5); }
    for (let y = gy - 100; y < gy - 8; y += 6.5) { f(x + 35.5, y, 3, 2.5, '#6a7a8a'); f(x + 82, y, 3, 2.5, '#6a7a8a'); }
    al(0.28, () => f(x + 80, gy - 104, 8, 104, '#000'));
    // вход и козырёк
    f(x + 36, gy - 14, 12, 14, '#2a2e3a'); f(x + 35, gy - 16, 14, 2, '#8a8f9c'); f(x + 37, gy - 13, 10, 12, '#4a5568'); f(x + 41.75, gy - 13, 0.5, 12, '#2a2e3a');
    if (night) al(0.3, () => f(x + 36, gy - 14, 12, 14, '#ffd98a'));
    f(x + 50, gy - 10, 8, 10, '#3a3f4a'); f(x + 52, gy - 8, 4, 0.5, '#8a8f9c');
    // деревья и машины
    const tr = (tx, ty, rr, c1, c2) => { disc(tx, ty, rr, c1); disc(tx - 3, ty - 2, rr * 0.6, c2); al(0.7, () => { for (let i = 0; i < 8; i++) f(tx - rr + rnd(i + tx) * rr * 2, ty - rr + rnd(i + 5) * rr * 1.6, 1.5, 0.5, '#4a8a4a'); }); };
    tr(x - 4, gy - 14, 12, '#27483a', '#33603f'); tr(x + 88, gy - 16, 14, '#2b4d36', '#376a40'); tr(x + 74, gy - 8, 7, '#2f5a38', '#3f7a48');
    const car = (cx, c) => { f(cx, gy - 7, 22, 5, c); f(cx + 4, gy - 11, 12, 4, mix(c, 0.1)); f(cx + 5, gy - 10.5, 4, 3, '#9ab8d0'); f(cx + 10, gy - 10.5, 5, 3, '#9ab8d0'); disc(cx + 5, gy - 2, 2, '#14122b'); disc(cx + 17, gy - 2, 2, '#14122b'); f(cx + 21, gy - 5, 1, 1, '#fff6cf'); };
    car(x + 56, '#c8ccd2'); car(x + 78, '#a8acb4');
    sh(x - 10, gy, 120, 0.2);
  };

  // ---------- Ленин на остановке ----------
  P.lenin = (x, gy, p, e) => {
    const ST = '#b4b8bc', ST2 = '#8f9498', BR = '#2f3436', BR2 = '#4a5052';
    // ступени
    f(x - 6, gy - 3, 38, 3, ST2); f(x - 6, gy - 3, 38, 0.5, '#d2d6da'); f(x - 3, gy - 6, 32, 3, ST); f(x - 3, gy - 6, 32, 0.5, '#e0e4e8');
    // постамент
    f(x + 2, gy - 32, 20, 26, ST); f(x + 2, gy - 32, 0.5, 26, '#dfe3e6'); f(x + 21, gy - 32, 1, 26, ST2); f(x, gy - 34, 24, 2.5, ST2); f(x, gy - 34, 24, 0.5, '#e4e8ec'); f(x + 3, gy - 10, 18, 0.5, ST2);
    for (let k = 0; k < 5; k++) { const lx = x + 4.5 + k * 3; f(lx, gy - 22, 0.5, 4, '#3a3f44'); f(lx, gy - 22, 2, 0.5, '#3a3f44'); }
    f(x + 5, gy - 17.5, 14, 0.5, '#3a3f44'); f(x + 7, gy - 15.5, 10, 0.5, '#3a3f44');
    // статуя: пальто, поднятая рука с кепкой
    f(x + 8, gy - 54, 8, 20, BR); f(x + 8, gy - 54, 1, 20, BR2); f(x + 7, gy - 38, 10, 4, BR); f(x + 6, gy - 36, 12, 2.5, BR2);
    f(x + 9.5, gy - 58, 5, 5, BR2); f(x + 10, gy - 59, 4, 1, BR); f(x + 9.5, gy - 55, 5, 1, BR);
    ln(x + 15, gy - 52, x + 20, gy - 60, BR); ln(x + 16, gy - 52, x + 21, gy - 60, BR); f(x + 19.5, gy - 62, 3, 2.5, BR2);
    f(x + 5, gy - 50, 3, 9, BR); f(x + 4, gy - 42, 4, 3, BR2);
    al(0.35, () => f(x + 9, gy - 54, 0.5, 18, '#9aa4a6'));
    // фонарь с белым шаром
    f(x + 31, gy - 44, 1, 44, '#1b1e22'); disc(x + 31.5, gy - 46, 3.5, '#f4f4f0'); al(0.5, () => disc(x + 30.5, gy - 47, 1.5, '#fff')); f(x + 29, gy - 2, 5, 2, '#1b1e22');
    sh(x - 6, gy, 40, 0.2);
  };

  // ---------- музей Института биологии моря: висящий скелет и лежащие позвонки ----------
  const BONE = '#efe8d6', BONE2 = '#cfc4a8', BONE3 = '#a89c80';
  const vert = (vx, vy, s) => {      // один огромный позвонок, вид сбоку, отросток уходит вверх-влево
    f(vx, vy - 6 * s, 12 * s, 7 * s, '#d8cdb0'); f(vx + 1 * s, vy - 7 * s, 10 * s, 1.5 * s, '#e8dfc6'); f(vx, vy - 1 * s, 12 * s, 1.5 * s, BONE3);
    f(vx + 4 * s, vy - 6 * s, 2.5 * s, 2 * s, '#4a4030'); f(vx + 8 * s, vy - 5 * s, 2 * s, 1.5 * s, '#4a4030');
    ln(vx + 6 * s, vy - 7 * s, vx + 1 * s, vy - 16 * s, '#d8cdb0'); ln(vx + 7 * s, vy - 7 * s, vx + 2 * s, vy - 16 * s, '#d8cdb0'); ln(vx + 8 * s, vy - 7 * s, vx + 3 * s, vy - 16 * s, BONE2);
    f(vx + 0 * s, vy - 17 * s, 5 * s, 2 * s, '#e0d6bc');
    f(vx + 11 * s, vy - 5 * s, 3 * s, 4 * s, BONE2);
  };
  P.whale = (x, gy, p, e) => {
    // висящий скелет: череп с длинной пастью справа, рёбра вниз, позвоночник и хвост влево
    const hy = gy - 88 + Math.round(Math.sin(e.t * 0.7) * 0.5);
    f(x + 52, 0, 0.5, hy - 6, '#6a6f7c'); f(x + 96, 0, 0.5, hy - 4, '#6a6f7c');
    for (let i = 0; i < 18; i++) { const vx = x + 8 + i * 5.2, vy = hy + 2 - Math.sin(i * 0.33) * 3; f(vx, vy, 4, 4, i % 2 ? BONE : BONE2); f(vx, vy + 3, 4, 0.5, BONE3);
      if (i > 3 && i < 13) { const len = 20 - Math.abs(i - 8) * 1.8; for (let k = 0; k < len; k++) f(vx + 1.2 - k * 0.12, vy + 4 + k, 2, 1, k < len - 3 ? BONE : BONE2); } }
    for (let i = 0; i < 6; i++) f(x + 12 + i * 5.2, hy - 4 + (i % 2), 1.5, 4, BONE2);
    // череп и челюсть
    f(x + 96, hy - 2, 30, 7, BONE); f(x + 100, hy + 4, 30, 3, BONE2); f(x + 124, hy + 0.5, 12, 3.5, BONE); f(x + 96, hy - 3, 18, 2, BONE); f(x + 96, hy + 7, 34, 1, BONE3); f(x + 112, hy - 1, 3, 2.5, '#2a2418');
    f(x + 3, hy + 3, 7, 1.5, BONE2); f(x - 6, hy + 4, 10, 1, BONE2);
    f(x + 84, hy + 4, 10, 6, BONE); f(x + 82, hy + 9, 12, 1.5, BONE2); f(x + 80, hy + 10, 10, 1, BONE3);     // грудной плавник
    al(0.22, () => f(x + 6, gy - 0.5, 110, 1.5, '#000'));
    // лежащие позвонки
    for (let i = 0; i < 6; i++) vert(x + 2 + i * 14, gy - 1 - i * 1.2, 1.9 - i * 0.12);
    al(0.2, () => f(x, gy - 0.5, 90, 2, '#000'));
  };
  P.parquetStar = (x, gy, p, e) => {
    A.ctx.translate(e.cam * (p.par || 1), 0);
    const W = e.W, H = e.H, off = e.cam;
    f(0, gy, W, H - gy, '#c4a064');
    const rows = [[gy, 5], [gy + 5, 7], [gy + 12, 9], [gy + 21, 12]];
    const g = A.ctx;
    rows.forEach((rw, ri) => { const tw = 16 + ri * 4, th = rw[1]; for (let tx = -(off % tw) - tw; tx < W + tw; tx += tw) { const k = Math.floor((tx + off) / tw) + ri, dk = (k + ri) % 2;
      f(tx, rw[0], tw, th, dk ? '#a8803f' : '#c8a460'); g.fillStyle = dk ? '#e0c284' : '#9c7234'; g.beginPath(); g.moveTo(tx + tw / 2, rw[0] + 0.3); g.lineTo(tx + tw - 0.8, rw[0] + th / 2); g.lineTo(tx + tw / 2, rw[0] + th - 0.3); g.lineTo(tx + 0.8, rw[0] + th / 2); g.fill();
      g.fillStyle = dk ? '#8a5a20' : '#f0d898'; g.beginPath(); g.moveTo(tx + tw / 2, rw[0] + th * 0.28); g.lineTo(tx + tw * 0.66, rw[0] + th / 2); g.lineTo(tx + tw / 2, rw[0] + th * 0.72); g.lineTo(tx + tw * 0.34, rw[0] + th / 2); g.fill();
      f(tx, rw[0], 0.5, th, '#5a3a14'); } f(0, rw[0] + th - 0.5, W, 0.5, '#5a3a14'); });
    al(0.2, () => f(0, gy, W, 3, '#000')); al(0.12, () => f(0, H - 6, W, 6, '#000')); al(0.1, () => f(0, gy + 6, W, 6, '#fff'));
  };
  P.museumCeil = (x, gy, p, e) => {
    A.ctx.translate(e.cam * (p.par || 1), 0);
    const W = e.W; f(0, 0, W, 12, '#3a7ac8'); f(0, 10, W, 2, '#e8f0fa'); f(0, 12, W, 1, '#9ab0c8'); al(0.25, () => f(0, 0, W, 4, '#fff'));
    for (let lx = -(e.cam % 34) + 10; lx < W; lx += 34) { disc(lx, 6, 2, '#fffbe0'); al(0.2, () => disc(lx, 8, 7, '#fffbe0')); }
  };

  // ---------- Выборг: площадь и замок ----------
  P.vybDome = (x, gy, p, e) => {
    const PE = '#f2d8b4', PE2 = '#dcbc90', GR = '#3f8a5a', GR2 = '#2f6e48', WH = '#fffaf0';
    f(x, gy - 52, 80, 52, PE); f(x, gy - 52, 80, 1, WH); f(x + 79, gy - 52, 1, 52, PE2); f(x, gy - 50, 80, 6, PE2); f(x, gy - 51, 80, 0.5, '#fff');
    // скошенная зелёная крыша слева
    for (let i = 0; i < 14; i++) f(x + i, gy - 56 + i * 0.28 - (i < 1 ? 0 : 0), 80 - i, 4.5 - i * 0.04, i % 2 ? GR : mix(GR, 0.1)); f(x, gy - 56, 32, 4.5, GR); f(x, gy - 52, 32, 0.5, GR2);
    // башенка с куполом
    f(x + 34, gy - 66, 26, 66, PE); f(x + 34, gy - 66, 1, 66, WH); f(x + 59, gy - 66, 1.5, 66, PE2); f(x + 33, gy - 48, 28, 2, WH); f(x + 33, gy - 28, 28, 1.5, WH);
    for (let k = 0; k < 14; k++) { const w = Math.round(Math.sqrt(1 - Math.pow((k - 14) / 14, 2)) * 15 * 2) / 2; f(x + 47 - w, gy - 82 + k, w * 2, 1, k % 3 ? GR : mix(GR, 0.15)); }
    f(x + 47, gy - 92, 0.5, 10, '#6a6f7c'); disc(x + 47, gy - 83, 2, GR2); f(x + 40, gy - 67, 14, 2, WH); for (let q = 0; q < 14; q += 2) f(x + 40 + q, gy - 69, 1, 2, '#c8b48a');
    // окна
    const w2 = (wx, wy, h) => { f(wx - 0.5, wy - 0.5, 6, h + 1, WH); f(wx, wy, 5, h, '#3a4a40'); f(wx + 2.4, wy, 0.5, h, '#8a9a90'); al(0.3, () => f(wx, wy, 5, 1, '#fff')); };
    for (const wx of [4, 14, 24]) { w2(x + wx, gy - 44, 9); w2(x + wx, gy - 28, 9); } for (const wx of [38, 46, 54]) { w2(x + wx, gy - 56, 7); w2(x + wx, gy - 40, 9); w2(x + wx, gy - 24, 9); }
    for (const wx of [66, 73]) { w2(x + wx, gy - 44, 9); w2(x + wx, gy - 28, 9); }
    f(x, gy - 12, 80, 12, '#a89478'); for (let k = 0; k < 80; k += 6) f(x + k, gy - 12 + (k % 12 ? 0 : 0.5), 5, 5.5, k % 12 ? '#8f7e66' : '#b8a68a'); al(0.2, () => f(x, gy - 0.5, 84, 1.5, '#000'));
  };
  P.vybRed = (x, gy, p, e) => {
    const RD = '#b6442e', RD2 = '#8f3222', YL = '#d8b56a', YL2 = '#b8934a', WH = '#faf2e0';
    f(x, gy - 62, 100, 62, RD); f(x, gy - 24, 100, 24, YL); f(x, gy - 25, 100, 1.5, WH); f(x + 99, gy - 62, 1, 62, RD2);
    // ступенчатые фронтоны и крыша
    for (let g = 0; g < 3; g++) { const gx = x + 8 + g * 32; for (let s = 0; s < 5; s++) f(gx + s * 2.2, gy - 70 + s * 2, 22 - s * 4.4, 2.2, g === 1 ? YL : RD); f(gx + 8, gy - 76, 6, 6, WH); f(gx + 9, gy - 75, 4, 5, '#3a4048'); }
    f(x, gy - 63, 100, 2, '#7a5a4a'); f(x, gy - 63, 100, 0.5, '#e0c8a0');
    // окна с белыми арками
    for (let row = 0; row < 3; row++) for (let k = 0; k < 6; k++) { const wx = x + 6 + k * 15.5, wy = gy - 56 + row * 11; f(wx - 1.2, wy - 1.5, 8.4, 10.5, WH); f(wx, wy, 6, 9, '#2b3038'); f(wx + 2.75, wy, 0.5, 9, '#8a96a2'); arch(wx + 3, wy - 0.5, 6, '#2b3038'); al(0.3, () => f(wx, wy, 6, 1, '#fff')); }
    for (let k = 0; k < 6; k++) { const wx = x + 6 + k * 15.5; f(wx - 1, gy - 22, 8, 12, YL2); f(wx, gy - 21, 6, 11, '#2b3038'); arch(wx + 3, gy - 21, 6, '#2b3038'); f(wx - 1.5, gy - 23, 9, 1, WH); }
    f(x + 40, gy - 14, 14, 14, '#4a3226'); arch(x + 47, gy - 14, 14, '#4a3226'); f(x + 39, gy - 15, 16, 1.5, WH); f(x + 46.75, gy - 13, 0.5, 13, '#2a1a12');
    for (let k = 0; k < 100; k += 5) { f(x + k, gy - 59, 0.5, 38, '#00000018'); }
    f(x, gy - 1, 100, 1, '#7a6e5a'); sh(x, gy, 100, 0.18);
  };
  P.castle = (x, gy, p, e) => {
    const WT = '#f4f1ea', WT2 = '#d4d0c6', BRK = '#a8543a', BRK2 = '#7a3a2a', ST = '#7a6a5a', GR = '#4f9a66', GR2 = '#357a4c';
    // каменная стена-остров
    f(x - 6, gy - 10, 92, 10, ST); for (let k = 0; k < 92; k += 7) f(x - 6 + k, gy - 10 + (k % 14 ? 3 : 0), 6, 3, '#8a7a68'); f(x - 6, gy - 10, 92, 0.5, '#b8a890');
    // кирпичное крыло слева и крыша
    f(x, gy - 32, 30, 22, BRK); f(x, gy - 32, 30, 0.5, '#d8765a'); for (let k = 0; k < 30; k += 6) f(x + k, gy - 32, 0.5, 22, BRK2); for (let y = gy - 30; y < gy - 12; y += 4) f(x, y, 30, 0.5, BRK2);
    for (let k = 0; k < 18; k++) f(x + k, gy - 38 + k * 0.1 - (k < 9 ? k * 0.3 : (18 - k) * 0.3), 30 - k, 6, '#a8aab0'); f(x, gy - 38, 30, 6, '#9a9ca2'); f(x, gy - 38, 30, 0.5, '#e4e6ea'); f(x + 20, gy - 42, 3, 5, BRK2);
    for (let k = 0; k < 4; k++) { f(x + 4 + k * 6.5, gy - 28, 3, 5, '#2b2018'); arch(x + 5.5 + k * 6.5, gy - 28, 3, '#2b2018'); }
    // белая башня святого Олафа с зелёным куполом
    f(x + 28, gy - 82, 24, 74, WT); f(x + 28, gy - 82, 1.5, 74, '#fffffa'); f(x + 50, gy - 82, 2, 74, WT2); f(x + 26, gy - 84, 28, 3, WT2); f(x + 26, gy - 84, 28, 0.5, '#fff');
    for (const [wx, wy] of [[33, 76], [44, 76], [33, 62], [44, 62], [38.5, 48], [33, 34], [44, 34]]) { f(x + wx, gy - wy, 3, 5, '#4a4a52'); arch(x + wx + 1.5, gy - wy, 3, '#4a4a52'); }
    for (let k = 0; k < 16; k++) { const w = Math.round(Math.sqrt(1 - Math.pow((k - 16) / 16, 2)) * 13 * 2) / 2; f(x + 40 - w, gy - 100 + k, w * 2, 1, k % 3 ? GR : mix(GR, 0.18)); } f(x + 40, gy - 112, 0.5, 12, '#6a6f7c'); f(x + 40.5, gy - 112, 4, 2.5, '#c8323c'); f(x + 40.5, gy - 110, 4, 0.5, '#fff');
    f(x + 28, gy - 96, 24, 14, WT); f(x + 28, gy - 86, 24, 1.5, GR2);
    // нижняя часть башни — кирпич и камень
    f(x + 26, gy - 30, 28, 22, ST); for (let k = 0; k < 28; k += 5) f(x + 26 + k, gy - 30 + (k % 10 ? 4 : 0), 4, 4, '#8a7a68');
    // правая постройка с красной крышей
    f(x + 54, gy - 26, 28, 18, '#f0e8da'); for (let k = 0; k < 10; k++) f(x + 54 + k * 0.4, gy - 34 + k * 0.8, 28 - k * 0.8, 1, '#b86a52'); f(x + 54, gy - 26, 28, 0.5, '#fff'); f(x + 62, gy - 20, 4, 7, '#3a3a42'); f(x + 72, gy - 20, 4, 7, '#3a3a42');
    sh(x - 6, gy, 94, 0.2);
  };

  // ---------- Петропавловская крепость и гранитный шар ----------
  P.fortress = (x, gy, p, e) => {
    const GD = '#e8bf54', GD2 = '#c89a34', CR = '#e8d8a0', RF = '#c05a42', WL = '#a89a82', WL2 = '#8a7e68';
    // низкая бастионная стенка с аркадой
    f(x - 90, gy - 12, 210, 12, WL); f(x - 90, gy - 12, 210, 0.5, '#c8baa0'); for (let k = 0; k < 210; k += 8) { f(x - 90 + k, gy - 8, 3, 5, WL2); arch(x - 88.5 + k, gy - 8, 3, WL2); }
    f(x - 90, gy - 1, 210, 1, '#d8c89a');            // песчаная полоса
    // красные крыши и дома
    for (const [hx, w, h] of [[-62, 24, 10], [-30, 18, 12], [40, 22, 11], [62, 26, 9], [92, 20, 12]]) { f(x + hx, gy - 12 - h, w, h, '#d8c8a0'); for (let k = 0; k < 6; k++) f(x + hx - 1 + k * 0.5, gy - 12 - h - 5 + k, w + 2 - k, 1, RF); }
    // собор и колокольня
    f(x - 14, gy - 34, 30, 22, CR); f(x - 14, gy - 34, 30, 0.5, '#fff6d0'); f(x + 15, gy - 34, 1, 22, '#c8b87a'); for (let k = 0; k < 4; k++) { f(x - 11 + k * 7, gy - 30, 3, 6, '#7a6a52'); arch(x - 9.5 + k * 7, gy - 30, 3, '#7a6a52'); }
    f(x - 4, gy - 60, 10, 28, GD); f(x - 4, gy - 60, 1, 28, '#f6d878'); f(x + 5, gy - 60, 1, 28, GD2); f(x - 5, gy - 44, 12, 1.5, '#f6e8b0'); f(x - 2, gy - 52, 6, 4, CR); f(x + 0.75, gy - 51.5, 0.5, 3, '#5a4a30');
    for (let k = 0; k < 66; k++) { const w = Math.max(0.5, 4.5 - k * 0.07); f(x + 1 - w / 2, gy - 112 + k * 0.0 - k + 66 - 0, 0, 0, GD); }
    for (let k = 0; k < 52; k++) { const w = 1.2 + k * 0.05; f(x + 1 - w / 2, gy - 112 + k, w, 1, k % 5 ? GD : '#fff0a0'); }
    f(x + 0.75, gy - 118, 0.5, 6, GD); f(x - 0.5, gy - 116, 2, 0.5, GD);
    f(x - 3, gy - 66, 8, 7, GD); f(x - 2, gy - 65, 6, 5, '#f6d878'); f(x + 1, gy - 64, 0.5, 3, '#4a3a20');
    // второй купол
    f(x + 20, gy - 38, 10, 5, '#c8d0d8'); disc(x + 25, gy - 38, 4, '#b0b8c4'); f(x + 24.75, gy - 46, 0.5, 5, GD);
    al(0.18, () => f(x - 95, gy - 60, 220, 60, '#c8c0b8'));
  };
  P.graniteSphere = (x, gy, p, e) => {
    f(x - 2, gy - 18, 28, 18, '#a89888'); f(x - 2, gy - 18, 28, 0.5, '#d8c8b8'); f(x + 24, gy - 18, 2, 18, '#8a7a6a'); f(x - 3, gy - 20, 30, 2.5, '#b8a898'); f(x - 3, gy - 20, 30, 0.5, '#e8d8c8');
    for (let k = 0; k < 28; k += 6) f(x - 2 + k, gy - 18, 0.5, 18, '#8a7a6a55');
    disc(x + 12, gy - 29, 9, '#b89a8a'); al(0.55, () => disc(x + 9, gy - 32, 5, '#d8b8a8')); al(0.35, () => disc(x + 16, gy - 25, 5, '#8a6a5a')); f(x + 8, gy - 35, 5, 0.5, '#f0d8c8');
    sh(x - 3, gy, 32, 0.25);
  };

  // ---------- The International: арена (по фото с трибуны) ----------
  P.arena = (x, gy, p, e) => {
    const t = e.t, pul = Math.sin(t * 2.2);
    // ферма с прожекторами
    f(x - 22, gy - 80, 164, 3, '#14121c'); f(x - 22, gy - 80, 164, 0.5, '#4a4a5c'); for (let k = 0; k < 164; k += 6) { ln(x - 22 + k, gy - 80, x - 19 + k, gy - 77, '#2a2a38'); }
    for (const k of [-8, 22, 58, 96, 124]) { f(x + k, gy - 77, 5, 4, '#2a2a38'); f(x + k + 1, gy - 73, 3, 1, '#ffe9a8'); al(0.12 + 0.05 * Math.sin(t * 3 + k), () => { ln(x + k + 2, gy - 72, x + k + 14, gy - 22, '#9fd8ff'); ln(x + k + 3, gy - 72, x + k + 20, gy - 22, '#9fd8ff'); }); }
    // куб-экран: золотая рамка с узором и красной эмблемой
    f(x - 4, gy - 70, 128, 9, '#241c14'); f(x - 4, gy - 70, 128, 1, '#e8c04a'); f(x - 4, gy - 62, 128, 1, '#e8c04a'); for (let k = 0; k < 128; k += 7) { f(x - 2 + k, gy - 68, 4, 5, '#e8c04a'); f(x + k, gy - 67, 1, 3, '#241c14'); }
    disc(x + 60, gy - 65.5, 4, '#e0302a'); disc(x + 60, gy - 65.5, 2, '#ffd0a0');
    f(x, gy - 61, 6, 44, '#6a5a44'); f(x + 114, gy - 61, 6, 44, '#6a5a44'); for (let k = 0; k < 44; k += 3) { f(x + 1, gy - 61 + k, 4, 0.5, '#8a7a5c'); f(x + 115, gy - 61 + k, 4, 0.5, '#8a7a5c'); } al(0.5, () => { f(x + 5, gy - 61, 1.5, 44, '#ffd98a'); f(x + 113, gy - 61, 1.5, 44, '#ffd98a'); });
    // экран: сцена, шторы оранжево-розовые
    f(x + 6, gy - 61, 108, 40, '#1a1630'); f(x + 6, gy - 61, 108, 13, '#c88a9a'); for (let k = 0; k < 108; k += 9) f(x + 6 + k, gy - 61, 5, 13 - (k % 18 ? 2 : 0), k % 18 ? '#f0a888' : '#e0c0d0');
    f(x + 14, gy - 57, 8, 8, '#c8883a'); f(x + 94, gy - 57, 8, 8, '#c8883a'); al(0.6, () => { f(x + 15, gy - 56, 6, 6, '#ffd98a'); f(x + 95, gy - 56, 6, 6, '#ffd98a'); });
    f(x + 22, gy - 47, 72, 14, '#26224a'); f(x + 36, gy - 42, 44, 7, '#3a3a6a'); for (let k = 0; k < 20; k++) px(x + 24 + k * 3.5, gy - 46, k % 2 ? '#7ab8ff' : '#ffd98a'); f(x + 50, gy - 41, 16, 4, '#d0b070');
    // табло матча и логотипы команд
    f(x + 10, gy - 29, 100, 9, '#4a3a30'); f(x + 50, gy - 29, 20, 9, '#f0eadc'); f(x + 52, gy - 27, 6, 5, '#e0302a'); f(x + 62, gy - 27, 6, 5, '#7a8a9a'); f(x + 56, gy - 21.5, 8, 0.5, '#4a3a30');
    for (let k = 0; k < 4; k++) { f(x + 12 + k * 8, gy - 28, 6, 7, '#3a2e26'); f(x + 76 + k * 8, gy - 28, 6, 7, '#3a2e26'); }
    f(x + 10, gy - 28, 6, 7, '#2a6a8a');
    f(x - 14, gy - 52, 10, 12, '#5a4a40'); f(x - 12, gy - 50, 6, 8, '#d03a3a'); f(x + 124, gy - 52, 10, 12, '#5a4a40'); f(x + 126, gy - 50, 6, 8, '#e8eaf0');
    al(0.1 + 0.06 * pul, () => f(x + 6, gy - 61, 108, 40, '#9fd8ff'));
    // круглые сцены с узорным полом (красно-оранжевый круг справа)
    for (let k = 0; k < 5; k++) { f(x + 66 + k * 2, gy - 18 + k * 2.4, 76 - k * 4, 3, k % 2 ? '#3a2a24' : '#6a4a34'); }
    f(x + 78, gy - 22, 56, 8, '#c8603a'); f(x + 82, gy - 21, 48, 6, '#e08a50'); for (let k = 0; k < 8; k++) f(x + 84 + k * 5.5, gy - 20, 2, 4, k % 2 ? '#fff0c0' : '#a8402a'); f(x + 104, gy - 20, 4, 4, '#ffe9a8');
    f(x - 14, gy - 20, 70, 6, '#4a3a4a'); f(x - 10, gy - 19, 62, 4, '#6a5a6a'); f(x + 8, gy - 17, 22, 2, '#a89aa8');
    // трибуны и огни по ярусам
    for (let k = 0; k < 150; k += 5) { px(x - 25 + k, gy - 90 + (k % 3), '#ffe9a8'); }
    for (let i = 0; i < 40; i++) { const sx = x - 22 + rnd(i + 3) * 164, sy = gy - 40 + rnd(i + 9) * 14; px(sx, sy, ['#c8a89a', '#8a7a9a', '#a8b8d0'][i % 3]); }
    // зрители на первом плане: затылки и телефоны
    for (let i = 0; i < 16; i++) { const hx = x - 28 + i * 10.5, hy = gy - 6 - (i % 3) * 1.5, c = ['#1a1618', '#241c1c', '#14121c'][i % 3]; disc(hx, hy, 4.5, c); f(hx - 5, hy + 2, 10, 8, c); if (i % 5 === 1) { f(hx + 3, hy - 9, 3, 5, '#2a2a3a'); f(hx + 3.5, hy - 8.5, 2, 4, (Math.floor(t * 3) + i) % 3 ? '#cfe8ff' : '#ffd98a'); } if (i % 6 === 2) al(0.3, () => f(hx - 3, hy - 4, 6, 1, '#fff')); }
    al(0.2, () => f(x - 30, gy - 14, 190, 14, '#000'));
  };

  // ---------- Казахстан: горы с закатной подсветкой, озеро Каинды, Чарын, телебашня ----------
  P.mountains = (x, gy, p, e) => {
    for (let k = 0; k < 4; k++) {
      const cx = x + k * 70, h = 46 + (k % 2) * 16, base = gy - 30;
      for (let i = 0; i < h; i++) { const w = i * 0.9, yy = base - h + i;
        f(cx - w, yy, w, 1, i < 12 ? '#f4f6fa' : (k % 2 ? '#7a8aa8' : '#8a9ab8'));            // подсвеченный левый склон
        f(cx, yy, w, 1, i < 12 ? '#dfe6f0' : (k % 2 ? '#52627f' : '#5a6a88'));                  // тень справа
        if (i < 22 && (i * 7 + k) % 5 < 2) f(cx - w + 1 + (i * 3) % 7, yy, 2, 0.5, '#ffd9b0');   // закатный отблеск на снегу
        if (i > 14 && i % 3 === 0) { f(cx - w * 0.5, yy, 1, 0.5, '#e8eef6'); f(cx + w * 0.3, yy, 1.5, 0.5, '#3a4a68'); } }
      al(0.35, () => { for (let i = 0; i < 10; i++) f(cx - i * 0.8, base - h + i, i * 0.7, 0.5, '#ffd9a8'); });
      for (let q = 0; q < 14; q++) { const tx = cx - 34 + q * 5, ty = base - 2 - ((q * 3) % 4); f(tx, ty - 3, 1, 3, '#1f4a3a'); f(tx - 0.5, ty - 2, 2, 1, '#2f6b4f'); }
    }
  };
  P.lake = (x, gy, p, e) => {
    const w = p.w || 140, t = e.t;
    f(x, gy - 16, w, 15, '#2aa8aa'); f(x, gy - 16, w, 5, '#1f8aa0'); f(x, gy - 7, w, 6, '#4acaaa'); f(x, gy - 16, w, 0.5, '#8ad8d0'); f(x, gy - 1.5, w, 1.5, '#d8c89a');
    for (let i = 0; i < 20; i++) { const tx = x + 4 + (i * 53 % (w - 8)), th = 10 + (i % 4) * 3; f(tx, gy - 16 - th + 12, 1, th, i % 2 ? '#8a7a62' : '#6a5e4c'); f(tx, gy - 4, 0.5, 4, '#1a5a6a'); al(0.4, () => f(tx, gy - 4, 0.5, 3, '#0f3a4a')); }
    for (let i = 0; i < 14; i++) { const lx = x + ((i * 37 + t * 4) % w); if (Math.sin(t * 2 + i) > 0.2) f(lx, gy - 14 + (i % 5) * 2.4, 3, 0.5, '#bff0e8'); }
    f(x - 4, gy - 8, 3, 9, '#6a4a2a');
  };
  P.charyn = (x, gy, p, e) => {
    const RD = '#a4543a', RD2 = '#7a3a2a', RD3 = '#c47a56';
    for (let k = 0; k < 8; k++) { const cx = x + k * 18, h = 30 + ((k * 7) % 5) * 7, w = 20 + (k % 3) * 4;
      f(cx, gy - h, w, h, k % 2 ? RD : '#b25f40'); f(cx, gy - h, w, 1, RD3); f(cx + w - 3, gy - h, 3, h, RD2);
      for (let y = gy - h + 4; y < gy - 2; y += 4) f(cx, y, w, 0.5, k % 2 ? '#8a4630' : '#965036');
      for (let y = gy - h + 6; y < gy - 4; y += 9) { f(cx + 3 + (y % 5), y, 4, 2.5, RD2); f(cx + 3 + (y % 5), y, 4, 0.5, '#5a2a1e'); } }
    f(x - 14, gy - 12, 160, 12, '#c4825a'); f(x - 14, gy - 12, 160, 0.5, '#e0a47a'); for (let i = 0; i < 18; i++) f(x - 10 + i * 8.5, gy - 8 + (i % 3) * 2, 2, 0.5, '#5a6a3a');
  };
  P.tvTower = (x, gy, p, e) => {
    const h = p.h || 110;
    f(x - 30, gy - 16, 70, 16, '#6aa83a'); disc(x + 3, gy - 8, 22, '#58983a'); al(0.6, () => { for (let i = 0; i < 30; i++) f(x - 28 + rnd(i + x) * 62, gy - 20 + rnd(i + 4) * 16, 2, 1, i % 2 ? '#9ad85a' : '#3f7a2a'); });
    f(x + 1, gy - h * 0.8, 3, h * 0.8, '#e8dcb0'); f(x + 1, gy - h * 0.8, 1, h * 0.8, '#fff4d0'); f(x + 3.5, gy - h * 0.8, 1, h * 0.8, '#b8a880');
    f(x - 3, gy - h * 0.7, 11, 3, '#d8cc9e'); f(x - 4, gy - h * 0.7 + 1, 13, 1.5, '#a89c74'); f(x - 2, gy - h * 0.7 - 2, 9, 2, '#c8bc90');
    f(x - 2, gy - h * 0.9, 9, 3, '#d8cc9e'); f(x - 3, gy - h * 0.9 + 1, 11, 1.5, '#a89c74');
    f(x + 2, gy - h, 1, h * 0.12, '#c8654a'); for (let k = 0; k < 6; k++) f(x + 2, gy - h + k * 3, 1, 1.5, '#f6f2ea'); if (Math.floor(e.t * 2) % 2) px(x + 2.5, gy - h - 1, '#ff5a5a');
    al(0.15, () => f(x - 30, gy - 0.5, 70, 1.5, '#000'));
  };

  // ---------- Пекин: башня Летнего дворца, ворота Запретного города, Универсал, Великая стена ----------
  P.summerTower = (x, gy, p, e) => {
    const RD = '#a8322a', RD2 = '#7a2220', GN = '#2f7a6a', GN2 = '#1f5a50', GD = '#e8b84a', WH = '#e8e2d2', WH2 = '#c4bca8', LT = '#8a5a3a';
    // мраморная терраса с балюстрадой
    f(x - 6, gy - 14, 76, 14, WH); f(x - 6, gy - 14, 76, 0.5, '#fff'); f(x - 6, gy - 1, 76, 1, WH2); for (let k = 0; k < 76; k += 5) { f(x - 6 + k, gy - 20, 2.5, 6, WH); f(x - 6 + k, gy - 20, 2.5, 0.5, '#fff'); f(x - 6 + k + 3, gy - 18, 1.5, 4, '#6a5a50'); } f(x - 6, gy - 20, 76, 1, WH);
    for (let k = 0; k < 76; k += 7) f(x - 5 + k, gy - 12, 5, 0.5, WH2);
    const tier = (tx, ty, w, h, last) => {
      f(tx, ty, w, h, RD2); for (let k = 3; k < w - 2; k += 6) { f(tx + k, ty, 2, h, RD); f(tx + k, ty, 0.5, h, '#d0584a'); } for (let k = 6; k < w - 4; k += 6) f(tx + k, ty + 2, 3.5, h - 3, LT);
      f(tx, ty, w, 1.5, GN2); for (let k = 0; k < w; k += 3) f(tx + k, ty + 1.5, 1.5, 1.5, k % 6 ? GD : '#4aa8d8');
    };
    const roof = (cx, ry, hw, th) => { for (let i = 0; i < th; i++) { const w = hw - i * (hw * 0.5 / th); f(cx - w, ry - i, w * 2, 1, i % 3 === 0 ? GN : GN2); } f(cx - hw - 3, ry + 0.5, hw * 2 + 6, 1.5, RD); f(cx - hw - 3, ry + 2, hw * 2 + 6, 1, GD); f(cx - hw - 4, ry - 1, 3, 1.5, GN); f(cx + hw + 1, ry - 1, 3, 1.5, GN); for (let k = -hw; k < hw; k += 4) f(cx + k, ry + 1, 1.5, 1.5, '#4aa8d8'); };
    tier(x + 6, gy - 38, 52, 18); roof(x + 32, gy - 38, 38, 8);
    tier(x + 12, gy - 58, 40, 14); roof(x + 32, gy - 58, 32, 8);
    tier(x + 18, gy - 76, 28, 12); roof(x + 32, gy - 76, 26, 7);
    f(x + 28, gy - 98, 8, 8, RD2); roof(x + 32, gy - 90, 15, 6); f(x + 31.5, gy - 104, 1, 8, GD); disc(x + 32, gy - 100, 1.8, GD);
    al(0.2, () => f(x - 6, gy - 0.5, 80, 1.5, '#000'));
  };
  P.forbiddenGate = (x, gy, p, e) => {
    const RD = '#c4402e', RD2 = '#9a2c20', YL = '#e8a838', YL2 = '#c88820', GR = '#8a8478', WH = '#f0ece0';
    f(x, gy - 30, 96, 30, RD); f(x, gy - 30, 96, 0.5, '#e8604a'); f(x + 95, gy - 30, 1, 30, RD2); al(0.15, () => f(x, gy - 4, 96, 4, '#000'));
    for (const [ax, aw] of [[8, 18], [38, 20], [70, 18]]) { f(x + ax, gy - 20, aw, 20, '#1c1618'); arch(x + ax + aw / 2, gy - 20, aw, '#1c1618'); f(x + ax - 1, gy - 22, aw + 2, 1.5, '#e8b84a'); f(x + ax, gy - 21, aw, 0.5, '#fff0b0'); }
    f(x + 38, gy - 24, 20, 3, '#d8a838'); f(x + 8, gy - 26, 18, 3, '#d8a838'); f(x + 70, gy - 26, 18, 3, '#d8a838');
    f(x - 2, gy - 36, 100, 6, GR); f(x - 2, gy - 36, 100, 0.5, '#c8c2b4'); for (let k = 0; k < 100; k += 5) f(x - 2 + k, gy - 36 - 3, 3, 3, GR); f(x - 2, gy - 41, 100, 5, WH); for (let k = 0; k < 100; k += 5) { f(x - 2 + k, gy - 41, 2.5, 5, WH); f(x - 2 + k + 3, gy - 40, 1.5, 3.5, '#8a8478'); }
    // двухъярусное здание на стене
    f(x + 6, gy - 62, 84, 21, RD2); for (let k = 4; k < 82; k += 8) { f(x + 6 + k, gy - 62, 2.5, 21, RD); f(x + 6 + k, gy - 62, 0.5, 21, '#e8604a'); } for (let k = 8; k < 80; k += 8) { f(x + 6 + k, gy - 58, 5, 14, '#a85a2a'); for (let q = 0; q < 14; q += 2) f(x + 6 + k, gy - 58 + q, 5, 0.5, '#6a3a1a'); }
    f(x + 6, gy - 64, 84, 3, '#2a4a6a'); for (let k = 0; k < 84; k += 6) f(x + 6 + k, gy - 63.5, 3, 1.5, '#8ac8d8');
    const roof = (rx, ry, hw, th, c) => { for (let i = 0; i < th; i++) { const w = hw - i * (hw * 0.45 / th); f(rx - w, ry - i, w * 2, 1, i % 2 ? c : mix(c, 0.12)); } f(rx - hw - 3, ry, hw * 2 + 6, 1.5, YL2); f(rx - hw - 4, ry - 2.5, 3.5, 2, YL); f(rx + hw + 0.5, ry - 2.5, 3.5, 2, YL); for (let k = -hw; k < hw; k += 3) f(rx + k, ry + 1.5, 1, 1, '#5a3a2a'); };
    roof(x + 48, gy - 66, 54, 10, YL);
    f(x + 14, gy - 80, 68, 13, RD2); for (let k = 3; k < 66; k += 7) f(x + 14 + k, gy - 80, 2, 13, RD); f(x + 14, gy - 82, 68, 2.5, '#2a4a6a');
    roof(x + 48, gy - 83, 44, 9, YL); f(x + 47, gy - 96, 2, 3, '#e8c040');
    f(x + 40, gy - 78, 16, 11, '#e8b848'); f(x + 41, gy - 77, 14, 9, '#2447b0'); for (let k = 0; k < 4; k++) f(x + 43 + k * 3, gy - 75, 1.5, 5, '#f0d878');
    al(0.2, () => f(x - 3, gy - 0.5, 102, 1.5, '#000'));
  };
  P.universalGlobe = (x, gy, p, e) => {
    const g = A.ctx, cx = x + 36, cy = gy - 34;
    for (let i = -33; i <= 33; i++) { const h = Math.sqrt(33 * 33 - i * i); f(cx + i, cy - h, 1, h * 2, i < -10 ? '#2f5a8a' : i < 14 ? '#2a4d78' : '#1e3a5e'); }
    al(0.5, () => { disc(cx - 10, cy - 12, 14, '#5a8ac0'); });
    for (let r2 = 4; r2 < 33; r2 += 4) for (let k = -33; k < 33; k += 4) if (k * k + r2 * r2 < 33 * 33 && (k + r2) % 8 === 0) px(cx + k, cy + r2 - 16, '#10243e');
    al(0.7, () => { f(cx - 24, cy - 22, 18, 6, '#6a4a34'); f(cx - 20, cy - 26, 14, 5, '#7a5a40'); f(cx - 6, cy + 10, 16, 10, '#6a4a34'); f(cx - 4, cy + 8, 10, 4, '#7a5a40'); });
    for (let i = -33; i < 34; i += 3) f(cx + i, cy + Math.sqrt(33 * 33 - i * i) - 1, 3, 1, '#1a2c46');
    const gl = (lx, ly, ch) => { S.txt(lx + 1, ly + 1, ch, '#8a6a1a', 8, 'center'); S.txt(lx, ly, ch, '#fff6e0', 8, 'center'); };
    'UNIVERSAL'.split('').forEach((ch, i) => { const lx = x - 6 + i * 9, ly = gy - 44 - Math.round(Math.sin(i * 0.35) * 2); S.txt(lx - 0.5, ly - 0.5, ch, '#e8b83a', 8, 'center'); gl(lx, ly, ch); });
    // фонтан и перила
    f(x - 12, gy - 8, 96, 3, '#6a7280'); f(x - 12, gy - 8, 96, 0.5, '#c8ced8'); for (let k = 0; k < 96; k += 8) f(x - 12 + k, gy - 8, 0.5, 8, '#8a92a0');
    for (let k = 0; k < 10; k++) { const jx = x - 6 + k * 9, jh = 5 + ((Math.floor(e.t * 3) + k) % 3) * 2; al(0.8, () => f(jx, gy - 8 - jh, 1, jh, '#e8f4ff')); al(0.5, () => f(jx - 1, gy - 8 - jh - 1, 3, 1, '#fff')); }
    al(0.2, () => f(x - 14, gy - 0.5, 100, 1.5, '#000'));
  };
  P.greatWall = (x, gy, p, e) => {
    const GR = '#6a6e72', GR2 = '#4a4e52', GR3 = '#8a8e92', N = p.len || 150;
    for (let i = 0; i < N; i++) { const top = gy - 8 - i * 0.2, h = gy - top; f(x + i, top, 1, h, (i % 12) < 1 ? GR2 : GR); f(x + i, top, 1, 1, GR3); if (i % 6 < 3) f(x + i, top - 3, 1, 3, GR); if (i % 6 === 0) f(x + i, top - 3, 0.5, 3, GR3);
      if (i % 8 === 0) for (let k = 3; k < h - 1; k += 4) f(x + i, top + k, 8, 0.5, GR2); }
    // сторожевая башня в конце
    const tx = x + N - 6, ty = gy - 8 - N * 0.2;
    f(tx, ty - 22, 22, 22 + 8 + N * 0.2 - N * 0.2 + 8, GR); f(tx, ty - 22, 22, 1, GR3); for (let k = 0; k < 22; k += 5) f(tx + k, ty - 26, 3, 4, GR); f(tx + 7, ty - 14, 8, 11, '#1c1c20'); arch(tx + 11, ty - 14, 8, '#1c1c20'); f(tx + 21, ty - 22, 1, 30, GR2);
    al(0.22, () => f(x, gy - 0.5, N + 24, 1.5, '#000'));
  };
})();
