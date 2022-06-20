import * as quickSwap from 'quickswap-sdk';

import { getProvider } from './ethers.api';
import { POLYGON_CHAIN_ID } from './common/api.constants';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getTokenData(address) {
        return quickSwap.Fetcher.fetchTokenData(POLYGON_CHAIN_ID, address, getProvider());
    },

    getPairData(token0, token1) {
        return quickSwap.Fetcher.fetchPairData(token0, token1, getProvider());
    },

    getTokenRouteByPair(token, pair) {
        return new quickSwap.Route([pair], token);
    }
};
