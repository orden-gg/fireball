import { Erc721Categories, Erc1155Categories } from 'shared/constants';
import { ParcelDTO, ParcelVM } from 'shared/models';

import { ItemsForSaleType } from '../constants';
import { OwnedGotchi } from './owned-gotchi.model';

export interface GotchiForSale extends Omit<OwnedGotchi, 'lending'> {}

export interface PortalForSaleDTO {
  activeListing: string;
  hauntId: string;
  historicalPrices: string[];
}

export interface Erc721ForSaleDTO {
  id: string;
  tokenId: string;
  category: Erc721Categories;
  priceInWei: string;
  gotchi: GotchiForSale | null;
  portal: PortalForSaleDTO | null;
}

export interface PortalForSaleVM {
  priceInWei: string;
  category: Erc721Categories;
  tokenId: string;
  portal: {
    hauntId: string;
  };
  historicalPrices: string[];
  listingId: string;
  listingPrice: number;
}

export interface ParcelForSaleDTO {
  id: string;
  category: Erc721Categories;
  parcel: ParcelDTO;
  priceInWei: string;
  tokenId: string;
}

export interface ParcelForSaleVM extends ParcelVM {
  listings: {
    id: string;
    priceInWei: string;
  }[];
}

export interface Erc1155ForSaleDTO {
  id: string;
  erc1155TypeId: string;
  category: Erc1155Categories;
  quantity: string;
  priceInWei: string;
  rarityLevel: string;
}

export interface Erc1155ForSaleVM {
  id: number;
  balance: number;
  category: Erc1155Categories;
  listingId: string;
  rarity: string;
  rarityId: string;
  priceInWei: string;
  price: number;
}

export interface WearableForSale extends Erc1155ForSaleVM {}

export interface TicketForSale extends Erc1155ForSaleVM {}

export interface ConsumableForSale {
  id: number;
  balance: number;
  listingId: string;
  rarity: string;
  price: number;
  category: Erc1155Categories;
}

export interface ItemsForSaleDictionary {
  [ItemsForSaleType.Gotchis]: GotchiForSale[];
  [ItemsForSaleType.Portals]: PortalForSaleVM[];
  [ItemsForSaleType.Parcels]: ParcelForSaleVM[];
  [ItemsForSaleType.Wearables]: WearableForSale[];
  [ItemsForSaleType.Tickets]: TicketForSale[];
  [ItemsForSaleType.Consumables]: ConsumableForSale[];
}
