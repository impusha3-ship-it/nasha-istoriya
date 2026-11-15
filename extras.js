// ===== Вступление и карта перелётов =====
(() => {
  const { r, px, disc } = A; const txt = SCENES.txt, ln = SCENES.ln;
  const alpha = (a, f) => { const c = A.ctx; c.globalAlpha = a; f(); c.globalAlpha = 1; };

  // --- вступление: два окна в разных концах страны ---
  SCENES.intro = (e) => {
    const W = e.W, H = e.H, n = e.o.n || 0, t = e.t, half = Math.floor(W / 2);
    // слева Петербург, ночь
    A.sky(half, H, ['#0c0b20', '#12112e', '#1a1a40', '#24265a'], H);
    for (let i = 0; i < 24; i++) px((A.rnd(i) * half) | 0, (A.rnd(i + 9) * 60) | 0, Math.sin(t * 2 + i) > 0.5 ? '#fff' : '#9aa6d8');
    for (let i = 0; i < 6; i++) { const bx = i * 26 - 6, bh = 26 + (A.rnd(i + 3) * 18 | 0); r(bx, H - 30 - bh, 24, bh, '#191838'); for (let k = 0; k < 4; k++) if (A.rnd(i * 7 + k) < 0.5) r(bx + 4 + (k % 2) * 9, H - 26 - bh + (k >> 1) * 10 + 4, 3, 4, '#ffd98a'); }
    const sx = Math.round(half * 0.72); for (let k = 0; k < 26; k++) px(sx, H - 76 - k + 20, '#d9b860'); r(sx - 4, H - 58, 9, 28, '#191838');
    r(0, H - 30, half, 30, '#101028');
    // справа Владивосток, рассвет
    const c = A.ctx; c.save(); c.beginPath(); c.rect(half, 0, W - half, H); c.clip(); c.translate(half, 0);
    A.sky(W - half, H, ['#3b4a8a', '#7a6aa8', '#d58aa0', '#ffc7a0'], H - 30);
    disc(Math.round((W - half) * 0.7), H - 46, 9, '#ffe2a8');
    A.hills(W - half, 40, 1, H - 34, 12, '#52527f', 4, H);
    const bx = Math.round((W - half) * 0.3); for (const p0 of [bx, bx + 44]) { ln(p0 - 2, H - 34, p0, H - 62, '#2a2a55'); ln(p0 + 2, H - 34, p0, H - 62, '#2a2a55'); for (let k = 1; k < 5; k++) { ln(p0, H - 62 + k * 2, p0 - k * 5, H - 38, '#2a2a55'); ln(p0, H - 62 + k * 2, p0 + k * 5, H - 38, '#2a2a55'); } } r(bx - 24, H - 38, 92, 2, '#2a2a55');
    r(0, H - 30, W - half, 30, '#3a3566');
    c.restore();
    // окна с героями
    const win = (cx, who, glow) => { r(cx - 16, H - 74, 32, 40, '#0b0a18'); r(cx - 14, H - 72, 28, 36, glow); const cfg = Object.assign({}, OUTFITS[who].base, OUTFITS[who].home, { phase: who === 'd' ? 0 : 2 }); c.save(); c.beginPath(); c.rect(cx - 14, H - 72, 28, 36); c.clip(); A.person(cx, H - 30, cfg, 'stand', t, who === 'o'); c.restore(); r(cx - 16, H - 36, 32, 2, '#0b0a18'); r(cx - 1, H - 72, 1, 36, '#0b0a1866'); };
    if (n >= 0) win(Math.round(half * 0.36), 'o', '#ffd98a');
    if (n >= 0) win(half + Math.round((W - half) * 0.6), 'd', '#ffe9c0');
    r(half, 0, 1, H, '#0b0a18');
    txt(Math.round(half * 0.36), 8, 'ПЕТЕРБУРГ', '#f6ecd9', 8, 'center'); txt(half + Math.round((W - half) * 0.6), 8, 'ВЛАДИВОСТОК', '#f6ecd9', 8, 'center');
    if (n >= 1) { txt(Math.round(half * 0.36), 20, '00:00', '#ffd166', 8, 'center'); txt(half + Math.round((W - half) * 0.6), 20, '07:00', '#ffd166', 8, 'center'); }
    if (n >= 2) { const a = Math.round(half * 0.36) + 18, b = half + Math.round((W - half) * 0.6) - 18, y = H - 54; const k = Math.min(1, (t - (e.o.t2 || (e.o.t2 = t))) / 1.6); for (let x = a; x < a + (b - a) * k; x += 4) r(x, y, 2, 1, '#ff7aa8'); if (k >= 1) { r(W / 2 - 26, y - 14, 53, 11, '#0b0a18'); txt(Math.round(W / 2), y - 12, '9000 км', '#ff7aa8', 8, 'center'); } }
    if (n >= 3) A.heart(Math.round(W / 2), H - 86 + Math.round(Math.sin(t * 3) * 2), '#ff7aa8', 2);
    A.vignette(W, H, 0.35);
  };

  // --- карта: города и перелёты ---
  const CITY = { spb: [0.17, 0.24, 'СПб', -12], kgd: [0.08, 0.36, 'Клнгрд', 5], vl: [0.88, 0.43, 'Влдвсток', -12], bj: [0.70, 0.48, 'Пекин', -12], sh: [0.76, 0.62, 'Шанхай', 5], alm: [0.45, 0.48, 'Алма-Ата', 5] };
  SCENES.map = (e) => {
    const W = e.W, H = e.H, t = e.t - (e.o.t0 || (e.o.t0 = e.t));
    r(0, 0, W, H, '#16254a');
    for (let i = 0; i < 60; i++) px((A.rnd(i) * W) | 0, (A.rnd(i + 5) * H) | 0, '#1f3160');
    // суша: условная Евразия
    for (let x = 0; x < W; x++) { const u = x / W; if (u < 0.04) continue; const top = 16 + Math.sin(u * 5.2 + 0.4) * 6 + Math.sin(u * 13) * 2 - u * 3; let bot = 64 + Math.sin(u * 4.1 + 1) * 6 + Math.sin(u * 11 + 2) * 3 + Math.exp(-Math.pow((u - 0.72) / 0.11, 2)) * 34 + Math.exp(-Math.pow((u - 0.42) / 0.1, 2)) * 10; if (u > 0.93) bot = Math.min(bot, top + (1 - u) * 700); r(x, top, 1, Math.max(0, bot - top), (x + ((top | 0) % 2)) % 9 ? '#2f6b5a' : '#3a7a66'); }
    for (let i = 0; i < 70; i++) { const x = (A.rnd(i + 40) * W) | 0, y = 26 + ((A.rnd(i + 80) * 34) | 0); px(x, y, '#3f8a70'); }
    const P = k => [Math.round(CITY[k][0] * W), Math.round(CITY[k][1] * H)];
    const routes = e.o.routes || [];
    const used = new Set(['spb', 'vl']); routes.forEach(rt => { used.add(rt[0]); used.add(rt[1]); });
    // маршруты
    routes.forEach((rt, i) => {
      const a = P(rt[0]), b = P(rt[1]), col = rt[2] === 'o' ? '#ff7aa8' : rt[2] === 'both' ? '#ffd166' : '#6fb7ff';
      const k = Math.max(0, Math.min(1, (t - 0.4 - i * 0.5) / 2.2)), hgt = Math.min(34, Math.abs(b[0] - a[0]) * 0.22 + 6);
      const pt = u => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u - Math.sin(u * Math.PI) * hgt];
      for (let s = 0; s <= 60 * k; s++) { const q = pt(s / 60); if (s % 3 !== 2) px(q[0], q[1], col); }
      if (k > 0 && k < 1) { const q = pt(k), q2 = pt(Math.min(1, k + 0.03)); const dir = q2[0] >= q[0] ? 1 : -1; r(q[0] - 3, q[1] - 1, 7, 2, '#f6f2ea'); r(q[0] - 1, q[1] - 3, 2, 6, '#f6f2ea'); px(q[0] + 4 * dir, q[1], '#f6f2ea'); }
      if (k >= 1) A.heart(b[0], b[1] - 9 + Math.round(Math.sin(e.t * 4) * 1), col, 1);
    });
    // города
    used.forEach(kk => { const p = P(kk); disc(p[0], p[1], 2, '#0b0a18'); disc(p[0], p[1], 1, '#f6ecd9'); const al = CITY[kk][0] < 0.2 ? 'left' : CITY[kk][0] > 0.8 ? 'right' : 'center'; const lx = al === 'left' ? p[0] - 2 : al === 'right' ? p[0] + 3 : p[0]; const c = A.ctx; c.font = '8px "Press Start 2P", monospace'; const wd = Math.ceil(c.measureText(CITY[kk][2]).width); const bx = al === 'left' ? lx - 1 : al === 'right' ? lx - wd - 1 : lx - wd / 2 - 1; r(bx, p[1] + CITY[kk][3] - 1, wd + 2, 10, '#0b0a18cc'); txt(lx, p[1] + CITY[kk][3], CITY[kk][2], '#f6ecd9', 8, al); });
    A.vignette(W, H, 0.3);
  };
})();

