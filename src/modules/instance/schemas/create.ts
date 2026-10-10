import type { WebhookEventSetup } from "@/types/events";
import type { QrCodeResponse } from "./connect";

export type Integration =
  "WHATSAPP-BAILEYS" | "WHATSAPP-BUSINESS" | "EVOLUTION" | "EVOHUB";

/**
 * An empty `events` list subscribes to every event
 */
export interface EventChannelConfig {
  events: WebhookEventSetup[];
}

export interface WebhookConfig extends EventChannelConfig {
  url: string;
  headers?: Record<string, string>;
  byEvents?: boolean;
  base64?: boolean;
}

export interface PusherConfig extends EventChannelConfig {
  appId: string;
  key: string;
  secret: string;
  cluster: string;
  useTLS?: boolean;
}

export interface CreateInstanceRequest {
  instanceName: string;
  /**
   * API key of this instance. The server makes one when you leave it out.
   * Required for `WHATSAPP-BUSINESS` and `EVOHUB`
   */
  token?: string;
  /**
   * The server answers "Invalid integration" when this is missing
   */
  integration: Integration;
  /**
   * Return the QR code in the response (`WHATSAPP-BAILEYS` only).
   * The server waits 5 seconds for it
   */
  qrcode?: boolean;
  /**
   * Phone number with country code. Required for `WHATSAPP-BUSINESS`
   */
  number?: string;
  /**
   * Meta Business account ID (`WHATSAPP-BUSINESS` only)
   */
  businessId?: string;

  // Settings
  rejectCall?: boolean;
  msgCall?: string;
  groupsIgnore?: boolean;
  alwaysOnline?: boolean;
  readMessages?: boolean;
  readStatus?: boolean;
  syncFullHistory?: boolean;
  wavoipToken?: string;

  // Proxy. Set host, port and protocol together, and send an empty string for
  // the username and password when there is no login. The server tests the
  // proxy and rejects the request when that fails
  proxyHost?: string;
  proxyPort?: string;
  proxyProtocol?: "http" | "socks" | "socks5";
  proxyUsername?: string;
  proxyPassword?: string;

  // Event channels
  webhook?: WebhookConfig;
  websocket?: EventChannelConfig;
  rabbitmq?: EventChannelConfig;
  nats?: EventChannelConfig;
  sqs?: EventChannelConfig;
  pusher?: PusherConfig;
  kafka?: EventChannelConfig;

  /**
   * Chatwoot is set up only when `chatwootAccountId`, `chatwootToken` and
   * `chatwootUrl` are all present. Then `chatwootSignMsg`,
   * `chatwootReopenConversation` and `chatwootConversationPending` are required
   */
  chatwootAccountId?: string;
  chatwootToken?: string;
  chatwootUrl?: string;
  chatwootSignMsg?: boolean;
  chatwootReopenConversation?: boolean;
  chatwootConversationPending?: boolean;
  chatwootImportContacts?: boolean;
  chatwootNameInbox?: string;
  chatwootMergeBrazilContacts?: boolean;
  chatwootImportMessages?: boolean;
  chatwootDaysLimitImportMessages?: number;
  chatwootOrganization?: string;
  chatwootLogo?: string;
  chatwootAutoCreate?: boolean;
}

export interface CreatedInstance {
  instanceName: string;
  instanceId: string;
  integration: Integration;
  /**
   * Set only for `WHATSAPP-BUSINESS`: the URL to give Meta as the webhook
   */
  webhookWaBusiness: string | null;
  accessTokenWaBusiness: string;
  status: string;
}

export interface CreatedInstanceSettings {
  rejectCall: boolean;
  msgCall: string;
  groupsIgnore: boolean;
  alwaysOnline: boolean;
  readMessages: boolean;
  readStatus: boolean;
  syncFullHistory: boolean;
  wavoipToken: string;
}

export interface CreatedInstanceChatwoot {
  enabled: true;
  accountId: string;
  token: string;
  url: string;
  signMsg: boolean;
  reopenConversation: boolean;
  conversationPending: boolean;
  mergeBrazilContacts: boolean;
  importContacts: boolean;
  importMessages: boolean;
  daysLimitImportMessages: number;
  number?: string;
  nameInbox: string;
  webhookUrl: string;
}

export interface CreateInstanceResponse {
  instance: CreatedInstance;
  /**
   * The API key of the new instance
   */
  hash: string;
  webhook: {
    webhookUrl?: string;
    webhookHeaders?: Record<string, string>;
    webhookByEvents?: boolean;
    webhookBase64?: boolean;
  };
  websocket: { enabled?: boolean };
  rabbitmq: { enabled?: boolean };
  nats: { enabled?: boolean };
  sqs: { enabled?: boolean };
  settings: CreatedInstanceSettings;
  /**
   * Present when you asked for `qrcode` on a `WHATSAPP-BAILEYS` instance.
   * Empty if the code was not ready after the 5 second wait: call `connect`
   */
  qrcode?: QrCodeResponse;
  /**
   * Present when Chatwoot was set up
   */
  chatwoot?: CreatedInstanceChatwoot;
}
