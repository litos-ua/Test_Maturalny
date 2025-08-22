// import { userProfileClient } from "../api/userProfileClient";
// import type { ProfileSessionDto, ProfileSessionQuestionDetailDto } from "../types";

// export const userProfileService = {
//   // Получить завершённые сессии пользователя с сортировкой (например, по дате)
//   async getCompletedSessions(userId: number): Promise<ProfileSessionDto[]> {
//     const sessions = await userProfileClient.getCompletedSessions(userId);
//     return sessions.sort(
//       (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
//     );
//   },

//   // Получить подробные результаты по конкретной сессии
//     async getSessionResults(sessionId: number): Promise<ProfileSessionQuestionDetailDto[]> {
//     return await userProfileClient.getTestSessionResult(sessionId);
//   },
// };


import { userProfileClient } from "../api/userProfileClient";
import type { ProfileSessionDto, ProfileSessionQuestionDetailDto, PagedResult } from "../types";

export const userProfileService = {
  /**
   * Получить завершённые сессии пользователя.
   * @param userId ID пользователя
   * @param page Номер страницы (опционально)
   * @param pageSize Размер страницы (опционально)
   * @returns Либо массив сессий (старый режим), либо объект PagedResult (новый режим)
   */
  async getCompletedSessions(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<PagedResult<ProfileSessionDto>> {
    const result = await userProfileClient.getCompletedSessions(userId, page, pageSize);

    // Сортировка (если нужно, но лучше делать на сервере)
    result.items = result.items.sort(
      (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    );

    return result;
  },

  // Получить подробные результаты по конкретной сессии
    async getSessionResults(sessionId: number): Promise<ProfileSessionQuestionDetailDto[]> {
    return await userProfileClient.getTestSessionResult(sessionId);
  },
};