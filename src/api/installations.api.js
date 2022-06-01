import INSTALLATIONS_ABI from 'data/abi/installations.abi';

import { INSTALLATION_CONTRACT } from './common/constants';
import ethersApi from './ethers.api';

const installationsContract = ethersApi.makeContract(INSTALLATION_CONTRACT, INSTALLATIONS_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getInstallationsByAddress(address) {
        return installationsContract.installationsBalances(address);
    },

    getAllUpgradeQueue() {
        return installationsContract.getAllUpgradeQueue()
            .then(res => res.map(item => ({
                readyBlock: item.readyBlock,
                claimed: item.claimed,
                parcelId: ethersApi.formatBigNumber(item.parcelId),
                installationId: ethersApi.formatBigNumber(item.installationId),
            })));
    },

    getUpgradeQueueByAddress(address) {
        return installationsContract.getUserUpgradeQueue(address)
            .then(res => res.map(item => ({
                readyBlock: item.readyBlock,
                claimed: item.claimed,
                parcelId: ethersApi.formatBigNumber(item.parcelId),
                installationId: ethersApi.formatBigNumber(item.installationId),
            })));
    },

    async finalizeUpgrades(ids) {
        const contractWithSigner = ethersApi.makeContractWithSigner(INSTALLATION_CONTRACT, INSTALLATIONS_ABI);
        const transaction = await contractWithSigner.finalizeUpgrades(ids);

        return ethersApi.waitForTransaction(transaction.hash, 'polygon')
            .then(response => {
                console.log('finalizeUpgrades', Boolean(response.status))
                return Boolean(response.status)
            });
    },
}
