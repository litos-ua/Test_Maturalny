export interface AnswerOption {
  id: number;
  text: string;
  isCorrect: boolean;
  groupKey?: string;
  matchLabel?: string;
  explanation?: string;
}

export interface Question {
  id: number;
  text: string;
  imageUrl?: string;
  type: QuestionType; //Number
  maxScore: number;
  difficulty: number;
  topicId: number;
  options: AnswerOption[];
}

export const QuestionType = {
  SingleChoice: 0,
  MultipleChoice: 1,
  Matching: 2,
  DoubleChoice: 3,
  CorrectSequence: 4,
} as const;

export type QuestionType = typeof QuestionType[keyof typeof QuestionType];

export const DifficultyOfQuestion = {
  Easy: 0,
  Standard: 1,
  Difficult: 2,
} as const;

export type DifficultyOfQuestion = typeof DifficultyOfQuestion[keyof typeof DifficultyOfQuestion]

export interface QuestionResult {
  questionId: number;
  isCorrect: boolean;
  userAnswer: number[];
  correctAnswer: number[];
  score: number;
}

export interface TestResult {
  totalScore: number;
  maxTotalScore: number;
  results: QuestionResult[];
}

export interface FinishTestSessionDto {
  testSessionId: number;
  userAnswers: {
    questionId: number;
    selectedOptionIds: number[]; // пустой массив или null если не отвечен
    explanation?: string | null;
    submittedAt: string; // ISO строка
  }[];
}