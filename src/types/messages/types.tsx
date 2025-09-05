export interface MessageDto {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  sentAt: string;
  readAt?: string | null;
}

export interface ThreadSummary {
  withUser: {
    id: number;
    username: string;
    avatarUrl?: string;
  };
  lastMessage: MessageDto;
  unreadCount: number;
}
