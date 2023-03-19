import { RootState } from 'core/store/store';

import { TokenPricesType } from 'shared/models';

export const getIsPricesLoaded = (state: RootState): boolean => state.tokensPrices.isPricesLoaded;
export const getTokensPrices = (state: RootState): TokenPricesType => state.tokensPrices.tokensPrices;
