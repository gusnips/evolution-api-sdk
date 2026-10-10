// Pure TypeScript interfaces for better IDE support and performance
import type { GroupJid } from "@/types/tags";

export interface UpdateSettingRequest {
  groupJid: GroupJid;
  /**
   * - `announcement`: only admins send messages
   * - `not_announcement`: everyone sends messages
   * - `locked`: only admins edit the group info
   * - `unlocked`: everyone edits the group info
   */
  action: "announcement" | "not_announcement" | "locked" | "unlocked";
}

export interface UpdateSettingResponse {
  updateSetting?: unknown;
}

// Backward compatibility aliases
export type UpdateSettingOptions = UpdateSettingRequest;
