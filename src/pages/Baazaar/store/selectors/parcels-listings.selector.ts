import { GraphQueryParams, SortingItem } from 'shared/models';

import { RootState } from 'core/store/store';

import { ParcelListingFilters, ParcelListingVM } from '../../models';

export const getParcelsListings = (state: RootState): ParcelListingVM[] => state.baazaar.parcels.parcelsListings.data;

export const getIsParcelsListingsInitialDataLoading = (state: RootState): boolean =>
  state.baazaar.parcels.isParcelsListingsInitialDataLoading;

export const getIsParcelsListingsLoading = (state: RootState): boolean =>
  state.baazaar.parcels.parcelsListings.isLoading;

export const getParcelsListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
  state.baazaar.parcels.parcelsListingsGraphQueryParams;

export const getParcelsListingsLimitPerLoad = (state: RootState): number =>
  state.baazaar.parcels.parcelsListingsLimitPerLoad;

export const getParcelsListingsDefaultSorting = (state: RootState): SortingItem =>
  state.baazaar.parcels.parcelsListingsDefaultSorting;

export const getParcelsListingsSorting = (state: RootState): SortingItem =>
  state.baazaar.parcels.parcelsListingsSorting;

export const getParcelsListingsFilters = (state: RootState): ParcelListingFilters =>
  state.baazaar.parcels.parcelsListingsFilters;

export const getParcelsListingsQueryParamsOrder = (state: RootState): string[] =>
  state.baazaar.parcels.parcelsListingsQueryParamsOrder;
