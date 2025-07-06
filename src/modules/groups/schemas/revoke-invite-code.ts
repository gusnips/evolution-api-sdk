// Pure TypeScript interfaces for better IDE support and performance
import type { GroupJid } from "@/types/tags";

export interface RevokeInviteCodeRequest {
  groupJid: GroupJid;
}

export interface RevokeInviteCodeResponse {
  status: string;
  code: string;
}

// Backward compatibility aliases
export type RevokeInviteCodeOptions = RevokeInviteCodeRequest; 