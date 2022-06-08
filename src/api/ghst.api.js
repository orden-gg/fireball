import { ethers } from 'ethers';

import ethersApi from './ethers.api';

import { OLD_AUTOPET_CONTRACT, AUTOPET_CONTRACT, GHST_CONTRACT } from './common/constants';
import { GHST_ABI } from 'data/abi/ghst.abi';

const contract = ethersApi.makeContract(GHST_CONTRACT, GHST_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async approveGhst(isApproved) {
        const writeContract = ethersApi.makeContractWithSigner(GHST_CONTRACT, GHST_ABI);
        const maxSpend = isApproved ? '100' : '0';
        const transaction = await writeContract.approve(
            AUTOPET_CONTRACT,
            ethers.utils.parseUnits(maxSpend)
        );

        return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));
    },

    isGhstApproved(address) {
        return contract.allowance(address, AUTOPET_CONTRACT).then(allowance => (
            Number(ethers.utils.formatUnits(allowance._hex)) >= 100
        ));
    },

    getBalanceOf(address) {
        return contract.balanceOf(address).then(balance => Number(ethers.utils.formatUnits(balance._hex)));
    },

    // OLD CODE
    isOldGhstApproved(address) {
        return contract.allowance(address, OLD_AUTOPET_CONTRACT).then(allowance => (
            ethers.utils.formatUnits(allowance._hex) >= 100
        ));
    },

    async oldApproveGhst(isApproved) {
        const writeContract = ethersApi.makeContractWithSigner(GHST_CONTRACT, GHST_ABI);
        const maxSpend = isApproved ? '100' : '0';
        const transaction = await writeContract.approve(
            OLD_AUTOPET_CONTRACT,
            ethers.utils.parseUnits(maxSpend)
        );

        return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));
    }

};
