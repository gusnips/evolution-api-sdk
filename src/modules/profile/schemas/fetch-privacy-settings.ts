// Pure TypeScript interfaces for better IDE support and performance
export type PrivacySetting = "all" | "contacts" | "contact_blacklist" | "none";

export interface PrivacySettings {
  /**
   * Who sees when you read their messages
   */
  readreceipts: "all" | "none";
  /**
   * Who sees your profile picture
   */
  profile: PrivacySetting;
  /**
   * Who sees your status updates
   */
  status: PrivacySetting;
  /**
   * Who sees when you are online
   */
  online: "all" | "match_last_seen";
  /**
   * Who sees your last seen
   */
  last: PrivacySetting;
  /**
   * Who can add you to groups
   */
  groupadd: PrivacySetting;
}

export type FetchPrivacySettingsResponse = PrivacySettings;
