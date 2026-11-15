// ===== Лето 2026: Пекин, Калининград, Петербург, Шанхай =====
Object.assign(OUTFITS.d, {
  summer: { top: '#ff8fb0', bottom: '#d9c9a8', bottomType: 'shorts', legs: '#f2c9a5', bag: '#8fe0c8', shoes: '#c9ced8' },
  linen: { top: '#f6f2ea', print: '#c8323c', bottom: '#e3d6b8', shoes: '#f6f2ea' },       // льняные штаны, белая футболка
  kosa: { top: '#1b1b2c', print: '#3fd0c0', bottom: '#c9d6e6', shoes: '#f6f2ea' }, // чёрный свитшот со змеёй, светлые джинсы
  panama: { top: '#8fc3ea', bottom: '#8fc3ea', hat: '#ffd23d', hatType: 'cap', shoes: '#c9ced8' },
});
Object.assign(OUTFITS.o, {
  jeans: { top: '#f6f2ea', bottom: '#6f93c4' },
  hoodie: { top: '#f6f6fb', sleeves: '#f6f6fb', scarf: '#f1e6d0', print: '#ff7aa8', bottom: '#4a4d58', shoes: '#14121c' }, // белая толстовка с меховым капюшоном, тёмные джинсы
  light: { top: '#f6f2ea', bottom: '#f6f2ea', bottomType: 'shorts', legs: '#f8dcc8', shoes: '#f6f2ea' },
  whiteDress: { top: '#f6f2ea', bottomType: 'dress', skirtLen: 6, legs: '#f8dcc8', shoes: '#14121c' },
  yellowSkirt: { top: '#f6f2ea', bottom: '#ffd23d', bottomType: 'skirt', skirtLen: 6, legs: '#f8dcc8' },
  silver: { top: '#d5dadf', bottomType: 'dress', skirtLen: 9, legs: '#f8dcc8', shoes: '#f6f2ea' },   // серебристое атласное платье, второй день
  darkTop: { coat: '#23233a', sleeves: '#23233a', closed: true, top: '#d9d9d9', bottom: '#14121c' }, // тёмная куртка, Лахта сверху
});
Object.assign(OUTFITS.d, { tee: { top: '#14121c', bottom: '#e3d6b8', shoes: '#f6f2ea' } }); // чёрная футболка, светлые штаны — вечер
Object.assign(NPC, {
  cn1: { skin: '#f2c9a5', hair: '#14121c', hairStyle: 'short', top: '#e8b25a', bottom: '#3a3d55' },
  cn2: { skin: '#f2c9a5', hair: '#14121c', hairStyle: 'bob', top: '#3f8a5f', bottomType: 'skirt', bottom: '#3f8a5f', skirtLen: 8, legs: '#f2c9a5' },
  cn3: { skin: '#e8bd98', hair: '#8a8f9c', hairStyle: 'short', top: '#6fb7ff', bottom: '#3a3d55' },
  tourist: { skin: '#f2c9a5', hair: '#b0804a', hairStyle: 'short', top: '#ff8f8f', bottom: '#a8c0e0', bottomType: 'shorts', legs: '#f2c9a5' },
  barista: { skin: '#f2c9a5', hair: '#14121c', hairStyle: 'bob', top: '#14121c', bottom: '#14121c' },
});
const AIRHALL = { bg: 'room', wall: '#dfe6ea', wall2: '#cfd6e0', floor: '#9aa2b0', panel: true };

