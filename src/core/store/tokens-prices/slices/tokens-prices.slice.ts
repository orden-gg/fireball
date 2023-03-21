import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TokenPrices } from 'shared/models';

export interface TokensPricesState {
  isPricesLoaded: boolean;
  tokensPrices: TokenPrices;
}
export const initialState: TokensPricesState = {
  isPricesLoaded: false,
  tokensPrices: {} as TokenPrices
};

export const tokenPricesSlice = createSlice({
  name: 'tokenPrices',
  initialState,
  reducers: {
    setIsPricesLoaded: (state, action: PayloadAction<boolean>) => {
      state.isPricesLoaded = action.payload;
    },
    setTokensPrices: (state, action: PayloadAction<TokenPrices>) => {
      state.tokensPrices = action.payload;
    }
  }
});

export const { setIsPricesLoaded, setTokensPrices } = tokenPricesSlice.actions;

export const tokensPricesReducers = tokenPricesSlice.reducer;
