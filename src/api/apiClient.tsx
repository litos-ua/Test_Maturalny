import axios from "axios";
import { authService, tokenService } from "../services";
import { configObj } from "../constants";

const baseURL = configObj.axiosUrl;

// Создаем экземпляр axios
const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

// Интерцептор для добавления токена в запросы
apiClient.interceptors.request.use(config => {
  const token = tokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор для обработки 401 ошибки
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
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
            
            // Безопасный редирект
            window.history.replaceState(null, "", "/login");
            window.dispatchEvent(new PopStateEvent("popstate"));

            // Типобезопасная обработка ошибки
            const errorObj = (() => {
                if (refreshError instanceof Error) {
                const err = new Error(refreshError.message);
                err.name = refreshError.name;
                err.stack = refreshError.stack;
                return Object.assign(err, { isAuthError: true });
                }
                return Object.assign(new Error('Authentication failed'), { isAuthError: true });
                })();

            return Promise.reject(errorObj);
            } finally {
            isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

// export default apiClient;
export { apiClient };
