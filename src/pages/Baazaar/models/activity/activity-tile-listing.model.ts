import { Erc1155Categories, TypenameType } from 'shared/constants';
import { Erc1155Listing, Erc1155SoldListing } from 'shared/models';

export interface ActivityTileListingBase {
    category: Erc1155Categories;
    priceInWei: string;
    rarityLevel: string;
    buyer: string;
    seller: string;
    __typename: TypenameType;
}

export interface ActivityTileListingDTO extends ActivityTileListingBase {
    listingID: string;
    erc1155TypeId: string;
    quantity: string;
    timeLastPurchased: string;
}

export interface ActivityTileListingVM extends ActivityTileListingBase {
    id: number;
    erc1155TypeId: number;
    quantity: number;
    timeLastPurchased: number;
    name: string;
    imageSrcUrl: string;
    rarity: string;
    isDeprecated: boolean;
    currentListing: Erc1155Listing;
    lastSoldListing: Erc1155SoldListing;
}
