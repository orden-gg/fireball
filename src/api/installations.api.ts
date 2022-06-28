import INSTALLATIONS_ABI from 'data/abi/installations.abi.json';

import { INSTALLATION_CONTRACT } from 'shared/constants';

import { EthersApi } from './ethers.api';

const installationsContract = EthersApi.makeContract(INSTALLATION_CONTRACT, INSTALLATIONS_ABI, 'polygon');

export class InstallationsApi {
    public static getInstallationsByAddress(address: any): any {
        return installationsContract.installationsBalances(address);
    }

    // TODO check if needed
    public static getAllUpgradeQueue(): any {
        return installationsContract.getAllUpgradeQueue()
            .then((res: any) => res.map((item: any) => ({
                readyBlock: item.readyBlock,
                claimed: item.claimed,
                parcelId: EthersApi.formatBigNumber(item.parcelId),
                installationId: EthersApi.formatBigNumber(item.installationId)
            })))
            .catch((e: any) => {
                console.log(e);

                return [];
            });
    }

    public static getUpgradeQueueByAddress(address: any): any {
        return installationsContract.getUserUpgradeQueue(address)
            .then((res: any) => res[0].map((item: any) => ({
                readyBlock: item.readyBlock,
                claimed: item.claimed,
                parcelId: EthersApi.formatBigNumber(item.parcelId),
                installationId: EthersApi.formatBigNumber(item.installationId)
            })))
            .catch((e: any) => {
                console.log(e);

                return [];
            });
    }

    public static async finalizeUpgrades (ids: any): Promise<any> {
        const contractWithSigner = EthersApi.makeContractWithSigner(INSTALLATION_CONTRACT, INSTALLATIONS_ABI);
        const transaction = await contractWithSigner.finalizeUpgrades(ids);

        return EthersApi.waitForTransaction(transaction.hash, 'polygon')
            .then((response: any) => {
                return Boolean(response.status);
            });
    }

    public static async craftInstallations(ids: string[], glts: number[]): Promise<any> {
        const contractWithSigner: any = EthersApi.makeContractWithSigner(INSTALLATION_CONTRACT, INSTALLATIONS_ABI);
        const transaction: any = await contractWithSigner.craftInstallations(ids, glts);

        return EthersApi.waitForTransaction(transaction.hash, 'polygon')
            .then((response: any) => {
                return Boolean(response.status);
            });
    }
}
