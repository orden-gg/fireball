import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ActivityParcelsListingsState } from '../slices';

const activityParcelsListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.activity.parcels,
  (activityParcelsListingsState: ActivityParcelsListingsState) => activityParcelsListingsState
);

export const getActivityParcelsListings = createSelector(
  activityParcelsListingsStateSelector,
  (state: ActivityParcelsListingsState) => state.activityParcelsListings.data
);

export const getIsActivityParcelsListingsInitialDataLoading = createSelector(
  activityParcelsListingsStateSelector,
  (state: ActivityParcelsListingsState) => state.isActivityParcelsListingsInitialDataLoading
);

export const getIsActivityParcelsListingsLoading = createSelector(
  activityParcelsListingsStateSelector,
  (state: ActivityParcelsListingsState) => state.activityParcelsListings.isLoading
);

export const getActivityParcelsListingsFilters = createSelector(
  activityParcelsListingsStateSelector,
  (state: ActivityParcelsListingsState) => state.activityParcelsListingsFilters
);

export const getActivityParcelsListingsQueryParamsOrder = createSelector(
  activityParcelsListingsStateSelector,
  (state: ActivityParcelsListingsState) => state.activityParcelsListingsQueryParamsOrder
);
