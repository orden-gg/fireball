import ethersApi from './common/ethersApi';

import { AUTOPET_CONTRACT } from './common/constants';
import { AUTOPET_ABI } from '../data/abi/autopet.abi';
import { ethers } from 'ethers';

const contract = ethersApi.makeContract(AUTOPET_CONTRACT, AUTOPET_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async subscribe(isApproved) {
        const writeContract = await ethersApi.makeContractWithSigner(AUTOPET_CONTRACT, AUTOPET_ABI);

        const transaction = isApproved ? 
            await writeContract.subscribe() :
            await writeContract.unsubscribe();

        try {
            const status = await ethersApi.waitForTransaction(transaction.hash, 'polygon').status;

            return Boolean(status);
        } catch {

            return false;
        }

    },

    async unsubscribe() {
        const writeContract = await ethersApi.makeContractWithSigner(AUTOPET_CONTRACT, AUTOPET_ABI);

        const transaction = await writeContract.unsubscribe();

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

    async getFee() {
        const fee = await contract.fee();

        return parseInt(ethers.utils.formatUnits(fee._hex));
    },

    async getFrens() {
        const frens = await contract.frens();

        return parseInt(ethers.utils.formatUnits(frens._hex));
    }
}
