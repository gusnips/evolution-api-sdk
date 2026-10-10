import type { MessageKey } from "./common";

export interface MarkAsPlayedRequest {
  /**
   * Audio messages received from a contact. Shows the blue microphone
   */
  playedMessages: MessageKey[];
}

export interface MarkAsPlayedResponse {
  message: string;
  played: "success";
}
