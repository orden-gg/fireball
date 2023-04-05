import { RarityTypes } from './enums';

export const TRAITS_KEYS: string[] = ['nrg', 'agg', 'spk', 'brn', 'eys', 'eyc'];
export const TRAITS_MODIFY_KEYS: string[] = ['nrg', 'agg', 'spk', 'brn'];
export const WEARABLE_SLOTS: string[] = ['Body', 'Face', 'Eyes', 'Head', 'R Hand', 'L Hand', 'Pet', 'Background'];
export const GOTCHI_SIDES: string[] = ['svg', 'right', 'back', 'left'];
export const DEFAULT_WEAREBLE_IDS: number[] = [293, 146, 117, 67, 64, 296, 151, 210];
export const RarityScoreNumber = {
  Godlike: 580,
  Mythical: 525,
  Rare: 449
};
export const IDENTITY_RARITY_LOW_NUMBERS: { [key: string]: number } = {
  [RarityTypes.Common]: 16,
  [RarityTypes.Uncommon]: 8,
  [RarityTypes.Rare]: 4,
  [RarityTypes.Mythical]: 2,
  [RarityTypes.Godlike]: 1
};
