// ===== Дополнения поверх готовых глав: локации по фото, новые сцены, цветы, музыка =====
// Подключается после story6.js. Главы ищутся по полю short (дата), шаги — по place.
(() => {
  const ch = short => STORY.find(c => c.short === short);
  const step = (c, place) => c && c.steps.find(s => s.place === place);
  const idx = (c, place) => c ? c.steps.findIndex(s => s.place === place) : -1;
  const keep = (st, ks) => ((st.opts && st.opts.props) || []).filter(p => ks.includes(p.k));
  const swap = (st, k, repl) => { if (!st || !st.opts || !st.opts.props) return; const i = st.opts.props.findIndex(p => p.k === k); if (i >= 0) st.opts.props.splice(i, 1, ...repl(st.opts.props[i])); };
  const SH = 'shanghai.mp3';

  Object.assign(NPC, {
    ilya: { skin: '#f2c9a5', hair: '#3a2a22', hairStyle: 'short', top: '#3d6bd6', bottom: '#2a2547' },
    ilyaFriend: { skin: '#e8b98f', hair: '#14121c', hairStyle: 'short', top: '#7ad6a0', bottom: '#3a3d55' },
    ilyaGirl: { skin: '#f8dcc8', hair: '#5a4030', hairStyle: 'long', top: '#ffd166', bottom: '#f6f2ea' },
    arina: { skin: '#f2c9a5', hair: '#8a5a2a', hairStyle: 'long', top: '#b58cff', bottom: '#2a2547' },
  });

  // ---------- у Кати ----------
  let c = ch('31.12.2025'), st = step(c, 'Та же тусовка, у Кати');
  if (st) st.opts = { bg: 'room', wall: '#e4dfd4', floor: '#b4b0a8', props: [{ k: 'katyaKitchen', x: 2 }, { k: 'greenSofa', x: 84 }, { k: 'doorway', x: 206 }].concat(keep(st, ['table', 'plate', 'cup'])) };

  // ---------- театр ----------
  swap(step(ch('08.01.2026'), 'Владивосток, у театра'), 'theatre', p => [{ k: 'theatreMol', x: p.x - 6 }]);

  // ---------- вокзал ----------
  for (const s of ['18.01.2026', '21.02.2026']) { const cc = ch(s); if (cc) cc.steps.forEach(q => swap(q, 'station', p => [{ k: 'vokzalVl', x: p.x - 8 }, { k: 'steamLoco', x: p.x + 86 }])); }

  // ---------- «Лима» ----------
  st = step(ch('24.01.2026'), 'Кофейня «Лима»');
  if (st) Object.assign(st.opts, { wall: '#e9dfa4', wall2: '#e0d596', floor: '#5f5a55', props: [{ k: 'limaWall', x: 0 }, { k: 'limaSofa', x: 22 }, { k: 'armchair', x: 62 }, { k: 'roundTable', x: 150 }, { k: 'armchair', x: 174, pat: true, col: '#f1e6d0', c2: '#d9c9a8', flip: true }].concat(keep(st, ['table', 'chair', 'counter', 'door'])) });

  // ---------- лёд у института биологии моря ----------
  st = step(ch('15.02.2026'), 'Лёд Амурского залива');
  if (st) st.opts.props = [{ k: 'ibm', x: 150, par: 0.55, dy: -20 }, { k: 'iceFishers', x: 0, w: 300, par: 0.75, dy: -22 }].concat(st.opts.props);

  // ---------- комната в Выборге ----------
  c = ch('27.03.2026'); st = step(c, 'Выборг, ночь');
  if (st) st.opts = { bg: 'room', wall: '#b9ab9b', wall2: '#b1a392', floor: '#cdbfa6', dim: 0.3, props: [{ k: 'curtainWin', x: 30 }, { k: 'triptych', x: 104 }, { k: 'bedWood', x: 92, w: 74 }].concat(keep(st, ['table', 'cup'])) };

  // ---------- Калининград ----------
  c = ch('09.07.2026'); st = c && c.steps.find(s => s.place === 'Аэропорт Храброво' && s.opts && s.opts.bg === 'city');
  if (st) { swap(st, 'airport', p => [{ k: 'khrabrovo', x: p.x - 14 }, { k: 'thuja', x: p.x - 22 }, { k: 'thuja', x: p.x + 96, h: 34 }, { k: 'thuja', x: p.x + 210, h: 28 }, { k: 'arcBench', x: p.x + 30 }]); }
  st = step(c, 'Мансарда');
  if (st) st.opts = { bg: 'room', wall: '#efece6', floor: '#9a7650', props: [{ k: 'slopeCeil', x: 150, w: 150, h: 58 }, { k: 'railing', x: 2, w: 42 }, { k: 'dresser', x: 52 }, { k: 'keys', x: 86 }, { k: 'carpet', x: 222, w: 78 }, { k: 'floorlamp', x: 234, on: true }, { k: 'bedWood', x: 240, w: 50, plaid: '#e9e6e0', plaid2: '#f6f2ea', stripes: '#4a4d55', cushion: '#2f6a5a', zig: false }, { k: 'floorlamp', x: 297, flip: true }].concat(keep(st, ['table', 'laptop', 'chair'])) };
  let i = idx(c, 'Мансарда');
  if (i >= 0) c.steps.splice(i, 0, S_({
    w: 240, place: 'Дом в Калининграде', date: '9 июля 2026, вечер',
    opts: { bg: 'room', wall: '#e6e2da', floor: '#a9865e', props: [{ k: 'greyKitchen', x: 70 }] },
    cast: { o: { x: 40, outfit: 'jeans' }, d: { x: 22, outfit: 'summer' } },
    extras: [
      { kind: 'fn', x: 96, fn: (x, gy, e) => SCENES.P.dog2(x, gy, { col: '#d98a3a', tail: '#e8a85a', belly: '#f1d2a0', ear: '#c9772a', fluffy: true, s: 1.15, flip: true, t: e.t }) },
      { kind: 'fn', x: 122, fn: (x, gy, e) => SCENES.P.dog2(x, gy, { col: '#1c1a20', s: 0.75, collar: '#2f8a7a', flip: true, t: e.t + 1 }) },
      { kind: 'fn', x: 156, fn: (x, gy, e) => SCENES.P.dog2(x, gy, { col: '#14121c', s: 1.45, beard: true, collar: '#e8e0a0', flip: true, t: e.t + 2 }) },
    ],
    lines: [N('Внизу нас встречали три собаки: рыжая, маленькая чёрная и огромная чёрная.'), N('А наша комната была наверху. Мансарда.')],
  }));

  // ---------- nodcafe ----------
  c = ch('20.08.2026'); st = step(c, 'nodcafe');
  if (st) {
    Object.assign(st.opts, { wall: '#8d8a84', wall2: '#7f7c76' });
    st.opts.props = st.opts.props.filter(p => p.k !== 'plant').concat([{ k: 'wallArt', x: 264, w: 34, h: 24, y: 96, col: '#e8872a' }, { k: 'nodNeon', x: 270, y: 66 }, { k: 'ficus', x: 92, h: 74 }, { k: 'haring', x: 262 }, { k: 'ficus', x: 294, h: 50, pot: '#3a3d44', pot2: '#2b2a30' }]);
    const sp = (st.spots || []).find(s => s.x === 138); if (sp) sp.lines.splice(1, 0, N('Ты в nodcafe.', { img: 'img/sh_nod.webp' }));
  }

  // ---------- Шанхай: новые сцены ----------
  if (c) {
    const ins = (place, steps, after) => { const k = idx(c, place); if (k >= 0) c.steps.splice(k + (after ? 1 : 0), 0, ...steps); };
    // ужин с друзьями перед набережной
    ins('Вечер, набережная', [S_({
      w: 240, music: SH, place: 'Ужин с друзьями', date: 'Вечер',
      opts: { bg: 'room', wall: '#5a2a2a', wall2: '#4a2020', floor: '#3a2a22', dim: 0.08, props: [{ k: 'lantern', x: 40 }, { k: 'lantern', x: 120, y: 90 }, { k: 'lantern', x: 200 }, { k: 'feastRound', x: 78 }] },
      cast: { o: { x: 100, outfit: 'whiteDress', pose: 'sit' }, d: { x: 118, outfit: 'tee', pose: 'sit' } },
      extras: [{ cfg: NPC.ilya, x: 62, pose: 'sit' }, { cfg: NPC.ilyaFriend, x: 44 }, { cfg: NPC.ilyaGirl, x: 178, flip: true, pose: 'sit' }, { cfg: NPC.arina, x: 198, flip: true }],
      lines: [
        N('Вечером мы встретили моего друга Илью, его друга, девушку и мою подругу Арину.'),
        N('Все вместе вкусно поели. Я доедал за всеми.'),
        N('И только потом пошли к реке.'),
      ],
    })]);
    // магазин платьев в торговом центре с колесом
    ins('Колесо обозрения', [S_({
      w: 240, music: SH, place: 'Торговый центр',
      opts: { bg: 'room', wall: '#e8d08a', wall2: '#e0c67a', floor: '#f6f2ea', props: [{ k: 'dollShop', x: 0 }, { k: 'checker', x: 0, w: 260 }] },
      cast: { o: { x: 118, outfit: 'silver' }, d: { x: 134, outfit: 'tee', flip: true } },
      lines: [
        N('В торговом центре, где мы катались на колесе обозрения, были вот такие платья.', { img: 'img/sh_dolls.webp' }),
        N('Мы думали, что можно купить такое вместо всех остальных развлечений в Шанхае.'),
      ],
    })]);
    // после парка: оранжерея, сад, храм, 1933
    ins('Парк', [
      W_({
        w: 460, player: 'o', music: SH, place: 'Оранжерея', date: 'Ещё один день',
        opts: { bg: 'greenhouse' },
        cast: { o: { x: 40, outfit: 'silver' }, d: { x: 26, outfit: 'linen', follow: true } },
        extras: [{ cfg: NPC.ilya, x: 150 }, { cfg: NPC.ilyaGirl, x: 166, flip: true }, { cfg: NPC.ilyaFriend, x: 330 }],
        intro: [N('Ещё мы встретились с моими старыми друзьями: Ильёй, его девушкой и ещё одним его знакомым.')],
        spots: [
          { x: 130, req: true, icon: '…', lines: [N('И гуляли по огромной оранжерее.', { img: 'img/sh_green.webp' })] },
          { x: 300, req: true, icon: '♥', lines: [N('Всю прогулку мы держались за руку.', { fx: 'hearts', at: 'o' })], end: true },
        ],
      }),
      W_({
        w: 420, player: 'o', music: SH, place: 'Сад',
        opts: { bg: 'yuGarden', props: [{ k: 'stoneRail', x: 0, w: 440, fg: true, dy: 16 }] },
        cast: { o: { x: 30, outfit: 'silver' }, d: { x: 16, outfit: 'linen', follow: true } },
        spots: [
          { x: 150, req: true, icon: '…', lines: [N('Сад. Каменный мостик над зелёной водой.', { img: 'img/sh_garden1.webp' })] },
          { x: 290, req: true, icon: '…', lines: [N('И павильон с загнутыми крышами над прудом.', { img: 'img/sh_garden2.webp' })], end: true },
        ],
      }),
      S_({
        w: 240, music: SH, place: 'Храм',
        opts: { bg: 'room', wall: '#2a1c1c', wall2: '#241818', floor: '#3a2a22', props: [{ k: 'goldStatues', x: 0 }] },
        cast: { o: { x: 112, outfit: 'silver' }, d: { x: 128, outfit: 'linen' } },
        lines: [N('Храм. Золотые статуи под самый потолок.', { img: 'img/sh_temple.webp' })],
      }),
      W_({
        w: 360, player: 'o', music: SH, place: '1933',
        opts: { bg: 'shCity', time: 'cloud', ground: 'stone', props: [{ k: 'tree', x: 30, kind: 'round' }, { k: 'b1933', x: 110 }, { k: 'tree', x: 300, kind: 'round' }] },
        cast: { o: { x: 24, outfit: 'silver' }, d: { x: 10, outfit: 'linen', follow: true } },
        spots: [
          { x: 150, req: true, icon: '…', lines: [N('Здание «1933». Бетон, круги и решётки.', { img: 'img/sh_1933.webp' })] },
          { x: 240, req: true, icon: '…', lines: [N('А внутри — переходы, мостики и свет.', { img: 'img/sh_1933in.webp' })], end: true },
        ],
      }),
    ], true);
  }

  // ---------- Москва после Петербурга ----------
  c = ch('18.07.2026');
  if (c) {
    let k = c.steps.length; while (k > 0 && c.steps[k - 1].t === 'phone') k--;
    const ph = c.steps[k];
    c.steps.splice(k, 0,
      S_({ w: 240, scene: 'map', place: '27 июля 2026', cast: {}, opts: { routes: [['spb', 'msk', 'd']] }, lines: [N('27 июля я улетел в Москву.')] }),
      S_({
        w: 240, place: 'Москва, у Останкинской башни', date: '28–29 июля 2026',
        opts: { bg: 'city', time: 'day', ground: 'road', sea: false, skyline: false, bridge: 0, props: [{ k: 'msuBlock', x: 6, w: 70, h: 44, par: 0.6 }, { k: 'msuBlock', x: 150, w: 86, h: 30, col: '#b9bcc2', par: 0.6 }, { k: 'ostankino', x: 118, h: 104, par: 0.6 }, { k: 'tree', x: 40 }, { k: 'tree', x: 196 }, { k: 'lamp', x: 150 }] },
        cast: { d: { x: 92, outfit: 'summer' } },
        lines: [
          N('В Москве я жил в пяти минутах от Останкинской башни. И присылал тебе всё, что видел.'),
          D('Цитадель зла', { img: 'img/msk_tower.jpg' }), O('Почемууу'), D('Ну госканалы отсюда вещают'),
          D('Приглядел нам домик в Москве', { img: 'img/msk_house.jpg' }), O('Очень милый'),
          D('У вас там лахта видна а я с таким видом завтракаю', { img: 'img/msk_view.jpg' }), O('Ну останкинская пизже'),
        ],
      }),
      S_({ w: 240, scene: 'map', place: '30 июля 2026', cast: {}, opts: { routes: [['msk', 'vl', 'd']] }, lines: [N('А 30 июля — домой. Восемь часов над страной.'), N('Что дальше, мы решали уже на расстоянии. Я писал тебе из аэропорта.')] }),
    );
    if (ph && ph.t === 'phone') { const n = ph.msgs.findIndex(m => m[0] === 'note'); ph.msgs.splice(n + 1, 0,
      ['d', 'Солнце\nЯ тоже не люблю то, что у нас дистанция', '16:39'],
      ['d', 'Но при этом четко могу дать ответ, что это по плечу. Во всяком случае если смотреть в далекую дистанцию.', '16:39'],
      ['d', 'Мы на расстоянии, но и так раскрашиваем друг другу жизнь по сравнению с существованием друг без друга', '16:39'],
      ['d', 'Непонимание всегда заканчивается пониманием\nРаны залечиваем друг другу сами', '16:39']); }
  }

  // ---------- цветы ----------
  c = ch('01.05.2026');
  if (c) c.steps.forEach(s => (s.spots || []).forEach(sp => sp.lines.forEach(l => { if (/Подсолнух/.test(l[1])) l[2] = Object.assign({}, l[2], { img: 'img/fl_first.webp' }); })));
  c = ch('06.05.2026');
  if (c) { const ph = c.steps.find(s => s.t === 'phone'); if (ph) { let n = ph.msgs.findIndex(m => m[0] === 'day' && /19 мая/.test(m[1])); if (n >= 0) { n++; while (n < ph.msgs.length && ph.msgs[n][0] === 'note') n++; ph.msgs.splice(n, 0, IMG('o', 'img/fl_protea.jpg', '22:52', 'Вроде ребенок не пострадал от солнечного света')); } } }
  c = ch('17.09.2026');
  if (c) { const ph = c.steps.find(s => s.t === 'phone'); if (ph) ph.msgs.unshift(
    ['day', '2 сентября'], ['note', 'Оля болеет. Дима заказал ей букет'],
    IMG('o', 'img/fl_sept.jpg', '13:15', 'Да он чудесный!'), ['o', 'Там такая коробка еще охуенная', '13:15'], ['o', 'Спасибо большое ❤️❤️❤️❤️❤️', '13:15'],
    ['d', 'Ладно коробка спасла ситуацию', '13:15'], ['o', 'Да че спасла я отлично отношусь к цветам и к хризантемам', '13:16']); }

  // ---------- музыка: «Skeletons» со дня блинов (23.02) и до отъезда (28.02); до этого в квартирах играет «Radio» ----------
  for (const s of ['23.02.2026', '28.02.2026']) { c = ch(s); if (c) c.steps.forEach(q => { if (q.music === 'radio') q.music = 'skeletons.mp3'; }); }
  // ---------- Школьная: по кадру из видео (шкаф, ковёр на стене, тёмный пол) ----------
  STORY.forEach(cc => cc.steps.forEach(q => {
    if (!q.opts || !q.opts.props || !/Школьн|После маяка/.test(q.place || cc.place || '')) return; if (q.opts.bg !== 'room') return;
    const sofa = q.opts.props.find(p => p.k === 'sofa'); q.opts = Object.assign({}, q.opts, { wall: '#e4e1da', floor: '#46524c' });
    const extra = sofa ? [{ k: 'wallCarpet', x: sofa.x - 8 }] : [];
    if (/Уродская/.test(q.place || '')) { q.opts.props = q.opts.props.filter(p => p.k !== 'window'); extra.push({ k: 'sovWardrobe', x: 22 }, { k: 'stenka', x: 146 }); }
    else { q.opts.props = q.opts.props.filter(p => !(p.k === 'window' && p.x > 110 && p.x < 220)); extra.push({ k: 'stenka', x: 146 }); }   // стенка стоит у стены за столом
    q.opts.props = extra.concat(q.opts.props);
  }));
})();
