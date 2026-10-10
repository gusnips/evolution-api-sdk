/**
 * `null` when the instance has no settings yet
 */
export type FindResponse = {
  rejectCall: boolean;
  msgCall: string | null;
  groupsIgnore: boolean;
  alwaysOnline: boolean;
  readMessages: boolean;
  readStatus: boolean;
  syncFullHistory: boolean;
  wavoipToken: string | null;
} | null;
