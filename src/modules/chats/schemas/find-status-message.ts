// Pure TypeScript interfaces for better IDE support and performance
import type { MessageUpdateStatus } from "@/types/messages";

export interface FindStatusMessageRequest {
  where?: {
    remoteJid?: string;
    /**
     * ID of the message
     */
    id?: string;
  };
  page?: number;
  offset?: number;
}

export interface StatusMessage {
  id: string;
  keyId: string;
  remoteJid: string;
  fromMe: boolean;
  participant: string | null;
  pollUpdates: unknown | null;
  status: MessageUpdateStatus;
  messageId: string;
  instanceId: string;
}

export type FindStatusMessageResponse = StatusMessage[];

// Backward compatibility aliases
export type FindStatusMessageOptions = FindStatusMessageRequest;
