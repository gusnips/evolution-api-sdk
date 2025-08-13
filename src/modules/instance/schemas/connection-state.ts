// Pure TypeScript interfaces for better IDE support and performance
import { ConnectionState } from "@/types/webhooks";

export interface ConnectionStateRequest {
  instanceName: string;
}

export interface ConnectionStateResponse {
  instance: {
    instanceName: string;
    state: ConnectionState;
  };
}

// Backward compatibility aliases
export type ConnectionStateOptions = ConnectionStateRequest;
