import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ActivityInstallationsListingsState } from '../slices';

const activityInstallationsListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.activity.installations,
  (activityInstallationsListingsState: ActivityInstallationsListingsState) => activityInstallationsListingsState
);

export const getActivityInstallationsListings = createSelector(
  activityInstallationsListingsStateSelector,
  (state: ActivityInstallationsListingsState) => state.activityInstallationsListings.data
);

export const getIsActivityInstallationsListingsLoading = createSelector(
  activityInstallationsListingsStateSelector,
  (state: ActivityInstallationsListingsState) => state.activityInstallationsListings.isLoading
);
