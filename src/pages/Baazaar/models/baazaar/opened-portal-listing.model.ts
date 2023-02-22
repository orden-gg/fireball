import { TypenameType } from 'shared/constants';

export interface OpenedPortalListingDTO {
  id: string;
  priceInWei: string;
  tokenId: string;
  timeCreated: string;
  hauntId: string;
  portal: {
    options: {
      id: string;
      numericTraits: number[];
      collateralType: string;
      baseRarityScore: number;
    }[];
  };
  __typename: TypenameType;
}

export interface OpenedPortalListingVM {
  id: string;
  tokenId: string;
  hauntId: string;
  priceInWei: string;
  timeCreated: string;
  baseRarityScore: number;
  numericTraits: number[];
  collateral: string;
  nrgTrait: number;
  aggTrait: number;
  spkTrait: number;
  brnTrait: number;
  eysTrait: number;
  eycTrait: number;
  gotchi: {
    tempId: string;
    collateral: string;
    hauntId: string;
    id: string;
    kinship: number;
    level: number;
    expirience: number;
    toNextLevel: number;
    numericTraits: number[];
    modifiedNumericTraits: number[];
    baseRarityScore: number;
    modifiedRarityScore: number;
    equippedWearables: number[];
  };
}
