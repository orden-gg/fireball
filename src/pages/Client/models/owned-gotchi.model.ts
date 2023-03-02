export interface OwnedGotchi {
  id: string;
  name: string;
  baseRarityScore: string;
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
  listings: {
    id: string;
    priceInWei: string;
  }[];
  historicalPrices: string[];
  lending: string | null;
}
