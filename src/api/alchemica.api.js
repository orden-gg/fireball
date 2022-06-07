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

    getAlphaBalance(address) {
        return alphaContract.balanceOf(address).then(response => Number(ethers.utils.formatUnits(response._hex)));
    },

    getFomoBalance(address) {
        return fomoContract.balanceOf(address).then(response => Number(ethers.utils.formatUnits(response._hex)));
    },

    getFudBalance(address) {
        return fudContract.balanceOf(address).then(response => Number(ethers.utils.formatUnits(response._hex)));
    },

    getGltrBalance(address) {
        return gltrContract.balanceOf(address).then(response => Number(ethers.utils.formatUnits(response._hex)));
    }
};
