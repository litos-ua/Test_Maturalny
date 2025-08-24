
import { useState } from "react";
import { storage } from "../utils/storage";
import { calculateTestResults } from "../utils";
import type { Question, TestResult } from "../types/pages/testpages/types";

const ANSWERS_KEY = "test_answers";

export function useTestAnswers(
  questions: Question[], 
  disciplineId: string | undefined,
  leftItemsMap: Record<number, { id: number; text: string }[]>  
) {
  const [answers, setAnswers] = useState<Record<number, number[]>>(() => {
    return storage.get<Record<number, number[]>>(ANSWERS_KEY) || {};
  });

  const saveAnswer = (questionId: number, optionIds: number[]) => {
    const updated = { ...answers, [questionId]: optionIds };
    setAnswers(updated);
    storage.set(ANSWERS_KEY, updated);
  };

  const clearAnswers = () => {
    storage.remove(ANSWERS_KEY);
    setAnswers({});
  };

  
  const calculateResults = (): TestResult => {
  return calculateTestResults(questions, answers, leftItemsMap);
};


  const sendResultsToServer = async (result: TestResult): Promise<void> => {
    console.log("Отправка данных на сервер (заглушка):", {
      disciplineId,
      answers,
      result,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const finishAndSendResults = async (): Promise<TestResult> => {
    const result = calculateResults(); //Возвращает локальный result (не результат сервера!).
    return result;
  };



  return {
    answers,
    saveAnswer,
    clearAnswers,
    calculateResults,
    finishAndSendResults,
    sendResultsToServer,
  };
}
