// Pure TypeScript interfaces for better IDE support and performance
import type { GroupJid } from "@/types/tags";

export interface LeaveRequest {
  groupJid: GroupJid;
}

export interface LeaveResponse {
  groupJid: GroupJid;
  leave: true;
}

// Backward compatibility aliases
export type LeaveOptions = LeaveRequest;
