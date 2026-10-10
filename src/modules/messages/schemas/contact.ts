// Pure TypeScript interfaces for better IDE support and performance
import type { BaseMessageOptions, SentMessageResponse } from "./base";

// Request interfaces
export interface ContactMessageContact {
  /**
   * Contact display name
   */
  fullName: string;
  /**
   * Contact phone number
   */
  phoneNumber: string;
  /**
   * WhatsApp user id (JID or WUID)
   */
  wuid?: string;
  /**
   * Contact organization
   */
  organization?: string;
  /**
   * Contact email
   */
  email?: string;
  /**
   * Contact website url
   */
  url?: string;
}

export interface ContactMessageOptions extends BaseMessageOptions {
  /**
   * Contact list
   */
  contact: [ContactMessageContact, ...ContactMessageContact[]];
}

// Response interfaces
export type ContactMessageResponse = SentMessageResponse;
