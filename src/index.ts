export * from "./types/webhooks";

import { ApiService } from "./api/service";
import {
  ChatsModule,
  GroupsModule,
  InstanceModule,
  MessagesModule,
  ProfileModule,
  SettingsModule,
  WebhookModule,
} from "./modules";
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
export type { ClientOptions };

// API types
export { APIRequestInit, MethodOptions } from "./types/api";
export { MessageUpdateStatus } from "./types/messages";
export { ChatId, GroupJid, Jid, MessageId } from "./types/tags";
export * from "./types/webhooks";
export { WebhookEvent, WebhookEventSetup } from "./types/events";
