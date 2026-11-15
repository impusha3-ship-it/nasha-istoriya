// ===== scenes7.js — Владивосток (аэропорт), Кронштадт, Калининград, коса, заброшка, змея =====
(() => {
  const S = SCENES, P = S.P, BG = S.BG, { r, px, rnd, disc } = A, ln = S.ln;
  const { f, al, mix } = S.fx;
  const sh = (x, gy, w, a = 0.22) => al(a, () => f(x, gy - 0.5, w, 1.5, '#000'));
  const arch = (cx, y, w, col) => { f(cx - w / 2, y, w, 0.5, col); f(cx - w / 2 + 0.5, y - 0.5, w - 1, 0.5, col); f(cx - w / 2 + 1, y - 1, w - 2, 0.5, col); };
  const wrap = (name, fn) => { const old = P[name]; if (!old) return; P[name] = (x, gy, p, e) => { old(x, gy, p, e); fn(x, gy, p || {}, e); }; };

  // ---------- аэропорт Владивостока ----------
  const air0 = P.airport;
  P.airport = (x, gy, p, e) => {
    if (p.sign !== 'VVO') return air0(x, gy, p, e);
    const BL = '#2a6ad0', BL2 = '#1a4aa0', GL = '#3a78d8', GR = '#8a8e92', GR2 = '#6a6e72';
    // скошенная серая кровля с облицовкой
    for (let i = 0; i < 230; i++) { const top = gy - 66 - Math.round(i * 0.07); f(x + i, top, 1, 12, GR); f(x + i, top, 1, 1, '#c8ccd0'); if (i % 9 === 0) f(x + i, top + 1, 0.5, 11, GR2); }
    f(x, gy - 54, 230, 0.5, '#4a4e52');
    // стеклянный фасад с голубой полосой и сеткой переплётов
    f(x + 2, gy - 54, 228, 44, '#2a4a7a'); for (let i = 0; i < 228; i += 7) f(x + 2 + i, gy - 54, 0.5, 44, '#8ab0e0'); for (let j = 0; j < 44; j += 7) f(x + 2, gy - 54 + j, 228, 0.5, '#8ab0e0');
    for (let i = 0; i < 228; i++) { const h = 12 - i * 0.02; f(x + 2 + i, gy - 54, 1, h, i % 7 ? GL : '#5a96e8'); }
    al(0.35, () => { for (let k = 0; k < 8; k++) ln(x + 10 + k * 28, gy - 52, x + 30 + k * 28, gy - 14, '#fff'); });
    // надпись по фасаду
    f(x + 94, gy - 49, 6, 5, '#fff'); ln(x + 94, gy - 45, x + 100, gy - 49, '#2a6ad0'); S.txt(x + 104, gy - 52, 'Владивосток', '#fff', 8, 'left'); S.txt(x + 104, gy - 42, 'международный аэропорт', '#e8f0ff', 4, 'left');
    // отражения машин и людей в нижнем ряду стёкол
    for (let k = 0; k < 14; k++) { f(x + 6 + k * 16, gy - 24, 8, 3, '#1a2a44'); f(x + 8 + k * 16, gy - 27, 4, 3, '#2a3a5a'); }
    f(x + 2, gy - 10, 228, 10, '#6a625a'); for (let k = 0; k < 228; k += 12) f(x + 2 + k, gy - 10, 0.5, 10, '#4a443e'); f(x + 2, gy - 10, 228, 0.5, '#a89c90');
    // синий входной блок слева
    f(x - 6, gy - 22, 28, 22, BL); f(x - 6, gy - 22, 28, 1, '#6a9af0'); f(x - 6, gy - 5, 28, 0.5, BL2); f(x + 2, gy - 17, 12, 17, '#10264a'); f(x + 3, gy - 16, 10, 5, '#3a7ad8');
    f(x + 224, gy - 38, 8, 38, BL); f(x + 224, gy - 38, 8, 1, '#6a9af0');
    // скамейки
    for (const bx of [88, 128]) { f(x + bx, gy - 4, 10, 1.5, '#8a5a3a'); f(x + bx, gy - 7, 10, 1.5, '#8a5a3a'); f(x + bx + 1, gy - 3, 0.5, 3, '#3a3a40'); f(x + bx + 8, gy - 3, 0.5, 3, '#3a3a40'); }
    for (const bx of [60, 160, 190]) { f(x + bx, gy - 8, 6, 8, '#9a9a94'); f(x + bx, gy - 8, 6, 0.5, '#d0d0ca'); }
    sh(x - 8, gy, 244, 0.2);
  };

  // ---------- Морской собор в Кронштадте ----------
  P.navalCathedral = (x, gy, p, e) => {
    const WH = '#ece6d6', WH2 = '#cdc5ae', WH3 = '#aca48c', GD = '#e6b844', GD2 = '#b88a28', GR = '#8a8478', BLK = '#2a3038', GL = '#9ac0d8';
    // центральный барабан и золотой купол
    f(x + 30, gy - 94, 40, 18, WH); for (let k = 0; k < 40; k += 4) { f(x + 32 + k, gy - 92, 2, 8, BLK); arch(x + 33 + k, gy - 92, 2, BLK); } f(x + 28, gy - 96, 44, 2, WH2);
    for (let k = 0; k < 14; k++) { const w = Math.round(Math.sqrt(1 - Math.pow((k - 14) / 14, 2)) * 20 * 2) / 2; f(x + 50 - w, gy - 110 + k, w * 2, 1, k % 3 ? GD : '#f6d870'); } f(x + 49.5, gy - 118, 1, 8, GD2); f(x + 48, gy - 116, 4, 1, GD2);
    // средняя часть: круглое окно и мозаика
    f(x + 22, gy - 76, 56, 20, WH); f(x + 22, gy - 76, 56, 1, '#fff'); arch(x + 50, gy - 78, 38, '#8ac8c0'); for (let k = 0; k < 3; k++) arch(x + 50, gy - 79 + k * 0.5, 36 - k * 2, k % 2 ? '#a8d8d0' : '#7ac0b8');
    disc(x + 50, gy - 66, 8.5, WH3); disc(x + 50, gy - 66, 7.5, GL); for (let k = -7; k < 8; k += 3) { f(x + 50 + k, gy - 73, 0.5, 14, '#d8ecf4'); } for (let k = -6; k < 7; k += 3) f(x + 43, gy - 66 + k, 14, 0.5, '#d8ecf4'); al(0.4, () => disc(x + 47, gy - 69, 3, '#fff'));
    // основной фасад
    f(x + 14, gy - 56, 72, 46, WH); for (let k = 0; k < 72; k += 6) f(x + 14 + k, gy - 56, 0.5, 46, '#00000010'); f(x + 14, gy - 56, 72, 1, '#fff'); f(x + 14, gy - 44, 72, 1.5, WH2); f(x + 14, gy - 22, 72, 1.5, WH2);
    for (const wx of [20, 30, 40, 54, 64, 74]) { f(x + wx - 0.5, gy - 54, 5, 10, WH2); f(x + wx, gy - 53, 4, 9, BLK); arch(x + wx + 2, gy - 53, 4, BLK); f(x + wx + 1.75, gy - 53, 0.5, 9, '#8a8f98'); }
    for (const wx of [18, 28, 62, 72]) { f(x + wx - 1, gy - 40, 8, 14, WH2); f(x + wx, gy - 39, 6, 13, BLK); arch(x + wx + 3, gy - 39, 6, BLK); f(x + wx + 2.75, gy - 39, 0.5, 13, '#8a8f98'); for (let q = 0; q < 13; q += 3) f(x + wx, gy - 39 + q, 6, 0.5, '#6a7078'); }
    // боковые башни с золотыми куполами
    for (const tx of [0, 76]) {
      f(x + tx, gy - 76, 24, 70, WH); f(x + tx, gy - 76, 24, 1, '#fff'); f(x + tx + 23, gy - 76, 1, 70, WH2); f(x + tx, gy - 62, 24, 1.5, WH2); f(x + tx, gy - 40, 24, 1.5, WH2);
      for (const [wy, h] of [[72, 9], [58, 9], [34, 12]]) { f(x + tx + 8, gy - wy, 7, h, WH2); f(x + tx + 9, gy - wy + 1, 5, h - 1, BLK); arch(x + tx + 11.5, gy - wy + 1, 5, BLK); }
      for (let k = 0; k < 8; k++) { const w = Math.round(Math.sqrt(1 - Math.pow((k - 8) / 8, 2)) * 11 * 2) / 2; f(x + tx + 12 - w, gy - 84 + k, w * 2, 1, k % 2 ? GD : '#f6d870'); } f(x + tx + 11.75, gy - 90, 0.5, 6, GD2); f(x + tx + 10.5, gy - 89, 3, 0.5, GD2);
      f(x + tx, gy - 10, 24, 10, GR); f(x + tx, gy - 10, 24, 0.5, '#b8b2a4');
    }
    // портал, дверь, ступени
    f(x + 38, gy - 34, 24, 24, WH2); arch(x + 50, gy - 34, 24, WH2); f(x + 41, gy - 30, 18, 20, '#1c1c20'); arch(x + 50, gy - 30, 18, '#1c1c20'); f(x + 42, gy - 28, 16, 18, '#2a2a30'); f(x + 49.75, gy - 28, 0.5, 18, '#4a4a52'); f(x + 49, gy - 20, 2, 0.5, '#8a8a92'); f(x + 48.5, gy - 24, 3, 3, '#6a6a72');
    for (const cx of [38, 61]) { f(x + cx, gy - 26, 2, 16, '#4a4a50'); }
    for (let k = 0; k < 5; k++) { f(x + 34 - k * 1.5, gy - 10 + k * 2, 32 + k * 3, 2, k % 2 ? '#9a9488' : '#aca69a'); f(x + 34 - k * 1.5, gy - 10 + k * 2, 32 + k * 3, 0.5, '#d0cabc'); }
    f(x + 14, gy - 10, 72, 10, GR); f(x + 14, gy - 10, 72, 0.5, '#b8b2a4');
    f(x + 78, gy - 40, 1, 36, '#d8d4c8'); f(x + 20, gy - 40, 1, 36, '#d8d4c8');
    sh(x - 4, gy, 110, 0.2);
  };

  // ---------- Рыбная деревня ----------
  P.fishvillage = (x, gy, p, e) => {
    const CR = '#ecdcb4', TB = '#6a3a2a', RF = '#b84a32', RF2 = '#8a3422', WT = '#e8e0cc', YL = '#e8d078', GN = '#9ad48a', OR = '#e8a058', PE = '#f0cfa0';
    const gable = (hx, w, h) => {
      f(hx, gy - 12 - h, w, h, CR); f(hx, gy - 12 - h, 0.5, h, '#fff6d8'); f(hx + w - 1, gy - 12 - h, 1, h, '#c8b88c');
      for (let k = 0; k < w; k += 6) { ln(hx + k, gy - 12, hx + k + 6, gy - 12 - h, TB); f(hx + k, gy - 12 - h, 0.5, h, TB); } for (let y = gy - 12 - h; y < gy - 12; y += 11) f(hx, y, w, 0.5, TB);
      for (let y = gy - 12 - h + 5; y < gy - 18; y += 11) for (let k = 4; k < w - 4; k += 8) { f(hx + k, y, 4, 5, '#3a3430'); f(hx + k, y, 4, 0.5, '#8a8478'); }
      for (let k = 0; k < w / 2 + 2; k++) f(hx - 1 + k * 0.9, gy - 12 - h - k * 0.95 - 1, w + 2 - k * 1.8, 1.2, k % 2 ? RF : RF2);
      f(hx - 1, gy - 12 - h, w + 2, 1.5, RF2); f(hx + w / 2 - 0.25, gy - 12 - h - w / 2 - 2, 0.5, 3, '#4a3a30');
    };
    gable(x, 22, 48); gable(x + 21, 22, 50); gable(x + 42, 22, 46);
    // круглая башня-маяк с тёмным куполом и балконом
    f(x + 64, gy - 74, 20, 62, '#e2dccc'); f(x + 64, gy - 74, 3, 62, '#f6f2e6'); f(x + 81, gy - 74, 3, 62, '#b8b09c'); for (const wy of [58, 44, 28]) { f(x + 72, gy - wy, 3, 6, '#4a4640'); arch(x + 73.5, gy - wy, 3, '#4a4640'); }
    f(x + 61, gy - 78, 26, 4, '#d8d2c0'); f(x + 61, gy - 78, 26, 0.5, '#fff'); for (let k = 0; k < 26; k += 3) f(x + 61 + k, gy - 82, 0.5, 4, '#2a2a2a'); f(x + 61, gy - 82, 26, 0.5, '#2a2a2a');
    f(x + 66, gy - 92, 16, 10, '#d8d2c0'); for (let k = 0; k < 3; k++) f(x + 68 + k * 5, gy - 90, 3, 6, '#3a5a7a'); for (let k = 0; k < 6; k++) { const w = 9 - k * 1.4; f(x + 74 - w, gy - 98 + k, w * 2, 1, '#3a3a40'); } f(x + 73.75, gy - 105, 0.5, 7, '#2a2a2a');
    // жёлтые дома и разноцветный ряд справа
    f(x + 86, gy - 38, 26, 26, YL); for (let k = 0; k < 26; k += 7) f(x + 86 + k, gy - 38, 0.5, 26, TB); for (let y = 0; y < 3; y++) for (let k = 3; k < 24; k += 7) f(x + 86 + k, gy - 34 + y * 8, 3, 4, '#3a3430'); for (let k = 0; k < 26; k++) f(x + 86 + k, gy - 38 - (k < 13 ? k : 26 - k) * 0.3, 1, 3, RF);
    for (const [cx, w, h, c] of [[112, 18, 44, GN], [130, 16, 38, OR], [146, 14, 42, PE], [160, 18, 36, GN]]) { f(x + cx, gy - 12 - h, w, h, c); f(x + cx, gy - 12 - h, w, 0.5, '#fff'); for (let y = gy - 12 - h + 5; y < gy - 16; y += 8) for (let k = 3; k < w - 3; k += 5) { f(x + cx + k, y, 3, 4.5, '#fff'); f(x + cx + k + 0.5, y + 0.5, 2, 3.5, '#6a7a8a'); } for (let k = 0; k < w; k++) f(x + cx + k, gy - 12 - h - Math.min(k, w - k) * 0.35 - 1, 1, 3, RF); }
    // набережная, тент кафе, лодки
    f(x - 8, gy - 12, 190, 12, '#8a8e92'); f(x - 8, gy - 12, 190, 0.5, '#c8ccd0'); for (let k = 0; k < 190; k += 20) f(x - 8 + k, gy - 12, 0.5, 12, '#6a6e72');
    for (let k = 0; k < 4; k++) { ln(x + 60 + k * 6, gy - 22, x + 52 + k * 6, gy - 13, '#f4f0e4'); } f(x + 46, gy - 14, 36, 1.5, '#f4f0e4'); f(x + 40, gy - 10, 44, 2, '#2a2a2a');
    for (let k = 0; k < 8; k++) f(x + 90 + k * 12, gy - 14, 1.5, 3, k % 2 ? '#e8a8a0' : '#a8d098');
    for (const bx of [104, 132]) { f(x + bx, gy - 5, 22, 3, '#f4f4ee'); f(x + bx, gy - 3, 22, 1.5, '#3a9a4a'); f(x + bx + 3, gy - 9, 14, 4, '#e8eef2'); f(x + bx + 5, gy - 8, 3, 2, '#4a7aa8'); f(x + bx + 10, gy - 8, 3, 2, '#4a7aa8'); }
    sh(x - 8, gy, 190, 0.2);
  };

  // ---------- Кафедральный собор Кёнигсберга ----------
  P.cathedral = (x, gy, p, e) => {
    const BR = '#a8442e', BR2 = '#7a301f', BR3 = '#c8644a', YL = '#f0c868', YL2 = '#c89a40', GR = '#2f4a3a', GR2 = '#223628', ST = '#8a8478';
    f(x, gy - 8, 96, 8, '#8a7a70'); f(x, gy - 8, 96, 0.5, '#b8a898');
    // основной объём
    f(x + 2, gy - 62, 70, 54, BR); f(x + 2, gy - 62, 70, 0.5, BR3); f(x + 71, gy - 62, 2, 54, BR2);
    for (let y = gy - 60; y < gy - 8; y += 3) f(x + 2, y, 70, 0.5, '#00000018'); for (let k = 0; k < 70; k += 4) f(x + 2 + k, gy - 62, 0.5, 54, '#ffffff0a');
    f(x + 2, gy - 36, 70, 1, ST); f(x + 2, gy - 18, 70, 1, ST);
    // левый ступенчатый фронтон
    for (let s = 0; s < 6; s++) { const w = 6 + s * 4; f(x + 2 + (26 - w) / 2, gy - 76 + s * 2, w, 2.2, BR); } f(x + 2, gy - 62, 26, 14, BR); f(x + 2, gy - 62, 26, 0.5, '#e0e0d8');
    f(x + 9, gy - 74, 4, 8, YL); arch(x + 11, gy - 74, 4, YL); f(x + 16, gy - 74, 4, 8, YL); arch(x + 18, gy - 74, 4, YL); f(x + 13.5, gy - 80, 3, 4, YL2); f(x + 14.75, gy - 84, 0.5, 4, '#5a5a5a');
    // центральный щипец с высоким окном
    for (let k = 0; k < 8; k++) { const w = 6 + k * 1.7; f(x + 30 + (18 - w) / 2, gy - 80 + k * 2, w, 2, k % 2 ? BR : BR3); } f(x + 32, gy - 64, 14, 2, BR); f(x + 36, gy - 72, 6, 18, YL); arch(x + 39, gy - 72, 6, YL); f(x + 38.5, gy - 70, 1, 4, '#4a4a4a'); f(x + 38.5, gy - 62, 1, 3, '#4a4a4a'); f(x + 38.5, gy - 86, 1, 8, '#5a5a5a'); ln(x + 36, gy - 84, x + 41, gy - 84, '#5a5a5a');
    // высокие стрельчатые окна — подсвеченные закатом
    const win = (wx, wy, w, h, lit) => { f(wx - 0.5, wy - 0.5, w + 1, h + 0.5, '#5a2a1e'); f(wx, wy, w, h, lit ? YL : '#3a4a5a'); arch(wx + w / 2, wy, w, lit ? YL : '#3a4a5a'); f(wx + w / 2 - 0.25, wy + 1, 0.5, h - 1, lit ? YL2 : '#1a2a3a'); };
    for (let k = 0; k < 6; k++) { win(x + 6 + k * 6, gy - 58, 3, 12, k % 2 === 0); win(x + 6 + k * 6, gy - 42, 3, 10, k % 2 === 1); }
    for (let k = 0; k < 5; k++) { win(x + 5 + k * 7, gy - 30, 4, 20, k % 2 === 0); }
    f(x + 36, gy - 12, 10, 12, '#2a1a14'); arch(x + 41, gy - 12, 10, '#2a1a14'); f(x + 35, gy - 14, 12, 1.5, ST); f(x + 40.75, gy - 11, 0.5, 11, '#4a3a2a');
    f(x - 2, gy - 18, 8, 10, BR2); f(x + 68, gy - 18, 8, 10, BR2);
    // башня с часами и тёмным шпилем
    f(x + 72, gy - 80, 22, 72, BR); f(x + 72, gy - 80, 22, 0.5, BR3); f(x + 92, gy - 80, 2, 72, BR2); f(x + 70, gy - 82, 26, 3, '#4a4a4a'); f(x + 70, gy - 82, 26, 0.5, '#8a8a8a');
    for (const wy of [76, 64, 52, 40, 28]) { f(x + 76, gy - wy, 3, 8, YL); arch(x + 77.5, gy - wy, 3, YL); f(x + 86, gy - wy, 3, 8, YL); arch(x + 87.5, gy - wy, 3, YL); }
    disc(x + 83, gy - 88, 5, '#e8c860'); disc(x + 83, gy - 88, 4, '#1a1a1a'); for (let k = 0; k < 4; k++) px(x + 83 + Math.cos(k * 1.57) * 3, gy - 88 + Math.sin(k * 1.57) * 3, '#e8c860'); ln(x + 83, gy - 88, x + 83, gy - 91, '#e8c860'); ln(x + 83, gy - 88, x + 85, gy - 87, '#e8c860');
    f(x + 72, gy - 95, 22, 12, BR2); f(x + 73, gy - 94, 20, 10, BR); for (let k = 0; k < 3; k++) f(x + 76 + k * 6, gy - 92, 2, 6, '#3a2a22');
    for (let k = 0; k < 26; k++) { const w = 1.5 + k * 0.38; f(x + 83 - w / 2 - 0.5, gy - 122 + k, w + 1, 1, k % 4 ? GR : GR2); } f(x + 82.75, gy - 134, 0.5, 12, '#2a2a2a'); f(x + 81.5, gy - 132, 3, 0.5, '#2a2a2a'); f(x + 81.5, gy - 135, 3, 1.5, '#4a4a4a');
    al(0.25, () => f(x - 2, gy - 8, 100, 8, '#000')); sh(x - 4, gy, 104, 0.22);
  };

  // ---------- коса: бетонные тетраподы и маячок ----------
  P.pierLight = (x, gy, p, e) => {
    f(x, gy - 6, 14, 6, '#8a8e92'); f(x, gy - 6, 14, 0.5, '#c8ccd0');
    f(x + 4, gy - 40, 6, 34, '#1f4a40'); f(x + 4, gy - 40, 1, 34, '#3a7a68'); f(x + 4, gy - 26, 6, 6, '#e8ece8'); for (let k = 0; k < 6; k++) f(x + 3.5 + (k % 2) * 6, gy - 38 + k * 5, 1, 4, '#2a5a50');
    f(x + 2, gy - 46, 10, 7, '#1a3a30'); for (let k = 0; k < 10; k += 2) f(x + 2 + k, gy - 46, 0.5, 7, '#6a8a80'); f(x + 2, gy - 46, 10, 0.5, '#8aa89c'); f(x + 4, gy - 44, 6, 4, '#c8d8cc'); f(x + 6, gy - 43, 2, 2, Math.floor(e.t * 1.5) % 2 ? '#ffe9a8' : '#a89c70');
    sh(x - 2, gy, 18, 0.25);
  };
  wrap('breakwater', (x, gy, p) => {
    const n = p.n || 14, C = '#808488', C2 = '#5f6366', C3 = '#a4a8ac';
    for (let i = 0; i < Math.ceil(n / 2); i++) { const bx = x + i * 14 + (i % 2) * 3, by = gy - (i % 3) * 2, s = 1 + (i % 3) * 0.25;
      f(bx, by - 11 * s, 11 * s, 11 * s, i % 2 ? C : mix(C, 0.06)); f(bx, by - 11 * s, 11 * s, 1, C3); f(bx + 11 * s - 2, by - 11 * s, 2, 11 * s, C2); f(bx + 2, by - 8 * s, 2, 1.5, '#3a3c40'); f(bx, by - 2, 11 * s, 2, '#5a5e62');
      if (i % 2) { f(bx + 3 * s, by - 17 * s, 5, 7 * s, C); f(bx + 3 * s, by - 17 * s, 5, 1, C3); f(bx + 5 * s, by - 15 * s, 1.5, 1.5, '#3a3c40'); } }
    sh(x - 2, gy, n * 7 + 6, 0.25);
  });

  // ---------- заброшенный ангар: плиты и ржавые фермы ----------
  const hg1 = BG.hangar;
  BG.hangar = function (e) {
    hg1(e);
    const W = e.W, H = e.H, GY = e.GY, cam = e.cam, bo = Math.round(cam * 0.9);
    // ржавая ферма сверху: диагонали и стойки, растения на кромке
    for (let wx = -(bo % 36) - 36; wx < W + 36; wx += 36) { ln(wx, 6, wx + 18, 30, '#8a4a30'); ln(wx + 18, 30, wx + 36, 6, '#8a4a30'); f(wx + 17.5, 6, 1, 24, '#5a3220'); al(0.4, () => f(wx + 1, 7, 1, 2, '#c8784a')); }
    al(0.7, () => { for (let k = 0; k < 14; k++) { const gx = -(bo % 120) + k * 17; f(gx, 3, 1, 3, '#7aa84a'); f(gx + 1, 4, 1, 2, '#5a8a3a'); } });
    // бетонные плиты с травой по швам
    al(0.3, () => { for (let x = -(cam % 58); x < W; x += 58) f(x, GY + 1, 0.5, H - GY, '#5a5648'); for (const y of [GY + 8, GY + 17]) f(0, y, W, 0.5, '#5a5648'); });
    for (let x = -(cam % 58); x < W; x += 58) for (let k = 0; k < 6; k++) { f(x + (k % 2) * 0.5, GY + 2 + k * 3.5, 0.5, 2, '#6f9a4a'); f(x + 1, GY + 3 + k * 3.5, 0.5, 1.5, '#8fba5a'); }
    for (let i = 0; i < 12; i++) { const gx = ((rnd(i + 800) * 400 - cam) % (W + 20) + W + 20) % (W + 20) - 10; f(gx, GY + 6 + rnd(i + 801) * 16, 4, 0.5, '#7aa84a'); f(gx + 1, GY + 5 + rnd(i + 801) * 16, 0.5, 1.5, '#9aca6a'); }
    al(0.12, () => f(0, H - 6, W, 6, '#000'));
  };

  // ---------- красная змея: сетчатый узор и швы ----------
  wrap('snake', (x, gy, p, e) => {
    const W = p.w || 260, rad = p.rad || 9;
    const pt = t => { const u = t * W; return [x + u, gy - 62 + Math.sin(t * Math.PI * 2.6 + 0.6) * 26 + Math.cos(t * Math.PI * 5) * 5]; };
    for (let k = 1; k < 90; k++) { const q = pt(k / 90), q2 = pt(Math.min(1, (k + 1) / 90)), a = Math.atan2(q2[1] - q[1], q2[0] - q[0]), nx = -Math.sin(a), ny = Math.cos(a);
      if (k % 5 === 0) { al(0.45, () => ln(q[0] + nx * rad, q[1] + ny * rad, q[0] - nx * rad, q[1] - ny * rad, '#7a0d0d')); }
      if (k % 2 === 0) for (let m = -1; m <= 1; m++) { const cx = q[0] + nx * m * rad * 0.55 + (k % 4 === 0 ? 1.2 : 0), cy = q[1] + ny * m * rad * 0.55; f(cx - 1, cy - 0.5, 2, 1, '#2a0606'); f(cx - 0.5, cy - 1, 1, 2, '#2a0606'); }
    }
    al(0.5, () => { for (let k = 0; k < 90; k += 3) { const q = pt(k / 90); f(q[0] - 1.5, q[1] - rad + 1.5, 3, 0.5, '#ff9a80'); } });
    for (let i = 0; i < 4; i++) { f(x + 20 + i * 60 - 1, 0, 3, gy, '#0b0810'); f(x + 20 + i * 60 - 1, 0, 0.5, gy, '#3a2a30'); }
    al(0.35, () => { for (let k = 0; k < 6; k++) f(x + k * 50, gy - 28 + (k % 2) * 3, 40, 0.5, '#e8381e'); });
  });
})();
