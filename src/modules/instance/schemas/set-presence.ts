export type InstancePresence =
  "available" | "unavailable" | "composing" | "recording" | "paused";

export interface SetPresenceRequest {
  instanceName?: string;
  presence: InstancePresence;
}

export interface SetPresenceResponse {
  presence: InstancePresence;
}

// Backward compatibility aliases
export type SetPresenceOptions = SetPresenceRequest;
