import { RootState } from 'core/store/store';

import { GraphQueryParams, SortingItem } from 'shared/models';

import { GotchiListingVM, GotchiListingsFilters } from '../../models';

export const getGotchisListings = (state: RootState): GotchiListingVM[] => state.baazaar.gotchis.gotchisListings.data;

export const getIsGotchisListingsInitialDataLoading = (state: RootState): boolean =>
  state.baazaar.gotchis.isGotchisListingsInitialDataLoading;

export const getIsGotchisListingsLoading = (state: RootState): boolean =>
  state.baazaar.gotchis.gotchisListings.isLoading;

export const getGotchisListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
  state.baazaar.gotchis.gotchisListingsGraphQueryParams;

export const getGotchisListingsLimitPerLoad = (state: RootState): number =>
  state.baazaar.gotchis.gotchisListingsLimitPerLoad;

export const getGotchisDefaultListingsSorting = (state: RootState): SortingItem =>
  state.baazaar.gotchis.gotchisListingsDefaultSorting;

export const getGotchisListingsSorting = (state: RootState): SortingItem =>
  state.baazaar.gotchis.gotchisListingsSorting;

export const getGotchisListingsFilters = (state: RootState): GotchiListingsFilters =>
  state.baazaar.gotchis.gotchisListingsFilters;

export const getGotchisListingsQueryParamsOrder = (state: RootState): string[] =>
  state.baazaar.gotchis.gotchisListingsQueryParamsOrder;
