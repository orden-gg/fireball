import TILES_ABI from 'data/abi/tiles.abi';

import { TILES_CONTRACT } from './common/constants';
import ethersApi from './ethers.api';

const tilesContract = ethersApi.makeContract(TILES_CONTRACT, TILES_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getTilesByAddress(address) {
        return await tilesContract.tilesBalances(address).then(response => response);
    }
}
