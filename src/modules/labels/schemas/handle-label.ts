import type { Jid } from "@/types/tags";

export interface HandleLabelRequest {
  /**
   * Phone number with country code. The server checks it is on WhatsApp first
   */
  number: string;
  labelId: string;
  action: "add" | "remove";
}

export type HandleLabelResponse =
  | { numberJid: Jid; labelId: string; add: true }
  | { numberJid: Jid; labelId: string; remove: true };
