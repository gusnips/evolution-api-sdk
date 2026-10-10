// Pure TypeScript interfaces for better IDE support and performance
import type { BaseMessageOptions, SentMessageResponse } from "./base";

// Request interfaces
export interface TextMessageOptions extends BaseMessageOptions {
  /**
   * Message text content
   */
  text: string;
}

// Response interfaces
export type TextMessageResponse = SentMessageResponse<"conversation">;
