//export type QuestionType = 'SingleChoice' | 'MultipleChoice' | 'Matching';
//export type DifficultyOfQuestion = 'Easy' | 'Standard' | 'Hard'; // 
import type {QuestionType} from "../pages"
import type {DifficultyOfQuestion} from "../pages"

export interface AnswerOptionDto {
  id: number;
  text: string;
  isCorrect?: boolean;
  matchIndex?: number;
}

export interface CreateAnswerOptionDto {
  text: string;
  isCorrect?: boolean;
  matchIndex?: number;
}

export interface UpdateAnswerOptionDto extends CreateAnswerOptionDto {
  id: number;
}

export interface QuestionDto {
  id: number;
  text: string;
  imageUrl?: string;
  type: QuestionType;
  topicId: number;
  maxScore: number;
  difficulty: DifficultyOfQuestion;
  options: AnswerOptionDto[];
}

export interface CreateQuestionDto {
  text: string;
  imageUrl?: string;
  type: QuestionType;
  topicId: number;
  maxScore: number;
  difficulty: DifficultyOfQuestion;
  options: CreateAnswerOptionDto[];
}

export interface UpdateQuestionDto {
  id: number;
  text: string;
  imageUrl?: string;
  type: QuestionType;
  topicId: number;
  maxScore: number;
  difficulty: DifficultyOfQuestion;
  options: UpdateAnswerOptionDto[];
}
