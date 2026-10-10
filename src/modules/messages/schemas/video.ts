// Pure TypeScript interfaces for better IDE support and performance
import type { SentMessageResponse } from "./base";
import type { MediaMessageOptions } from "./media";

// Request interfaces
export interface VideoMessageOptions extends MediaMessageOptions {
  /**
   * Send the video as a looping GIF, without converting it
   * @default false
   */
  gifPlayback?: boolean;
  /**
   * Where the GIF comes from: 0 none, 1 Giphy, 2 Tenor
   */
  gifAttribution?: 0 | 1 | 2;
}

// Response interfaces
export type VideoMessageResponse = SentMessageResponse<"videoMessage">;
