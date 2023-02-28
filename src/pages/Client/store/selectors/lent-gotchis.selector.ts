import { RootState } from 'core/store/store';
import { ClientGotchiLending, SortingItem } from 'shared/models';

export const getLentGotchis = (state: RootState): ClientGotchiLending[] => state.client.lentGotchis.lentGotchis.data;

export const getLentGotchisLength = (state: RootState): number => state.client.lentGotchis.lentGotchis.data.length;

export const getIsLentGotchisLoading = (state: RootState): boolean => state.client.lentGotchis.lentGotchis.isLoading;

export const getLentGotchisSorting = (state: RootState): SortingItem => state.client.lentGotchis.lentGotchisSorting;
