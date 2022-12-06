import { Erc721Categories, TypenameType } from 'shared/constants';

export interface ActivityPortalListingBase {
    id: string;
    tokenId: string;
    hauntId: string;
    category: Erc721Categories;
    priceInWei: string;
    seller: string;
    buyer: string;
    __typename: TypenameType;
}

export interface ActivityPortalListingDTO extends ActivityPortalListingBase {
    timePurchased: string;
    portal: {
        historicalPrices: string[];
    };
}

export interface ActivityPortalListingVM extends ActivityPortalListingBase {
    historicalPrices: string[];
    listingPrice: number;
    timePurchased: number;
}
