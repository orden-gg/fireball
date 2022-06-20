import ethersApi from './ethers.api';

import { AUTOPET_CONTRACT } from './common/api.constants';
import { AUTOPET_ABI } from 'data/abi/autopet.abi';
import { ethers } from 'ethers';

const contract = ethersApi.makeContract(AUTOPET_CONTRACT, AUTOPET_ABI, 'polygon');

export const subscribe = async (isApproved: any): Promise<boolean> => {
    const writeContract = ethersApi.makeContractWithSigner(AUTOPET_CONTRACT, AUTOPET_ABI);

    const transaction: any = isApproved ?
        await writeContract.subscribe() :
        await writeContract.unsubscribe();

    return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
        Boolean(response.status)
    ));

};

// TODO check if needed, probably not
// export const unsubscribe = async () => {
//     const writeContract = ethersApi.makeContractWithSigner(AUTOPET_CONTRACT, AUTOPET_ABI);

//     const transaction = await writeContract.unsubscribe();

//     const response = await getTransactionStatus(transaction.hash);

//     return response.status;
// };

export const getUsers = (): Promise<any> => {
    return contract.allUsers();
};

export const getFee = (): Promise<any> => {
    return contract.fee().then((fee: any) => (
        parseInt(ethers.utils.formatUnits(fee._hex))
    ));
};

export const getFrens = (): Promise<any> => {
    return contract.frens().then((frens: any) => (
        parseInt(ethers.utils.formatUnits(frens._hex))
    ));
};
