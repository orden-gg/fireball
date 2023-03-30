import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LoginAddress } from 'shared/models';

export interface LoginState {
  loggedAddresses: LoginAddress[];
  activeAddress: Undefinable<string | null>;
  metamaskLoggedAddress: Undefinable<string | null>;
  isDropdownOpen: boolean;
}

const initialState: LoginState = {
  loggedAddresses: JSON.parse(localStorage.getItem('LOGGED_ADDRESSES') as CustomAny) || [],
  activeAddress: JSON.parse(localStorage.getItem('ACTIVE_ADDRESS') as CustomAny),
  metamaskLoggedAddress: null,
  isDropdownOpen: false
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    toggleLoginDropdown: (state, action: PayloadAction<boolean>) => {
      state.isDropdownOpen = action.payload;
    },
    setLoggedAddresses: (state, action: PayloadAction<LoginAddress[]>) => {
      state.loggedAddresses = action.payload;
    },
    setActiveAddress: (state, action: PayloadAction<Undefinable<string>>) => {
      state.activeAddress = action.payload;
    },
    setMetamaskLoggedAddress: (state, action: PayloadAction<Undefinable<string>>) => {
      state.metamaskLoggedAddress = action.payload;
    }
  }
});

export const { toggleLoginDropdown, setActiveAddress, setLoggedAddresses, setMetamaskLoggedAddress } =
  loginSlice.actions;

export const loginReducer = loginSlice.reducer;
