// ===== scenes2.js — детализация задников и предметов (сетка 0.5) =====
// Подключается после всех файлов со сценами. Фоны room/city/shore/piter/piterStreet/aqua переопределены,
// предметы дорисовываются поверх оригиналов (размеры и точки привязки не меняются).
(() => {
  const S = SCENES, BG = S.BG, P = S.P, { r, px, rnd, disc } = A, ln = S.ln;
  const f = (x, y, w, h, c) => { const g = A.ctx; g.fillStyle = c; g.fillRect(x, y, w, h); };
  const al = (a, fn) => { const g = A.ctx; g.globalAlpha = a; fn(); g.globalAlpha = 1; };
  const pc = {};
  const rgb = c => { if (pc[c]) return pc[c]; const m = /^#([0-9a-f]{3,8})$/i.exec(c || ''); let v = [128, 128, 128]; if (m) { let h = m[1]; if (h.length < 6) h = h.split('').map(x => x + x).join(''); v = [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; } return pc[c] = v; };
  const mix = (c, k) => { const key = c + '|' + k; if (pc[key]) return pc[key]; const v = rgb(c), t = k < 0 ? 0 : 255, a = Math.abs(k); return pc[key] = '#' + v.map(x => Math.round(x + (t - x) * a).toString(16).padStart(2, '0')).join(''); };
  const dark = t => t === 'night' || t === 'eve';
  const wrap = (name, fn) => { const old = P[name]; if (!old) return; P[name] = (x, gy, p, e) => { old(x, gy, p, e); fn(x, gy, p || {}, e); }; };

  const SKY = {
    day: ['#7fb8e6', '#9dcbec', '#bfe0f2', '#e2f1f6'], spring: ['#6fb3ea', '#93c9f0', '#bfe3f5', '#eaf6f4'],
    eve: ['#2b2a5c', '#5a3d7a', '#b0527a', '#f08a6b', '#ffc98a'], night: ['#0c0b20', '#12112e', '#1a1a40', '#24265a'],
    dawn: ['#3b4a8a', '#7a6aa8', '#d58aa0', '#ffc7a0'], fog: ['#aeb7c2', '#bcc4cc', '#c9cfd4', '#d9dde0'],
    white: ['#b9c6d6', '#c9d4e0', '#dbe3ea', '#eef2f4'], summer: ['#4aa3e8', '#77bdf0', '#a8d8f5', '#d9f0f7'], gold: ['#3d5a9a', '#8f7ab0', '#e8a08a', '#ffd9a0'],
  };

  // ---------- общие кирпичики ----------
  function cloud(x, y, col = '#ffffff') {
    x = Math.round(x);
    const sh = mix(col, -0.1), sh2 = mix(col, -0.2), hi = mix(col, 0.35);
    r(x, y, 22, 4, col); r(x + 4, y - 3, 12, 3, col); r(x + 8, y - 5, 6, 2, col); r(x - 4, y + 2, 30, 2, col);
    f(x + 14, y - 2.5, 8, 2.5, col); f(x - 2, y, 6, 2, col); f(x + 20, y + 0.5, 8, 2, col);
    f(x - 4, y + 3, 30, 1, sh); f(x, y + 2.5, 22, 0.5, sh); f(x - 4, y + 3.5, 28, 0.5, sh2);
    f(x + 5, y - 3, 10, 0.5, hi); f(x + 9, y - 5, 4, 0.5, hi); f(x + 1, y, 5, 0.5, hi);
  }
  function hill(W, cam, par, baseY, amp, col, seed, H, hi, tex) {
    const ys = [];
    for (let x = 0; x < W; x++) {
      const wx = x + cam * par + seed * 97;
      const y = baseY - (Math.sin(wx * 0.021 + seed) * 0.5 + Math.sin(wx * 0.047 + seed * 2.3) * 0.3 + Math.sin(wx * 0.009 + seed * 5) * 0.6) * amp;
      r(x, y, 1, H - y, col); ys.push(y);
    }
    if (hi) al(0.45, () => { for (let x = 0; x < W; x++) f(x, Math.round(ys[x]), 1, 1, hi); });
    if (tex) al(0.5, () => { for (let x = 0; x < W; x++) { const k = rnd(x * 7 + seed + Math.floor((x + cam * par) / 3) * 13); if (k < 0.22) f(x, Math.round(ys[x]) + 1 + Math.floor(k * 30), 1, 0.5, tex); } });
  }
  function skyline(W, cam, par, baseY, col, win, seed, minH, maxH, lit, dk) {
    const cell = 22, first = Math.floor((cam * par) / cell) - 1;
    const sideC = mix(col, -0.16), roofC = mix(col, 0.22), ledge = mix(col, -0.1), pane = mix(col, dk ? 0.07 : 0.1);
    for (let i = first; i < first + W / cell + 3; i++) {
      const k = i + seed * 1000;
      const bw = 12 + Math.floor(rnd(k) * 12), bh = minH + Math.floor(rnd(k + 5) * (maxH - minH));
      const x = i * cell - cam * par + rnd(k + 9) * 6;
      r(x, baseY - bh, bw, bh, col);
      f(x + bw - 1.5, baseY - bh, 1.5, bh, sideC); f(x, baseY - bh, bw, 0.5, roofC); f(x, baseY - bh + 0.5, bw, 0.5, mix(col, -0.08));
      if (rnd(k + 11) < 0.5) { f(x + bw / 2, baseY - bh - 5, 0.5, 5, sideC); f(x + bw / 2 - 1, baseY - bh - 4, 2.5, 0.5, sideC); }
      if (rnd(k + 13) < 0.45) f(x + 2, baseY - bh - 2, 4, 2, ledge);
      if (win) {
        for (let wy = baseY - bh + 3; wy < baseY - 3; wy += 4) {
          if (((wy - baseY + bh) / 4) % 2 === 0.75 || false) { }
          f(x, wy + 2.5, bw - 1.5, 0.5, ledge);
          for (let wx = 2; wx < bw - 2; wx += 3) {
            if (rnd(k * 7 + wx * 13 + wy * 3) < lit) { f(x + wx, wy, 1.5, 2, win); if (dk) al(0.18, () => f(x + wx - 0.5, wy - 0.5, 2.5, 3, win)); }
            else f(x + wx, wy, 1.5, 2, pane);
          }
        }
      }
    }
  }
  function bridge(x, y, col, lights) {
    for (const p0 of [x, x + 70]) {
      ln(p0 - 3, y, p0, y - 38, col); ln(p0 + 3, y, p0, y - 38, col); ln(p0 - 2, y, p0 + 1, y - 38, col);
      for (let k = 1; k < 7; k++) { ln(p0, y - 38 + k * 2, p0 - k * 5, y - 5, col); ln(p0, y - 38 + k * 2, p0 + k * 5, y - 5, col); }
      f(p0 - 2.5, y - 28, 5, 0.5, col); f(p0 - 1.5, y - 16, 3.5, 0.5, col);
      if (lights) { px(p0, y - 39, '#ff5c5c'); al(0.3, () => disc(p0, y - 39, 2, '#ff5c5c')); }
    }
    r(x - 50, y - 5, 170, 2, col);
    for (let k = 0; k < 170; k += 4) f(x - 50 + k, y - 3, 0.5, 1.5, col);
    f(x - 50, y - 5.5, 170, 0.5, mix(col, 0.25));
    if (lights) for (let k = 0; k < 17; k++) { px(x - 48 + k * 10, y - 6, '#ffd98a'); al(0.25, () => f(x - 49 + k * 10, y - 7, 3, 2.5, '#ffd98a')); }
  }
  // земля: исходный A.ground и поверх фактура
  function ground(e, g) {
    const o = e.o, t = o.time || 'day', W = e.W, H = e.H, GY = e.GY, cam = e.cam, d = dark(t);
    g = g || o.ground || 'snow';
    if (g === 'snow') A.ground(W, GY, H, d ? '#8f9ac4' : '#eef3f8', d ? '#b9c2e4' : '#ffffff', cam, d ? '#7783b0' : '#d3deea');
    else if (g === 'road') A.ground(W, GY, H, d ? '#25243f' : '#7c8191', d ? '#3b3a5e' : '#a3a8b6', cam, d ? '#1c1b33' : '#6a6f7f');
    else if (g === 'grass') A.ground(W, GY, H, d ? '#1f3d3a' : '#5fae6a', d ? '#2f5a50' : '#8fd08a', cam, d ? '#18302e' : '#4a9458');
    else if (g === 'sand') A.ground(W, GY, H, '#e6cf9a', '#f5e6bd', cam, '#cdb47c');
    else if (g === 'plat') { A.ground(W, GY, H, d ? '#3a3a55' : '#a6a8b4', d ? '#55557a' : '#d0d2da', cam, null); for (let x = -(cam % 12); x < W; x += 12) r(x, GY + 2, 6, 1, '#ffd166'); }
    groundDetail(e, g);
  }
  function groundDetail(e, g) {
    const o = e.o, t = o.time || 'day', W = e.W, H = e.H, GY = e.GY, cam = e.cam, d = dark(t);
    const wrapX = (n, s, par = 1) => ((n * s - cam * par) % (W + 40) + W + 40) % (W + 40) - 20;
    if (g === 'snow') {
      const sc = d ? '#5d6aa0' : '#b3c4dc', hi = d ? '#c9d0f0' : '#ffffff';
      al(0.3, () => { for (let i = 0; i < 16; i++) f(wrapX(rnd(i + 40), 500), GY + 3 + rnd(i) * 20, 6 + rnd(i + 3) * 12, 1, sc); });
      al(0.5, () => { for (let i = 0; i < 12; i++) f(wrapX(rnd(i + 70), 500), GY + 2 + rnd(i + 8) * 22, 4 + rnd(i + 5) * 6, 0.5, hi); });
      for (let i = 0; i < 16; i++) if (Math.sin(e.t * 1.4 + i * 2.1) > 0.55) f(wrapX(rnd(i + 120), 500), GY + 2 + rnd(i + 9) * 22, 1, 0.5, '#fff');
      al(0.14, () => f(0, GY + 1, W, 2, d ? '#4a548a' : '#9fb4d0'));
      al(0.1, () => f(0, H - 7, W, 7, d ? '#2a3268' : '#7f94b8'));
    } else if (g === 'road') {
      f(0, GY, W, 2, d ? '#3b3a5e' : '#b6bac6'); f(0, GY + 2, W, 0.5, d ? '#14132a' : '#5a5f70'); al(0.25, () => f(0, GY + 2.5, W, 2, '#000'));
      for (let x = -(cam % 22); x < W; x += 22) f(x, GY + 15, 11, 1, d ? '#8a88b0' : '#e6e6ee');
      al(0.3, () => { for (let i = 0; i < 14; i++) { const x = wrapX(rnd(i + 30), 400), y = GY + 5 + rnd(i) * 18; f(x, y, 3 + rnd(i + 2) * 6, 0.5, d ? '#0e0d22' : '#4a4e5c'); } });
    } else if (g === 'grass') {
      const l1 = d ? '#3f7a62' : '#9ad88a', l2 = d ? '#14281f' : '#3e8a4c';
      for (let i = 0; i < 46; i++) { const x = wrapX(rnd(i + 10), 520), y = GY + 2 + rnd(i + 20) * 22; f(x, y - 1.5, 0.5, 1.5, l1); f(x + 1, y - 1, 0.5, 1, l2); f(x - 0.5, y - 1, 0.5, 1, l2); }
      for (let i = 0; i < 6; i++) { const x = wrapX(rnd(i + 90), 400), y = GY + 4 + rnd(i + 91) * 18; px(x, y, ['#ffd23d', '#ffffff', '#ff9ac0'][i % 3]); }
      al(0.18, () => f(0, GY, W, 1.5, d ? '#0e2020' : '#2e6e3c'));
    } else if (g === 'sand') {
      al(0.35, () => { for (let i = 0; i < 18; i++) f(wrapX(rnd(i + 5), 450), GY + 3 + rnd(i) * 20, 8 + rnd(i + 3) * 12, 0.5, '#b89a5c'); });
      al(0.4, () => { for (let i = 0; i < 12; i++) f(wrapX(rnd(i + 55), 450), GY + 4 + rnd(i + 7) * 18, 6, 0.5, '#fff6d8'); });
    } else if (g === 'plat') {
      al(0.3, () => { for (let x = -(cam % 24); x < W; x += 24) f(x, GY, 0.5, H - GY, d ? '#14132a' : '#6a6c7a'); });
      al(0.5, () => f(0, GY + 1, W, 0.5, '#ffd166'));
    }
  }

  // ---------- Владивосток ----------
  BG.city = function (e) {
    const o = e.o, t = o.time || 'day', W = e.W, H = e.H, GY = e.GY, cam = e.cam, d = dark(t);
    A.sky(W, H, SKY[t], 96);
    // дымка у горизонта
    const haze = { day: '#ffffff', spring: '#ffffff', summer: '#ffffff', eve: '#ffb98a', night: '#3a3f8a', dawn: '#ffc7a0', fog: '#e6eaee', white: '#ffffff', gold: '#ffd9a0' }[t];
    al(0.12, () => f(0, 60, W, 18, haze)); al(0.14, () => f(0, 76, W, 14, haze)); al(0.12, () => f(0, 84, W, 8, haze));
    if (t === 'night') { A.stars(W, H, cam, e.t, 60, 64); disc(W - 40, 22, 7, '#f3efd6'); disc(W - 37, 20, 6, SKY.night[1]); px(W - 43, 24, '#d9d4b0'); px(W - 41, 26, '#d9d4b0'); al(0.12, () => disc(W - 40, 22, 14, '#f3efd6')); al(0.06, () => disc(W - 40, 22, 22, '#f3efd6')); }
    if (t === 'eve') { const sx = Math.round(W * 0.7 - cam * 0.02); disc(sx, 80, 10, '#ffe2a8'); al(0.2, () => disc(sx, 80, 16, '#ffe2a8')); al(0.1, () => disc(sx, 80, 26, '#ffe2a8')); }
    if (t === 'day' || t === 'spring' || t === 'summer') {
      disc(40, 20, 7, '#fff6cf'); al(0.3, () => disc(40, 20, 11, '#fff6cf')); al(0.12, () => disc(40, 20, 17, '#fff6cf'));
      for (let i = 0; i < 6; i++) al(0.35, () => f(((i * 97 + 20 - cam * 0.02) % (W + 40) + W + 40) % (W + 40) - 20, 8 + i * 9, 16 + (i % 3) * 8, 0.5, '#ffffff'));
      cloud(60 - cam * 0.03, 30, '#ffffff'); cloud(190 - cam * 0.03, 18, '#ffffff'); cloud(330 - cam * 0.03, 34, '#ffffff');
    }
    const far = { day: '#9db4cf', spring: '#8fb3c4', summer: '#6fa88c', eve: '#4a3766', night: '#17173a', dawn: '#6a6a9c', fog: '#b4bcc6', white: '#c3ccd8', gold: '#6d5f95' }[t];
    const mid = { day: '#7f96b6', spring: '#6f9aa0', summer: '#4f8f6c', eve: '#33284f', night: '#101030', dawn: '#52527f', fog: '#a3acb8', white: '#aab5c4', gold: '#4f4576' }[t];
    hill(W, cam, 0.08, 88, 14, far, 1, H, mix(far, 0.3), mix(far, -0.12));
    al(0.18, () => f(0, 80, W, 10, haze));
    if (o.sea !== false) {
      const sc = { day: ['#5d8fc0', '#86b3d9', '#c9e2f2'], spring: ['#4f93c4', '#7fb9dd', '#d3ecf5'], summer: ['#2f86c9', '#5aa8e0', '#bfe6f7'], eve: ['#5a3f77', '#c46a80', '#ffb98a'], night: ['#12123a', '#262a66', '#5a62a8'], dawn: ['#55609a', '#b98aa8', '#ffd0b0'], fog: ['#a9b2bd', '#bfc7cf', '#d6dbe0'], white: ['#c8d2de', '#dfe6ec', '#f4f7f9'], gold: ['#5a5a9a', '#d59a9a', '#ffe0b0'] }[t];
      A.sea(W, 90, 12, o.ice ? ['#dfe8f0', '#ffffff', '#c3d2e2'] : sc, o.ice ? 0 : e.t, cam * 0.3);
      if (!o.ice) {
        al(0.5, () => f(0, 90, W, 0.5, mix(sc[2], 0.3)));
        for (let i = 0; i < 34; i++) { const x = ((rnd(i + 200) * 500 - cam * 0.3 + Math.sin(e.t + i) * 2) % W + W) % W; if (Math.sin(e.t * 2 + i * 3) > 0.1) f(x, 91 + rnd(i + 210) * 10, 1.5, 0.5, mix(sc[2], 0.4)); }
        if (t === 'eve') { const sx = Math.round(W * 0.7 - cam * 0.02); for (let k = 0; k < 10; k++) al(0.55 - k * 0.04, () => f(sx - 6 + (k % 2) * 2 + Math.sin(e.t * 2 + k) * 1.5, 91 + k, 12 - k, 0.5, '#ffe2a8')); }
        if (t === 'night') for (let k = 0; k < 9; k++) al(0.4 - k * 0.03, () => f(W - 44 + (k % 2) * 2 + Math.sin(e.t * 2 + k), 91 + k, 9 - k * 0.7, 0.5, '#e8e4c8'));
        const bx = ((230 - cam * 0.1 + e.t * 1.2) % (W + 90) + W + 90) % (W + 90) - 45, sc2 = d ? '#0a0a22' : mix(far, -0.35);
        f(bx, 88, 11, 2, sc2); f(bx + 2, 86, 5, 2, sc2); f(bx + 6, 84, 0.5, 4, sc2); f(bx + 10, 87.5, 2, 0.5, sc2);
        if (d) px(bx + 8, 86, '#ffd98a');
      }
    }
    if (o.bridge) bridge(Math.round((o.bridge === true ? 150 : o.bridge) - cam * 0.12), 90, d ? '#0e0e2a' : '#5f7594', d);
    hill(W, cam, 0.2, 100, 9, mid, 4, H, mix(mid, 0.3), mix(mid, -0.14));
    al(0.1, () => f(0, 96, W, 8, haze));
    if (d) for (let i = 0; i < 52; i++) { const x = ((rnd(i) * 520 - cam * 0.2) % (W + 40) + W + 40) % (W + 40) - 20; const y = 88 + rnd(i + 30) * 12, c = rnd(i + 7) < 0.5 ? '#ffd98a' : '#ffb26b'; px(x, y, c); if (i % 4 === 0) al(0.25, () => f(x - 0.5, y - 0.5, 2, 2, c)); }
    const bc = { day: '#6c7c99', spring: '#69809a', summer: '#5c7a8c', eve: '#261f40', night: '#0b0b24', dawn: '#42426b', fog: '#929ba8', white: '#98a4b4', gold: '#3a3360' }[t];
    const wc = d || t === 'dawn' ? '#ffd98a' : (t === 'fog' || t === 'white' ? '#c9d2dc' : '#b9d0e6');
    if (o.skyline !== false) skyline(W, cam, 0.45, GY - 3, bc, wc, 2, 16, o.tall || 44, d ? 0.4 : 0.25, d);
    ground(e);
  };

  // ---------- берег / лёд ----------
  const shore0 = BG.shore;
  BG.shore = function (e) {
    shore0(e);
    const o = e.o, t = o.time || 'day', W = e.W, GY = e.GY, cam = e.cam, d = dark(t);
    al(0.14, () => f(0, 74, W, 12, d ? '#6a5a9a' : '#ffffff'));
    if (o.ice) {
      al(0.4, () => { for (let i = 0; i < 20; i++) { const x = ((rnd(i + 300) * 700 - cam * 0.4) % (W + 30) + W + 30) % (W + 30) - 15; f(x, 86 + rnd(i + 310) * (GY - 90), 3 + rnd(i + 311) * 8, 0.5, '#9fb6cc'); } });
      for (let i = 0; i < 18; i++) if (Math.sin(e.t * 1.6 + i * 2) > 0.5) f(((rnd(i + 340) * 600 - cam * 0.5) % W + W) % W, 86 + rnd(i + 341) * (GY - 88), 1, 0.5, '#ffffff');
      groundDetail(e, 'snow');
    } else {
      al(0.5, () => f(0, 84, W, 0.5, '#e8f4fb'));
      for (let i = 0; i < 40; i++) { const x = ((rnd(i + 400) * 500 - cam * 0.4 + Math.sin(e.t + i) * 2) % W + W) % W; if (Math.sin(e.t * 2 + i * 3) > 0.2) f(x, 85 + rnd(i + 410) * (GY - 88), 1.5, 0.5, t === 'eve' || t === 'gold' ? '#ffe2b8' : '#ffffff'); }
      groundDetail(e, o.ground || 'snow');
    }
  };

  // ---------- комната ----------
  BG.room = function (e) {
    const o = e.o, W = e.W, H = e.H, GY = e.GY, cam = e.cam;
    const wall = o.wall || '#3b3660', wall2 = o.wall2 || mix(wall, -0.07), floor = o.floor || '#6b4a34';
    r(0, 0, W, GY, wall);
    // обои: тонкая вертикальная полоса и мелкий ромбик
    const lightW = mix(wall, 0.045), darkW = mix(wall, -0.04);
    for (let x = -(cam % 8); x < W; x += 8) { f(x, 0, 1, GY, lightW); f(x + 4, 0, 0.5, GY, darkW); }
    al(0.5, () => { for (let x = -(cam % 8); x < W; x += 8) for (let y = 7; y < GY - 6; y += 8) { f(x + 2, y, 0.5, 0.5, mix(wall, -0.09)); f(x + 6, y + 4, 0.5, 0.5, mix(wall, 0.09)); } });
    if (o.stripes) for (let x = -(cam % 16); x < W; x += 16) r(x, 0, 1, GY, wall2);
    // тень у потолка
    al(0.2, () => f(0, 0, W, 3, '#000')); al(0.11, () => f(0, 3, W, 4, '#000')); al(0.06, () => f(0, 7, W, 7, '#000'));
    f(0, 3, W, 0.5, mix(wall, 0.18)); f(0, 3.5, W, 0.5, mix(wall, -0.2));
    if (o.panel) {
      r(0, GY - 30, W, 30, wall2); f(0, GY - 31, W, 1, mix(wall, 0.2)); f(0, GY - 30, W, 0.5, mix(wall, -0.25));
      for (let x = -(cam % 20); x < W; x += 20) { f(x + 2, GY - 25, 15, 17, mix(wall2, -0.07)); f(x + 2, GY - 25, 15, 0.5, mix(wall2, -0.25)); f(x + 2, GY - 25, 0.5, 17, mix(wall2, -0.25)); f(x + 2.5, GY - 8.5, 14.5, 0.5, mix(wall2, 0.2)); f(x + 16.5, GY - 24.5, 0.5, 16, mix(wall2, 0.2)); }
    }
    // плинтус
    const bb = o.base || mix(wall, 0.3);
    r(0, GY - 4, W, 4, mix(bb, -0.1)); f(0, GY - 4, W, 3, bb); f(0, GY - 4, W, 0.5, mix(bb, 0.3)); f(0, GY - 1, W, 0.5, mix(bb, -0.2)); f(0, GY - 0.5, W, 0.5, mix(bb, -0.45));
    al(0.14, () => f(0, GY - 6, W, 2, '#000'));
    // пол: доски в перспективе
    r(0, GY, W, H - GY, floor);
    const rows = [[GY, 4], [GY + 4, 5], [GY + 9, 7], [GY + 16, 10]];
    rows.forEach((rw, ri) => {
      const y = rw[0], h = rw[1], len = 30 + ri * 6, off = (ri * 13) % len;
      for (let x = -(cam % len) - off; x < W + len; x += len) {
        const k = Math.floor((x + cam + off) / len), tone = (rnd(k * 3 + ri * 17) - 0.5) * 0.12;
        al(0.55, () => f(x, y, len, h, tone > 0 ? mix(floor, tone) : mix(floor, tone)));
        f(x, y, 0.5, h, mix(floor, -0.3)); al(0.4, () => f(x + 0.5, y, 0.5, h, mix(floor, 0.2)));
        if (rnd(k + ri * 5) < 0.5) al(0.4, () => f(x + 4 + rnd(k) * len * 0.5, y + h * 0.5, 5 + rnd(k + 2) * 8, 0.5, mix(floor, -0.2)));
      }
      f(0, y + h - 0.5, W, 0.5, mix(floor, -0.3)); al(0.5, () => f(0, y, W, 0.5, mix(floor, 0.22)));
    });
    al(0.22, () => f(0, GY, W, 2.5, '#000')); al(0.1, () => f(0, GY + 2.5, W, 3, '#000'));
    al(0.1, () => f(0, H - 6, W, 6, '#000'));
    if (o.dim) al(o.dim, () => r(0, 0, W, H, '#07061a'));
  };

  // ---------- Петербург и прочее: поверх оригиналов ----------
  const piter0 = BG.piter;
  BG.piter = function (e) {
    piter0(e);
    const t = e.o.time || 'day', W = e.W, GY = e.GY, cam = e.cam, d = dark(t);
    al(0.16, () => f(0, 84, W, 8, d ? '#6a5a9a' : '#ffffff'));
    for (let i = 0; i < 30; i++) { const x = ((rnd(i + 500) * 500 - cam * 0.3 + Math.sin(e.t + i) * 2) % W + W) % W; if (Math.sin(e.t * 2 + i * 3) > 0.2) f(x, 91 + rnd(i + 510) * 12, 1.5, 0.5, d ? '#ffd98a' : '#ffffff'); }
    al(0.5, () => { for (let x = -(cam % 14); x < W; x += 14) { f(x + 0.5, 96, 0.5, 7, d ? '#5a5a8a' : '#6a6d7a'); } });
    al(0.3, () => { for (let x = -(cam % 20); x < W; x += 20) f(x, 106, 10, 0.5, d ? '#14132a' : '#6a6c78'); });
    for (let x = -(cam % 20); x < W; x += 20) { al(0.35, () => f(x, GY + 6, 0.5, 20, d ? '#14132a' : '#6a6c78')); }
    al(0.12, () => f(0, GY + 1, W, 3, '#000'));
  };
  const ps0 = BG.piterStreet;
  BG.piterStreet = function (e) {
    ps0(e);
    const t = e.o.time || 'day', W = e.W, GY = e.GY, cam = e.cam, d = dark(t);
    const first = Math.floor(cam * 0.8 / 70) - 1;
    for (let i = first; i < first + W / 70 + 3; i++) {
      const x = i * 70 - cam * 0.8;
      al(0.3, () => { for (let k = 0; k < 69; k += 7) f(x + k, GY - 60 + rnd(i * 9 + k) * 40, 0.5, 6, '#000'); });
      al(0.2, () => f(x + 66, GY - 80, 3, 80, '#000'));
      for (let fy = GY - 70; fy < GY - 22; fy += 16) al(0.5, () => f(x, fy + 11, 69, 0.5, d ? '#9a8ab0' : '#fff6e0'));
    }
    al(0.25, () => { for (let x = -(cam % 20); x < W; x += 20) f(x, GY + 6, 0.5, 20, '#000'); });
    al(0.14, () => f(0, GY + 1, W, 3, '#000'));
  };
  const aqua0 = BG.aqua;
  BG.aqua = function (e) {
    aqua0(e);
    const W = e.W, GY = e.GY;
    for (let i = 0; i < 26; i++) { const x = ((rnd(i + 600) * 500 - e.cam * 0.2) % W + W) % W, y = (rnd(i + 601) * 110 - e.t * (3 + rnd(i) * 4)) % 110; px(x, (y + 110) % 110, '#5fd0ff'); }
    al(0.25, () => { for (let x = 0; x < W; x += 6) f(x, GY, 3, 0.5, '#5fd0ff'); });
    al(0.1, () => f(0, GY + 1, W, 4, '#5fd0ff'));
  };
  const sky0 = BG.sky;
  BG.sky = function (e) {
    sky0(e);
    const W = e.W, H = e.H, t = e.o.time || 'day';
    if (t !== 'night') for (let i = 0; i < 5; i++) al(0.3, () => f(((i * 83 - e.t * (3 + i) - e.cam * 0.1) % (W + 40) + W + 40) % (W + 40) - 20, 20 + i * 14, 20 + i * 6, 0.5, '#ffffff'));
  };

  // ===================== предметы =====================
  const ground2 = (x, gy, w, a = 0.2, dx = 0) => al(a, () => f(x + dx, gy - 0.5, w, 1.5, '#000'));

  wrap('lamp', (x, gy, p, e) => {
    const on = !!(dark(e.o.time) || e.o.time === 'dawn' || p.on), col = '#2a2547';
    f(x + 0.5, gy - 26, 0.5, 26, mix(col, 0.35)); f(x - 1.5, gy - 3, 4, 3, col); f(x - 1.5, gy - 3, 4, 0.5, mix(col, 0.3)); f(x - 0.5, gy - 9, 2, 1, mix(col, 0.2)); f(x - 0.5, gy - 16, 2, 0.5, mix(col, 0.2));
    f(x - 2, gy - 27.5, 5, 0.5, mix(col, 0.3)); f(x - 2.5, gy - 29.5, 6, 0.5, col); f(x - 2, gy - 30, 5, 0.5, mix(col, 0.25));
    if (on) { f(x - 0.5, gy - 28.5, 2, 0.5, '#ffffff'); al(0.06, () => disc(x, gy - 28, 16, '#ffe9a8')); al(0.12, () => f(x - 14, gy - 1.5, 29, 1.5, '#ffe9a8')); al(0.08, () => f(x - 9, gy - 0.5, 19, 1, '#ffe9a8')); }
    else f(x - 0.5, gy - 28.5, 1.5, 0.5, '#9a9ab0');
  });
  wrap('tree', (x, gy, p, e) => {
    const kind = p.kind || 'bare', pal = p.pal || (p.kind ? null : ['#2b2238', e.o.ground === 'snow' ? '#ffffff' : null]);
    if (kind === 'bare') {
      const k = (pal && pal[0]) || '#2b2238';
      f(x, gy - 18, 0.5, 18, mix(k, 0.3)); f(x + 1.5, gy - 18, 0.5, 18, mix(k, -0.4)); f(x - 1.5, gy - 2, 5, 2, k); f(x - 1, gy - 3, 4, 1, k);
      f(x - 3.5, gy - 16.5, 0.5, 1.5, k); f(x - 6, gy - 20.5, 1, 0.5, k); f(x + 6.5, gy - 18.5, 1, 0.5, k); f(x - 3, gy - 23, 1, 0.5, k); f(x + 3, gy - 25, 1, 0.5, k); f(x + 7, gy - 13.5, 1, 0.5, k); f(x - 2.5, gy - 12, 0.5, 5, k); f(x - 3, gy - 12.5, 2, 0.5, k);
      if (pal && pal[1]) { for (const s of [[-5, -20], [5, -18], [1, -25], [-4, -17], [3, -13], [7, -17]]) f(x + s[0], gy + s[1] - 0.5, 2.5, 0.5, '#ffffff'); f(x - 4, gy - 16.5, 1, 0.5, '#fff'); f(x + 1.5, gy - 4, 0.5, 2, '#ffffff99'); }
    } else if (kind === 'pine') { /* см. pine */ }
    else {
      const g1 = (pal && pal[0]) || '#2f6b4f', g2 = (pal && pal[1]) || '#3f8a5f';
      f(x, gy - 12, 0.5, 12, '#6a4a38'); f(x + 1.5, gy - 12, 0.5, 12, '#2e2018'); f(x - 1.5, gy - 2, 5, 2, '#4a3428');
      al(0.9, () => { for (let i = 0; i < 34; i++) { const a = rnd(i + x) * 6.28, rr = Math.sqrt(rnd(i + 50)) * 7; const cx = x + 1 + Math.cos(a) * rr, cy = gy - 17 + Math.sin(a) * rr; f(cx, cy, 1, 0.5, i % 3 ? mix(g2, 0.22) : mix(g1, -0.25)); } });
      f(x - 4, gy - 13.5, 12, 0.5, mix(g1, -0.3));
    }
  });
  wrap('pine', (x, gy, p) => {
    for (let i = 0; i < 5; i++) {
      const tx = x - 1 - i, ty = gy - 8 - (4 - i) * 4, w = 4 + i * 2;
      f(tx, ty + 3.5, w, 0.5, '#143226'); f(tx, ty + 1.5, 0.5, 2, '#143226'); al(0.5, () => { for (let k = 1; k < w - 1; k += 2) f(tx + k, ty + 2 + (k % 3) * 0.5, 0.5, 1, '#8fd0a0'); });
      if (p.snow !== false) { f(tx, ty - 0.5, w, 0.5, '#ffffff'); f(tx + 1, ty, w - 2, 0.5, '#ffffffbb'); f(tx - 0.5, ty + 0.5, 1, 0.5, '#fff'); f(tx + w - 0.5, ty + 0.5, 1, 0.5, '#fff'); }
    }
    f(x + 0.5, gy - 4, 0.5, 4, '#6a4a38'); f(x - 1, gy - 1, 4, 1, '#2e2018');
  });
  wrap('bench', (x, gy, p, e) => {
    const c = '#6b4a34';
    f(x, gy - 6, 16, 0.5, mix(c, 0.25)); f(x, gy - 11, 16, 0.5, mix(c, 0.25)); f(x, gy - 4.5, 16, 0.5, mix(c, -0.3)); f(x, gy - 9.5, 16, 0.5, mix(c, -0.3));
    f(x + 4, gy - 5.5, 0.5, 1, mix(c, -0.2)); f(x + 9, gy - 10.5, 0.5, 1, mix(c, -0.2)); f(x + 12, gy - 5.5, 3, 0.5, mix(c, 0.15)); f(x + 2, gy - 10.5, 3, 0.5, mix(c, 0.15));
    f(x + 1.5, gy - 9, 0.5, 9, '#4a4568'); f(x + 14.5, gy - 9, 0.5, 9, '#4a4568'); f(x, gy - 1, 3, 1, '#2b2238'); f(x + 13, gy - 1, 3, 1, '#2b2238'); f(x - 0.5, gy - 8, 1, 3, '#2b2238'); f(x + 15.5, gy - 8, 1, 3, '#2b2238');
    ground2(x, gy, 17, 0.18);
    if (e.o.ground === 'snow' || p.snow) { f(x, gy - 12, 16, 0.5, '#ffffff'); f(x + 1, gy - 12.5, 12, 0.5, '#fff'); f(x - 0.5, gy - 6.5, 17, 0.5, '#fff'); f(x + 2, gy - 7, 10, 0.5, '#ffffffcc'); }
  });
  wrap('snowpile', (x, gy, p) => {
    const s = p.s || 7;
    al(0.35, () => { f(x - s, gy + 2.5, s * 2, 1.5, '#9fb4d0'); disc(x + 8, gy + 4, s - 3, '#9fb4d0'); });
    al(0.9, () => { f(x - s * 0.6, gy - s * 0.3, s * 0.8, 0.5, '#fff'); });
    for (let i = 0; i < 5; i++) if (rnd(i + x) < 0.6) px(x - s + rnd(i + 3) * s * 2, gy - s * 0.2 + rnd(i + 9) * s, '#ffffff');
  });
  wrap('window', (x, gy, p, e) => {
    const n = p.night !== undefined ? p.night : dark(e.o.time);
    f(x + 0.5, gy - 61.5, 29, 0.5, '#ffffff'); f(x + 0.5, gy - 61.5, 0.5, 25, '#ffffff'); f(x + 29, gy - 61, 0.5, 24, '#b8ad96'); f(x + 1, gy - 37, 28, 0.5, '#b8ad96');
    f(x + 13.5, gy - 61, 0.5, 24, '#ffffffcc'); f(x + 16, gy - 61, 0.5, 24, '#b8ad96'); f(x + 1, gy - 50.5, 28, 0.5, '#ffffffcc'); f(x + 1, gy - 49.5, 28, 0.5, '#b8ad96');
    f(x - 2, gy - 34.5, 34, 0.5, '#b8ad96'); f(x - 2, gy - 36, 34, 0.5, '#ffffff'); f(x - 1, gy - 34, 32, 1.5, '#00000030');
    al(n ? 0.12 : 0.28, () => { for (let k = 0; k < 3; k++) { ln(x + 4 + k * 8, gy - 60, x + 1 + k * 8, gy - 52, '#ffffff'); } f(x + 3, gy - 58, 6, 0.5, '#ffffff'); });
    if (!n) { al(0.35, () => f(x + 1, gy - 61, 28, 4, '#5d93c8')); al(0.5, () => { f(x + 4, gy - 55, 8, 1.5, '#fff'); f(x + 19, gy - 47, 6, 1.5, '#fff'); }); }
    else { for (let k = 0; k < 6; k++) px(x + 3 + ((k * 11) % 25), gy - 36 - 2 - (k * 5) % 9, '#ffd98a'); }
    if (p.curtain) { const c = p.curtain; for (let k = 0; k < 2; k++) { const cx = k ? x + 27 : x - 3; for (let i = 0; i < 6; i += 2) f(cx + i + 0.5, gy - 64, 0.5, 30, mix(c, -0.25)); f(cx + 1, gy - 64, 0.5, 30, mix(c, 0.2)); f(cx, gy - 35, 6, 0.5, mix(c, -0.3)); } f(x - 5, gy - 65, 40, 1, '#8a7a66'); f(x - 5, gy - 65, 40, 0.5, '#c9b89a'); }
  });
  wrap('door', (x, gy, p) => {
    const c = p.col || '#5a3d2e';
    f(x + 3, gy - 30, 12, 0.5, mix(c, -0.35)); f(x + 3, gy - 30, 0.5, 11, mix(c, -0.35)); f(x + 3, gy - 19.5, 12, 0.5, mix(c, 0.25)); f(x + 14.5, gy - 30, 0.5, 11, mix(c, 0.25));
    f(x + 3, gy - 16, 12, 0.5, mix(c, -0.35)); f(x + 3, gy - 16, 0.5, 12, mix(c, -0.35)); f(x + 3, gy - 4.5, 12, 0.5, mix(c, 0.25)); f(x + 14.5, gy - 16, 0.5, 12, mix(c, 0.25));
    f(x + 13.5, gy - 18, 2, 0.5, '#fff0b0'); f(x + 14, gy - 17, 1, 1, '#c9a43a'); f(x + 1, gy - 28, 0.5, 2, '#14100a'); f(x + 1, gy - 8, 0.5, 2, '#14100a'); ground2(x, gy, 18, 0.25);
  });
  wrap('sofa', (x, gy, p) => {
    const c = p.col || '#7a4a6a';
    f(x + 19.5, gy - 12, 0.5, 9.5, mix(c, -0.3)); f(x + 1, gy - 17.5, 38, 0.5, mix(c, 0.2)); f(x - 1, gy - 12.5, 40, 0.5, mix(c, 0.3));
    for (const bx of [8, 20, 31]) { px(x + bx, gy - 15, mix(c, -0.3)); }
    f(x - 3, gy - 15, 0.5, 13, mix(c, 0.2)); f(x - 3, gy - 3, 5, 1, mix(c, -0.25)); f(x + 38, gy - 3, 5, 1, mix(c, -0.25)); f(x + 42.5, gy - 15, 0.5, 13, mix(c, -0.3));
    f(x - 2, gy - 2.5, 44, 0.5, mix(c, -0.3)); f(x, gy - 8, 40, 0.5, mix(c, -0.12)); ground2(x - 2, gy, 46, 0.2);
  });
  wrap('bed', (x, gy, p) => {
    const c = p.col || '#8a5a7a';
    f(x + 12, gy - 13, 38, 0.5, mix(c, 0.25)); for (let k = 0; k < 4; k++) f(x + 16 + k * 9, gy - 12, 0.5, 5, mix(c, -0.22)); f(x + 12, gy - 7.5, 38, 0.5, mix(c, -0.3)); f(x + 20, gy - 10, 12, 0.5, mix(c, 0.12));
    f(x + 1, gy - 15, 10, 0.5, '#ffffff'); f(x + 1, gy - 11.5, 10, 0.5, '#d8d2c0'); f(x + 3, gy - 13.5, 5, 0.5, '#e8e4d6');
    f(x - 2, gy - 20, 0.5, 20, '#8a6242'); f(x - 1, gy - 20, 3, 0.5, '#8a6242'); f(x + 49, gy - 12, 3, 0.5, '#8a6242'); f(x, gy - 8, 50, 0.5, '#8a6242'); ground2(x - 2, gy, 54, 0.2);
  });
  wrap('table', (x, gy, p) => {
    const c = p.col || '#8a6242', w = p.w || 26;
    f(x, gy - 13, w, 0.5, mix(c, 0.28)); f(x, gy - 11, w, 0.5, mix(c, -0.3)); f(x + 1, gy - 10.5, w - 2, 1, mix(c, -0.2));
    f(x + 3, gy - 12.5, w * 0.4, 0.5, mix(c, -0.1)); f(x + w * 0.55, gy - 12, w * 0.3, 0.5, mix(c, -0.12));
    f(x + 2, gy - 11, 0.5, 11, mix(c, 0.15)); f(x + w - 4, gy - 11, 0.5, 11, mix(c, 0.15)); f(x + 2, gy - 1, 2, 1, mix(c, -0.4)); f(x + w - 4, gy - 1, 2, 1, mix(c, -0.4));
    ground2(x, gy, w, 0.22);
  });
  wrap('chair', (x, gy, p) => {
    const c = p.c || '#6b4a34', bx = p.flip ? 7 : 0;
    f(x, gy - 9, 8, 0.5, mix(c, 0.28)); f(x, gy - 7.5, 8, 0.5, mix(c, -0.3)); f(x + bx, gy - 19, 0.5, 19, mix(c, 0.2)); f(x + bx + 0.5, gy - 19, 0.5, 19, mix(c, -0.2));
    for (let k = 0; k < 3; k++) f(x + (p.flip ? 4.5 : 0.5), gy - 18 + k * 3, 3, 0.5, mix(c, -0.25));
    f(x + (p.flip ? 0 : 7), gy - 1, 1, 1, mix(c, -0.4)); f(x + (p.flip ? 7 : 0), gy - 1, 1, 1, mix(c, -0.4)); ground2(x, gy, 9, 0.18);
  });
  wrap('cup', (x, gy, p) => {
    const c = p.col || '#f6ecd9';
    f(x, gy - 17, 4, 0.5, '#2b1a18'); f(x + 0.5, gy - 16.5, 3, 0.5, '#7a4a2a'); f(x + 3, gy - 16, 0.5, 3, mix(c, -0.15)); f(x + 0.5, gy - 16, 0.5, 2.5, '#ffffff'); f(x, gy - 13.5, 4, 0.5, mix(c, -0.25)); f(x - 1, gy - 13, 6, 0.5, mix(c, -0.1));
    f(x - 0.5, gy - 12.5, 5, 0.5, '#00000030');
  });
  wrap('plate', (x, gy, p) => {
    const c = p.col || '#e8b25a';
    f(x, gy - 14, 8, 0.5, '#ffffff'); f(x + 1, gy - 13.5, 6, 0.5, '#c9c2b0'); f(x + 1.5, gy - 16, 5, 0.5, mix(c, 0.3)); f(x + 1, gy - 14.5, 6, 0.5, mix(c, -0.25)); px(x + 3, gy - 15.5, mix(c, -0.3)); px(x + 5, gy - 15, mix(c, 0.2));
    f(x, gy - 13, 8, 0.5, '#00000030');
  });
  wrap('plant', (x, gy) => {
    f(x - 0.5, gy - 7, 9, 1.5, '#c9744a'); f(x - 0.5, gy - 7, 9, 0.5, '#e8956a'); f(x, gy - 5.5, 8, 0.5, '#8a4a2a'); f(x + 6, gy - 5, 2, 5, '#9a5a35'); f(x + 1, gy - 6.5, 6, 0.5, '#3a2a22'); f(x, gy - 1, 8, 0.5, '#8a4a2a');
    al(0.9, () => { for (const s of [[-1, -17], [1, -14], [5, -19], [8, -17], [3, -23], [6, -21], [4, -15]]) { f(x + s[0], gy + s[1], 2, 0.5, '#7fd9a0'); f(x + s[0] + 1, gy + s[1] + 1, 1, 0.5, '#2a6a44'); } });
    f(x + 3.5, gy - 16, 0.5, 8, '#1f5a3a'); ground2(x - 1, gy, 11, 0.2);
  });
  wrap('fridge', (x, gy) => {
    f(x + 0.5, gy - 43.5, 0.5, 43, '#ffffff'); f(x + 19, gy - 43, 0.5, 42, '#b8bcc8'); f(x + 1, gy - 27.5, 18, 0.5, '#ffffff'); f(x + 16, gy - 38, 0.5, 6, '#ffffffcc'); f(x + 16.5, gy - 38, 0.5, 6, '#5a5f70'); f(x + 16, gy - 24, 0.5, 8, '#ffffffcc'); f(x + 16.5, gy - 24, 0.5, 8, '#5a5f70');
    f(x + 4, gy - 39.5, 4, 0.5, '#d94a7a'); f(x + 9, gy - 36.5, 3, 0.5, '#d9a82a'); f(x + 2, gy - 3, 16, 0.5, '#b8bcc8'); f(x + 2, gy - 2, 16, 0.5, '#b8bcc8'); f(x + 1, gy - 1, 3, 1, '#5a5f70'); f(x + 16, gy - 1, 3, 1, '#5a5f70'); ground2(x, gy, 21, 0.25);
  });
  wrap('stove', (x, gy) => {
    f(x + 0.5, gy - 21.5, 21, 0.5, '#ffffff'); f(x + 4, gy - 11, 14, 0.5, '#3a3d56'); ln(x + 5, gy - 10, x + 9, gy - 5, '#ffffff33'); ln(x + 8, gy - 11, x + 12, gy - 6, '#ffffff22');
    f(x + 3, gy - 14, 16, 0.5, '#8a90a0'); for (const k of [3, 7, 11, 15]) f(x + k, gy - 17, 1.5, 1.5, '#4a4d5a'); f(x + 4, gy - 26.5, 10, 0.5, '#6a6f7f'); f(x + 3, gy - 25.5, 12, 0.5, '#1a1a28'); f(x + 4, gy - 3, 14, 0.5, '#8a90a0'); f(x + 1, gy - 1, 3, 1, '#6a6f7f'); f(x + 18, gy - 1, 3, 1, '#6a6f7f'); ground2(x, gy, 23, 0.22);
  });
  wrap('shelf', (x, gy) => {
    f(x + 0.5, gy - 45.5, 27, 0.5, '#8a6242'); f(x + 27, gy - 45, 0.5, 44, '#4a3428'); for (let k = 0; k < 3; k++) { f(x + 1, gy - 31.5 + k * 14, 26, 0.5, '#9a7252'); f(x + 1, gy - 30.5 + k * 14, 26, 1, '#00000035'); }
    for (let k = 0; k < 3; k++) for (let b = 0; b < 8; b++) f(x + 2 + b * 3, gy - 44 + k * 14 + (b % 3), 0.5, 11 - (b % 3), '#ffffff55');
    ground2(x, gy, 28, 0.22);
  });
  wrap('tv', (x, gy, p) => {
    f(x + 3, gy - 36, 12, 0.5, '#ffffff33'); ln(x + 4, gy - 35, x + 8, gy - 28, '#ffffff22'); f(x + 29, gy - 18.5, 3, 0.5, '#7ad6a0'); f(x + 6, gy - 13, 22, 0.5, '#8a6242'); f(x + 6, gy - 1, 22, 1, '#3a2a22'); f(x + 14, gy - 15.5, 6, 0.5, '#8a90a0'); ground2(x + 4, gy, 26, 0.2);
  });
  wrap('counter', (x, gy, p) => {
    const w = p.w || 46, c = p.col || '#8a6242';
    f(x - 1, gy - 24, w + 2, 0.5, '#ffffff'); f(x - 1, gy - 21.5, w + 2, 0.5, '#b8ad96'); for (let k = 4; k < w - 6; k += 14) { f(x + k, gy - 18, 11, 0.5, mix(c, -0.35)); f(x + k, gy - 18, 0.5, 14, mix(c, -0.35)); f(x + k + 10.5, gy - 18, 0.5, 14, mix(c, 0.2)); f(x + k, gy - 4.5, 11, 0.5, mix(c, 0.2)); f(x + k + 8, gy - 12, 2, 0.5, '#d9c88a'); }
    ground2(x, gy, w, 0.22);
  });
  wrap('seats', (x, gy, p) => {
    const c = p.col || '#7a1f2e';
    for (let i = 0; i < (p.n || 6); i++) { const sx = x + i * 14; f(sx + 1, gy - 15.5, 9, 0.5, mix(c, 0.3)); f(sx, gy - 5, 11, 0.5, mix(c, 0.2)); f(sx + 5, gy - 14, 0.5, 8, mix(c, -0.2)); f(sx + 10.5, gy - 16, 0.5, 12, mix(c, -0.3)); f(sx, gy - 1.5, 11, 0.5, mix(c, -0.4)); }
  });
  wrap('suitcase', (x, gy, p) => {
    const c = p.col || '#c8323c';
    f(x + 1, gy - 12.5, 8, 0.5, mix(c, 0.3)); f(x + 3, gy - 12, 0.5, 11, mix(c, -0.25)); f(x + 6.5, gy - 12, 0.5, 11, mix(c, -0.25)); f(x + 3.5, gy - 15.5, 3, 0.5, '#4a4d5a'); f(x + 1, gy - 0.5, 1, 1, '#2a2a3a'); f(x + 8, gy - 0.5, 1, 1, '#2a2a3a'); ground2(x, gy, 11, 0.22);
  });
  wrap('bus', (x, gy, p, e) => {
    const c = p.col || '#e8e2d0';
    f(x + 1, gy - 27.5, 72, 0.5, '#ffffff'); f(x + 1, gy - 5, 72, 0.5, mix(c, -0.25)); for (let i = 0; i < 5; i++) { f(x + 5 + i * 13, gy - 25, 10, 0.5, '#ffffffaa'); ln(x + 6 + i * 13, gy - 23, x + 9 + i * 13, gy - 18, '#ffffff55'); }
    f(x + 36, gy - 26, 0.5, 21, '#14122b'); f(x + 40, gy - 26, 0.5, 21, '#14122b'); disc(x + 14, gy - 3, 2, '#8a90a0'); disc(x + 58, gy - 3, 2, '#8a90a0'); px(x + 14, gy - 3, '#14122b'); px(x + 58, gy - 3, '#14122b');
    f(x + 72, gy - 9, 2, 1, '#fff6cf'); if (dark(e.o.time)) al(0.15, () => f(x + 74, gy - 10, 16, 5, '#fff6cf')); ground2(x, gy, 76, 0.25);
  });
  wrap('car', (x, gy, p, e) => {
    const c = p.col || '#ffd23d';
    f(x + 6, gy - 16, 18, 0.5, mix(c, 0.35)); f(x, gy - 10, 32, 0.5, mix(c, 0.3)); f(x + 1, gy - 4.5, 30, 0.5, mix(c, -0.3)); f(x + 8, gy - 15, 6, 0.5, '#ffffff99'); ln(x + 17, gy - 14, x + 19, gy - 11, '#ffffff66'); disc(x + 7, gy - 3, 1, '#c9ced8'); disc(x + 25, gy - 3, 1, '#c9ced8'); f(x + 15, gy - 10, 0.5, 6, mix(c, -0.3)); f(x + 18, gy - 8.5, 2, 0.5, mix(c, -0.35));
    f(x + 31, gy - 8, 1, 1, '#fff6cf'); if (dark(e.o.time)) al(0.18, () => f(x + 32, gy - 9, 12, 5, '#fff6cf')); ground2(x, gy, 34, 0.25);
  });
  wrap('train', (x, gy, p, e) => {
    for (let k = 0; k < (p.n || 3); k++) { const cx = x + k * 92; f(cx + 1, gy - 33.5, 88, 0.5, '#ffffff'); f(cx + 1, gy - 5, 88, 0.5, '#8a90a0'); f(cx + 38.5, gy - 30, 0.5, 24, '#8a90a0'); f(cx + 45, gy - 30, 0.5, 24, '#8a90a0'); for (let i = 0; i < 6; i++) ln(cx + 7 + i * 14, gy - 29, cx + 10 + i * 14, gy - 24, '#ffffff55'); f(cx, gy - 4, 90, 1, '#3a3d4a'); disc(cx + 14, gy - 2, 1, '#8a90a0'); disc(cx + 76, gy - 2, 1, '#8a90a0'); }
  });
  wrap('building', (x, gy, p, e) => {
    const w = p.w || 60, h = p.h || 70, c = p.col || '#7a6a8a';
    f(x, gy - h + 2, w, 0.5, mix(c, 0.2)); f(x, gy - h + 2.5, w, 0.5, mix(c, -0.3)); f(x + 0.5, gy - h, 0.5, h, mix(c, 0.15));
    for (let wy = gy - h + 7; wy < gy - 16; wy += 13) { f(x, wy + 10, w, 0.5, mix(c, -0.2)); for (let wx = 5; wx < w - 8; wx += 11) { f(x + wx - 1, wy + 8.5, 9, 1, mix(c, 0.25)); f(x + wx + 3.5, wy, 0.5, 8, mix(c, -0.5)); ln(x + wx + 1, wy + 5, x + wx + 3, wy + 2, '#ffffff44'); } }
    f(x, gy - 2, w, 2, mix(c, -0.3)); ground2(x, gy, w, 0.15);
  });
  wrap('picture', (x, gy, p) => { const y = gy - (p.y || 66), w = p.w || 20, h = p.h || 16; f(x + 1, y + 1, w - 2, 0.5, '#ffffff44'); f(x, y + h, w, 0.5, '#00000040'); f(x + 1, y + h + 0.5, w, 1, '#00000025'); });
  wrap('kiosk', (x, gy) => { f(x + 4, gy - 24, 26, 0.5, '#ffffff'); f(x + 4, gy - 14.5, 26, 0.5, '#c9b88a'); f(x - 2, gy - 29, 38, 0.5, '#ffffff55'); for (let k = 0; k < 9; k++) f(x - 2 + k * 4.5, gy - 29, 2.2, 3.5, '#ffffff44'); ground2(x - 2, gy, 38, 0.22); });
  wrap('stop', (x, gy) => { f(x + 0.5, gy - 30, 0.5, 30, '#6a6f7f'); f(x + 36.5, gy - 30, 0.5, 30, '#6a6f7f'); ln(x + 6, gy - 28, x + 14, gy - 12, '#ffffff55'); ln(x + 20, gy - 28, x + 26, gy - 18, '#ffffff33'); f(x + 6, gy - 8.5, 26, 0.5, '#8a6a52'); ground2(x, gy, 38, 0.2); });
  wrap('xmas', (x, gy, p, e) => { for (let i = 0; i < 5; i++) f(x + 6 - i, gy - 9 - (5 - i) * 5 + 4.5, 3 + i * 2, 0.5, '#143a2a'); for (let i = 0; i < 6; i++) f(x + 5 - i + 1, gy - 9 - (5 - i) * 5, 1, 4, '#4a9a6a88'); f(x + 4, gy - 1, 7, 1, '#3a2a22'); });

  // ===================== Нерчинская (по фото с Нового года) =====================
  wrap('worldmap', (x, gy) => {
    const y = gy - 104;
    al(0.3, () => { f(x + 1, y + 34, 82, 21, '#2a6498'); f(x + 1, y + 1, 82, 10, '#7fc0e4'); });
    for (let k = 1; k < 7; k++) al(0.1, () => f(x + k * 12, y + 1, 0.5, 54, '#ffffff'));
    [[6, 8, 16, 14], [10, 22, 9, 22], [14, 40, 5, 9], [34, 8, 12, 10], [36, 18, 12, 18], [40, 36, 6, 9], [48, 6, 28, 16], [56, 22, 12, 9], [66, 34, 12, 8]].forEach((l, i) => {
      f(x + l[0], y + l[1] + l[3] - 1, l[2], 1, '#00000030'); f(x + l[0], y + l[1], l[2], 0.5, '#ffffff55'); f(x + l[0], y + l[1], 0.5, l[3], '#ffffff33');
      al(0.5, () => { for (let k = 0; k < 4; k++) f(x + l[0] + 1 + rnd(i * 5 + k) * (l[2] - 3), y + l[1] + 1 + rnd(i * 7 + k) * (l[3] - 3), 2, 0.5, '#7a5a2a'); });
    });
    f(x + 20, y + 24, 0.5, 18, '#a84a2a'); f(x + 12, y + 30, 6, 0.5, '#a84a2a'); f(x + 56, y + 14, 12, 0.5, '#a84a2a'); f(x + 40, y + 24, 8, 0.5, '#a84a2a');
    f(x, y + 55, 84, 1, '#5a3d2e'); f(x, y + 56, 84, 0.5, '#00000050'); al(0.2, () => f(x + 1, y + 56.5, 84, 2, '#000'));
  });
  wrap('hatlamp', (x, gy, p, e) => {
    const top = gy - 92;
    for (let i = 0; i < 12; i++) { const w = 5 + i * 4; f(x - 2 - i * 2, top + i, w, 1, i % 2 ? '#c8b78e' : '#d6c8a2'); f(x - 2 - i * 2, top + i + 0.5, w, 0.5, i % 2 ? '#a8966a' : '#b9a880'); f(x - 2 - i * 2, top + i, 2, 1, '#e8dcc0'); f(x - 2 - i * 2 + w - 2, top + i, 2, 1, '#9a8860'); }
    for (let k = -5; k <= 5; k++) al(0.35, () => ln(x + k * 0.5, top + 1, x + k * 5, gy - 81, '#8a7a52'));
    f(x - 25, gy - 80, 51, 1, '#a8966a'); f(x - 25, gy - 79.5, 51, 0.5, '#7a6a42'); f(x - 24, gy - 80, 49, 0.5, '#efe4c8');
    f(x - 0.5, 0, 1, top, '#2a1f18'); f(x - 1.5, top - 1, 3, 2, '#1a1410');
    al(0.28, () => f(x - 8, gy - 79, 17, 1.5, '#fff2c0')); al(0.16, () => disc(x, gy - 76, 12, '#ffe9a8'));
  });
  wrap('clock', (x, gy) => {
    const y = gy - 84; f(x - 5, y - 1, 10, 0.5, '#d68a5a'); f(x - 4.5, y + 3.5, 9, 1, '#7a3f1f');
    for (const [dx, dy] of [[0, -3.5], [3.5, 0], [0, 3.5], [-3.5, 0]]) f(x + dx, y + dy, 0.5, 0.5, '#8a6a52');
    f(x, y, 0.5, -2.5, '#14122b'); f(x, y - 0.5, 0.5, 0.5, '#c8323c'); f(x - 3, y - 4, 2, 0.5, '#ffffff66');
  });
  wrap('strings', (x, gy, p, e) => {
    const n = p.n || 30;
    for (let i = 0; i < n; i++) {
      const xx = x + i * (p.step || 8), yy = gy - (p.y || 104) + Math.round(Math.sin(i * 0.55 + (p.ph || 0)) * (p.amp || 7)) + (p.drop ? i * p.drop : 0);
      const on = (Math.floor(e.t * 2) + i) % 5 !== 0;
      f(xx - 0.5, yy - 2, 1.5, 0.5, '#3a3a48'); if (on) { f(xx + 0.5, yy + 0.5, 0.5, 0.5, '#ffffffcc'); al(0.12, () => disc(xx + 1, yy + 1, 5, '#ffffff')); }
      if (i < n - 1) { const x2 = xx + (p.step || 8), y2 = gy - (p.y || 104) + Math.round(Math.sin((i + 1) * 0.55 + (p.ph || 0)) * (p.amp || 7)) + (p.drop ? (i + 1) * p.drop : 0); for (let k = 1; k < 6; k++) f(xx + 1 + (x2 - xx) * k / 6, yy - 1.5 + (y2 - yy) * k / 6 + Math.sin(k / 6 * 3.14) * 1.5, 0.5, 0.5, '#1c1c28'); }
    }
  });
  wrap('pc', (x, gy, p, e) => {
    f(x, gy - 16, 34, 0.5, '#b08a62'); f(x + 2, gy - 14, 0.5, 14, '#8a6242'); f(x + 9, gy - 18.5, 14, 0.5, '#2a2a3a'); f(x + 11, gy - 17.5, 8, 1, '#c9ced8'); f(x + 24, gy - 17.5, 2, 1, '#e8e8ee');
    al(0.25, () => ln(x + 9, gy - 34, x + 15, gy - 26, '#fff')); f(x + 26.5, gy - 12, 0.5, 11, '#4a4d6a'); f(x + 28, gy - 11, 1, 0.5, '#7ad6a0'); ground2(x, gy, 34, 0.22);
  });
  wrap('feast', (x, gy) => {
    const y = gy - 13; f(x + 14.5, y - 8, 0.5, 8, '#e8c25a'); f(x + 15, y - 14, 0.5, 6, '#2f7a4a'); f(x + 30.5, y - 11, 0.5, 11, '#ffffff66'); f(x + 25, y - 8.5, 3, 0.5, '#ffffffaa');
    f(x + 39, y - 5, 7, 0.5, '#ffe36a'); f(x + 39.5, y - 3, 3, 0.5, '#c88a1a'); f(x + 2, y - 0.5, 9, 0.5, '#bdb6a0');
    al(0.2, () => f(x, y, 47, 1.5, '#000'));
  });

  // ===================== Школьная (по фото стенки и комнаты) =====================
  wrap('stenka', (x, gy, p) => {
    const w = p.w || 66, WD = '#c98a3a', WD2 = '#a86a22', WD3 = '#e0a850';
    // лак на дереве: блики и волокна
    for (let k = 0; k < w; k += 9) { al(0.35, () => f(x + k + 2, gy - 27, 0.5, 26, '#fff0c0')); al(0.25, () => f(x + k + 6, gy - 26, 0.5, 24, '#7a4a12')); }
    f(x - 1, gy - 30, w + 2, 0.5, '#fff0c0'); f(x - 1, gy - 27.5, w + 2, 0.5, '#7a4a12'); f(x, gy - 80, w, 0.5, '#f0c070'); f(x, gy - 80, 0.5, 80, '#f0c070'); f(x + w - 0.5, gy - 80, 0.5, 80, '#7a4a12');
    for (let i = 0; i < w; i += 16) { f(x + i + 11, gy - 17, 1.5, 4, '#3a2a22'); f(x + i + 11, gy - 17, 0.5, 4, '#e8c080'); }
    f(x, gy - 1, w, 1, '#5a3a1a');
    // стекло: диагональные отражения и край стекла
    al(0.3, () => { ln(x + 4, gy - 76, x + 12, gy - 56, '#ffffff'); ln(x + 7, gy - 76, x + 15, gy - 62, '#ffffff'); ln(x + 18, gy - 52, x + 25, gy - 34, '#ffffff'); ln(x + 21, gy - 52, x + 27, gy - 40, '#ffffff'); });
    f(x + 2, gy - 78, 26, 0.5, '#f0c070'); f(x + 2, gy - 30.5, 26, 0.5, '#7a4a12'); f(x + 27.5, gy - 78, 0.5, 48, '#7a4a12');
    // полки: тень и блеск, банки и книги
    for (const yy of [62, 46]) { f(x + 30, gy - yy, w - 32, 0.5, '#f0c070'); f(x + 30, gy - yy + 2, w - 32, 1, '#00000045'); }
    al(0.6, () => { for (let i = 0; i < 5; i++) f(x + 34 + i * 5, gy - 55.5, 0.5, 6, '#ffffff'); });
    f(x + 34, gy - 40, 12, 0.5, '#e86a6a'); f(x + 36, gy - 38, 8, 0.5, '#8a1f2e'); f(x + 50, gy - 38, 3, 0.5, '#fff6a8');
    // плакаты: складки и строки текста
    for (let i = 0; i < 7; i++) { const px0 = x + 2 + i * 9, hh = 9 + i * 1.2; f(px0, gy - 80 - hh, 0.5, hh + 2, '#ffffff44'); f(px0 + 8.5, gy - 80 - hh, 0.5, hh + 2, '#00000040'); for (let k = 0; k < 4; k++) f(px0 + 1.5 + (k % 2), gy - 77 - hh + k * 2.5, 4 - (k % 2), 0.5, i > 3 ? '#fff0ee' : '#ffe9a8'); }
    ground2(x, gy, w + 2, 0.25);
  });
  wrap('sovWardrobe', (x, gy) => {
    f(x + 1, gy - 75, 0.5, 72, '#ffe0a0'); f(x + 18, gy - 75, 0.5, 72, '#ffe0a0'); f(x + 40, gy - 75, 0.5, 72, '#ffe0a0'); f(x + 33.5, gy - 75, 0.5, 72, '#7a4a12'); f(x + 49, gy - 75, 0.5, 72, '#7a4a12');
    for (let k = 0; k < 3; k++) { f(x + 4 + k * 18, gy - 55, 0.5, 30, '#fff0c0'); al(0.4, () => f(x + 8 + k * 18, gy - 70, 0.5, 40, '#7a4a12')); }
    f(x + 14, gy - 42, 1.5, 5, '#3a2a22'); f(x + 14, gy - 42, 0.5, 5, '#e8c080'); f(x + 20, gy - 42, 1.5, 5, '#3a2a22'); ground2(x, gy, 52, 0.25);
  });
  wrap('wallCarpet', (x, gy, p) => {
    const w = p.w || 62, h = p.h || 32, y = gy - (p.y || 84);
    f(x, y, w, 0.5, '#c04a3a'); f(x, y + h - 0.5, w, 0.5, '#4a1010'); for (let i = 0; i < w; i += 3) { f(x + i, y - 2, 0.5, 2, '#e8c9a0'); f(x + i, y + h, 0.5, 2, '#e8c9a0'); }
    al(0.3, () => { for (let k = 0; k < 6; k++) ln(x + 2 + k * 10, y + 2, x + 2 + k * 10 - 3, y + h - 3, '#000'); });
    al(0.2, () => f(x + 1, y + h + 2, w, 2, '#000'));
  });

  // ===================== Школьная: стол с монитором, кресло, кровать (по фото комнаты) =====================
  P.deskPc = (x, gy, p, e) => {
    const WD = '#4a2f22', c = Math.floor(e.t * 1.5) % 2;
    // стол: тёмное дерево, тумба слева, ножка справа
    f(x, gy - 16, 38, 2, WD); f(x, gy - 16, 38, 0.5, mix(WD, 0.3)); f(x, gy - 14.5, 38, 0.5, mix(WD, -0.35));
    f(x + 1, gy - 14, 12, 14, mix(WD, -0.1)); f(x + 1, gy - 14, 12, 0.5, mix(WD, -0.4)); f(x + 2, gy - 12, 10, 4, mix(WD, 0.05)); f(x + 2, gy - 7, 10, 4, mix(WD, 0.05)); f(x + 6, gy - 10.5, 2, 0.5, '#c9a060'); f(x + 6, gy - 5.5, 2, 0.5, '#c9a060');
    f(x + 35, gy - 14, 2, 14, mix(WD, -0.1)); f(x + 35, gy - 14, 0.5, 14, mix(WD, 0.2)); f(x + 24, gy - 14, 10, 12, '#15151f'); f(x + 25, gy - 13, 8, 0.5, '#2a2a3a'); f(x + 31, gy - 11, 1, 0.5, c ? '#ff4a4a' : '#7a1a1a');   // системник под столом
    // монитор: тёмный экран с цветным кодом
    f(x + 11, gy - 36, 24, 16, '#0a0a14'); f(x + 12, gy - 35, 22, 14, '#17203a');
    const L = [['#6fe08a', 8], ['#7ab0ff', 12], ['#ffb26b', 6], ['#6fe08a', 14], ['#d89aff', 9], ['#7ab0ff', 5], ['#6fe08a', 11]];
    L.forEach((l, i) => f(x + 13 + (i % 3), gy - 34 + i * 1.8, l[1], 0.8, l[0]));
    f(x + 26, gy - 34, 7, 5, '#243a66'); f(x + 27, gy - 33, 5, 0.5, c ? '#ffd166' : '#ff9a6b'); al(0.12, () => f(x + 8, gy - 38, 30, 20, '#7ab0ff'));
    f(x + 11, gy - 36, 24, 0.5, '#3a3a52'); f(x + 21.5, gy - 20, 3, 3, '#14141c'); f(x + 18, gy - 17.5, 10, 1.5, '#14141c');
    // клавиатура с подсветкой, мышь, кружка
    f(x + 14, gy - 17.5, 14, 1.5, '#5a3a8a'); for (let k = 0; k < 14; k += 2) f(x + 14 + k, gy - 17.5, 1, 0.5, ['#ff5ca8', '#7ad6ff', '#ffd166', '#7aff9a'][(k / 2 + Math.floor(e.t * 3)) % 4 | 0]);
    f(x + 30, gy - 17.5, 3, 1.5, '#1c1c24'); f(x + 36, gy - 19, 3, 3, '#f2d0d0'); f(x + 36, gy - 19, 3, 0.5, '#ffffff');
    // настольная лампа с чёрной дугой
    f(x + 3, gy - 18, 5, 2, '#14141c'); f(x + 5, gy - 29, 0.5, 11, '#14141c'); f(x + 5, gy - 29.5, 6, 0.5, '#14141c'); f(x + 9, gy - 29, 4, 2, '#14141c'); f(x + 10, gy - 27, 2, 0.5, '#ffe9a8');
    // кресло: чёрное геймерское
    const cx = x + 31;
    f(cx + 8, gy - 29, 6, 17, '#15151d'); f(cx + 8, gy - 29, 0.5, 17, '#3a3a48'); f(cx + 9, gy - 27, 2, 5, '#2a2a38');
    f(cx, gy - 13, 14, 3.5, '#1b1b26'); f(cx, gy - 13, 14, 0.5, '#3a3a4a'); f(cx + 1, gy - 10, 11, 0.5, '#0a0a10');
    f(cx + 6, gy - 9.5, 1.5, 7, '#6a6a7a'); f(cx + 1, gy - 2.5, 13, 0.5, '#14141c'); f(cx, gy - 1.5, 2, 1.5, '#14141c'); f(cx + 12, gy - 1.5, 2, 1.5, '#14141c'); f(cx + 6, gy - 1.5, 2, 1.5, '#14141c');
    al(0.22, () => f(x, gy - 0.5, 48, 1.5, '#000'));
  };
  P.bedTeal = (x, gy, p, e) => {
    const T = '#3f8f8c';
    f(x, gy - 6, 50, 3, '#2a2a36'); f(x + 1, gy - 3, 2, 3, '#1c1c26'); f(x + 47, gy - 3, 2, 3, '#1c1c26'); f(x, gy - 6, 50, 0.5, '#4a4a5a');
    f(x + 1, gy - 12, 48, 6.5, T); f(x + 3, gy - 14, 44, 3, mix(T, 0.08)); f(x + 6, gy - 15, 36, 2, mix(T, 0.14)); f(x + 1, gy - 7.5, 48, 2, mix(T, -0.25));
    for (let k = 0; k < 9; k++) { f(x + 4 + k * 5, gy - 13 + (k % 3), 3 + (k % 2) * 2, 0.5, mix(T, 0.35)); f(x + 6 + k * 5, gy - 10 + (k % 2) * 2, 4, 0.5, mix(T, -0.3)); }
    f(x + 1, gy - 12.5, 48, 0.5, mix(T, 0.3)); f(x + 2, gy - 14.5, 8, 0.5, mix(T, 0.3)); f(x + 38, gy - 9, 10, 3, mix(T, -0.18));
    al(0.25, () => f(x - 1, gy - 0.5, 52, 1.5, '#000'));
  };
  S.fx = { f, al, mix, skyline, groundDetail, hill, cloud, dark };
})();
