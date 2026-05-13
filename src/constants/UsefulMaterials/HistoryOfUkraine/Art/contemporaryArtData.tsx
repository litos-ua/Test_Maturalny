import type { Artwork } from './artTypes';

export const CONTEMPORARY_ART_COLUMNS = [
  { header: 'Зображення', accessor: 'imageUrl', width: 25 },
  { header: 'Назва та автор', accessor: (row: Artwork) => `${row.title} (${row.author})`, width: 35 },
  { header: 'Дата', accessor: 'date', width: 15 },
  { header: 'Опис / Стиль', accessor: (row: Artwork) => `${row.style} | ${row.description}`, width: 'auto' },
] as const;

export const CONTEMPORARY_ART_SHOW_ROW_NUMBERS = true;

export const contemporaryArtData: Artwork[] = [
  {
    id: 1,
    imageUrl: "/images/art/contemporary/501_Ukrainka_Bojczuk.webp",
    title: "Українка",
    author: "Михайло Бойчук",
    date: "початок 1910-х рр.",
    style: "Монументалізм, «бойчукізм» (неовізантизм, італійський проторенесанс)",
    description: "Зразок монументального мистецтва. Ідеалізований образ жінки-трудівниці, узагальнений, позачасовий тип української селянки. Голова школи «бойчукістів»."
  },
  {
    id: 2,
    imageUrl: "/images/art/contemporary/502_Czerny_kwadrat_Malewicz.webp",
    title: "Чорний квадрат",
    author: "Казимир Малевич",
    date: "1915 р.",
    style: "Супрематизм (авангард)",
    description: "Маніфест супрематизму. Народився в Україні (Київ, Харків). Прорив у безпредметність, «нуль форм». Одна з найвідоміших картин у світовому мистецтві."
  },
  {
    id: 3,
    imageUrl: "/images/art/contemporary/503_100_krb_eskiz_Narbuta.webp",
    title: "Банкнота 100 карбованців УНР",
    author: "Григорій Нарбут (ескіз)",
    date: "1917 р.",
    style: "Графічний дизайн, стилізація (модерн)",
    description: "Стилізація під козацькі клейноди. Зразок українського графічного дизайну доби УНР. Використання тризуба та козацької символіки."
  },
  {
    id: 4,
    imageUrl: "/images/art/contemporary/504_100_grn_eskiz_Narbuta.webp",
    title: "Банкнота 100 гривень УНР",
    author: "Григорій Нарбут (ескіз)",
    date: "1918 р.",
    style: "Графічний дизайн, стилізація",
    description: "Тризуб як національний символ. Подальший розвиток української графіки. Відображає державницькі прагнення доби Української Народної Республіки."
  },
  {
    id: 5,
    imageUrl: "/images/art/contemporary/505_Enej_i_ego_komanda_Narbut.webp",
    title: "Еней та його військо",
    author: "Григорій Нарбут",
    date: "1919 р.",
    style: "Графіка, книжкова ілюстрація",
    description: "Ілюстрації до «Енеїди» Івана Котляревського. Відродження української графіки, орієнтація на національну традицію."
  },
  {
    id: 6,
    imageUrl: "/images/art/contemporary/506_Gucul_z_kwitkoju_Kasijan.webp",
    title: "Гуцул з квіткою",
    author: "Василь Касіян (літографія)",
    date: "1923 р.",
    style: "Графіка, літографія",
    description: "Мистецтво Західної України. Звернення до народної тематики, етнографічний інтерес. Образ гуцула як символ карпатського регіону."
  },
  {
    id: 7,
    imageUrl: "/images/art/contemporary/507_estamp_Karpatska_maty_Kasijan.webp",
    title: "Карпатська мати",
    author: "Василь Касіян (естамп)",
    date: "1923 р.",
    style: "Графіка, естамп",
    description: "Образ жінки-трудівниці. Героїчне звучання, символічне узагальнення. Трагедія та велич матері, що втратила сина."
  },
  {
    id: 8,
    imageUrl: "/images/art/contemporary/508_Tryptych_Zhyttja_Kriczewsky.webp",
    title: "Життя (триптих «Любов. Сім'я. Повернення»)",
    author: "Федір Кричевський",
    date: "1925–1927 рр.",
    style: "Український «сезаннізм», авангард, монументалізм",
    description: "Поєднання авангарду з національними традиціями. Узагальнені форми, яскравий колорит. Триптих про вічні цінності буття."
  },
  {
    id: 9,
    imageUrl: "/images/art/contemporary/509_Awtoportret_Malewicz.webp",
    title: "Автопортрет (відомий як «Художник»)",
    author: "Казимир Малевич",
    date: "1933 р.",
    style: "Сюрреалізм, фігуративний живопис",
    description: "Пізня творчість. Повернення до фігуративу. Зв'язок з Україною того часу. Постать митця, що тримає кисть, – символ творчості."
  },
  {
    id: 10,
    imageUrl: "/images/art/contemporary/510_Awtoportret_Yablonska.webp",
    title: "Автопортрет",
    author: "Тетяна Яблонська",
    date: "1945 р.",
    style: "Соціалістичний реалізм",
    description: "Відображає стан митця післявоєнної доби. Впевненість, оптимізм, віра у відновлення країни. Соцреалізм з елементами імпресіонізму."
  },
  {
    id: 11,
    imageUrl: "/images/art/contemporary/511_Pered_startom_Yablonska.webp",
    title: "Перед стартом",
    author: "Тетяна Яблонська",
    date: "1947 р.",
    style: "Соціалістичний реалізм",
    description: "Спорт в радянському мистецтві. Життєствердний настрій, молодість, бадьорість. Зразок офіційного радянського живопису."
  },
  {
    id: 12,
    imageUrl: "/images/art/contemporary/512_Chlib_Yablonska.webp",
    title: "Хліб",
    author: "Тетяна Яблонська",
    date: "1949 р.",
    style: "Соціалістичний реалізм (монументалізований жанр)",
    description: "Ударна праця колгоспниць. Зразок соцреалізму. Прославлення щасливої праці у відбудованому господарстві. Сталінська премія."
  },
  {
    id: 13,
    imageUrl: "/images/art/contemporary/513_Hata_w_Bogdaniwci_Bilokur.webp",
    title: "Хата в Богданівці",
    author: "Катерина Білокур",
    date: "1955 р.",
    style: "Наївне мистецтво (примітивізм)",
    description: "Оспівування природи та народного побуту. Відкрита світом завдяки Пабло Пікассо. Фантастична квітковість, декоративність, любов до свого краю."
  },
  {
    id: 14,
    imageUrl: "/images/art/contemporary/514_Gorohowy_zwir_Pryjimaczenko.webp",
    title: "Гороховий звір",
    author: "Марія Приймаченко",
    date: "1971 р.",
    style: "Наївне мистецтво (народний живопис)",
    description: "Фантастичні звірі. Унікальний український народний живопис («народний наїв»). Яскраві кольори, добрі та смішні образи. Символ української культури."
  },
];