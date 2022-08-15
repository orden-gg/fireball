import { TypenameType } from 'shared/constants';

export interface Erc1155ListingsBatch {
    [key: string]: {
        id: string;
        priceInWei: string;
        timeLastPurchased: string;
        __typename: TypenameType
    }[]
}
