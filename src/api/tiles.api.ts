import { TILES_ABI } from 'data/abi/tiles.abi';

import { TILES_CONTRACT } from './common/api.constants';
import { makeContract } from './ethers.api';

const tilesContract = makeContract(TILES_CONTRACT, TILES_ABI, 'polygon');

export const getTilesByAddress = (address: any): any => {
    return tilesContract.tilesBalances(address);
};
