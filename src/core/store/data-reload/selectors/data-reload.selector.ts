import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { DataReloadState } from '../slices';

const dataReloadStateSelector = createSelector(
  (state: RootState) => state.dataReload,
  (dataReloadState: DataReloadState) => dataReloadState
);

export const getLastUpdatedTimestamp = createSelector(
  dataReloadStateSelector,
  (state: DataReloadState) => state.lastUpdatedTimestamp
);

export const getLastManuallyTriggeredTimestamp = createSelector(
  dataReloadStateSelector,
  (state: DataReloadState) => state.lastManuallyTriggeredTimestamp
);

export const getReloadInterval = createSelector(
  dataReloadStateSelector,
  (state: DataReloadState) => state.reloadInterval
);

export const getReloadIntervalCountdown = createSelector(
  dataReloadStateSelector,
  (state: DataReloadState) => state.reloadIntervalCountdown
);

export const getIsReloadDisabled = createSelector(
  dataReloadStateSelector,
  (state: DataReloadState) => state.isReloadDisabled
);
