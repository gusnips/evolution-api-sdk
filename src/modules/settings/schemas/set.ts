export interface SetRequest {
  rejectCall: boolean;
  groupsIgnore: boolean;
  alwaysOnline: boolean;
  readMessages: boolean;
  readStatus: boolean;
  syncFullHistory: boolean;
  msgCall?: string;
  wavoipToken?: string;
}

export interface SetResponse {
  settings: {
    instanceName: string;
    settings: SetRequest;
  };
}
