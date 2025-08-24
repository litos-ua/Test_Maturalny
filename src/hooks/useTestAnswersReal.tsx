import { useState } from "react";
import { testSessionService } from "../services";
import { calculateTestResults } from "../utils";
import type { Question, QuestionType, TestResult, TestEvaluationResultDto } from "../types"; 

export function useTestAnswersReal(
  questions: Question[],
  testSessionId: number | null,
  leftItemsMap: Record<number, { id: number; text: string }[]>
) {
  const [answers, setAnswers] = useState<Record<number, number[]>>({});

  const saveAnswer = (questionId: number, optionIds: number[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIds }));//
  };

  const clearAnswers = () => {
    setAnswers({});
  };

  const calculateResults = (): TestResult => {
    // Функция расчета результатов
    return calculateTestResults(questions, answers, leftItemsMap);
  };

const finishAndSendResults = async (): Promise<TestResult | null> => {
  if (!testSessionId) {
    console.error("Test session ID is missing");
    return null;
  }

  function mapEvaluationResultToTestResult(serverResult: TestEvaluationResultDto): TestResult {
  return {
    totalScore: serverResult.totalScore,
    maxTotalScore: serverResult.maxTotalScore,
    results: serverResult.results.map(r => ({
      questionId: r.questionId,
      isCorrect: r.isCorrect,
      score: r.score,
      userAnswer: r.selectedOptionIds,
      correctAnswer: r.correctOptionIds,
    })),
  };
}
  
  // фильтруем невалидные значения ответов на вопросы

const userAnswers = questions.map(q => {
  const original = answers[q.id] ?? [];

  let selectedOptionIds;

  
  if (q.type === 2) {
  // Matching: приводим массив к длине 5 и заменяем невалидные значения на 0
  const expectedLength = Array.isArray(q.options) ? q.options.length : 0;
  selectedOptionIds = [...Array(expectedLength)].map((_, i) => {
    const exists = Object.prototype.hasOwnProperty.call(original, i);
    const v = exists ? original[i] : undefined;
    return typeof v === "number" && Number.isInteger(v) && !isNaN(v) ? v : 0;
  });
  } else {
    // Остальные типы: фильтруем допустимые значения
    selectedOptionIds = (original ?? []).filter(
      (v): v is number => typeof v === "number" && Number.isInteger(v) && !isNaN(v)
    );
  }

  return {
    questionId: q.id,
    selectedOptionIds,
    submittedAt: new Date().toISOString(),
    explanation: null,
    testSessionId: testSessionId,
  };
});
    

  try {
    const response = await testSessionService.finishSession(testSessionId, userAnswers);
    console.log("Сессия завершена. Результат от сервера:", response);

    const mappedResult = mapEvaluationResultToTestResult(response);
    console.log("Mapped Result for UI:", mappedResult);

    return mappedResult;
   // ✅ Возвращаем результат с сервера вместо локального result
  } catch (error) {
    console.error("Ошибка при завершении сессии:", error);
    return null;
  }
};


  return {
    answers,
    saveAnswer,
    clearAnswers,
    calculateResults,
    finishAndSendResults,
  };
}

