import { Erc721Categories, TypenameType } from 'shared/constants';
export interface ClosedPortalListingBase {
    category: Erc721Categories;
    hauntId: string;
    id: string;
    priceInWei: string;
    timeCreated: string;
    tokenId: string;
    __typename: TypenameType;
}

export interface ClosedPortalListingDTO extends ClosedPortalListingBase {
    portal: {
        historicalPrices: string[];
    };
}

export interface ClosedPortalListingVM extends ClosedPortalListingBase {
    historicalPrices: string[];
    listings: {
        id: string;
        priceInWei: string;
    }[];
}
