// Pure TypeScript interfaces for better IDE support and performance
import type { MessageKey, SentMessage } from "./common";

export interface DeleteMessageRequest extends MessageKey {
  /**
   * Sender of the message. Needed to delete a member's message in a group
   */
  participant?: string;
}

export type DeleteMessageResponse = SentMessage;

// Backward compatibility aliases
export type DeleteMessageOptions = DeleteMessageRequest;
