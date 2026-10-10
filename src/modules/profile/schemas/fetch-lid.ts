import type { Jid } from "@/types/tags";

export interface FetchLidRequest {
  number: string;
}

export interface FetchLidResponse {
  wuid: Jid;
  /**
   * The contact's LID (WhatsApp's private ID for it). `null` when WhatsApp has not mapped it yet
   */
  lid: string | null;
}
