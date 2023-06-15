import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ClientFakeGotchisState } from '../slices';

const fakeGotchisStateSelector = createSelector(
  (state: RootState) => state.client.fakeGotchis,
  (fakeGotchisState: ClientFakeGotchisState) => fakeGotchisState
);

export const getFakeGotchis = createSelector(
  fakeGotchisStateSelector,
  (state: ClientFakeGotchisState) => state.fakeGotchis.data
);

export const getFakeGotchisCount = createSelector(fakeGotchisStateSelector, (state: ClientFakeGotchisState) => {
  return state.fakeGotchis.data
    ? state.fakeGotchis.data.fakeGotchiCards.length + state.fakeGotchis.data.fakeGotchis.length
    : 0;
});

export const getIsInitialFakeGotchisLoading = createSelector(
  fakeGotchisStateSelector,
  (state: ClientFakeGotchisState) => state.isInitialFakeGotchisLoading
);
