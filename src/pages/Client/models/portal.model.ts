import { Erc721Categories } from 'shared/constants';

export interface Portal {
  openedAt: string;
  hauntId: string;
  historicalPrices: string[];
  id: string | number;
}

export interface ClientPortal extends Portal {
  listingId: string;
  listingPrice: number;
  priceInWei?: string;
  category: Erc721Categories;
}
