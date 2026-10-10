// Pure TypeScript interfaces for better IDE support and performance
import type { Media } from "@/schemas/common";
import type { BaseMessageOptions, SentMessageResponse } from "./base";

// Request interfaces
export interface StickerMessageOptions extends BaseMessageOptions {
  /**
   * Image URL or file in base64
   */
  sticker: Media;
  /**
   * Send the file as it is, without converting it to a sticker
   */
  notConvertSticker?: boolean;
}

// Response interfaces
export type StickerMessageResponse = SentMessageResponse<"stickerMessage">;
