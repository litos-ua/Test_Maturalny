import { QuestionType } from "../types";
import type { AnswerOption } from "../types"
import {DISCIPLINE_TEST_CONFIGS} from "../constants";
import type { DisciplineTestConfig, QuestionTypeConfig } from "../constants";

export const getDisciplineConfig = (disciplineId?: number | string): DisciplineTestConfig | undefined => {
  if (!disciplineId) return undefined;
  const id = typeof disciplineId === 'string' ? parseInt(disciplineId) : disciplineId;
  return DISCIPLINE_TEST_CONFIGS[id];
};

export const getQuestionTypeConfig = (
  disciplineId?: number | string,
  questionType?: QuestionType
): QuestionTypeConfig | undefined => {
  const config = getDisciplineConfig(disciplineId);
  if (!config || questionType === undefined) return undefined;
  return config.questionTypes[questionType];
};

export const getRequiredAnswerCount = (
  disciplineId: number | string | undefined,
  questionType: QuestionType,
  questionOptions?: AnswerOption[]
): number => {
  const config = getQuestionTypeConfig(disciplineId, questionType);
  if (config?.requiredAnswerCount !== undefined) {
    return config.requiredAnswerCount;
  }
  
  if (questionOptions) {
    switch (questionType) {
      case QuestionType.Matching:
        return questionOptions.filter(opt => opt.groupKey !== null).length;
      case QuestionType.CorrectSequence:
      case QuestionType.MultipleChoice:
        return questionOptions.filter(opt => opt.isCorrect).length;
      case QuestionType.DoubleChoice:
        return 2;
      default:
        return 1;
    }
  }
  
  return 1;
};

export const isPartialScoreAllowed = (
  disciplineId: number | string | undefined,
  questionType: QuestionType
): boolean => {
  const config = getQuestionTypeConfig(disciplineId, questionType);
  return config?.allowPartialScore ?? false;
};

export function getOpenAnswerRules(disciplineId?: number | string): {
  enabled: boolean;
  maxScore: number;
} {
  const config = getDisciplineConfig(disciplineId);
  if (!config) return { enabled: false, maxScore: 0 };
  
  const typeConfig = config.questionTypes[QuestionType.OpenAnswer];
  if (!typeConfig) return { enabled: false, maxScore: 0 };
  
  return {
    enabled: true,
    maxScore: typeConfig.defaultMaxScore || 2,
  };
}