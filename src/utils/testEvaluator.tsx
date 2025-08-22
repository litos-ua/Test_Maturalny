// бизнес-логика Matching:
// Если в правильном ответе для позиции есть пара, но пользователь выбрал -1 → Неправильно.
// Если в правильном ответе для позиции нет пары, и пользователь выбрал -1 → Правильно.
// Если в правильном ответе есть пара, и пользователь выбрал правильный id → Правильно.
// Если в правильном ответе есть пара, а пользователь выбрал другой id или -1 → Неправильно.


// import type { Question, TestResult, QuestionResult } from "../pages/TestSession/types";
// import { QuestionType } from "../pages/TestSession/types";

// export function calculateTestResults(
//   questions: Question[],
//   answers: Record<number, number[]>
// ): TestResult {
//   let totalScore = 0;

//   const results: QuestionResult[] = questions.map((q) => {  //Проходимся по каждому вопросу
//     const userAnswer = answers[q.id] || [];                 //Для каждого вопроса получаем ответ пользователя

//     const correctAnswer = q.options                         // Извлекаем правильные варианты для данного вопроса                    
//       .filter(opt => opt.isCorrect)
//       .map(opt => opt.id);

//     let isCorrect = false;
//     console.log(`Вопрос ${q.id}: user=${userAnswer} correct=${correctAnswer} isCorrect=${isCorrect}`);

//     if (q.type === QuestionType.SingleChoice || q.type === QuestionType.Matching) {   // Проверка по типу вопроса (числовые значения: условно 0=SingleChoice, 1=MultipleChoice, 2=Matching)
//       // Проверяем, совпадают ли полностью массивы. Для одиночного и сопоставления: ответы должны полностью совпадать
//       isCorrect =
//         userAnswer.length === correctAnswer.length &&
//         userAnswer.every((id, idx) => id === correctAnswer[idx]);
//     } else if (q.type === QuestionType.MultipleChoice) {
//       // Проверяем, совпадают ли полностью массивы. Для множественного выбора: все правильные выбраны, и нет лишних
//       isCorrect =
//         correctAnswer.every(id => userAnswer.includes(id)) &&
//         userAnswer.every(id => correctAnswer.includes(id));
//     }

//     const score = isCorrect ? q.maxScore : 0;           // Определяем начисленные баллы
//     totalScore += score;

//     return {
//       questionId: q.id,                                // Формируем результат по вопросу
//       isCorrect,
//       userAnswer,
//       correctAnswer,
//       score,
//     };
//   });

//   return { totalScore, results };                      // Возвращаем объект с итогами
// }

// import type { Question, TestResult, QuestionResult } from "../pages/TestSession/types";
// import { QuestionType } from "../pages/TestSession/types";

// export function calculateTestResults(
//   questions: Question[],
//   answers: Record<number, number[]>
// ): TestResult {
//   let totalScore = 0;

//   const results: QuestionResult[] = questions.map((q) => {  //Проходимся по каждому вопросу
//     const userAnswer = answers[q.id] || [];                 //Для каждого вопроса получаем ответ пользователя

//     const correctAnswer = q.options                         // Извлекаем правильные варианты для данного вопроса                    
//       .filter(opt => opt.isCorrect)
//       .map(opt => opt.id);

//     let isCorrect = false;
//     //console.log(`Вопрос ${q.id}: user=${userAnswer} correct=${correctAnswer} isCorrect=${isCorrect}`);

//     if (q.type === QuestionType.SingleChoice) {   // Проверка по типу вопроса (числовые значения: условно 0=SingleChoice, 1=MultipleChoice, 2=Matching)
//       // Проверяем, совпадают ли полностью массивы. Для одиночного и сопоставления: ответы должны полностью совпадать
//       isCorrect =
//         userAnswer.length === correctAnswer.length &&
//         userAnswer.every((id, idx) => id === correctAnswer[idx]);
//     } else if (q.type === QuestionType.MultipleChoice) {
//       // Проверяем, совпадают ли полностью массивы. Для множественного выбора: все правильные выбраны, и нет лишних
//       isCorrect =
//         correctAnswer.every(id => userAnswer.includes(id)) &&
//         userAnswer.every(id => correctAnswer.includes(id));
//     } else if (q.type === QuestionType.Matching) {
//         const correctOptions = q.options;
//         isCorrect = userAnswer.length === correctOptions.length && // Проверяем полное соответствие по позициям
//         correctOptions.every((opt, idx) => {
//         const userSelected = userAnswer[idx];
//             if (!opt.isCorrect) {
//                 // Если правильный вариант - отсутствует пара
//                 return userSelected === -1;
//             } else {
//                 // Если правильный вариант есть, сравниваем id
//                 return userSelected === opt.id;
//             }
//         });
//     }
    
//     const score = isCorrect ? q.maxScore : 0;           // Определяем начисленные баллы
//     totalScore += score;

//     return {
//       questionId: q.id,                                // Формируем результат по вопросу
//       isCorrect,
//       userAnswer,
//       correctAnswer,
//       score,
//     };
//   });

//   return { totalScore, results };                      // Возвращаем объект с итогами
// }

// ------------------------------------------------------------------------------------------------------------------------------



// Глючит левый и немного правый списки в матчинге
import type { Question, TestResult, QuestionResult } from "../types/pages/testpages/types";
import { QuestionType } from "../types/pages/testpages/types";


