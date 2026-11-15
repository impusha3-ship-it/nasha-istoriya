// ===== scenes9.js — доводка оставшихся предметов (по итогам общей проверки): объём, блики, тени =====
(() => {
  const S = SCENES, P = S.P, { r, px, rnd, disc } = A, ln = S.ln;
  const { f, al, mix } = S.fx;
  const wrap = (name, fn) => { const old = P[name]; if (!old) return; P[name] = (x, gy, p, e) => { old(x, gy, p, e); fn(x, gy, p || {}, e); }; };
  const sh = (x, gy, w, a = 0.22) => al(a, () => f(x, gy - 0.5, w, 1.5, '#000'));

  // ---- Шанхай: кафе nod, Pop Mart, мосты, башни ----
  wrap('cafeWindow', (x, gy, p, e) => { const w = p.w || 150, h = p.h || 66, y = gy - 98; f(x - 2, y - 2, w + 4, 0.5, '#6a5a76'); f(x, y, w, 0.5, '#ffffff66'); al(0.3, () => { for (let k = 0; k < 5; k++) ln(x + 8 + k * 30, y + 2, x + 22 + k * 30, y + h - 10, '#fff'); }); f(x - 4, y + h + 2, w + 8, 0.5, '#9a8a76'); al(0.25, () => f(x - 4, y + h + 5, w + 8, 2, '#000')); });
  wrap('octoSign', (x, gy) => { al(0.4, () => disc(x - 3, gy - 82, 5, '#6a6a8a')); f(x - 1, gy - 81, 1, 1, '#fff'); for (let k = 0; k < 4; k++) f(x - 9 + k * 6, gy - 57, 2, 1, '#14121c'); });
  wrap('stool', (x, gy) => { f(x, gy - 12, 8, 0.5, '#6a5a76'); f(x + 1, gy - 10, 0.5, 10, '#6a5a76'); f(x + 2, gy - 6, 4, 0.5, '#4a4056'); sh(x - 1, gy, 10, 0.25); });
  wrap('pendant', (x, gy, p) => { const len = p.len || 26; f(x - 2, len, 5, 0.5, '#8a6a30'); f(x - 1, len + 1, 3, 3, '#fff6c8'); al(0.35, () => f(x - 14, len + 8, 28, 22, '#ffe9a8')); });
  wrap('labWall', (x, gy, p, e) => { for (let c = 0; c < 5; c++) for (let rw = 0; rw < 6; rw++) { const cx = x + c * 34, cy = gy - 100 + rw * 16; f(cx, cy + 14.5, 34, 1, '#9a8ac0'); f(cx + 1, cy + 15.5, 33, 1, '#00000025'); } al(0.12, () => { for (let k = 0; k < 4; k++) ln(x + 10 + k * 40, gy - 98, x + 40 + k * 40, gy - 2, '#fff'); }); sh(x, gy, 170, 0.25); });
  wrap('popFront', (x, gy) => { f(x, gy - 62, 96, 0.5, '#fff'); f(x + 95, gy - 62, 1, 62, '#c8c4bc'); al(0.35, () => { ln(x + 12, gy - 38, x + 24, gy - 12, '#fff'); ln(x + 58, gy - 38, x + 70, gy - 12, '#fff'); }); f(x + 8, gy - 4.5, 34, 0.5, '#8a9ab0'); f(x + 54, gy - 4.5, 34, 0.5, '#8a9ab0'); sh(x - 2, gy, 100, 0.25); });
  wrap('labubu', (x, gy, p) => { const y = gy - (p.y || 0); f(x + 0.5, y - 7, 5, 0.5, '#e8c890'); f(x + 5, y - 6, 1, 6, '#00000030'); f(x + 1, y - 5, 1, 1, '#fff'); sh(x - 1, y, 8, 0.2); });
  wrap('archBridge', (x, gy, p) => { const L = p.len || 270; f(x, gy - 14, L, 0.5, '#fff'); al(0.18, () => f(x, gy - 6, L, 6, '#000')); for (let i = 0; i < L; i += 16) f(x + i, gy - 12, 0.5, 12, '#c8c0b0'); al(0.3, () => f(x, gy - 0.5, L, 1.5, '#fff')); });
  wrap('constructTower', (x, gy, p) => { const h = p.h || 80, w = p.w || 22; al(0.3, () => f(x + w - 3, gy - h, 3, h, '#000')); f(x, gy - h, 0.5, h, '#8a94b0'); for (let y = gy - h + 4; y < gy; y += 12) al(0.7, () => f(x + 3, y + 2, 3, 2, '#ffd98a')); sh(x - 2, gy, w + 6, 0.25); });
  wrap('wheel', (x, gy, p, e) => { const cx = x, cy = gy - 62; al(0.25, () => { disc(cx, cy, 52, '#c0b8e0'); }); al(0.3, () => disc(cx, cy, 44, '#000')); for (let a = 0; a < 360; a += 30) { const rad = a * Math.PI / 180; px(cx + Math.cos(rad) * 50, cy + Math.sin(rad) * 50, '#fff'); } f(cx - 30, gy - 1, 60, 1, '#4a4468'); sh(cx - 34, gy, 68, 0.25); });
  for (const nm of ['bigJin', 'bigWfc', 'bigSht']) wrap(nm, (x, gy) => { al(0.22, () => f(x - 22, 0, 6, gy, '#fff')); al(0.2, () => f(x + 14, 0, 8, gy, '#000')); });
  wrap('checker', (x, gy, p) => { const w = p.w || 240; al(0.18, () => f(x, gy, w, 24, '#000')); al(0.25, () => f(x, gy, w, 1, '#fff')); });
  wrap('pearl', (x, gy, p, e) => { al(0.4, () => disc(x - 3, gy - 37, 3, '#ffd8f4')); al(0.4, () => disc(x - 2, gy - 66, 2, '#ffd8f4')); al(0.25, () => f(x - 8, gy - 0.5, 16, 1.5, '#000')); });
  wrap('tallglass', (x, gy, p) => { const w = p.w || 18, h = p.h || 90; f(x, gy - h, 0.5, h, '#6a7aa8'); f(x + w - 1, gy - h, 1, h, '#1a2240'); al(0.25, () => { ln(x + 3, gy - h + 6, x + 9, gy - h + 30, '#fff'); }); sh(x - 1, gy, w + 2, 0.25); });
  // ---- аэропорт и транспорт ----
  wrap('gate', (x, gy, p) => { f(x, gy - 46, 40, 0.5, '#fff'); al(0.35, () => { ln(x + 8, gy - 32, x + 18, gy - 8, '#fff'); ln(x + 20, gy - 32, x + 28, gy - 14, '#fff'); }); sh(x - 2, gy, 44, 0.25); });
  wrap('barrier', (x, gy, p) => { for (let i = 0; i < (p.n || 4); i++) { f(x + i * 16 + 0.5, gy - 16, 0.5, 16, '#d8dce4'); sh(x + i * 16 - 1, gy, 4, 0.3); } });
  wrap('booth', (x, gy) => { f(x, gy - 30, 22, 0.5, '#fff'); al(0.4, () => ln(x + 4, gy - 26, x + 10, gy - 16, '#fff')); sh(x - 1, gy, 24, 0.25); });
  wrap('escalator', (x, gy, p, e) => { const L = p.len || 220, k = p.kk || 0.42; al(0.18, () => { for (let i = 0; i < L; i += 3) f(x + i, gy - (p.down ? (L - i) : i) * k + 3, 3, 1.5, '#000'); }); });
  wrap('metro', (x, gy) => { f(x, gy - 40, 46, 0.5, '#fff'); f(x + 45, gy - 40, 1, 40, '#7a808c'); al(0.3, () => disc(x + 21, gy - 54, 3, '#ff8a8a')); sh(x - 1, gy, 48, 0.25); });
  wrap('boat', (x, gy, p, e) => { f(x, gy - 8, 60, 0.5, '#fff'); f(x + 4, gy - 3, 52, 0.5, '#7a9ae8'); al(0.3, () => f(x - 2, gy, 66, 2, '#000')); });
  wrap('sportscar', (x, gy) => { f(x + 2, gy - 8.5, 34, 0.5, '#bfe8ff'); f(x, gy - 2.5, 38, 0.5, '#2a7ab0'); sh(x, gy, 40, 0.25); });
  wrap('arch', (x, gy) => { al(0.25, () => f(x + 6, gy - 0.5, 28, 1.5, '#000')); f(x, gy - 14, 0.5, 14, '#fff'); });
  // ---- Выборг, Нерчинская и прочие ----
  wrap('gnome', (x, gy) => { f(x + 3, gy - 12, 3, 0.5, '#c8a478'); f(x, gy - 5, 12, 0.5, '#aab0ba'); sh(x - 1, gy, 14, 0.25); });
  wrap('swing', (x, gy, p, e) => { f(x + 0.5, gy - 40, 0.5, 40, '#8a6a4a'); f(x + 40.5, gy - 40, 0.5, 40, '#8a6a4a'); f(x - 2, gy - 42, 46, 0.5, '#9a7a5a'); sh(x - 2, gy, 46, 0.25); });
  wrap('tower', (x, gy) => { al(0.25, () => f(x - 6, gy - 46, 14, 26, '#000')); f(x - 6, gy - 46, 0.5, 26, '#fff'); });
  wrap('oldhouse', (x, gy, p) => { const w = p.w || 50, h = p.h || 52; f(x, gy - h, w, 0.5, '#ffffff66'); al(0.2, () => f(x + w - 3, gy - h, 3, h, '#000')); sh(x - 1, gy, w + 2, 0.22); });
  wrap('railing', (x, gy, p) => { const w = p.w || 40; f(x, gy - 20, w, 0.5, '#fff6e0'); sh(x, gy, w, 0.2); });
  wrap('keys', (x, gy) => { f(x + 1, gy - 23, 32, 0.5, '#fff'); });
  wrap('laptop', (x, gy, p, e) => { al(0.18, () => f(x - 1, gy - 15, 14, 1.5, '#000')); f(x + 1, gy - 24, 10, 0.5, '#ffffff66'); al(0.25, () => f(x + 1, gy - 15.5, 10, 8, '#7ab8ff')); });
  wrap('cake', (x, gy, p) => { const y = gy - (p.y || 14); f(x, y - 5.5, 12, 0.5, '#fff0f4'); f(x, y - 0.5, 12, 0.5, '#d89ab0'); });
  wrap('screenSite', (x, gy) => { al(0.2, () => f(x, gy - 44, 44, 30, '#7ab8ff')); f(x + 2, gy - 42, 40, 0.5, '#ffffff66'); });
  wrap('curtain', (x, gy, p) => { for (let i = 1; i < (p.w || 30); i += 5) { f(x + i + 0.5, 0, 0.5, gy - 6, '#c83a52'); f(x + i + 3, 0, 0.5, gy - 6, '#4a0a16'); } al(0.3, () => f(x, gy - 8, p.w || 30, 3, '#000')); });
  wrap('chandelier', (x, gy, e) => { for (let k = -8; k <= 8; k += 4) f(x + k - 0.25, 16, 0.5, 1.5, '#fff'); });
  wrap('garland', (x, gy, p, e) => { for (let i = 0; i < (p.n || 14); i++) { const xx = x + i * 7, yy = gy - (p.y || 84) + Math.round(Math.sin(i * 0.9) * 2) + 2; f(xx - 0.5, yy - 1.5, 2, 0.5, '#3a3a48'); } });
  wrap('poster', (x, gy, p) => { f(x, gy - 34, 16, 0.5, '#fff'); f(x + 1, gy - 12, 16, 1, '#00000030'); });
  wrap('field', (x, gy, p) => { al(0.35, () => f(x, gy - 2, p.w || 120, 0.5, '#c8d8ec')); al(0.3, () => f(x + 4, gy - 16, 19, 0.5, '#fff')); });
  wrap('fence', (x, gy, p) => { for (let i = 0; i < (p.n || 10); i++) f(x + i * 6, gy - 12, 0.5, 12, '#7a808a'); al(0.2, () => f(x, gy - 0.5, (p.n || 10) * 6, 1.5, '#000')); });
  wrap('tank', (x, gy, p, e) => { const w = p.w || 60, h = p.h || 70; al(0.2, () => f(x, gy - 0.5, w, 2, '#6fb7ff')); f(x, gy - h - 12, w, 0.5, '#5a9ae0'); });
  wrap('record', (x, gy) => { f(x, gy - 22, 16, 0.5, '#8a6a50'); al(0.25, () => f(x + 1, gy - 12.5, 14, 1.5, '#000')); });
  wrap('spit', (x, gy, p) => { for (let i = 0; i < (p.n || 10); i++) f(x + i * 12 + rnd(i) * 6, gy - 2 - rnd(i + 3) * 3, 6, 0.5, '#b8bec8'); });
  wrap('lighthouse', (x, gy) => { f(x - 5, gy - 44, 1, 36, '#fff'); al(0.2, () => f(x + 6, gy - 44, 3, 36, '#000')); sh(x - 9, gy, 24, 0.25); });
  wrap('showcase', (x, gy, p) => { const w = p.w || 56; f(x, gy - 40, w, 0.5, '#fff'); al(0.3, () => { ln(x + 6, gy - 38, x + 14, gy - 18, '#fff'); }); sh(x - 1, gy, w + 2, 0.25); });
  wrap('amnyam', (x, gy, p) => { const y = p.y || 0; f(x + 1, gy - 6 - y, 4, 0.5, '#b8f0b0'); sh(x, gy - y, 6, 0.25); });

  // ---- Шанхай: магазин одежды (примерочная, штанги, полки со сложенными вещами) ----
  P.clothesRack = (x, gy, p, e) => {
    const w = p.w || 44, cols = ['#d8e4ee', '#e8dcc8', '#8fb4d8', '#f2ece0', '#c8d8c0', '#b8a88c', '#e0d0d8'];
    f(x, gy - 36, 1, 36, '#8a8e98'); f(x + w - 1, gy - 36, 1, 36, '#8a8e98'); f(x, gy - 36, w, 1, '#c8ccd4'); f(x, gy - 36, w, 0.5, '#fff'); f(x - 2, gy - 1, 5, 1, '#6a6e78'); f(x + w - 3, gy - 1, 5, 1, '#6a6e78');
    for (let k = 0; k < w - 4; k += 4) { const c = cols[(k / 4 + (p.seed || 0)) % cols.length | 0], len = 18 + ((k * 7) % 9); f(x + 2 + k, gy - 36, 0.5, 1.5, '#4a4e58'); f(x + 1.5 + k, gy - 35, 3, 1, '#4a4e58'); f(x + 1 + k, gy - 34, 3.5, len, c); f(x + 1 + k, gy - 34, 0.5, len, mix(c, 0.25)); f(x + 4 + k, gy - 34, 0.5, len, mix(c, -0.2)); f(x + 1 + k, gy - 34 + len - 0.5, 3.5, 0.5, mix(c, -0.3)); }
    al(0.22, () => f(x - 2, gy - 0.5, w + 4, 1.5, '#000'));
  };
  P.foldShelf = (x, gy, p, e) => {
    const w = 30, cols = ['#d8e4ee', '#e8dcc8', '#8fb4d8', '#f2ece0', '#c8d8c0', '#b8a88c'];
    f(x, gy - 46, w, 46, '#b8a078'); f(x, gy - 46, w, 0.5, '#e0d0b0'); f(x + w - 1.5, gy - 46, 1.5, 46, '#8a7658');
    for (let r2 = 0; r2 < 4; r2++) { const y = gy - 44 + r2 * 11; f(x + 1, y + 9.5, w - 2, 1, '#8a7658'); for (let k = 0; k < 3; k++) { const c = cols[(r2 * 3 + k) % cols.length]; for (let q = 0; q < 3; q++) { f(x + 2 + k * 9, y + 8 - q * 2.5, 8, 2.5, q % 2 ? c : mix(c, 0.12)); f(x + 2 + k * 9, y + 10 - q * 2.5 - 0.5, 8, 0.5, mix(c, -0.25)); } } }
    al(0.22, () => f(x - 1, gy - 0.5, w + 2, 1.5, '#000'));
  };
  P.fittingBooth = (x, gy, p, e) => {
    f(x, gy - 56, 26, 56, '#a89478'); f(x, gy - 56, 26, 1, '#d8c8a8'); f(x + 25, gy - 56, 1, 56, '#7a6a52');
    f(x + 3, gy - 50, 20, 46, '#6a8aa8'); for (let k = 0; k < 20; k += 4) f(x + 3 + k, gy - 50, 0.5, 46, '#52708c'); f(x + 3, gy - 50, 20, 1.5, '#8a6a30'); f(x + 3, gy - 5, 20, 1, '#4a6a88');
    f(x + 18, gy - 28, 1.5, 6, '#d8d0b8'); al(0.25, () => f(x + 4, gy - 49, 3, 44, '#fff'));
    f(x - 1, gy - 58, 28, 3, '#5a4a38'); f(x + 7, gy - 4, 4, 4, '#2a2a34'); f(x + 13, gy - 4, 4, 4, '#2a2a34');
    al(0.22, () => f(x - 2, gy - 0.5, 30, 1.5, '#000'));
  };
})();
