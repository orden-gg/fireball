import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'core/store/store';

import { TokensPricesState } from '../slices/tokens-prices.slice';

export const tokensPricesStateSelector = createSelector((state: RootState) => state.tokensPrices, (tokensPricesState: TokensPricesState) => tokensPricesState);

export const getIsPricesLoaded = createSelector(tokensPricesStateSelector, (state: TokensPricesState) => state.isPricesLoaded);

export const getTokensPrices = createSelector(tokensPricesStateSelector, (state: TokensPricesState) => state.tokensPrices);
