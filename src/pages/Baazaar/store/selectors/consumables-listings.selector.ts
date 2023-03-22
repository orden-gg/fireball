import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ConsumablesListingsState } from '../slices';

const consumablesListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.consumables,
  (consumablesListingsState: ConsumablesListingsState) => consumablesListingsState
);

export const getConsumablesListings = createSelector(
  consumablesListingsStateSelector,
  (state: ConsumablesListingsState) => state.consumablesListings.data
);

export const getIsConsumablesListingsInitialDataLoading = createSelector(
  consumablesListingsStateSelector,
  (state: ConsumablesListingsState) => state.isConsumablesListingsInitialDataLoading
);

export const getIsConsumablesListingsLoading = createSelector(
  consumablesListingsStateSelector,
  (state: ConsumablesListingsState) => state.consumablesListings.isLoading
);

export const getConsumablesListingsGraphQueryParams = createSelector(
  consumablesListingsStateSelector,
  (state: ConsumablesListingsState) => state.consumablesListingsGraphQueryParams
);

export const getConsumablesListingsLimitPerLoad = createSelector(
  consumablesListingsStateSelector,
  (state: ConsumablesListingsState) => state.consumablesListingsLimitPerLoad
);

export const getConsumablesListingsDefaultSorting = createSelector(
  consumablesListingsStateSelector,
  (state: ConsumablesListingsState) => state.consumablesListingsDefaultSorting
);

export const getConsumablesListingsSorting = createSelector(
  consumablesListingsStateSelector,
  (state: ConsumablesListingsState) => state.consumablesListingsSorting
);

export const getConsumablesListingsFilters = createSelector(
  consumablesListingsStateSelector,
  (state: ConsumablesListingsState) => state.consumablesListingsFilters
);

export const getConsumablesListingsQueryParamsOrder = createSelector(
  consumablesListingsStateSelector,
  (state: ConsumablesListingsState) => state.consumablesListingsQueryParamsOrder
);
