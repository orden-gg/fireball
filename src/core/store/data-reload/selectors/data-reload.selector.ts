import { RootState } from 'core/store/store';

export const getLastUpdatedTimestamp = (state: RootState): number => state.dataReload.lastUpdatedTimestamp;
export const getLastManuallyTriggeredTimestamp = (state: RootState): number =>
  state.dataReload.lastManuallyTriggeredTimestamp;
export const getReloadInterval = (state: RootState): number => state.dataReload.reloadInterval;
export const getReloadIntervalCountdown = (state: RootState): number => state.dataReload.reloadIntervalCountdown;
export const getIsReloadDisabled = (state: RootState): boolean => state.dataReload.isReloadDisabled;
