import type { RaRecord } from "react-admin";

// export const UserRoles = {
const UserRoles = {
  Guest: 0,
  Student: 1,
  Teacher: 2,
  Admin: 3
} as const;


export type UserRole = keyof typeof UserRoles; // 0 | 1 | 2 | 3
export type UserRoleString = keyof typeof UserRoles; // 'Guest' | 'Student' | 'Teacher' | 'Admin'

export interface UserDto extends RaRecord<number> {
  id: number;
  username: string;
  email: string;
  fullname?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  role: UserRole;
  emailVerified: boolean;
  isLocked: boolean;
}

export interface UserOptionDto extends RaRecord<number> {
  id: number;
  userId: number;
  theme: string; // default: "light"
  language: string; // default: "uk"
  questionPreferencesJson?: string | null;
  adminMessage?: string | null;
  averageScore: number; // default: 0.0
}

export interface CreateUserDto extends RaRecord<number> {
  username: string;
  email: string;
  password: string;
  fullname?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  role: UserRole; // default: UserRole.Student
}

export interface CreateUserAnswerDto extends RaRecord<number> {
  questionId: number;
  explanation?: string | null;
  score: number; // default: 0
  answerInt: number;
  selectedOptionIds: number[]; // default: []
  testSessionId?: number | null;
}

export interface CreateUserOptionDto extends RaRecord<number> {
  userId: number;
  theme: string; // default: "light"
  language: string; // default: "uk"
  questionPreferencesJson?: string | null;
  adminMessage?: string | null;
  averageScore: number; // default: 0.0
}

export interface UpdateUserDto extends RaRecord<number> {
  id: number;
  username: string;
  email: string;
  fullname?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  role: UserRole; // default: UserRole.Student
  emailVerified: boolean;
  isLocked: boolean;
}

export interface UpdateUserOptionDto extends RaRecord<number> {
  id: number;
  theme: string; // default: "light"
  language: string; // default: "uk"
  questionPreferencesJson?: string | null;
  adminMessage?: string | null;
  averageScore: number; // default: 0.0
}
