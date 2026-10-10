// Pure TypeScript interfaces for better IDE support and performance
import type { Media } from "@/schemas/common";
import type { BaseMessageOptions } from "./base";

export interface MediaMessageOptions extends BaseMessageOptions {
  mediatype: "audio" | "image" | "video" | "document";
  mimetype?: string;
  caption?: string;
  /**
   * File URL or file in base64
   */
  media: Media;
  /**
   * Name shown for a document
   */
  fileName?: string;
}
