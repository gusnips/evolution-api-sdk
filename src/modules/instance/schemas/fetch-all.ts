import type { Jid } from "@/types/tags";
import type { ConnectionState } from "@/types/webhooks";

export interface Setting {
  id: string;
  rejectCall: boolean;
  msgCall: string | null;
  groupsIgnore: boolean;
  alwaysOnline: boolean;
  readMessages: boolean;
  readStatus: boolean;
  syncFullHistory: boolean;
  wavoipToken: string | null;
  createdAt: string | null;
  updatedAt: string;
  instanceId: string;
}

export interface Count {
  Message: number;
  Contact: number;
  Chat: number;
}

export interface InstanceDetails {
  id: string;
  name: string;
  connectionStatus: ConnectionState;
  ownerJid: Jid | null;
  profileName: string | null;
  profilePicUrl: string | null;
  integration: string | null;
  number: string | null;
  businessId: string | null;
  token: string | null;
  clientName: string | null;
  disconnectionReasonCode: number | null;
  disconnectionObject: unknown | null;
  disconnectionAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  Chatwoot: unknown | null;
  Proxy: unknown | null;
  Rabbitmq: unknown | null;
  Nats: unknown | null;
  Sqs: unknown | null;
  Websocket: unknown | null;
  Setting: Setting | null;
  _count: Count;
}

export type FetchAllResponse = InstanceDetails[];

/**
 * Send one filter at most. `instanceId` and `number` win over `instanceName`.
 * With the global API key and no filter you get every instance
 */
export interface FetchAllRequest {
  instanceName?: string;
  instanceId?: string;
  number?: string;
}
