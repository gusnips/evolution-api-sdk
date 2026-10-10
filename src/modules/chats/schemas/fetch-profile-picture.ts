// Pure TypeScript interfaces for better IDE support and performance
import type { ChatId, Jid } from "@/types/tags";

export interface FetchProfilePictureRequest {
  number: ChatId;
}

export interface FetchProfilePictureResponse {
  wuid: Jid;
  /**
   * `null` when the contact has no picture or hides it
   */
  profilePictureUrl: string | null;
}
