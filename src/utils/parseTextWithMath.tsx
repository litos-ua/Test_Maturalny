import { MathFormula } from "../components";

export const parseTextWithMath = (text: string): React.ReactNode => {
  if (!text) return text;
  
  // Додаємо перевірку: якщо немає зворотних лапок - повертаємо як є
  if (!text.includes('`')) {
    return <span>{text}</span>;
  }
  
  const parts = text.split(/`(.*?)`/g);
  
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      // Це формула (між ` `)
      return <MathFormula key={index} formula={part} />;
    }
    // Обгортаємо звичайний текст у span для збереження пробілів
    return <span key={index}>{part}</span>;
  });
};

