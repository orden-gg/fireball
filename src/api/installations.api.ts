import { INSTALLATIONS_ABI } from 'data/abi/installations.abi';

import { INSTALLATION_CONTRACT } from './common/api.constants';
import { formatBigNumber, makeContract, makeContractWithSigner, waitForTransaction } from './ethers.api';

const installationsContract = makeContract(INSTALLATION_CONTRACT, INSTALLATIONS_ABI, 'polygon');

export const getInstallationsByAddress = (address: any): any => {
    return installationsContract.installationsBalances(address);
};

export const getAllUpgradeQueue = (): any => {
    return installationsContract.getAllUpgradeQueue()
        .then((res: any) => res.map((item: any) => ({
            readyBlock: item.readyBlock,
            claimed: item.claimed,
            parcelId: formatBigNumber(item.parcelId),
            installationId: formatBigNumber(item.installationId)
        })))
        .catch((e: any) => {
            console.log(e);

            return [];
        });
};

export const getUpgradeQueueByAddress = (address: any): any => {
    return installationsContract.getUserUpgradeQueue(address)
        .then((res: any) => res[0].map((item: any) => ({
            readyBlock: item.readyBlock,
            claimed: item.claimed,
            parcelId: formatBigNumber(item.parcelId),
            installationId: formatBigNumber(item.installationId)
        })))
        .catch((e: any) => {
            console.log(e);

            return [];
        });
};

export const finalizeUpgrades = async (ids: any): Promise<any> =>  {
    const contractWithSigner = makeContractWithSigner(INSTALLATION_CONTRACT, INSTALLATIONS_ABI);
    const transaction = await contractWithSigner.finalizeUpgrades(ids);

    return waitForTransaction(transaction.hash, 'polygon')
        .then((response: any) => {
            return Boolean(response.status);
        });
};
