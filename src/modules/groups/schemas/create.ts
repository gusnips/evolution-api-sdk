// Pure TypeScript interfaces for better IDE support and performance
import type { ChatId } from "@/types/tags";
import type { GroupMetadataResponse } from "./common";

export interface CreateGroupRequest {
  subject: string;
  /**
   * Numbers that are not on WhatsApp are skipped
   */
  participants: ChatId[];
  description?: string;
  /**
   * Make every participant an admin
   */
  promoteParticipants?: boolean;
}

export type CreateGroupResponse = GroupMetadataResponse;
