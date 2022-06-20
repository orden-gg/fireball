import * as quickSwap from 'quickswap-sdk';

import { getProvider } from './ethers.api';
import { POLYGON_CHAIN_ID } from './common/api.constants';

export const getTokenData = (address: any): any => {
    return quickSwap.Fetcher.fetchTokenData(POLYGON_CHAIN_ID, address, getProvider());
};

export const getPairData = (token0: any, token1: any): any => {
    return quickSwap.Fetcher.fetchPairData(token0, token1, getProvider());
};

export const getTokenRouteByPair = (token: any, pair: any): any => {
    return new quickSwap.Route([pair], token);
};
