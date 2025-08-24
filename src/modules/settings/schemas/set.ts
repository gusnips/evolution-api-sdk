// Pure TypeScript interfaces for better IDE support and performance
export interface SetRequest {
  rejectCall?: boolean;
  msgCall?: string;
  groupsIgnore?: boolean;
  alwaysOnline?: boolean;
  readMessages?: boolean;
  readStatus?: boolean;
  syncFullHistory?: boolean;
  wavoipToken?: string;
}

export interface SetResponse {
  message: string;
}

// Backward compatibility aliases
export type SetOptions = SetRequest;
