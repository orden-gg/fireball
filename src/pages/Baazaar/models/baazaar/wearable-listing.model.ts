import { Erc1155Categories, TypenameType } from 'shared/constants';
import { Erc1155Listing, Erc1155SoldListing } from 'shared/models';

export interface WearableListingBase {
    category: Erc1155Categories;
    id: string;
    priceInWei: string;
    rarityLevel: string;
    timeLastPurchased: string;
    __typename: TypenameType;
}

export interface WearableListingDTO extends WearableListingBase {
    erc1155TypeId: string;
    quantity: string;
    timeCreated: string;
}

export interface WearableListingVM extends WearableListingBase {
    erc1155TypeId: number;
    quantity: number;
    timeCreated: number;
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
