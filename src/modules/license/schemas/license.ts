export interface LicenseStatusResponse {
  status: "active" | "inactive";
  /**
   * ID of this server. Shown on the activation page
   */
  instance_id: string;
  /**
   * The license key, masked. Only present once the server has one
   */
  api_key?: string;
}

export interface RegisterRequest {
  /**
   * Where the activation page sends the browser when it is done. Leave it
   * out to use the page of the server itself (`/manager/license/callback`)
   */
  redirectUri?: string;
}

export type RegisterResponse =
  | {
      status: "pending";
      /**
       * Open this address in a browser to finish the registration
       */
      register_url: string;
    }
  | {
      status: "active";
      message: string;
    };

export interface ActivateRequest {
  /**
   * The `code` query parameter the activation page adds to the redirect
   */
  code: string;
}

export interface ActivateResponse {
  status: "active";
  message: string;
}
