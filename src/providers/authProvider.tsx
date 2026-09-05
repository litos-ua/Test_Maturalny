// import { type AuthProvider } from 'react-admin';
// import { authService } from '../services/authService';
// import { tokenService } from '../services/tokenService';
// import { apiClient } from "../api/apiClient";
// import { UserRoles } from '../types';


// export const authProvider: AuthProvider = {

//   async login({ username, password }) { 
//     try {
//       await authService.login({ 
//         email: username, 
//         passwordHash: password 
//       });
//       return Promise.resolve();
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   },

//   async logout() {
//     try {
//       await authService.logout();
//     } catch {
//       tokenService.clearTokens();
//     }
//     return Promise.resolve();
//   },

//   //Проверка наличия токена
//   async checkAuth() {
//     const token = tokenService.getAccessToken();
//     return token ? Promise.resolve() : Promise.reject();
//   },

//   async checkError(error) {
//     // Автоматический logout при ошибках авторизации
//     if (error.status === 401 || error.status === 403) {
//       tokenService.clearTokens();
//       return Promise.reject();
//     }
//     return Promise.resolve();
//   },

//   async getPermissions() {
//     try {
//         const userInfo = await apiClient.get('/user/me');
//         const roleNumber = userInfo.data.Role; // Сервер возвращает число: 0, 1, 2, 3
        
//         const isValidRole = Object.values(UserRoles).includes(roleNumber);
        
//         if (isValidRole) {
//           return Promise.resolve(roleNumber);
//         }
        
//         return Promise.resolve(UserRoles.Guest);
        
//       } catch (error) {
//         return Promise.resolve(UserRoles.Guest);
//       }
//     }
// };


// import { type AuthProvider } from 'react-admin';
// import { authService } from '../services/authService';
// import { tokenService } from '../services/tokenService';
// import { apiClient } from "../api/apiClient";
// import { UserRoles } from '../types';

// export const authProvider: AuthProvider = {

//   async login({ username, password }) { 
//     try {
//       await authService.login({ 
//         email: username, 
//         passwordHash: password 
//       });
//       return Promise.resolve();
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   },

//   async logout() {
//     try {
//       await authService.logout();
//     } catch {
//       tokenService.clearTokens();
//     }
//     return Promise.resolve();
//   },

//   // Проверка наличия токена и его валидности
//   async checkAuth() {
//     const token = tokenService.getAccessToken();
//     if (!token) {
//       return Promise.reject();
//     }
    
//     try {
//       await apiClient.get('/auth/me');
//       return Promise.resolve();
//     } catch (error) {
//       tokenService.clearTokens();
//       return Promise.reject();
//     }
//   },



//   async checkError(error) {
//     // Автоматический logout при ошибках авторизации
//     if (error.status === 401 || error.status === 403) {
//       tokenService.clearTokens();
//       return Promise.reject();
//     }
//     return Promise.resolve();
//   },

//   async getPermissions() {
//     try {
//       const userInfo = await apiClient.get('/user/me');
//       const roleNumber = userInfo.data.Role; // Сервер возвращает число: 0, 1, 2, 3
      
//       const isValidRole = Object.values(UserRoles).includes(roleNumber);
      
//       if (isValidRole) {
//         return Promise.resolve(roleNumber);
//       }
      
//       return Promise.resolve(UserRoles.Guest);
//     } catch (error) {
//       return Promise.resolve(UserRoles.Guest);
//     }
//   }
// };

// ✅ React Admin требует после корректировок, чтобы в данных был email
import { type AuthProvider } from 'react-admin';
import { authService } from '../services/authService';
import { tokenService } from '../services/tokenService';
import { UserRoles } from '../types';

export const authProvider: AuthProvider = {
  async login({ username, password }) {
    try {
      // ✅ Используем существующий authService
      const user = await authService.login({ 
        email: username, 
        passwordHash: password 
      });
      
      // ✅ React Admin требует, чтобы в данных был email
      return Promise.resolve({ 
        ...user,
        email: username 
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async logout() {
    try {
      // ✅ Используем существующий logout
      await authService.logout();
    } catch {
      tokenService.clearTokens();
    }
    return Promise.resolve();
  },

  // ✅ Упрощенная проверка - только наличие токена
  async checkAuth() {
    const token = tokenService.getAccessToken();
    
    if (!token || !tokenService.isTokenValid(token)) {
      return Promise.reject({ redirectTo: '/login' });
    }
    
    return Promise.resolve();
  },

  async checkError(error) {
    if (error.status === 401 || error.status === 403) {
      tokenService.clearTokens();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  async getPermissions() {
    try {
      // ✅ Получаем роль из токена напрямую
      const token = tokenService.getAccessToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role || payload.Role;
        
        // Преобразуем строку в число если нужно
        if (typeof role === 'string') {
          const roleMap: Record<string, number> = {
            'Guest': 0,
            'Student': 1, 
            'Teacher': 2,
            'Admin': 3
          };
          return Promise.resolve(roleMap[role] ?? 0);
        }
        
        return Promise.resolve(role);
      }
      
      return Promise.resolve(UserRoles.Guest);
    } catch (error) {
      return Promise.resolve(UserRoles.Guest);
    }
  }
};