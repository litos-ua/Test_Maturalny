import { type AuthProvider } from 'react-admin';
import { authService } from '../services/authService';
import { tokenService } from '../services/tokenService';

export const authProvider: AuthProvider = {
  async login({ username, passwordHash }) {
    try {
      await authService.login({ email: username, passwordHash });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async logout() {
    try {
      await authService.logout();
    } catch {
      // Даже если запрос logout упал, всё равно чистим токены
      tokenService.clearTokens();
    }
    return Promise.resolve();
  },

  async checkAuth() {
    const token = tokenService.getAccessToken();
    return token ? Promise.resolve() : Promise.reject();
  },

  async checkError(error) {
    // Если ошибка авторизации — разлогиниваем
    if (error.status === 401 || error.status === 403) {
      tokenService.clearTokens();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  async getPermissions() {
    // Здесь можно вернуть роль пользователя, если API её отдаёт
    return Promise.resolve();
  },
};
