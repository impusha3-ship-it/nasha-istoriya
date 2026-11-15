// ===== patch3.js — правки сюжета и сцен по замечаниям (подключается после story7.js) =====
(() => {
  const chap = s => STORY.find(c => c.short === s);
  const N = (text, o) => ['n', text, o], D = (text, o) => ['d', text, o], O = (text, o) => ['o', text, o];

  // ---- Блины и «Radio»: квартира на Нерчинской с новогодними декорациями ----
  (() => {
    const c = chap('23.02.2026'); if (!c) return;
    const q = c.steps[1]; if (!q || q.t !== 'walk') return;
    c.place = 'Владивосток, Нерчинская'; q.place = 'Нерчинская';
    // момент с песней: новая версия текста
    const sp = (q.spots || []).find(s => s.end); if (sp && sp.lines.length >= 2 && /Bershy/.test(sp.lines[1][1])) sp.lines.splice(0, 2, N('После этого я пообещал рассказать тебе волшебную историю.'), N('Как одна и та же песня сопровождала меня и на прогулке, и затем внезапно заиграла в сериале.'), N('А потом мы опять слушали Bershy — «Radio».'));
    if (sp) { const j = sp.lines.findIndex(l => /эта песня — про тебя/.test(l[1])); if (j >= 0) { const gone = sp.lines.splice(j, 1)[0]; if (gone[2] && sp.lines.length) { const last = sp.lines[sp.lines.length - 1]; last[2] = Object.assign({}, last[2], gone[2]); } } }
    q.opts = nerch([{ k: 'plate', x: 122, col: '#e8703a' }, { k: 'plate', x: 140, col: '#e8703a' }, { k: 'cup', x: 152 }, { k: 'record', x: 184, dy: -24 }]);
  })();

  // ---- Мелисса растёт на Нерчинской (фото той комнаты придёт позже): пока новогодний интерьер ----
  (() => { const q = STORY[27] && STORY[27].steps[0]; if (!q || q.t !== 'walk') return; q.place = 'Владивосток, Нерчинская'; q.opts = nerch([{ k: 'window', x: 96 }]); })();

  // ---- Школьная: один и тот же интерьер во всех сценах ----
  const OUT = new Set(['window', 'fridge', 'stove', 'table', 'plate', 'cup', 'sofa', 'tv', 'laptop', 'shelf', 'chair', 'bed', 'counter', 'curtain', 'bedTeal', 'deskPc', 'wallCarpet', 'stenka', 'sovWardrobe']);
  const SH = [[5, 1], [6, 2], [8, 3], [12, 0], [13, 3], [18, 0], [21, 0], [22, 0], [28, 0], [29, 0]];
  const NIGHT = new Set(['13.3', '22.0']);
  SH.forEach(([ci, si]) => {
    const q = STORY[ci] && STORY[ci].steps[si]; if (!q || !q.opts || !q.opts.props) return;
    const w = q.w || 240, deskX = w <= 240 ? 190 : 210, bedX = 80, stX = 138;
    const keep = [], moved = [];
    q.opts.props.forEach(p => {
      if (p.k === 'gift') moved.push(Object.assign({}, p, { x: bedX + 8 + moved.filter(m => m.k === 'gift').length * 14, dy: -14 }));
      else if (p.k === 'amnyam') moved.push(Object.assign({}, p, { x: stX + 8 + moved.length * 12, dy: -30 }));
      else if (p.k === 'cake') moved.push(Object.assign({}, p, { x: stX + 36, y: 44 }));
      else if (p.k === 'record') moved.push(Object.assign({}, p, { x: stX + 36, dy: -8 }));
      else if (p.k === 'screenSite') moved.push(Object.assign({}, p, { x: deskX - 6, dy: 2 }));
      else if (!OUT.has(p.k)) keep.push(p);
    });
    const base = [{ k: 'sovWardrobe', x: 22 }, { k: 'wallCarpet', x: bedX - 6, w: 62 }, { k: 'stenka', x: stX }, { k: 'bedTeal', x: bedX }, { k: 'deskPc', x: deskX }];
    q.opts = Object.assign({}, q.opts, { wall: '#e4e1da', floor: '#46524c', props: base.concat(keep, moved) });
    if (NIGHT.has(ci + '.' + si)) q.opts.dim = 0.3;
    if (q.extras) q.extras = q.extras.filter(x => x.kind !== 'cat');   // Фасоль живёт только на Нерчинской
    // Дима за компьютером в сценах, где он один на связи
    if (['13.3', '18.0', '21.0', '22.0', '28.0', '29.0'].includes(ci + '.' + si) && q.cast && q.cast.d) {
      q.cast.d = Object.assign({}, q.cast.d, { x: deskX + 37, pose: 'sit', flip: true });
      (q.extras || []).forEach(x => { if (x.kind === 'cat') x.x = 150; });
    }
  });

  // ---- Выборг: вагон поезда и «в Выборге» ----
  (() => {
    const c = chap('27.03.2026'); if (!c) return;
    const tr = c.steps[1]; if (tr && /Поезд/.test(tr.place || '')) { tr.opts = { bg: 'trainOut', props: [{ k: 'trainFg', x: 0, fg: true }] }; }
    const nt = c.steps[2]; if (nt && nt.lines && nt.lines[0]) nt.lines[0][1] = 'Всю ночь в Выборге перед прогулкой мы разговаривали.';
    if (nt && nt.lines && nt.lines.length >= 6 && /Утром я стоял/.test(nt.lines[4][1])) {
      const morn = Object.assign({}, nt, { place: 'Выборг, утро', date: 'Утро 28 марта', lines: nt.lines.slice(4),
        opts: Object.assign({}, nt.opts, { dim: 0, wall: '#d9cdbd', wall2: '#cfc2b0', floor: '#d6c8ae', tint: ['#fff0c8', 0.07], props: nt.opts.props.map(q => q.k === 'curtainWin' ? Object.assign({}, q, { night: false }) : q) }),
        cast: { d: { x: 56, outfit: 'black', pose: 'stand', flip: true }, o: { x: 132, outfit: 'home', pose: 'sit', flip: true } } });
      nt.lines = nt.lines.slice(0, 4); c.steps.splice(3, 0, morn);
    }
  })();

  // ---- Шанхай: порядок сцен, вечер, International один день, примерочная по телефону ----
  (() => {
    const c = chap('20.08.2026'); if (!c) return;
    const by = pl => c.steps.find(s => s.place === pl); const st = c.steps;
    const mall = by('Торговый центр'), wheel = by('Колесо обозрения'), dinner = by('Ужин с друзьями'), intl = by('The International'), fin = by('The International, финал');
    if (mall && wheel && dinner && intl && fin) {
      mall.place = 'Торговый центр, вечер'; mall.lines = [N('Ещё до встречи с друзьями, уже вечером, мы зашли в торговый центр.')].concat(mall.lines);
      mall.opts = Object.assign({}, mall.opts, { tint: ['#ff9a5a', 0.1] });
      wheel.place = 'Колесо обозрения, вечер'; wheel.opts = Object.assign({}, wheel.opts, { time: 'fogn' });
      const rest = st.filter(s => s !== mall && s !== wheel && s !== intl);
      const iD = rest.indexOf(dinner); rest.splice(iD, 0, mall, wheel);
      fin.place = 'The International'; fin.lines = [N('На следующий день я ушёл на Интернешнл. А ты развлекалась сама.')].concat(fin.lines);   // один день, после «1933»
      st.length = 0; rest.forEach(s => st.push(s));
    }
    // магазин одежды: вместо книжных шкафов — штанги и полки со сложенными вещами, примерочная
    { const sc = c.steps.find(s => s.place === 'Магазины'); if (sc && sc.opts && sc.opts.props) { sc.opts.props = sc.opts.props.map(q => q.k === 'shelf' ? Object.assign({}, q, { k: 'foldShelf' }) : q).concat([{ k: 'clothesRack', x: 56, seed: 1 }, { k: 'clothesRack', x: 160, seed: 3 }, { k: 'clothesRack', x: 216, seed: 5 }, { k: 'fittingBooth', x: 280 }]); } }
    // примерочная: сначала переписка в телефоне, потом Дима подходит
    const shop = by('Магазины'); if (shop && shop.spots && shop.spots[0]) {
      const i = st.indexOf(shop), sp = shop.spots[0];
      sp.lines = [N('Я мерил штаны в раздевалке, а ты ходила между полками.')]; delete sp.join;
      const ph = { t: 'phone', title: 'Дима', msgs: [['note', 'Оля нашла штаны'], ['o', 'Я у штанов', '16:02'], ['o', 'Сюда иди', '16:02'], ['d', 'Я в новых штанах', '16:04']] };
      const walkIn = S => { const a = S.actors && S.actors.d; if (!a) return; a.pose = 'walk'; a.flip = true; const iv = setInterval(() => { if (a.x > 152) { a.x -= 1.1; } else { a.x = 152; a.pose = 'stand'; clearInterval(iv); } }, 28); };
      const back = { t: 'say', scene: shop.scene, place: shop.place, date: shop.date, music: shop.music, w: shop.w, opts: shop.opts,
        cast: { o: { x: 132, outfit: 'silver' }, d: { x: 262, outfit: 'summer', flip: true } },
        lines: [N('Я вышел из раздевалки и подошёл показать.', { do: walkIn }), D('Я в новых штанах'), O('Ладно переодеваюсь обратно', { }), ] };
      back.lines = [N('Я вышел и подошёл показать.', { do: walkIn }), D('Ладно переодеваюсь обратно'), O('Да в них иди. Как я посмотрю то'), O('Я тебе еще штаны нашла'), N('В этих льняных штанах я и проходил весь Шанхай.')];
      st.splice(i + 1, 0, ph, back);
    }
  })();
})();