STORY.push(
  // ───────────────────────── 23. ПЕКИН
  {
    num: 'ЧАСТЬ ТРЕТЬЯ', short: '23.06.2026', date: '20–27 июня 2026', title: 'Я выбрала тебя', place: 'Пекин',
    sub: 'Я — с учениками на Великой стене. Ты — в Петербурге.',
    steps: [
      S_({ w: 240, scene: 'map', place: '20 июня 2026', cast: {}, opts: { routes: [['vl','bj','d']] }, lines: [N('В июне я повёз своих школьников в Пекин.')] }),
      W_({
        w: 360, player: 'd',
        opts: { bg: 'city', time: 'summer', ground: 'road', sea: false, skyline: false, props: [{ k: 'mountains', x: 0, par: 0.3 }, { k: 'mountains', x: 300, par: 0.3 }, { k: 'pagoda', x: 60 }, { k: 'pine', x: 130, snow: false }, { k: 'fence', x: 150, n: 30 }, { k: 'pagoda', x: 290 }] },
        cast: { d: { x: 20, outfit: 'panama' } },
        extras: [{ cfg: NPC.kid, x: 190 }, { cfg: Object.assign({}, NPC.kid, { coat: '#ff7aa8', hair: '#3a2a22' }), x: 206 }, { cfg: Object.assign({}, NPC.kid, { coat: '#6fb7ff', hair: '#5a4030' }), x: 224, flip: true }],
        intro: [N('Летел я в панаме с Псидаком.'), N('Парк с дворцом, блошиный рынок, арт-квартал. И Великая стена.')],
        spots: [
          { x: 120, icon: '…', lines: [N('В Адидасе я купил тебе голубую кофту-рубашку. Мне было прикольно купить тебе что-то «типо богатый».')] },
          { x: 250, req: true, icon: '♥', lines: [
            N('На стене мы с ребятами говорили про свадьбы.'),
            N('А вечером ты написала мне то, что я потом носил в голове всё лето.', { fx: 'hearts', at: 'd' }),
          ], end: true },
        ],
      }),
      PH([
        ['day', '23 июня'],
        ['d', 'Ладно.\nЯ засыпать потихоньку буду\nЛюблю тебя\nХочу жизнь твою счастливой сделать', '19:31'],
        ['note', 'до этого Диму задело, что Оля приводит в пример других людей. Она объясняет'],
        ['o', 'И еще\nНа будущее чтобы не триггерился\nЯ понимаю что ты триггеришься когда я привожу каких-то людей типа в сравнение\nЯ выбрала ТЕБЯ 🫵🫵🫵\nНикого другого не выбрала!', '21:05'],
        ['o', 'И держи это в голове всегда', '21:05'],
        ['day', '28 июня'],
        ['o', 'Я наварила в лесу пельменей ты женишься на мне?', '17:08'],
        ['day', '1 июля'],
        ['note', 'Дима составляет список, что посмотреть и послушать вместе в июле'],
        ['o', 'Я тебя пол года не видела и еще столько не увижу у меня вообще нет желаний тратить совместное время на просмотр/ прослушивание чего-то', '16:28'],
        ['o', 'Кроме блин тебя', '16:28'],
        ['d', 'Хорошо это очень сильный аргумент я разбит в пух и прах и счастливый в этом состоянии', '16:29'],
        ['day', '7 июля'],
        ['d', 'Скоро увидимся', '19:45'],
        ['d', 'Целую', '19:46'],
        ['d', 'А че получается предпоследний раз до встречи только в чате целую', '19:46'],
        ['d', 'Так на всякий случай. При встрече лучше не целовать получается или как понять', '19:51'],
        ['o', 'Да можно поцеловать', '19:52'],
      ], TG),
    ],
  },

  // ───────────────────────── 24. КАЛИНИНГРАД
  {
    short: '09.07.2026', date: '9–12 июля 2026', title: 'Трап или автобус', place: 'Калининград',
    sub: 'Сто один день после Пулково.',
    steps: [
      S_({ w: 240, scene: 'map', place: '8–9 июля 2026', cast: {}, opts: { routes: [['spb','kgd','o'],['vl','kgd','d']] }, lines: [N('Летом мы полетели навстречу друг другу. В Калининград.')] }),
      W_({
        w: 340, player: 'o', place: 'Аэропорт Храброво', date: '9 июля 2026, вечер',
        opts: { bg: 'city', time: 'eve', ground: 'road', sea: false, props: [{ k: 'bus', x: 10, col: '#f6f2ea', c2: '#3d6bd6' }, { k: 'airport', x: 110, sign: 'KGD' }, { k: 'lamp', x: 100 }, { k: 'lamp', x: 320 }] },
        cast: { o: { x: 60, outfit: 'jeans' }, d: { x: 250, outfit: 'summer', flip: true } },
        intro: [N('Ты прилетела вечером, на десять минут раньше. Ливень только что кончился, остался ветер.'), N('У нас был спор: к самолёту тебя пустят по трапу-рукаву или повезут на автобусе.'), D('Ты не сказала главное, ты садилась через трап или автобус'), O('Через авобус'), O('Но о таком позоре лучше не говорить'), O('Меня сдуло'), O('Я тока из самолета вышла')],
        spots: [
          { x: 236, req: true, face: true, lines: [N('Сто один день.', { fx: 'hearts', at: 'o' })], join: 'd', end: true },
        ],
      }),
      W_({
        w: 300, player: 'd', place: 'Мансарда', date: '10 июля 2026, утро',
        opts: { bg: 'room', wall: '#c9b89a', wall2: '#b9a88a', floor: '#8a6242', stripes: true, props: [{ k: 'window', x: 30 }, { k: 'stove', x: 80 }, { k: 'table', x: 180, w: 34 }, { k: 'laptop', x: 190 }, { k: 'chair', x: 216, flip: true }, { k: 'bed', x: 240 }, { k: 'plant', x: 150 }] },
        cast: { d: { x: 96, outfit: 'summer' }, o: { x: 222, outfit: 'jeans', pose: 'sit', flip: true } },
        extras: [{ kind: 'cat', x: 130, col: '#c98a4a' }],
        intro: [D('Напиши как проснешься, кофе сразу принесу, завтрак пока думаю что сделать'), N('Днём ты работала удалённо. Я был в нескольких метрах и всё равно писал тебе в телеграм.')],
        spots: [
          { x: 200, req: true, face: true, lines: [N('Омлет и кофе без молока.', { emote: ['o', '♥'] }), N('Рыжую кошку зовут Жуля.'), N('Потом ты сказала, что хотела, чтобы я подавал тебе руку, когда ты спускалась по лестнице на мансарду.')], end: true },
        ],
        exit: false,
      }),
      W_({
        w: 420, player: 'o', place: 'Рыбная деревня и Кафедральный собор', date: '10 июля 2026, вечер',
        opts: { bg: 'city', time: 'gold', ground: 'road', skyline: false, sea: true, props: [{ k: 'lamp', x: 30 }, { k: 'fishvillage', x: 60 }, { k: 'bench', x: 200 }, { k: 'tree', x: 240, kind: 'round' }, { k: 'cathedral', x: 290 }, { k: 'lamp', x: 390 }] },
        cast: { o: { x: 20, outfit: 'jeans' }, d: { x: 6, outfit: 'summer', follow: true } },
        intro: [N('В первый день мы пошли в Рыбную деревню.')],
        spots: [
          { x: 120, req: true, icon: '♥', lines: [N('Набережная, фахверковые домики, маяк.', { img: 'img/kgd_village.webp' }), N('Мы сели на скамейку любоваться видом. И ты сказала: «Ну ты хоть обними меня что-ли».', { fx: 'hearts', at: 'o' })] },
          { x: 208, req: true, icon: '…', lines: [N('Мы много говорили. О нас.')] },
          { x: 330, req: true, icon: '…', lines: [N('А потом смотрели на большой собор на острове.')], end: true },
        ],
      }),
      W_({
        w: 420, player: 'o', place: 'Балтийская коса', date: '11 июля 2026', speed: 60,
        opts: { bg: 'shore', time: 'fog', ground: 'sand', props: [{ k: 'boat', x: 10, dy: -4 }, { k: 'pine', x: 110, snow: false }, { k: 'sportscar', x: 200 }, { k: 'breakwater', x: 290, n: 14 }, { k: 'oldhouse', x: 410, col: '#8a8f9c', w: 46, h: 40 }, { k: 'arch', x: 480 }, { k: 'kiosk', x: 570, col: '#8a5a3a', c2: '#5a3d2e' }] },
        cast: { o: { x: 60, outfit: 'hoodie' }, d: { x: 46, outfit: 'kosa', follow: true } },
        intro: [N('На следующий день мы поплыли на косу.'), N('Пока плыли, я сфотографировал тебя на катере.', { img: 'img/kgd_boat.webp' })],
        spots: [
          { x: 190, req: true, icon: '!', lines: [N('По песку мы побежали за руку. Потому что увидели красивую машину — голубую, без крыши.', { fx: 'hearts', at: 'o' }), N('Бежали, пока у тебя не выпал телефон.')] },
          { x: 330, req: true, icon: '…', lines: [N('Сначала — волноломы. Мы сидели на них и смотрели на море.', { img: 'img/kgd_tetra_o.webp' }), N('По очереди фотографировали друг друга.', { img: 'img/kgd_tetra.webp' })], end: true },
        ],
      }),
      W_({
        w: 260, player: 'o', place: 'Балтийская коса', date: '11 июля 2026', speed: 60,
        opts: { bg: 'shore', time: 'fog', ground: 'sand', props: [{ k: 'arch', x: 60 }, { k: 'kiosk', x: 150, col: '#8a5a3a', c2: '#5a3d2e' }] },
        cast: { o: { x: 20, outfit: 'hoodie' }, d: { x: 6, outfit: 'kosa', follow: true } },
        spots: [
          { x: 78, req: true, icon: '♥', lines: [N('Нашли декорации от чьей-то свадьбы. И посидели на них.', { img: 'img/kgd_chairs.webp' }), N('Пока нас не выгнали.')] },
          { x: 166, req: true, icon: '?', lines: [N('Дальше — Ржавый город.', { img: 'img/kgd_rusty.webp' })], end: true },
        ],
      }),
      W_({
        w: 380, player: 'o', place: 'Заброшка', date: '11 июля 2026', speed: 60,
        opts: { bg: 'hangar', props: [{ k: 'brickTower', x: 330, par: 0.6, dy: -8, h: 92 }] },
        cast: { o: { x: 40, outfit: 'hoodie' }, d: { x: 26, outfit: 'kosa', follow: true } },
        intro: [N('И последнее — заброшка. Ржавые фермы вместо крыши, кирпич, трава прямо сквозь бетон.')],
        spots: [
          { x: 150, req: true, icon: '…', lines: [N('Мы зашли в цех. Ты стояла в проёме и смотрела в пустоту, заросшую травой.', { img: 'img/kgd_gate.webp' })] },
          { x: 270, req: true, icon: '?', lines: [N('А на стене в одной из комнат — арт из «Евангелиона», который ты очень любишь.', { img: 'img/kgd_mural.webp' })], end: true },
        ],
      }),
      W_({
        w: 300, player: 'o', place: 'Выставка', date: '12 июля 2026',
        opts: { bg: 'room', wall: '#16111a', floor: '#12211a', props: [{ k: 'snake', x: 10, w: 280 }] },
        cast: { o: { x: 60, outfit: 'light' }, d: { x: 44, outfit: 'summer', follow: true } },
        intro: [N('В последний день — фотобудка.', { img: 'img/booth.webp', rot: true }), N('А потом выставка в старом цеху: темнота и огромная светящаяся красная змея, которая вьётся между колоннами.')],
        spots: [
          { x: 160, req: true, icon: '…', lines: [
            N('Ты села прямо на пол.', { img: 'img/kgd_expo.jpg' }),
            N('И там продолжился наш разговор о нас. Непростой.'),
            N('Такие разговоры у нас почему-то всегда происходят в необычных декорациях.'),
          ], end: true },
        ],
        exit: false,
      }),
      W_({
        w: 320, player: 'o', place: 'Аэропорт Храброво', date: '12 июля 2026, вечер',
        opts: Object.assign({}, AIRHALL, { tint: ['#c9d2dc', 0.18], props: [{ k: 'seats', x: 30, n: 5, col: '#3d6bd6' }, { k: 'suitcase', x: 110 }, { k: 'text', x: 180, y: 96, s: 'ЗАДЕРЖАН', col: '#c8323c', align: 'center' }, { k: 'barrier', x: 220, n: 4 }, { k: 'gate', x: 276, sign: 'ВЫЛЕТ' }] }),
        cast: { o: { x: 20, outfit: 'jeans' }, d: { x: 8, outfit: 'summer', follow: true } },
        intro: [N('Вечером над аэропортом встал туман. Твой рейс переносили и переносили.')],
        spots: [
          { x: 200, req: true, icon: '♥', face: true, lines: [N('Мы попрощались.', { fx: 'hearts', at: 'd', do: s => { s.actors.o.pose = 'hug'; s.actors.d.pose = 'hug'; s.actors.d.follow = false; s.actors.d.x = s.actors.o.x - 10; s.actors.d.flip = false; } })], end: true },
        ],
        exit: false,
      }),
      PH([
        ['day', '12 июля'],
        ['d', 'Переживем. Мне было с тобой очень ярко эти дни.\nВживую любоваться хочется постоянно тобой.', '20:36'],
        ['d', 'Бляя надеюсь меня пустят в самолет с этими фотками из фотобудки', '21:34'],
        ['d', 'Да оч хороши мы на фотках я очень доволен', '21:41'],
        ['day', '13 июля'],
        ['note', 'вспоминают вчерашнюю выставку'],
        ['o', 'Самая киношкая сцена в мире', '14:49'],
        ['o', 'В реальной жизни кто-то вообще решает вопросы напротив красной змеи?', '14:49'],
        ['d', 'Ну там я уже тобой любовался просто, вопросы внезапно из головы исчезли на тот момент', '14:55'],
        ['d', 'А я думал ты убежишь прятаться за красную змею', '14:56'],
        ['d', 'А ты так ни разу и не убежала от меня зря боялся', '14:58'],
        ['o', 'Мне все еще с тобой хорошо это раз\nМне приятно твое общество и я все таки твоего приезда очень ждала\nТы уже слишком глубоко воспринимаешься мной как часть жизни и лишаться тебя я реально не вынесу', '19:58'],
        ['d', 'Давай и потом не лишаться(', '20:02'],
      ], TG),
    ],
  },

  // ───────────────────────── 25. ИЮЛЬ В ПЕТЕРБУРГЕ
  {
    short: '18.07.2026', date: '16–26 июля 2026', title: 'Двойная радуга', place: 'Петербург и Кронштадт',
    sub: 'Три недели в одном городе.',
    steps: [
      S_({ w: 240, scene: 'map', place: 'Июль 2026', cast: {}, opts: { routes: [['kgd','spb','both']] }, lines: [N('Из Калининграда — в Петербург. Сначала ты, через пару дней я.')] }),
      W_({
        w: 420, player: 'd', place: 'Кронштадт, Морской собор', date: '18 июля 2026',
        opts: { bg: 'city', time: 'summer', ground: 'road', skyline: false, props: [{ k: 'tree', x: 30, kind: 'round' }, { k: 'bench', x: 60 }, { k: 'lamp', x: 100 }, { k: 'tree', x: 330, kind: 'round' }, { k: 'lamp', x: 380 }] },
        cast: { d: { x: 40, outfit: 'summer' }, o: { x: 226, outfit: 'jeans', hidden: true, flip: true } },
        extras: [{ kind: 'fn', x: 150, z: -1, fn: (x, gy) => { const r = A.r, d = A.disc; r(x, gy - 50, 150, 50, '#f1ead8'); d(x + 75, gy - 62, 30, '#e3d6b8'); r(x + 45, gy - 62, 60, 14, '#f1ead8'); d(x + 75, gy - 70, 22, '#d9b860'); r(x + 74, gy - 104, 2, 14, '#d9b860'); r(x + 70, gy - 100, 10, 2, '#d9b860'); for (let i = 0; i < 6; i++) { r(x + 12 + i * 24, gy - 44, 8, 22, '#5b6f88'); d(x + 16 + i * 24, gy - 44, 4, '#5b6f88'); } r(x + 64, gy - 26, 22, 26, '#5a3d2e'); d(x + 75, gy - 26, 11, '#5a3d2e'); r(x - 6, gy - 52, 162, 3, '#e3d6b8'); } }, { kind: 'cat', x: 110, col: '#f6f2ea' }],
        intro: [N('В июле мы виделись почти каждый день: Крестовский, Эрарта, «Гарцующий пони» со смородиновым пивом.'), N('А в Кронштадте я снял квартиру с балконом на воду.'), N('У Морского собора мы потерялись.', { img: 'img/kron.webp' }), D('Оля я ищу тебя пять минут походу плохо ищу')],
        spots: [
          { x: 110, icon: '?', lines: [N('Белый кот смотрит из-за решётки. Тебя он не видел.')] },
          { x: 214, req: true, lines: [O('Я внутри была все время', { do: s => { s.actors.o.hidden = false; } }), N('Ты вышла из дверей собора.', { fx: 'hearts', at: 'o' })], join: 'o', end: true },
        ],
      }),
      S_({
        w: 240, place: 'Кронштадт, квартира с балконом на воду',
        opts: { bg: 'room', wall: '#c9c2d6', floor: '#8a6242', props: [{ k: 'window', x: 20 }, { k: 'sofa', x: 96 }, { k: 'tv', x: 176, film: true }, { k: 'plant', x: 70 }] },
        cast: { o: { x: 110, outfit: 'jeans', pose: 'sit' }, d: { x: 128, outfit: 'summer', pose: 'sit' } },
        lines: [
          N('В Кронштадте мы вместе посмотрели «Историю рыцаря» — любимый фильм моего детства.'),
          N('Я всегда хотел посмотреть что-нибудь вдвоём. Не одновременно в разных городах, а рядом.'),
          N('Это был первый раз. Для меня он был очень важен.', { fx: 'hearts', at: 'd' }),
        ],
      }),
      W_({
        w: 420, player: 'd', place: 'Старая Деревня', date: '25 июля 2026, после дождя',
        opts: { bg: 'city', time: 'gold', ground: 'grass', sea: false, props: [{ k: 'swing', x: 150 }, { k: 'tree', x: 60, kind: 'round' }, { k: 'bench', x: 250 }, { k: 'lamp', x: 310 }, { k: 'tree', x: 370, kind: 'round' }] },
        extras: [{ kind: 'fn', x: 210, z: -2, par: 0.2, fn: (x, gy) => { const cols = ['#ff5c5c', '#ffb26b', '#ffe98a', '#7ad6a0', '#6fb7ff', '#b58cff']; const c = A.ctx; c.globalAlpha = 0.55; for (let k = 0; k < 6; k++) for (let a = 0; a <= 60; a++) { const t = Math.PI * a / 60; A.px(x - Math.cos(t) * (100 - k * 2), gy - 20 - Math.sin(t) * (80 - k * 2), cols[k]); } c.globalAlpha = 0.3; for (let k = 0; k < 6; k++) for (let a = 0; a <= 60; a++) { const t = Math.PI * a / 60; A.px(x - Math.cos(t) * (122 + k * 2), gy - 20 - Math.sin(t) * (98 + k * 2), cols[5 - k]); } c.globalAlpha = 1; } }],
        cast: { d: { x: 30, outfit: 'summer' } },
        intro: [N('25 июля был ливень.')],
        spots: [
          { x: 166, req: true, icon: '♪', lines: [N('Я ждал тебя на детской площадке. Сел на мокрые качели. Над домами встала двойная радуга.', { img: 'img/rainbow.webp' }), D('Вселенная меня очень любит я мокрый и счастливый'), N('А вечером мы сильно поругались.')], end: true },
        ],
      }),
      S_({
        w: 240, place: 'Севкабель, световая инсталляция', date: '26 июля 2026',
        opts: { bg: 'room', wall: '#0e0d24', floor: '#1a1932', props: [] },
        extras: [{ kind: 'fn', x: 120, z: -1, fn: (x, gy, e) => { const c = A.ctx; for (let i = 0; i < 26; i++) { const a = e.t * 0.5 + i * 0.6, y = gy - 96 + i * 3; c.globalAlpha = 0.5 + 0.4 * Math.sin(a); A.r(x - 60 + Math.sin(a) * 30, y, 120 - Math.abs(Math.sin(a)) * 50, 1, ['#ffd166', '#ff7aa8', '#6fb7ff'][i % 3]); } c.globalAlpha = 1; } }],
        cast: { o: { x: 112, outfit: 'yellowSkirt' }, d: { x: 132, outfit: 'summer', flip: true } },
        lines: [
          N('На следующий день — Ботанический сад.', { img: 'img/garden.jpg' }),
          N('А вечером световая инсталляция. Ты стояла в жёлтой юбке и смотрела вверх.'),
          O('Как же пиздато было плакать под ту инсталляцию'),
          N('Тот июль был не только про радугу. Мы оба устали, и в какой-то момент показалось, что всё закончилось.'),
          N('Я улетал, плакал в пустой электричке под сопливую музыку и не знал, чем это кончится.'),
        ],
      }),
      PH([
        ['day', '30 июля, Дима в аэропорту'],
        ['note', 'долгий разговор о том, что будет дальше. Оба вспоминают лучшее из этого приезда'],
        ['o', 'Ну воспоминания из крондштата когда лежали и солнце было из окна\nОни теплые и классные у меня', '16:59'],
        ['o', 'И когда за руку бежали в Калининграде по песку\nПока у меня телефон не выпал', '17:00'],
        ['o', 'Наверно самые яркие воспоминания с этого твоего приезда', '17:00'],
        ['o', 'Ладно наверно должна сказать\nПохуй газ\nРаз уж меня так кроет от того что ты не со мной то должен быть со мной получается', '18:07'],
        ['day', '7 августа'],
        ['note', 'Оля едет в метро в кино, Дима собирается спать'],
        ['o', 'Ну побудь со мной еще 3 станции', '21:16'],
        ['d', 'Я с тобой ещё три станции', '21:16'],
        ['day', '11 августа'],
        ['d', 'Снилась ты', '06:00'],
        ['o', 'Ты мне тоже снился', '07:59'],
        ['d', 'О была такая ачивка вроде приснится друг другу в одну ночь', '08:12'],
      ], TG),
    ],
  },

  // ───────────────────────── 26. ШАНХАЙ
  {
    short: '20.08.2026', date: '20–23 августа 2026', title: 'Шанхай', place: 'Шанхай',
    sub: '«Оль поехали в августе на Интернешнл в Шанхай».',
    steps: [
      S_({ w: 240, scene: 'map', place: '19–20 августа 2026', cast: {}, opts: { routes: [['spb','sh','o'],['vl','sh','d']] }, lines: [N('А в августе мы встретились там, где ещё не были ни разу.')] }),
      W_({
        w: 340, player: 'o', place: 'Аэропорт Пудун',
        opts: Object.assign({}, AIRHALL, { props: [{ k: 'gate', x: 10, sign: '到达' }, { k: 'barrier', x: 70, n: 5 }, { k: 'plant', x: 170 }, { k: 'seats', x: 220, n: 4, col: '#c8323c' }, { k: 'text', x: 270, y: 96, s: 'PVG', col: '#3a3d4a' }] }),
        cast: { o: { x: 30, outfit: 'jeans' }, d: { x: 196, outfit: 'summer', flip: true } },
        extras: [{ kind: 'fn', x: 186, fn: (x, gy, e) => { SCENES.P.bouquet(x - 4, gy, { y: 16 }, e); SCENES.P.bouquet(x + 2, gy, { y: 20 }, e); SCENES.P.bouquet(x - 1, gy, { y: 12 }, e); } }],
        intro: [N('В январе я написал это почти в шутку. 20 августа я стоял в зоне прилёта после ночи без сна.'), N('С огромным букетом.', { img: 'img/sh_bouquet.webp' }), D('Как же я надеюсь что жду где надо')],
        spots: [
          { x: 176, req: true, face: true, lines: [N('Накануне я написал, что для меня ты будешь самой красивой в мире, даже ненакрашенной. Так и было.', { fx: 'hearts', at: 'o' })], join: 'd', end: true },
        ],
      }),
      // ── первый день: отель → 1000 Trees → nodcafe (дождь) → мост ──
      W_({
        w: 330, player: 'o', place: 'Шанхай, первый день',
        opts: { bg: 'shCity', time: 'cloud', ground: 'stone', hill: 130, props: [
          { k: 'tallglass', x: 6, h: 96, col: '#3a5a8a', par: 0.7, dy: -22 }, { k: 'tree', x: 34, kind: 'round' }, { k: 'tree', x: 118, kind: 'round' },
          { k: 'oldhouse', x: 190, col: '#b5653a', w: 56, h: 46 }, { k: 'tree', x: 262, kind: 'round' }, { k: 'kiosk', x: 284, sign: 'nod', col: '#f6f2ea', c2: '#14121c' },
        ] },
        cast: { o: { x: 20, outfit: 'whiteDress' }, d: { x: 6, outfit: 'summer', follow: true } },
        extras: [{ cfg: NPC.cn1, x: 150 }, { cfg: NPC.cn2, x: 236, flip: true }],
        intro: [N('Отель у станции Xinzha Road. Зонтики на ресепшене и робот-доставщик в лифте.')],
        spots: [
          { x: 100, req: true, icon: '…', lines: [N('Сначала — здание 1000 Trees. Гора из бетона, на которой растёт лес.'), N('Ты — на ступенях перед ним.', { img: 'img/sh_trees.webp' })] },
          { x: 286, req: true, icon: '…', lines: [N('Потом кофе в nodcafe.')], end: true },
        ],
      }),
      W_({
        w: 300, player: 'o', place: 'nodcafe',
        opts: { bg: 'room', wall: '#efe8da', wall2: '#e2d9c6', floor: '#7a6a58', rain: false, props: [
          { k: 'pendant', x: 40, len: 20 }, { k: 'pendant', x: 150, len: 30 }, { k: 'pendant', x: 250, len: 20 },
          { k: 'counter', x: 8, w: 70, cakes: true }, { k: 'octoSign', x: 42 }, { k: 'cafeWindow', x: 100 },
          { k: 'table', x: 124, w: 30 }, { k: 'stool', x: 120 }, { k: 'stool', x: 158 }, { k: 'cup', x: 132 }, { k: 'cup', x: 144, col: '#e8b25a' },
          { k: 'table', x: 222, w: 28 }, { k: 'stool', x: 218 }, { k: 'plant', x: 276 },
        ] },
        cast: { o: { x: 20, outfit: 'whiteDress' }, d: { x: 6, outfit: 'summer', follow: true } },
        extras: [{ cfg: NPC.barista, x: 58, flip: true }, { cfg: NPC.cn3, x: 232, pose: 'sit' }],
        spots: [
          { x: 44, icon: '…', lines: [N('На чеке — чёрный осьминог с глазом.', { img: 'img/check.jpg' })] },
          { x: 138, req: true, icon: '♥', face: true, lines: [N('Мы сели у окна.'), N('Пока мы сидели, за окном забарабанил сильный дождь.', { do: s => { s.sceneState.rain = true; } })] },
          { x: 272, req: true, icon: '…', lines: [N('А после него — мост.', { fx: 'hearts', at: 'o' })], end: true },
        ],
      }),
      W_({
        w: 360, player: 'o', place: 'Мост',
        opts: { bg: 'shCity', time: 'cloud', ground: 'red', hill: 20, hillS: 1.1, props: [
          { k: 'tree', x: 40, kind: 'round' }, { k: 'cableBridge', x: 236 }, { k: 'lamp', x: 112 },
        ] },
        cast: { o: { x: 20, outfit: 'whiteDress' }, d: { x: 6, outfit: 'summer', follow: true } },
        extras: [{ cfg: NPC.cn3, x: 300, flip: true }],
        spots: [
          { x: 200, req: true, icon: '♥', lines: [N('Кирпичные улочки, плющ с оранжевыми цветами, жара.'), N('Мост над водой, а за ним — тот самый лес на бетонных столбах.', { fx: 'hearts', at: 'o' })], end: true },
        ],
      }),
      // ── вечер: набережная и небоскрёбы ──
      W_({
        w: 330, player: 'o', place: 'Вечер, набережная', date: 'Вечер',
        opts: { bg: 'shCity', time: 'night', pudong: true, ground: 'bund', props: [{ k: 'lamp', x: 70 }, { k: 'lamp', x: 230 }] },
        cast: { o: { x: 20, outfit: 'whiteDress' }, d: { x: 6, outfit: 'tee', follow: true } },
        extras: [{ cfg: NPC.cn2, x: 120 }, { cfg: NPC.tourist, x: 280, flip: true }],
        spots: [
          { x: 160, req: true, icon: '♥', face: true, lines: [N('Вечером мы вышли к реке. На другом берегу — огни Пудуна, а верхушки башен тонут в тумане.', { img: 'img/sh_bund.webp', fx: 'hearts', at: 'o' })], end: true },
        ],
      }),
      W_({
        w: 440, player: 'o', place: 'Под небоскрёбами',
        opts: { bg: 'shCity', time: 'fogn', ground: 'nroad', props: [
          { k: 'metroSign', x: 50 }, { k: 'tree', x: 130, kind: 'round', pal: ['#1f3a2a', '#2f5a3f', null] },
          { k: 'bigJin', x: 250, par: 0.5 }, { k: 'bigWfc', x: 330, par: 0.5 }, { k: 'bigSht', x: 430, par: 0.5 },
          { k: 'fogOver', x: 0, par: 0, fg: true },
        ] },
        cast: { o: { x: 20, outfit: 'silver' }, d: { x: 6, outfit: 'tee', follow: true } },
        spots: [
          { x: 270, req: true, icon: '…', face: true, lines: [N('Потом мы дошли до небоскрёбов. Их верхушки уходили прямо в облака.', { img: 'img/sh_towers.webp' })], end: true },
        ],
      }),
      S_({
        w: 240, place: 'Смотровая площадка',
        opts: { bg: 'skyView', mode: 'deck' },
        cast: { o: { x: 108, outfit: 'silver', pose: 'hug' }, d: { x: 120, outfit: 'tee', pose: 'hug', flip: true } },
        lines: [N('Мы поднялись на небоскрёб — смотреть на город сверху.'), N('Вот так он выглядел оттуда.', { video: 'img/sh_deck.mp4' })],
      }),
      S_({
        w: 240, place: 'Колесо обозрения',
        opts: { bg: 'shCity', time: 'night', ground: 'nroad', props: [{ k: 'wheel', x: 120 }, { k: 'lamp', x: 30 }, { k: 'lamp', x: 214 }] },
        cast: { o: { x: 108, outfit: 'silver', pose: 'hug' }, d: { x: 121, outfit: 'tee', pose: 'hug', flip: true } },
        lines: [N('Ещё в Шанхае мы катались на колесе обозрения.'), N('И целовались там, наверху.', { fx: 'hearts', at: 'o' })],
      }),
      // ── второй день: магазины, торговая улица, Pop Mart, парк ──
      S_({
        w: 240, place: 'The International', date: 'Следующий день',
        opts: { bg: 'room', wall: '#0e0d24', floor: '#1a1932', props: [{ k: 'arena', x: 60 }] },
        cast: { d: { x: 200, outfit: 'linen', flip: true } },
        lines: [N('На следующий день я ушёл на Интернешнл. А ты развлекалась сама.')],
      }),
      W_({
        w: 320, player: 'o', place: 'Магазины', date: '21–22 августа 2026',
        opts: { bg: 'room', wall: '#f1ead8', floor: '#c9b89a', props: [{ k: 'counter', x: 10, w: 50 }, { k: 'shelf', x: 80 }, { k: 'door', x: 130, col: '#8a6242' }, { k: 'text', x: 139, y: 44, s: '试', col: '#5a3d2e', align: 'center' }, { k: 'shelf', x: 200 }, { k: 'labubu', x: 208, y: 34 }, { k: 'labubu', x: 218, y: 34 }, { k: 'labubu', x: 212, y: 20 }, { k: 'plant', x: 270 }] },
        cast: { o: { x: 20, outfit: 'silver' }, d: { x: 292, outfit: 'summer', flip: true } },
        spots: [
          { x: 132, req: true, icon: '?', lines: [N('Я мерил штаны в раздевалке, а ты ходила между полками.'), O('Я у штанов'), O('Сюда иди'), D('Я в новых штанах', { do: s => { s.actors.d.cfg = Object.assign({}, s.actors.d.cfg, OUTFITS.d.linen, { bottomType: 'pants', bag: null, legs: null }); } }), N('Я вышел и подошёл показать.'), D('Ладно переодеваюсь обратно'), O('Да в них иди. Как я посмотрю то'), O('Я  тебе еще штаны нашла'), N('В этих льняных штанах я и проходил весь Шанхай.')], join: 'd', end: true },
        ],
        exit: false,
      }),
      W_({
        w: 440, player: 'o', place: 'Торговая улица', date: 'Следующий день',
        opts: { bg: 'shCity', time: 'sunny', ground: 'tile', props: [
          { k: 'stoneBld', x: 20, w: 54, h: 92, par: 0.7, dy: -22 }, { k: 'glassBlock', x: 120, w: 34, h: 104, col: '#3d6fb0', par: 0.7, dy: -22 }, { k: 'glassBlock', x: 162, w: 26, h: 72, col: '#5a86b8', par: 0.7, dy: -22 },
          { k: 'dept', x: 220, par: 0.7, dy: -22 }, { k: 'stoneBld', x: 330, w: 46, h: 70, col: '#c8a8a0', par: 0.7, dy: -22 },
          { k: 'tree', x: 90, kind: 'round', pal: ['#2f5a3f', '#3f7a55', null] }, { k: 'tree', x: 140, kind: 'round', pal: ['#2f5a3f', '#3f7a55', null] }, { k: 'hdKiosk', x: 210 }, { k: 'popFront', x: 330 },
        ] },
        cast: { o: { x: 20, outfit: 'silver' }, d: { x: 6, outfit: 'linen', follow: true } },
        extras: [{ cfg: NPC.tourist, x: 80 }, { cfg: NPC.cn1, x: 170, flip: true }, { cfg: NPC.cn2, x: 252 }, { cfg: NPC.cn3, x: 300, flip: true }, { cfg: NPC.kid, x: 196 }],
        spots: [
          { x: 150, req: true, icon: '…', lines: [N('Торговая улица: толпа и синяя плитка под ногами.', { img: 'img/sh_street.webp' })] },
          { x: 376, req: true, icon: '♥', lines: [N('А потом мы зашли в Pop Mart.')], end: true },
        ],
      }),
      W_({
        w: 300, player: 'o', place: 'Pop Mart',
        opts: { bg: 'room', wall: '#9a8ad0', wall2: '#8a7ac4', floor: '#b8323c', props: [{ k: 'labWall', x: 70 }, { k: 'counter', x: 246, w: 46 }, { k: 'labubu', x: 20, y: 20 }, { k: 'labubu', x: 36, y: 20 }] },
        cast: { o: { x: 20, outfit: 'silver' }, d: { x: 6, outfit: 'linen', follow: true } },
        spots: [
          { x: 150, req: true, icon: '♥', lines: [N('Целая стена лабубу.', { img: 'img/sh_pop.webp' }), N('Я купил тебе новую Лабубу.', { fx: 'hearts', at: 'o' })], end: true },
        ],
      }),
      W_({
        w: 420, player: 'o', place: 'Парк',
        opts: { bg: 'shCity', time: 'storm', ground: 'grass', lake: true, props: [
          { k: 'constructTower', x: 160, h: 76, cap: true, par: 0.3, dy: -26 }, { k: 'glassBlock', x: 200, w: 22, h: 40, par: 0.3, dy: -26 }, { k: 'glassBlock', x: 232, w: 24, h: 46, par: 0.3, dy: -26 }, { k: 'glassBlock', x: 120, w: 20, h: 36, par: 0.3, dy: -26 },
          { k: 'archBridge', x: 40, len: 270, par: 0.6, dy: -18 }, { k: 'willow', x: 24 }, { k: 'bush', x: 170 }, { k: 'bush', x: 300 }, { k: 'willow', x: 380 },
        ] },
        cast: { o: { x: 30, outfit: 'silver' }, d: { x: 16, outfit: 'linen', follow: true } },
        spots: [
          { x: 210, req: true, icon: '…', lines: [N('Парк. Белый мост с аркадами, отражение в воде и тяжёлые тучи.', { img: 'img/sh_park.webp' })], end: true },
        ],
      }),
      S_({
        w: 240, place: 'The International, финал', date: '23 августа 2026',
        opts: { bg: 'room', wall: '#0e0d24', floor: '#1a1932', props: [{ k: 'arena', x: 60 }] },
        cast: { d: { x: 200, outfit: 'linen', flip: true } },
        lines: [
          N('Финал Интернешнла. Я мечтал попасть сюда половину жизни.'),
          N('А ты в это время одна поехала на метро, сама нашла обменник на People’s Square — «Я нашла!!!!» — и купила мне булочку.'),
          N('Я сидел на арене своей мечты и ловил себя на том, что жду вечера.'),
        ],
      }),
      S_({
        w: 240, place: 'Отель у Xinzha Road', date: 'Каждый вечер',
        opts: { bg: 'room', wall: '#3a3552', floor: '#6b4a34', dim: 0.3, props: [{ k: 'window', x: 26, night: true }, { k: 'bed', x: 110 }, { k: 'table', x: 190, w: 26 }, { k: 'gift', x: 198, dy: -13, col: '#8fc3ea' }] },
        cast: { o: { x: 132, outfit: 'home', pose: 'hug' }, d: { x: 142, outfit: 'linen', pose: 'hug', flip: true } },
        lines: [
          N('Каждый вечер в номере мы обнимались и целовались.', { fx: 'hearts', at: 'o' }),
          N('А в последний день ты подарила мне льняную рубашку.'),
          N('Я проходил в ней на работу всё тёплое начало учебного года.'),
        ],
      }),
      S_({
        w: 240, place: 'Такси, ночной Шанхай', date: '23 августа 2026, ночь',
        opts: { bg: 'city', time: 'night', ground: 'road', sea: false, skyline: false, props: [{ k: 'tallglass', x: 10, h: 100 }, { k: 'tallglass', x: 40, h: 80, col: '#3a2a6a' }, { k: 'pearl', x: 90 }, { k: 'tallglass', x: 180, h: 112, twist: true }, { k: 'tallglass', x: 210, h: 70, col: '#2a4a6a' }, { k: 'car', x: 110, col: '#3fd0c0', taxi: true }] },
        cast: {},
        lines: [
          N('В такси ты легла мне на ноги и смотрела на меня снизу.'),
          N('Этот взгляд я постарался сохранить так глубоко, как только умею.', { fx: 'hearts' }),
        ],
      }),
      S_({ w: 240, scene: 'map', place: '24 августа 2026', cast: {}, opts: { routes: [['sh','spb','o'],['sh','vl','d']] }, lines: [N('И разлетелись по домам.')] }),
      PH([
        ['day', '24 августа, самолёт'],
        ['note', 'Оля присылает большое письмо о поездке'],
        ['d', 'Я тебя люблю вместе со всем что ты там понаписала', '01:23'],
        ['d', 'И сложностями и приколами', '01:24'],
        ['d', 'Ты охуенная', '01:24'], ['d', 'Целиком', '01:24'],
        ['d', 'После того как мы ехали в такси и ты лежала у меня на ногах и смотрела на меня', '16:31'],
        ['d', 'Взгляд этот и лицо твое', '16:31'],
        ['d', 'Да вообще Шанхай конечно супер лечебно на все сложности в отношениях повлиял', '16:32'],
        ['day', '26 августа'],
        ['d', 'Шанхай с тобой это буквально лучшее время с девушкой которое я проводил в своей жизни', '16:58'],
        ['day', '28 августа'],
        ['d', 'Ладно\nЭльфийка моя\nЛюблю обожаю дичайше', '19:04'],
      ], TG),
    ],
  },
);

// Шанхай: саундтрек на всех сценах главы, кроме телефона (audio/shanghai.mp3, Rosa Walton)
(() => { const c = STORY.find(c => c.title === 'Шанхай'); if (c) c.steps.forEach(st => { if (st.t !== 'phone') st.music = 'shanghai.mp3'; }); })();
