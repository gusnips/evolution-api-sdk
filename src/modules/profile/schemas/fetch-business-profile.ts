// Pure TypeScript interfaces for better IDE support and performance

export interface FetchBusinessProfileRequest {
  number: string;
}

export interface BusinessHoursConfig {
  day_of_week: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
  mode: "open_24h" | "specific_hours" | "closed";
  open_time?: string;
  close_time?: string;
}

export interface BusinessHours {
  timezone: string;
  business_config: BusinessHoursConfig[];
}

export interface BusinessProfile {
  isBusiness: true;
  wid: string;
  description: string;
  website: string[];
  email?: string;
  address?: string;
  category: string;
  business_hours: BusinessHours;
}

/**
 * The number is on WhatsApp but has no business profile
 */
export interface NotBusinessProfile {
  isBusiness: false;
  message: string;
  exists: boolean;
  jid: string;
  number: string;
  name?: string;
  lid?: string;
}

export type FetchBusinessProfileResponse = BusinessProfile | NotBusinessProfile;

// Backward compatibility aliases
export type FetchBusinessProfileOptions = FetchBusinessProfileRequest;
