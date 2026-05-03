// constants/UsefulMaterials/HistoryOfUkraine/Cartoons/preSovietData.ts

export interface Cartoon {
  id: number;
  imageUrl: string;
  country: string;
  date: string;
  target: string;
  explanation: string;
}

// Конфігурація для PDF
// export const PRE_SOVIET_COLUMNS = [
//   { header: 'Карикатура', accessor: 'imageUrl', width: 40 },
//   { header: 'Країна походження', accessor: 'country', width: 25 },
//   { header: 'Дата / Період', accessor: 'date', width: 20 },
//   { header: 'Об\'єкт висміювання', accessor: 'target', width: 35 },
//   { header: 'Пояснення', accessor: 'explanation', width: 'auto' },
// ] as const;

// constants/UsefulMaterials/HistoryOfUkraine/Cartoons/preSovietData.ts

export const PRE_SOVIET_COLUMNS = [
  { 
    header: 'Карикатура', 
    accessor: (row: Cartoon) => {
      // Повертаємо не текст, а дані для створення HTML
      return {
        type: 'image',
        src: row.imageUrl,
        alt: 'cartoon',
        style: 'max-height:80px; max-width:120px; object-fit:contain;'
      };
    }, 
    width: 40 
  },
  { header: 'Країна походження', accessor: 'country', width: 25 },
  { header: 'Дата / Період', accessor: 'date', width: 20 },
  { header: 'Об\'єкт висміювання', accessor: 'target', width: 35 },
  { header: 'Пояснення', accessor: 'explanation', width: 'auto' },
] as const;

export const PRE_SOVIET_SHOW_ROW_NUMBERS = true;

export const preSovietData: Cartoon[] = [
  {
    id: 1,
    imageUrl: "/images/cartoons/1_pre-Soviet_period/1_01.webp",
    country: "Європейська",
    date: "др. пол. XVIII ст.",
    target: "Аморальність тогочасних великих держав (Росії, Прусії, Австрії)",
    explanation: "На зображенні представлена сатирична карикатура, що зображує Перший розділ Речі Посполитої (Польща) у 1772 році.",
  },
  {
    id: 2,
    imageUrl: "/images/cartoons/1_pre-Soviet_period/1_02.webp",
    country: "Британсько-Французька",
    date: "кінець XVIII ст.",
    target: "Експансіоністську політику та непомірні територіальні амбіції російської імператриці Катерини II",
    explanation: "Карикатура «Імперський крок» зображує експансіоністські амбіції імператриці Катерини II у контексті її так званого «Грецького проекту». Імператрицю зображено як колосальну постать, що крокує з Росії до Константинополя.",
  },
  {
    id: 3,
    imageUrl: "/images/cartoons/1_pre-Soviet_period/1_03.webp",
    country: "Австрійська",
    date: "кінець XVIII ст.",
    target: "Імперська експансія Росії, особисто імператриці Катерини II, політика «розширення будь-якою ціною»",
    explanation: "Показано військову й політичну перемогу Росії (Катерини II) над турками. Друга частина - натяк на територіальну експансію Росії на південь і захід після російсько-турецьких воєн.",
  },
  {
    id: 4,
    imageUrl: "/images/cartoons/1_pre-Soviet_period/1_04.webp",
    country: "Британська",
    date: "кінець XVIII ст.",
    target: "Імперські амбіції російської імператриці Катерини II (її «Грецький проект»)",
    explanation: "Катерина II зображена на троні в стані дрімоти («Сон королеви Катерини»), марячи про нові завоювання. Блазень підносить їй на блюді палаючий Константинополь. Ведмідь - традиційний символ Росії, який топче та шматує карту з написом «Turkey», вказуючи на агресивну війну проти Османів.",
  },
  {
    id: 5,
    imageUrl: "/images/cartoons/1_pre-Soviet_period/1_05.webp",
    country: "Російська",
    date: "друга половина XIX століття (після 1861 року)",
    target: "Несправедливість Селянської реформи 1861 року та проблему «малоземелля»",
    explanation: "Гігантський селянин на одній нозі символізує весь трудовий народ. Маленький клаптик землі під ногою — це «наділ» після реформи. Поміщик і маєток на задньому плані демонструють, що найкращі та найбільші земельні угіддя залишилися у власності багатіїв.",
  },
  {
    id: 6,
    imageUrl: "/images/cartoons/1_pre-Soviet_period/1_06.webp",
    country: "Російська",
    date: "1914–1915 роки",
    target: "Німецька імперія, її армія та монарх",
    explanation: "Російський солдат замахується гвинтівкою, щоб провчити («дати науку») німецького офіцера та його пса. Собака в нашийнику символізує агресію Німеччини, яку російський «мужик»-воїн обіцяє приборкати.",
  },
  {
    id: 7,
    imageUrl: "/images/cartoons/1_pre-Soviet_period/1_07.webp",
    country: "Австрійська",
    date: "1914–1915 роки",
    target: "Вище військове керівництво Російської імперії (генералітет та офіцерів)",
    explanation: "Малюнок під назвою «Russischer Kriegsrat» (Російська військова рада) зображує російське командування як групу некомпетентних п'яниць.",
  },
  {
    id: 8,
    imageUrl: "/images/cartoons/1_pre-Soviet_period/1_08.webp",
    country: "Австрійська",
    date: "1915 рік",
    target: "Російська армія («москалі»)",
    explanation: "На малюнку зображено колону російських солдатів, які вивозять зі Львова «трофеї» на селянському возі. Російські військові зображені як мародери, що займаються пограбуванням мирного населення замість ведення чесної війни.",
  },
  {
    id: 9,
    imageUrl: "/images/cartoons/1_pre-Soviet_period/1_09.webp",
    country: "Австрійська",
    date: "1916 рік",
    target: "Російська армія",
    explanation: "Австро-угорський солдат символічно «вимітає» російські війська з міста - метафора звільнення Львова від російської окупації. На задньому плані зображено будівлю з прапорами, що символізує відвойоване місто.",
  },
  {
    id: 10,
    imageUrl: "/images/cartoons/1_pre-Soviet_period/1_10.webp",
    country: "Німецька",
    date: "період Першої світової війни",
    target: "Російська імперія",
    explanation: "Російська імперія (зображена у вигляді великого ведмедя з написом «Russland»), що символізує «приборкання» великого ворога та контроль над ним. Маленька людина (Сербія) під ведмедем виглядає безпорадною.",
  },
];