import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { LoginState } from '../slices';

const loginStateSelector = createSelector(
  (state: RootState) => state.login,
  (loginState: LoginState) => loginState
);

export const getIsDropdownOpen = createSelector(loginStateSelector, (state: LoginState) => state.isDropdownOpen);

export const getActiveAddress = createSelector(loginStateSelector, (state: LoginState) => state.activeAddress);

export const getLoggedAddresses = createSelector(loginStateSelector, (state: LoginState) => state.loggedAddresses);
