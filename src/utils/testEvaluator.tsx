// бизнес-логика Matching:
// Если в правильном ответе для позиции есть пара, но пользователь выбрал -1 → Неправильно.
// Если в правильном ответе для позиции нет пары, и пользователь выбрал -1 → Правильно.
// Если в правильном ответе есть пара, и пользователь выбрал правильный id → Правильно.
// Если в правильном ответе есть пара, а пользователь выбрал другой id или -1 → Неправильно.


// // Глючит левый и немного правый списки в матчинге
// import type { Question, TestResult, QuestionResult } from "../types/pages/testpages/types";
// import { QuestionType } from "../types/pages/testpages/types";


// export function calculateTestResults(
//   questions: Question[],
//   answers: Record<number, number[]>,
//   leftItemsMap: Record<number, { id: number; text: string; }[]>
// ): TestResult {
//   let totalScore = 0;
//   let maxTotalScore =0;

//   const results: QuestionResult[] = questions.map((q) => {                             //Проходимся по каждому вопросу
//     const userAnswer = answers[q.id] || [];                                            //Для каждого вопроса получаем ответ пользователя
//     const correctAnswer = q.options.filter(opt => opt.isCorrect).map(opt => opt.id);   // Извлекаем правильные варианты для данного вопроса 

//     let isCorrect = false;
//     let score = 0;
//     // Проверка по типу вопроса (числовые значения: условно 0=SingleChoice, 1=MultipleChoice, 2=Matching)
//     if (q.type === QuestionType.SingleChoice) {
//       isCorrect =
//         userAnswer.length === correctAnswer.length &&
//         userAnswer.every((id, idx) => id === correctAnswer[idx]);
//       score = isCorrect ? 1 : 0;                                                       // Проверяем, совпадают ли полностью массивы и ставим оценку


// } else if (q.type === QuestionType.DoubleChoice) {
//     // Получаем ID выбранных пользователем вариантов (уже числа)
//     const userSelectedIds = userAnswer || [];
    
//     // Получаем ID правильных вариантов (из свойства id, а не text)
//     const correctOptionIds = q.options
//         .filter(opt => opt.isCorrect)
//         .map(opt => opt.id);

//     // Проверяем количество ответов
//     if (userSelectedIds.length !== 2) {
//         isCorrect = false;
//         score = 0;
//     } else {
//         // Считаем количество правильных ответов
//         const numCorrect = userSelectedIds
//             .filter(id => correctOptionIds.includes(id))
//             .length;
        
//         // Считаем количество неправильных ответов
//         const numIncorrect = userSelectedIds
//             .filter(id => !correctOptionIds.includes(id))
//             .length;

//         // Начисляем баллы согласно правилам НМТ
//         if (numCorrect === 2 && numIncorrect === 0) {
//             isCorrect = true;
//             score = 2;
//         } else if (numCorrect === 1 && numIncorrect === 1) {
//             isCorrect = false;
//             score = 0;
//         } else {
//             isCorrect = false;
//             score = 0;
//         }
//     }

//     // // Если опций выбрано меньше трех, то результат всегда равен 0 баллов
//     // } else if (q.type === QuestionType.MultipleChoice) {
//     // const numCorrect = correctAnswer.length;  // количество правильных вариантов
//     // const uniqueUserAnswers = Array.from(new Set(userAnswer)); // убираем дубли

//     // // Проверка на дубликаты или неправильное количество выбранных ответов
//     // if (uniqueUserAnswers.length !== userAnswer.length || userAnswer.length !== numCorrect) {
//     //     isCorrect = false;
//     //     score = 0;
//     // } else {
//     //     // Подсчёт количества правильных ответов
//     //     const numSelectedCorrect = uniqueUserAnswers.filter(id => correctAnswer.includes(id)).length;
//     //     score = numSelectedCorrect;                     // 1 балл за каждый правильно выбранный вариант
//     //     isCorrect = score === numCorrect;               // если все совпали — ответ полностью верный
//     // }

//     // Если опций выбрано меньше трех, то правильные баллы учитываюся

