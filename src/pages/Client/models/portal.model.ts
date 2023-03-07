import { Erc721Categories } from 'shared/constants';

export interface Portal {
  id: number;
  hauntId: string;
  category: Erc721Categories;
  openedAt: string;
  historicalPrices: string[];
}

export interface ClientPortal extends Portal {
  listingId?: string | null;
  listingPrice?: number;
  priceInWei?: string;
}
