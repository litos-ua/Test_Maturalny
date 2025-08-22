import { apiClient } from "../api";
import type { UserOptionDto, UpdateUserOptionDto } from "../types";

export const userOptionService = {
  async getUserOptionByUserId(userId: number): Promise<UserOptionDto> {
    const res = await apiClient.get(`/useroption/by-user/${userId}`);
    return res.data;
  },

  async getUserOptionById(id: number): Promise<UserOptionDto> {
    const res = await apiClient.get(`/useroption/${id}`);
    return res.data;
  },

  async updateUserOption(id: number, data: UpdateUserOptionDto): Promise<UserOptionDto> {
    const res = await apiClient.put(`/useroption/${id}`, data);
    return res.data;
  },
};
