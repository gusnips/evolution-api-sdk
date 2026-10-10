import type { ApiService } from "@/api/service";
import type { MethodOptions } from "@/types/api";

import type {
  EventChannelName,
  EventChannelRecord,
  SetEventChannelRequest,
} from "./schemas/event-channel";

/**
 * Sends the events of an instance to a WebSocket, RabbitMQ, NATS, SQS, Kafka
 * or Pusher. Webhooks have their own module.
 *
 * The channel has to be switched on in the server first (`RABBITMQ_ENABLED=true`
 * and so on). When it is not, the server answers with an empty body, which the
 * SDK reports as a "Network or parsing error".
 */
export class EventChannelModule<
  Request extends SetEventChannelRequest = SetEventChannelRequest,
  Saved extends EventChannelRecord = EventChannelRecord,
> {
  constructor(
    private readonly api: ApiService,
    private readonly channel: EventChannelName,
    private readonly routes: { Set: string; Find: string },
  ) {}

  /**
   * Turns the channel on or off for the instance and picks its events
   * @param options - Channel options
   * @param methodOptions - Method-specific options (instance override)
   */
  async set(options: Request, methodOptions?: MethodOptions): Promise<Saved> {
    return this.api.post<Saved>(this.routes.Set, {
      body: { [this.channel]: options },
      ...methodOptions,
    });
  }

  /**
   * Gets the channel settings of the instance
   * @param methodOptions - Method-specific options (instance override)
   */
  async find(methodOptions?: MethodOptions): Promise<Saved | null> {
    return this.api.get<Saved | null>(this.routes.Find, methodOptions);
  }
}
