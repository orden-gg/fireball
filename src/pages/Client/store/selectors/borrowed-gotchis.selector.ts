import { RootState } from 'core/store/store';

import { GotchiLending, SortingItem } from 'shared/models';

export const getBorrowedGotchis = (state: RootState): GotchiLending[] =>
  state.client.borrowedGotchis.borrowedGotchis.data;

export const getBorrowedGotchisCount = (state: RootState): number =>
  state.client.borrowedGotchis.borrowedGotchis.data.length;

export const getIsBorrowedGotchisLoading = (state: RootState): boolean =>
  state.client.borrowedGotchis.borrowedGotchis.isLoading;

export const getBorrowedGotchisSorting = (state: RootState): SortingItem =>
  state.client.borrowedGotchis.borrowedGotchisSorting;
