import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenTypes } from 'shared/constants';

export interface DateTokensPrices {
  isPricesLoaded: boolean;
  tokensPrices: {
    [key in TokenTypes]: number;
  };
}
const initialState: DateTokensPrices = {
  isPricesLoaded: false,
  tokensPrices: {} as any
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
      action: PayloadAction<
        {
          [key in TokenTypes]: number;
        }
      >
    ) => {
      state.tokensPrices = action.payload;
    }
  }
});

export const { setIsPricesLoaded, setTokensPrices } = tokenPricesSlice.actions;

export const tokensPricesReducers = tokenPricesSlice.reducer;
