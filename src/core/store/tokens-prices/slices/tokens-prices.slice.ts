import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TokenPricesType } from 'shared/models';

export interface DateTokensPrices {
  isPricesLoaded: boolean;
  tokensPrices: TokenPricesType;
}
const initialState: DateTokensPrices = {
  isPricesLoaded: false,
  tokensPrices: {} as TokenPricesType
};

export const tokenPricesSlice = createSlice({
  name: 'tokenPrices',
  initialState,
  reducers: {
    setIsPricesLoaded: (state, action: PayloadAction<boolean>) => {
      state.isPricesLoaded = action.payload;
    },
    setTokensPrices: (
      state,
      action: PayloadAction<TokenPricesType>
    ) => {
      state.tokensPrices = action.payload;
    }
  }
});

export const { setIsPricesLoaded, setTokensPrices } = tokenPricesSlice.actions;

export const tokensPricesReducers = tokenPricesSlice.reducer;