export function calculateTestResults(
  questions: Question[],
  answers: Record<number, number[]>,
  leftItemsMap: Record<number, { id: number; text: string; }[]>
): TestResult {
  let totalScore = 0;

  const results: QuestionResult[] = questions.map((q) => {                             //Проходимся по каждому вопросу
    const userAnswer = answers[q.id] || [];                                            //Для каждого вопроса получаем ответ пользователя
    const correctAnswer = q.options.filter(opt => opt.isCorrect).map(opt => opt.id);   // Извлекаем правильные варианты для данного вопроса 

    let isCorrect = false;
    let score = 0;
    // Проверка по типу вопроса (числовые значения: условно 0=SingleChoice, 1=MultipleChoice, 2=Matching)
    if (q.type === QuestionType.SingleChoice) {
      isCorrect =
        userAnswer.length === correctAnswer.length &&
        userAnswer.every((id, idx) => id === correctAnswer[idx]);
      score = isCorrect ? 1 : 0;                                                       // Проверяем, совпадают ли полностью массивы и ставим оценку


} else if (q.type === QuestionType.DoubleChoice) {
    // Получаем ID выбранных пользователем вариантов (уже числа)
    const userSelectedIds = userAnswer || [];
    
    // Получаем ID правильных вариантов (из свойства id, а не text)
    const correctOptionIds = q.options
        .filter(opt => opt.isCorrect)
        .map(opt => opt.id);

    // Проверяем количество ответов
    if (userSelectedIds.length !== 2) {
        isCorrect = false;
        score = 0;
    } else {
        // Считаем количество правильных ответов
        const numCorrect = userSelectedIds
            .filter(id => correctOptionIds.includes(id))
            .length;
        
        // Считаем количество неправильных ответов
        const numIncorrect = userSelectedIds
            .filter(id => !correctOptionIds.includes(id))
            .length;

        // Начисляем баллы согласно правилам НМТ
        if (numCorrect === 2 && numIncorrect === 0) {
            isCorrect = true;
            score = 2;
        } else if (numCorrect === 1 && numIncorrect === 1) {
            isCorrect = false;
            score = 0;
        } else {
            isCorrect = false;
            score = 0;
        }
    }

    } else if (q.type === QuestionType.MultipleChoice) {
            const numCorrect = correctAnswer.length;  // количество правильных вариантов в вопросе
            const numSelectedCorrect = correctAnswer.filter(id => userAnswer.includes(id)).length;    // сколько правильных вариантов выбрал пользователь
            const numSelectedIncorrect = userAnswer.filter(id => !correctAnswer.includes(id)).length;  // сколько пользователь выбрал ЛИШНИХ (неправильных) вариантов

            if (numSelectedCorrect === numCorrect && numSelectedIncorrect === 0) {
                isCorrect = true;
                score = 2;
            } else if (numSelectedCorrect === numCorrect && numSelectedIncorrect === 1) {
                isCorrect = false;
                score = 1;
            } else {
                isCorrect = false;
                score = 0;
            }

    } else if (q.type === QuestionType.Matching) {
      let matchScore = 0;
      const leftItems = leftItemsMap[q.id] || [];

      leftItems.forEach((leftOpt, idx) => {
        const selectedId = userAnswer[idx];

        if (selectedId === -1) return; // выбран X1, игнорируем

        if (selectedId === leftOpt.id) {
          matchScore += 1;
        }
      });

      score = Math.min(matchScore, 4);
      isCorrect = score === 4;


    } else if (q.type === QuestionType.CorrectSequence) {
        const userAnswers = userAnswer || [];
        const leftItems = leftItemsMap[q.id] || [];

        const correctAnswer = leftItems.map(item => {
          const opt = q.options.find(o => o.id === item.id);
          return opt ? Number(opt.matchLabel) : null;
        }).filter(v => v !== null);

        const hasAllAnswers = userAnswers.length === correctAnswer.length &&
                              userAnswers.every(v => v !== null && v !== undefined);

        const hasUniqueAnswers = new Set(userAnswers).size === userAnswers.length;

        console.log("User answers:", userAnswers);
        console.log("Correct answers:", correctAnswer);

        const isPerfectMatch = hasAllAnswers && hasUniqueAnswers &&
                              userAnswers.every((ans, idx) => ans === correctAnswer[idx]);

        const isFirstCorrect = userAnswers[0] === correctAnswer[0];
        const isLastCorrect = userAnswers[userAnswers.length - 1] === correctAnswer[correctAnswer.length - 1];

        if (isPerfectMatch) {
          isCorrect = true;
          score = 3;
          console.log("✅ Полное совпадение. Score = 3");
        } else if (isFirstCorrect && isLastCorrect) {
          isCorrect = false;
          score = 2;
          console.log("✔️ Совпали начало и конец. Score = 2");
        } else if (isFirstCorrect || isLastCorrect) {
          isCorrect = false;
          score = 1;
          console.log("✔️ Совпало только начало или конец. Score = 1");
        } else {
          isCorrect = false;
          score = 0;
          console.log("❌ Нет совпадений по краям. Score = 0");
        }
      }


    totalScore += score;


    return {
      questionId: q.id,
      isCorrect,
      userAnswer,
      correctAnswer,
      score,
    };
  });

  return { totalScore, results };
}


// --------------------------------------------------------------------------------------------------------------------


