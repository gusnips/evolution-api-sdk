// Pure TypeScript interfaces for better IDE support and performance
import type { Media } from "@/schemas/common";
import type { SentMessageResponse } from "./base";

export interface StatusMessageOptions {
  type: "text" | "image" | "audio" | "video";
  /**
   * The text for a `text` status. A URL or a file in base64 for the other types
   */
  content: Media | string;
  caption?: string;
  /**
   * Background of a `text` status, as a hex color
   */
  backgroundColor?: string;
  /**
   * Font of a `text` status, from 0 to 5
   */
  font?: number;
  /**
   * Numbers that see the status. Leave empty to use `allContacts`
   */
  statusJidList?: string[];
  /**
   * Show the status to every contact
   */
  allContacts?: boolean;
}

export type StatusMessageResponse = SentMessageResponse;
