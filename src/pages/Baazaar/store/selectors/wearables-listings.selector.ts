import { GraphQueryParams, SortingItem } from 'shared/models';

import { RootState } from 'core/store/store';

import { WearableListingFilters, WearableListingVM } from '../../models';

export const getWearablesListings = (state: RootState): WearableListingVM[] =>
  state.baazaar.wearables.wearablesListings.data;

export const getIsWearablesListingsInitialDataLoading = (state: RootState): boolean =>
  state.baazaar.wearables.isWearablesListingsInitialDataLoading;

export const getIsWearablesListingsLoading = (state: RootState): boolean =>
  state.baazaar.wearables.wearablesListings.isLoading;

export const getWearablesListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
  state.baazaar.wearables.wearablesListingsGraphQueryParams;

export const getWearablesListingsLimitPerLoad = (state: RootState): number =>
  state.baazaar.wearables.wearablesListingsLimitPerLoad;

export const getWearablesListingsDefaultSorting = (state: RootState): SortingItem =>
  state.baazaar.wearables.wearablesListingsDefaultSorting;

export const getWearablesListingsSorting = (state: RootState): SortingItem =>
  state.baazaar.wearables.wearablesListingsSorting;

export const getWearablesListingsFilters = (state: RootState): WearableListingFilters =>
  state.baazaar.wearables.wearablesListingsFilters;

export const getWearablesListingsQueryParamsOrder = (state: RootState): string[] =>
  state.baazaar.wearables.wearablesListingsQueryParamsOrder;
