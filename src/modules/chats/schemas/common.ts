export interface MessageKey {
  id: string;
  fromMe: boolean;
  remoteJid: string;
}

export interface LastMessage {
  key: MessageKey;
  /**
   * Unix time of the message. Defaults to now
   */
  messageTimestamp?: number;
}

/**
 * The message WhatsApp returns after an edit or a delete
 */
export interface SentMessage {
  key: MessageKey & { participant?: string };
  message?: Record<string, unknown>;
  messageTimestamp?: number | string;
  status?: string;
}
