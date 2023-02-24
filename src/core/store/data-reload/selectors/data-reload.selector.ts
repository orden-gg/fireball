import { RootState } from 'core/store/store';

export const getLastUpdatedTimestamp = (state: RootState): number => state.dataReload.lastUpdatedTimestamp;
export const getLastManuallyUpdatedTimestamp = (state: RootState): number =>
  state.dataReload.lastManuallyUpdatedTimestamp;
export const getReloadInterval = (state: RootState): number => state.dataReload.reloadInterval;
export const getReloadIntervalCountdown = (state: RootState): number => state.dataReload.reloadIntervalCountdown;
export const getIsReloadDisabled = (state: RootState): boolean => state.dataReload.isReloadDisabled;
