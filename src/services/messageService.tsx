import { apiClient } from "../api/apiClient"; 
import type { MessageDto, ThreadSummary } from "../types";

export const messageService = {
  async getInbox(page = 1, pageSize = 20) {
    const res = await apiClient.get<MessageDto[]>(`/messages/inbox/paged`, {
      params: { page, pageSize },
    });
    return res.data;
  },

  async getConversation(withUserId: number, page = 1, pageSize = 30) {
    const res = await apiClient.get<MessageDto[]>(
      `/messages/conversation/${withUserId}/paged`,
      { params: { page, pageSize } }
    );
    return res.data;
  },

  async sendMessage(receiverId: number, content: string) {
    const res = await apiClient.post<MessageDto>(`/messages`, {
      receiverId,
      content,
    });
    return res.data;
  },

  async markAsRead(messageId: number) {
    await apiClient.put(`/messages/${messageId}/read`);
  },

  async deleteMessage(messageId: number) {
    await apiClient.delete(`/messages/${messageId}`);
  },
};
