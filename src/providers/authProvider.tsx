import { type AuthProvider } from 'react-admin';
import { authService } from '../services/authService';
import { tokenService } from '../services/tokenService';
import { apiClient } from "../api/apiClient";
import { UserRoles } from '../types';


export const authProvider: AuthProvider = {
  // async login({ username, passwordHash }) {
  //   try {
  //     await authService.login({ email: username, passwordHash });
  //     return Promise.resolve();
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // },

  async login({ username, password }) { 
    try {
      await authService.login({ 
        email: username, 
        passwordHash: password 
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async logout() {
    try {
      await authService.logout();
    } catch {
      tokenService.clearTokens();
    }
    return Promise.resolve();
  },

  //Проверка наличия токена
  async checkAuth() {
    const token = tokenService.getAccessToken();
    return token ? Promise.resolve() : Promise.reject();
  },

  async checkError(error) {
    // Автоматический logout при ошибках авторизации
    if (error.status === 401 || error.status === 403) {
      tokenService.clearTokens();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  async getPermissions() {
    try {
        const userInfo = await apiClient.get('/user/me');
        const roleNumber = userInfo.data.Role; // Сервер возвращает число: 0, 1, 2, 3
        
        const isValidRole = Object.values(UserRoles).includes(roleNumber);
        
        if (isValidRole) {
          return Promise.resolve(roleNumber);
        }
        
        return Promise.resolve(UserRoles.Guest);
        
      } catch (error) {
        return Promise.resolve(UserRoles.Guest);
      }
    }
};
