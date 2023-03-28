import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ParcelsListingsState } from '../slices';

const parcelsListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.parcels,
  (parcelsListingsState: ParcelsListingsState) => parcelsListingsState
);

export const getParcelsListings = createSelector(
  parcelsListingsStateSelector,
  (state: ParcelsListingsState) => state.parcelsListings.data
);

export const getIsParcelsListingsInitialDataLoading = createSelector(
  parcelsListingsStateSelector,
  (state: ParcelsListingsState) => state.isParcelsListingsInitialDataLoading
);

export const getIsParcelsListingsLoading = createSelector(
  parcelsListingsStateSelector,
  (state: ParcelsListingsState) => state.parcelsListings.isLoading
);

export const getParcelsListingsGraphQueryParams = createSelector(
  parcelsListingsStateSelector,
  (state: ParcelsListingsState) => state.parcelsListingsGraphQueryParams
);

export const getParcelsListingsLimitPerLoad = createSelector(
  parcelsListingsStateSelector,
  (state: ParcelsListingsState) => state.parcelsListingsLimitPerLoad
);

export const getParcelsListingsDefaultSorting = createSelector(
  parcelsListingsStateSelector,
  (state: ParcelsListingsState) => state.parcelsListingsDefaultSorting
);

export const getParcelsListingsSorting = createSelector(
  parcelsListingsStateSelector,
  (state: ParcelsListingsState) => state.parcelsListingsSorting
);

export const getParcelsListingsFilters = createSelector(
  parcelsListingsStateSelector,
  (state: ParcelsListingsState) => state.parcelsListingsFilters
);

export const getParcelsListingsQueryParamsOrder = createSelector(
  parcelsListingsStateSelector,
  (state: ParcelsListingsState) => state.parcelsListingsQueryParamsOrder
);
