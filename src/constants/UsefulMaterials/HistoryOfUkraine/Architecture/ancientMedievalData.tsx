export interface ArchitecturalSite {
  id: number;
  imageUrl?: string;
  name_location: string;
  yearBuilt: string;
  style: string;
  description: string;
}

export const ANCIENT_MEDIEVAL_COLUMNS = [
  { 
    header: 'Зображення', 
    accessor: (row: ArchitecturalSite) => {
      if (!row.imageUrl) return '';
      return {
        type: 'image',
        src: row.imageUrl,
        alt: row.name_location,
        style: 'max-height:100px; max-width:120px; object-fit:contain;'
      };
    }, 
    width: 25 
  },
  { header: 'Назва та місце', accessor: 'name_location', width: 25 },
  { header: 'Стиль', accessor: 'style', width: 12 },
  { header: 'Опис', accessor: (row: ArchitecturalSite) => `📅 ${row.yearBuilt} | ${row.description}`, width: 'auto' },
] as const;

export const ANCIENT_MEDIEVAL_SHOW_ROW_NUMBERS = true;

export const ancientMedievalData: ArchitecturalSite[] = [
  {
    id: 1,
    name_location: "Херсонес Таврійський (Севастополь)",
    yearBuilt: "V ст. до н.е. – XIV ст. н.е.",
    style: "Антична, візантійська",
    description: "Грецькі колонії, Візантійська імперія | Давньогрецька колонія, згодом візантійське місто. Городище з залишками базилік, театру, оборонних мурів.",
    imageUrl: "/images/architecture/ancientMedieval/001.webp",
  },
  {
    id: 2,
    name_location: "Церква Івана Предтечі (Керч)",
    yearBuilt: "VIII - XI ст.",
    style: "Візантійський стиль",
    description: "Візантійська імперія | Унікальна пам'ятка візантійської архітектури, одна з найстаріших церков України. Його архітектура відрізняється характерною шаруватою кладкою з білого каменю та червоної цегли (плінфи), типовою для константинопольської школи. У XIX столітті до старовинного ядра прибудували дзвіницю та просторі межі, зберігши при цьому загальну гармонію стилю.",
    imageUrl: "/images/architecture/ancientMedieval/002.webp",
  },
  {
    id: 3,
    name_location: "Софійський собор (Київ)",
    yearBuilt: "1017–1037",
    style: "Візантійський стиль, давньоруська архітектура",
    description: "Київська Русь | Головний християнський храм Київської Русі, закладений Ярославом Мудрим. Відомий своїми мозаїками та фресками XI століття.",
    imageUrl: "/images/architecture/ancientMedieval/003.webp",
  },
  {
    id: 4,
    name_location: "Спасо-Преображенський собор (Чернігів)",
    yearBuilt: "1030–1050-ті",
    style: "Візантійський стиль, давньоруська архітектура",
    description: "Київська Русь | Один з найдавніших соборів Київської Русі, усипальниця чернігівських князів. Поєднання візантійських та романських рис.",
    imageUrl: "/images/architecture/ancientMedieval/004.webp",
  },
  {
    id: 5,
    name_location: "Успенський собор Києво-Печерської лаври (Київ)",
    yearBuilt: "1073–1078",
    style: "Візантійський стиль, давньоруська архітектура",
    description: "Київська Русь | Головний храм Києво-Печерської лаври, заснований Антонієм та Феодосієм Печерськими. Усипальниця видатних діячів, зруйнований у 1941 році, відновлений у 2000 році.",
    imageUrl: "/images/architecture/ancientMedieval/005.webp",
  },
  {
    id: 6,
    name_location: "Михайлівський Золотоверхий собор (Київ)",
    yearBuilt: "1108–1113",
    style: "Візантійський стиль, давньоруська архітектура",
    description: "Київська Русь | Головний храм Михайлівського Золотоверхого монастиря, збудований київським князем Святополком Ізяславичем. Зруйнований у 1930-х роках, відновлений у 1997–2000 роках.",
    imageUrl: "/images/architecture/ancientMedieval/006.webp",
  },
  {
    id: 7,
    name_location: "П'ятницька церква (Чернігів)",
    yearBuilt: "кінець XII – початок XIII ст.",
    style: "Давньоруська архітектура",
    description: "Київська Русь | Видатна пам'ятка чернігівської школи зодчества, відреставрована П.Д. Барановським у 1943–1962 роках після руйнувань. Характерний приклад давньоруської однобанної церкви.",
    imageUrl: "/images/architecture/ancientMedieval/007.webp",
  },
  {
    id: 8,
    name_location: "Успенський собор (Володимир)",
    yearBuilt: "1160",
    style: "Візантійський стиль, давньоруська архітектура",
    description: "Волинське князівство | Головний храм Волині, збудований князем Мстиславом Ізяславичем. Поєднує візантійські традиції з місцевими архітектурними особливостями.",
    imageUrl: "/images/architecture/ancientMedieval/008.webp",
  },
  {
    id: 9,
    name_location: "Церква святого Пантелеймона (поблизу Галича)",
    yearBuilt: "кінець XII ст.",
    style: "Давньоруська архітектура, романський стиль",
    description: "Галицько-Волинська держава | Одна з небагатьох збережених пам'яток галицької школи зодчества. Має виразні романські риси (різьблені капітелі, портали).",
    imageUrl: "/images/architecture/ancientMedieval/009.webp",
  },
  {
    id: 10,
    name_location: "Вірменський собор (Львів)",
    yearBuilt: "1363",
    style: "Вірменська архітектура",
    description: "Королівство Польське, вірменська громада | Головний храм вірменської діаспори у Львові. Поєднує вірменські, візантійські та східні архітектурні традиції. У XVIII ст. отримав барокову вежу.",
    imageUrl: "/images/architecture/ancientMedieval/010.webp",
  },
  {
    id: 11,
    name_location: "Костел святого Варфоломія (Дрогобич)",
    yearBuilt: "1392 – XV ст.",
    style: "Готика",
    description: "Королівство Польське | Один з найстаріших костелів Галичини. Збудований у готичному стилі, пізніше зазнав перебудов у стилі ренесансу та бароко.",
    imageUrl: "/images/architecture/ancientMedieval/011.webp",
  },
  {
    id: 12,
    name_location: "Костел Святого Мартіна (село Нове Місце, Львівська область)",
    yearBuilt: "XVI–XVII ст.",
    style: "Готика, ренесанс",
    description: "Королівство Польське | Оборонний костел, що поєднує готичні форми з ренесансними елементами. Характерний приклад сакральної архітектури Галичини.",
    imageUrl: "/images/architecture/ancientMedieval/012.webp",
  },
  {
    id: 13,
    name_location: "Покровська церква-фортеця (село Сутківці)",
    yearBuilt: "1476",
    style: "Українське готичне зодчество, оборонна архітектура",
    description: "Велике князівство Литовське | Рідкісна пам'ятка оборонної сакральної архітектури. Церква поєднує функції храму та фортеці з бійницями та товстими стінами.",
    imageUrl: "/images/architecture/ancientMedieval/013.webp",
  },
  {
    id: 14,
    name_location: "Кам'янець-Подільська фортеця",
    yearBuilt: "XIV–XVI ст.",
    style: "Готика, ренесанс, оборонна архітектура",
    description: "Велике князівство Литовське, Королівство Польське | Одна з найпотужніших фортець Східної Європи. Розташована на скелястому півострові, оточеному каньйоном річки Смотрич.",
    imageUrl: "/images/architecture/ancientMedieval/014.webp",
  },
  {
    id: 15,
    name_location: "Верхній замок (Луцьк)",
    yearBuilt: "друга половина XIV ст. – XV ст.",
    style: "Готика, оборонна архітектура",
    description: "Велике князівство Литовське | Головна фортеця Волині, резиденція князів Любарта та Вітовта. Зберіг три вежі (В'їзна, Стирова, Владича) та Любарський замок.",
    imageUrl: "/images/architecture/ancientMedieval/015.webp",
  },
  {
    id: 16,
    name_location: "Замок Паланок (Мукачівський замок)",
    yearBuilt: "XIV–XVII ст.",
    style: "Готика, ренесанс, бароко, оборонна архітектура",
    description: "Королівство Угорщина, Трансильванське князівство | Монументальна фортеця на горі вулканічного походження. Один з найбільших замків Закарпаття.",
    imageUrl: "/images/architecture/ancientMedieval/016.webp",
  },
  {
    id: 17,
    name_location: "Хотинська фортеця",
    yearBuilt: "XIII–XVI ст.",
    style: "Готика, ренесанс, оборонна архітектура",
    description: "Галицько-Волинська держава, Молдавське князівство, Річ Посполита | Легендарна фортеця на березі Дністра. Місце битви 1621 року, оспіваної в літературі.",
    imageUrl: "/images/architecture/ancientMedieval/017.webp",
  },
  {
    id: 18,
    name_location: "Генуезька фортеця (Балаклава)",
    yearBuilt: "1357–1433",
    style: "Готика, оборонна архітектура",
    description: "Генуезька республіка | Частина генуезьких колоній у Північному Причорномор'ї. Фортеця захищала вхід до Балаклавської бухти, контролювала торговельні шляхи.",
    imageUrl: "/images/architecture/ancientMedieval/018.webp",
  },
  {
    id: 19,
    name_location: "Генуезька фортеця (Судак)",
    yearBuilt: "XIV–XV ст.",
    style: "Готика, оборонна архітектура",
    description: "Генуезька республіка | Найбільша та найкраще збережена генуезька фортеця в Криму. Складається з цитаделі, оборонних мурів та веж.",
    imageUrl: "/images/architecture/ancientMedieval/019.webp",
  },
  {
    id: 20,
    name_location: "Покровська церква-фортеця (с. Сутківці, Хмельницька область)",
    yearBuilt: "1476 р.",
    style: "Готика, оборонна архітектура",
    description: "Велике князівство Литовське | Унікальна пам'ятка оборонної архітектури. Це єдина в Україні церква-фортеця, яка поєднує сакральну та оборонну функції. Має бійниці та товсті стіни.",
    imageUrl: "/images/architecture/ancientMedieval/020.webp",
  },
];