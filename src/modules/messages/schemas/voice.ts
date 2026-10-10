// Pure TypeScript interfaces for better IDE support and performance
import type { Media } from "@/schemas/common";
import type { BaseMessageOptions, SentMessageResponse } from "./base";

// Request interfaces
export interface VoiceMessageOptions extends BaseMessageOptions {
  /**
   * Audio URL or file in base64
   */
  audio: Media;
  /**
   * Encode audio into WhatsApp default format (allows audio to be sped up)
   * @default true
   */
  encoding?: boolean;
}

// Response interfaces
export type VoiceMessageResponse = SentMessageResponse<"audioMessage">;
