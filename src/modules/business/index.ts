import { Routes } from "@/api/routes";
import type { ApiService } from "@/api/service";
import type { MethodOptions } from "@/types/api";

import type * as GetCatalog from "./schemas/get-catalog";
import type * as GetCollections from "./schemas/get-collections";

/**
 * Catalog reads work on `WHATSAPP-BAILEYS` instances
 */
export class BusinessModule {
  constructor(private readonly api: ApiService) {}

  /**
   * Reads the product catalog of a business account
   * @param options - Catalog options
   * @param methodOptions - Method-specific options (instance override)
   */
  async getCatalog(
    options: GetCatalog.GetCatalogRequest = {},
    methodOptions?: MethodOptions,
  ): Promise<GetCatalog.GetCatalogResponse> {
    const response = await this.api.post(Routes.Business.GetCatalog, {
      body: options,
      ...methodOptions,
    });

    return response as GetCatalog.GetCatalogResponse;
  }

  /**
   * Reads the collections of a business account
   * @param options - Collections options
   * @param methodOptions - Method-specific options (instance override)
   */
  async getCollections(
    options: GetCollections.GetCollectionsRequest = {},
    methodOptions?: MethodOptions,
  ): Promise<GetCollections.GetCollectionsResponse> {
    const response = await this.api.post(Routes.Business.GetCollections, {
      body: options,
      ...methodOptions,
    });

    return response as GetCollections.GetCollectionsResponse;
  }
}
