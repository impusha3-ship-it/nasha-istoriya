// ===== Локации, перерисованные по фотографиям (подключается после shanghai.js) =====
(() => {
  const { r, px, disc, rnd } = A, { P, BG, ln, txt } = SCENES;
  const al = (a, f) => { const c = A.ctx; c.globalAlpha = a; f(); c.globalAlpha = 1; };
  const tri = (x, y, w, h, col) => { for (let i = 0; i < h; i++) { const ww = Math.max(1, Math.round(w * (i + 1) / h)); r(x - (ww >> 1), y + i, ww, 1, col); } };
  const arc = (cx, cy, rad, col) => { for (let a = 0; a <= 32; a++) { const t = Math.PI * a / 32; px(Math.round(cx + Math.cos(t) * rad), Math.round(cy - Math.sin(t) * rad), col); } };
  const ring = (cx, cy, rad, col) => { for (let a = 0; a < 40; a++) { const t = Math.PI * 2 * a / 40; px(Math.round(cx + Math.cos(t) * rad), Math.round(cy + Math.sin(t) * rad), col); } };

  // ---------- Владивосток: вокзал (Морской вокзал, переход, краны) ----------
  P.vokzalVl = (x, gy) => {
    // портовые краны за зданием
    const crane = (cx, col, h) => { r(cx, gy - h, 3, h - 30, col); r(cx + 10, gy - h + 8, 3, h - 38, col); ln(cx + 1, gy - h, cx + 26, gy - h - 22, col); ln(cx + 2, gy - h, cx + 27, gy - h - 22, col); ln(cx + 1, gy - h, cx - 12, gy - h + 8, col); ln(cx + 26, gy - h - 22, cx + 26, gy - h - 6, '#3a3d4a'); r(cx - 2, gy - h + 6, 16, 5, col); };
    crane(x + 150, '#e8b62a', 96); crane(x + 128, '#8a8f9c', 84); r(x + 126, gy - 46, 8, 4, '#c8323c');
    // стеклянный корпус
    r(x, gy - 72, 112, 44, '#1b2334');
    for (let i = 0; i < 112; i += 5) r(x + i, gy - 72, 1, 44, '#35425e');
    for (let j = 0; j < 44; j += 7) r(x, gy - 72 + j, 112, 1, '#35425e');
    for (let i = 0; i < 40; i++) { const xx = x + 2 + Math.floor(rnd(i + 7) * 108), yy = gy - 70 + Math.floor(rnd(i + 19) * 40); px(xx, yy, rnd(i) > 0.5 ? '#6f86a8' : '#c9a86a'); }
    r(x - 2, gy - 74, 116, 3, '#d9d6c8');
    txt(x + 6, gy - 84, 'МОРСКОЙ ВОКЗАЛ', '#c8323c', 6);
    r(x + 60, gy - 94, 1, 12, '#8a8f9c'); r(x + 61, gy - 94, 5, 3, '#f6ecd9'); r(x + 61, gy - 92, 5, 1, '#3d6bd6'); r(x + 61, gy - 91, 5, 1, '#c8323c');
    // правое крыло
    r(x + 112, gy - 58, 78, 30, '#d9d6c8'); r(x + 116, gy - 52, 70, 5, '#2a3348'); r(x + 116, gy - 42, 70, 5, '#2a3348'); r(x + 112, gy - 60, 78, 2, '#f1eee4');
    r(x + 118, gy - 66, 50, 6, '#eef0f2'); for (let i = 0; i < 50; i += 6) px(x + 120 + i, gy - 63, '#aab2bc');
    // нижний ярус и вывеска
    r(x, gy - 28, 190, 8, '#c9c6ba'); r(x + 24, gy - 27, 60, 3, '#c8323c'); r(x, gy - 20, 190, 20, '#8a8f9c');
    for (let i = 0; i < 190; i += 14) r(x + 4 + i, gy - 16, 8, 8, '#3a4358');
    // пешеходный переход с лестницами
    r(x + 96, gy - 34, 120, 4, '#b9bcc2'); for (let i = 0; i < 120; i += 4) px(x + 96 + i, gy - 37, '#e2e4e8'); r(x + 96, gy - 38, 120, 1, '#e2e4e8');
    for (const k of [130, 170, 206]) r(x + k, gy - 30, 3, 30, '#9aa0a8');
    for (let i = 0; i < 26; i++) { r(x + 122 - i * 2, gy - 32 + i, 8, 1, '#b9bcc2'); if (i % 3 === 0) px(x + 122 - i * 2, gy - 36 + i, '#e2e4e8'); }
    for (let i = 0; i < 26; i++) { r(x + 150 + i * 2, gy - 32 + i, 8, 1, '#a9adb4'); }
    // навес перрона
    r(x - 30, gy - 30, 70, 2, '#d9d6c8'); r(x - 30, gy - 28, 70, 1, '#8a8f9c'); for (const k of [-24, 0, 26]) r(x + k, gy - 28, 2, 28, '#8a8f9c');
    r(x - 30, gy - 12, 46, 12, '#6f8fb0'); for (let i = 0; i < 46; i += 4) r(x - 30 + i, gy - 12, 1, 12, '#5a7896');
  };
  // паровоз-памятник на перроне
  P.steamLoco = (x, gy) => {
    r(x - 4, gy - 3, 104, 3, '#8a8f9c'); r(x - 2, gy - 5, 100, 2, '#6a6f7c');
    const B = '#15151c', B2 = '#2a2a36', RD = '#d0312d';
    r(x + 10, gy - 22, 40, 11, B); r(x + 10, gy - 22, 40, 2, B2); r(x + 6, gy - 21, 5, 9, B2); disc(x + 8, gy - 16, 4, B); px(x + 8, gy - 16, RD); r(x + 7, gy - 17, 3, 1, RD); r(x + 8, gy - 18, 1, 3, RD);
    r(x + 14, gy - 30, 4, 8, B); r(x + 13, gy - 31, 6, 2, B2); r(x + 24, gy - 26, 6, 4, B); r(x + 36, gy - 25, 5, 3, B);
    r(x + 50, gy - 28, 14, 18, B); r(x + 49, gy - 29, 16, 2, B2); r(x + 53, gy - 25, 4, 5, '#f6ecd9'); r(x + 58, gy - 25, 4, 5, '#f6ecd9');
    r(x + 66, gy - 24, 30, 14, B); r(x + 66, gy - 24, 30, 1, B2); for (let i = 0; i < 26; i += 2) { px(x + 68 + i, gy - 18 + (i % 4 ? 0 : 1), '#f6ecd9'); px(x + 68 + i, gy - 15 + (i % 4 ? 1 : 0), '#f6ecd9'); }
    r(x + 6, gy - 11, 92, 2, RD); r(x + 2, gy - 9, 6, 5, RD); for (let i = 0; i < 5; i++) px(x + 2 + i, gy - 5 + (i % 2), '#f6ecd9');
    for (const k of [20, 30, 40, 50]) { disc(x + k, gy - 8, 4, RD); disc(x + k, gy - 8, 2, '#7a1a18'); px(x + k, gy - 8, '#f6ecd9'); }
    disc(x + 12, gy - 6, 2, RD); for (const k of [72, 80, 90]) { disc(x + k, gy - 7, 3, RD); px(x + k, gy - 7, '#f6ecd9'); }
    ln(x + 20, gy - 8, x + 50, gy - 8, '#e8e8f0');
  };

  // ---------- Театр молодёжи ----------
  P.theatreMol = (x, gy) => {
    const CR = '#f1edc8', WH = '#fbfaf0', TR = '#d6957a', BR = '#7a5230';
    r(x - 20, gy - 62, 20, 62, '#d9a8a0'); r(x - 16, gy - 50, 6, 9, '#3a4a52'); r(x - 16, gy - 30, 6, 9, '#3a4a52'); r(x + 150, gy - 66, 22, 66, '#e2c4c0'); r(x + 156, gy - 52, 6, 9, '#3a4a52'); r(x + 156, gy - 32, 6, 9, '#3a4a52');
    r(x, gy - 76, 150, 76, CR); r(x - 2, gy - 78, 154, 3, '#6a3a34');
    r(x, gy - 74, 150, 8, TR); for (let i = 0; i < 150; i += 18) r(x + 6 + i, gy - 74, 6, 8, WH);
    // центральный ризалит с фронтоном
    r(x + 48, gy - 80, 54, 80, CR); tri(x + 75, gy - 98, 62, 18, CR); for (let i = 0; i < 18; i++) { px(x + 75 - Math.round(31 * (i + 1) / 18), gy - 98 + i, '#6a3a34'); px(x + 75 + Math.round(31 * (i + 1) / 18), gy - 98 + i, '#6a3a34'); }
    r(x + 62, gy - 82, 26, 12, TR); arc(x + 75, gy - 82, 9, WH); arc(x + 75, gy - 82, 8, WH); for (let i = 0; i < 5; i++) px(x + 67 + i * 4, gy - 88 + Math.abs(i - 2), WH);
    for (const k of [50, 62, 84, 96]) { r(x + k, gy - 70, 5, 44, WH); r(x + k - 1, gy - 71, 7, 2, WH); r(x + k - 1, gy - 28, 7, 2, WH); px(x + k + 4, gy - 50, '#d9d6c0'); }
    // окна
    const win = (wx, wy, arch) => { r(wx, wy, 8, 11, BR); r(wx + 1, wy + 1, 6, 9, '#3f5058'); r(wx + 4, wy + 1, 1, 9, BR); if (arch) { arc(wx + 4, wy - 1, 5, WH); r(wx - 2, wy - 1, 12, 1, WH); } };
    for (const k of [10, 24, 38, 110, 124, 138]) win(x + k, gy - 62);
    for (const k of [56, 71, 88]) win(x + k, gy - 64);
    for (const k of [10, 38, 110, 138]) win(x + k, gy - 44); win(x + 24, gy - 44, true); win(x + 124, gy - 44, true);
    win(x + 56, gy - 46); win(x + 88, gy - 46); r(x + 70, gy - 48, 10, 20, BR); r(x + 71, gy - 47, 8, 18, '#3f5058'); r(x + 74, gy - 47, 1, 18, BR);
    r(x + 54, gy - 29, 42, 1, '#14121c'); for (let i = 0; i < 42; i += 3) r(x + 54 + i, gy - 32, 1, 3, '#14121c'); r(x + 54, gy - 33, 42, 1, '#14121c');
    // вывески
    txt(x + 3, gy - 31, 'ТЕАТР', '#2447c8', 6); txt(x + 101, gy - 31, 'МОЛОДЁЖИ', '#2447c8', 6);
    // первый этаж
    r(x + 48, gy - 24, 102, 24, '#f2a98a'); r(x, gy - 24, 48, 24, '#e9e2c0');
    r(x + 3, gy - 22, 42, 18, '#c9a46b'); r(x + 5, gy - 20, 16, 14, '#6a4a34'); disc(x + 12, gy - 14, 3, '#e8c9a5'); disc(x + 17, gy - 11, 2, '#e8c9a5'); r(x + 24, gy - 19, 18, 2, '#c8323c'); r(x + 24, gy - 15, 14, 1, '#5a3d2e'); r(x + 24, gy - 12, 16, 1, '#5a3d2e');
    for (const k of [58, 72, 86]) { r(x + k, gy - 18, 9, 18, BR); arc(x + k + 4, gy - 18, 5, '#fbfaf0'); r(x + k + 1, gy - 16, 7, 6, '#3f5058'); r(x + k + 4, gy - 18, 1, 18, '#5a3d2e'); px(x + k + 3, gy - 8, '#ffd166'); }
    r(x + 76, gy - 17, 4, 17, '#14121c');
    for (const k of [50, 98]) { r(x + k, gy - 20, 7, 20, '#2f6ad0'); r(x + k + 1, gy - 15, 5, 12, '#f6ecd9'); for (let i = 0; i < 5; i++) r(x + k + 2, gy - 14 + i * 2, 3, 1, '#c8323c'); }
    r(x + 108, gy - 22, 9, 16, '#14121c'); r(x + 119, gy - 22, 9, 16, '#3a1a1a'); r(x + 130, gy - 22, 9, 16, '#14121c'); r(x + 141, gy - 22, 8, 16, '#14121c'); for (let i = 0; i < 4; i++) r(x + 109 + i * 11, gy - 20, 6, 1, '#f6ecd9');
    for (const k of [110, 124, 138]) { r(x + k, gy - 5, 8, 2, '#5a3d2e'); px(x + k + 2, gy - 6, '#ff7aa8'); px(x + k + 5, gy - 6, '#ff7aa8'); }
  };

  // ---------- кофейня «Лима» ----------
  const sombrero = (x, y, c1, c2) => { r(x - 9, y, 18, 2, c1); r(x - 7, y - 1, 14, 1, c2); r(x - 3, y - 5, 6, 5, c1); r(x - 3, y - 3, 6, 1, c2); px(x - 9, y - 1, c1); px(x + 8, y - 1, c1); for (let i = -8; i < 9; i += 3) px(x + i, y + 1, '#f6ecd9'); };
  P.limaWall = (x, gy) => {
    // автомобильные номера вдоль стены
    for (let i = 0; i < 9; i++) { r(x + 2 + i * 11, gy - 36, 10, 5, ['#f6ecd9', '#ffd166', '#8fc3ea', '#f6ecd9', '#e8b25a'][i % 5]); r(x + 4 + i * 11, gy - 34, 6, 1, '#3a3d4a'); }
    // неон: красный профиль индейца в синем круге
    const nx = x + 132, ny = gy - 64;
    al(0.25, () => disc(nx, ny, 17, '#6f9bff')); disc(nx, ny, 13, '#2a55d8'); disc(nx, ny, 11, '#e9eef8'); for (let j = -9; j < 10; j += 3) r(nx - 10, ny + j, 21, 1, '#2a55d8'); ring(nx, ny, 13, '#9fc0ff');
    r(nx - 2, ny - 4, 8, 7, '#ff3048'); r(nx + 5, ny - 1, 3, 3, '#ff3048'); r(nx + 1, ny + 3, 4, 3, '#ff3048'); for (let i = 0; i < 6; i++) ln(nx - 2, ny - 3 + i, nx - 14 - (i % 2) * 2, ny - 6 + i * 2, '#ff3048'); al(0.2, () => disc(nx - 4, ny, 9, '#ff6a7a'));
    // маски на стене
    for (let i = 0; i < 16; i++) { const mx = x + 158 + (i % 6) * 8 + (i > 5 ? 3 : 0), my = gy - 78 + Math.floor(i / 6) * 10 + (i % 2) * 2, c = ['#5a3d2e', '#c8323c', '#3a6a8a', '#e8b25a', '#2b2a30', '#7ad6a0'][i % 6]; r(mx, my, 5, 6, c); px(mx + 1, my + 2, '#f6ecd9'); px(mx + 3, my + 2, '#f6ecd9'); px(mx - 1, my, c); px(mx + 5, my, c); }
    // деревянные стойки-кактусы с сомбреро
    const stand = (sx, h, c1, c2) => { for (let i = 0; i < h; i++) r(sx + Math.round(Math.sin(i * 0.35) * 2.5), gy - i, 3, 1, i % 6 < 3 ? '#d9b27a' : '#c9a06a'); r(sx - 5, gy - 2, 13, 2, '#c9a06a'); sombrero(sx + 1, gy - h - 1, c1, c2); };
    stand(x + 10, 52, '#1c2a2a', '#c8323c'); stand(x + 196, 50, '#f6ecd9', '#2f8a4a'); stand(x + 236, 44, '#2f8a4a', '#ffd166');
    // черепичный навес над стойкой и флажки
    for (let j = 0; j < 4; j++) for (let i = 0; i < 80; i += 5) { r(x + 204 + i - j * 2, gy - 70 + j * 4, 5, 4, (i / 5 + j) % 2 ? '#c96a4a' : '#b5583c'); px(x + 204 + i - j * 2, gy - 67 + j * 4, '#8a3e2a'); }
    for (let i = 0; i < 9; i++) { tri(x + 210 + i * 8, gy - 53, 5, 4, ['#ffd166', '#c8323c', '#2f8a4a', '#ff7aa8'][i % 4]); px(x + 206 + i * 8, gy - 54 + (i % 2), '#ffe9a8'); }
    r(x + 198, gy - 54, 84, 1, '#5a3d2e');
    // зелёный экран-джунгли и кактусы
    r(x + 176, gy - 52, 18, 12, '#2f5a3f'); r(x + 178, gy - 50, 14, 8, '#5aa06a'); r(x + 182, gy - 49, 3, 6, '#3f7a55');
    for (const k of [222, 228]) { r(x + k, gy - 40, 3, 26, '#2f8a4a'); r(x + k - 3, gy - 32, 3, 2, '#2f8a4a'); r(x + k - 3, gy - 36, 2, 5, '#2f8a4a'); }
  };
  P.limaSofa = (x, gy, p) => { const c = p.col || '#e8703a'; r(x, gy - 18, 38, 12, c); r(x, gy - 8, 38, 6, '#d95f2c'); r(x + 2, gy - 9, 34, 2, '#3a5a8a'); r(x + 2, gy - 2, 2, 2, '#5a3d2e'); r(x + 34, gy - 2, 2, 2, '#5a3d2e'); for (let i = 6; i < 38; i += 8) px(x + i, gy - 13, '#d95f2c'); };
  P.armchair = (x, gy, p) => { const c = p.col || '#f2c62a', d = p.c2 || '#d9a81a'; r(x, gy - 16, 12, 10, c); r(x, gy - 8, 13, 5, d); r(x + (p.flip ? 0 : 11), gy - 12, 2, 8, d); r(x + 1, gy - 3, 1, 3, '#5a3d2e'); r(x + 11, gy - 3, 1, 3, '#5a3d2e'); if (p.pat) for (let i = 0; i < 8; i++) px(x + 2 + (i * 5) % 9, gy - 15 + (i * 3) % 7, ['#3d6bd6', '#ff7aa8', '#f6ecd9'][i % 3]); };
  P.roundTable = (x, gy, p) => { r(x, gy - 13, p.w || 20, 2, '#e2b46a'); r(x + 1, gy - 11, (p.w || 20) - 2, 1, '#b98a4a'); r(x + ((p.w || 20) >> 1) - 1, gy - 10, 2, 9, '#9aa0a8'); r(x + ((p.w || 20) >> 1) - 4, gy - 1, 8, 1, '#8a8f9c'); r(x + 3, gy - 17, 5, 4, '#f6ecd9'); r(x + 4, gy - 16, 3, 1, '#6fb7ff'); };

  // ---------- Институт биологии моря на берегу и рыбаки на льду ----------
  P.ibm = (x, gy) => {
    const BRK = '#a4482f', BR2 = '#8a3a26';
    r(x - 6, gy - 12, 104, 12, '#d9d6c8'); r(x, gy - 30, 22, 24, BRK); r(x + 70, gy - 28, 24, 22, BRK);
    r(x + 18, gy - 34, 56, 28, BRK); for (let i = 0; i < 56; i++) { const k = Math.abs(i - 28) / 28; if (k > 0.75) r(x + 18 + i, gy - 34, 1, Math.round((k - 0.75) * 12), '#00000000'); }
    r(x + 22, gy - 36, 48, 3, BR2); r(x + 28, gy - 38, 36, 2, '#6a6f7c');
    for (let j = 0; j < 4; j++) for (let i = 0; i < 24; i++) { const xx = x + 2 + i * 4; if (xx > x + 92) break; px(xx, gy - 28 + j * 5, '#f1eee4'); px(xx, gy - 27 + j * 5, '#3a4358'); }
    r(x + 62, gy - 26, 8, 20, '#8fc3d8'); for (let j = 0; j < 20; j += 3) r(x + 62, gy - 26 + j, 8, 1, '#f1eee4');
    r(x + 14, gy - 10, 40, 4, '#f1eee4'); for (let i = 0; i < 9; i++) { r(x - 4 + i * 12, gy - 14, 1, 8, '#3a2a22'); disc(x - 4 + i * 12, gy - 16, 2, '#4a3a34'); }
  };
  P.iceFishers = (x, gy, p) => {
    const n = p.n || 26;
    al(0.5, () => { for (let k = 0; k < 4; k++) for (let i = 0; i < 150; i++) px(x + i * 2, gy - 6 - Math.round(Math.sin(i * 0.05 + k * 1.7) * 3 + k * 2.5), '#c4d2de'); });
    for (let i = 0; i < n; i++) { const xx = x + Math.floor(rnd(i + 3) * (p.w || 300)), yy = gy - 4 - Math.floor(rnd(i + 31) * 12); r(xx, yy, 1, 2, '#2b2a30'); if (i % 3 === 0) r(xx + 2, yy, 3, 2, i % 2 ? '#3d6bd6' : '#c8323c'); }
  };

  // ---------- спальни и гостиные ----------
  P.bedWood = (x, gy, p) => {
    const w = p.w || 64, fr = p.frame || '#e2cfa8', pl = p.plaid || '#b99a86';
    r(x, gy - 30, 4, 30, fr); r(x + 1, gy - 28, 2, 20, '#d2bd94'); r(x + 4, gy - 9, w, 9, fr); r(x + 4, gy - 3, w, 1, '#c9b48a');
    r(x + 4, gy - 15, w, 6, '#e9e6e0'); r(x + 5, gy - 21, 11, 7, '#c9c6c2'); r(x + 13, gy - 22, 11, 8, p.pillow || '#f1eee4');
    if (p.zig !== false) for (let i = 0; i < 10; i++) { px(x + 14 + i, gy - 20 + (i % 4 < 2 ? i % 2 : 1 - i % 2), '#8a7a6a'); px(x + 14 + i, gy - 17 + (i % 4 < 2 ? i % 2 : 1 - i % 2), '#8a7a6a'); }
    r(x + 24, gy - 17, w - 20, 9, pl); r(x + 24, gy - 17, w - 20, 1, p.plaid2 || '#c9ae9a'); r(x + w + 1, gy - 15, 3, 9, pl);
    if (p.stripes) for (let i = 0; i < w - 20; i += 4) r(x + 24 + i, gy - 16, 2, 8, p.stripes);
    if (p.cushion) r(x + 20, gy - 20, 8, 5, p.cushion);
  };
  P.triptych = (x, gy) => { for (let i = 0; i < 3; i++) { const xx = x + i * 15, yy = gy - 78 - i * 1; r(xx, yy, 13, 20 - i, '#d9cdb8'); r(xx + 1, yy + 1, 11, 18 - i, ['#8a7a66', '#e9e2d4', '#6a5a48'][i]); for (let k = 0; k < 5; k++) ln(xx + 2 + k * 2, yy + 16 - i, xx + 4 + k * 2, yy + 3, ['#d9c9a8', '#c9b9a0', '#c9b48a'][i]); } };
  P.curtainWin = (x, gy, p) => {
    r(x - 14, gy - 86, 78, 3, '#d9cdb8'); r(x, gy - 80, 50, 46, '#f1eee4'); r(x + 2, gy - 78, 46, 42, p.night === false ? '#bfe0f2' : '#141a30'); r(x + 24, gy - 78, 2, 42, '#f1eee4');
    if (p.night !== false) { px(x + 10, gy - 66, '#ffd98a'); px(x + 34, gy - 58, '#ffd98a'); px(x + 38, gy - 70, '#9fc4ff'); r(x + 30, gy - 52, 6, 4, '#2a3350'); }
    for (const k of [-14, 46]) { r(x + k, gy - 84, 18, 80, p.col || '#c2a58a'); for (let i = 3; i < 18; i += 5) r(x + k + i, gy - 84, 1, 80, p.c2 || '#a98c72'); }
    r(x + 2, gy - 32, 46, 3, '#f6f2ea'); r(x + 4, gy - 28, 42, 22, '#efe9dc'); for (let j = 0; j < 20; j += 3) for (let i = (j % 2) * 2; i < 40; i += 4) px(x + 6 + i, gy - 26 + j, '#c9bfa8');
  };
  // мансарда в Калининграде: скошенный потолок с окном, торшеры, ковёр
  P.slopeCeil = (x, gy, p) => {
    const w = p.w || 150, h = p.h || 74;
    for (let i = 0; i < w; i++) { const hh = Math.round(h * (i / w)); r(x + i, gy - 104, 1, hh, '#f4f1ea'); px(x + i, gy - 104 + hh, '#c9c4b8'); }
    for (let i = 0; i < 46; i++) { const xx = Math.round(x + w * 0.42 + i), yy = gy - 104 + Math.round(h * ((w * 0.42 + i) / w)) - 9; r(xx, yy, 1, 7, '#2f55d8'); px(xx, yy, '#6f8fe8'); }
  };
  P.floorlamp = (x, gy, p) => { r(x, gy - 44, 1, 44, '#8a8f9c'); r(x - 3, gy - 1, 7, 1, '#8a8f9c'); tri(x, gy - 50, 11, 5, '#f6f2ea'); r(x - 5, gy - 51, 11, 1, '#fffbe8'); ln(x, gy - 30, x + (p.flip ? -5 : 5), gy - 34, '#8a8f9c'); r(x + (p.flip ? -7 : 4), gy - 37, 3, 3, '#f6f2ea'); if (p.on) al(0.18, () => disc(x, gy - 54, 14, '#fff3c4')); };
  P.carpet = (x, gy, p) => { const w = p.w || 80; r(x, gy + 3, w, 14, '#c9892a'); r(x + 2, gy + 5, w - 4, 10, '#e2b25a'); for (let i = 0; i < w - 8; i += 6) { px(x + 5 + i, gy + 7, '#7a3a1a'); px(x + 7 + i, gy + 10, '#f6ecd9'); px(x + 5 + i, gy + 13, '#7a3a1a'); px(x + 8 + i, gy + 7, '#f6ecd9'); } r(x + (w >> 1) - 8, gy + 8, 16, 4, '#7a3a1a'); r(x + (w >> 1) - 5, gy + 9, 10, 2, '#e2b25a'); };
  P.dresser = (x, gy) => { r(x, gy - 30, 26, 30, '#d9a85a'); for (let j = 0; j < 4; j++) { r(x + 1, gy - 28 + j * 7, 24, 6, '#e2b46a'); px(x + 8, gy - 25 + j * 7, '#8a8f9c'); px(x + 17, gy - 25 + j * 7, '#8a8f9c'); } r(x + 3, gy - 35, 16, 5, '#e9e6e0'); r(x + 3, gy - 33, 16, 1, '#3a3d4a'); };
  P.keys = (x, gy) => { r(x, gy - 24, 34, 4, '#2b2a30'); r(x + 1, gy - 23, 32, 2, '#f6f2ea'); for (let i = 0; i < 30; i += 3) px(x + 3 + i, gy - 23, '#14121c'); ln(x + 6, gy - 20, x + 26, gy, '#2b2a30'); ln(x + 28, gy - 20, x + 8, gy, '#2b2a30'); };
  P.railing = (x, gy, p) => { const w = p.w || 40; r(x, gy - 20, w, 2, '#e2cfa8'); r(x, gy - 4, w, 2, '#e2cfa8'); for (let i = 2; i < w; i += 6) r(x + i, gy - 18, 2, 14, '#d9c398'); };
  // серая кухня хозяев дома, где встречали собаки
  P.greyKitchen = (x, gy) => {
    r(x, gy - 84, 44, 84, '#8f959e'); r(x + 21, gy - 84, 1, 84, '#6a6f7c'); r(x, gy - 44, 44, 1, '#6a6f7c'); r(x + 18, gy - 60, 1, 10, '#c9ccd2'); r(x + 24, gy - 60, 1, 10, '#c9ccd2');
    r(x + 46, gy - 84, 110, 22, '#3a3d44'); r(x + 46, gy - 62, 110, 2, '#ffd98a'); al(0.25, () => r(x + 46, gy - 60, 110, 20, '#ffd98a')); r(x + 46, gy - 60, 110, 26, '#c9a47a'); for (let i = 0; i < 110; i += 14) r(x + 46 + i, gy - 60, 1, 26, '#b9946a');
    r(x + 46, gy - 34, 110, 3, '#d9b98a'); r(x + 46, gy - 31, 110, 31, '#4a4d55'); for (let i = 0; i < 110; i += 22) { r(x + 46 + i, gy - 31, 1, 31, '#3a3d44'); r(x + 52 + i, gy - 27, 9, 1, '#14121c'); }
    r(x + 52, gy - 48, 12, 14, '#c9ccd2'); r(x + 54, gy - 46, 8, 5, '#14121c'); r(x + 56, gy - 38, 4, 3, '#14121c'); r(x + 68, gy - 42, 9, 8, '#e2e4e8');
    r(x + 130, gy - 50, 2, 16, '#2b2a30'); r(x + 126, gy - 50, 6, 2, '#2b2a30'); r(x + 142, gy - 40, 4, 6, '#c9772a');
  };
  P.dog2 = (x, gy, p) => {
    const c = p.col || '#14121c', s = p.s || 1, f = p.flip ? -1 : 1, R2 = (a, b, w, h, col) => r(Math.round(x + (f > 0 ? a : -a - w) * s), Math.round(gy + b * s), Math.max(1, Math.round(w * s)), Math.max(1, Math.round(h * s)), col);
    const wag = Math.sin((p.t || 0) * 9 + x) > 0 ? 0 : 1;
    R2(-7, -11, 14, 6, c); R2(-7, -5, 2, 5, c); R2(-3, -5, 2, 5, c); R2(3, -5, 2, 5, c); R2(6, -5, 2, 5, c);
    R2(6, -15, 6, 6, c); R2(11, -12, 3, 3, p.muzzle || c); R2(7, -17, 2, 3, p.ear || c); R2(9, -13, 1, 1, '#f6ecd9'); R2(13, -12, 1, 1, '#14121c');
    R2(-9, -13 - wag, 2, 4, p.tail || c);
    if (p.fluffy) { R2(-8, -12, 4, 8, p.tail || c); R2(-10, -15 - wag, 4, 5, p.tail || c); R2(0, -6, 6, 2, p.belly || c); }
    if (p.beard) { R2(11, -10, 3, 4, c); R2(8, -17, 4, 2, c); R2(-7, -5, 3, 5, c); R2(5, -5, 3, 5, c); }
    if (p.collar) R2(6, -10, 2, 2, p.collar);
  };

  // ---------- квартира Кати ----------
  P.katyaKitchen = (x, gy) => {
    const CRM = '#f1ecdf', CR2 = '#ddd5c2', GR = '#bfb7a6';
    r(x, gy - 92, 26, 30, CRM); r(x + 12, gy - 92, 1, 30, CR2); r(x + 28, gy - 92, 30, 92, CRM); r(x + 43, gy - 92, 1, 30, CR2);
    r(x + 31, gy - 60, 24, 20, '#2b2a30'); r(x + 33, gy - 57, 20, 13, '#14121c'); r(x + 33, gy - 59, 20, 1, '#8a8f9c'); r(x + 49, gy - 56, 3, 9, '#f29aa6');
    r(x + 31, gy - 38, 24, 12, '#3a3d44'); r(x + 33, gy - 36, 15, 8, '#14121c'); r(x + 28, gy - 24, 30, 24, GR); px(x + 42, gy - 20, '#d9b860');
    r(x, gy - 60, 28, 22, '#e9e4dc'); for (let i = 0; i < 6; i++) ln(x + 2 + i * 4, gy - 58, x + 6 + i * 4, gy - 42, '#c9c4bc');
    r(x, gy - 34, 28, 3, '#f6f4ee'); r(x, gy - 31, 28, 31, GR); r(x + 14, gy - 31, 1, 31, '#a9a190'); r(x + 4, gy - 27, 6, 1, '#d9b860'); r(x + 18, gy - 27, 6, 1, '#d9b860'); r(x + 4, gy - 14, 6, 1, '#d9b860'); r(x + 18, gy - 14, 6, 1, '#d9b860');
    r(x + 8, gy - 42, 1, 8, '#f6f4ee'); r(x + 8, gy - 42, 5, 1, '#f6f4ee'); r(x + 16, gy - 37, 9, 3, '#6a4a3a');
    // бутыли с водой
    for (const k of [62, 70]) { r(x + k, gy - 16, 7, 16, '#9fc8f0'); r(x + k + 2, gy - 19, 3, 3, '#6f9bd0'); px(x + k + 1, gy - 12, '#e2f1f6'); }
  };
  P.greenSofa = (x, gy) => {
    const G = '#1f5a48', G2 = '#174536';
    // плакаты с квизов на спинке
    const post = [['#b53ad0', 8], ['#2f8a4a', 6], ['#2447c8', 9], ['#2447c8', 9], ['#3a3d4a', 7], ['#2f8a4a', 9], ['#8a2ad0', 9]];
    let px0 = x + 6; post.forEach((pp, i) => { const h = 9 + (i * 5) % 5; r(px0, gy - 27 - h, pp[1], h, pp[0]); r(px0 + 1, gy - 25 - h, pp[1] - 2, 1, '#f6ecd9'); r(px0 + 1, gy - 22 - h, pp[1] - 3, 1, '#ffd166'); px0 += pp[1] + 1; });
    r(x, gy - 27, 70, 14, G); r(x + 34, gy - 27, 1, 14, G2); for (let i = 5; i < 70; i += 6) r(x + i, gy - 25, 1, 10, G2);
    r(x - 3, gy - 20, 5, 18, G); r(x + 68, gy - 20, 5, 18, G); r(x, gy - 13, 70, 8, '#236a55'); r(x, gy - 5, 70, 3, G2); r(x + 2, gy - 2, 2, 2, '#14121c'); r(x + 66, gy - 2, 2, 2, '#14121c');
    r(x + 40, gy - 17, 14, 5, '#f6ecd9'); r(x + 42, gy - 16, 8, 1, '#c8323c'); r(x + 56, gy - 18, 9, 6, '#a98c86');
  };
  P.doorway = (x, gy, p) => { r(x, gy - 84, 26, 84, p.col || '#2a2630'); r(x - 1, gy - 85, 28, 1, '#d9d6cc'); r(x - 1, gy - 85, 1, 85, '#d9d6cc'); r(x + 26, gy - 85, 1, 85, '#d9d6cc'); r(x + 12, gy - 40, 10, 40, '#f1eee4'); };

  // ---------- nodcafe: растения, неон, плед ----------
  P.ficus = (x, gy, p) => {
    const h = p.h || 70; r(x - 6, gy - 16, 13, 16, p.pot || '#b8323c'); r(x - 7, gy - 17, 15, 3, p.pot2 || '#8a1f2a');
    ln(x, gy - 16, x - 2, gy - h, '#7a5a40'); ln(x + 1, gy - 16, x - 1, gy - h, '#9a7a58'); ln(x - 1, gy - h * 0.55, x + 12, gy - h * 0.85, '#7a5a40');
    for (let i = 0; i < 16; i++) { const a = rnd(i + (x | 0)) * 6.28, d = 6 + rnd(i + 9) * 14, lx = x - 2 + Math.cos(a) * d, ly = gy - h + 4 + Math.sin(a) * d * 0.8 - 4; r(Math.round(lx), Math.round(ly), 6, 4, i % 3 ? '#2f6a48' : '#4a8a5a'); r(Math.round(lx) + 1, Math.round(ly) + 1, 4, 1, '#6aa878'); if (i % 5 === 0) r(Math.round(lx), Math.round(ly), 6, 4, '#8a4a3a'); }
  };
  P.nodNeon = (x, gy, p) => { const y = gy - (p.y || 74); al(0.22, () => r(x - 4, y - 4, 30, 26, '#6fb7ff')); r(x, y, 22, 18, '#1a4ad0'); r(x + 1, y + 1, 20, 16, '#2a66e8'); const c = '#e9f4ff'; for (let i = 0; i < 16; i += 2) px(x + 3 + i, y + 4 + (i % 4 ? 0 : 1), c); for (let i = 0; i < 10; i += 2) px(x + 6 + i, y + 8 + (i % 4 ? 1 : 0), c); for (let i = 0; i < 14; i += 2) px(x + 4 + i, y + 13 - (i % 4 ? 0 : 1), c); };
  P.haring = (x, gy) => { r(x, gy - 26, 30, 20, '#e9dfc8'); const fig = (fx, fy, c) => { r(fx, fy, 2, 2, c); r(fx - 1, fy + 2, 4, 4, c); px(fx - 2, fy + 2, c); px(fx + 3, fy + 3, c); px(fx - 1, fy + 6, c); px(fx + 2, fy + 7, c); }; fig(x + 5, gy - 24, '#6fb7d8'); fig(x + 14, gy - 22, '#7a5ad0'); fig(x + 23, gy - 24, '#6fb7d8'); disc(x + 14, gy - 12, 2, '#e8a04a'); for (let i = 0; i < 30; i += 2) px(x + i, gy - 5, i % 4 ? '#c8323c' : '#3d6bd6'); r(x + 2, gy - 6, 2, 6, '#8a6242'); r(x + 26, gy - 6, 2, 6, '#8a6242'); };
  P.wallArt = (x, gy, p) => { const y = gy - (p.y || 84), w = p.w || 34, h = p.h || 30; r(x, y, w, h, p.col || '#e8872a'); for (let i = 0; i < 12; i++) r(x + 2 + Math.floor(rnd(i + x) * (w - 8)), y + 2 + Math.floor(rnd(i + 5 + x) * (h - 8)), 3 + (i % 3) * 2, 3 + (i % 2) * 3, ['#c8323c', '#ffd166', '#2b2a30', '#3d6bd6', '#f6ecd9'][i % 5]); };

  // ---------- Калининград: аэропорт Храброво ----------
  P.khrabrovo = (x, gy) => {
    const GL = '#7fa8c0', GL2 = '#a8c8d8';
    // купол
    for (let i = -22; i <= 22; i++) { const hh = Math.round(Math.sqrt(484 - i * i) * 0.6); r(x + 78 + i, gy - 58 - hh, 1, hh, i % 4 ? '#8fb4c8' : '#e2eef4'); } arc(x + 78, gy - 58, 22 * 0.6, '#e2eef4');
    // стеклянный фасад с наклоном
    for (let i = 0; i < 230; i++) { const top = gy - 58 + Math.round(i * 0.02); r(x + i, top, 1, 36, i % 9 === 0 ? '#e2eef4' : (i % 18 < 9 ? GL : '#739bb4')); }
    for (let j = 0; j < 34; j += 8) r(x, gy - 54 + j, 230, 1, '#e2eef4');
    for (let i = 0; i < 30; i++) px(x + 6 + Math.floor(rnd(i + 2) * 220), gy - 52 + Math.floor(rnd(i + 8) * 26), GL2);
    r(x - 2, gy - 60, 234, 3, '#d9dee4');
    // буквы и логотип на крыше
    txt(x + 96, gy - 72, 'ХРАБРОВО', '#1f5fd0', 6); disc(x + 158, gy - 67, 5, '#e0312d'); ln(x + 148, gy - 70, x + 168, gy - 64, '#1f5fd0'); ln(x + 148, gy - 69, x + 168, gy - 63, '#1f5fd0'); ln(x + 156, gy - 72, x + 166, gy - 68, '#1f5fd0'); txt(x + 172, gy - 72, 'KGD', '#1f5fd0', 6);
    r(x + 60, gy - 84, 1, 24, '#8a8f9c'); r(x + 61, gy - 84, 6, 2, '#f6ecd9'); r(x + 61, gy - 82, 6, 1, '#3d6bd6'); r(x + 61, gy - 81, 6, 1, '#c8323c');
    // шевроны и надписи на стекле
    for (const k of [96, 118, 140]) for (let i = 0; i < 5; i++) { px(x + k + 4 - i, gy - 44 + i, '#f6ecd9'); px(x + k + 4 - i, gy - 36 - i + 4, '#f6ecd9'); px(x + k + 5 - i, gy - 44 + i, '#f6ecd9'); px(x + k + 5 - i, gy - 36 - i + 4, '#f6ecd9'); }
    txt(x + 156, gy - 46, 'ПРИЛЁТ', '#f6ecd9', 5); txt(x + 196, gy - 46, 'ВЫЛЕТ', '#f6ecd9', 5);
    // серый входной блок
    r(x + 24, gy - 30, 62, 30, '#8a9098'); r(x + 24, gy - 31, 62, 2, '#a9afb6'); txt(x + 30, gy - 27, 'ВХОД', '#2f7ad8', 5); r(x + 32, gy - 18, 16, 18, '#2a3348'); r(x + 40, gy - 18, 1, 18, '#8a9098'); r(x + 62, gy - 18, 16, 18, '#2a3348'); r(x + 70, gy - 18, 1, 18, '#8a9098');
    r(x + 86, gy - 22, 144, 22, '#6f97b0'); for (let i = 0; i < 144; i += 9) r(x + 86 + i, gy - 22, 1, 22, '#e2eef4'); for (let i = 0; i < 12; i++) { r(x + 92 + i * 11, gy - 5, 4, 3, '#f1eee4'); disc(x + 94 + i * 11, gy - 7, 2, '#3f7a55'); }
  };
  P.thuja = (x, gy, p) => { const h = p.h || 30; for (let i = 0; i < h; i++) { const w = Math.max(2, Math.round(11 * Math.sin(Math.PI * (i + 3) / (h + 6)))); r(x - (w >> 1), gy - h + i, w, 1, i % 3 ? '#2f6a3f' : '#3f8050'); px(x - (w >> 1) + (i * 3) % Math.max(1, w), gy - h + i, '#1f4a2c'); } };
  P.arcBench = (x, gy, p) => { const w = p.w || 46; r(x, gy - 7, w, 3, '#6a3a2a'); r(x, gy - 8, w, 1, '#8a5238'); for (let i = 2; i < w; i += 8) r(x + i, gy - 4, 2, 4, '#3a3d44'); };

  // ---------- Москва: вид на Останкинскую башню ----------
  P.ostankino = (x, gy, p) => {
    const h = p.h || 100, top = gy - h;
    for (let i = 0; i < h * 0.62; i++) { const w = Math.max(1.2, 6 - i * 0.075); r(Math.round(x - w / 2), gy - 14 - i, Math.round(w), 1, i % 9 < 2 ? '#c9ccd2' : '#e2e4e8'); }
    for (let i = 0; i < 14; i++) { const w = 6 + (14 - i) * 1.3; r(Math.round(x - w / 2), gy - 14 + i, Math.round(w), 1, '#d9dce2'); if (i > 3) r(x - 2, gy - 14 + i, 4, 1, '#8fa0b0'); }
    r(x - 4, top + h * 0.30, 8, 5, '#6a6f7c'); r(x - 5, top + h * 0.33, 10, 2, '#3a3d4a'); r(x - 3, top + h * 0.40, 6, 3, '#c8323c'); r(x - 3, top + h * 0.44, 6, 3, '#3d6bd6');
    r(x - 1, top, 2, Math.round(h * 0.34), '#c9ccd2'); for (let i = 0; i < 5; i++) r(x - 1, top + 4 + i * 6, 2, 2, '#c8323c'); if (Math.sin((p.t || 0) * 3) > 0) px(x, top - 1, '#ff5a5a');
  };
  P.msuBlock = (x, gy, p) => { const w = p.w || 60, h = p.h || 40; r(x, gy - h, w, h, p.col || '#c9ccd2'); for (let i = 0; i < w; i += 3) r(x + i, gy - h + 2, 2, h * 0.5, ['#c8323c', '#f6ecd9', '#3d6bd6', '#2f8a4a', '#ffd166', '#f6ecd9'][(i / 3) % 6 | 0]); for (let j = 0; j < h * 0.4; j += 4) for (let i = 2; i < w; i += 5) px(x + i, gy - h * 0.42 + j, '#3a4358'); };

  // ---------- Шанхай: оранжерея ----------
  BG.greenhouse = e => {
    const W = e.W, H = e.H, GY = e.GY, cam = e.cam, t = e.t;
    A.sky(W, H, ['#bfe4f6', '#d6effa', '#eaf7fc', '#f6fbfd'], GY);
    // стеклянная стена и купол из колец
    for (let x = -(cam * 0.3 % 14); x < W; x += 14) r(Math.round(x), 0, 1, GY, '#ffffff');
    for (let y = 46; y < GY; y += 16) al(0.6, () => r(0, y, W, 1, '#ffffff'));
    const o = cam * 0.45;
    for (let i = -1; i < 9; i++) for (let j = 0; j < 3; j++) { const cx = Math.round(i * 44 + (j % 2) * 22 - (o % 44)), cy = 10 + j * 19, rad = 15 - j * 3; ring(cx, cy, rad, '#ffffff'); ring(cx, cy, rad + 1, '#eef6f8'); ring(cx, cy, rad - 4, '#dfeef2'); px(cx, cy, '#ffffff'); }
    for (let i = 0; i < 6; i++) { const x0 = Math.round(i * 70 - (o % 70)); ln(x0, 0, x0 + 30, 58, '#ffffff'); r(x0 + 18, 30, 3, 9, '#6aa06a'); r(x0 + 19, 39, 1, 5, '#4a8a5a'); }
    // скала с зеленью и смотровой мостик
    const hx = Math.round(250 - cam * 0.7);
    for (let i = 0; i < 120; i++) { const hh = Math.round(64 * Math.sin(Math.PI * i / 120) + rnd(i) * 5); r(hx + i, GY - hh, 1, hh, i % 7 < 3 ? '#6a7a70' : '#7a8a7e'); r(hx + i, GY - hh, 1, 6 + (rnd(i + 5) * 20 | 0), i % 3 ? '#2f6a3f' : '#4a8a55'); }
    for (let i = 0; i < 8; i++) r(hx + 14 + i * 12, GY - 50 + (i * 7) % 20, 2, 9, '#5a9a66');
    r(hx - 46, GY - 44, 84, 3, '#c9d2d6'); for (let i = 0; i < 84; i += 4) px(hx - 46 + i, GY - 47, '#e9f0f2'); r(hx - 46, GY - 48, 84, 1, '#e9f0f2'); arc(hx - 4, GY - 41, 30, '#aab6ba'); r(hx - 6, GY - 41, 3, 41, '#aab6ba');
    // деревья и пальмы
    const palm = (x, h) => { r(x, GY - h, 2, h, '#7a6a50'); for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.55; ln(x + 1, GY - h, x + 1 + Math.cos(a) * 15, GY - h + Math.sin(a) * 9 - 3, k % 2 ? '#2f7a48' : '#3f9058'); ln(x + 1, GY - h + 1, x + 1 + Math.cos(a) * 14, GY - h + Math.sin(a) * 9 - 1, '#2f6a3f'); } };
    const tree = (x, h, c1, c2) => { r(x, GY - h, 2, h, '#6a5238'); for (let k = 0; k < 7; k++) disc(x + 1 + Math.round(Math.cos(k * 1.9) * 9), GY - h - 2 + Math.round(Math.sin(k * 2.3) * 7), 6, k % 2 ? c1 : c2); };
    for (let i = -1; i < 7; i++) { const bx = Math.round(i * 96 - cam * 0.85 % 96 - (Math.floor(cam * 0.85 / 96) * 0)); }
    const base = cam * 0.85; for (let i = Math.floor(base / 96) - 1; i < Math.floor(base / 96) + 5; i++) { const bx = Math.round(i * 96 - base); if (((i % 3) + 3) % 3 === 0) palm(bx + 20, 62); else tree(bx + 30, 44 + ((i * 7) % 3 + 3) % 3 * 8, '#2f6a3f', '#4a8a55'); for (let k = 0; k < 5; k++) disc(bx + 56 + k * 8, GY - 4 - (k % 2) * 3, 6, k % 2 ? '#3f8050' : '#2f6a3f'); r(bx + 70, GY - 9, 2, 2, '#ff7a5a'); r(bx + 8, GY - 6, 2, 2, '#f6ecd9'); }
    // туман
    for (let i = 0; i < 9; i++) { const mx = ((i * 67 - cam * 0.9 + t * (4 + i % 3)) % (W + 80) + W + 80) % (W + 80) - 40, my = GY - 18 - (i * 13) % 34; al(0.16 + (i % 3) * 0.06, () => { disc(Math.round(mx), my, 12, '#ffffff'); disc(Math.round(mx) + 12, my + 3, 9, '#ffffff'); disc(Math.round(mx) - 10, my + 4, 8, '#ffffff'); }); }
    // дорожка и вода за стеклом
    r(0, GY, W, H - GY, '#9aa39c'); r(0, GY, W, 1, '#c4ccc6'); for (let i = Math.floor(cam / 40) - 1; i < Math.floor(cam / 40) + 9; i++) { const sx = i * 40 - cam; r(sx + 10, GY + 8, 12, 4, '#cfe9ee'); r(sx + 11, GY + 9, 10, 2, '#e9f6f8'); }
  };

  // ---------- Шанхай: сад с павильоном ----------
  BG.yuGarden = e => {
    const W = e.W, H = e.H, GY = e.GY, cam = e.cam, t = e.t;
    A.sky(W, H, ['#8f98a8', '#a9b2be', '#c9d0d6', '#e2e6e8'], 100);
    for (let i = 0; i < 5; i++) { const cx = ((i * 80 - cam * 0.05 + t) % (W + 100) + W + 100) % (W + 100) - 50; al(0.8, () => { disc(Math.round(cx), 22 + (i * 11) % 24, 12, '#eef1f3'); disc(Math.round(cx) + 14, 26 + (i * 11) % 24, 9, '#dfe4e8'); disc(Math.round(cx) - 12, 27 + (i * 11) % 24, 8, '#c9d0d6'); }); }
    // стеклянная башня вдали
    const tx = Math.round(40 - cam * 0.15); r(tx, 40, 22, 60, '#9fb0c4'); for (let j = 0; j < 60; j += 3) r(tx, 40 + j, 22, 1, '#b9c8d8');
    // деревья-фон
    for (let x = -20 - (cam * 0.35 % 17); x < W + 20; x += 17) { const k = Math.floor((x + cam * 0.35) / 17); disc(Math.round(x), 74 - ((rnd(k) * 16) | 0), 13, k % 2 ? '#3f7a45' : '#2f6a3a'); disc(Math.round(x) + 6, 84, 11, '#4a8a50'); }
    // двухъярусный павильон с загнутыми крышами
    const pav = (px0, s) => {
      const roof = (cx, y, hw, c) => { for (let i = 0; i < 9; i++) { const w = hw - i * (hw * 0.07), up = i < 3 ? (3 - i) : 0; r(Math.round(cx - w), y - i * 1 + 0, Math.round(w * 2), 1, i % 2 ? c : '#3a3540'); } for (let k = 0; k < 6; k++) { px(Math.round(cx - hw - k), y - k, '#2b2730'); px(Math.round(cx + hw + k - 1), y - k, '#2b2730'); px(Math.round(cx - hw - k), y - k + 1, '#2b2730'); px(Math.round(cx + hw + k - 1), y - k + 1, '#2b2730'); } for (let i = Math.round(cx - hw); i < cx + hw; i += 2) px(i, y + 1, '#1c1a20'); };
      const cx = px0 + 60;
      r(cx - 44, GY - 34, 88, 34, '#4a2e2a'); for (let i = 0; i < 88; i += 11) r(cx - 44 + i, GY - 34, 2, 34, '#3a201c'); r(cx - 42, GY - 30, 84, 14, '#8fa8a0'); for (let i = 0; i < 84; i += 4) r(cx - 42 + i, GY - 30, 1, 14, '#4a2e2a'); r(cx - 44, GY - 14, 88, 2, '#6a3a30'); for (let i = 0; i < 88; i += 5) r(cx - 44 + i, GY - 12, 3, 5, '#7a4a3a'); r(cx - 46, GY - 7, 92, 7, '#9a9a94');
      roof(cx, GY - 36, 52, '#4a4650');
      r(cx - 32, GY - 62, 64, 20, '#4a2e2a'); r(cx - 30, GY - 58, 60, 10, '#8a9a90'); for (let i = 0; i < 60; i += 4) r(cx - 30 + i, GY - 58, 1, 10, '#4a2e2a'); r(cx - 32, GY - 47, 64, 2, '#8a4a3a');
      roof(cx, GY - 64, 40, '#4a4650'); r(cx - 8, GY - 78, 16, 6, '#3a3540'); px(cx - 9, GY - 79, '#2b2730'); px(cx + 8, GY - 79, '#2b2730'); r(cx - 1, GY - 82, 2, 4, '#2b2730');
    };
    pav(Math.round(150 - cam * 0.7));
    // розовое дерево, ива
    const wx = Math.round(330 - cam * 0.7); r(wx, GY - 60, 3, 60, '#5a4a38'); for (let k = 0; k < 12; k++) for (let j = 0; j < 30; j += 2) px(wx - 22 + k * 4 + Math.round(Math.sin(t * 1.2 + k + j * 0.1) * 1.2), GY - 62 + j + (k % 3) * 3, k % 2 ? '#6aa860' : '#8ac878');
    const cx2 = Math.round(60 - cam * 0.7); r(cx2, GY - 30, 2, 30, '#4a3a30'); for (let k = 0; k < 8; k++) disc(cx2 + Math.round(Math.cos(k * 2.1) * 9), GY - 34 + Math.round(Math.sin(k * 1.7) * 6), 5, k % 3 ? '#4a8a50' : '#f29ab8');
    // пруд и каменный мостик-ограда
    r(0, GY, W, H - GY, '#3f5a4c'); for (let i = 0; i < 30; i++) { const y = GY + 6 + (i * 5) % 18, x = ((i * 47 - cam + Math.sin(t + i) * 3) % W + W) % W; al(0.4, () => r(Math.round(x), y, 6 + i % 5, 1, '#a8c8b0')); }
    r(0, GY, W, 5, '#b9b4a8'); r(0, GY + 5, W, 1, '#8a857a');
  };
  BG.yuGarden.fgRail = true;
  P.stoneRail = (x, gy, p) => { const w = p.w || 120; r(x, gy - 12, w, 2, '#c9c4b8'); r(x, gy - 5, w, 2, '#b9b4a8'); for (let i = 0; i < w; i += 20) { r(x + i, gy - 15, 4, 15, '#d2cdc0'); r(x + i - 1, gy - 16, 6, 2, '#b9b4a8'); r(x + i + 7, gy - 10, 8, 5, '#aaa59a'); r(x + i + 9, gy - 9, 4, 3, '#3f5a4c'); } };

  // ---------- Шанхай: храм с золотыми статуями ----------
  P.goldStatues = (x, gy, p) => {
    const G = '#f2c23a', G2 = '#c98a1a', G3 = '#fff0a0', RD = '#b8323c';
    r(x - 10, gy - 104, 260, 10, '#1c1418'); for (let i = 0; i < 260; i += 22) r(x - 10 + i, gy - 104, 4, 22, '#3a2018');
    const st = (sx, h, k) => {
      r(sx - 11, gy - 8, 22, 8, '#7a8ab0'); for (let i = 0; i < 22; i += 4) px(sx - 10 + i, gy - 6, '#f29ab8'); r(sx - 9, gy - 10, 18, 2, '#c9d2e8');
      r(sx - 7, gy - 10 - h * 0.62, 14, h * 0.62, G); r(sx - 9, gy - 10 - h * 0.3, 18, h * 0.3, G2); for (let i = 0; i < h * 0.6; i += 3) px(sx - 6 + (i * 5) % 12, gy - 12 - i, G3);
      r(sx - 8, gy - 10 - h * 0.45, 2, h * 0.3, RD); r(sx + 6, gy - 10 - h * 0.45, 2, h * 0.3, RD); r(sx - 6, gy - 10 - h * 0.34, 12, 2, '#3a6ad0');
      r(sx - 4, gy - 10 - h * 0.86, 8, h * 0.24, G); px(sx - 2, gy - 10 - h * 0.76, '#14121c'); px(sx + 2, gy - 10 - h * 0.76, '#14121c'); r(sx - 1, gy - 10 - h * 0.68, 3, 1, RD);
      if (k % 2) { r(sx - 5, gy - 10 - h, 10, h * 0.14, RD); r(sx - 3, gy - 12 - h, 6, 3, G3); } else { r(sx - 4, gy - 10 - h * 0.94, 8, h * 0.08, '#14121c'); r(sx - 2, gy - 10 - h, 4, h * 0.07, '#14121c'); }
      if (k % 3 === 0) { r(sx + 8, gy - 10 - h * 0.7, 2, h * 0.5, G2); r(sx + 7, gy - 12 - h * 0.7, 4, 3, G3); } else r(sx + 7, gy - 10 - h * 0.6, 4, 5, G);
    };
    [0, 1, 2, 3, 4, 5].forEach(k => st(x + 16 + k * 40, 78 - (k % 3) * 8, k));
    for (const k of [70, 190]) { r(x + k, gy - 96, 10, 12, '#e8a02a'); r(x + k + 2, gy - 94, 6, 8, '#fff0a0'); al(0.2, () => disc(x + k + 5, gy - 90, 12, '#ffd98a')); r(x + k + 4, gy - 102, 2, 6, '#3a2018'); }
  };

  // ---------- Шанхай: «1933» ----------
  P.b1933 = (x, gy, p) => {
    const C = '#8a857c', C2 = '#6f6a62', C3 = '#a39e94';
    r(x, gy - 104, 150, 104, C);
    for (let i = 0; i < 150; i++) if (rnd(i + 3) > 0.7) r(x + i, gy - 104 + Math.floor(rnd(i) * 80), 1, 10 + Math.floor(rnd(i + 9) * 16), C2);
    // решётка из квадратов по краям
    for (const k of [2, 108]) for (let j = 0; j < 9; j++) for (let i = 0; i < 5; i++) { const xx = x + k + i * 8, yy = gy - 100 + j * 8; r(xx, yy, 7, 7, C3); r(xx + 1, yy + 1, 5, 5, j % 3 === 1 ? '#3a4a52' : C2); if (j % 3 !== 1) ring(xx + 3, yy + 3, 2, '#55514a'); }
    // центральные вертикали с кругами
    for (const k of [50, 66, 82]) { r(x + k, gy - 104, 12, 76, C2); for (let j = 0; j < 9; j++) { disc(x + k + 6, gy - 98 + j * 8, 3, '#b9b4a8'); disc(x + k + 6, gy - 98 + j * 8, 2, j % 4 === 2 ? '#c9a880' : '#4a5a60'); } }
    for (const k of [46, 62, 78, 94]) r(x + k, gy - 104, 4, 76, C3);
    // портал с вывеской
    r(x, gy - 30, 150, 3, C3); for (let i = 0; i < 150; i++) px(x + i, gy - 28 - Math.round(Math.sin(Math.PI * i / 150) * 6), '#6f6a62');
    txt(x + 54, gy - 24, '1933', '#f1eee4', 8); r(x + 40, gy - 12, 70, 12, '#2b2a30'); r(x + 36, gy - 12, 4, 12, C3); r(x + 110, gy - 12, 4, 12, C3);
  };
  // магазин кукольных платьев в торговом центре
  P.dollShop = (x, gy) => {
    for (let i = 0; i < 240; i += 12) for (let j = 0; j < 5; j++) { tri(x + i + 6, gy - 84 + j * 12, 12, 6, j % 2 ? '#2b2a6a' : '#e8d08a'); for (let k = 0; k < 6; k++) r(x + i + 6 - (5 - k), gy - 78 + j * 12 + k, (5 - k) * 2, 1, j % 2 ? '#2b2a6a' : '#e8d08a'); }
    r(x - 4, gy - 104, 250, 16, '#14121c'); txt(x + 20, gy - 100, 'Classical Puppets', '#e8c04a', 6);
    r(x + 96, gy - 80, 44, 56, '#e8a02a'); r(x + 100, gy - 76, 36, 48, '#7a3ad0'); r(x + 110, gy - 60, 16, 18, '#f29ab8'); r(x + 112, gy - 64, 12, 4, '#f6ecd9');
    const chand = cx => { r(cx, gy - 88, 1, 10, '#e8c04a'); for (let j = 0; j < 4; j++) for (let i = -4 - j; i <= 4 + j; i += 2) px(cx + i, gy - 78 + j * 3, j % 2 ? '#fff6cf' : '#e9e6f0'); al(0.2, () => disc(cx, gy - 72, 12, '#fff6cf')); };
    chand(x + 60); chand(x + 176);
    const dress = (dx, c1, c2, big) => { const w = big ? 15 : 10; r(dx - 1, gy - 30, 2, 30, '#5a3d2e'); r(dx - 5, gy - 2, 10, 2, '#5a3d2e'); r(dx - 3, gy - 40, 6, 8, c1); r(dx - 2, gy - 44, 4, 4, c2); for (let i = 0; i < 20; i++) { const ww = Math.round(4 + (w - 4) * Math.sqrt(i / 20)); r(dx - ww, gy - 32 + i, ww * 2, 1, i % 5 === 4 ? c2 : c1); } for (let i = -w; i < w; i += 3) px(dx + i, gy - 13, '#ffffff'); };
    dress(x + 22, '#f1e6c8', '#c9dcc0', true); dress(x + 58, '#bcd0e8', '#e9eef8'); dress(x + 84, '#f2b8c8', '#d9b8e8'); dress(x + 150, '#fbf5ea', '#f1e6c8', true); dress(x + 200, '#d0b8f0', '#f6ecf8');
    for (let i = 0; i < 10; i++) { r(x + 216 + i * 2, gy - 50, 2, 26, ['#f29ab8', '#d0b8f0', '#c8323c', '#bcd0e8', '#f1e6c8'][i % 5]); } r(x + 214, gy - 52, 24, 1, '#14121c');
    for (let i = 0; i < 12; i++) { px(x - 2 + (i % 3) * 3, gy - 70 + i * 5, '#b58cff'); px(x + (i % 2) * 4, gy - 68 + i * 5, '#f29ab8'); }
  };
  P.checker = (x, gy, p) => { const w = p.w || 240; for (let j = 0; j < 4; j++) for (let i = 0; i < w; i += 10) r(x + i + (j % 2) * 5 * 0, gy + j * 6, 10, 6, ((i / 10) + j) % 2 ? '#14121c' : '#f6f2ea'); };
  // ресторанный круглый стол с блюдами
  P.feastRound = (x, gy) => { r(x, gy - 13, 86, 3, '#b8323c'); r(x + 2, gy - 10, 82, 2, '#8a1f2a'); r(x + 40, gy - 8, 6, 8, '#5a3d2e'); r(x + 30, gy - 1, 26, 1, '#3a2a22'); for (let i = 0; i < 8; i++) { const dx = x + 6 + i * 10; r(dx, gy - 15, 7, 2, '#f6ecd9'); r(dx + 1, gy - 17, 5, 2, ['#e8872a', '#7ad6a0', '#c8323c', '#ffd166', '#a86a3a'][i % 5]); } r(x + 38, gy - 22, 10, 2, '#f6ecd9'); r(x + 40, gy - 26, 6, 4, '#e8872a'); al(0.5, () => { px(x + 42, gy - 29, '#ffffff'); px(x + 44, gy - 32, '#ffffff'); }); };
  P.lantern = (x, gy, p) => { const y = gy - (p.y || 86); r(x, y - 8, 1, 8, '#3a2018'); r(x - 4, y, 9, 10, '#d0312d'); r(x - 3, y - 1, 7, 1, '#e8c04a'); r(x - 3, y + 10, 7, 1, '#e8c04a'); r(x, y + 11, 1, 4, '#e8c04a'); r(x - 1, y + 2, 3, 6, '#ff7a5a'); al(0.18, () => disc(x, y + 5, 11, '#ffb070')); };

  // ---------- аквариум с медузами: фото в глубине + живые медузы, лучи, пузыри ----------
  const PICS = {}; const pic = src => PICS[src] || (PICS[src] = Object.assign(new Image(), { src }));
  const jelly = (jx, jy, s, col, hi, t, ph) => {
    const c = A.ctx, pu = Math.sin(t * 2.2 + ph), bw = s * (6.5 + pu * 0.9), bh = Math.max(3, Math.round(s * (5.2 - pu * 0.7)));
    al(0.10, () => disc(Math.round(jx), Math.round(jy - bh / 2), Math.round(bw + 5 * s), col)); al(0.14, () => disc(Math.round(jx), Math.round(jy - bh / 2), Math.round(bw + 2 * s), hi));
    // щупальца (сзади)
    for (let k = 0; k < 7; k++) { const tx = jx + (k - 3) * bw * 0.28, len = s * (11 + (k * 5) % 7) + pu * 2; c.globalAlpha = 0.45; for (let i = 0; i < len; i++) px(Math.round(tx + Math.sin(t * 1.8 + i * 0.35 + k + ph) * (1 + i * 0.07) * s * 0.7), Math.round(jy + i), i % 3 ? col : hi); c.globalAlpha = 1; }
    // ротовые лопасти — кружевные
    for (let k = 0; k < 3; k++) { const ax = jx + (k - 1) * bw * 0.32, len = s * (7 + k % 2 * 3); for (let i = 0; i < len; i++) { const ox = Math.sin(t * 2 + i * 0.5 + k * 2 + ph) * s * 0.9, ww = Math.max(1, Math.round(s * (1.6 - i / len))); c.globalAlpha = 0.75 - i / len * 0.4; r(Math.round(ax + ox - ww / 2), Math.round(jy + i), ww, 1, i % 2 ? hi : '#ffffff'); c.globalAlpha = 1; } }
    // купол
    for (let i = 0; i < bh; i++) { const f = (i + 1) / bh, w = Math.round(bw * Math.sqrt(1 - Math.pow(1 - f, 2))); c.globalAlpha = 0.82; r(Math.round(jx - w), Math.round(jy - bh + i), w * 2, 1, i < bh * 0.35 ? hi : col); c.globalAlpha = 1; if (w > 2) { px(Math.round(jx - w), Math.round(jy - bh + i), '#ffffff'); c.globalAlpha = 0.5; r(Math.round(jx - w * 0.55), Math.round(jy - bh + i), Math.max(1, Math.round(w * 0.3)), 1, '#ffffff'); c.globalAlpha = 1; } }
    for (let k = -2; k <= 2; k++) { c.globalAlpha = 0.55; r(Math.round(jx + k * bw * 0.36 - 1), Math.round(jy - 1), 2, 1, '#ffffff'); c.globalAlpha = 1; }
    if (s >= 1.5) for (let k = 0; k < 4; k++) { c.globalAlpha = 0.6; ring(Math.round(jx + (k - 1.5) * bw * 0.3), Math.round(jy - bh * 0.5), 1, '#ffffff'); c.globalAlpha = 1; }
  };
  P.photoTank = (x, gy, p, e) => {
    const w = p.w || 110, h = p.h || 88, y0 = gy - h - 12, c = A.ctx, im = pic(p.src), t = e.t;
    al(0.20 + 0.1 * Math.sin(t * 2), () => r(x - 6, y0 - 6, w + 12, h + 12, '#9de8ff')); al(0.12, () => r(x - 10, y0 - 10, w + 20, h + 20, '#6fb7ff'));
    r(x - 1, y0 - 1, w + 2, h + 2, '#9de8ff'); r(x, y0, w, h, '#0a1f4a');
    c.save(); c.beginPath(); c.rect(x + 1, y0 + 1, w - 2, h - 2); c.clip();
    if (im.complete && im.naturalWidth) {
      c.imageSmoothingEnabled = true;
      const ox = im.naturalWidth * (p.cx || 0), iw = im.naturalWidth - ox, sc = Math.max((w - 2) / iw, (h - 2) / im.naturalHeight) * 1.1, sw = (w - 2) / sc, sh = (h - 2) / sc, sx0 = ox + (iw - sw) / 2, sy0 = (im.naturalHeight - sh) / 2, bob = Math.sin(t * 1.1) * 2.5;
      for (let yy = 0; yy < h - 2; yy += 2) { const off = Math.sin(t * 1.7 + yy * 0.22) * 1.6 + Math.sin(t * 0.7 + yy * 0.05) * 1.2, sy = Math.max(0, Math.min(im.naturalHeight - 2 / sc, sy0 + (yy + bob) / sc)); c.drawImage(im, sx0, sy, sw, 2 / sc, x + 1 + off, y0 + 1 + yy, w - 2, 2); }
      c.imageSmoothingEnabled = false; al(0.22, () => r(x, y0, w, h, '#06143a'));
    } else { for (let j = 0; j < h; j += 4) r(x, y0 + j, w, 4, SCENES.shade('#0f3a78', -j * 0.5)); }
    // лучи света сверху
    for (let k = 0; k < 5; k++) { const lx = x + 8 + k * (w / 5) + Math.sin(t * 0.4 + k) * 4; c.globalAlpha = 0.05 + 0.03 * Math.sin(t * 0.9 + k * 2); c.fillStyle = '#bfefff'; c.beginPath(); c.moveTo(lx, y0); c.lineTo(lx + 9, y0); c.lineTo(lx + 22, y0 + h); c.lineTo(lx + 4, y0 + h); c.fill(); c.globalAlpha = 1; }
    // взвесь
    for (let i = 0; i < 26; i++) { const sx = x + ((rnd(i + 60) * w + Math.sin(t * 0.5 + i) * 3) % w), sy = y0 + ((rnd(i + 90) * h + t * (1.5 + (i % 4))) % h); c.globalAlpha = 0.25 + 0.2 * Math.sin(t * 2 + i); px(Math.round(sx), Math.round(sy), '#d9f6ff'); c.globalAlpha = 1; }
    // медузы: дальние мелкие, ближние крупные
    const J = [[0.16, 0.9, 3.2, '#b98cff', '#e2d0ff'], [0.72, 1.0, 2.6, '#ff9ad0', '#ffd3ec'], [0.44, 1.9, 4.4, '#8fd8ff', '#d9f4ff'], [0.86, 1.4, 3.6, '#ffd98a', '#fff3c4'], [0.30, 2.3, 5.2, '#ff8fb8', '#ffd0e2'], [0.60, 0.8, 2.2, '#9dffe0', '#dcfff4']];
    J.forEach((j, i) => { const span = h + 60, yy = y0 + h + 24 - ((t * j[2] + i * 37) % span), xx = x + j[0] * w + Math.sin(t * 0.6 + i * 1.7) * 5; jelly(xx, yy, j[1], j[3], j[4], t, i * 1.3); });
    // пузыри и блики на стекле
    for (let i = 0; i < 12; i++) { const by = y0 + h - ((t * (7 + i * 2.3) + rnd(i) * h) % h), bx = x + 5 + rnd(i + 20) * (w - 10) + Math.sin(t * 3 + i) * 1.5; px(Math.round(bx), Math.round(by), '#eafcff'); if (i % 3 === 0) { ring(Math.round(bx), Math.round(by), 1, '#bfefff'); } }
    for (let i = 0; i < 14; i++) { c.globalAlpha = 0.25 + 0.2 * Math.sin(t * 3 + i * 1.9); r(Math.round(x + 2 + ((i * 17 + t * 6) % (w - 10))), y0 + 2 + (i % 3), 5 + i % 4, 1, '#dff8ff'); c.globalAlpha = 1; }
    c.restore();
    al(0.10, () => { c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(x + 6, y0 + 1); c.lineTo(x + 20, y0 + 1); c.lineTo(x + 4, y0 + h - 1); c.lineTo(x + 1, y0 + h - 1); c.lineTo(x + 1, y0 + 30); c.fill(); });
    r(x - 2, y0 + h + 1, w + 4, 3, '#1a2a4a');
  };
  // ---------- Школьная («уродская квартира»): лакированный шкаф и ковёр на стене ----------
  P.sovWardrobe = (x, gy) => {
    const O = '#d9892a', O2 = '#b86a1a', O3 = '#f0b050';
    for (let i = 0; i < 4; i++) { r(x + 6 + i * 9, gy - 80 - (i % 2) * 2, 12, 4 + (i % 2) * 2, i % 2 ? '#e2e4e8' : '#f6f2ea'); r(x + 6 + i * 9, gy - 78, 12, 1, '#aab2bc'); }
    r(x, gy - 76, 50, 76, O2); r(x + 1, gy - 75, 16, 72, O); r(x + 18, gy - 75, 16, 72, O); r(x + 36, gy - 75, 13, 72, '#2a1a12'); r(x + 40, gy - 75, 10, 72, O);
    for (const k of [3, 21, 42]) { r(x + k, gy - 72, 2, 66, O3); r(x + k + 4, gy - 60, 1, 40, O3); }
    px(x + 15, gy - 40, '#3a2a22'); px(x + 20, gy - 40, '#3a2a22'); r(x, gy - 3, 50, 3, '#7a4a1a');
    ln(x + 5, gy - 72, x + 11, gy - 34, '#f6f6f6'); ln(x + 6, gy - 72, x + 12, gy - 34, '#e2e4e8'); ln(x + 7, gy - 70, x + 12, gy - 40, '#f6f6f6'); r(x + 4, gy - 75, 3, 3, '#f6f6f6'); px(x + 10, gy - 50, '#c8323c');
  };
  P.wallCarpet = (x, gy, p) => {
    const w = p.w || 62, h = p.h || 32, y = gy - (p.y || 84);
    r(x, y, w, h, '#7a2020'); r(x + 2, y + 2, w - 4, h - 4, '#a83228'); r(x + 5, y + 5, w - 10, h - 10, '#8a2424');
    for (let i = 0; i < w - 6; i += 3) { px(x + 3 + i, y + 3, '#e8c9a0'); px(x + 3 + i, y + h - 4, '#e8c9a0'); }
    for (let j = 0; j < h - 6; j += 3) { px(x + 3, y + 3 + j, '#e8c9a0'); px(x + w - 4, y + 3 + j, '#e8c9a0'); }
    for (let k = 0; k < 3; k++) { const cx = x + Math.round(w * (0.2 + k * 0.3)), cy = y + (h >> 1); for (let d = 0; d < 5; d++) { r(cx - d, cy - 5 + d, d * 2 + 1, 1, d % 2 ? '#1c1a3a' : '#e8c9a0'); r(cx - d, cy + 5 - d, d * 2 + 1, 1, d % 2 ? '#1c1a3a' : '#e8c9a0'); } px(cx, cy, '#ffd166'); }
  };
  // стенка со стеклянными дверцами и плакатами с квизов наверху (Школьная, по фото)
  P.stenka = (x, gy, p) => {
    const w = p.w || 66, WD = '#c98a3a', WD2 = '#a86a22', WD3 = '#e0a850';
    const post = ['#2f8a4a', '#6a3ad0', '#2b2a30', '#2b2a30', '#d0312d', '#e0312d', '#e8c02a'];
    post.forEach((c, i) => { const px0 = x + 2 + i * 9, hh = 9 + i * 1.2; r(px0, gy - 80 - hh, 9, hh + 2, c); r(px0 + 1, gy - 78 - hh, 7, 1, '#f6ecd9'); for (let k = 0; k < 3; k++) r(px0 + 1, gy - 75 - hh + k * 2, 6, 1, i > 3 ? '#ffd6d0' : '#ffd166'); });
    r(x, gy - 80, w, 80, WD2); r(x + 1, gy - 79, w - 2, 50, '#5a3a1a');
    // левая часть за стеклом
    r(x + 2, gy - 78, 26, 48, '#6f8a8a'); r(x + 15, gy - 78, 1, 48, WD); r(x + 2, gy - 54, 26, 1, WD); al(0.35, () => { r(x + 3, gy - 77, 11, 22, '#dff2f4'); r(x + 17, gy - 52, 10, 20, '#dff2f4'); }); r(x + 6, gy - 46, 6, 14, '#c8323c'); r(x + 19, gy - 70, 6, 14, '#e2b46a'); ln(x + 4, gy - 76, x + 10, gy - 60, '#ffffff');
    // правая часть: открытые полки
    r(x + 30, gy - 78, w - 32, 48, '#7a4a22'); for (const yy of [62, 46]) r(x + 30, gy - yy, w - 32, 2, WD);
    for (let i = 0; i < 9; i++) r(x + 32 + i * 3, gy - 76 + (i % 3), 2, 12 - (i % 3), ['#2b2a30', '#f6ecd9', '#3d6bd6', '#8a8f9c'][i % 4]);
    for (let i = 0; i < 6; i++) { r(x + 33 + i * 5, gy - 56, 3, 8, ['#e8b25a', '#f6ecd9', '#7ad6a0', '#c98a4a'][i % 4]); px(x + 34 + i * 5, gy - 57, '#8a8f9c'); }
    r(x + 34, gy - 40, 12, 8, '#b8323c'); disc(x + 54, gy - 36, 3, '#f2c62a'); r(x + 48, gy - 42, 5, 10, '#f6ecd9');
    // столешница и нижние дверцы
    r(x - 1, gy - 30, w + 2, 3, WD3); r(x, gy - 27, w, 27, WD); for (let i = 0; i < w; i += 16) { r(x + i, gy - 27, 1, 27, WD2); px(x + i + 12, gy - 14, '#5a3a1a'); r(x + i + 3, gy - 24, 1, 20, WD3); }
    r(x + 20, gy - 35, 4, 5, '#f6ecd9');
  };
})();
