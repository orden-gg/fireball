import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ActivityWearablesListingsState } from '../slices';

const activityWearablesListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.activity.wearables,
  (activityWearablesListingsState: ActivityWearablesListingsState) => activityWearablesListingsState
);

export const getActivityWearablesListings = createSelector(
  activityWearablesListingsStateSelector,
  (state: ActivityWearablesListingsState) => state.activityWearablesListings.data
);

export const getIsActivityWearablesListingsInitialDataLoading = createSelector(
  activityWearablesListingsStateSelector,
  (state: ActivityWearablesListingsState) => state.isActivityWearablesListingsInitialDataLoading
);

export const getIsActivityWearablesListingsLoading = createSelector(
  activityWearablesListingsStateSelector,
  (state: ActivityWearablesListingsState) => state.activityWearablesListings.isLoading
);

export const getActivityWearablesListingsFilters = createSelector(
  activityWearablesListingsStateSelector,
  (state: ActivityWearablesListingsState) => state.activityWearablesListingsFilters
);

export const getActivityWearablesListingsQueryParamsOrder = createSelector(
  activityWearablesListingsStateSelector,
  (state: ActivityWearablesListingsState) => state.activityWearablesListingsQueryParamsOrder
);
