import type { WebhookEventSetup } from "@/types/events";

export interface WebhookRecord {
  id: string;
  url: string;
  enabled: boolean | null;
  headers: Record<string, string> | null;
  events: WebhookEventSetup[] | null;
  webhookByEvents: boolean | null;
  webhookBase64: boolean | null;
  createdAt: string | null;
  updatedAt: string;
  instanceId: string;
}

/**
 * `null` when the instance has no webhook yet
 */
export type FindResponse = WebhookRecord | null;
