import { ethers } from 'ethers';

import { makeContract, makeContractWithSigner, waitForTransaction } from './ethers.api';

import { AUTOPET_CONTRACT, GHST_CONTRACT } from './common/api.constants';
import { GHST_ABI } from 'data/abi/ghst.abi';

const contract = makeContract(GHST_CONTRACT, GHST_ABI, 'polygon');

export const approveGhst = async (isApproved: boolean): Promise<any> => {
    const writeContract: any = makeContractWithSigner(GHST_CONTRACT, GHST_ABI);
    const maxSpend: string = isApproved ? '100' : '0';
    const transaction: any = await writeContract.approve(
        AUTOPET_CONTRACT,
        ethers.utils.parseUnits(maxSpend)
    );

    return waitForTransaction(transaction.hash, 'polygon').then(response => (
        Boolean(response.status)
    ));
};

export const isGhstApproved = (address: any): any => {
    return contract.allowance(address, AUTOPET_CONTRACT).then(allowance => (
        Number(ethers.utils.formatUnits(allowance._hex)) >= 100
    ));
};

export const getBalanceOf = (address: any): any => {
    return contract.balanceOf(address).then((balance: any) => Number(ethers.utils.formatUnits(balance._hex)));
};
