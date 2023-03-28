import { Erc1155Categories, WearableItemTypes } from 'shared/constants';

export interface Warehouse {
  id: number;
  balance: number;
  rarity: string;
  rarityId: string;
  category: Erc1155Categories;
  benefit: {
    first: string;
    second: string;
  };
  itemType: WearableItemTypes | undefined;
  holders?: string[];
  priceInWei?: string;
}
