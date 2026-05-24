import { AxiosError } from "axios";
import type { InternalAxiosRequestConfig, AxiosInstance } from "axios";
import { configObj, switchToFallback } from "../../constants";

const isNetworkError = (error: AxiosError): boolean => {
  return error.code === 'ECONNABORTED' || 
         error.message === 'Network Error' || 
         error.code === 'ERR_NETWORK' ||
         error.response?.status === 504 ||
         error.message?.includes('Failed to fetch');
};

export const setupFallbackInterceptors = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (isNetworkError(error) && !configObj.isUsingFallback && !originalRequest._retry) {
        console.warn('⚠️ Network error detected, switching to fallback API');
        switchToFallback();
        originalRequest._retry = true;
        originalRequest.baseURL = configObj.axiosUrl;
        return apiClient(originalRequest);
      }

      return Promise.reject(error);
    }
  );
};