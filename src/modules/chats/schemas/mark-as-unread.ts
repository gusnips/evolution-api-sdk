import type { LastMessage } from "./common";

export interface MarkAsUnreadRequest {
  /**
   * Number or JID of the chat. Its last message is used when `lastMessage` is not set
   */
  chat?: string;
  lastMessage?: LastMessage;
}

export interface MarkAsUnreadResponse {
  chatId: string;
  markedChatUnread: boolean;
}
