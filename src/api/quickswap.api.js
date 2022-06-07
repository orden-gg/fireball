import * as quickSwap from 'quickswap-sdk';

import ethersApi from './ethers.api';
import { POLYGON_CHAIN_ID } from './common/constants';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getTokenData(address) {
        return quickSwap.Fetcher.fetchTokenData(POLYGON_CHAIN_ID, address, ethersApi.getProvider());
    },

    getPairData(token0, token1) {
        return quickSwap.Fetcher.fetchPairData(token0, token1, ethersApi.getProvider());
    },

    getTokenRouteByPair(token, pair) {
        return new quickSwap.Route([pair], token);
    }
};
