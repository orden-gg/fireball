import { TraitModifiersTuple } from './erc-1155-item.model';

export interface GotchiAgingModel {
  name: string;
  boost: number;
}

export interface GotchiInventory {
  id: number;
  balance: number;
}

export interface Gotchi {
  id: number;
  name: string;
  numericTraits: TraitModifiersTuple;
  modifiedNumericTraits: number[];
  equippedWearables: number[];
  collateral: string;
  owner: {
    id: number;
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
}
