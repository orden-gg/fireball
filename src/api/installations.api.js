import INSTALLATION_ABI from 'data/abi/installations.abi';
import TILE_ABI from 'data/abi/tile.abi';
import installationUtils from 'utils/installationUtils';
import tileUtils from 'utils/tileUtils';
import { INSTALLATION_CONTRACT, TILES_CONTRACT } from './common/constants';
import ethersApi from './ethers.api';

const installationsContract = ethersApi.makeContract(INSTALLATION_CONTRACT, INSTALLATION_ABI, 'polygon');
const tilesContract = ethersApi.makeContract(TILES_CONTRACT, TILE_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {

    async getInstallationsByAddress(address) {
        return await installationsContract.installationsBalances(address).then(response =>
            response.map(item => {
                const id = ethersApi.formatBigNumber(item.installationId._hex);

                return {
                    type: 'instalation',
                    name: installationUtils.getNameById(id),
                    balance: ethersApi.formatBigNumber(item.balance._hex),
                    id: id
                }
            })
        );
    },

    async getTilesByAddress(address) {
        return await tilesContract.tilesBalances(address).then(response =>
            response.map(item => {
                const id = ethersApi.formatBigNumber(item.tileId._hex);

                return {
                    type: 'tile',
                    name: tileUtils.getNameById(id),
                    balance: ethersApi.formatBigNumber(item.balance._hex),
                    id: id
                }
            })
        )
    }
}
