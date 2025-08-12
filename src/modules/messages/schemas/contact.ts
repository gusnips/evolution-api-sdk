// Pure TypeScript interfaces for better IDE support and performance
import { BaseMessageOptions } from "./base";

// Response interface from API (no transformer)
export interface ContactMessageResponse {
  key: {
    remoteJid: string;
    fromMe?: boolean;
    id: string;
  };
  message: {
    contactMessage?: {
      displayName: string;
      vcard: string;
      contextInfo?: Record<string, unknown>;
    };
    contactsArrayMessage?: {
      contacts: {
        displayName: string;
        vcard: string;
      }[];
    };
  };
  messageTimestamp: string | number | Date;
  status?: string;
}

// Request interfaces
export interface Contact {
  /**
   * Contact display name
   */
  fullName?: string;
  /**
   * Contact phone number
   */
  phoneNumber: string;
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

export type ContactMessageContact = Omit<Contact, "fullName"> & {
  /**
   * Contact display name
   */
  fullName?: string;
  /**
   * WhatsApp user id (JID or WUID)
   */
  wuid: string;
};

export interface ContactMessageOptions extends BaseMessageOptions {
  /**
   * Contact list
   */
  contact: [ContactMessageContact, ...ContactMessageContact[]];
}

// No additional response typing; API returns raw shape above
