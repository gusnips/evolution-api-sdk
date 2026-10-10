// Pure TypeScript interfaces for better IDE support and performance
import type { LastMessage } from "./common";

export interface ArchiveRequest {
  /**
   * Number or JID of the chat. Its last message is used when `lastMessage` is not set
   */
  chat?: string;
  lastMessage?: LastMessage;
  archive: boolean;
}

export interface ArchiveResponse {
  chatId: string;
  archived: boolean;
}

// Backward compatibility aliases
export type ArchiveOptions = ArchiveRequest;
