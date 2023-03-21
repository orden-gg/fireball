import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ItemsForSaleState } from '../slices';

const itemsForSaleStateSelector = createSelector(
  (state: RootState) => state.client.itemsForSale,
  (itemsForSaleState: ItemsForSaleState) => itemsForSaleState
);

export const getItemsForSale = createSelector(
  itemsForSaleStateSelector,
  (state: ItemsForSaleState) => state.itemsForSale.data
);

export const getItemsForSaleCount = createSelector(itemsForSaleStateSelector, (state: ItemsForSaleState) => {
  const itemsForSaleCount: number =
    state.itemsForSale.data.consumables.length +
    state.itemsForSale.data.gotchis.length +
    state.itemsForSale.data.parcels.length +
    state.itemsForSale.data.portals.length +
    state.itemsForSale.data.tickets.length +
    state.itemsForSale.data.wearables.length;

  return itemsForSaleCount;
});

export const getIsInitialItemsForSaleLoading = createSelector(
  itemsForSaleStateSelector,
  (state: ItemsForSaleState) => state.isInitialItemsForSaleLoading
);
