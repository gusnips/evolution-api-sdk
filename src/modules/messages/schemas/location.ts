// Pure TypeScript interfaces for better IDE support and performance
import type { BaseMessageOptions, SentMessageResponse } from "./base";

// Request interfaces
export interface LocationMessageOptions extends BaseMessageOptions {
  /**
   * Location name
   */
  name: string;
  /**
   * Location address
   */
  address: string;
  /**
   * Location latitude
   */
  latitude: number;
  /**
   * Location longitude
   */
  longitude: number;
}

// Response interfaces
export type LocationMessageResponse = SentMessageResponse<"locationMessage">;
