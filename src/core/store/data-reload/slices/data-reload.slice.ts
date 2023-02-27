import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DataReloadType } from 'shared/constants';

export interface DataReloadState {
  lastUpdatedTimestamp: number;
  lastManuallyTriggeredTimestamp: number;
  reloadType: DataReloadType | null;
  reloadInterval: number;
  reloadIntervalCountdown: number;
  isReloadDisabled: boolean;
  customInterval: NodeJS.Timer | undefined;
}

const initialState: DataReloadState = {
  lastUpdatedTimestamp: 0,
  lastManuallyTriggeredTimestamp: 0,
  reloadType: null,
  reloadInterval: Number(localStorage.getItem('RELOAD_INTERVAL')),
  reloadIntervalCountdown: 0,
  isReloadDisabled: false,
  customInterval: undefined
};

export const dataReloadSlice = createSlice({
  name: 'dataReload',
  initialState,
  reducers: {
    setLastUpdatedTimestamp: (state, action: PayloadAction<number>) => {
      state.lastUpdatedTimestamp = action.payload;
    },
    setLastManuallyTriggeredTimestamp: (state, action: PayloadAction<number>) => {
      state.lastManuallyTriggeredTimestamp = action.payload;
    },
    setReloadType: (state, action: PayloadAction<DataReloadType | null>) => {
      state.reloadType = action.payload;
    },
    setReloadInterval: (state, action: PayloadAction<number>) => {
      state.reloadInterval = action.payload;
    },
    setReloadIntervalCountdown: (state, action: PayloadAction<number>) => {
      state.reloadIntervalCountdown = action.payload;
    },
    setIsReloadDisabled: (state, action: PayloadAction<boolean>) => {
      state.isReloadDisabled = action.payload;
    },
    setCustomInterval: (state, action: PayloadAction<NodeJS.Timer>) => {
      state.customInterval = action.payload;
    }
  }
});

export const {
  setLastUpdatedTimestamp,
  setLastManuallyTriggeredTimestamp,
  setReloadType,
  setReloadInterval,
  setReloadIntervalCountdown,
  setIsReloadDisabled,
  setCustomInterval
} = dataReloadSlice.actions;

export const dataReloadReducer = dataReloadSlice.reducer;
