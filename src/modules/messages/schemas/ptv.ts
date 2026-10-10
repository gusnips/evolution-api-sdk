import type { Media } from "@/schemas/common";
import type { BaseMessageOptions, SentMessageResponse } from "./base";

export interface PtvMessageOptions extends BaseMessageOptions {
  /**
   * Video URL or file in base64. Shows as a round video message
   */
  video: Media;
}

export type PtvMessageResponse = SentMessageResponse<"ptvMessage">;
