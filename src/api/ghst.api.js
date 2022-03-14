import { ethers } from 'ethers';

import ethersApi from './common/ethersApi';

import { AUTOPET_CONTRACT, GHST_CONTRACT } from './common/constants';
import { GHST_ABI } from '../data/abi/ghst.abi';

const contract = ethersApi.makeContract(GHST_CONTRACT, GHST_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async approveGhst(approval) {
        const writeContract = await ethersApi.makeContractWithSigner(GHST_CONTRACT, GHST_ABI);
        const transaction = await writeContract.approve(
            AUTOPET_CONTRACT,
            ethers.utils.parseUnits(approval ? '999999999999' : '0')
        );

        try {
            const status = !!await this.getTransactionStatus(transaction.hash);
            return status;
        } catch {
            return false;
        }
    },

    async isGhstApproved(address) {
        const allowance = await contract.allowance(address, AUTOPET_CONTRACT);
        return ethers.utils.formatUnits(allowance._hex) >= 100;
    },

    async getTransactionStatus(hash) {
        return await ethersApi.waitForTransaction(hash, 'polygon');
    }
}