// ===== Подробная карта (отдельный слой высокого разрешения) =====
(() => {
  const LAND = [[5,62],[12,66],[20,70],[28,71],[40,67],[44,68],[55,69],[60,70],[68,69],[73,72],[80,73],[95,76],[105,77.5],[113,74],[125,73],[135,72],[140,73],[150,71],[160,70],[170,69.5],[180,66],[177,62],[170,60],[163,58],[162,55],[156,51],[156,57],[162,60],[155,59],[143,59],[138,54],[140,48],[135,44],[132,43],[129,41],[127,39.5],[129,36],[126.5,34.5],[126,37],[124.5,40],[121,39],[118,39],[122,37],[120,35],[121.5,31.5],[122,30],[120,27],[117,23.5],[113,22],[108.5,21.5],[106.5,19],[108.5,15],[109,11.5],[105,9],[103,13],[100,13],[101,7],[103.5,1.5],[100,6],[98,9],[98,16],[94,18],[91.5,22],[88,21.5],[85,19],[80,15],[77.5,8],[73,17],[72,21],[67,24.5],[61,25],[57,26],[56,27],[50,30],[48,30],[51,25],[56,24],[59,22],[55,17],[45,13],[43,15],[39,21],[35,28],[32,31],[34,35.5],[36,36.5],[31,36.5],[27,37],[26.5,40],[29,41],[41,41],[41.5,43],[37.5,45],[33,46],[30.5,46],[28,43],[26,40.5],[23,40],[23,37],[20,39.5],[14,45],[12,44],[16,41],[18,40],[15.5,38],[12,42],[8,44],[3,43],[0,39],[-5,36],[-9,37],[-9,43],[-1.5,43.5],[-1,46],[-4.5,48],[2,51],[8,54],[9,57],[12,54],[21,54.5],[21,57],[24,58],[30,60],[23,60],[21.5,63],[25,65.5],[22,65.5],[17,61],[18,59],[16,56],[12.5,56],[11,59],[5.5,59]];
  const ISLES = [[[130.5,33.5],[133,35.5],[137,37.5],[140,39.5],[141,41.5],[142,39.5],[141,36],[138,34.5],[135,33.5],[132,33]], [[140,42],[141.5,45.5],[145.5,43.5],[143,42]], [[142,46],[142,54],[143.5,53],[143.5,49],[143,46]], [[120.2,22],[121.8,25],[121,22]], [[-5,50],[1,51],[0,54],[-3,58.5],[-6,57],[-3,54],[-5,52]], [[108.7,18.3],[110.5,20],[111,18.8],[109.5,18.2]]];
  const SEAS = [[[47,45],[51,47],[53,45],[53,42],[54,37],[50,37],[49,41],[47,43]], [[58.5,43.5],[61.5,46.5],[61,44],[59.5,43.5]], [[104,51.5],[109.5,55.7],[110,54.5],[106,51.6]], [[74,45],[79,46.6],[79,46],[74.5,44.8]]];
  const MTN = [[60,52],[60,56],[59,60],[60,64],[88,49],[92,51],[86,46],[80,42],[84,29],[88,28],[92,29],[78,35],[72,37],[44,42.5],[46,41.5],[10,46.5],[13,47],[100,52],[110,56],[120,58],[135,63],[150,64],[160,66],[102,30],[104,34],[25,46],[76,40]];
  const CITY = { spb: [30.3, 59.9, 'Санкт-Петербург', 1, -1], msk: [37.6, 55.75, 'Москва', 1, 1], kgd: [20.5, 54.7, 'Калининград', 1, 1], vl: [131.9, 43.1, 'Владивосток', -1, -1], bj: [116.4, 39.9, 'Пекин', -1, 1], sh: [121.5, 31.2, 'Шанхай', -1, 1], alm: [76.9, 43.2, 'Алма-Ата', 1, 1] };
  const MINOR = [[37.6, 55.75, 'Москва'], [60.6, 56.8, 'Екатеринбург'], [82.9, 55, 'Новосибирск'], [104.3, 52.3, 'Иркутск'], [135.1, 48.5, 'Хабаровск'], [132, 43.8, ''], [139.7, 35.7, 'Токио']];
  SCENES.mapHi = (cv, o, t) => {
    const b = cv.getBoundingClientRect(); if (!b.width) return; const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = Math.round(b.width * dpr), H = Math.round(b.height * dpr); if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    const g = cv.getContext('2d'); const tt = t - (o.tHi || (o.tHi = t));
    const portrait = H > W * 0.9, usable = portrait ? 0.94 : 0.76;      // внизу в альбомной ориентации лежит окно с текстом
    const lon0 = 6, lon1 = 152, lat0 = 14, lat1 = 74, k = Math.cos(50 * Math.PI / 180);
    const sc = Math.min(W / ((lon1 - lon0) * k), (H * usable) / (lat1 - lat0)), ox = (W - (lon1 - lon0) * k * sc) / 2, oy = H * (portrait ? 0.03 : 0.06);
    const X = lon => ox + (lon - lon0) * k * sc, Y = lat => oy + (lat1 - lat) * sc, u = Math.max(1, Math.round(sc / 4.2));
    // море
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#12224a'); gr.addColorStop(1, '#0c1736'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = '#1a2d5c'; for (let lon = 10; lon <= 150; lon += 10) for (let lat = 16; lat <= 74; lat += 2) g.fillRect(Math.round(X(lon)), Math.round(Y(lat)), u, u);
    for (let lat = 20; lat <= 70; lat += 10) for (let lon = 6; lon <= 152; lon += 2) g.fillRect(Math.round(X(lon)), Math.round(Y(lat)), u, u);
    const poly = (pts, fill, stroke) => { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(X(p[0]), Y(p[1])) : g.moveTo(X(p[0]), Y(p[1]))); g.closePath(); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = u * 1.5; g.lineJoin = 'round'; g.stroke(); } };
    // суша с береговой тенью
    g.save(); g.translate(0, u * 2); poly(LAND, '#0a122b'); ISLES.forEach(p => poly(p, '#0a122b')); g.restore();
    poly(LAND, '#2c6b57', '#7fd0a8'); ISLES.forEach(p => poly(p, '#2c6b57', '#7fd0a8'));
    // текстура суши: точки, зоны
    g.save(); g.beginPath(); LAND.forEach((p, i) => i ? g.lineTo(X(p[0]), Y(p[1])) : g.moveTo(X(p[0]), Y(p[1]))); g.closePath(); g.clip();
    g.fillStyle = '#3a8068'; for (let i = 0; i < 900; i++) { const lon = lon0 + A.rnd(i) * (lon1 - lon0), lat = 40 + A.rnd(i + 2000) * 34; g.fillRect(Math.round(X(lon)), Math.round(Y(lat)), u, u); }
    g.fillStyle = '#8a8a4e55'; g.fillRect(X(50), Y(48), X(118) - X(50), Y(36) - Y(48));           // степи и пустыни
    g.fillStyle = '#c9b46a44'; g.fillRect(X(36), Y(32), X(60) - X(36), Y(14) - Y(32)); g.fillRect(X(76), Y(44), X(108) - X(76), Y(37) - Y(44));
    g.fillStyle = '#dfeee866'; g.fillRect(X(6), Y(74), X(152) - X(6), Y(69) - Y(74));             // север
    g.restore();
    SEAS.forEach(p => poly(p, '#12224a', '#7fd0a8'));
    // горы
    MTN.forEach((m, i) => { const x = Math.round(X(m[0])), y = Math.round(Y(m[1])); g.fillStyle = '#1f4f41'; g.beginPath(); g.moveTo(x - u * 3, y + u * 2); g.lineTo(x, y - u * 3); g.lineTo(x + u * 3, y + u * 2); g.fill(); g.fillStyle = '#e6f2ee'; g.fillRect(x - u / 2, y - u * 3, u, u); });
    // реки
    g.strokeStyle = '#3f86c9aa'; g.lineWidth = u; const river = pts => { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(X(p[0]), Y(p[1])) : g.moveTo(X(p[0]), Y(p[1]))); g.stroke(); };
    river([[47, 46], [45, 49], [49, 53], [44, 56], [36, 57]]); river([[73, 68], [69, 61], [75, 57], [83, 54]]); river([[83, 71], [87, 62], [93, 56], [104, 53]]); river([[127, 72], [124, 64], [118, 60], [108, 57]]); river([[141, 53], [135, 48.5], [127, 50], [120, 53]]); river([[121.5, 31.5], [112, 30.5], [104, 29], [98, 33]]); river([[119, 37.5], [112, 35], [108, 38], [101, 36]]);
    // малые города
    g.font = Math.round(sc * 1.7) + 'px Handjet, monospace'; g.textBaseline = 'middle';
    MINOR.forEach(m => { if (!m[2]) return; const x = X(m[0]), y = Y(m[1]); g.fillStyle = '#0a122b'; g.fillRect(x - u, y - u, u * 2, u * 2); g.fillStyle = '#a8c8bc'; g.textAlign = 'left'; g.fillText(m[2], x + u * 3, y); });
    // маршруты
    const routes = o.routes || [], used = new Set(['spb', 'vl']); routes.forEach(r => { used.add(r[0]); used.add(r[1]); });
    routes.forEach((rt, i) => {
      const a = CITY[rt[0]], c = CITY[rt[1]], ax = X(a[0]), ay = Y(a[1]), bx = X(c[0]), by = Y(c[1]), col = rt[2] === 'o' ? '#ff7aa8' : rt[2] === 'both' ? '#ffd166' : '#6fb7ff';
      const shr = o.shrink ? Math.max(0, Math.min(1, (tt - 1.1) / 3.4)) : 0, kk = o.shrink ? 1 : Math.max(0, Math.min(1, (tt - 0.5 - i * 0.6) / 2.6)), hgt = Math.min(H * 0.2, Math.abs(bx - ax) * 0.2 + sc * 2) * (i % 2 ? 1 : 1);
      const pt = v => [ax + (bx - ax) * v, ay + (by - ay) * v - Math.sin(v * Math.PI) * hgt];
      g.fillStyle = col; for (let s = Math.floor(90 * shr * shr * (3 - 2 * shr)); s <= 90 * kk; s++) { if (s % 3 === 2) continue; const q = pt(s / 90); g.fillRect(Math.round(q[0] - u), Math.round(q[1] - u), u * 2, u * 2); }
      if (kk > 0 && kk < 1) { const q = pt(kk), q2 = pt(Math.min(1, kk + 0.02)), ang = Math.atan2(q2[1] - q[1], q2[0] - q[0]); g.save(); g.translate(q[0], q[1]); g.rotate(ang); g.fillStyle = '#00000040'; g.beginPath(); g.ellipse(u * 0.6, u * 3.2, u * 6.4, u * 1.1, 0, 0, 7); g.fill(); g.fillStyle = '#d4d8e0'; g.beginPath(); g.moveTo(u * 1.8, -u * 0.5); g.lineTo(-u * 1.8, -u * 6.2); g.lineTo(-u * 3.4, -u * 6.2); g.lineTo(-u * 1.8, -u * 0.5); g.fill(); g.beginPath(); g.moveTo(u * 1.8, u * 0.5); g.lineTo(-u * 1.8, u * 6.2); g.lineTo(-u * 3.4, u * 6.2); g.lineTo(-u * 1.8, u * 0.5); g.fill(); g.fillStyle = '#f6f2ea'; g.beginPath(); g.moveTo(u * 7, 0); g.quadraticCurveTo(u * 6.8, -u * 1.3, u * 5, -u * 1.3); g.lineTo(-u * 5.4, -u * 1); g.lineTo(-u * 6.6, 0); g.lineTo(-u * 5.4, u * 1); g.lineTo(u * 5, u * 1.3); g.quadraticCurveTo(u * 6.8, u * 1.3, u * 7, 0); g.fill(); g.beginPath(); g.moveTo(-u * 4.2, -u * 1); g.lineTo(-u * 6.4, -u * 3); g.lineTo(-u * 5.4, -u * 3); g.lineTo(-u * 3.2, -u * 1); g.fill(); g.beginPath(); g.moveTo(-u * 4.2, u * 1); g.lineTo(-u * 6.4, u * 3); g.lineTo(-u * 5.4, u * 3); g.lineTo(-u * 3.2, u * 1); g.fill(); g.fillStyle = '#3a5a8a'; for (let k = 0; k < 5; k++) g.fillRect(u * (3.4 - k * 1.7), -u * 0.5, u * 0.7, u * 0.5); g.fillStyle = '#3a5a8a'; g.fillRect(u * 5, -u * 0.6, u * 1, u * 0.9); g.fillStyle = col; g.fillRect(-u * 5.6, -u * 0.2, u * 11, u * 0.3); g.restore(); }
      if (o.shrink) { const km = Math.round(9000 * (1 - shr * shr * (3 - 2 * shr))), mx = (ax + bx) / 2, my = Math.min(ay, by) - sc * 3; g.font = '600 ' + Math.round(sc * 3.4) + 'px Handjet, monospace'; g.textAlign = 'center'; const lab = km + ' км', wd = g.measureText(lab).width; g.fillStyle = '#0a122bdd'; g.fillRect(mx - wd / 2 - u * 3, my - sc * 1.9, wd + u * 6, sc * 3.8); g.fillStyle = km ? col : '#ffd166'; g.fillText(lab, mx, my); if (shr >= 1) { g.globalAlpha = 0.35 + 0.25 * Math.sin(t * 5); g.fillStyle = '#ffd166'; g.beginPath(); g.arc(bx, by, u * 11, 0, 7); g.fill(); g.globalAlpha = 1; } }
      if (kk >= 1) { const hy = by - u * 9 + Math.sin(t * 4) * u; g.fillStyle = col; g.fillRect(bx - u * 3, hy - u * 2, u * 2.6, u * 3); g.fillRect(bx + u * 0.4, hy - u * 2, u * 2.6, u * 3); g.beginPath(); g.moveTo(bx - u * 3, hy + u); g.lineTo(bx + u * 3, hy + u); g.lineTo(bx, hy + u * 4.5); g.fill(); }
    });
    // главные города
    const fs = Math.round(sc * 2.5); g.font = '600 ' + fs + 'px Handjet, monospace';
    used.forEach(key => { const c = CITY[key], x = X(c[0]), y = Y(c[1]); const pulse = 1 + 0.25 * Math.sin(t * 3 + c[0]);
      g.globalAlpha = 0.3; g.fillStyle = '#ffd166'; g.beginPath(); g.arc(x, y, u * 5 * pulse, 0, 7); g.fill(); g.globalAlpha = 1;
      g.fillStyle = '#0a122b'; g.fillRect(x - u * 2.5, y - u * 2.5, u * 5, u * 5); g.fillStyle = '#ffd166'; g.fillRect(x - u * 1.5, y - u * 1.5, u * 3, u * 3);
      g.textAlign = c[3] > 0 ? 'left' : 'right'; const lx = x + c[3] * u * 5, ly = y + c[4] * fs * 0.75; const wd = g.measureText(c[2]).width;
      g.fillStyle = '#0a122bdd'; g.fillRect(c[3] > 0 ? lx - u * 2 : lx - wd - u * 2, ly - fs * 0.55, wd + u * 4, fs * 1.1); g.fillStyle = '#f6ecd9'; g.fillText(c[2], lx, ly); });
  };
  // под слоем карты обычный холст просто тёмный
  SCENES.map = (e) => { A.r(0, 0, e.W, e.H, '#0c1736'); };
})();
