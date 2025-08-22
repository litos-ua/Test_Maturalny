
// import { get, post } from "./authClient";
// import type { ProfileSessionDto, ProfileSessionQuestionDetailDto } from "../types";

// export const userProfileClient = {
//   async getCompletedSessions(userId: number): Promise<ProfileSessionDto[]> {
//     try {
//       const data = await get<ProfileSessionDto[]>(`/statistics/user-session/${userId}`);

//       if (!Array.isArray(data)) {
//         console.warn("Ожидался массив, но получено:", data);
//         return [];
//       }

//       return data.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
//     } catch (error) {
//       console.error("Ошибка при получении сессий:", error);
//       return []; // Возвращаем пустой массив как fallback
//     }
//   },

//   async getTestSessionResult(sessionId: number): Promise<ProfileSessionQuestionDetailDto[]> {
//     try {
//       const res = await get<ProfileSessionQuestionDetailDto[]>(
//         `/statistics/user-session/evaluation_details/${sessionId}`
//       );
//       return res;
//     } catch (error) {
//       console.error(`Ошибка при получении результатов сессии ${sessionId}:`, error);
//       throw error; 
//     }
//   },
// };


import { get, post } from "./authClient";
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
