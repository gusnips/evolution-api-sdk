// Pure TypeScript interfaces for better IDE support and performance
import type { GroupJid } from "@/types/tags";

export interface SendGroupInviteRequest {
  groupJid: GroupJid;
  /**
   * Text sent before the invite link
   */
  description: string;
  numbers: string[];
}

export interface SendGroupInviteResponse {
  send: true;
  inviteUrl: string;
}
