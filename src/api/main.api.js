import ethersApi from './common/ethersApi';

import { AUTOPET_CONTRACT, MAIN_CONTRACT } from './common/constants';
import { MAIN_ABI } from '../data/abi/main';
import { AUTOPET_ABI } from '../data/abi/autopet.abi';

const contract = ethersApi.makeContract(MAIN_CONTRACT, MAIN_ABI, 'polygon');
const autopetContract = ethersApi.makeContract(AUTOPET_CONTRACT, AUTOPET_ABI, 'polygon')

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async approvePet(approval) {
        const writeContract = await ethersApi.makeContractWithSigner(MAIN_CONTRACT, MAIN_ABI);
        const operator = await autopetContract.operator();
        const transaction = await writeContract.setPetOperatorForAll(operator, approval);

        try {
            const status = !!await this.getTransactionStatus(transaction.hash);
            return status;
        } catch {
            return false;
        }
    },

    async isPetApproved(address) {
        const operator = await autopetContract.operator();
        return await contract.isPetOperatorForAll(address, operator);
    },

    async getTransactionStatus(hash) {
        return await ethersApi.waitForTransaction(hash, 'polygon');
    }
}
