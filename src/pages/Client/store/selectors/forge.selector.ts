import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ClientForgeState } from '../slices';

const forgeStateSelector = createSelector(
  (state: RootState) => state.client.forge,
  (forgeState: ClientForgeState) => forgeState
);

export const getForgeItems = createSelector(forgeStateSelector, (state: ClientForgeState) => state.forge.data);

export const getForgeItemsCount = createSelector(forgeStateSelector, (state: ClientForgeState) => {
  return state.forge.data.length;
});

export const getIsInitialForgeLoading = createSelector(
  forgeStateSelector,
  (state: ClientForgeState) => state.isInitialForgeLoading
);
