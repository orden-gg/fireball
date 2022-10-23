import { Erc721Categories, TypenameType } from 'shared/constants';

export interface ActivityPortalListingBase {
    id: string;
    tokenId: string;
    hauntId: string;
    category: Erc721Categories;
    priceInWei: string;
    timePurchased: string;
    seller: string;
    buyer: string;
    __typename: TypenameType;
}

export interface ActivityPortalListingDTO extends ActivityPortalListingBase {
    portal: {
        historicalPrices: string[];
    };
}

export interface ActivityPortalListingVM extends ActivityPortalListingBase {
    historicalPrices: string[];
    listings: {
        id: string;
        priceInWei: string;
    }[];
}
