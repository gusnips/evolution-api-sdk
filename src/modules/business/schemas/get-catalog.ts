import type { Jid } from "@/types/tags";
import type { CatalogLookupFailed, Product } from "./common";

export interface GetCatalogRequest {
  /**
   * Business phone number with country code. Leave it out for your own
   */
  number?: string;
  /**
   * Products per page, 10 by default. The server reads up to 5 pages
   */
  limit?: number;
}

export interface GetCatalogFound {
  wuid: Jid;
  numberExists: boolean;
  isBusiness: boolean;
  catalogLength: number;
  catalog: Product[];
}

export type GetCatalogResponse = GetCatalogFound | CatalogLookupFailed;
