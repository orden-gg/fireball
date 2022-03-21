import ethersApi from './ethers.api';

import { AUTOPET_CONTRACT, MAIN_CONTRACT } from './common/constants';
import { MAIN_ABI } from 'data/abi/main.abi';
import { AUTOPET_ABI } from 'data/abi/autopet.abi';

const contract = ethersApi.makeContract(MAIN_CONTRACT, MAIN_ABI, 'polygon');
const autopetContract = ethersApi.makeContract(AUTOPET_CONTRACT, AUTOPET_ABI, 'polygon')

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async approvePet(isApproved) {
        const writeContract = ethersApi.makeContractWithSigner(MAIN_CONTRACT, MAIN_ABI);
        const operator = await autopetContract.operator();
        const transaction = await writeContract.setPetOperatorForAll(operator, isApproved);

        return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));
    },

    isPetApproved(address) {
        return autopetContract.operator().then(operator => (
            contract.isPetOperatorForAll(address, operator)
        ));
    }
}
