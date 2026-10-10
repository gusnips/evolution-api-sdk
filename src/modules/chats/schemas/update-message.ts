// Pure TypeScript interfaces for better IDE support and performance
import type { ChatId } from "@/types/tags";
import type { MessageKey, SentMessage } from "./common";

export interface UpdateMessageRequest {
  number: ChatId;
  key: MessageKey;
  /**
   * New text, or new caption for an image or a video
   */
  text: string;
}

export type UpdateMessageResponse = SentMessage;
