import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ActivityPortalsListingsState } from '../slices';

const activityPortalsListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.activity.portals,
  (activityPortalsListingsState: ActivityPortalsListingsState) => activityPortalsListingsState
);

export const getActivityPortalsListings = createSelector(
  activityPortalsListingsStateSelector,
  (state: ActivityPortalsListingsState) => state.activityPortalsListings.data
);

export const getIsActivityPortalsListingsInitialDataLoading = createSelector(
  activityPortalsListingsStateSelector,
  (state: ActivityPortalsListingsState) => state.isActivityPortalsListingsInitialDataLoading
);

export const getIsActivityPortalsListingsLoading = createSelector(
  activityPortalsListingsStateSelector,
  (state: ActivityPortalsListingsState) => state.activityPortalsListings.isLoading
);

export const getActivityPortalsListingsFilters = createSelector(
  activityPortalsListingsStateSelector,
  (state: ActivityPortalsListingsState) => state.activityPortalsListingsFilters
);

export const getActivityPortalsListingsQueryParamsOrder = createSelector(
  activityPortalsListingsStateSelector,
  (state: ActivityPortalsListingsState) => state.activityPortalsListingsQueryParamsOrder
);
