import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ActivityConsumablesListingsState } from '../slices';

const activityConsumablesListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.activity.consumables,
  (activityConsumablesListingsState: ActivityConsumablesListingsState) => activityConsumablesListingsState
);

export const getActivityConsumablesListings = createSelector(
  activityConsumablesListingsStateSelector,
  (state: ActivityConsumablesListingsState) => state.activityConsumablesListings.data
);

export const getIsActivityConsumablesListingsInitialDataLoading = createSelector(
  activityConsumablesListingsStateSelector,
  (state: ActivityConsumablesListingsState) => state.isActivityConsumablesListingsInitialDataLoading
);

export const getIsActivityConsumablesListingsLoading = createSelector(
  activityConsumablesListingsStateSelector,
  (state: ActivityConsumablesListingsState) => state.activityConsumablesListings.isLoading
);

export const getActivityConsumablesListingsFilters = createSelector(
  activityConsumablesListingsStateSelector,
  (state: ActivityConsumablesListingsState) => state.activityConsumablesListingsFilters
);

export const getActivityConsumablesListingsQueryParamsOrder = createSelector(
  activityConsumablesListingsStateSelector,
  (state: ActivityConsumablesListingsState) => state.activityConsumablesListingsQueryParamsOrder
);
