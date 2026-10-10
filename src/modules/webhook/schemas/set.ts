import type { WebhookEventSetup } from "@/types/events";
import type { WebhookRecord } from "./find";

export interface SetRequest {
  webhook: {
    enabled: boolean;
    url: string;
    headers?: Record<string, string>;
    byEvents?: boolean;
    base64?: boolean;
    /**
     * An empty list subscribes to every event
     */
    events: WebhookEventSetup[];
  };
}

export type SetResponse = WebhookRecord;

// Backward compatibility aliases
export type SetOptions = SetRequest;
