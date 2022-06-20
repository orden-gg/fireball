import { TILES_ABI } from 'data/abi/tiles.abi';

import { TILES_CONTRACT } from './common/api.constants';
import { makeContract } from './ethers.api';

const tilesContract = makeContract(TILES_CONTRACT, TILES_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
     getTilesByAddress(address) {
        return tilesContract.tilesBalances(address);
    }
};
