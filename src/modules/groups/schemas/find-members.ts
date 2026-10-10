// Pure TypeScript interfaces for better IDE support and performance
import type { GroupJid } from "@/types/tags";
import type { ParticipantResponse } from "./common";

export interface FindMembersRequest {
  groupJid: GroupJid;
}

export interface Member extends ParticipantResponse {
  name?: string;
  imgUrl?: string | null;
}

export interface FindMembersResponse {
  participants: Member[];
}
