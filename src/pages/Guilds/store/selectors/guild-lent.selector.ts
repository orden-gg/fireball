import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { lentGotchisState } from '../slices';

const lentGotchisStateSelector = createSelector(
  (state: RootState) => state.guilds.lentGotchis,
  (lentGotchisState: lentGotchisState) => lentGotchisState
);

export const getLentGotchis = createSelector(
  lentGotchisStateSelector,
  (state: lentGotchisState) => state.lentGotchis.data
);

export const getLentGotchisCount = createSelector(
  lentGotchisStateSelector,
  (state: lentGotchisState) => state.lentGotchis.data.length
);

export const getIsInitiallentGotchisLoading = createSelector(
  lentGotchisStateSelector,
  (state: lentGotchisState) => state.isInitiallentGotchisLoading
);

export const getLentGotchisSorting = createSelector(
  lentGotchisStateSelector,
  (state: lentGotchisState) => state.lentGotchisSorting
);

export const getIsLentGotchisDataLoaded = createSelector(lentGotchisStateSelector, (state: lentGotchisState) => {
  const isLoaded: boolean = state.lentGotchis.isLoaded;

  return isLoaded;
});
