// Pure TypeScript interfaces for better IDE support and performance
export interface ConnectRequest {
  instanceName: string;
}

export interface ConnectResponse {
  pairingCode: string | null;
  code: string;
  base64: string;
  count: number;
}

// Backward compatibility aliases
export type ConnectOptions = ConnectRequest;
