import {QuestionType} from '../pages'

export interface ProfileSessionDto {
  sessionId: number;
  userId: number;
  UserFullname: string;
  disciplineName: string;
  description?: string;
  startedAt: string;            
  endedAt?: string;
  duration: string;
  totalScore: number;
}


export interface ProfileSessionQuestionDetailDto {
    questionNumber: number; //порядковый номер вопроса
    questionText: string;           // содержание вопроса
    questionType: QuestionType;     // тип вопроса
    topicId: number;        // номер темы
    topicTitle: string      // наименование темы
    maxScore: number;       // максимальная оценка
    score: number;          // оценка по данному вопросу
}

export interface PaginatedProfileTestResult {
  sessionId: number;
  disciplineName: string;
  date: string;
  score: number;
  maxScore: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
} 

export interface ProfileTestResultDetails {
  sessionId: number;
  disciplineName: string;
  totalScore: number;
  maxScore: number;
  questions: {
    id: number;
    text: string;
    options: {
      text: string;
      isCorrect: boolean;
      isSelected: boolean;
    }[];
    score: number;
  }[];
}

