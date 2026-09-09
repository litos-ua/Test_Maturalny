import { QuestionType } from "../types";

export interface QuestionTypeConfig {
  requiredAnswerCount?: number;      // обов'язкова кількість відповідей (для Matching, CorrectSequence)
  allowPartialScore?: boolean;       // чи дозволені часткові бали
  defaultMaxScore?: number;          // максимальний бал за замовчуванням (якщо не вказано в питанні)
}

export interface DisciplineTestConfig {
  disciplineId: number;
  disciplineName: string;
  questionTypes: Partial<Record<QuestionType, QuestionTypeConfig>>;
}

// Конфігурація для кожної дисципліни
export const DISCIPLINE_TEST_CONFIGS: Record<number, DisciplineTestConfig> = {
  // ========== 1. Історія України (НМТ) ==========
  1: {
    disciplineId: 1,
    disciplineName: "Історія України",
    questionTypes: {
      [QuestionType.SingleChoice]: {
        requiredAnswerCount: 1,
        allowPartialScore: false,
        defaultMaxScore: 1,
      },
      [QuestionType.MultipleChoice]: {
        requiredAnswerCount: 3,        // 3 правильні з 7
        allowPartialScore: true,       // 1 бал за кожну правильну
        defaultMaxScore: 3,
      },
      [QuestionType.Matching]: {
        requiredAnswerCount: 5,        // 5 пар тільки 4 правильні
        allowPartialScore: true,      
        defaultMaxScore: 3,
      },
      [QuestionType.DoubleChoice]: {
        requiredAnswerCount: 2,
        allowPartialScore: false,
        defaultMaxScore: 2,
      },
      [QuestionType.CorrectSequence]: {
        requiredAnswerCount: 4,        // 4 події
        allowPartialScore: true,      
        defaultMaxScore: 3,
      },
    },
  },

  // ========== 2. Математика ==========
  2: {
    disciplineId: 2,
    disciplineName: "Математика",
    questionTypes: {
      [QuestionType.SingleChoice]: {
        requiredAnswerCount: 1,
        allowPartialScore: false,
        defaultMaxScore: 1,
      },
      [QuestionType.MultipleChoice]: {
        requiredAnswerCount: 2,        // наприклад, 2 правильні з 5
        allowPartialScore: true,
        defaultMaxScore: 2,
      },
      [QuestionType.Matching]: {       // 5 пар тільки 4 правильні
        requiredAnswerCount: 5,
        allowPartialScore: true,
        defaultMaxScore: 3,
      },
      [QuestionType.CorrectSequence]: {
        requiredAnswerCount: 3,
        allowPartialScore: true,
        defaultMaxScore: 2,
      },
      [QuestionType.OpenAnswer]: {
        requiredAnswerCount: 1,        
        defaultMaxScore: 2,
        allowPartialScore: false,           
      },
    },
  },

  // ========== 3. Інформатика (приклад) ==========
  3: {
    disciplineId: 3,
    disciplineName: "Інформатика",
    questionTypes: {
      [QuestionType.SingleChoice]: {
        requiredAnswerCount: 1,
        allowPartialScore: false,
        defaultMaxScore: 1,
      },
      [QuestionType.MultipleChoice]: {
        requiredAnswerCount: 2,
        allowPartialScore: false,      // інформатика: тільки повністю правильно
        defaultMaxScore: 2,
      },
    },
  },

  // ========== 4. Фізика (приклад) ==========
  4: {
    disciplineId: 4,
    disciplineName: "Фізика",
    questionTypes: {
      [QuestionType.SingleChoice]: {
        requiredAnswerCount: 1,
        allowPartialScore: false,
        defaultMaxScore: 1,
      },
      [QuestionType.MultipleChoice]: {
        requiredAnswerCount: 2,        // наприклад, 2 правильні з 5
        allowPartialScore: true,
        defaultMaxScore: 2,
      },
      [QuestionType.Matching]: {       // 5 пар тільки 4 правильні
        requiredAnswerCount: 5,
        allowPartialScore: true,
        defaultMaxScore: 3,
      },
      [QuestionType.CorrectSequence]: {
        requiredAnswerCount: 3,
        allowPartialScore: true,
        defaultMaxScore: 2,
      },
      [QuestionType.OpenAnswer]: {
        requiredAnswerCount: 1,        
        defaultMaxScore: 2,
        allowPartialScore: false,           
      },
    },
  },
};
