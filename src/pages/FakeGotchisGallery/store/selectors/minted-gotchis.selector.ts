import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { MintedGotchisState } from '../slices';

const mintedGotchisStateSelector = createSelector(
  (state: RootState) => state.fake.minted,
  (mintedGotchisState: MintedGotchisState) => mintedGotchisState
);

export const getMintedGotchis = createSelector(
  mintedGotchisStateSelector,
  (state: MintedGotchisState) => state.mintedGotchis.data
);

export const getIsMintedGotchisLoading = createSelector(
  mintedGotchisStateSelector,
  (state: MintedGotchisState) => state.mintedGotchis.isLoading
);

export const getIsMintedGotchisLoaded = createSelector(
  mintedGotchisStateSelector,
  (state: MintedGotchisState) => state.mintedGotchis.isLoaded
);

export const getMintedGotchisCount = createSelector(
  mintedGotchisStateSelector,
  (state: MintedGotchisState) => state.mintedGotchis.data.length
);
