import * as quickSwap from 'quickswap-sdk';

import { EthersApi } from './ethers.api';
import { POLYGON_CHAIN_ID } from './common/api.constants';

export class QuickswapApi {
    public static getTokenData(address: any): any {
        return quickSwap.Fetcher.fetchTokenData(POLYGON_CHAIN_ID, address, EthersApi.getProvider());
    }

    public static getPairData(token0: any, token1: any): any {
        return quickSwap.Fetcher.fetchPairData(token0, token1, EthersApi.getProvider());
    }

    public static getTokenRouteByPair(token: any, pair: any): any {
        return new quickSwap.Route([pair], token);
    }
}
