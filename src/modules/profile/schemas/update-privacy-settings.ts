// Pure TypeScript interfaces for better IDE support and performance
import type { PrivacySettings } from "./fetch-privacy-settings";

/**
 * The API sets all six values at once
 */
export type UpdatePrivacySettingsRequest = PrivacySettings;

export interface UpdatePrivacySettingsResponse {
  update: "success";
  data: PrivacySettings;
}

// Backward compatibility aliases
export type UpdatePrivacySettingsOptions = UpdatePrivacySettingsRequest;
