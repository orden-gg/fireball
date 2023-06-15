import { Identity, TraitModifiersTuple } from './erc-1155-item.model';
import { Erc721Listing } from './erc-1155-listings-batch.model';

export interface GotchiAgingModel {
  name: string;
  boost: number;
}

export interface GotchiInventory {
  id: number;
  balance: number;
}

export interface FireballGotchi {
  availableSkillPoints: number;
  badges: number[];
  identity: Identity;
}

export interface Gotchi {
  id: string;
  name: string;
  owner: {
    id: string;
  };
  originalOwner: {
    id: string;
  };
  baseRarityScore: string;
  numericTraits: TraitModifiersTuple;
  modifiedNumericTraits: TraitModifiersTuple;
  modifiedRarityScore: string;
  withSetsRarityScore: string;
  kinship: string;
  experience: string;
  level: string;
  toNextLevel: string;
  collateral: string;
  hauntId: string;
  createdAt: string;
  possibleSets: string | null;
  equippedWearables: number[]; // ?? tuple
  equippedSetID: string | null;
  equippedSetName: string | null;
  usedSkillPoints: string;
  timesTraded: string;
  stakedAmount: string;
  listings: Erc721Listing[];
  historicalPrices: string[];
  lending: string | null;
}

export interface GotchiExtended extends FireballGotchi, Gotchi {}
