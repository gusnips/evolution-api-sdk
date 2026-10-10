import type { GroupJid } from "@/types/tags";

export interface UpdateMemberAddModeRequest {
  groupJid: GroupJid;
  /**
   * Who can add new members: only admins or every member
   */
  mode: "admin_add" | "all_member_add";
}

export interface UpdateMemberAddModeResponse {
  update: "success";
  mode: UpdateMemberAddModeRequest["mode"];
}
