import { TypenameType } from 'shared/constants';
import { GotchiDTO, GotchiVM } from 'shared/models';

export interface BaazaarGotchiListingBase {
    gotchi: GotchiDTO;
    priceInWei: string;
    portal: Nullable<any>;
    __typename: TypenameType;
}

export interface BaazaarGotchiListingDTO extends BaazaarGotchiListingBase {
    hauntId: string;
    id: string;
    timeCreated: string;
    tokenId: string;
}

export interface BaazaarGotchiListingVM extends Omit<BaazaarGotchiListingBase, 'gotchi'> {
    gotchi: GotchiVM;
    hauntId: number;
    id: number;
    timeCreated: number;
    tokenId: number;
}
