export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  retailerId?: string;
  url?: string;
  isHidden?: boolean;
  imageUrls: Record<string, string>;
  reviewStatus: Record<string, string>;
  availability: string;
}

export interface CatalogCollection {
  id: string;
  name: string;
  products: Product[];
  status: {
    status: string;
    canAppeal: boolean;
  };
}

/**
 * The server answers 200 with this when it cannot read the catalog
 */
export interface CatalogLookupFailed {
  wuid: string;
  name: null;
  isBusiness: false;
}
