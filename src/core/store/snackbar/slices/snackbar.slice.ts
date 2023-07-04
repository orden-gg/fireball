import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SnackbarData } from 'shared/models';

export interface SnackbarState {
  data: SnackbarData;
  isOpen: boolean;
}

const initialState: SnackbarState = {
  data: {
    message: '',
    severity: 'success',
    horizontal: 'center',
    vertical: 'top'
  },
  isOpen: false
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbarData: (state, action: PayloadAction<SnackbarData>) => {
      state.data = action.payload;
    },
    setIsSnackbarOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    }
  }
});

export const { setSnackbarData, setIsSnackbarOpen } = snackbarSlice.actions;

export const snackbarReducer = snackbarSlice.reducer;
