// ===== Сцены: фон (bg) + предметы (props) + погода (fx) =====
const SCENES = (() => {
  const { r, px, rnd, disc, box } = A;
  const ln = (x0, y0, x1, y1, col) => { x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1); const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let e = dx - dy; for (let i = 0; i < 600; i++) { px(x0, y0, col); if (x0 === x1 && y0 === y1) break; const e2 = e * 2; if (e2 > -dy) { e -= dy; x0 += sx; } if (e2 < dx) { e += dx; y0 += sy; } } };
  const txt = (x, y, s, col, size = 8, align = 'left') => { const c = A.ctx; c.font = size + 'px "Press Start 2P", monospace'; c.textAlign = align; c.textBaseline = 'top'; c.fillStyle = col; c.fillText(s, Math.round(x), Math.round(y)); };
  const alpha = (a, f) => { const c = A.ctx; c.globalAlpha = a; f(); c.globalAlpha = 1; };

  const SKY = {
    day: ['#7fb8e6', '#9dcbec', '#bfe0f2', '#e2f1f6'],
    spring: ['#6fb3ea', '#93c9f0', '#bfe3f5', '#eaf6f4'],
    eve: ['#2b2a5c', '#5a3d7a', '#b0527a', '#f08a6b', '#ffc98a'],
    night: ['#0c0b20', '#12112e', '#1a1a40', '#24265a'],
    dawn: ['#3b4a8a', '#7a6aa8', '#d58aa0', '#ffc7a0'],
    fog: ['#aeb7c2', '#bcc4cc', '#c9cfd4', '#d9dde0'],
    white: ['#b9c6d6', '#c9d4e0', '#dbe3ea', '#eef2f4'],
    summer: ['#4aa3e8', '#77bdf0', '#a8d8f5', '#d9f0f7'],
    gold: ['#3d5a9a', '#8f7ab0', '#e8a08a', '#ffd9a0'],
  };
  const dark = t => t === 'night' || t === 'eve';

  // ---------- фоны ----------
  const BG = {
    black(e) { r(0, 0, e.W, e.H, '#0b0a18'); },
    // Владивосток: сопки, залив, мост, панельки
    city(e) {
      const o = e.o, t = o.time || 'day', W = e.W, H = e.H, GY = e.GY, cam = e.cam;
      A.sky(W, H, SKY[t], 96);
      if (t === 'night') { A.stars(W, H, cam, e.t, 50, 60); disc(W - 40, 22, 7, '#f3efd6'); disc(W - 37, 20, 6, SKY.night[1]); }
      if (t === 'eve') disc(Math.round(W * 0.7 - cam * 0.02), 80, 10, '#ffe2a8');
      if (t === 'day' || t === 'spring' || t === 'summer') { disc(40, 20, 7, '#fff6cf'); cloud(60 - cam * 0.03, 30, e.t); cloud(190 - cam * 0.03, 18, e.t + 9); cloud(330 - cam * 0.03, 34, e.t + 3); }
      const far = { day: '#9db4cf', spring: '#8fb3c4', summer: '#6fa88c', eve: '#4a3766', night: '#17173a', dawn: '#6a6a9c', fog: '#b4bcc6', white: '#c3ccd8', gold: '#6d5f95' }[t];
      const mid = { day: '#7f96b6', spring: '#6f9aa0', summer: '#4f8f6c', eve: '#33284f', night: '#101030', dawn: '#52527f', fog: '#a3acb8', white: '#aab5c4', gold: '#4f4576' }[t];
      A.hills(W, cam, 0.08, 88, 14, far, 1, H);
      if (o.sea !== false) {
        const sc = { day: ['#5d8fc0', '#86b3d9', '#c9e2f2'], spring: ['#4f93c4', '#7fb9dd', '#d3ecf5'], summer: ['#2f86c9', '#5aa8e0', '#bfe6f7'], eve: ['#5a3f77', '#c46a80', '#ffb98a'], night: ['#12123a', '#262a66', '#5a62a8'], dawn: ['#55609a', '#b98aa8', '#ffd0b0'], fog: ['#a9b2bd', '#bfc7cf', '#d6dbe0'], white: ['#c8d2de', '#dfe6ec', '#f4f7f9'], gold: ['#5a5a9a', '#d59a9a', '#ffe0b0'] }[t];
        A.sea(W, 90, 12, o.ice ? ['#dfe8f0', '#ffffff', '#c3d2e2'] : sc, o.ice ? 0 : e.t, cam * 0.3);
      }
      if (o.bridge) bridge(Math.round((o.bridge === true ? 150 : o.bridge) - cam * 0.12), 90, dark(t) ? '#0e0e2a' : '#5f7594', dark(t));
      A.hills(W, cam, 0.2, 100, 9, mid, 4, H);
      if (dark(t)) for (let i = 0; i < 46; i++) { const x = ((rnd(i) * 520 - cam * 0.2) % (W + 40) + W + 40) % (W + 40) - 20; px(x, 88 + rnd(i + 30) * 12, rnd(i + 7) < 0.5 ? '#ffd98a' : '#ffb26b'); }
      const bc = { day: '#6c7c99', spring: '#69809a', summer: '#5c7a8c', eve: '#261f40', night: '#0b0b24', dawn: '#42426b', fog: '#929ba8', white: '#98a4b4', gold: '#3a3360' }[t];
      const wc = dark(t) || t === 'dawn' ? '#ffd98a' : (t === 'fog' || t === 'white' ? '#c9d2dc' : '#b9d0e6');
      if (o.skyline !== false) A.skyline(W, cam, 0.45, GY - 3, bc, wc, 2, 16, o.tall || 44, dark(t) ? 0.4 : 0.25);
      groundFor(e);
    },
    // берег, маяк, лёд
    shore(e) {
      const o = e.o, t = o.time || 'day', W = e.W, H = e.H, GY = e.GY, cam = e.cam;
      A.sky(W, H, SKY[t], 84);
      if (t === 'day' || t === 'white') { disc(W - 50, 24, 8, '#fffbe0'); alpha(0.25, () => disc(W - 50, 24, 13, '#fffbe0')); }
      if (t === 'eve' || t === 'gold') disc(Math.round(W * 0.35), 74, 11, '#ffe2a8');
      A.hills(W, cam, 0.05, 82, 8, dark(t) ? '#3a2d5c' : '#9fb6d0', 7, 90);
      A.hills(W, cam, 0.1, 86, 5, dark(t) ? '#2c2348' : '#8aa2c0', 3, 90);
      if (o.ice) { r(0, 84, W, H - 84, '#e6eef5'); for (let i = 0; i < 50; i++) { const x = ((rnd(i) * 700 - cam * (0.3 + rnd(i + 2) * 0.5)) % (W + 30) + W + 30) % (W + 30) - 15, y = 86 + rnd(i + 5) * (GY - 88); r(x, y, 4 + rnd(i + 9) * 14, 1, i % 3 ? '#c9d8e6' : '#ffffff'); } }
      else A.sea(W, 84, GY - 84, t === 'eve' || t === 'gold' ? ['#6a4a85', '#d37a86', '#ffc59a'] : ['#4f86bd', '#7fb0db', '#d5eaf6'], e.t, cam * 0.4);
      if (o.ice) { r(0, GY, W, H - GY, '#f3f7fa'); r(0, GY, W, 1, '#ffffff'); for (let i = 0; i < 26; i++) { const x = ((rnd(i + 80) * 500 - cam) % (W + 40) + W + 40) % (W + 40) - 20; ln(x, GY + 3 + rnd(i) * 18, x + 8 + rnd(i + 3) * 14, GY + 4 + rnd(i + 1) * 18, '#bcd0e2'); } }
      else groundFor(e);
    },
    room(e) {
      const o = e.o, W = e.W, H = e.H, GY = e.GY, cam = e.cam;
      const wall = o.wall || '#3b3660', wall2 = o.wall2 || shade(wall, -14), floor = o.floor || '#6b4a34';
      r(0, 0, W, GY, wall);
      if (o.stripes) for (let x = -(cam % 16); x < W; x += 16) r(x, 0, 1, GY, wall2);
      if (o.panel) { r(0, GY - 30, W, 30, wall2); r(0, GY - 31, W, 1, shade(wall, 18)); }
      r(0, GY - 3, W, 3, shade(floor, -30));
      r(0, GY, W, H - GY, floor);
      for (let x = -(cam % 24); x < W; x += 24) r(x, GY, 1, H - GY, shade(floor, -18));
      r(0, GY, W, 1, shade(floor, 24));
      if (o.dim) alpha(o.dim, () => r(0, 0, W, H, '#07061a'));
    },
    aqua(e) {
      const W = e.W, H = e.H, GY = e.GY;
      r(0, 0, W, H, '#07102a'); r(0, GY, W, H - GY, '#0d1836'); r(0, GY, W, 1, '#1d3a6b');
      for (let i = 0; i < 20; i++) { const x = ((rnd(i) * 400 - e.cam * 0.2) % W + W) % W; alpha(0.05, () => r(x, 0, 10 + rnd(i + 4) * 20, GY, '#5fd0ff')); }
    },
    sky(e) { // над облаками
      const W = e.W, H = e.H, t = e.o.time || 'day';
      A.sky(W, H, SKY[t], H);
      if (t === 'night') A.stars(W, H, e.cam, e.t, 70, H);
      for (let i = 0; i < 9; i++) cloud(((i * 70 - e.t * (6 + i % 3 * 4) - e.cam * 0.2) % (W + 120) + W + 120) % (W + 120) - 60, 70 + (i % 4) * 16, i, t === 'night' ? '#2c2f66' : t === 'eve' ? '#ffd2b0' : '#ffffff');
    },
    // Петербург: набережная, купол, шпиль
    piter(e) {
      const o = e.o, t = o.time || 'day', W = e.W, H = e.H, GY = e.GY, cam = e.cam;
      A.sky(W, H, SKY[t === 'day' ? 'white' : t], 96);
      if (t === 'night') A.stars(W, H, cam, e.t, 30, 50);
      const sil = dark(t) ? '#191838' : '#8794a8';
      // дальний берег с куполом и шпилем
      const bx = -cam * 0.15;
      for (let i = -1; i < 12; i++) { const x = bx + i * 46, h = 12 + Math.floor(rnd(i + 20) * 7); r(x, 90 - h, 44, h, sil); if (dark(t)) for (let k = 0; k < 9; k++) if (rnd(i * 9 + k) < 0.5) px(x + 3 + k * 4, 90 - h + 4, '#ffd98a'); }
      const dx = bx + 150; disc(dx, 70, 8, sil); r(dx - 8, 70, 17, 20, sil); r(dx, 56, 1, 7, dark(t) ? '#ffd98a' : '#d9b860'); r(dx - 12, 80, 25, 10, sil); disc(dx, 70, 6, dark(t) ? '#24244c' : '#b89a4a');
      const sx = bx + 330; r(sx - 5, 76, 10, 14, sil); for (let k = 0; k < 22; k++) px(sx, 54 + k, dark(t) ? '#ffd98a' : '#d9b860'); r(sx - 1, 66, 3, 10, sil);
      A.sea(W, 90, 14, dark(t) ? ['#141440', '#2a2e6c', '#ffd98a'] : t === 'eve' || t === 'gold' ? ['#5c4a80', '#c9808a', '#ffd0a0'] : ['#7f93aa', '#a3b4c6', '#dbe4ec'], e.t, cam * 0.3);
      // парапет
      r(0, 103, W, GY - 103, dark(t) ? '#2a2948' : '#8d8f9a'); r(0, 102, W, 2, dark(t) ? '#3a3960' : '#b3b5bd');
      for (let x = -(cam % 14); x < W; x += 14) { r(x, 96, 2, 7, dark(t) ? '#0e0e24' : '#3a3d4a'); } r(0, 96, W, 1, dark(t) ? '#0e0e24' : '#3a3d4a'); r(0, 99, W, 1, dark(t) ? '#0e0e24' : '#3a3d4a');
      r(0, GY, W, H - GY, dark(t) ? '#23223f' : '#9a9aa6'); r(0, GY, W, 1, dark(t) ? '#3a3960' : '#c2c2cc');
      for (let x = -(cam % 20); x < W; x += 20) r(x, GY + 1, 1, H - GY, dark(t) ? '#1a1932' : '#85858f');
    },
    // улица Петербурга с фасадами
    piterStreet(e) {
      const o = e.o, t = o.time || 'day', W = e.W, H = e.H, GY = e.GY, cam = e.cam;
      A.sky(W, H, SKY[t === 'day' ? 'white' : t], 70);
      const cols = dark(t) ? ['#3b3558', '#4a3f5e', '#35405c', '#4d3a50'] : ['#e3c98f', '#d9a98f', '#b9c7b0', '#e9dcc0', '#c9b0c4'];
      const first = Math.floor(cam * 0.8 / 70) - 1;
      for (let i = first; i < first + W / 70 + 3; i++) {
        const x = i * 70 - cam * 0.8, h = 70 + Math.floor(rnd(i + 3) * 18), c = cols[((i % cols.length) + cols.length) % cols.length];
        r(x, GY - h, 69, h, c); r(x, GY - h, 69, 2, shade(c, -30)); r(x, GY - h - 2, 69, 2, shade(c, 20));
        for (let fy = GY - h + 8; fy < GY - 22; fy += 16) for (let fx = 6; fx < 62; fx += 13) { const lit = dark(t) && rnd(i * 31 + fx + fy) < 0.5; r(x + fx - 1, fy - 1, 8, 11, shade(c, 26)); r(x + fx, fy, 6, 9, lit ? '#ffd98a' : dark(t) ? '#1c1c38' : '#5b6f88'); r(x + fx + 3, fy, 1, 9, shade(c, -40)); }
        r(x, GY - 18, 69, 1, shade(c, -30));
        if (i % 2 === 0) { r(x + 28, GY - 16, 12, 16, shade(c, -55)); disc(x + 34, GY - 16, 6, shade(c, -55)); }
      }
      r(0, GY, W, H - GY, dark(t) ? '#23223f' : '#8f8f9b'); r(0, GY, W, 1, dark(t) ? '#3a3960' : '#bdbdc8');
      for (let x = -(cam % 20); x < W; x += 20) r(x, GY + 1, 1, H - GY, dark(t) ? '#1a1932' : '#7d7d89');
    },
  };
  function groundFor(e) {
    const o = e.o, t = o.time || 'day', W = e.W, H = e.H, GY = e.GY, g = o.ground || 'snow';
    const d = dark(t);
    if (g === 'snow') A.ground(W, GY, H, d ? '#8f9ac4' : '#eef3f8', d ? '#b9c2e4' : '#ffffff', e.cam, d ? '#7783b0' : '#d3deea');
    else if (g === 'road') A.ground(W, GY, H, d ? '#25243f' : '#7c8191', d ? '#3b3a5e' : '#a3a8b6', e.cam, d ? '#1c1b33' : '#6a6f7f');
    else if (g === 'grass') A.ground(W, GY, H, d ? '#1f3d3a' : '#5fae6a', d ? '#2f5a50' : '#8fd08a', e.cam, d ? '#18302e' : '#4a9458');
    else if (g === 'sand') A.ground(W, GY, H, '#e6cf9a', '#f5e6bd', e.cam, '#cdb47c');
    else if (g === 'plat') { A.ground(W, GY, H, d ? '#3a3a55' : '#a6a8b4', d ? '#55557a' : '#d0d2da', e.cam, null); for (let x = -(e.cam % 12); x < W; x += 12) r(x, GY + 2, 6, 1, '#ffd166'); }
  }
  function cloud(x, y, seed, col = '#ffffff') { x = Math.round(x); r(x, y, 22, 4, col); r(x + 4, y - 3, 12, 3, col); r(x + 8, y - 5, 6, 2, col); r(x - 4, y + 2, 30, 2, col); }
  function bridge(x, y, col, lights) { // Золотой мост: два V-пилона и ванты
    for (const px0 of [x, x + 70]) { ln(px0 - 3, y, px0, y - 38, col); ln(px0 + 3, y, px0, y - 38, col); ln(px0 - 2, y, px0 + 1, y - 38, col); for (let k = 1; k < 7; k++) { ln(px0, y - 38 + k * 2, px0 - k * 5, y - 5, col); ln(px0, y - 38 + k * 2, px0 + k * 5, y - 5, col); } if (lights) px(px0, y - 39, '#ff5c5c'); }
    r(x - 50, y - 5, 170, 2, col);
    if (lights) for (let k = 0; k < 17; k++) px(x - 48 + k * 10, y - 6, '#ffd98a');
  }
  function shade(hex, d) { const n = parseInt(hex.slice(1), 16); const c = v => Math.max(0, Math.min(255, v + d)); return '#' + [c(n >> 16), c((n >> 8) & 255), c(n & 255)].map(v => v.toString(16).padStart(2, '0')).join(''); }

  // ---------- предметы (x — мировая координата, уже минус камера; gy — земля) ----------
  const P = {
    lamp: (x, gy, p, e) => A.lamp(x, gy, !!(dark(e.o.time) || e.o.time === 'dawn' || p.on)),
    tree: (x, gy, p, e) => A.tree(x, gy, p.kind || 'bare', 1, p.pal || (p.kind ? null : ['#2b2238', e.o.ground === 'snow' ? '#ffffff' : null])),
    pine: (x, gy, p) => A.tree(x, gy, 'pine', 1, ['#1f4a3a', '#2f6b4f', p.snow === false ? null : '#ffffff']),
    bench: (x, gy) => A.bench(x, gy),
    snowpile: (x, gy, p) => { disc(x, gy + 2, p.s || 7, '#ffffff'); disc(x + 8, gy + 3, (p.s || 7) - 2, '#e8eff6'); },
    building(x, gy, p, e) { const w = p.w || 60, h = p.h || 70, c = p.col || '#7a6a8a', d = dark(e.o.time); r(x, gy - h, w, h, c); r(x, gy - h, w, 2, shade(c, 25)); r(x + w - 2, gy - h, 2, h, shade(c, -25)); for (let wy = gy - h + 7; wy < gy - 16; wy += 13) for (let wx = 5; wx < w - 8; wx += 11) A.windowLit(x + wx, wy, 7, 8, d ? rnd(p.x + wx * 3 + wy) < 0.55 : false, shade(c, -45), '#ffd98a', d ? '#1b1b38' : '#9db7d1'); if (p.door !== false) { r(x + (p.doorX || w / 2 - 5), gy - 15, 10, 15, shade(c, -55)); px(x + (p.doorX || w / 2 - 5) + 7, gy - 7, '#ffd166'); } if (p.sign) { box(x + 4, gy - 27, w - 8, 10, p.signBg || '#14122b', '#f6ecd9'); txt(x + w / 2, gy - 26, p.sign, p.signFg || '#ffd166', 8, 'center'); } },
    theatre(x, gy, p, e) { const d = dark(e.o.time); r(x, gy - 62, 120, 62, '#d9cdb8'); r(x - 4, gy - 66, 128, 5, '#efe6d2'); for (let i = 0; i < 6; i++) { r(x + 8 + i * 20, gy - 60, 5, 60, '#f6efe0'); r(x + 7 + i * 20, gy - 61, 7, 2, '#ffffff'); } r(x + 46, gy - 26, 28, 26, '#4a2e2a'); r(x + 59, gy - 26, 1, 26, '#2b1a18'); for (let i = 0; i < 5; i++) A.windowLit(x + 15 + i * 20 + (i > 1 ? 0 : 0), gy - 48, 9, 12, d, '#8a7a66'); ln(x - 4, gy - 66, x + 60, gy - 84, '#efe6d2'); ln(x + 124, gy - 66, x + 60, gy - 84, '#efe6d2'); for (let k = 0; k < 18; k++) r(x - 4 + k * 3.5, gy - 66 - k, 128 - k * 7, 1, '#e6dcc6'); box(x + 36, gy - 40, 48, 11, '#7a1f2e', '#ffd166'); txt(x + 60, gy - 38, 'ТЕАТР', '#ffd166', 8, 'center'); },
    poster(x, gy, p) { box(x, gy - 34, 16, 22, p.col || '#7a1f2e', '#f6ecd9'); r(x + 3, gy - 30, 10, 8, p.c2 || '#ffd166'); r(x + 3, gy - 20, 10, 1, '#f6ecd9'); r(x + 3, gy - 17, 7, 1, '#f6ecd9'); },
    door(x, gy, p) { box(x, gy - 34, 18, 34, p.col || '#5a3d2e', '#2b1a18'); r(x + 3, gy - 30, 12, 11, shade(p.col || '#5a3d2e', 14)); r(x + 3, gy - 16, 12, 12, shade(p.col || '#5a3d2e', 14)); px(x + 14, gy - 17, '#ffd166'); },
    window(x, gy, p, e) { const n = p.night !== undefined ? p.night : dark(e.o.time); box(x, gy - 62, 30, 26, n ? '#141440' : '#9dcbec', '#efe6d2'); r(x + 14, gy - 61, 2, 24, '#efe6d2'); r(x + 1, gy - 50, 28, 1, '#efe6d2'); if (n) { px(x + 5, gy - 56, '#fff'); px(x + 22, gy - 44, '#fff'); px(x + 9, gy - 43, '#ffd98a'); } else { r(x + 3, gy - 42, 24, 5, '#dfeaf2'); } r(x - 2, gy - 36, 34, 2, '#efe6d2'); if (p.curtain) { r(x - 3, gy - 64, 6, 30, p.curtain); r(x + 27, gy - 64, 6, 30, p.curtain); } },
    sofa(x, gy, p) { const c = p.col || '#7a4a6a'; r(x, gy - 18, 40, 10, shade(c, -18)); r(x - 2, gy - 12, 44, 10, c); r(x - 3, gy - 15, 5, 13, shade(c, -10)); r(x + 38, gy - 15, 5, 13, shade(c, -10)); r(x, gy - 2, 3, 2, '#2b1a18'); r(x + 37, gy - 2, 3, 2, '#2b1a18'); r(x + 2, gy - 12, 36, 1, shade(c, 24)); },
    bed(x, gy, p) { const c = p.col || '#8a5a7a'; r(x, gy - 8, 50, 6, '#5a3d2e'); r(x, gy - 12, 50, 5, '#f1ead8'); r(x + 12, gy - 13, 38, 6, c); r(x + 1, gy - 15, 10, 4, '#ffffff'); r(x - 2, gy - 20, 3, 20, '#5a3d2e'); r(x + 49, gy - 12, 3, 12, '#5a3d2e'); },
    table(x, gy, p) { const c = p.col || '#8a6242'; r(x, gy - 13, p.w || 26, 2, c); r(x + 2, gy - 11, 2, 11, shade(c, -25)); r(x + (p.w || 26) - 4, gy - 11, 2, 11, shade(c, -25)); },
    chair(x, gy, p) { const c = p.col || '#6b4a34'; r(x, gy - 9, 8, 2, c); r(x + (p.flip ? 7 : 0), gy - 19, 1, 19, c); r(x + (p.flip ? 0 : 7), gy - 7, 1, 7, c); },
    cup(x, gy, p) { r(x, gy - 17, 4, 4, p.col || '#f6ecd9'); px(x + 4, gy - 16, p.col || '#f6ecd9'); if (Math.sin(Date.now() / 300 + x) > 0) px(x + 1, gy - 19, '#ffffff88'); else px(x + 2, gy - 20, '#ffffff88'); },
    plate(x, gy, p) { r(x, gy - 14, 8, 1, '#f6ecd9'); r(x + 1, gy - 16, 6, 2, p.col || '#e8b25a'); },
    stove(x, gy) { box(x, gy - 22, 22, 22, '#d9dde4', '#6a6f7f'); r(x + 3, gy - 12, 16, 9, '#2a2547'); r(x + 3, gy - 20, 4, 1, '#14122b'); r(x + 13, gy - 20, 4, 1, '#14122b'); r(x + 4, gy - 26, 10, 4, '#3a3d4a'); r(x + 14, gy - 25, 5, 1, '#3a3d4a'); },
    fridge(x, gy) { box(x, gy - 44, 20, 44, '#e6eaf0', '#8a90a0'); r(x + 1, gy - 28, 18, 1, '#8a90a0'); r(x + 16, gy - 38, 1, 6, '#8a90a0'); r(x + 16, gy - 24, 1, 8, '#8a90a0'); r(x + 4, gy - 40, 4, 4, '#ff7aa8'); r(x + 9, gy - 37, 3, 3, '#ffd166'); },
    shelf(x, gy, p) { box(x, gy - 46, 28, 46, '#6b4a34', '#3a2a22'); for (let k = 0; k < 3; k++) { r(x + 1, gy - 32 + k * 14, 26, 1, '#3a2a22'); for (let b = 0; b < 8; b++) r(x + 2 + b * 3, gy - 44 + k * 14 + (b % 3), 2, 11 - (b % 3), ['#e0457b', '#6fb7ff', '#ffd166', '#7ad6a0', '#b58cff', '#f6ecd9'][(b + k * 2) % 6]); } },
    plant(x, gy) { r(x, gy - 7, 8, 7, '#b5653a'); r(x + 3, gy - 16, 2, 9, '#2f6b4f'); disc(x + 1, gy - 15, 3, '#3f8a5f'); disc(x + 7, gy - 18, 3, '#3f8a5f'); disc(x + 4, gy - 21, 3, '#4fa672'); },
    tv(x, gy, p, e) { box(x, gy - 38, 34, 22, '#14122b', '#3a3d4a'); const f = Math.floor(e.t * 2) % 3; r(x + 2, gy - 36, 30, 18, p.col || ['#3d6bd6', '#5a7fe0', '#4a74db'][f]); if (p.film) { r(x + 6, gy - 30, 8, 8, '#ffd166'); r(x + 18, gy - 28, 10, 6, '#ffb26b'); } r(x + 14, gy - 16, 6, 3, '#3a3d4a'); r(x + 6, gy - 13, 22, 13, '#5a3d2e'); },
    screen(x, gy, p, e) { box(x, gy - 78, 110, 52, '#f6ecd9', '#14122b'); const f = Math.floor(e.t) % 2; r(x + 2, gy - 76, 106, 48, '#ffd166'); r(x + 2, gy - 44, 106, 16, '#e8a03a'); r(x + 30 + f, gy - 54, 34, 12, '#ffe98a'); r(x + 34 + f, gy - 60, 22, 6, '#ffe98a'); r(x + 36 + f, gy - 43, 5, 3, '#14122b'); r(x + 56 + f, gy - 43, 5, 3, '#14122b'); alpha(0.1, () => { for (let k = 0; k < 6; k++) ln(x + 55, gy - 52, x + 55 + (k - 3) * 40, gy, '#fff'); }); },
    seats(x, gy, p) { for (let i = 0; i < (p.n || 6); i++) { r(x + i * 14, gy - 16, 11, 12, p.col || '#7a1f2e'); r(x + i * 14, gy - 5, 11, 4, shade(p.col || '#7a1f2e', -20)); r(x + i * 14 - 1, gy - 9, 1, 8, '#2b1a18'); } },
    curtain(x, gy, p) { for (let i = 0; i < (p.w || 30); i += 5) { r(x + i, 0, 3, gy - 6, '#8a1f33'); r(x + i + 3, 0, 2, gy - 6, '#6a1626'); } r(x, 0, p.w || 30, 6, '#ffd166'); },
    chandelier(x, gy) { r(x, 0, 1, 14, '#ffd166'); r(x - 8, 14, 17, 2, '#ffd166'); for (let k = -8; k <= 8; k += 4) { px(x + k, 16, '#fff6cf'); px(x + k, 17, '#ffe9a8'); } alpha(0.1, () => disc(x, 16, 16, '#ffe9a8')); },
    counter(x, gy, p) { box(x, gy - 22, p.w || 46, 22, p.col || '#8a6242', '#3a2a22'); r(x - 1, gy - 24, (p.w || 46) + 2, 3, '#f6ecd9'); r(x + 6, gy - 34, 9, 10, '#3a3d4a'); r(x + 8, gy - 31, 5, 3, '#ff7aa8'); if (p.cakes) { r(x + 22, gy - 28, 6, 4, '#ffc2d6'); r(x + 31, gy - 28, 6, 4, '#e8b25a'); r(x + 40, gy - 27, 4, 3, '#7ad6a0'); } },
    picture(x, gy, p) { box(x, gy - (p.y || 66), p.w || 20, p.h || 16, p.col || '#3d6bd6', '#d9b860'); const y = gy - (p.y || 66); if (p.art === 'mount') { ln(x + 2, y + 13, x + 9, y + 4, '#f6ecd9'); ln(x + 9, y + 4, x + 17, y + 13, '#f6ecd9'); r(x + 2, y + 12, 16, 2, '#ff9a6b'); } else if (p.art === 'peasants') { r(x + 2, y + 9, 16, 5, '#7a5a34'); for (let k = 0; k < 4; k++) { r(x + 3 + k * 4, y + 6, 2, 4, ['#b5453a', '#3d6bd6', '#e8b25a', '#f6ecd9'][k]); px(x + 3 + k * 4, y + 5, '#f2c9a5'); } } else if (p.art === 'lady') { disc(x + 10, y + 6, 3, '#f2c9a5'); r(x + 6, y + 9, 9, 6, '#7a1f2e'); } else { disc(x + 7, y + 7, 3, '#ffd166'); r(x + 2, y + 11, 16, 3, '#2f6b4f'); } },
    plane(x, gy) { // оранжевый самолёт-памятник
      r(x + 18, gy - 30, 4, 30, '#8a90a0'); r(x, gy - 40, 44, 7, '#f08a2a'); r(x + 40, gy - 39, 6, 5, '#ffb26b'); r(x - 4, gy - 46, 8, 8, '#f08a2a'); r(x + 14, gy - 34, 16, 3, '#d9701a'); r(x + 10, gy - 44, 18, 4, '#d9701a'); r(x + 34, gy - 39, 4, 2, '#bfe0f2'); r(x + 2, gy - 38, 30, 1, '#ffffff'); },
    lenin(x, gy) { r(x, gy - 22, 18, 22, '#8a90a0'); r(x - 2, gy - 24, 22, 3, '#a3a8b6'); r(x + 6, gy - 44, 7, 20, '#4a4d5a'); disc(x + 9, gy - 47, 3, '#4a4d5a'); r(x + 12, gy - 41, 9, 2, '#4a4d5a'); },
    monument(x, gy) { r(x, gy - 12, 26, 12, '#8a90a0'); r(x + 9, gy - 50, 8, 38, '#4a4d5a'); disc(x + 13, gy - 53, 3, '#4a4d5a'); r(x + 15, gy - 62, 1, 16, '#4a4d5a'); r(x + 16, gy - 62, 8, 5, '#7a1f2e'); },
    stop(x, gy, p) { r(x, gy - 30, 2, 30, '#3a3d4a'); r(x + 36, gy - 30, 2, 30, '#3a3d4a'); r(x - 2, gy - 32, 42, 3, '#14122b'); alpha(0.35, () => r(x + 2, gy - 29, 34, 22, '#9dcbec')); r(x + 6, gy - 8, 26, 2, '#6b4a34'); if (p.sign) txt(x + 19, gy - 42, p.sign, '#f6ecd9', 8, 'center'); },
    bus(x, gy, p, e) { const c = p.col || '#e8e2d0'; box(x, gy - 28, 74, 24, c, '#14122b'); r(x + 1, gy - 12, 72, 3, p.c2 || '#3d6bd6'); for (let i = 0; i < 5; i++) r(x + 5 + i * 13, gy - 25, 10, 9, dark(e.o.time) ? '#ffe9a8' : '#9dcbec'); disc(x + 14, gy - 3, 4, '#14122b'); disc(x + 58, gy - 3, 4, '#14122b'); px(x + 14, gy - 3, '#8a90a0'); px(x + 58, gy - 3, '#8a90a0'); r(x + 72, gy - 10, 2, 3, '#ffd166'); if (p.num) txt(x + 62, gy - 24, p.num, '#14122b', 8, 'center'); },
    car(x, gy, p) { const c = p.col || '#ffd23d'; r(x + 6, gy - 16, 18, 7, c); r(x, gy - 10, 32, 7, c); r(x + 8, gy - 15, 6, 5, '#bfe0f2'); r(x + 16, gy - 15, 6, 5, '#bfe0f2'); disc(x + 7, gy - 3, 3, '#14122b'); disc(x + 25, gy - 3, 3, '#14122b'); px(x + 31, gy - 8, '#fff6cf'); if (p.taxi) r(x + 12, gy - 18, 6, 2, '#14122b'); },
    train(x, gy, p, e) { for (let k = 0; k < (p.n || 3); k++) { const cx = x + k * 92; box(cx, gy - 34, 90, 30, '#d9dde4', '#14122b'); r(cx + 1, gy - 18, 88, 5, '#c8323c'); r(cx + 1, gy - 12, 88, 2, '#3d6bd6'); for (let i = 0; i < 6; i++) r(cx + 6 + i * 14, gy - 30, 10, 9, dark(e.o.time) ? '#ffe9a8' : '#9dcbec'); r(cx + 38, gy - 30, 8, 24, '#b9bfca'); disc(cx + 14, gy - 2, 3, '#14122b'); disc(cx + 76, gy - 2, 3, '#14122b'); } },
    station(x, gy, p, e) { const d = dark(e.o.time); r(x, gy - 58, 150, 58, '#e9dcc0'); for (let k = 0; k < 3; k++) { const tx = x + 14 + k * 54; r(tx, gy - 76, 16, 20, '#e9dcc0'); for (let j = 0; j < 9; j++) r(tx - j + 8 - 1, gy - 78 - 9 + j, 2 + j * 2, 1, '#4f8a6a'); px(tx + 8, gy - 89, '#d9b860'); A.windowLit(tx + 4, gy - 72, 8, 10, d, '#8a7a66'); } r(x - 3, gy - 60, 156, 3, '#4f8a6a'); for (let i = 0; i < 9; i++) { r(x + 8 + i * 16, gy - 50, 9, 18, d ? '#ffd98a' : '#7f96b6'); disc(x + 12 + i * 16, gy - 50, 4, d ? '#ffd98a' : '#7f96b6'); } r(x + 66, gy - 24, 18, 24, '#5a3d2e'); disc(x + 75, gy - 24, 9, '#5a3d2e'); box(x + 45, gy - 36, 60, 10, '#14122b', '#f6ecd9'); txt(x + 75, gy - 35, p.sign || 'ВОКЗАЛ', '#ffd166', 8, 'center'); },
    lighthouse(x, gy, p, e) { r(x - 9, gy - 8, 22, 8, '#8a90a0'); r(x - 5, gy - 44, 14, 36, '#f6f2ea'); r(x - 5, gy - 34, 14, 5, '#c8323c'); r(x - 5, gy - 20, 14, 5, '#c8323c'); r(x - 7, gy - 47, 18, 3, '#3a3d4a'); r(x - 3, gy - 54, 10, 7, '#ffe9a8'); r(x - 4, gy - 57, 12, 3, '#c8323c'); px(x + 2, gy - 59, '#3a3d4a'); const a = Math.sin(e.t * 1.5); alpha(0.18 + 0.1 * a, () => { disc(x + 2, gy - 51, 12, '#ffe9a8'); }); r(x, gy - 8, 4, 8, '#5a3d2e'); },
    spit(x, gy, p) { // коса к маяку: камни
      for (let i = 0; i < (p.n || 10); i++) { const rx = x + i * 12 + rnd(i) * 6; r(rx, gy - 2 - rnd(i + 3) * 3, 6, 4, i % 2 ? '#6a6f7f' : '#8a90a0'); } },
    whale(x, gy) { // позвоночник и череп кита
      r(x, gy - 4, 150, 4, '#5a3d2e'); for (let i = 0; i < 16; i++) { const vx = x + 44 + i * 6.4, h = 12 - Math.abs(i - 4) * 0.5 - i * 0.3; r(vx, gy - 14 - h / 2, 4, h + 4, '#efe6d2'); r(vx + 1, gy - 22 - h / 2 + i * 0.3, 2, 8, '#e0d6bd'); r(vx + 1, gy - 9, 2, 4, '#5a3d2e'); } r(x + 4, gy - 22, 40, 10, '#efe6d2'); r(x, gy - 18, 30, 5, '#e0d6bd'); r(x + 30, gy - 26, 14, 6, '#efe6d2'); r(x + 34, gy - 20, 4, 3, '#2b2238'); for (let i = 0; i < 7; i++) ln(x + 48 + i * 6, gy - 14, x + 44 + i * 6, gy - 5, '#e0d6bd'); },
    tank(x, gy, p, e) { const w = p.w || 60, h = p.h || 70; box(x, gy - h - 12, w, h, '#0e2a5c', '#1d3a6b'); alpha(0.5, () => r(x + 1, gy - h - 11, w - 2, 6, '#2f6fc4')); for (let i = 0; i < (p.n || 5); i++) { const jx = x + 8 + rnd(i + p.x) * (w - 16), jy = gy - 22 - ((e.t * (4 + rnd(i) * 5) + rnd(i + 5) * h) % (h - 16)); const pulse = Math.sin(e.t * 3 + i) > 0 ? 1 : 0; const c = p.kind === 'fish' ? null : ['#ffb3de', '#b9e3ff', '#d6c2ff'][i % 3]; if (p.kind === 'fish') { const fx = x + 6 + ((e.t * (8 + i * 3) + rnd(i) * w) % (w - 14)); const fy = gy - 24 - rnd(i + 9) * (h - 22); r(fx, fy, 6, 3, ['#ffd23d', '#ff8a5c', '#9de0ff'][i % 3]); px(fx - 1, fy + 1, ['#ffd23d', '#ff8a5c', '#9de0ff'][i % 3]); px(fx + 4, fy, '#14122b'); } else { r(jx - 3 - pulse, jy, 7 + pulse * 2, 3, c); r(jx - 2, jy - 1, 5, 1, c); alpha(0.6, () => { r(jx - 2, jy + 3, 1, 4 + pulse, c); r(jx, jy + 3, 1, 5, c); r(jx + 2, jy + 3, 1, 4 + pulse, c); }); } } r(x, gy - 12, w, 12, '#101c3e'); },
    xmas(x, gy, p, e) { r(x + 6, gy - 5, 3, 5, '#5a3d2e'); for (let i = 0; i < 6; i++) r(x + 6 - i, gy - 9 - (5 - i) * 5, 3 + i * 2, 5, i % 2 ? '#1f4a3a' : '#2f6b4f'); for (let i = 0; i < 9; i++) { const on = Math.floor(e.t * 3 + i) % 3; px(x + 3 + rnd(i) * 9, gy - 10 - rnd(i + 4) * 24, ['#ff5c93', '#ffd166', '#6fb7ff'][on]); } px(x + 7, gy - 36, '#ffd166'); px(x + 7, gy - 37, '#ffd166'); },
    garland(x, gy, p, e) { for (let i = 0; i < (p.n || 14); i++) { const on = (Math.floor(e.t * 2) + i) % 3; px(x + i * 7, gy - (p.y || 84) + Math.round(Math.sin(i * 0.9) * 2) + 2, ['#ff5c93', '#ffd166', '#6fb7ff'][on]); } },
    amnyam(x, gy, p) { const c = '#6fd16a'; r(x, gy - 6 - (p.y || 0), 6, 6, c); r(x + 1, gy - 7 - (p.y || 0), 4, 1, c); px(x + 1, gy - 4 - (p.y || 0), '#fff'); px(x + 4, gy - 4 - (p.y || 0), '#fff'); r(x + 1, gy - 2 - (p.y || 0), 4, 1, '#c8323c'); if (p.hat) { r(x, gy - 9 - (p.y || 0), 6, 3, p.hat); px(x + 3, gy - 10 - (p.y || 0), p.hat); } },
    suitcase(x, gy, p) { box(x, gy - 13, 10, 12, p.col || '#c8323c', '#14122b'); r(x + 3, gy - 16, 4, 3, '#14122b'); px(x + 1, gy - 1, '#14122b'); px(x + 8, gy - 1, '#14122b'); },
    gift(x, gy, p) { box(x, gy - 8 - (p.y || 0), 9, 8, p.col || '#b58cff', '#14122b'); r(x + 4, gy - 8 - (p.y || 0), 1, 8, '#ffd166'); r(x + 2, gy - 10 - (p.y || 0), 2, 2, '#ffd166'); r(x + 5, gy - 10 - (p.y || 0), 2, 2, '#ffd166'); },
    text(x, gy, p) { txt(x, gy - (p.y || 60), p.s, p.col || '#f6ecd9', p.size || 8, p.align || 'left'); },
    box(x, gy, p) { r(x, gy - (p.y || 0) - (p.h || 10), p.w || 10, p.h || 10, p.col || '#fff'); },
    jet(x, gy, p, e) { const y = gy - (p.y || 70) + Math.round(Math.sin(e.t * 2) * 2); r(x, y, 60, 9, '#f6f2ea'); r(x + 56, y + 1, 8, 6, '#f6f2ea'); r(x + 60, y + 3, 6, 3, '#e6e2da'); r(x - 6, y - 10, 10, 12, '#f6f2ea'); r(x - 6, y - 10, 10, 3, '#c8323c'); r(x + 18, y + 6, 22, 5, '#d9dde4'); r(x + 14, y + 9, 10, 3, '#8a90a0'); for (let i = 0; i < 9; i++) px(x + 12 + i * 5, y + 3, '#3d6bd6'); r(x + 54, y + 2, 5, 2, '#3d6bd6'); },
    airport(x, gy, p, e) { r(x, gy - 50, 200, 50, '#cfd6e0'); for (let i = 0; i < 12; i++) r(x + 4 + i * 16, gy - 46, 13, 30, dark(e.o.time) ? '#ffe9a8' : '#9dcbec'); r(x - 4, gy - 54, 208, 5, '#8a90a0'); r(x + 90, gy - 16, 20, 16, '#5b6f88'); box(x + 60, gy - 70, 80, 12, '#14122b', '#f6ecd9'); txt(x + 100, gy - 68, p.sign || 'VVO', '#ffd166', 8, 'center'); },
    bridgePiter(x, gy) { r(x, gy - 6, 120, 6, '#6a6f7f'); for (let k = 0; k < 3; k++) { disc(x + 20 + k * 40, gy, 14, '#00000000'); } r(x, gy - 8, 120, 2, '#3a3d4a'); for (let i = 0; i < 12; i++) r(x + i * 10, gy - 14, 1, 6, '#3a3d4a'); r(x, gy - 14, 120, 1, '#3a3d4a'); },
    sphinx(x, gy) { r(x, gy - 10, 26, 10, '#8a90a0'); r(x + 3, gy - 16, 18, 6, '#b3a078'); r(x + 17, gy - 24, 7, 9, '#b3a078'); r(x + 16, gy - 26, 9, 3, '#d9b860'); px(x + 22, gy - 21, '#14122b'); r(x + 1, gy - 13, 5, 3, '#b3a078'); },
    kiosk(x, gy, p) { box(x, gy - 30, 34, 30, p.col || '#ffd23d', '#14122b'); r(x - 2, gy - 34, 38, 5, p.c2 || '#c8323c'); r(x + 4, gy - 24, 26, 10, '#fff6cf'); if (p.sign) txt(x + 17, gy - 44, p.sign, '#f6ecd9', 8, 'center'); },
    fence(x, gy, p) { for (let i = 0; i < (p.n || 10); i++) r(x + i * 6, gy - 12, 1, 12, '#3a3d4a'); r(x, gy - 12, (p.n || 10) * 6, 1, '#3a3d4a'); r(x, gy - 6, (p.n || 10) * 6, 1, '#3a3d4a'); },
    field(x, gy, p) { r(x, gy - 2, p.w || 120, 2, '#ffffff'); r(x + 4, gy - 16, 1, 16, '#f6ecd9'); r(x + 4, gy - 16, 18, 1, '#f6ecd9'); r(x + 22, gy - 16, 1, 16, '#f6ecd9'); for (let k = 0; k < 4; k++) ln(x + 5 + k * 4, gy - 16, x + 5 + k * 4, gy, '#ffffff55'); },
    slope(x, gy, p) { for (let i = 0; i < (p.w || 80); i++) r(x + i, gy - i * (p.k || 0.25), 1, i * (p.k || 0.25) + 1, p.col || '#e3ebf3'); },
    eiffel(x, gy) { ln(x, gy, x + 8, gy - 44, '#8a90a0'); ln(x + 18, gy, x + 10, gy - 44, '#8a90a0'); r(x + 3, gy - 16, 13, 1, '#8a90a0'); r(x + 5, gy - 30, 9, 1, '#8a90a0'); r(x + 9, gy - 50, 1, 7, '#8a90a0'); for (let k = 0; k < 5; k++) ln(x + 2 + k, gy - 8 - k * 7, x + 16 - k, gy - 8 - k * 7 - 3, '#a3a8b6'); },
    record(x, gy, p, e) { box(x, gy - 22, 16, 9, '#5a3d2e', '#2b1a18'); disc(x + 7, gy - 24, 5, '#14122b'); px(x + 7, gy - 24, '#ff7aa8'); if (Math.floor(e.t * 2) % 2) px(x + 14, gy - 32, '#f6ecd9'); else px(x + 17, gy - 36, '#f6ecd9'); },
    laptop(x, gy, p, e) { r(x, gy - 15, 12, 1, '#8a90a0'); r(x + 1, gy - 24, 10, 9, '#14122b'); r(x + 2, gy - 23, 8, 7, p.col || (Math.floor(e.t * 1.5) % 2 ? '#6fb7ff' : '#8ac6ff')); },
    phoneGlow(x, gy, p, e) { alpha(0.25 + 0.1 * Math.sin(e.t * 4), () => disc(x, gy - (p.y || 14), 7, '#9de0ff')); r(x - 1, gy - (p.y || 14) - 2, 3, 5, '#dff4ff'); },
  };

  // ---------- сборка ----------
  function world(e) {
    (BG[e.o.bg || 'city'] || BG.black)(e);
    const props = e.o.props || [];
    for (const p of props) { if (p.fg) continue; const f = P[p.k]; if (!f) continue; const x = Math.round(p.x - e.cam * (p.par || 1)); if (x < -260 || x > e.W + 60) continue; f(x, e.GY + (p.dy || 0), p, e); }
  }
  world.fg = function (e) {
    for (const p of (e.o.props || [])) { if (!p.fg) continue; const f = P[p.k]; const x = Math.round(p.x - e.cam * (p.par || 1)); if (f && x > -260 && x < e.W + 60) f(x, e.GY + (p.dy || 0), p, e); }
    const fx = e.o.fx;
    if (fx === 'snow') A.snow(e.W, e.H, e.t, e.cam, 55);
    else if (fx === 'snowlight') A.snow(e.W, e.H, e.t, e.cam, 22);
    else if (fx === 'rain') A.rain(e.W, e.H, e.t, e.cam, 60);
    else if (fx === 'petals') A.petals(e.W, e.H, e.t, e.cam, 22);
    else if (fx === 'fog') { alpha(0.35, () => r(0, 60, e.W, 60, '#d6dadd')); alpha(0.2, () => r(0, 30, e.W, 100, '#d6dadd')); }
    if (e.o.tint) A.tint(e.W, e.H, e.o.tint[0], e.o.tint[1]);
    if (e.o.caption) { txt(e.W / 2, 10, e.o.caption, '#f6ecd9', 8, 'center'); }
    A.vignette(e.W, e.H, 0.3);
  };
  function title(e) {
    e.o = { time: 'eve', bridge: 120, ground: 'snow', sea: true };
    BG.city(e); A.snow(e.W, e.H, e.t, e.cam, 40);
    const cx = Math.round(e.W / 2);
    A.person(cx - 9, e.GY, Object.assign({ phase: 0 }, (typeof OUTFITS !== 'undefined' && OUTFITS.d) ? Object.assign({}, OUTFITS.d.base, OUTFITS.d.winter) : {}), 'walk', e.t, false);
    A.person(cx + 9, e.GY, Object.assign({ phase: 1 }, (typeof OUTFITS !== 'undefined' && OUTFITS.o) ? Object.assign({}, OUTFITS.o.base, OUTFITS.o.winter) : {}), 'walk', e.t + 0.2, false);
    A.heart(cx, e.GY - 38 + Math.round(Math.sin(e.t * 3) * 2), '#ff7aa8', 1);
    A.vignette(e.W, e.H, 0.4);
  }
  return { world, title, black: BG.black, BG, P, txt, ln, shade };
})();
