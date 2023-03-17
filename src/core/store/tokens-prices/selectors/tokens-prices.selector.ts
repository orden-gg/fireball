import { RootState } from 'core/store/store';
import { TokenTypes } from 'shared/constants';

export const getIsPricesLoaded = (state: RootState): boolean => state.tokensPrices.isPricesLoaded;
export const getTokensPrices = (
  state: RootState
): {
  [key in TokenTypes]: number;
} => state.tokensPrices.tokensPrices;
