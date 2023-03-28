import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ActivityGotchisListingsState } from '../slices';

const activityGotchisListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.activity.gotchis,
  (activityGotchisListingsState: ActivityGotchisListingsState) => activityGotchisListingsState
);

export const getActivityGotchisListings = createSelector(
  activityGotchisListingsStateSelector,
  (state: ActivityGotchisListingsState) => state.activityGotchisListings.data
);

export const getIsActivityGotchisListingsInitialDataLoading = createSelector(
  activityGotchisListingsStateSelector,
  (state: ActivityGotchisListingsState) => state.isActivityGotchisListingsInitialDataLoading
);

export const getIsActivityGotchisListingsLoading = createSelector(
  activityGotchisListingsStateSelector,
  (state: ActivityGotchisListingsState) => state.activityGotchisListings.isLoading
);

export const getActivityGotchisListingsFilters = createSelector(
  activityGotchisListingsStateSelector,
  (state: ActivityGotchisListingsState) => state.activityGotchisListingsFilters
);

export const getActivityGotchisListingsQueryParamsOrder = createSelector(
  activityGotchisListingsStateSelector,
  (state: ActivityGotchisListingsState) => state.activityGotchisListingsQueryParamsOrder
);
