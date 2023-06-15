import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { WearablesListingsState } from '../slices';

const wearablesListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.wearables,
  (wearablesListingsState: WearablesListingsState) => wearablesListingsState
);

export const getWearablesListings = createSelector(
  wearablesListingsStateSelector,
  (state: WearablesListingsState) => state.wearablesListings.data
);

export const getIsWearablesListingsInitialDataLoading = createSelector(
  wearablesListingsStateSelector,
  (state: WearablesListingsState) => state.isWearablesListingsInitialDataLoading
);

export const getIsWearablesListingsLoading = createSelector(
  wearablesListingsStateSelector,
  (state: WearablesListingsState) => state.wearablesListings.isLoading
);

export const getWearablesListingsGraphQueryParams = createSelector(
  wearablesListingsStateSelector,
  (state: WearablesListingsState) => state.wearablesListingsGraphQueryParams
);

export const getWearablesListingsLimitPerLoad = createSelector(
  wearablesListingsStateSelector,
  (state: WearablesListingsState) => state.wearablesListingsLimitPerLoad
);

export const getWearablesListingsDefaultSorting = createSelector(
  wearablesListingsStateSelector,
  (state: WearablesListingsState) => state.wearablesListingsDefaultSorting
);

export const getWearablesListingsSorting = createSelector(
  wearablesListingsStateSelector,
  (state: WearablesListingsState) => state.wearablesListingsSorting
);

export const getWearablesListingsFilters = createSelector(
  wearablesListingsStateSelector,
  (state: WearablesListingsState) => state.wearablesListingsFilters
);

export const getWearablesListingsQueryParamsOrder = createSelector(
  wearablesListingsStateSelector,
  (state: WearablesListingsState) => state.wearablesListingsQueryParamsOrder
);
