// Pure TypeScript interfaces for better IDE support and performance
import type { GroupInviteCode, GroupJid } from "@/types/tags";

export interface AcceptInviteCodeRequest {
  inviteCode: GroupInviteCode;
}

export interface AcceptInviteCodeResponse {
  accepted: true;
  groupJid: GroupJid;
}
