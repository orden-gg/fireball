import ethersApi from './ethers.api';

import { AUTOPET_CONTRACT, OLD_AUTOPET_CONTRACT } from './common/constants';
import { AUTOPET_ABI } from 'data/abi/autopet.abi';
import { ethers } from 'ethers';

// OLD CODE
import { OLD_AUTOPET_ABI } from 'data/abi/oldAutopet.abi';

const contract = ethersApi.makeContract(AUTOPET_CONTRACT, AUTOPET_ABI, 'polygon');

// OLD CODE
const oldContract = ethersApi.makeContract(OLD_AUTOPET_CONTRACT, OLD_AUTOPET_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async subscribe(isApproved) {
        const writeContract = ethersApi.makeContractWithSigner(AUTOPET_CONTRACT, AUTOPET_ABI);

        const transaction = isApproved ?
            await writeContract.subscribe() :
            await writeContract.unsubscribe();

        return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));

    },

    async unsubscribe() {
        const writeContract = ethersApi.makeContractWithSigner(AUTOPET_CONTRACT, AUTOPET_ABI);

        const transaction = await writeContract.unsubscribe();

        const response = await this.getTransactionStatus(transaction.hash);

        return response.status;
    },

    getUsers() {
        return contract.allUsers();
    },

    getFee() {
        return contract.fee().then(fee => (
            parseInt(ethers.utils.formatUnits(fee._hex))
        ));
    },

    getFrens() {
        return contract.frens().then(frens => (
            parseInt(ethers.utils.formatUnits(frens._hex))
        ));
    },

    // OLD CODE
    async oldSubscribe(isApproved) {
        const writeContract = ethersApi.makeContractWithSigner(OLD_AUTOPET_CONTRACT, OLD_AUTOPET_ABI);

        const transaction = isApproved ?
            await writeContract.subscribe() :
            await writeContract.unsubscribe();

        return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));

    },

    oldGetUsers() {
        return oldContract.allUsers();
    },

    oldGetFee() {
        return oldContract.fee().then(fee => (
            parseInt(ethers.utils.formatUnits(fee._hex))
        ));
    },

    oldGetFrens() {
        return oldContract.frens().then(frens => (
            parseInt(ethers.utils.formatUnits(frens._hex))
        ));
    },
}