// ---- места по фото ----
(() => {
  const chap = s => STORY.find(c => c.short === s);
  const N = (text, o) => ['n', text, o], D = (text, o) => ['d', text, o], O = (text, o) => ['o', text, o];
  const sw = (ci, si, fn) => { const q = STORY[ci] && STORY[ci].steps[si]; if (q && q.opts && q.opts.props) fn(q); };
  // мой дом на Нерчинской снаружи
  sw(2, 1, q => { q.opts.props = q.opts.props.map(p => p.k === 'building' && p.x === 410 ? { k: 'nerchHouse', x: 410 } : p); });
  // 23.02: дом на Нерчинской снаружи и в сцене прихода Оли
  sw(11, 0, q => { q.opts.props = q.opts.props.map(p => p.k === 'building' && p.x === 210 ? { k: 'nerchHouse', x: 216 } : p); });
  // музей Института биологии моря
  sw(8, 1, q => { q.opts = Object.assign({}, q.opts, { wall: '#7a5c48', wall2: '#6a4e3c', props: [{ k: 'parquetStar', x: 0 }, { k: 'museumCeil', x: 0 }].concat(q.opts.props) }); });
  // Выборг: площадь с башенкой и красный дом
  (() => { const q = STORY[15] && STORY[15].steps.find(s => s.place === 'Выборг' && s.opts && s.opts.props); if (!q) return; q.opts.props = q.opts.props.map(p => p.k === 'oldhouse' && p.x === 10 ? { k: 'vybDome', x: -8 } : p.k === 'oldhouse' && p.x === 120 ? { k: 'vybRed', x: 106 } : p); })();
  // Казахстан: каньон Чарын и телебашня на дальнем плане
  sw(19, 1, q => { q.opts.props = [{ k: 'tvTower', x: 262, par: 0.3, dy: -12 }, { k: 'charyn', x: 10, par: 0.6, dy: -4 }].concat(q.opts.props); });
  // Пекин: башня Летнего дворца, Запретный город, Универсал, Великая стена
  sw(23, 1, q => { q.opts.props = q.opts.props.map(p => p.k === 'pagoda' && p.x === 60 ? { k: 'summerTower', x: 50 } : p.k === 'pagoda' && p.x === 290 ? { k: 'forbiddenGate', x: 252 } : p.k === 'fence' ? { k: 'universalGlobe', x: 150 } : p); q.opts.props.splice(2, 0, { k: 'greatWall', x: 120, par: 0.5, dy: -6 }); });
  // Кронштадт: Морской собор; коса: маячок на молу; 1933: селфи
  sw(25, 1, q => { q.opts.props = q.opts.props.concat([{ k: 'navalCathedral', x: 164 }]); });
  sw(24, 5, q => { q.opts.props = q.opts.props.concat([{ k: 'pierLight', x: 392 }]); });
  (() => { const c = chap('20.08.2026'); const st = c && c.steps.find(s => s.place === '1933'); const sp = st && st.spots && st.spots.find(s => s.end); if (sp) sp.lines = sp.lines.concat([N('А ещё мы сфотографировались в зеркале с розами.', { img: 'img/sh_mirror.webp' })]); })();
  // Сабля — рыжая бобтейл (кошка Оли)
  [[7, 0], [20, 0], [28, 1]].forEach(([ci, si]) => { const q = STORY[ci] && STORY[ci].steps[si]; (q && q.extras || []).forEach(x => { if (x.kind === 'cat') { x.col = '#c98a4b'; x.eye = '#b8c060'; } }); });
  // Минус одиннадцать: восстановлена пропущенная часть переписки перед «А Рюмка!!!!»
  sw(6, 0, q => { const sp = q.spots && q.spots.find(s => s.x === 180); if (!sp) return; const i = sp.lines.findIndex(l => /Что такое лошадь/.test(l[1])); if (i < 0 || sp.lines.some(l => /большого стакана/.test(l[1]))) return; sp.lines.splice(i + 1, 0, D('Оля прости с меня все что хочешь'), D('Кроме большого стакана\nНе знаю где его взять'), O('Что за стакан'), D('В котором танцуют')); });
  // 15.02: площадь Борцов революции по фото
  sw(8, 0, q => { q.opts.props = [{ k: 'plazaBld', x: 40, par: 0.75 }, { k: 'preobrazh', x: 320, par: 0.85 }].concat(q.opts.props, [{ k: 'fountainJets', x: 232, w: 64 }, { k: 'pigeons', x: 120, w: 110, n: 16 }]); });
  // оранжерея: фото было только референсом — в диалоге не показываем
  (() => { const c = chap('20.08.2026'); const st = c && c.steps.find(s => s.place === 'Оранжерея'); (st && st.spots || []).forEach(sp => sp.lines.forEach(l => { if (l[2] && l[2].img === 'img/sh_green.webp') { const o = Object.assign({}, l[2]); delete o.img; delete o.cap; l[2] = o; } })); })();
  // реплики, перепутанные по отправителю (сверено с экспортом переписки)
  sw(8, 0, q => { const sp = (q.spots || []).find(s => s.x === 100); if (sp && sp.lines.length >= 2 && /Вас заметили/.test(sp.lines[1][1])) { sp.lines[0][1] = 'Ты сфотографировала остановку с надписью «Площадь борцов революции».'; sp.lines[1][0] = 'd'; } });
  (() => { const q = STORY[19] && STORY[19].steps.find(s => s.t === 'walk'); const l = q && q.intro && q.intro.find(x => /Катя спросила/.test(x[1])); if (l) { l[0] = 'o'; l[1] = 'Катя спросила еду ли я в отпуск с тобой'; } })();
  // Токаревский маяк: возвращена настоящая переписка 31.01 вместо пересказа без контекста
  sw(6, 1, q => { const sp = (q.spots || []).find(s => s.x === 84); if (!sp) return; const i = sp.lines.findIndex(l => /Тепло одеваюсь/.test(l[1])); if (i < 0) return; sp.lines.splice(i, 1, O('Да думаю мы замерзнем'), D('Да глянем по температурам'), D('Я то могу тепло одеться, а вот в тебе не уверен!'), O('Ну я уже не смогу тепло одеться')); });
  // 23.02: подсказка дороги — дословно из переписки
  sw(11, 0, q => { const i = (q.intro || []).findIndex(l => /сквозь стенку/.test(l[1])); if (i < 0) return; q.intro.splice(i, 1, D('Ты от самолёта вверх к дому стенке когда поднимешься'), D('Сквозь него проходишь и идешь между горой и ним вправо просто'), D('И там будет всё')); });
  // 31.12: «Я резал авокадо угостить» — это слова рассказчика, а не реплика
  STORY[0].steps.forEach(s => (s.lines || []).forEach(l => { if (/Я резал авокадо/.test(l[1])) { l[0] = 'n'; l[1] = 'Я резал авокадо, чтобы угостить.'; } }));
  // залы вокзала и аэропортов по фото
  (() => { const st = (ci, pred, bg) => { const q = STORY[ci] && STORY[ci].steps.find(pred); if (q && q.opts) q.opts = Object.assign({}, q.opts, { bg }); }; st(15, s => s.t === 'walk' && s.opts && s.opts.bg === 'room' && /seats|kiosk/.test((s.opts.props || []).map(p => p.k).join()), 'hallFin'); st(17, s => s.opts && s.opts.bg === 'room' && (s.opts.props || []).some(p => p.k === 'booth'), 'hallPulk'); st(24, s => s.place === 'Аэропорт Храброво' && s.opts && s.opts.bg === 'room', 'hallKgd'); })();
  // интерьеры по фото: «Вкусно — и точка», автовокзал, Пудун
  (() => { const rep = (ci, pred, fn) => { const q = STORY[ci] && STORY[ci].steps.find(pred); if (q && q.opts) q.opts = fn(q.opts); }; rep(4, s => s.place === '«Вкусно и точка»', o => Object.assign({}, o, { bg: 'vkusno', props: o.props.filter(p => p.k !== 'window' && p.k !== 'vit') })); rep(12, s => /Автовокзал/.test(s.place || ''), o => ({ bg: 'hallAvto', props: o.props.filter(p => p.k === 'suitcase') })); rep(26, s => s.place === 'Аэропорт Пудун', o => Object.assign({}, o, { bg: 'hallPvg' })); })();
  // Севкабель: зал-купол — перед световой инсталляцией
  (() => { const c = chap('18.07.2026'); if (!c) return; const k = c.steps.findIndex(s => /Севкабель/.test(s.place || '')); if (k < 0 || c.steps.some(s => s.place === 'Севкабель, купол')) return; const ref = c.steps[k]; c.steps.splice(k, 0, { t: 'say', scene: 'world', w: 240, place: 'Севкабель, купол', date: ref.date, music: ref.music, opts: { bg: 'dome', props: [{ k: 'domeBeans', x: 0, fg: true }] }, cast: {}, extras: [], lines: [N('На Севкабеле был зал с куполом: на полу пуфики, а над ними медленно шло видео из белых частиц.'), N('Мы лежали там вдвоём. Дольше всего. И говорили о том, сохранять эти отношения или заканчивать.')] }); })();
  // набережная Невы: гранитный шар
  sw(16, 0, q => { q.opts.props = q.opts.props.map(p => p.k === 'fortress' ? Object.assign({}, p, { x: 150 }) : p).concat([{ k: 'graniteSphere', x: 340 }]); });   // крепость стояла за краем экрана — возвращаю в кадр
})();
