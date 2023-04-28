import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { BorrowedGotchisState } from '../slices';

const borrowedGotchisStateSelector = createSelector(
  (state: RootState) => state.guilds.borrowedGotchis,
  (borrowedGotchisState: BorrowedGotchisState) => borrowedGotchisState
);

export const getBorrowedGotchis = createSelector(
  borrowedGotchisStateSelector,
  (state: BorrowedGotchisState) => state.borrowedGotchis.data
);

export const getBorrowedGotchisCount = createSelector(
  borrowedGotchisStateSelector,
  (state: BorrowedGotchisState) => state.borrowedGotchis.data.length
);

export const getIsInitialBorrowedGotchisLoading = createSelector(
  borrowedGotchisStateSelector,
  (state: BorrowedGotchisState) => state.isInitialBorrowedGotchisLoading
);

export const getBorrowedGotchisSorting = createSelector(
  borrowedGotchisStateSelector,
  (state: BorrowedGotchisState) => state.borrowedGotchisSorting
);

export const getIsBorrowedGotchisLoaded = createSelector(
  borrowedGotchisStateSelector,
  (state: BorrowedGotchisState) => {
    const isLoaded: boolean = state.borrowedGotchis.isLoaded;

    return isLoaded;
  }
);
