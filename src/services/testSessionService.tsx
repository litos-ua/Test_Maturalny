import { testSessionClient } from "../api/testSessionClient";
import type {
  CreateTestSessionDto,
  TestSessionDto,
  TestEvaluationResultDto,
  CompleteTestSessionRequest,
  StartExamRequestDto,
  RealTestSessionResult
} from "../types";

export const testSessionService = {
  async startSession(data: CreateTestSessionDto): Promise<TestSessionDto> {
    return await testSessionClient.startSession(data);
  },

  async startRealTest(data: StartExamRequestDto): Promise<RealTestSessionResult> {
    return await testSessionClient.startRealTest(data);
  },

  async finishSession(
    sessionId: number,
    userAnswers: {
      questionId: number;
      selectedOptionIds: number[];
      submittedAt: string;
      explanation?: string | null;
    }[]
  ): Promise<TestEvaluationResultDto> {
    const dto: CompleteTestSessionRequest = {
      reason: 0, 
      answers: userAnswers,
    };

    return await testSessionClient.finishSession(sessionId, dto);
  },

  async getSessionById(id: number): Promise<TestSessionDto> {
    return await testSessionClient.getSessionById(id);
  },

  async getSessionsByUserId(userId: number): Promise<TestSessionDto[]> {
    return await testSessionClient.getSessionsByUserId(userId);
  },

  async evaluateTest(sessionId: number): Promise<TestEvaluationResultDto> {
    return await testSessionClient.evaluateTest(sessionId);
  },
};
