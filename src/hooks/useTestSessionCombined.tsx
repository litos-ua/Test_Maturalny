// import {useTestSession, useTestSessionReal} from "./";
// import { testSessionParameters } from "../constants";

// export function useTestSessionCombined(
//   testType: string,
//   userId?: number,
//   disciplineId?: number
// ) {
//   if (testType === "real") {
//     return useTestSessionReal(
//       userId ?? 0,
//       disciplineId ?? 0,
//       "Описание реальной сессии",
//       testSessionParameters.totalCount
//     );
//   } else {
//     return useTestSession(disciplineId?.toString() ?? "2");
//   }
// }

// Добавляем обработку теста по темам
import { useTestSession, useTestSessionReal } from "./";
import { testSessionParameters } from "../constants";

export function useTestSessionCombined(
  testType: string,
  userId?: number,
  disciplineId?: number,
  topicId?: number  
) {

  if (testType === "real") {
    // 🔹 Реальный тест НЕ МЕНЯЕТСЯ (всегда по дисциплине)
    return useTestSessionReal(
      userId ?? 0,
      disciplineId ?? 0,
      "Описание реальной сессии",
      testSessionParameters.totalCount
    );
  } else {
    // 🔹 Учебный тест: передаем topicId если есть, иначе disciplineId
    return useTestSession(
      disciplineId?.toString(),  // disciplineId (может быть undefined)
      topicId                    // topicId (НОВОЕ, опционально)
    );
  }
}