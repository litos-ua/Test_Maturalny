// import axios from "axios";
// import { authService, tokenService } from "../services";
// import { configObj, switchToFallback } from "../constants";

// const baseURL = configObj.axiosUrl;

// // Создаем экземпляр axios
// const apiClient = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔥 Добавляем базовые HTTP методы
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
//     const response = await apiClient.post(url, data, { headers });
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

//   const response = await apiClient.get<T>(url, {
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
//     const response = await apiClient.put(url, data, { headers });
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
//     const response = await apiClient.delete(url, { headers });
//     return response.data;
//   } catch (error) {
//     handleAuthError(error);
//     throw error;
//   }
// };


// let isRefreshing = false;
// let failedQueue: Array<{resolve: (token: string) => void; reject: (error: any) => void}> = [];

// const processQueue = (error: any, token?: string) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token!);
//     }
//   });
//   failedQueue = [];
// };

// // Интерцептор для добавления токена в запросы
// apiClient.interceptors.request.use(config => {
//   const token = tokenService.getAccessToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Интерцептор для обработки 401 ошибки
// apiClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise<string>((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(token => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return apiClient(originalRequest);
//         }).catch(err => {
//           return Promise.reject(err);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshed = await authService.refresh();
//         tokenService.setAccessToken(refreshed.accessToken);
//         tokenService.setRefreshToken(refreshed.refreshToken);

//         processQueue(null, refreshed.accessToken);
//         originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
//         return apiClient(originalRequest);
//             } catch (refreshError) {
//             processQueue(refreshError);
//             tokenService.clearTokens();
            
//             // Безопасный редирект
//             window.history.replaceState(null, "", "/login");
//             window.dispatchEvent(new PopStateEvent("popstate"));

//             // Типобезопасная обработка ошибки
//             const errorObj = (() => {
//                 if (refreshError instanceof Error) {
//                 const err = new Error(refreshError.message);
//                 err.name = refreshError.name;
//                 err.stack = refreshError.stack;
//                 return Object.assign(err, { isAuthError: true });
//                 }
//                 return Object.assign(new Error('Authentication failed'), { isAuthError: true });
//                 })();

//             return Promise.reject(errorObj);
//             } finally {
//             isRefreshing = false;
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// // Перехватчик ответов для обработки ошибок сети
// apiClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         // Проверяем ошибку сети
//         const isNetworkError = error.code === 'ECONNABORTED' || 
//                                error.message === 'Network Error' || 
//                                error.code === 'ERR_NETWORK' ||
//                                error.response?.status === 504;

//         if (isNetworkError && !configObj.isUsingFallback && configObj.fallbackApiUrl) {
//             console.warn('Network error detected, switching to fallback API');
//             switchToFallback();
            
//             // Обновляем baseURL у apiClient
//             apiClient.defaults.baseURL = configObj.axiosUrl;
            
//             // Повторяем оригинальный запрос
//             const originalRequest = error.config;
//             originalRequest.baseURL = configObj.axiosUrl;
//             return apiClient(originalRequest);
//         }

//         return Promise.reject(error);
//     }
// );



// // export default apiClient;
// export { apiClient };



// import axios from "axios";
// import { authService, tokenService } from "../services";
// import { configObj, switchToFallback } from "../constants";

// const baseURL = configObj.axiosUrl;

// // Создаем экземпляр axios
// const apiClient = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ========== Базовые HTTP методы ==========
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
//     const response = await apiClient.post(url, data, { headers });
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
//   const response = await apiClient.get<T>(url, {
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
//     const response = await apiClient.put(url, data, { headers });
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
//     const response = await apiClient.delete(url, { headers });
//     return response.data;
//   } catch (error) {
//     handleAuthError(error);
//     throw error;
//   }
// };

// // ========== Перехватчики ==========

// // 1. Перехватчик запросов — добавляем токен
// apiClient.interceptors.request.use(config => {
//   const token = tokenService.getAccessToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 2. Перехватчик ответов — обработка ошибок
// let isRefreshing = false;
// let failedQueue: Array<{resolve: (token: string) => void; reject: (error: any) => void}> = [];

// const processQueue = (error: any, token?: string) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token!);
//     }
//   });
//   failedQueue = [];
// };

// // Функция проверки ошибки сети
// const isNetworkError = (error: any): boolean => {
//   return error.code === 'ECONNABORTED' || 
//          error.message === 'Network Error' || 
//          error.code === 'ERR_NETWORK' ||
//          error.response?.status === 504 ||
//          error.message?.includes('Failed to fetch');
// };

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // ----- 1. Обработка 401 ошибки (авторизация) -----
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise<string>((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(token => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return apiClient(originalRequest);
//         }).catch(err => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshed = await authService.refresh();
//         tokenService.setAccessToken(refreshed.accessToken);
//         tokenService.setRefreshToken(refreshed.refreshToken);
//         processQueue(null, refreshed.accessToken);
//         originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError);
//         tokenService.clearTokens();
//         window.history.replaceState(null, "", "/login");
//         window.dispatchEvent(new PopStateEvent("popstate"));
//         const errorObj = (() => {
//           if (refreshError instanceof Error) {
//             const err = new Error(refreshError.message);
//             err.name = refreshError.name;
//             err.stack = refreshError.stack;
//             return Object.assign(err, { isAuthError: true });
//           }
//           return Object.assign(new Error('Authentication failed'), { isAuthError: true });
//         })();
//         return Promise.reject(errorObj);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     // ----- 2. Обработка ошибки сети (падение основного сервера) -----
//     if (isNetworkError(error) && !configObj.isUsingFallback && !originalRequest._retry) {
//       console.warn('⚠️ Network error detected, switching to fallback API');
//       switchToFallback();
//       originalRequest._retry = true;
//       originalRequest.baseURL = configObj.axiosUrl;
//       return apiClient(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );

// export { apiClient };


import axios from "axios";
import { authService, tokenService } from "../services";
import { configObj, switchToFallback } from "../constants";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Ключевое: обновляем baseURL перед каждым запросом
apiClient.interceptors.request.use(async (config) => {
  config.baseURL = configObj.axiosUrl;
  
  const token = tokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== Базовые HTTP методы ==========
export const handleAuthError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    throw error.response.data;
  } else {
    throw new Error("Unknown auth error");
  }
};

export const get = async <T = any>(url: string, config?: any): Promise<T> => {
  try {
    const response = await apiClient.get(url, config);
    return response.data;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

export const post = async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
  try {
    const response = await apiClient.post(url, data, config);
    return response.data;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

export const put = async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
  try {
    const response = await apiClient.put(url, data, config);
    return response.data;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

export const del = async <T = any>(url: string, config?: any): Promise<T> => {
  try {
    const response = await apiClient.delete(url, config);
    return response.data;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// ========== Перехватчики ответов ==========
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

const isNetworkError = (error: any): boolean => {
  return error.code === 'ECONNABORTED' || 
         error.message === 'Network Error' || 
         error.code === 'ERR_NETWORK' ||
         error.response?.status === 504 ||
         error.message?.includes('Failed to fetch');
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Обработка 401
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
        return Promise.reject(Object.assign(new Error('Authentication failed'), { isAuthError: true }));
      } finally {
        isRefreshing = false;
      }
    }

    // 🔥 Мгновенное переключение на fallback API
    if (isNetworkError(error) && !configObj.isUsingFallback && !originalRequest._retry) {
      console.warn('⚠️ Network error detected, switching to fallback API immediately');
      switchToFallback();
      originalRequest._retry = true;
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

export { apiClient };