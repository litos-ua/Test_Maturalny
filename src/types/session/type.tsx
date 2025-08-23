import {QuestionType} from "../pages"

export const SessionEndReason = {
  CompletedByUser: 0,           // Пользователь сам завершил
  AbortedByUser: 1,             // Пользователь отменил вручную
  Timeout: 2,                   // Время вышло
  BrowserClosedOrCrashed: 3,    // Закрытие вкладки / сбой
} as const;

export type SessionEndReason = typeof SessionEndReason[keyof typeof SessionEndReason];

// ✅UI TestSessionDto
export interface TestSessionDto {
  id: number;
  userId: number;
  description?: string;
  startedAt: string;            
  endedAt?: string;
  timeLimitSeconds?: number;
  endReason?: SessionEndReason;
}

// ✅UI CreateTestSessionDto
export interface CreateTestSessionDto {
  userId: number;
  description?: string;
  timeLimitSeconds?: number;
}

// ✅UI QuestionResultDto
export interface QuestionResultDto {
  questionId: number;
  selectedOptionIds: number[];
  correctOptionIds: number[];
  isCorrect: boolean;
  score: number;
}

// ✅UI TestEvaluationResultDto
export interface TestEvaluationResultDto {
  testSessionId: number;
  totalScore: number;
  results: QuestionResultDto[];
}

// ✅UI
export interface CompleteTestSessionRequest {
  reason: number; // SessionEndReason enum value (например, 0 = CompletedByUser)
  answers: CreateUserAnswerDto[];
}

// ✅UI CreateUserAnswerDto
export interface CreateUserAnswerDto {
  questionId: number;
  selectedOptionIds: number[];
  submittedAt: string; // ISO string
  explanation?: string | null;
}


// 💡Server
export interface TestEvaluationResultDto {
  testSessionId: number;
  totalScore: number;
  maxTotalScore: number;
  results: QuestionResultDto[];
}

// 💡Server
export interface QuestionResultDto {
  questionId: number;
  selectedOptionIds: number[];
  correctOptionIds: number[];
  isCorrect: boolean;
  score: number;
}

// ✅UI
export interface TestResult {
  totalScore: number;
  results: QuestionResult[];
}

// ✅UI
export interface QuestionResult {
  questionId: number;
  isCorrect: boolean;
  score: number;
  userAnswer: string[];
  correctAnswer: string[];
}



// Real test session  ---------------
export interface RealTestSessionResult {
  sessionId: number;
  questions: QuestionDto[];
}

export interface QuestionDto {
  id: number;
  text: string;
  imageUrl?: string;
  type: QuestionType;
  options: AnswerOptionDto[];
}

export interface AnswerOptionDto {
  id: number;
  questionId: number;
  text: string;
  groupKey?: string;
  matchLabel?: string
}
//----------------------------------


//---Double-request------
export interface StartExamRequestDto {
  userId: number;
  disciplineId?: number;
  totalCount?: number;
  timeLimitSeconds: number;
  description?: string;
}

export interface RealTestSessionResult {
  sessionId: number;
  questions: QuestionDto[]
}