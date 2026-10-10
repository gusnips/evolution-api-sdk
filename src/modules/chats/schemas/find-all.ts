// Pure TypeScript interfaces for better IDE support and performance
import type { GroupJid, Jid } from "@/types/tags";
import type { ContextInfo, MessageContent } from "@/types/webhooks";

export interface FindAllChatsResponseItem {
  /**
   * ID of the saved contact. `null` when the chat is not a saved contact
   */
  id: string | null;
  remoteJid: GroupJid | Jid;
  /**
   * Contact name, or the group name for a group
   */
  pushName: string | null;
  profilePicUrl: string | null;
  updatedAt: string | null;
  /**
   * The 24 hour window to answer, counted from the creation of the chat
   */
  windowStart: string | null;
  windowExpires: string | null;
  windowActive: boolean | null;
  lastMessage?: {
    id: string;
    key: { id: string; fromMe: boolean; remoteJid: string };
    pushName: string | null;
    participant: string | null;
    messageType: string;
    message: MessageContent;
    contextInfo: ContextInfo | null;
    source: string;
    messageTimestamp: number;
    instanceId: string;
    sessionId: string | null;
    status: string | null;
  };
  unreadCount: number | null;
  isSaved: boolean;
}

export type FindAllChatsResponse = FindAllChatsResponseItem[];
