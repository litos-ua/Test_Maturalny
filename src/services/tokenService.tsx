// const ACCESS_TOKEN_KEY = 'accessToken';
// const REFRESH_TOKEN_KEY = 'refreshToken';

// export const tokenService = {
//   // Access Token
//   getAccessToken(): string | null {
//     return localStorage.getItem(ACCESS_TOKEN_KEY);
//   },

//   setAccessToken(token: string): void {
//     localStorage.setItem(ACCESS_TOKEN_KEY, token);
//   },

//   removeAccessToken(): void {
//     localStorage.removeItem(ACCESS_TOKEN_KEY);
//   },

//   // Refresh Token
//   getRefreshToken(): string | null {
//     return localStorage.getItem(REFRESH_TOKEN_KEY);
//   },

//   setRefreshToken(token: string): void {
//     localStorage.setItem(REFRESH_TOKEN_KEY, token);
//   },

//   removeRefreshToken(): void {
//     localStorage.removeItem(REFRESH_TOKEN_KEY);
//   },

//   // Clear all tokens
//   clearTokens(): void {
//     localStorage.removeItem(ACCESS_TOKEN_KEY);
//     localStorage.removeItem(REFRESH_TOKEN_KEY);
//   }
// };



const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Сервис для работы с JWT-токенами аутентификации
 * Все методы безопасно обрабатывают ошибки localStorage
 */
export const tokenService = {
  // ==================== Access Token ====================
  /**
   * Получает access token из localStorage
   * @returns {string | null} Токен или null, если не найден/ошибка
   */
  getAccessToken(): string | null {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  },

  /**
   * Сохраняет access token в localStorage
   * @param {string} token JWT-токен
   */
  setAccessToken(token: string): void {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to set access token:', error);
    }
  },

  /**
   * Удаляет access token из localStorage
   */
  removeAccessToken(): void {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove access token:', error);
    }
  },

  // ==================== Refresh Token ====================
  /**
   * Получает refresh token из localStorage
   * @returns {string | null} Токен или null, если не найден/ошибка
   */
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get refresh token:', error);
      return null;
    }
  },

  /**
   * Сохраняет refresh token в localStorage
   * @param {string} token JWT-токен
   */
  setRefreshToken(token: string): void {
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to set refresh token:', error);
    }
  },

  /**
   * Удаляет refresh token из localStorage
   */
  removeRefreshToken(): void {
    try {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove refresh token:', error);
    }
  },

  // ==================== Общие методы ====================
  /**
   * Очищает все токены из localStorage
   */
  clearTokens(): void {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  },

  /**
   * Проверяет валидность токена по сроку действия
   * @param {string | null} token JWT-токен
   * @returns {boolean} true если токен существует и не истёк
   */
  isTokenValid(token: string | null): boolean {
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  },

  /**
   * Проверяет наличие и валидность access token
   * @returns {boolean} true если токен действителен
   */
  hasValidAccessToken(): boolean {
    return this.isTokenValid(this.getAccessToken());
  },

  /**
   * Проверяет наличие и валидность refresh token
   * @returns {boolean} true если токен действителен
   */
  hasValidRefreshToken(): boolean {
    return this.isTokenValid(this.getRefreshToken());
  }
};