// Pure TypeScript interfaces for better IDE support and performance
import type { GroupJid } from "@/types/tags";

export interface UpdatePictureRequest {
  groupJid: GroupJid;
  /**
   * Image URL or file in base64
   */
  image: string;
}

export interface UpdatePictureResponse {
  update: "success";
}

// Backward compatibility aliases
export type UpdatePictureOptions = UpdatePictureRequest;
