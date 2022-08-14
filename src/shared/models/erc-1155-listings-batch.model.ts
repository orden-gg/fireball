import { TypenameType } from 'shared/constants';

export interface Erc1155ListingsBatch {
    [key: string]: {
        priceInWei: string;
        __typename: TypenameType
    }[]
}