//     } else if (q.type === QuestionType.MultipleChoice) {
//     const numCorrect = correctAnswer.length;
//     const uniqueUserAnswers = Array.from(new Set(userAnswer));
    
//     // Перевірка ТІЛЬКИ на дублікати
//     if (uniqueUserAnswers.length !== userAnswer.length) {
//         isCorrect = false;
//         score = 0;
//     } else {
//         // Підрахунок правильних відповідей
//         const numSelectedCorrect = uniqueUserAnswers.filter(id => correctAnswer.includes(id)).length;
//         score = numSelectedCorrect;  // 1 бал за кожен правильний варіант
//         isCorrect = (score === numCorrect);
//     }


//     } else if (q.type === QuestionType.Matching) {
//       let matchScore = 0;
//       const leftItems = leftItemsMap[q.id] || [];

//       leftItems.forEach((leftOpt, idx) => {
//         const selectedId = userAnswer[idx];

//         if (selectedId === -1) return; // выбран X1, игнорируем

//         if (selectedId === leftOpt.id) {
//           matchScore += 1;
//         }
//       });

//       score = Math.min(matchScore, 4);
//       isCorrect = score === 4;


//     } else if (q.type === QuestionType.CorrectSequence) {
//         const userAnswers = userAnswer || [];
//         const leftItems = leftItemsMap[q.id] || [];

//         const correctAnswer = leftItems.map(item => {
//           const opt = q.options.find(o => o.id === item.id);
//           return opt ? Number(opt.matchLabel) : null;
//         }).filter(v => v !== null);

//         const hasAllAnswers = userAnswers.length === correctAnswer.length &&
//                               userAnswers.every(v => v !== null && v !== undefined);

//         const hasUniqueAnswers = new Set(userAnswers).size === userAnswers.length;

//         const isPerfectMatch = hasAllAnswers && hasUniqueAnswers &&
//                               userAnswers.every((ans, idx) => ans === correctAnswer[idx]);

//         const isFirstCorrect = userAnswers[0] === correctAnswer[0];
//         const isLastCorrect = userAnswers[userAnswers.length - 1] === correctAnswer[correctAnswer.length - 1];

//         if (isPerfectMatch) {
//           isCorrect = true;
//           score = 3;
//           console.log("✅ Полное совпадение. Score = 3");
//         } else if (isFirstCorrect && isLastCorrect) {
//           isCorrect = false;
//           score = 2;
//           //console.log("✔️ Совпали начало и конец. Score = 2");
//         } else if (isFirstCorrect || isLastCorrect) {
//           isCorrect = false;
//           score = 1;
//           //console.log("✔️ Совпало только начало или конец. Score = 1");
//         } else {
//           isCorrect = false;
//           score = 0;
//           //console.log("❌ Нет совпадений по краям. Score = 0");
//         }
//       }


//     totalScore += score;
//     maxTotalScore += q.maxScore;


//     return {
//       questionId: q.id,
//       isCorrect,
//       userAnswer,
//       correctAnswer,
//       score,
//     };
//   });
//   //console.log (`MaxEvaliableScore ${maxTotalScore}`);
//   return { totalScore, maxTotalScore, results };
// }


// --------------------------------------------------------------------------------------------------------------------


// Используем параметры константы для количества опций в зависимости от выбранной дисциплины
import type { Question, TestResult, QuestionResult } from "../types/pages/testpages/types";
import { QuestionType } from "../types/pages/testpages/types";
import { getDisciplineConfig, isPartialScoreAllowed, getRequiredAnswerCount, getOpenAnswerRules } from "./testConfigHelpers";

