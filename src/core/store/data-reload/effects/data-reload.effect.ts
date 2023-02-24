import { AppThunk } from 'core/store/store';
import { DataReloadType } from 'shared/constants';

import {
  setLastUpdatedTimestamp,
  setLastManuallyUpdatedTimestamp,
  setReloadType,
  setReloadInterval,
  setReloadIntervalCountdown,
  setCustomInterval
} from '../slices/data-reload.slice';

export const onSetLastUpdatedTimestamp = (timestamp: number): AppThunk => dispatch => {
  dispatch(setLastUpdatedTimestamp(timestamp));
  dispatch(handleDataReload());
};

export const onSetReloadType = (reloadType: DataReloadType): AppThunk => (dispatch, getSate) => {
  const reloadInterval: number = getSate().dataReload.reloadInterval;

  dispatch(setReloadType(reloadType));
  dispatch(setLastUpdatedTimestamp(0));
  dispatch(setLastManuallyUpdatedTimestamp(0));

  if (reloadInterval) {
    dispatch(setReloadIntervalCountdown(Date.now() + reloadInterval));
  }

  dispatch(handleDataReload());
};

export const onSetReloadInterval = (interval: number): AppThunk => dispatch => {
  dispatch(setReloadInterval(interval));
  dispatch(handleDataReload());
};

const handleDataReload = (): AppThunk => (dispatch, getSate) => {
  const { lastManuallyUpdatedTimestamp, reloadInterval, reloadType, customInterval } = { ...getSate().dataReload };

  if (reloadType || lastManuallyUpdatedTimestamp) {
    clearInterval(customInterval);
  }

  if (reloadInterval) {
    clearInterval(customInterval);
    dispatch(setReloadIntervalCountdown(Date.now() + reloadInterval));

    dispatch(
      setCustomInterval(
        setInterval(() => {
          dispatch(setReloadIntervalCountdown(Date.now() + reloadInterval));

          if (lastManuallyUpdatedTimestamp + reloadInterval <= Date.now()) {
            dispatch(setLastManuallyUpdatedTimestamp(Date.now()));
          }
        }, reloadInterval)
      )
    );
  } else {
    dispatch(setReloadIntervalCountdown(0));
  }
};
