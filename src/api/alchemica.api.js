import { ethers } from 'ethers';

import ethersApi from './ethers.api';

import { KEK_ABI, ALPHA_ABI, FOMO_ABI, FUD_ABI, GLTR_ABI } from 'data/abi/alchemica.abi';
import { KEK_CONTRACT, ALPHA_CONTRACT, FOMO_CONTRACT, FUD_CONTRACT, GLTR_CONTRACT } from './common/constants';

const akekContract = ethersApi.makeContract(KEK_CONTRACT, KEK_ABI, 'polygon');
const alphaContract = ethersApi.makeContract(ALPHA_CONTRACT, ALPHA_ABI, 'polygon');
const fomoContract = ethersApi.makeContract(FOMO_CONTRACT, FOMO_ABI, 'polygon');
const fudContract = ethersApi.makeContract(FUD_CONTRACT, FUD_ABI, 'polygon');
const gltrContract = ethersApi.makeContract(GLTR_CONTRACT, GLTR_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getKekBalance(address) {
        return akekContract.balanceOf(address).then(response => Number(ethers.utils.formatUnits(response._hex)));
    },

    isKekApproved(address, contractAddress) {
        return akekContract.allowance(address, contractAddress).then(allowance =>
            Number(ethers.utils.formatUnits(allowance._hex)) > 10000
        );
    },

    async approveKek(operator) {
        const contract = ethersApi.makeContractWithSigner(KEK_CONTRACT, KEK_ABI);
        const transaction = await contract.approve(
            operator,
            ethers.utils.parseUnits('999999999')
        );

        return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));
    },

    getAlphaBalance(address) {
        return alphaContract.balanceOf(address).then(response => Number(ethers.utils.formatUnits(response._hex)));
    },

    isAlphaApproved(address, contractAddress) {
        return alphaContract.allowance(address, contractAddress).then(allowance =>
            Number(ethers.utils.formatUnits(allowance._hex)) > 10000
        );
    },

    async approveAlpha(operator) {
        const contract = ethersApi.makeContractWithSigner(ALPHA_CONTRACT, ALPHA_ABI);
        const transaction = await contract.approve(
            operator,
            ethers.utils.parseUnits('999999999')
        );

        return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));
    },

    getFomoBalance(address) {
        return fomoContract.balanceOf(address).then(response => Number(ethers.utils.formatUnits(response._hex)));
    },

    isFomoApproved(address, contractAddress) {
        return fomoContract.allowance(address, contractAddress).then(allowance =>
            Number(ethers.utils.formatUnits(allowance._hex)) > 10000
        );
    },

    async approveFomo(operator) {
        const contract = ethersApi.makeContractWithSigner(FOMO_CONTRACT, FOMO_ABI);
        const transaction = await contract.approve(
            operator,
            ethers.utils.parseUnits('999999999')
        );

        return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));
    },

    getFudBalance(address) {
        return fudContract.balanceOf(address).then(response => Number(ethers.utils.formatUnits(response._hex)));
    },

    isFudApproved(address, contractAddress) {
        return fudContract.allowance(address, contractAddress).then(allowance =>
            Number(ethers.utils.formatUnits(allowance._hex)) > 10000
        );
    },

    async approveFud(operator) {
        const contract = ethersApi.makeContractWithSigner(FUD_CONTRACT, FUD_ABI);
        const transaction = await contract.approve(
            operator,
            ethers.utils.parseUnits('999999999')
        );

        return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));
    },

    getGltrBalance(address) {
        return gltrContract.balanceOf(address).then(response => Number(ethers.utils.formatUnits(response._hex)));
    }
};
