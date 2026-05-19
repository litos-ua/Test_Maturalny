import { get, post, put, del, handleAuthError } from "./";
import type { UserDto, CreateUserDto, UpdateUserDto } from "../types";

export const fetchUsers = async (): Promise<UserDto[]> => {
  try {
    return await get<UserDto[]>("/users");
  } catch (error) {
    handleAuthError(error);
    return []; // fallback, чтобы соответствовать Promise<User[]>
  }
};

export const getUserById = async (id: number): Promise<UserDto> => {
  try {
    return await get<UserDto>(`/users/${id}`);
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

export const createUser = async (userData: CreateUserDto): Promise<UserDto> => {
  try {
    return await post<UserDto>("/users", {...userData, role: userData.role || 'Student'});
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

export const updateUser = async (id: number, data: Omit<UpdateUserDto, 'id'>): Promise<UserDto> => {
  try {
    return await put<UserDto>(`/users/${id}`, {...data, id});
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await del(`/users/${id}`);
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};
