import { Jid } from "@/types/tags";
import { ConnectionState } from "@/types/webhooks";

export interface Setting {
  id: string;
  rejectCall: boolean;
  msgCall: string;
  groupsIgnore: boolean;
  alwaysOnline: boolean;
  readMessages: boolean;
  readStatus: boolean;
  syncFullHistory: boolean;
  wavoipToken: string;
  createdAt: string;
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
  ownerJid: Jid;
  profileName: string;
  profilePicUrl: string | null;
  profileStatus?: string;
  integration: string;
  number: string | null;
  businessId: string | null;
  token: string;
  clientName: string;
  disconnectionReasonCode: string | number | null;
  disconnectionObject: unknown | null;
  disconnectionAt: string | null;
  createdAt: string;
  updatedAt: string;
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

export interface FetchAllRequest {
  instanceName?: string;
}
