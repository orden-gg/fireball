import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ClosedPortalsListingsState } from '../slices';

const closedPortalsListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.closedPortals,
  (closedPortalsListingsState: ClosedPortalsListingsState) => closedPortalsListingsState
);

export const getClosedPortalsListings = createSelector(
  closedPortalsListingsStateSelector,
  (state: ClosedPortalsListingsState) => state.closedPortalsListings.data
);

export const getIsClosedPortalsListingsInitialDataLoading = createSelector(
  closedPortalsListingsStateSelector,
  (state: ClosedPortalsListingsState) => state.isClosedPortalsListingsInitialDataLoading
);

export const getIsClosedPortalsListingsLoading = createSelector(
  closedPortalsListingsStateSelector,
  (state: ClosedPortalsListingsState) => state.closedPortalsListings.isLoading
);

export const getClosedPortalsListingsGraphQueryParams = createSelector(
  closedPortalsListingsStateSelector,
  (state: ClosedPortalsListingsState) => state.closedPortalsListingsGraphQueryParams
);

export const getClosedPortalsListingsLimitPerLoad = createSelector(
  closedPortalsListingsStateSelector,
  (state: ClosedPortalsListingsState) => state.closedPortalsListingsLimitPerLoad
);

export const getClosedPortalsListingsDefaultSorting = createSelector(
  closedPortalsListingsStateSelector,
  (state: ClosedPortalsListingsState) => state.closedPortalsListingsDefaultSorting
);

export const getClosedPortalsListingsSorting = createSelector(
  closedPortalsListingsStateSelector,
  (state: ClosedPortalsListingsState) => state.closedPortalsListingsSorting
);

export const getClosedPortalsListingsFilters = createSelector(
  closedPortalsListingsStateSelector,
  (state: ClosedPortalsListingsState) => state.closedPortalsListingsFilters
);

export const getClosedPortalsListingsQueryParamsOrder = createSelector(
  closedPortalsListingsStateSelector,
  (state: ClosedPortalsListingsState) => state.closedPortalsListingsQueryParamsOrder
);
