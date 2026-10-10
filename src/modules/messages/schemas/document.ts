// Pure TypeScript interfaces for better IDE support and performance
import type { SentMessageResponse } from "./base";
import type { MediaMessageOptions } from "./media";

// Request interfaces
export interface DocumentMessageOptions extends MediaMessageOptions {}

// Response interfaces
export type DocumentMessageResponse = SentMessageResponse<"documentMessage">;
