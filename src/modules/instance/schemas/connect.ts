// Pure TypeScript interfaces for better IDE support and performance

export interface ConnectRequest {
  instanceName: string;
}

export interface ConnectInstanceInfo {
  instanceName: string;
  state: string;
}

export interface ConnectHash {
  apikey: string;
}

export interface ConnectQRCode {
  code: string;
  base64?: string; // The doc doesn't specify, but it's good to have
}

export interface ConnectResponse {
  instance: ConnectInstanceInfo;
  hash: ConnectHash;
  qrcode: ConnectQRCode;
}

// Backward compatibility aliases
export type ConnectOptions = ConnectRequest;
