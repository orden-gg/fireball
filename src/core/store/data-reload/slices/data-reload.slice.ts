import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DataReloadType } from 'shared/constants';

export interface DataReloadState {
  lastUpdatedTimestamp: number;
  lastManuallyUpdatedTimestamp: number;
  reloadType: DataReloadType | null;
  reloadInterval: number;
  reloadIntervalCountdown: number;
  isReloadDisabled: boolean;
  customInterval: NodeJS.Timer | null;
}

const initialState: DataReloadState = {
  lastUpdatedTimestamp: 0,
  lastManuallyUpdatedTimestamp: 0,
  reloadType: null,
  reloadInterval: Number(localStorage.getItem('RELOAD_INTERVAL')),
  reloadIntervalCountdown: 0,
  isReloadDisabled: false,
  customInterval: null
};

export const dataReloadSlice = createSlice({
  name: 'dataReload',
  initialState,
  reducers: {
    setLastUpdatedTimestamp: (state, action: PayloadAction<number>) => {
      state.lastUpdatedTimestamp = action.payload;
    },
    setLastManuallyUpdatedTimestamp: (state, action: PayloadAction<number>) => {
      state.lastManuallyUpdatedTimestamp = action.payload;
    },
    setReloadType: (state, action: PayloadAction<DataReloadType>) => {
      state.reloadType = action.payload;
    }
  }
});

export const { setLastUpdatedTimestamp, setLastManuallyUpdatedTimestamp, setReloadType } = dataReloadSlice.actions;

export const dataReloadReducer = dataReloadSlice.reducer;
