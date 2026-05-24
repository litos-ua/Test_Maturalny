import axios from "axios";
import { configObj } from "../constants";

const baseURL = configObj.axiosUrl + "Disciplines";

const httpDisciplineClient = axios.create({
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

export const fetchDisciplines = async () => {
  try {
    const response = await httpDisciplineClient.get("");
    return response.data 
  } catch (error) {
    handleError(error);
  }
};

export const getDisciplineById = async (id: number) => {
  try {
    const response = await httpDisciplineClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createDiscipline = async (data: any) => {
  try {
    const response = await httpDisciplineClient.post("/", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateDiscipline = async (id: number, data: any) => {
  try {
    const response = await httpDisciplineClient.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteDiscipline = async (id: number) => {
  try {
    const response = await httpDisciplineClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
