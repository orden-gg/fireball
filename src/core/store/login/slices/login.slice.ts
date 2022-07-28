import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginAddress } from 'shared/models';

export interface LoginState {
    loggedAddresses: LoginAddress[];
    activeAddress: string | null | undefined;
    isDropdownOpen: boolean;
}

const initialState: LoginState = {
    loggedAddresses: JSON.parse(localStorage.getItem('LOGGED_ADDRESSES') as any) || [],
    activeAddress: JSON.parse(localStorage.getItem('ACTIVE_ADDRESS') as any),
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
        setActiveAddress: (state, action: PayloadAction<string | undefined>) => {
            state.activeAddress = action.payload;
        }
    }
});

export const { toggleLoginDropdown, setActiveAddress, setLoggedAddresses } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;
