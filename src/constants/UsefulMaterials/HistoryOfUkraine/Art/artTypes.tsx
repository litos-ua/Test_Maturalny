export interface Artwork {
  id: number;
  imageUrl: string;         // Шлях до зображення
  title: string;            // Назва твору
  author: string;           // Автор (якщо відомий)
  date: string;             // Дата створення
  style: string;            // Стиль, техніка
  description: string;      // Короткий опис / значення
}