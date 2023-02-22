import { TypenameType } from 'shared/constants';
import { GotchiDTO, GotchiVM } from 'shared/models';

export interface GotchiListingBase {
  gotchi: GotchiDTO;
  priceInWei: string;
  __typename: TypenameType;
}

export interface GotchiListingDTO extends GotchiListingBase {
  hauntId: string;
  id: string;
  timeCreated: string;
  tokenId: string;
}

export interface GotchiListingVM extends Omit<GotchiListingBase, 'gotchi'> {
  gotchi: GotchiVM;
  hauntId: number;
  id: number;
  timeCreated: number;
  tokenId: number;
}
