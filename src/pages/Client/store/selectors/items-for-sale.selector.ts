import { RootState } from 'core/store/store';

import { ItemsForSaleDictionary } from '../../models';

export const getItemsForSale = (state: RootState): ItemsForSaleDictionary =>
  state.client.itemsForSale.itemsForSale.data;

export const getItemsForSaleCount = (state: RootState): number => {
  const itemsForSaleCount: number =
    state.client.itemsForSale.itemsForSale.data.consumables.length +
    state.client.itemsForSale.itemsForSale.data.gotchis.length +
    state.client.itemsForSale.itemsForSale.data.parcels.length +
    state.client.itemsForSale.itemsForSale.data.portals.length +
    state.client.itemsForSale.itemsForSale.data.tickets.length +
    state.client.itemsForSale.itemsForSale.data.wearables.length;

  return itemsForSaleCount;
};

export const getIsItemsForSaleLoading = (state: RootState): boolean => state.client.itemsForSale.itemsForSale.isLoading;
