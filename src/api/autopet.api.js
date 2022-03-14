import ethersApi from './common/ethersApi';

import { AUTOPET_CONTRACT } from './common/constants';
import { AUTOPET_ABI } from '../data/abi/autopet.abi';
const contract = ethersApi.makeContract(AUTOPET_CONTRACT, AUTOPET_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async subscribe(approval) {
        const writeContract = await ethersApi.makeContractWithSigner(AUTOPET_CONTRACT, AUTOPET_ABI);

        const transaction = approval ? 
            await writeContract.subscribe() :
            await writeContract.unsubscribe();

        try {
            const status = !!await this.getTransactionStatus(transaction.hash);
            return status;
        } catch {
            return false;
        }

    },

    async unsubscribe() {
        const writeContract = await ethersApi.makeContractWithSigner(AUTOPET_CONTRACT, AUTOPET_ABI);

        const transaction = await writeContract.unsubscribe();

        console.log(transaction);

        const status = await this.getTransactionStatus(transaction.hash);
        
        return status;
    },

    async isStaked(userAddress) {
        const users = await this.getUsers();

        const isStaked = users.some( address => (
            userAddress.toLowerCase() === address.toLowerCase()
        ));
        
        return isStaked;
    },

    async getUsers() {
        return await contract.allUsers();
    },

    async getTransactionStatus(hash) {
        return await ethersApi.waitForTransaction(hash, 'polygon');
    }
}
