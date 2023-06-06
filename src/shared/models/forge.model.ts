import { ForgeTypes, RarityTypes } from 'shared/constants';

export interface ForgeItem {
  id: string;
  tokenId: string;
  amount: string;
  category: ForgeTypes;
  rarity: RarityTypes | null;
  slot: string | null;
}
