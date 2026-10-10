// Pure TypeScript interfaces for better IDE support and performance
import type { MessageKey } from "./common";

export interface MarkAsReadRequest {
  readMessages: MessageKey[];
}

export interface MarkAsReadResponse {
  message: string;
  read: "success";
}

// Backward compatibility aliases
export type MarkAsReadOptions = MarkAsReadRequest;
