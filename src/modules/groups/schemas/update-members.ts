// Pure TypeScript interfaces for better IDE support and performance
import type { GroupJid, Jid } from "@/types/tags";

export interface UpdateMembersRequest {
  groupJid: GroupJid;
  participants: Jid[];
  action: "add" | "remove" | "promote" | "demote";
}

export interface Participant {
  /**
   * HTTP-like code, "200" when it worked for this participant
   */
  status: string;
  jid?: Jid;
}

export interface UpdateMembersResponse {
  updateParticipants: Participant[];
}
