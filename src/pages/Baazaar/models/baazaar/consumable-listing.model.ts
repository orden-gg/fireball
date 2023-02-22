import { Erc1155Categories, TypenameType } from 'shared/constants';
import { Erc1155Listing, Erc1155SoldListing } from 'shared/models';

export interface ConsumableListingBase {
  category: Erc1155Categories;
  id: string;
  priceInWei: string;
  rarityLevel: string;
  timeLastPurchased: string;
  __typename: TypenameType;
}

export interface ConsumableListingDTO extends ConsumableListingBase {
  erc1155TypeId: string;
  quantity: string;
  timeCreated: string;
}

export interface ConsumableListingVM extends ConsumableListingBase {
  erc1155TypeId: number;
  quantity: number;
  timeCreated: number;
  name: string;
  rarity: string;
  currentListing: Erc1155Listing;
  lastSoldListing: Erc1155SoldListing;
}
