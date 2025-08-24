// Pure TypeScript interfaces for better IDE support and performance
export interface SetRequest {
  rejectCall?: boolean;
  msgCall?: string;
  groupsIgnore: boolean; // Required by API
  alwaysOnline: boolean; // Required by API
  readMessages: boolean; // Required by API
  readStatus: boolean; // Required by API
  syncFullHistory: boolean; // Required by API
  wavoipToken?: string;
}

export interface SetResponse {
  message: string;
}

// Backward compatibility aliases
export type SetOptions = SetRequest;
