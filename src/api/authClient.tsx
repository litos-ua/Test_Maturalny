import axios from 'axios';
import { configObj } from "../constants";
import { tokenService } from "../services/tokenService";

const baseURL = configObj.axiosUrl;

export const axiosClient = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// // Общий handler ошибок
// export const handleAuthError = (error: any) => {
//   if (axios.isAxiosError(error) && error.response) {
//     throw error.response.data;
//   } else {
//     throw new Error("Unknown auth error");
//   }
// };

// export const post = async <T = any>(
//   url: string,
//   data: any,
//   extraHeaders: Record<string, string> = {}
// ): Promise<T> => {
//   const token = tokenService.getAccessToken();

//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...extraHeaders,
//   };

//   try {
//     const response = await axiosClient.post(url, data, { headers });
//     return response.data;
//   } catch (error) {
//     handleAuthError(error);
//     throw error;
//   }
// };

// export const get = async <T = any>(
//   url: string,
//   config: {
//     params?: Record<string, any>;
//     headers?: Record<string, string>;
//   } = {} 
// ): Promise<T> => {
//   const token = tokenService.getAccessToken();
  
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...config.headers,
//   };

//   const response = await axiosClient.get<T>(url, {
//     headers,
//     params: config.params
//   });
  
//   return response.data;
// };

// export const put = async <T = any>(
//   url: string,
//   data: any,
//   extraHeaders: Record<string, string> = {}
// ): Promise<T> => {
//   const token = tokenService.getAccessToken();

//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...extraHeaders,
//   };

//   try {
//     const response = await axiosClient.put(url, data, { headers });
//     return response.data;
//   } catch (error) {
//     handleAuthError(error);
//     throw error;
//   }
// };

// export const del = async <T = any>(
//   url: string,
//   extraHeaders: Record<string, string> = {}
// ): Promise<T> => {
//   const token = tokenService.getAccessToken();

//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...extraHeaders,
//   };

//   try {
//     const response = await axiosClient.delete(url, { headers });
//     return response.data;
//   } catch (error) {
//     handleAuthError(error);
//     throw error;
//   }
// };
