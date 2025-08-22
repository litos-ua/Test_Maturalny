import { useTestAnswers } from "./useTestAnswers";
import { useTestAnswersReal } from "./useTestAnswersReal";
import type { Question } from "../types/pages/testpages/types";

export function useTestAnswersCombined(
  testType: string,
  questions: Question[],
  testSessionId: number | null,
  leftItemsMap: Record<number, { id: number; text: string }[]>,
  disciplineId?: string
) {
  if (testType === "real") {
    return useTestAnswersReal(questions, testSessionId, leftItemsMap);
  } else {
    return useTestAnswers(questions, disciplineId, leftItemsMap);
  }
}
