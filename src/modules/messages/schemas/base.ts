// Pure TypeScript interfaces for better IDE support and performance
import type { ContextInfo, MessageContent } from "@/types/webhooks";

export interface QuotedMessage {
  key: {
    id: string;
    remoteJid?: string;
    fromMe?: boolean;
  };
  /**
   * Content of the message you reply to. WhatsApp shows it inside the reply
   */
  message?: {
    conversation?: string;
    [messageType: string]: unknown;
  };
}

export interface BaseMessageOptions {
  /**
   * Number (with country code) or JID to receive the message
   */
  number: string;
  /**
   * Time in milliseconds before sending message
   */
  delay?: number;
  /**
   * Message to reply to
   */
  quoted?: QuotedMessage;
  /**
   * Whether link preview should be shown
   */
  linkPreview?: boolean;
  /**
   * Mention every member of the group
   */
  mentionsEveryOne?: boolean;
  /**
   * Numbers to mention
   */
  mentioned?: string[];
  /**
   * ID to give the message. WhatsApp generates one when not set
   */
  messageId?: string;
}

/**
 * What every send endpoint returns: the message as the API saved it.
 * `Content` marks the keys of `message` that the endpoint always fills
 */
export interface SentMessageResponse<
  Content extends keyof MessageContent = never,
> {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  pushName: string;
  status: string;
  message: MessageContent & Required<Pick<MessageContent, Content>>;
  contextInfo?: ContextInfo | null;
  messageType: string;
  messageTimestamp: number;
  instanceId: string;
  source: string;
}
