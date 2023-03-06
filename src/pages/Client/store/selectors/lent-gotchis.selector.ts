import { RootState } from 'core/store/store';

import { GotchiLending, SortingItem } from 'shared/models';

export const getLentGotchis = (state: RootState): GotchiLending[] => state.client.lentGotchis.lentGotchis.data;

export const getLentGotchisCount = (state: RootState): number => state.client.lentGotchis.lentGotchis.data.length;

export const getIsInitialLentGotchisLoading = (state: RootState): boolean =>
  state.client.lentGotchis.isInitialLentGotchisLoading;

export const getLentGotchisSorting = (state: RootState): SortingItem => state.client.lentGotchis.lentGotchisSorting;
