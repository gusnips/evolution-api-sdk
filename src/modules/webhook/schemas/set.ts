import { WebhookEventSetup } from "@/types/events";
// Pure TypeScript interfaces for better IDE support and performance
export interface SetRequest {
  enabled: boolean;
  url: string;
  webhookByEvents: boolean;
  webhookBase64: boolean;
  events: WebhookEventSetup[];
}

export interface SetResponse {
  message: string;
}

// Backward compatibility aliases
export type SetOptions = SetRequest;
