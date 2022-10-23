import { Erc1155Categories, TypenameType } from 'shared/constants';
import { Erc1155Listing, Erc1155SoldListing } from 'shared/models';

export interface ActivityWearableListingBase {
    category: Erc1155Categories;
    priceInWei: string;
    rarityLevel: string;
    buyer: string;
    seller: string;
    __typename: TypenameType;
}

export interface ActivityWearableListingDTO extends ActivityWearableListingBase {
    listingID: string;
    erc1155TypeId: string;
    quantity: string;
    timeLastPurchased: string;
}

export interface ActivityWearableListingVM extends ActivityWearableListingBase {
    id: number;
    erc1155TypeId: number;
    quantity: number;
    timeLastPurchased: number;
    name: string;
    rarity: string;
    traitModifiers: number[];
    currentListing: Erc1155Listing;
    lastSoldListing: Erc1155SoldListing;
    itemType: string;
    benefit: {
        first: string;
        second: string;
    };
}
