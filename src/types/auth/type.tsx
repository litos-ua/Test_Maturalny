export interface LoginRequestDto {
  email: string;
  passwordHash: string;
}

export interface LogoutRequestDto {
  accessToken: string;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  passwordHash: string;
  fullname?: string;
  address?: string;
  phoneNumber?: string;
}

export interface TokenApiRequestDto {
  accessToken: string;
  refreshToken: string;
}

export interface TokenApiResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: AuthUser;
}

export interface AuthUser {
  id: number;
  email: string;
  role: string;
  emailVerified: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: AuthUser;
}

export interface UpdateUserDto {
  id: number;
  username: string;
  email: string;
  fullname?: string;
  phoneNumber?: string;
  address?: string;
  role: UserRole;        
  emailVerified: boolean;
  isLocked: boolean;
}

export interface ForgotPasswordRequestDto {
  email: string;
}

export interface ResetPasswordRequestDto {
  token: string;
  newPassword: string;
}

export const UserRoles = {
  Guest: 0,
  Student: 1,
  Teacher: 2,
  Admin: 3
} as const;

export type UserRole = keyof typeof UserRoles;


