// import { useEffect, useRef } from 'react';
// import { configObj, switchToFallback, switchToPrimary, checkApiHealth } from '../constants/config';

// export const useApiFallback = () => {
//     const intervalRef = useRef<NodeJS.Timeout | null>(null);

//     useEffect(() => {
//         // Функция проверки основного API
//         const checkPrimaryHealth = async () => {
//             if (configObj.isUsingFallback) {
//                 const isPrimaryAlive = await checkApiHealth(configObj.primaryApiUrl);
//                 if (isPrimaryAlive) {
//                     switchToPrimary();
//                     // Небольшая задержка перед обновлением страницы
//                     setTimeout(() => window.location.reload(), 100);
//                 }
//             }
//         };

//         // Запускаем проверку каждые 30 секунд
//         intervalRef.current = setInterval(checkPrimaryHealth, configObj.healthCheckInterval);

//         return () => {
//             if (intervalRef.current) clearInterval(intervalRef.current);
//         };
//     }, []);
// };


import { useEffect, useRef, useState } from 'react';
import { configObj, switchToFallback, switchToPrimary, checkApiHealth } from '../constants/config';

export const useApiFallback = () => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isCheckingRef = useRef(false);

    const checkAndSwitch = async () => {
        // Предотвращаем одновременные проверки
        if (isCheckingRef.current) return;
        isCheckingRef.current = true;
        
        try {
            console.log(`[HealthCheck] Checking primary API: ${configObj.primaryApiUrl}`);
            
            const isPrimaryAlive = await checkApiHealth(configObj.primaryApiUrl);
            
            console.log(`[HealthCheck] Primary API is ${isPrimaryAlive ? 'ALIVE ✅' : 'DEAD ❌'}`);
            console.log(`[HealthCheck] Current mode: ${configObj.isUsingFallback ? 'FALLBACK' : 'PRIMARY'}`);
            
            // Случай 1: Основной недоступен → переключаемся на резервный
            if (!isPrimaryAlive && !configObj.isUsingFallback) {
                console.warn('⚠️ [HealthCheck] Switching to FALLBACK API');
                switchToFallback();
                // Даём время на обновление состояния
                setTimeout(() => window.location.reload(), 200);
                return;
            }
            
            // Случай 2: Основной снова доступен → возвращаемся обратно
            if (isPrimaryAlive && configObj.isUsingFallback) {
                console.log('✅ [HealthCheck] Primary API recovered, switching back');
                switchToPrimary();
                setTimeout(() => window.location.reload(), 200);
                return;
            }
            
            console.log('[HealthCheck] No switch needed');
            
        } catch (error) {
            console.error('[HealthCheck] Unexpected error:', error);
        } finally {
            isCheckingRef.current = false;
        }
    };

    useEffect(() => {
        // Немедленная проверка при загрузке
        checkAndSwitch();
        
        // Периодическая проверка
        intervalRef.current = setInterval(checkAndSwitch, configObj.healthCheckInterval);
        
        // Дополнительные события для более быстрого обнаружения проблем
        const handleOnline = () => {
            console.log('[HealthCheck] Online event triggered');
            checkAndSwitch();
        };
        
        const handleOffline = () => {
            console.warn('[HealthCheck] Offline event triggered - network is down');
            if (!configObj.isUsingFallback) {
                console.warn('⚠️ Switching to FALLBACK due to offline event');
                switchToFallback();
                setTimeout(() => window.location.reload(), 200);
            }
        };
        
        const handleVisibility = () => {
            if (!document.hidden) {
                console.log('[HealthCheck] Tab became visible, checking...');
                checkAndSwitch();
            }
        };
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        document.addEventListener('visibilitychange', handleVisibility);
        
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);
};