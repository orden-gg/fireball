import TILES_ABI from 'data/abi/tiles.abi.json';

import { TILES_CONTRACT } from 'shared/constants';
import { EthersApi } from './ethers.api';

const tilesContract = EthersApi.makeContract(TILES_CONTRACT, TILES_ABI, 'polygon');

export class TilesApi {
    public static getTilesByAddress(address: any): any {
        return tilesContract.tilesBalances(address);
    }

    public static async craftTiles(ids: string[]): Promise<any> {
        const contractWithSigner: any = EthersApi.makeContractWithSigner(TILES_CONTRACT, TILES_ABI);
        const transaction: any = await contractWithSigner.craftTiles(ids);

        return EthersApi.waitForTransaction(transaction.hash, 'polygon')
            .then((response: any) => {
                return Boolean(response.status);
            });
    }
}
