import { Erc721Categories, TypenameType } from 'shared/constants';
import { GotchiDTO, GotchiVM } from 'shared/models';

export interface ActivityGotchiListingBase {
  category: Erc721Categories;
  seller: string;
  buyer: string;
  gotchi: GotchiDTO;
  priceInWei: string;
  equippedWearables: number[];
  __typename: TypenameType;
}

export interface ActivityGotchiListingDTO extends ActivityGotchiListingBase {
  hauntId: string;
  id: string;
  timePurchased: string;
  tokenId: string;
  nrgTrait: string;
  aggTrait: string;
  spkTrait: string;
  brnTrait: string;
  eysTrait: string;
  eycTrait: string;
}

export interface ActivityGotchiListingVM extends Omit<ActivityGotchiListingBase, 'gotchi'> {
  gotchi: GotchiVM;
  hauntId: number;
  id: number;
  timePurchased: number;
  tokenId: number;
}
