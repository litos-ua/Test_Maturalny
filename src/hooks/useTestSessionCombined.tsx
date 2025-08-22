import {useTestSession, useTestSessionReal} from "./";
import { testSessionParameters } from "../constants";

export function useTestSessionCombined(
  testType: string,
  userId?: number,
  disciplineId?: number
) {
  if (testType === "real") {
    return useTestSessionReal(
      userId ?? 0,
      disciplineId ?? 0,
      "Описание реальной сессии",
      testSessionParameters.totalCount
    );
  } else {
    return useTestSession(disciplineId?.toString() ?? "2");
  }
}

