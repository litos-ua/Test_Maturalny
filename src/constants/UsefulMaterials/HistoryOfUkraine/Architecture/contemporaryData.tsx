import type { ArchitecturalSite } from './ancientMedievalData';

export const CONTEMPORARY_COLUMNS = [
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

export const CONTEMPORARY_SHOW_ROW_NUMBERS = true;

export const contemporaryData: ArchitecturalSite[] = [
  {
    id: 1,
    name_location: "Пам'ятник Тарасові Шевченку (Ромни, Сумська обл.)",
    yearBuilt: "1918",
    style: "Історизм, реалізм",
    description: "Українська Народна Республіка | Перший в історії повнофігурний пам'ятник Кобзарю. Встановлений коштом громади міста. Символ національного відродження та вшанування поета.",
    imageUrl: "/images/architecture/contemporary/001.webp",
  },
  {
    id: 2,
    name_location: "Будівля Держпрому (Харків)",
    yearBuilt: "1925–1928",
    style: "Конструктивізм (авангард)",
    description: "Українська СРР | Перша в СРСР хмарочос-хмарочос (13 поверхів, 63 м). Унікальна конструкція: окремі корпуси, з'єднані переходами, використання скла та залізобетону. Символ радянського авангарду та індустріалізації.",
    imageUrl: "/images/architecture/contemporary/002.webp",
  },
  {
    id: 3,
    name_location: "Пам'ятник Тарасові Шевченку (Харків)",
    yearBuilt: "1935",
    style: "Соціалістичний реалізм, монументалізм",
    description: "Українська СРР | Один з найвідоміших пам'ятників Шевченку. Скульптор — Матвій Манізер. Бронзова постать поета на високому постаменті. Оточений алеями та сквером у центрі Харкова.",
    imageUrl: "/images/architecture/contemporary/003.webp",
  },
  {
    id: 4,
    name_location: "Будівля Верховної Ради УРСР (Київ)",
    yearBuilt: "1936–1939",
    style: "Неокласицизм (сталінський ампір)",
    description: "Українська СРР | Парламентський центр України. Монументальна споруда з колонами, портиком та скульптурним декором. Поєднання античних мотивів та радянської символіки.",
    imageUrl: "/images/architecture/contemporary/004.webp",
  },
  {
    id: 5,
    name_location: "Пам'ятник засновникам Києва (Кий, Щек, Хорив і їх сестра Либідь)",
    yearBuilt: "1982",
    style: "Соціалістичний реалізм, монументалізм",
    description: "Українська СРР | Скульптор — Василь Бородай. Розташований на березі Дніпра (Наводницький парк). Присвячений легендарним засновникам Києва. Бронзова композиція на високому постаменті, видно з Дніпра.",
    imageUrl: "/images/architecture/contemporary/005.webp",
  },
];