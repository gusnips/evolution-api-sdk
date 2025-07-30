// Pure TypeScript interfaces for better IDE support and performance

export interface SetPresenceRequest {
  instanceName?: string;
  presence: "unavailable" | "available";
}

export interface SetPresenceData {
  instance: string;
  presence: string;
}

export interface SetPresenceResponse {
  error: boolean;
  message: string;
  data: SetPresenceData;
}

// Backward compatibility aliases
export type SetPresenceOptions = SetPresenceRequest;
