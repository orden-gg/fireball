import { RootState } from 'core/store/store';

import { SortingItem } from 'shared/models';

import { OwnedGotchi } from '../../models';

export const getOwnedGotchis = (state: RootState): OwnedGotchi[] => state.client.ownedGotchis.ownedGotchis.data;

export const getOwnedGotchisCount = (state: RootState): number => state.client.ownedGotchis.ownedGotchis.data.length;

export const getIsOwnedGotchisLoading = (state: RootState): boolean => state.client.ownedGotchis.ownedGotchis.isLoading;

export const getOwnedGotchisSorting = (state: RootState): SortingItem => state.client.ownedGotchis.ownedGotchisSorting;
