// Pure TypeScript interfaces for better IDE support and performance

export interface FetchProfileRequest {
  number: string;
}

export interface FetchProfileResponse {
  wuid: string;
  name?: string;
  numberExists: boolean;
  picture?: string | null;
  /**
   * The About text of the profile
   */
  status?: string | null;
  isBusiness: boolean;
  email?: string;
  description?: string;
  website?: string;
}
