import { AxiosError } from "axios";
import type { InternalAxiosRequestConfig, AxiosInstance } from "axios";
import { authService, tokenService } from "../../services";

let isRefreshing = false;
let failedQueue: Array<{resolve: (token: string) => void; reject: (error: any) => void}> = [];

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export const setupAuthInterceptors = (apiClient: AxiosInstance) => {
  // Request interceptor — добавляем токен
  apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor — обработка 401
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          }).catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshed = await authService.refresh();
          tokenService.setAccessToken(refreshed.accessToken);
          tokenService.setRefreshToken(refreshed.refreshToken);
          processQueue(null, refreshed.accessToken);
          originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);
          tokenService.clearTokens();
          window.history.replaceState(null, "", "/login");
          window.dispatchEvent(new PopStateEvent("popstate"));
          const errorObj = Object.assign(new Error('Authentication failed'), { isAuthError: true });
          return Promise.reject(errorObj);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    }
  );
};