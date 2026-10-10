// Pure TypeScript interfaces for better IDE support and performance
import type { GroupJid } from "@/types/tags";

export interface ParticipantResponse {
  id: string;
  phoneNumber?: string;
  lid?: string;
  admin?: "admin" | "superadmin" | null;
}

export interface GroupResponse {
  id: GroupJid;
  subject: string;
  subjectOwner?: string;
  subjectTime?: number;
  pictureUrl: string | null;
  size: number;
  creation?: number;
  owner?: string;
  desc?: string;
  descId?: string;
  restrict?: boolean;
  announce?: boolean;
  isCommunity?: boolean;
  isCommunityAnnounce?: boolean;
  linkedParent?: string;
}

export interface GroupWithParticipantsResponse extends GroupResponse {
  participants: ParticipantResponse[];
}

/**
 * Group as WhatsApp reports it. It has no picture
 */
export interface GroupMetadataResponse extends Omit<
  GroupWithParticipantsResponse,
  "pictureUrl"
> {
  joinApprovalMode?: boolean;
  memberAddMode?: boolean;
}
