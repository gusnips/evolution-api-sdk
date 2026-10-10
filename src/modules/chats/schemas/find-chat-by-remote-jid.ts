import type { ChatId, GroupJid, Jid } from "@/types/tags";

export interface FindChatByRemoteJidRequest {
  remoteJid: Jid | GroupJid;
}

/**
 * `null` when the instance has no chat with that JID
 */
export type FindChatByRemoteJidResponse = {
  id: ChatId;
  remoteJid: Jid | GroupJid;
  name: string | null;
  labels: string[] | null;
  createdAt: string | null;
  updatedAt: string | null;
  instanceId: string;
  unreadMessages: number;
} | null;
