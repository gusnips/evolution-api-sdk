// Pure TypeScript interfaces for better IDE support and performance

/**
 * Presence state
 * - `composing`: typing a message
 * - `recording`: recording an audio
 * - `paused`: stopped typing or recording
 * - `available` and `unavailable`: online and offline
 */
export type PresenceState =
  | "unavailable"
  | "available"
  | "composing"
  | "recording"
  | "paused";

/**
 * Options for presence configuration
 */
export interface PresenceOptions {
  /**
   * Delay of the presence in milliseconds
   */
  delay: number;
  presence: PresenceState;
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
  presence: PresenceState;
  /**
   * Whether to wait until the presence is finished (duration)
   * @deprecated This parameter is not used by the Evolution API
   */
  waitUntilFinish?: boolean;
}
