import { Erc1155Categories } from 'shared/constants';

export interface InstallationAndTile {
  id: string;
  category: Erc1155Categories;
  name: string;
  balance: number;
  rarity: string;
  deprecated: boolean;
  level?: number;
  priceInWei?: string;
}
