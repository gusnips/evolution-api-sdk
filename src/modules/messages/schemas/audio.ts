// Pure TypeScript interfaces for better IDE support and performance
import type { SentMessageResponse } from "./base";
import type { MediaMessageOptions } from "./media";

// Request interfaces
export interface AudioMessageOptions extends MediaMessageOptions {}

// Response interfaces
export type AudioMessageResponse = SentMessageResponse<"audioMessage">;
