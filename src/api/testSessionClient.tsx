
// import { get, post } from "./authClient";
// import type {
//   CreateTestSessionDto,
//   TestSessionDto,
//   TestEvaluationResultDto,
//   CompleteTestSessionRequest,
//   StartExamRequestDto,
//   RealTestSessionResult
// } from "../types";

// export const testSessionClient = {
//   async startSession(dto: CreateTestSessionDto): Promise<TestSessionDto> {
//     return await post<TestSessionDto>("/testsession/start", dto);
//   },

//   async startRealTest(dto: StartExamRequestDto): Promise<RealTestSessionResult> {
//     return await post<RealTestSessionResult>("/testsession/exam/start", dto);
//   },

//   async finishSession(sessionId: number, data: CompleteTestSessionRequest): Promise<TestEvaluationResultDto> {
//     return await post<TestEvaluationResultDto>(`/testsession/end/${sessionId}`, data);
//   },

//   async getSessionById(id: number): Promise<TestSessionDto> {
//     return await get<TestSessionDto>(`/testsession/${id}`);
//   },

//   async getSessionsByUserId(userId: number): Promise<TestSessionDto[]> {
//     return await get<TestSessionDto[]>(`/testsession/user/${userId}`);
//   },

//   async evaluateTest(sessionId: number): Promise<TestEvaluationResultDto> {
//     return await post<TestEvaluationResultDto>("/test-evaluation/evaluate", {
//       testSessionId: sessionId,
//     });
//   },
// };


import { get, post } from "./authClient";
import type {
  CreateTestSessionDto,
  TestSessionDto,
  TestEvaluationResultDto,
  CompleteTestSessionRequest,
  StartExamRequestDto,
  RealTestSessionResult
} from "../types";



export const testSessionClient = {
  async startSession(dto: CreateTestSessionDto): Promise<TestSessionDto> {
    try {
      const response = await post<TestSessionDto>("/testsession/start", dto);
      return response;
    } catch (error) {
      console.error("Ошибка при старте сессии:", error);
      throw error
    }
  },

  async startRealTest(dto: StartExamRequestDto): Promise<RealTestSessionResult> {
    try {
      return await post<RealTestSessionResult>("/testsession/exam/start", dto);
    } catch (error) {
      console.error("Ошибка при старте экзамена:", error);
      throw error
    }
  },

  async finishSession(
    sessionId: number, 
    data: CompleteTestSessionRequest
  ): Promise<TestEvaluationResultDto> {
    try {
      return await post<TestEvaluationResultDto>(
        `/testsession/end/${sessionId}`, 
        data
      );
    } catch (error) {
      console.error(`Ошибка при завершении сессии ${sessionId}:`, error);
      throw error
    }
  },

  async getSessionById(id: number): Promise<TestSessionDto> {
    try {
      return await get<TestSessionDto>(`/testsession/${id}`);
    } catch (error) {
      console.error(`Ошибка при получении сессии ${id}:`, error);
      throw error
    }
  },

  async getSessionsByUserId(userId: number): Promise<TestSessionDto[]> {
    try {
      const sessions = await get<TestSessionDto[]>(`/testsession/user/${userId}`);
      return sessions || []; // Защита от null/undefined
    } catch (error) {
      console.error(`Ошибка при получении сессий пользователя ${userId}:`, error);
      return []; // Fallback для UI
    }
  },

  async evaluateTest(sessionId: number): Promise<TestEvaluationResultDto> {
    try {
      return await post<TestEvaluationResultDto>("/test-evaluation/evaluate", {
        testSessionId: sessionId,
      });
    } catch (error) {
      console.error(`Ошибка при оценке сессии ${sessionId}:`, error);
      throw error
    }
  },
};