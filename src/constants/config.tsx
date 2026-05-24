// const axiosUrl =
//   import.meta.env.VITE_API_USE_HTTPS === "true"
//     ? import.meta.env.VITE_API_HTTPS_URL
//     : import.meta.env.VITE_API_HTTP_URL;

// export const configObj = {
//   axiosUrl,
//   adminUserId: 3,
//   devMode: true,
//   baseLanguage: "ua",
//   pagination: {
//     startPage: 1,
//     pageSize: 10,
//   },
// };







// constants/config.tsx

// Основной API (ASP.NET Core)
const PRIMARY_API_URL = import.meta.env.VITE_API_USE_HTTPS === "true"
    ? import.meta.env.VITE_API_HTTPS_URL
    : import.meta.env.VITE_API_HTTP_URL;

// Резервный API (PHP/Laravel)
const FALLBACK_API_URL = import.meta.env.VITE_FALLBACK_API_USE_HTTPS === "true"
    ? import.meta.env.VITE_FALLBACK_API_HTTPS_URL
    : import.meta.env.VITE_FALLBACK_API_HTTP_URL;

// Текущий активный API (начинаем с основного)
let currentApiUrl = PRIMARY_API_URL;
let isUsingFallback = localStorage.getItem('api_using_fallback') === 'true';

// Если ранее был переключён на резервный — восстанавливаем
if (isUsingFallback) {
    currentApiUrl = FALLBACK_API_URL;
}

export const configObj = {
    // Основные настройки
    axiosUrl: currentApiUrl,
    primaryApiUrl: PRIMARY_API_URL,
    fallbackApiUrl: FALLBACK_API_URL,
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
    healthCheckInterval: Number(import.meta.env.VITE_API_HEALTH_CHECK_INTERVAL) || 30000,
    
    // Статус
    isUsingFallback: isUsingFallback,
};

// Функции для переключения API
export const switchToFallback = () => {
    if (!isUsingFallback) {
        console.warn('⚠️ Switching to FALLBACK API:', FALLBACK_API_URL);
        isUsingFallback = true;
        currentApiUrl = FALLBACK_API_URL;
        configObj.axiosUrl = currentApiUrl;
        configObj.isUsingFallback = true;
        localStorage.setItem('api_using_fallback', 'true');
    }
};

export const switchToPrimary = () => {
    if (isUsingFallback) {
        console.log('✅ Switching back to PRIMARY API:', PRIMARY_API_URL);
        isUsingFallback = false;
        currentApiUrl = PRIMARY_API_URL;
        configObj.axiosUrl = currentApiUrl;
        configObj.isUsingFallback = false;
        localStorage.removeItem('api_using_fallback');
    }
};

// Проверка доступности API
// export const checkApiHealth = async (url: string): Promise<boolean> => {
//     try {
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), 5000);
        
//         const response = await fetch(`${url}disciplines`, {
//             method: 'HEAD',
//             signal: controller.signal
//         });
        
//         clearTimeout(timeoutId);
//         return response.ok;
//     } catch {
//         return false;
//     }
// };

// Проверка доступности API
export const checkApiHealth = async (url: string): Promise<boolean> => {
    if (!url) return true;
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // увеличил до 8 секунд
        
        // Используем GET вместо HEAD (более надёжно)
        const response = await fetch(`${url}disciplines`, {
            method: 'GET',
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
            }
        });
        
        clearTimeout(timeoutId);
        
        // Считаем успехом любой ответ 2xx или 3xx
        return response.ok || (response.status >= 200 && response.status < 400);
    } catch (error) {
        console.warn(`Health check failed for ${url}:`, error);
        return false;
    }
};

