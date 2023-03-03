import { TypenameType } from 'shared/constants';

export interface Erc1155ListingsBatch {
  [key: string]: {
    id: string;
    priceInWei: string;
    timeLastPurchased: string;
    __typename: TypenameType;
  }[];
}

export interface Erc721Listing {
  id: string;
  priceInWei: string;
  __typename: TypenameType;
  timePurchased?: string;
}

export interface Erc721ListingsBatch {
  [key: string]: Erc721Listing[];
}
