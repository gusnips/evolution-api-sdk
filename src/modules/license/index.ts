import { Routes } from "@/api/routes";
import type { ApiService } from "@/api/service";

import type * as License from "./schemas/license";

/**
 * Evolution API 2.4 answers every request with `503 LICENSE_REQUIRED` until the
 * server is activated. These three calls stay open before activation.
 * Older servers have no `/license` routes and answer 404.
 */
export class LicenseModule {
  constructor(private readonly api: ApiService) {}

  /**
   * Tells if the server is activated
   */
  async status(): Promise<License.LicenseStatusResponse> {
    return this.api.get<License.LicenseStatusResponse>(Routes.License.Status, {
      isInstanceUrl: false,
    });
  }

  /**
   * Starts the registration. Open `register_url` from the response in a
   * browser and finish the form there
   * @param options - Register options
   */
  async register(
    options: License.RegisterRequest = {},
  ): Promise<License.RegisterResponse> {
    return this.api.get<License.RegisterResponse>(Routes.License.Register, {
      params: { redirect_uri: options.redirectUri },
      isInstanceUrl: false,
    });
  }

  /**
   * Finishes the registration with the code the activation page sends back
   * @param options - Activate options
   */
  async activate(
    options: License.ActivateRequest,
  ): Promise<License.ActivateResponse> {
    return this.api.get<License.ActivateResponse>(Routes.License.Activate, {
      params: { code: options.code },
      isInstanceUrl: false,
    });
  }
}
