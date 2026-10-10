// Pure TypeScript interfaces for better IDE support and performance
import type { GroupJid } from "@/types/tags";

export interface UpdateDescriptionRequest {
  groupJid: GroupJid;
  description: string;
}

export interface UpdateDescriptionResponse {
  update: "success";
}
