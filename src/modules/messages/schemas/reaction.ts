// Pure TypeScript interfaces for better IDE support and performance
import type { ChatId, MessageId } from "@/types/tags";
import type { SentMessageResponse } from "./base";

export interface ReactionMessageOptions {
  /**
   * The message to react to
   */
  key: {
    remoteJid: ChatId;
    fromMe: boolean;
    id: MessageId;
  };
  /**
   * The emoji. An empty text removes your reaction
   */
  reaction: string;
}

export type ReactionMessageResponse = SentMessageResponse<"reactionMessage">;
