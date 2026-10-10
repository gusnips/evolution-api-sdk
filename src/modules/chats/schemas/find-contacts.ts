// Pure TypeScript interfaces for better IDE support and performance
import type { Jid } from "@/types/tags";

export interface FindContactsRequest {
  where?: {
    id?: string;
    pushName?: string;
    /**
     * Number or JID
     */
    remoteJid?: string;
  };
  page?: number;
  offset?: number;
}

export interface Contact {
  id: string;
  remoteJid: Jid;
  pushName: string | null;
  profilePicUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  instanceId: string;
  isGroup: boolean;
  isSaved: boolean;
  type: "group" | "contact" | "group_member";
}

export type FindContactsResponse = Contact[];

// Backward compatibility aliases
export type FindContactsOptions = FindContactsRequest;
