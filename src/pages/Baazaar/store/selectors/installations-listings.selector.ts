import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { InstallationsListingsState } from '../slices';

const installationsListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.installations,
  (installationsListingsState: InstallationsListingsState) => installationsListingsState
);

export const getInstallationsListings = createSelector(
  installationsListingsStateSelector,
  (state: InstallationsListingsState) => state.installationsListings.data
);

export const getIsInstallationsListingsInitialDataLoading = createSelector(
  installationsListingsStateSelector,
  (state: InstallationsListingsState) => state.isInstallationsListingsInitialDataLoading
);

export const getIsInstallationsListingsLoading = createSelector(
  installationsListingsStateSelector,
  (state: InstallationsListingsState) => state.installationsListings.isLoading
);

export const getInstallationsListingsGraphQueryParams = createSelector(
  installationsListingsStateSelector,
  (state: InstallationsListingsState) => state.installationsListingsGraphQueryParams
);

export const getInstallationsListingsLimitPerLoad = createSelector(
  installationsListingsStateSelector,
  (state: InstallationsListingsState) => state.installationsListingsLimitPerLoad
);

export const getInstallationsListingsDefaultSorting = createSelector(
  installationsListingsStateSelector,
  (state: InstallationsListingsState) => state.installationsListingsDefaultSorting
);

export const getInstallationsListingsSorting = createSelector(
  installationsListingsStateSelector,
  (state: InstallationsListingsState) => state.installationsListingsSorting
);

export const getInstallationsListingsFilters = createSelector(
  installationsListingsStateSelector,
  (state: InstallationsListingsState) => state.installationsListingsFilters
);

export const getInstallationsListingsQueryParamsOrder = createSelector(
  installationsListingsStateSelector,
  (state: InstallationsListingsState) => state.installationsListingsQueryParamsOrder
);
