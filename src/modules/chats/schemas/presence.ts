// Pure TypeScript interfaces for better IDE support and performance

/**
 * Options for presence configuration
 */
export interface PresenceOptions {
  /**
   * Delay of the presence in milliseconds
   */
  delay: number;
  /**
   * Presence state
   * - `composing`: typing a message
   * - `recording`: recording an audio
   */
  presence: "composing" | "recording";
  /**
   * Chat number or JID to receive the presence
   */
  number: string;
}
/**
 * Input parameters for the presence method (excluding number)
 */
export interface PresenceParams {
  /**
   * Delay of the presence in milliseconds
   */
  delay: number;
  /**
   * Presence state
   * - `composing`: typing a message
   * - `recording`: recording an audio
   */
  presence: "composing" | "recording";
  /**
   * Whether to wait until the presence is finished (duration)
   * @deprecated This parameter is not used by the Evolution API
   */
  waitUntilFinish?: boolean;
}

// Legacy compatibility - keeping PresenceBody for backward compatibility
export interface PresenceBody {
  number: string;
  presence: "composing" | "recording";
  delay: number;
}
