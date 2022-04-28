import INSTALLATIONS_ABI from 'data/abi/installations.abi';
import installationsUtils from 'utils/installationsUtils';
import { INSTALLATIONS_CONTRACT } from './common/constants';
import ethersApi from './ethers.api';

const contract = ethersApi.makeContract(INSTALLATIONS_CONTRACT, INSTALLATIONS_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {

    async getInstallationsByAddress(address) {
        return await contract.installationsBalances(address).then(response =>
            response.map(item => {
                const id = ethersApi.formatBigNumber(item.installationId._hex);

                return {
                    name: installationsUtils.getInstallationNameById(id),
                    balance: ethersApi.formatBigNumber(item.balance._hex),
                    id: id
                }
            })
        );
    }
}
