import { get, post, put, del } from "../api";
import type { UserDto, CreateUserDto, UpdateUserDto } from "../types";

export const userService = {
  async getAllUsers(): Promise<UserDto[]> {
    return await get<UserDto[]>("/user")
  },

  async getAllowedContacts(): Promise<UserDto[]> {
  return await get<UserDto[]>("/messages/contacts");
  },

  async getUserById(id: number): Promise<UserDto> {
    return await get<UserDto>(`/user/${id}`);
  },

  async getCurrentUser(): Promise<UserDto> {
  return await get<UserDto>("/user/me");
  },

  async createUser(userData: CreateUserDto): Promise<UserDto> {
    return await post<UserDto>("/user", userData);
  },

  async updateUser(id: number, data: UpdateUserDto): Promise<UserDto> {
    return await put<UserDto>(`/user/${id}`, data);
  },

  async deleteUser(id: number): Promise<void> {
    await del(`/users/${id}`);
  },
};