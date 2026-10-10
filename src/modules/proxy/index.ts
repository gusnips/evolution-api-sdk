import { Routes } from "@/api/routes";
import type { ApiService } from "@/api/service";
import type { MethodOptions } from "@/types/api";

import type * as FindProxy from "./schemas/find-proxy";
import type * as SetProxy from "./schemas/set-proxy";

export class ProxyModule {
  constructor(private readonly api: ApiService) {}

  /**
   * Sets the proxy of the instance. The server connects through it once and
   * answers "Invalid proxy" if that fails
   * @param options - Proxy options
   * @param methodOptions - Method-specific options (instance override)
   */
  async set(
    options: SetProxy.SetProxyRequest,
    methodOptions?: MethodOptions,
  ): Promise<SetProxy.SetProxyResponse> {
    const response = await this.api.post(Routes.Proxy.Set, {
      body: options,
      ...methodOptions,
    });

    return response as SetProxy.SetProxyResponse;
  }

  /**
   * Gets the proxy of the instance
   * @param methodOptions - Method-specific options (instance override)
   */
  async find(
    methodOptions?: MethodOptions,
  ): Promise<FindProxy.FindProxyResponse> {
    const response = await this.api.get(Routes.Proxy.Find, methodOptions);

    return response as FindProxy.FindProxyResponse;
  }
}
