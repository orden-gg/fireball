import { ethers } from 'ethers';

import ethersApi from './common/ethersApi';

import { AUTOPET_CONTRACT, GHST_CONTRACT } from './common/constants';
import { GHST_ABI } from '../data/abi/ghst.abi';

const contract = ethersApi.makeContract(GHST_CONTRACT, GHST_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async approveGhst(isApproved) {
        const writeContract = await ethersApi.makeContractWithSigner(GHST_CONTRACT, GHST_ABI);
        const maxSpend = isApproved ? '999999999999' : '0';

        const transaction = await writeContract.approve(
            AUTOPET_CONTRACT,
            ethers.utils.parseUnits(maxSpend)
        );

        try {
            const status = await ethersApi.waitForTransaction(transaction.hash, 'polygon').status;

            return Boolean(status);
        } catch {

            return false;
        }
    },

    async isGhstApproved(address) {
        const allowance = await contract.allowance(address, AUTOPET_CONTRACT);

        return ethers.utils.formatUnits(allowance._hex) >= 100;
    }
}
