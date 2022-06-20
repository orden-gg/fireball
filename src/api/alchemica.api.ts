import { ethers } from 'ethers';

import { makeContract } from './ethers.api';

import { KEK_ABI, ALPHA_ABI, FOMO_ABI, FUD_ABI, GLTR_ABI } from 'data/abi/alchemica.abi';
import { KEK_CONTRACT, ALPHA_CONTRACT, FOMO_CONTRACT, FUD_CONTRACT, GLTR_CONTRACT } from './common/api.constants';

const akekContract = makeContract(KEK_CONTRACT, KEK_ABI, 'polygon');
const alphaContract = makeContract(ALPHA_CONTRACT, ALPHA_ABI, 'polygon');
const fomoContract = makeContract(FOMO_CONTRACT, FOMO_ABI, 'polygon');
const fudContract = makeContract(FUD_CONTRACT, FUD_ABI, 'polygon');
const gltrContract = makeContract(GLTR_CONTRACT, GLTR_ABI, 'polygon');

export const getFudBalance = (address: any): Promise<any> => {
    return fudContract.balanceOf(address).then((response: any) => Number(ethers.utils.formatUnits(response._hex)));
};

export const getFomoBalance = (address: any): Promise<any> => {
    return fomoContract.balanceOf(address).then((response: any) => Number(ethers.utils.formatUnits(response._hex)));
};

export const getAlphaBalance = (address: any): Promise<any> => {
    return alphaContract.balanceOf(address).then((response: any) => Number(ethers.utils.formatUnits(response._hex)));
};

export const getKekBalance = (address: any): Promise<any> => {
    return akekContract.balanceOf(address).then((response: any) => Number(ethers.utils.formatUnits(response._hex)));
};

export const getGltrBalance = (address: any): Promise<any> => {
    return gltrContract.balanceOf(address).then((response: any) => Number(ethers.utils.formatUnits(response._hex)));
};
