import type { Artwork } from './artTypes';

export const ANCIENT_ART_COLUMNS = [
  { header: 'Зображення', accessor: 'imageUrl', width: 25 },
  { header: 'Назва та автор', accessor: (row: Artwork) => `${row.title} (${row.author})`, width: 35 },
  { header: 'Дата', accessor: 'date', width: 15 },
  { header: 'Опис / Стиль', accessor: (row: Artwork) => `${row.style} | ${row.description}`, width: 'auto' },
] as const;

export const ANCIENT_ART_SHOW_ROW_NUMBERS = true;

export const ancientArtData: Artwork[] = [
  {
    id: 1,
    imageUrl: "/images/art/ancient/101_Mizinsky_braslet.webp",
    title: "Браслет із меандровим орнаментом",
    author: "Мізинська стоянка",
    date: "XXV–XX тис. до н.е.",
    style: "Первісне мистецтво (палеоліт), орнамент – меандр",
    description: "Одна з найдавніших прикрас на території України. Меандровий орнамент – символ води, що свідчить про розвинене абстрактне мислення давніх мисливців на мамонтів.",
  },
  {
    id: 2,
    imageUrl: "/images/art/ancient/102_Trypilski_ornament.webp",
    title: "Орнаментована кераміка",
    author: "Трипільська культура",
    date: "IV–III тис. до н.е.",
    style: "Первісне мистецтво (енеоліт), розпис кераміки",
    description: "Характерні розписи (спіралі, хвилі, ромби) пов'язані з культом родючості, землеробства та сонця. Свідчення розвинених релігійних уявлень.",
  },
  {
    id: 3,
    imageUrl: "/images/art/ancient/103_Trypilski_domik.webp",
    title: "Модель трипільського храму (святилища)",
    author: "Трипільська культура",
    date: "IV–III тис. до н.е.",
    style: "Первісне мистецтво (енеоліт), культова пластика",
    description: "Глиняні моделі жител з хрестоподібним планом, які інтерпретуються як моделі святилищ. Свідчать про існування розвиненого культового зодчества.",
  },
  {
    id: 4,
    imageUrl: "/images/art/ancient/104_Skiflsky_zloty_greben.webp",
    title: "Золотий гребінь із кургану Солоха",
    author: "Скіфська культура",
    date: "кінець V – початок IV ст. до н.е.",
    style: "Античне мистецтво (греко-скіфське), торевтика, звіриний стиль",
    description: "Шедевр античної торевтики. Зображення битви трьох воїнів. Поєднує грецьке ремісниче виконання зі скіфською тематикою (звіриний стиль).",
  },
  {
    id: 5,
    imageUrl: "/images/art/ancient/105_Skiflska_zlotf_pektoral.webp",
    title: "Золота пектораль із кургану Товста Могила",
    author: "Скіфська культура",
    date: "IV ст. до н.е.",
    style: "Античне мистецтво (греко-скіфське), торевтика",
    description: "Найвідоміша археологічна пам'ятка України. Три яруси: звірі (нижній), побут (середній), рослинний світ (верхній). Символ влади скіфського царя.",
  },
];