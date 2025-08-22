// import { get, post, put, del, handleAuthError } from "./authClient";
// import type { User, UpdateUserDto } from "../types";

// // Получить всех пользователей
// export const fetchUsers = async (): Promise<User[]> => {
//   try {
//     return await get<User[]>("/users");
//   } catch (error) {
//     handleAuthError(error);
//     return []; // fallback, чтобы соответствовать Promise<User[]>
//   }
// };

// // Получить пользователя по id
// export const getUserById = async (id: number): Promise<User> => {
//   try {
//     return await get<User>(`/users/${id}`);
//   } catch (error) {
//     handleAuthError(error);
//     throw error;
//   }
// };

// // Создать нового пользователя
// export const createUser = async (userData: Partial<User>): Promise<User> => {
//   try {
//     return await post<User>("/users", userData);
//   } catch (error) {
//     handleAuthError(error);
//     throw error;
//   }
// };

// // Обновить пользователя
// export const updateUser = async (id: number, data: UpdateUserDto): Promise<User> => {
//   try {
//     return await put<User>(`/users/${id}`, data);
//   } catch (error) {
//     handleAuthError(error);
//     throw error;
//   }
// };

// // Удалить пользователя
// export const deleteUser = async (id: number): Promise<void> => {
//   try {
//     await del(`/users/${id}`);
//   } catch (error) {
//     handleAuthError(error);
//     throw error;
//   }
// };

import { get, post, put, del, handleAuthError } from "./authClient";
import type { UserDto, CreateUserDto, UpdateUserDto } from "../types";

// Получить всех пользователей
export const fetchUsers = async (): Promise<UserDto[]> => {
  try {
    return await get<UserDto[]>("/users");
  } catch (error) {
    handleAuthError(error);
    return []; // fallback, чтобы соответствовать Promise<User[]>
  }
};

// Получить пользователя по id
export const getUserById = async (id: number): Promise<UserDto> => {
  try {
    return await get<UserDto>(`/users/${id}`);
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// Создать нового пользователя
export const createUser = async (userData: CreateUserDto): Promise<UserDto> => {
  try {
    return await post<UserDto>("/users", {...userData, role: userData.role || 'Student'});
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// Обновить пользователя
export const updateUser = async (id: number, data: Omit<UpdateUserDto, 'id'>): Promise<UserDto> => {
  try {
    return await put<UserDto>(`/users/${id}`, {...data, id});
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// Удалить пользователя
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await del(`/users/${id}`);
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};
