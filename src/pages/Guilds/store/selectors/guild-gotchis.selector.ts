import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { OwnedGotchisState } from '../slices/guild-gotchis.slice';

const ownedGotchisStateSelector = createSelector(
  (state: RootState) => state.guilds.ownedGotchis,
  (ownedGotchisState: OwnedGotchisState) => ownedGotchisState
);

export const getOwnedGotchis = createSelector(
  ownedGotchisStateSelector,
  (state: OwnedGotchisState) => state.ownedGotchis.data
);

export const getOwnedGotchisCount = createSelector(
  ownedGotchisStateSelector,
  (state: OwnedGotchisState) => state.ownedGotchis.data.length
);

export const getIsInitialOwnedGotchisLoading = createSelector(
  ownedGotchisStateSelector,
  (state: OwnedGotchisState) => state.isInitialOwnedGotchisLoading
);

export const getOwnedGotchisSorting = createSelector(
  ownedGotchisStateSelector,
  (state: OwnedGotchisState) => state.ownedGotchisSorting
);

export const getIsOwnedGotchisLoaded = createSelector(ownedGotchisStateSelector, (state: OwnedGotchisState) => {
  const isLoaded: boolean = state.ownedGotchis.isLoaded;

  return isLoaded;
});