export function calculateTestResults(
  questions: Question[],
  answers: Record<number, number[]>,
  leftItemsMap: Record<number, { id: number; text: string; }[]>,
  disciplineId?: number | string
): TestResult {
  let totalScore = 0;
  let maxTotalScore = 0;

  const results: QuestionResult[] = questions.map((q) => {
    const userAnswer = answers[q.id] || [];
    const correctAnswer = q.options.filter(opt => opt.isCorrect).map(opt => opt.id);
    
    // Отримуємо необхідну кількість відповідей з конфігурації
    const requiredCount = getRequiredAnswerCount(disciplineId, q.type, q.options);

    let isCorrect = false;
    let score = 0;

    switch (q.type) {
      case QuestionType.SingleChoice:
        isCorrect = userAnswer.length === requiredCount && correctAnswer.includes(userAnswer[0]);
        score = isCorrect ? q.maxScore : 0;
        break;

      case QuestionType.DoubleChoice:
        if (userAnswer.length !== requiredCount) {
          isCorrect = false;
          score = 0;
        } else {
          const numCorrect = userAnswer.filter(id => correctAnswer.includes(id)).length;
          isCorrect = (numCorrect === requiredCount);
          score = isCorrect ? q.maxScore : 0;
        }
        break;

      case QuestionType.MultipleChoice:
        const uniqueUserAnswers = Array.from(new Set(userAnswer));
        const hasDuplicates = uniqueUserAnswers.length !== userAnswer.length;

        if (hasDuplicates) {
          isCorrect = false;
          score = 0;
        } else {
          const numSelectedCorrect = uniqueUserAnswers.filter(id => correctAnswer.includes(id)).length;
          const allowPartial = isPartialScoreAllowed(disciplineId, QuestionType.MultipleChoice);
          
          if (allowPartial) {
            // Часткові бали: 1 бал за кожен правильний варіант (але не більше maxScore)
            score = Math.min(numSelectedCorrect, q.maxScore);
            isCorrect = (score === q.maxScore);
          } else {
            // Тільки повністю правильно
            const isPerfect = numSelectedCorrect === requiredCount && 
                              userAnswer.length === requiredCount;
            score = isPerfect ? q.maxScore : 0;
            isCorrect = isPerfect;
          }
        }
        break;

      case QuestionType.Matching:
        let matchScore = 0;
        const leftItemsMatching = leftItemsMap[q.id] || [];

        leftItemsMatching.forEach((leftOpt, idx) => {
          const selectedId = userAnswer[idx];
          const isMatch = selectedId === leftOpt.id; //Константа только для тестирования
          console.log(`  [${idx}] leftOpt.id=${leftOpt.id}, selectedId=${selectedId}, isMatch=${isMatch}`);
          if (selectedId === -1) return; // выбран X1, игнорируем

          if (selectedId === leftOpt.id) {
            matchScore += 1;
          }
        });
        console.log('  matchScore:', matchScore);

        const allowPartialMatching = isPartialScoreAllowed(disciplineId, QuestionType.Matching);
        
        // Отримуємо реальну кількість правильних пар
        const correctPairsCount = q.options.filter(o => 
          o.matchLabel !== null && 
          o.matchLabel !== undefined && 
          o.matchLabel !== ""
        ).length;
        // Для 3 з 5: correctPairsCount = 3
        // Для 4 з 5: correctPairsCount = 4

        // 🔑 Використовуємо її замість фіксованих чисел
        if (allowPartialMatching) {
          score = Math.min(matchScore, q.maxScore);
          isCorrect = (matchScore === correctPairsCount);  // ← замість leftItemsMatching.length - 1
        } else {
          const allPairsMatched = (matchScore === correctPairsCount);  // ← замість leftItemsMatching.length
          score = allPairsMatched ? q.maxScore : 0;
          isCorrect = allPairsMatched;
        }
        break;


        // Правила НМТ для часткових балів:
        // - 3 бали: повна послідовність
        // - 2 бали: правильно вказані перша І остання події
        // - 1 бал: правильно вказана або перша, або остання подія
        // - 0 балів: інші випадки
      case QuestionType.CorrectSequence:
        const leftItems = leftItemsMap[q.id] || [];
        
        // Отримуємо правильну послідовність позицій у порядку UI
        const correctSequence = leftItems.map(item => {
          const opt = q.options.find(o => o.id === item.id);
          return opt ? Number(opt.matchLabel) : null;
        }).filter(v => v !== null);
        
        // Перевірка повної відповідності
        const isPerfectMatch = userAnswer.length === correctSequence.length &&
                              userAnswer.every((val, idx) => val === correctSequence[idx]);
        
        // ВИЗНАЧАЄМО, ЯКА ОПЦІЯ Є ПЕРШОЮ (matchLabel = 1) ТА ОСТАННЬОЮ (matchLabel = max)
        const maxLabel = Math.max(...correctSequence);
        
        // Знаходимо індекси (позиції в UI), де знаходяться перша та остання події
        let firstEventIndex = -1;
        let lastEventIndex = -1;
        
        leftItems.forEach((item, idx) => {
          const opt = q.options.find(o => o.id === item.id);
          const matchLabel = opt ? Number(opt.matchLabel) : null;
          if (matchLabel === 1) firstEventIndex = idx;
          if (matchLabel === maxLabel) lastEventIndex = idx;
        });
        
        // Перевіряємо, чи правильно користувач визначив позиції для першої та останньої подій
        const isFirstCorrect = firstEventIndex !== -1 && userAnswer[firstEventIndex] === 1;
        const isLastCorrect = lastEventIndex !== -1 && userAnswer[lastEventIndex] === maxLabel;      
        const allowPartialSequence = isPartialScoreAllowed(disciplineId, QuestionType.CorrectSequence);
        
        if (allowPartialSequence) {
          if (isPerfectMatch) {
            score = 3;
            isCorrect = true;
          } 
          else if (isFirstCorrect && isLastCorrect) {
            score = 2;
            isCorrect = false;
          } 
          else if (isFirstCorrect || isLastCorrect) {
            score = 1;
            isCorrect = false;
          } 
          else {
            score = 0;
            isCorrect = false;
          }
        } else {
          score = isPerfectMatch ? q.maxScore : 0;
          isCorrect = isPerfectMatch;
      }
      break;

      // НОВАЯ ЛОГИКА открытых вопросов (возможно несколько ответов)
      case QuestionType.OpenAnswer:
        // Отримуємо відповіді (можуть бути як числа, так і рядки)
        const rawAnswers = Array.isArray(userAnswer) ? userAnswer : [];
        const correctOptions = q.options.filter(o => o.isCorrect === true);
        
        if (correctOptions.length === 0) {
          score = 0;
          isCorrect = false;
          break;
        }

        const openAnswerRules = getOpenAnswerRules(disciplineId);
        
        if (!openAnswerRules.enabled) {
          score = 0;
          isCorrect = false;
          break;
        }

        // 🔑 Підраховуємо правильні відповіді
        let correctCount = 0;
        
        correctOptions.forEach((opt, index) => {
          // 🔑 Беремо значення з масиву (може бути рядок або число)
          const rawValue = rawAnswers[index];
          
          // 🔑 Перетворюємо на число (якщо це рядок)
          const userValue = typeof rawValue === 'string' 
            ? parseFloat(rawValue) 
            : (typeof rawValue === 'number' ? rawValue : NaN);
          
          const correctValue = parseFloat(opt.text);
          
          // Перевіряємо, чи обидва значення є числами і чи вони рівні
          if (!isNaN(userValue) && !isNaN(correctValue) && userValue === correctValue) {
            correctCount++;
          }
        });

        const totalCorrect = correctOptions.length;

        // 2 бали за кожну правильну відповідь
        const scorePerAnswer = 2;
        const calculatedScore = correctCount * scorePerAnswer;

        // Максимальний бал: мінімум з q.maxScore та totalCorrect * 2
        const maxPossibleScore = q.maxScore || (totalCorrect * scorePerAnswer);

        // Оцінка: не більше q.maxScore
        score = Math.min(calculatedScore, maxPossibleScore);
        isCorrect = (correctCount === totalCorrect);
        break;

      default:
        console.warn(`Unknown question type: ${q.type}`);
        score = 0;
        isCorrect = false;
    }

    totalScore += score;
    maxTotalScore += q.maxScore;

    return {
      questionId: q.id,
      isCorrect,
      userAnswer,
      correctAnswer,
      score,
    };
  });

  return { totalScore, maxTotalScore, results };
}

