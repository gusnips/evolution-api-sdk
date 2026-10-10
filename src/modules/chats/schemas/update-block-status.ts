import type { ChatId } from "@/types/tags";

export interface UpdateBlockStatusRequest {
  number: ChatId;
  status: "block" | "unblock";
}

export interface UpdateBlockStatusResponse {
  block: "success";
}
