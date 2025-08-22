// import type { ReactNode } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>; 
// };

// import { useEffect } from "react";
// import type { ReactNode } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const { isAuthenticated, refreshUser } = useAuth();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       refreshUser();
//     }
//   }, [isAuthenticated, refreshUser]);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };

// // Расширенны вариант
// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../context';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   requireEmailVerified?: boolean;
// }

// export const ProtectedRoute = ({ 
//   children,
//   requireEmailVerified = false
// }: ProtectedRouteProps) => {
//   const { isAuthenticated, user, refreshUser } = useAuth();
//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     const checkAuth = async () => {
//       try {
//         if (!isAuthenticated) {
//           await refreshUser();
//         }
//       } catch (error) {
//         console.error('Auth check failed:', error);
//       } finally {
//         if (isMounted) {
//           setIsCheckingAuth(false);
//         }
//       }
//     };

//     checkAuth();

//     return () => {
//       isMounted = false;
//     };
//   }, [isAuthenticated, refreshUser]);

//   if (isCheckingAuth) {
//     return <div>Loading authentication...</div>; 
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//   }

//   if (requireEmailVerified && !user?.emailVerified) {
//     return <Navigate to="/verify-email" replace />;
//   }

//   return <>{children}</>;
// };


// Комплексная проверка всех возможных сценариев аутентификации:

// Базовый защищённый маршрут:
// <Route element={<ProtectedRoute />}>
//   <Route path="/profile" element={<ProfilePage />} />
// </Route>

// Требование подтверждённого email:
// <Route element={<ProtectedRoute requireEmailVerified={true} />}>
//   <Route path="/dashboard" element={<DashboardPage />} />
// </Route>

// Проверка ролей:
// <Route element={<ProtectedRoute requiredRoles={['admin']} />}>
//   <Route path="/admin" element={<AdminPanel />} />
// </Route>



// import { useEffect, useState } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context';
// import { tokenService } from '../../services';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   requireEmailVerified?: boolean;
//   requiredRoles?: string[];
// }

// export const ProtectedRoute = ({ 
//   children,
//   requireEmailVerified = false,
//   requiredRoles = []
// }: ProtectedRouteProps) => {
//   const { isAuthenticated, authUser, refreshUser } = useAuth();
//   const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');
//   const location = useLocation();

//   useEffect(() => {
//     let isMounted = true;

//     const checkAuth = async () => {
//       try {
//         // Сценарий 1: Есть активная сессия в контексте
//         if (isAuthenticated) {
//           // Дополнительная проверка токена на клиенте
//           if (!tokenService.hasValidAccessToken()) {
//             await refreshUser();
//           }
//           return;
//         }

//         // Сценарий 2: Нет сессии, но есть refresh-токен
//         if (tokenService.hasValidRefreshToken()) {
//           await refreshUser();
//           return;
//         }

//         // Сценарий 3: Нет валидных токенов
//         throw new Error('No valid tokens');
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         tokenService.clearTokens();
//         if (isMounted) {
//           setAuthStatus('unauthenticated');
//         }
//       } finally {
//         if (isMounted) {
//           setAuthStatus('authenticated');
//         }
//       }
//     };

//     checkAuth();

//     return () => {
//       isMounted = false;
//     };
//   }, [isAuthenticated, refreshUser]);

//   // Проверка ролей (если требуется)
//   const hasRequiredRole = requiredRoles.length === 0 || 
//     (authUser?.role && requiredRoles.includes(authUser.role));

//   // Обработка всех состояний
//   switch (authStatus) {
//     case 'checking':
//       return <div className="auth-loader">Checking authentication status...</div>;

//     case 'unauthenticated':
//       return <Navigate to="/login" state={{ from: location.pathname }} replace />;

//     case 'authenticated':
//       if (!isAuthenticated || !authUser) {
//         return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//       }

//       if (requireEmailVerified && !authUser.emailVerified) {  // Работает опционально
//         return <Navigate to="/verify-email" state={{ from: location.pathname }} replace />;
//       }

//       if (!hasRequiredRole) {                             // Работает опционально
//         return <Navigate to="/not-authorized" replace />;
//       }

//       return <>{children}</>;

//     default:
//       return <Navigate to="/login" replace />;
//   }
// };

// // Без поддержки ролей
// import { useState, useEffect } from "react";
// import type { ReactNode } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../context";
// import { Spinner } from "../Spinner";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const { isAuthenticated, refreshUser } = useAuth();
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const location = useLocation();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       const refreshAuth = async () => {
//         try {
//           setIsRefreshing(true);
//           setError(null);
//           await refreshUser();
//         } catch (err) {
//           console.error("Refresh failed:", err);
//           setError("Session expired. Please log in again.");
//         } finally {
//           setIsRefreshing(false);
//         }
//       };
      
//       refreshAuth();
//     }
//   }, [isAuthenticated, refreshUser]);

//   if (isRefreshing) {
//     return <Spinner message="Checking session..." />;
//   }

//   if (error) {
//     return (
//       <div className="error-message">
//         {error}
//         <Navigate to="/login" state={{ from: location }} replace />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
// };

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context";
import { Spinner } from "../Spinner";
import { UserRoles, type UserRole } from "../../types"; // Импортируем ваши типы ролей

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole; // Добавляем опциональную проверку роли
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, refreshUser, user } = useAuth(); // Добавляем user из контекста
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      const refreshAuth = async () => {
        try {
          setIsRefreshing(true);
          setError(null);
          await refreshUser();
        } catch (err) {
          console.error("Refresh failed:", err);
          setError("Session expired. Please log in again.");
        } finally {
          setIsRefreshing(false);
        }
      };
      
      refreshAuth();
    }
  }, [isAuthenticated, refreshUser]);

  if (isRefreshing) {
    return <Spinner message="Checking session..." />;
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <Navigate to="/login" state={{ from: location }} replace />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Новая проверка роли (добавлена после проверки аутентификации)
  if (requiredRole && user?.role) {
  // Проверяем, что role валидна
  const userRole = user.role as keyof typeof UserRoles;
  
  if (UserRoles[userRole] < UserRoles[requiredRole]) {
    return <Navigate to="/" replace />;
  }
}

  return <>{children}</>;
};