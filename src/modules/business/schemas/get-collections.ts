import type { Jid } from "@/types/tags";
import type { CatalogCollection, CatalogLookupFailed } from "./common";

export interface GetCollectionsRequest {
  /**
   * Business phone number with country code. Leave it out for your own
   */
  number?: string;
  /**
   * Collections to return, 20 at most (and by default)
   */
  limit?: number;
}

export interface GetCollectionsFound {
  wuid: Jid;
  name?: string;
  numberExists: boolean;
  isBusiness: boolean;
  collectionsLength: number;
  collections: CatalogCollection[];
}

export type GetCollectionsResponse = GetCollectionsFound | CatalogLookupFailed;
