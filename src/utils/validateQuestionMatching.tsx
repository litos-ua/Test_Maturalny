// export function validateQuestionMatching(matches: Record<number, number>): string | null {
//   const selectedValues = Object.values(matches);

//   // Проверка на незаполненные Select
//   if (selectedValues.some(v => v === undefined || v === null || v <= 0 || isNaN(v))) {
//   return "Будь ласка, оберіть відповідь для кожного елементу.";
// }

//   // Проверка на повторения
//   const uniqueValues = new Set(selectedValues);
//   if (uniqueValues.size !== selectedValues.length) {
//     return "Вибрані значення не можуть повторюватися. Перевірте свої відповіді.";
//   }

//   return null; // Нет ошибок
// }

export function validateQuestionMatching(matches: number[], expectedCount: number): string | null {
  // Проверка: выбраны ли все значения
  if (matches.length < expectedCount) {
    return "Будь ласка, оберіть відповідь для кожного елементу.";
  }

  //if (matches.some(v => v === undefined || v === null || v <= 0 || isNaN(v))) {
  if (matches.some(v => v === undefined || v === null || v === 0 || v < -1 || isNaN(v))) {
    return "Будь ласка, оберіть відповідь для кожного елементу.";
  }

  // Проверка на повторения
  const uniqueValues = new Set(matches);
  if (uniqueValues.size !== matches.length) {
    return "Вибрані значення не можуть повторюватися. Перевірте свої відповіді.";
  }

  return null;
}
