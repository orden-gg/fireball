import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { InstallationsState } from '../slices';

const installationsStateSelector = createSelector(
  (state: RootState) => state.client.installations,
  (installationsState: InstallationsState) => installationsState
);

export const getInstallations = createSelector(
  installationsStateSelector,
  (state: InstallationsState) => state.installations.data
);

export const getInstallationsCount = createSelector(
  installationsStateSelector,
  (state: InstallationsState) => state.installations.data.length
);

export const getIsInitialInstallationsLoading = createSelector(
  installationsStateSelector,
  (state: InstallationsState) => state.isInitialInstallationsLoading
);
