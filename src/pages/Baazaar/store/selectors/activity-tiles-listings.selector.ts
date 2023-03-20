import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ActivityTilesListingsState } from '../slices';

const activityTilesListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.activity.tiles,
  (activityTilesListingsState: ActivityTilesListingsState) => activityTilesListingsState
);

export const getActivityTilesListings = createSelector(
  activityTilesListingsStateSelector,
  (state: ActivityTilesListingsState) => state.activityTilesListings.data
);

export const getIsActivityTilesListingsInitialDataLoading = createSelector(
  activityTilesListingsStateSelector,
  (state: ActivityTilesListingsState) => state.isActivityTilesListingsInitialDataLoading
);

export const getIsActivityTilesListingsLoading = createSelector(
  activityTilesListingsStateSelector,
  (state: ActivityTilesListingsState) => state.activityTilesListings.isLoading
);

export const getActivityTilesListingsFilters = createSelector(
  activityTilesListingsStateSelector,
  (state: ActivityTilesListingsState) => state.activityTilesListingsFilters
);

export const getActivityTilesListingsQueryParamsOrder = createSelector(
  activityTilesListingsStateSelector,
  (state: ActivityTilesListingsState) => state.activityTilesListingsQueryParamsOrder
);
