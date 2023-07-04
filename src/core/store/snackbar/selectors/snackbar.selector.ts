import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { SnackbarState } from '../slices';

const snackbarStateSelector = createSelector(
  (state: RootState) => state.snackbar,
  (loginState: SnackbarState) => loginState
);

export const getSnackbarData = createSelector(snackbarStateSelector, (state: SnackbarState) => state.data);

export const getIsSnackbarOpen = createSelector(snackbarStateSelector, (state: SnackbarState) => state.isOpen);
