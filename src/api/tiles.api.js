import TILES_ABI from 'data/abi/tiles.abi';

import { TILES_CONTRACT } from './common/constants';
import ethersApi from './ethers.api';

const tilesContract = ethersApi.makeContract(TILES_CONTRACT, TILES_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
     getTilesByAddress(address) {
        return tilesContract.tilesBalances(address);
    },

    async craftTiles(ids) {
        const contractWithSigner = ethersApi.makeContractWithSigner(TILES_CONTRACT, TILES_ABI);
        const transaction = await contractWithSigner.craftTiles(ids);

        return ethersApi.waitForTransaction(transaction.hash, 'polygon')
            .then(response => {
                return Boolean(response.status);
            });
    }
};
