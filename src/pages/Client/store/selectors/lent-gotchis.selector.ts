import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { LentGotchisState } from '../slices';

const lentGotchisStateSelector = createSelector(
  (state: RootState) => state.client.lentGotchis,
  (lentGotchisState: LentGotchisState) => lentGotchisState
);

export const getLentGotchis = createSelector(
  lentGotchisStateSelector,
  (state: LentGotchisState) => state.lentGotchis.data
);

export const getLentGotchisCount = createSelector(
  lentGotchisStateSelector,
  (state: LentGotchisState) => state.lentGotchis.data.length
);

export const getIsInitialLentGotchisLoading = createSelector(
  lentGotchisStateSelector,
  (state: LentGotchisState) => state.isInitialLentGotchisLoading
);

export const getLentGotchisSorting = createSelector(
  lentGotchisStateSelector,
  (state: LentGotchisState) => state.lentGotchisSorting
);
