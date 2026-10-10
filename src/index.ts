export * from "./types/webhooks";

import { Routes } from "./api/routes";
import { ApiService } from "./api/service";
import {
  BusinessModule,
  ChatsModule,
  EventChannelModule,
  GroupsModule,
  InstanceModule,
  LabelsModule,
  LicenseModule,
  MessagesModule,
  ProfileModule,
  ProxyModule,
  SettingsModule,
  TemplatesModule,
  WebhookModule,
} from "./modules";
import type {
  PusherRecord,
  SetPusherRequest,
} from "./modules/event-channels/schemas";
import { type ClientOptions } from "./schemas/client";

export class EvolutionClient {
  /**
   * API service for directly interacting with the Evolution API (no specific typings)
   */
  public readonly api: ApiService;

  /**
   * Find and manage chats, send presences and check numbers
   */
  public readonly chats: ChatsModule;
  /**
   * Find and manage groups
   */
  public readonly groups: GroupsModule;
  /**
   * Send messages
   */
  public readonly messages: MessagesModule;
  /**
   * Create and manage instances
   */
  public readonly instances: InstanceModule;
  /**
   * Manage profile settings
   */
  public readonly profile: ProfileModule;
  /**
   * Manage webhooks
   */
  public readonly webhook: WebhookModule;
  /**
   * Manage settings
   */
  public readonly settings: SettingsModule;
  /**
   * Add labels to chats (`WHATSAPP-BAILEYS` only)
   */
  public readonly labels: LabelsModule;
  /**
   * Set the proxy of an instance
   */
  public readonly proxy: ProxyModule;
  /**
   * Manage Meta message templates (`WHATSAPP-BUSINESS` only)
   */
  public readonly templates: TemplatesModule;
  /**
   * Read the catalog and collections of a business account
   */
  public readonly business: BusinessModule;
  /**
   * Send the events of an instance to a WebSocket
   */
  public readonly websocket: EventChannelModule;
  /**
   * Send the events of an instance to RabbitMQ
   */
  public readonly rabbitmq: EventChannelModule;
  /**
   * Send the events of an instance to NATS
   */
  public readonly nats: EventChannelModule;
  /**
   * Send the events of an instance to Amazon SQS
   */
  public readonly sqs: EventChannelModule;
  /**
   * Send the events of an instance to Kafka
   */
  public readonly kafka: EventChannelModule;
  /**
   * Send the events of an instance to Pusher
   */
  public readonly pusher: EventChannelModule<SetPusherRequest, PusherRecord>;
  /**
   * Check and finish the activation of an Evolution API 2.4 server
   */
  public readonly license: LicenseModule;

  /**
   * Evolution Client - API client for interacting with the Evolution API
   * @param options - Client options
   */
  constructor(public options: ClientOptions) {
    this.api = new ApiService(options);
    this.chats = new ChatsModule(this.api);
    this.groups = new GroupsModule(this.api);
    this.messages = new MessagesModule(this.api);
    this.instances = new InstanceModule(this.api);
    this.profile = new ProfileModule(this.api);
    this.webhook = new WebhookModule(this.api);
    this.settings = new SettingsModule(this.api);
    this.labels = new LabelsModule(this.api);
    this.proxy = new ProxyModule(this.api);
    this.templates = new TemplatesModule(this.api);
    this.business = new BusinessModule(this.api);
    this.websocket = new EventChannelModule(
      this.api,
      "websocket",
      Routes.Websocket,
    );
    this.rabbitmq = new EventChannelModule(
      this.api,
      "rabbitmq",
      Routes.Rabbitmq,
    );
    this.nats = new EventChannelModule(this.api, "nats", Routes.Nats);
    this.sqs = new EventChannelModule(this.api, "sqs", Routes.Sqs);
    this.kafka = new EventChannelModule(this.api, "kafka", Routes.Kafka);
    this.pusher = new EventChannelModule<SetPusherRequest, PusherRecord>(
      this.api,
      "pusher",
      Routes.Pusher,
    );
    this.license = new LicenseModule(this.api);
  }

  setInstance(instance: string) {
    this.options.instance = instance;
    this.api.setInstance(instance);
  }
}

export { EvolutionApiError } from "./api/errors";
export { phoneNumberFromJid } from "./utils/phone-numer-from-jid";

export type * from "./modules/chats/schemas";
export type * from "./modules/groups/schemas";
export type * from "./modules/messages/schemas";
export type * from "./modules/instance/schemas";
export type * from "./modules/profile/schemas";
export type * from "./modules/webhook/schemas";
export type * from "./modules/settings/schemas";
export type * from "./modules/labels/schemas";
export type * from "./modules/proxy/schemas";
export type * from "./modules/templates/schemas";
export type * from "./modules/business/schemas";
export type * from "./modules/event-channels/schemas";
export type * from "./modules/license/schemas";
export type { ClientOptions };

// API types
export { APIRequestInit, MethodOptions } from "./types/api";
export { MessageUpdateStatus } from "./types/messages";
export {
  ChatId,
  GroupInviteCode,
  GroupJid,
  Jid,
  MessageId,
} from "./types/tags";
export * from "./types/webhooks";
export { WebhookEvent, WebhookEventSetup } from "./types/events";
