// ===== patch4.js — правки по замечаниям: названия глав, Жуля, финальная карта (подключается после patch3.js) =====
(() => {
  const chap = s => STORY.find(c => c.short === s);

  // Глава про блины: в ней играет Skeletons, а «Radio» в этот день не звучит
  const bl = chap('23.02.2026'); if (bl) { bl.title = 'Первый блин не комом'; bl.sub = ''; }   // приписка про «самую волшебную историю» относилась ко всей их жизни, не к этому дню

  // Жуля — собака, а не кошка: убираем рыжую кошку на мансарде и фразу про неё
  STORY.forEach(c => c.steps.forEach(st => {
    if (st.extras) st.extras = st.extras.filter(e => !(e.kind === 'cat' && e.col === '#c98a4a'));
    (st.spots || []).forEach(sp => { if (sp.lines) sp.lines = sp.lines.filter(l => !/Жуля/.test(l[1] || '')); });
  }));

  // Шанхай: глава не умещалась в свои даты — теперь она просто «Это реальность?»
  const sh = chap('20.08.2026');
  if (sh) { sh.title = 'Это реальность?'; sh.date = 'Август 2026'; sh.short = 'Август 2026'; }

  // Финал: перед благодарностью 9000 км стягиваются в точку — Оля прилетела
  const fin = chap('12.12.2026');
  if (fin) {
    const i = fin.steps.findIndex(s => s.scene === 'black');
    if (i > 0) fin.steps.splice(i, 0, {
      t: 'say', scene: 'map', place: '12 декабря 2026', w: 240, opts: { routes: [['spb', 'vl', 'o']], shrink: true },
      cast: {}, spots: [],
      lines: [['n', 'Девять тысяч километров стянулись в одну точку.']],
    });
  }
  // убрана цитата про организм: остаётся только отказ от авокадо
  STORY.forEach(c => c.steps.forEach(st => { const f = a => (a || []).forEach(l => { if (/мой организм не помойка/.test(l[1] || '')) l[1] = 'Незадолго до этого ты отказалась от авокадо.'; });
    f(st.lines); f(st.intro); f(st.outro); (st.spots || []).forEach(sp => f(sp.lines)); }));
  // Школьная, подарки: точки активации стоят там же, где теперь лежат подарки (на кровати)
  (() => {
    const q = STORY[12] && STORY[12].steps[0]; if (!q || !q.spots || !q.opts || !q.opts.props) return;
    const gx = q.opts.props.filter(p => p.k === 'gift').map(p => p.x);
    const gs = q.spots.filter(s => !s.end).slice(0, gx.length);
    gs.forEach((s, i) => { s.x = gx[i] + 4; s.r = 6; s.h = 34; });
  })();
  // Китай (Великая стена): вместо казахстанских гор — свои лесистые холмы
  (() => {
    const q = STORY[23] && STORY[23].steps[1]; if (!q || !q.opts || !q.opts.props) return;
    q.opts.props.forEach(p => { if (p.k === 'mountains') p.k = 'wallHills'; });
  })();
  // Двойная радуга: инсталляция — в тот же день на Севкабеле; Ботанический сад — на следующий день, уже после «показалось, что всё закончилось», и сразу за ним отъезд в Москву
  (() => {
    const c = chap('18.07.2026'); if (!c) return; c.date = '16–27 июля 2026';
    const i = c.steps.findIndex(s => s.place === 'Севкабель, световая инсталляция'); if (i < 0) return;
    const q = c.steps[i], L = q.lines, k = L.findIndex(l => /Ботанический сад/.test(l[1])); if (k !== 0 || L.length < 5) return;
    const garden = L[0];
    q.lines = [L[1], L[2], L[3]];
    c.steps.splice(i + 1, 0, {
      t: 'say', scene: 'world', w: 240, place: 'Ботанический сад', date: '27 июля 2026', music: q.music,
      opts: { bg: 'botGarden', props: [] },
      extras: [], cast: { o: { x: 112, outfit: 'yellowSkirt' }, d: { x: 132, outfit: 'summer', flip: true } },
      lines: [garden, L[4]],
    });
  })();
  // публикация: главы открываются по порядку
  META.unlockAll = false;
})();
