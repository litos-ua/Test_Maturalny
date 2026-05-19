import axios from "axios";
import { configObj } from "../constants";

const baseURL = configObj.axiosUrl + "Topics";

const httpTopicClient = axios.create({
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

export const fetchTopics = async () => {
  try {
    const response = await httpTopicClient.get("");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTopicById = async (id: number) => {
  try {
    const response = await httpTopicClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTopicsByDisciplineId = async (disciplineId: number) => {
  try {
    const response = await httpTopicClient.get(`/by-discipline/${disciplineId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createTopic = async (data: any) => {
  try {
    const response = await httpTopicClient.post("/", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateTopic = async (id: number, data: any) => {
  try {
    const response = await httpTopicClient.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTopic = async (id: number) => {
  try {
    const response = await httpTopicClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
