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

export interface FBGotchi {
  availableSkillPoints: number;
  badges: number[];
  identity: Identity;
}

export interface Gotchi {
  id: number;
  name: string;
  numericTraits: TraitModifiersTuple;
  modifiedNumericTraits: number[];
  equippedWearables: number[];
  collateral: string;
  owner: {
    id: string;
  };
  originalOwner: {
    id: string;
  };
  stakedAmount: number;
  minimumStake: number;
  kinship: number;
  experience: number;
  toNextLevel: number;
  usedSkillPoints: number;
  level: number;
  hauntId: number;
  baseRarityScore: number;
  modifiedRarityScore: number;
  inventory: GotchiInventory[];
  timesTraded: string;
  createdAt: string;
  listings: Erc721Listing[];
}

export interface GotchiExtended extends FBGotchi, Gotchi {}
