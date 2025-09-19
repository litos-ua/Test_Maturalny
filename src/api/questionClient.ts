import axios from "axios";
import { configObj } from "../constants";
import type { RealTestSessionResult } from "../types"; 

const baseURL = configObj.axiosUrl + "Questions";

const httpQuestionClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    throw error.response.data;
  } else {
    throw new Error("Unknown Error");
  }
};

// 1. Получить все вопросы
export const fetchQuestions = async () => {
  try {
    const response = await httpQuestionClient.get("");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 2. Получить вопрос по ID
export const getQuestionById = async (id: number) => {
  try {
    const response = await httpQuestionClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 3. Получить все вопросы по дисциплине
export const getQuestionsByDiscipline = async (disciplineId: number) => {
  try {
    const response = await httpQuestionClient.get(`/by-discipline/${disciplineId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 4. Получить Explanation по ID вопроса
export const getExplanationByQuestionId = async (id: number) => {
  try {
    const response = await httpQuestionClient.get(`/${id}/explanation`);
    return response.data; // { QuestionId, Explanation }
  } catch (error) {
    handleError(error);
  }
};


// 5. Получить все вопросы по теме
export const getQuestionsByTopic = async (topicId: number) => {
  try {
    const response = await httpQuestionClient.get(`/by-topic/${topicId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 6. Создать новый вопрос
export const createQuestion = async (data: any) => {
  try {
    const response = await httpQuestionClient.post("/", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 7. Обновить вопрос
export const updateQuestion = async (id: number, data: any) => {
  try {
    const response = await httpQuestionClient.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 8. Удалить вопрос
export const deleteQuestion = async (id: number) => {
  try {
    const response = await httpQuestionClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 9. Получить N случайных вопросов по теме
export const getRandomQuestionsByTopic = async (topicId: number, count: number) => {
  try {
    const allQuestions = await getQuestionsByTopic(topicId);
    //console.log (`NumberOfQuestions ${allQuestions}`);
    const totalQuestions = allQuestions.length;

    // если запрашиваемое количество превышает общее – заменяем
    if (count > totalQuestions) {
      count = totalQuestions;
    }

    // получаем N случайных вопросов
    const response = await httpQuestionClient.get(`/random/by-topic/${topicId}/${count}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 10. Получить по countPerTopic случайных вопросов из каждой темы дисциплины
export const getRandomQuestionsGroupedByDiscipline = async (disciplineId: number, countPerTopic: number) => {
  try {
    const response = await httpQuestionClient.get(`/random/by-discipline/grouped/${disciplineId}/${countPerTopic}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 11. Получить totalCount случайных вопросов по всей дисциплине
export const getRandomQuestionsByDiscipline = async (disciplineId: number, totalCount: number) => {
  try {
    const response = await httpQuestionClient.get(
      `/random/by-discipline/${disciplineId}/${totalCount}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};


// 12. Метод для запроса на получение вопросов и одновременный старт сессии. Пока не проверен
export const startRealTestSession = async (
  disciplineId: number,
  totalCount: number
): Promise<RealTestSessionResult | null> => {
  try {
    const response = await httpQuestionClient.post<RealTestSessionResult>(
      `/exam/start`
    );
    return response.data as RealTestSessionResult;
  } catch (error) {
    handleError(error);
    return { sessionId: 0, questions: [] };
  }
};




