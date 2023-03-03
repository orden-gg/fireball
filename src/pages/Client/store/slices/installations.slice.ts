import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InstallationAndTile } from '../../models';

export interface InstallationsState {
  installations: {
    data: InstallationAndTile[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
}

const initialState: InstallationsState = {
  installations: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  }
};

export const installationsSlice = createSlice({
  name: 'installations',
  initialState,
  reducers: {
    loadInstallations: (state): void => {
      state.installations = {
        ...state.installations,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadInstallationsSucceded: (state, action: PayloadAction<InstallationAndTile[]>): void => {
      state.installations = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadInstallationsFailed: (state): void => {
      state.installations = {
        ...state.installations,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    }
  }
});

export const { loadInstallations, loadInstallationsSucceded, loadInstallationsFailed } = installationsSlice.actions;

export const installationsReducer = installationsSlice.reducer;
