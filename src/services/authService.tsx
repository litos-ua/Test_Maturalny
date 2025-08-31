import { post } from "../api/"; // Импортируй свои обертки post/get
import { tokenService } from "./tokenService";
import type {
  LoginRequestDto,
  RegisterUserDto,
  TokenApiRequestDto,
  TokenApiResponseDto,
  LoginResponse,
  ForgotPasswordRequestDto,
  ResetPasswordRequestDto,
  AuthUser,
} from "../types";

export const authService = {
  /**
   * Логин (токенов ещё нет, поэтому используем прямой вызов authClient.post)
   */
  async login(data: LoginRequestDto): Promise<AuthUser> {
    try {
      console.log("🔄 Logging in with data:", data);
      const response = await post<LoginResponse>("/auth/login", data);

      // Сохраняем токены после успешного логина
      tokenService.setAccessToken(response.token);
      tokenService.setRefreshToken(response.refreshToken);

      return response.user;
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error;
    }
  },

  /**
   * Регистрация (аналогично login – токенов нет)
   */
  async register(userData: RegisterUserDto): Promise<AuthUser> {
    try {
      const response = await post<{ user: AuthUser }>("/auth/register", userData);
      return response.user;
    } catch (error) {
      console.error("❌ Register error:", error);
      throw error;
    }
  },

  /**
   * Logout – refresh, accsess токен передаётся в теле запроса
   */
async logout(): Promise<void> {
  try {
    const access = tokenService.getAccessToken();
    const refresh = tokenService.getRefreshToken();

    await post("/auth/logout", {
      accessToken: access,
      refreshToken: refresh
    });

    tokenService.clearTokens();
  } catch (error) {
    console.error("❌ Logout error:", error);
    throw error;
  }
},

  /**
   * Refresh – передаём refreshToken и accessToken в теле, но также нужен Authorization header
   */
  async refresh(): Promise<TokenApiResponseDto> {
    const refreshToken = tokenService.getRefreshToken();
    const accessToken = tokenService.getAccessToken();

    if (!refreshToken || !accessToken) {
      throw new Error("Tokens missing for refresh");
    }

    const dto: TokenApiRequestDto = {
      accessToken,
      refreshToken,
    };

    try {
      const response = await post<TokenApiResponseDto>("/auth/refresh", dto);

      // Сохраняем новые токены
      tokenService.setAccessToken(response.accessToken);
      tokenService.setRefreshToken(response.refreshToken);

      return response;
    } catch (error) {
      console.error("❌ Refresh error:", error);
      throw error;
    }
  },

  /**
   * Forgot password – прямой вызов, токен не нужен
   */
  async forgotPassword(email: string): Promise<{ success: boolean; resetToken?: string; message?: string }> {
    try {
      const dto: ForgotPasswordRequestDto = { email };
      return await post("/auth/forgot-password", dto); 
    } catch (error) {
      console.error("❌ Forgot password error:", error);
      throw error;
    }
  },

  /**
   * Reset password – прямой вызов, токен сброса приходит в теле запроса
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const dto: ResetPasswordRequestDto = { token, newPassword };
      await post("/auth/reset-password", dto);
    } catch (error) {
      console.error("❌ Reset password error:", error);
      throw error;
    }
  },

  async resetPasswordRequest(email: string): Promise<{ success: boolean; resetToken?: string }> {
  try {
    const dto = { email };
    return await post("/auth/reset-password-request", dto);
  } catch (error) {
    console.error("❌ Reset password request error:", error);
    throw error;
  }
}

};
