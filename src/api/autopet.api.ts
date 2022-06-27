import { ethers } from 'ethers';

import { AUTOPET_CONTRACT } from 'shared/constants';
import { AUTOPET_ABI } from 'data/abi/autopet.abi';

import { EthersApi } from './ethers.api';

const contract = EthersApi.makeContract(AUTOPET_CONTRACT, AUTOPET_ABI, 'polygon');

export class AutopetApi {
    public static async subscribe(isApproved: any): Promise<boolean> {
        const writeContract = EthersApi.makeContractWithSigner(AUTOPET_CONTRACT, AUTOPET_ABI);

        const transaction: any = isApproved ?
            await writeContract.subscribe() :
            await writeContract.unsubscribe();

        return EthersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));

    }

    public static getUsers(): Promise<any> {
        return contract.allUsers();
    }

    public static getFee(): Promise<any> {
        return contract.fee().then((fee: any) => (
            parseInt(ethers.utils.formatUnits(fee._hex))
        ));
    }

    public static getFrens(): Promise<any> {
        return contract.frens().then((frens: any) => (
            parseInt(ethers.utils.formatUnits(frens._hex))
        ));
    }
}
