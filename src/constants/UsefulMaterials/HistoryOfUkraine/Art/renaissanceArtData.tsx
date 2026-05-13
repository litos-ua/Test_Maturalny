import type { Artwork } from './artTypes';

export const RENAISSANCE_ART_COLUMNS = [
  { header: 'Зображення', accessor: 'imageUrl', width: 25 },
  { header: 'Назва та автор', accessor: (row: Artwork) => `${row.title} (${row.author})`, width: 35 },
  { header: 'Дата', accessor: 'date', width: 15 },
  { header: 'Опис / Стиль', accessor: (row: Artwork) => `${row.style} | ${row.description}`, width: 'auto' },
] as const;

export const RENAISSANCE_ART_SHOW_ROW_NUMBERS = true;

export const renaissanceArtData: Artwork[] = [
  {
    id: 1,
    imageUrl: "/images/art/renaissance/301_Ikona_Jurij_Zmieborets_Stanyllja.webp",
    title: "Ікона святого Юрія Змієборця",
    author: "Галицька школа",
    date: "XIV ст.",
    style: "Іконопис (галицька школа), готичні впливи",
    description: "Зразок галицької школи іконопису. Святий Юрій (Георгій Змієборець) – покровитель воїнів та християнський мученик. Поєднання візантійської традиції з готичними впливами.",
  },
  {
    id: 2,
    imageUrl: "/images/art/renaissance/302_Ikona_Bogorodyci_z_ Prorokamy.webp",
    title: "Ікона Богородиці з пророками",
    author: "Невідомий майстер (галицько-волинська школа)",
    date: "кінець XV ст.",
    style: "Іконопис, вплив західноєвропейської готики",
    description: "Ікона з церкви у с. Підгородці. Відображає вплив західноєвропейського мистецтва (готики). Розширення іконографічної програми.",
  },
  {
    id: 3,
    imageUrl: "/images/art/renaissance/303_Ikona_Uspinny_Bogorodyci.webp",
    title: "Успіння Богородиці",
    author: "Олексій Горошкович (український маляр)",
    date: "1547 р.",
    style: "Іконопис, ренесансні впливи",
    description: "Підписана та датована ікона українського маляра. Важливе джерело для вивчення українського малярства XVI ст. та поширення ренесансних віянь.",
  },
  {
    id: 4,
    imageUrl: "/images/art/renaissance/304_Peresopnycke_Ewangelije.webp",
    title: "Мініатюри Пересопницького Євангелія",
    author: "Михайло Васильович (перекладач), артіль майстрів",
    date: "1556–1561 рр.",
    style: "Книжкова мініатюра, українське Відродження",
    description: "Використовується для присяги президента України. Пам'ятка української мови та книжкової справи. Багато оздоблена мініатюрами, заставками, ініціалами.",
  },
  {
    id: 5,
    imageUrl: "/images/art/renaissance/305_Apostol_John.webp",
    title: "Гравюра «Євангеліст Лука»",
    author: "Львівський «Апостол» Івана Федорова",
    date: "1574 р.",
    style: "Гравюра (ксилографія)",
    description: "Перша ілюстрація в першій друкованій книзі на українських землях («Апостол» Івана Федорова). Важливий зразок української гравюри.",
  },
  {
    id: 6,
    imageUrl: "/images/art/renaissance/306_Grawura-Portret_Konaszewicza-Sagajdacznogo.webp",
    title: "Портрет Петра Конашевича-Сагайдачного",
    author: "Гравюра з книги «Вірші на жалісний погреб...» (невідомий майстер)",
    date: "1622 р.",
    style: "Гравюра (бароко), портрет",
    description: "Відтворює образ видатного гетьмана. Рідкісне зображення козацького ватажка, яке стало канонічним для подальшої іконографії Сагайдачного.",
  },
  {
    id: 7,
    imageUrl: "/images/art/renaissance/307_Grawura-Portret_Chmelnickogo.webp",
    title: "Портрет Богдана Хмельницького",
    author: "Вільгельм Гондіус (голландський гравер)",
    date: "середина XVII ст.",
    style: "Гравюра, класицистичні впливи",
    description: "Найвідоміший прижиттєвий портрет гетьмана. Виконаний у техніці гравюри. Передає європейський образ тогочасного українського володаря.",
  },
  {
    id: 8,
    imageUrl: "/images/art/renaissance/308_Ikona_Woznesienie_Christa.webp",
    title: "Вознесіння Христове",
    author: "Йов Кондзелевич",
    date: "1705 р.",
    style: "Іконопис, українське бароко",
    description: "Шедевр українського бароко. З іконостасу церкви Воздвиження Чесного Хреста Манявського скиту. Поєднання традиційної іконографії з бароковою пишністю.",
  },
  {
    id: 9,
    imageUrl: "/images/art/renaissance/309_Grawura_Mazepa_sredi_dobrych_spraw.webp",
    title: "Іван Мазепа серед своїх добрих справ",
    author: "Іван Мигура (український гравер)",
    date: "1706 р.",
    style: "Гравюра, бароко",
    description: "Пропагандистське зображення гетьмана як мецената, будівничого та покровителя церкви. Важливе джерело з історії українського бароко та гетьманування Мазепи.",
  },
];