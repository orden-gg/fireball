import { TypenameType } from 'shared/constants';

import { TraitModifiersTuple } from './erc-1155-item.model';

interface GotchiBase {
  collateral: string;
  equippedSetName: string;
  equippedWearables: number[];
  historicalPrices: string[];
  modifiedNumericTraits: number[]; // ?? tuple
  name: string;
  stakedAmount: string;
  owner: {
    id: string;
    __typename: TypenameType;
  };
  withSetsNumericTraits: number; // ?? tuple
  __typename: TypenameType;
}

export interface GotchiDTO extends GotchiBase {
  baseRarityScore: string;
  equippedSetID: string;
  experience: string;
  hauntId: string;
  id: string;
  kinship: string;
  level: string;
  modifiedNumericTraits: number[]; // ?? tuple
  modifiedRarityScore: string;
  numericTraits: number[]; // ?? tuple
  possibleSets: string;
  toNextLevel: string;
  usedSkillPoints: string;
  withSetsNumericTraits: number; // ?? tuple
  withSetsRarityScore: string;
}

export interface GotchiVM extends GotchiBase {
  baseRarityScore: number;
  equippedSetID: number;
  experience: number;
  hauntId: number;
  id: number;
  kinship: number;
  level: number;
  numericTraits: number[] | TraitModifiersTuple;
  modifiedNumericTraits: number[]; // ?? tuple
  modifiedRarityScore: number;
  possibleSets: number;
  toNextLevel: number;
  usedSkillPoints: number;
  withSetsNumericTraits: number; // ?? tuple
  withSetsRarityScore: number;
  listings: {
    id: number;
    priceInWei: string;
  }[];
  buyer?: string;
  seller?: string;
  timePurchased?: number;
}
