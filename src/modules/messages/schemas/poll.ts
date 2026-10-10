// Pure TypeScript interfaces for better IDE support and performance
import type { BaseMessageOptions, SentMessageResponse } from "./base";

// Request interfaces
export interface PollMessageOptions extends BaseMessageOptions {
  /**
   * Name of the poll
   */
  name: string;
  /**
   * How many options each person can pick, from 0 to 10
   */
  selectableCount: number;
  /**
   * Poll options, from 2 to 10 different ones
   */
  values: string[];
}

// Response interfaces
export type PollMessageResponse = SentMessageResponse<"pollCreationMessageV3">;
