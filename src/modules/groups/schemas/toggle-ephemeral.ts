// Pure TypeScript interfaces for better IDE support and performance
import type { GroupJid } from "@/types/tags";

export interface ToggleEphemeralRequest {
  groupJid: GroupJid;
  /**
   * Seconds until messages disappear: 1 day, 7 days or 90 days. 0 turns it off
   */
  expiration: 0 | 86400 | 604800 | 7776000;
}

export interface ToggleEphemeralResponse {
  success: true;
}
