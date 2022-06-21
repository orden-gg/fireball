import { TILES_ABI } from 'data/abi/tiles.abi';

import { TILES_CONTRACT } from './common/api.constants';
import { EthersApi } from './ethers.api';

const tilesContract = EthersApi.makeContract(TILES_CONTRACT, TILES_ABI, 'polygon');

export class TilesApi {
    public static getTilesByAddress(address: any): any {
        return tilesContract.tilesBalances(address);
    }
}
