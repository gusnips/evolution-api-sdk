export type InstancePresence =
  "available" | "unavailable" | "composing" | "recording" | "paused";

export interface SetPresenceRequest {
  instanceName?: string;
  presence: InstancePresence;
}

export interface SetPresenceResponse {
  presence: InstancePresence;
}
