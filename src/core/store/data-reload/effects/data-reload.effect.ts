import { AppThunk } from 'core/store/store';

import { DataReloadType } from 'shared/constants';

// slices
import * as dataReloadSlices from '../slices/data-reload.slice';

export const onSetLastUpdatedTimestamp =
  (timestamp: number): AppThunk =>
  (dispatch) => {
    dispatch(dataReloadSlices.setLastUpdatedTimestamp(timestamp));
    dispatch(handleDataReload());
  };

export const onSetReloadType =
  (reloadType: DataReloadType | null): AppThunk =>
  (dispatch, getSate) => {
    const reloadInterval: number = getSate().dataReload.reloadInterval;

    dispatch(dataReloadSlices.setReloadType(reloadType));
    dispatch(dataReloadSlices.setLastUpdatedTimestamp(0));
    dispatch(dataReloadSlices.setLastManuallyTriggeredTimestamp(0));

    if (reloadInterval) {
      dispatch(dataReloadSlices.setReloadIntervalCountdown(Date.now() + reloadInterval));
    }

    dispatch(handleDataReload());
  };

export const onSetReloadInterval =
  (interval: number): AppThunk =>
  (dispatch) => {
    dispatch(dataReloadSlices.setReloadInterval(interval));
    dispatch(handleDataReload());

    localStorage.setItem('RELOAD_INTERVAL', `${interval}`);
  };

const handleDataReload = (): AppThunk => (dispatch, getSate) => {
  const { lastManuallyTriggeredTimestamp, reloadInterval, reloadType, customInterval } = { ...getSate().dataReload };

  if (reloadType || lastManuallyTriggeredTimestamp) {
    clearInterval(customInterval);
  }

  if (reloadInterval) {
    clearInterval(customInterval);
    dispatch(dataReloadSlices.setReloadIntervalCountdown(Date.now() + reloadInterval));

    dispatch(
      dataReloadSlices.setCustomInterval(
        setInterval(() => {
          dispatch(dataReloadSlices.setReloadIntervalCountdown(Date.now() + reloadInterval));

          if (lastManuallyTriggeredTimestamp + reloadInterval <= Date.now()) {
            dispatch(dataReloadSlices.setLastManuallyTriggeredTimestamp(Date.now()));
          }
        }, reloadInterval)
      )
    );
  } else {
    dispatch(dataReloadSlices.setReloadIntervalCountdown(0));
  }
};
