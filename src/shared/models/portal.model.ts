import { TypenameType } from 'shared/constants';

export interface PortalBase {
  hauntId: string;
  id: string;
  __typename: TypenameType;
}

export interface PortalListing extends PortalBase {
  historicalPrices: string[];
  listings: {
    id: string;
    priceInWei: string;
  }[];
}
