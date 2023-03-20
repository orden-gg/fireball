import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { GotchisListingsState } from '../slices';

const gotchisListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.gotchis,
  (gotchisListingsState: GotchisListingsState) => gotchisListingsState
);

export const getGotchisListings = createSelector(
  gotchisListingsStateSelector,
  (state: GotchisListingsState) => state.gotchisListings.data
);

export const getIsGotchisListingsInitialDataLoading = createSelector(
  gotchisListingsStateSelector,
  (state: GotchisListingsState) => state.isGotchisListingsInitialDataLoading
);

export const getIsGotchisListingsLoading = createSelector(
  gotchisListingsStateSelector,
  (state: GotchisListingsState) => state.gotchisListings.isLoading
);

export const getGotchisListingsGraphQueryParams = createSelector(
  gotchisListingsStateSelector,
  (state: GotchisListingsState) => state.gotchisListingsGraphQueryParams
);

export const getGotchisListingsLimitPerLoad = createSelector(
  gotchisListingsStateSelector,
  (state: GotchisListingsState) => state.gotchisListingsLimitPerLoad
);

export const getGotchisDefaultListingsSorting = createSelector(
  gotchisListingsStateSelector,
  (state: GotchisListingsState) => state.gotchisListingsDefaultSorting
);

export const getGotchisListingsSorting = createSelector(
  gotchisListingsStateSelector,
  (state: GotchisListingsState) => state.gotchisListingsSorting
);

export const getGotchisListingsFilters = createSelector(
  gotchisListingsStateSelector,
  (state: GotchisListingsState) => state.gotchisListingsFilters
);

export const getGotchisListingsQueryParamsOrder = createSelector(
  gotchisListingsStateSelector,
  (state: GotchisListingsState) => state.gotchisListingsQueryParamsOrder
);
