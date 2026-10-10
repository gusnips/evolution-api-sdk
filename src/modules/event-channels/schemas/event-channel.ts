import type { WebhookEventSetup } from "@/types/events";

export type EventChannelName =
  "websocket" | "rabbitmq" | "nats" | "sqs" | "kafka" | "pusher";

export interface SetEventChannelRequest {
  enabled: boolean;
  /**
   * An empty list subscribes to every event. The server fails when this is
   * left out while `enabled` is true
   */
  events: WebhookEventSetup[];
}

export interface EventChannelRecord {
  id: string;
  enabled: boolean;
  events: WebhookEventSetup[];
  createdAt: string | null;
  updatedAt: string;
  instanceId: string;
}

export interface SetPusherRequest extends SetEventChannelRequest {
  appId: string;
  key: string;
  secret: string;
  cluster: string;
  useTLS: boolean;
}

export interface PusherRecord extends EventChannelRecord {
  appId: string;
  key: string;
  secret: string;
  cluster: string;
  useTLS: boolean;
}
