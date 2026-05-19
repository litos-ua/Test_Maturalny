import { get, post } from "./";
import type { ProfileSessionDto, ProfileSessionQuestionDetailDto, PagedResult } from "../types";

export const userProfileClient = {
  async getCompletedSessions(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<PagedResult<ProfileSessionDto>> {
    const url = `/statistics/user-session/${userId}?page=${page}&pageSize=${pageSize}`;
    return await get<PagedResult<ProfileSessionDto>>(url);
  },

  async getTestSessionResult(sessionId: number): Promise<ProfileSessionQuestionDetailDto[]> {
    try {
      const res = await get<ProfileSessionQuestionDetailDto[]>(
        `/statistics/user-session/evaluation_details/${sessionId}`
      );
      return res;
    } catch (error) {
      console.error(`Ошибка при получении результатов сессии ${sessionId}:`, error);
      throw error; 
    }
  },
};
