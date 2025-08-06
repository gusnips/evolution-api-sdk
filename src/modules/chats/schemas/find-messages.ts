// Pure TypeScript interfaces for better IDE support and performance
import type { Jid } from "@/types/tags";
import type {
  ContextInfo,
  MessageContent,
  MessageUpdate,
} from "@/types/webhooks";

export interface FindMessagesRequest {
  where: {
    key: {
      id?: string;
      fromMe?: boolean;
      remoteJid?: string;
      participants?: string;
      messageTimestamp?: {
        lte: string;
        gte: string;
      };
    };
  };
  page?: number;
  offset?: number;
}

export interface ResponseMessage {
  id: string;
  key: {
    id: string;
    fromMe: boolean;
    remoteJid: Jid;
    senderLid?: string;
  };
  pushName?: string;
  messageType: string;
  message: MessageContent;
  messageTimestamp: number;
  instanceId: string;
  source: string;
  contextInfo?: ContextInfo | null;
  MessageUpdate: MessageUpdate[];
}

export interface FindMessagesResponse {
  messages: {
    total: number;
    pages: number;
    currentPage: number;
    records: ResponseMessage[];
  };
}

// Backward compatibility aliases
export type FindMessagesOptions = FindMessagesRequest;
export type Message = ResponseMessage;
