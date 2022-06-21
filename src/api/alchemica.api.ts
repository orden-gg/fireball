import { ethers } from 'ethers';

import { EthersApi } from './ethers.api';

import { KEK_ABI, ALPHA_ABI, FOMO_ABI, FUD_ABI, GLTR_ABI } from 'data/abi/alchemica.abi';
import { KEK_CONTRACT, ALPHA_CONTRACT, FOMO_CONTRACT, FUD_CONTRACT, GLTR_CONTRACT } from './common/api.constants';

const akekContract = EthersApi.makeContract(KEK_CONTRACT, KEK_ABI, 'polygon');
const alphaContract = EthersApi.makeContract(ALPHA_CONTRACT, ALPHA_ABI, 'polygon');
const fomoContract = EthersApi.makeContract(FOMO_CONTRACT, FOMO_ABI, 'polygon');
const fudContract = EthersApi.makeContract(FUD_CONTRACT, FUD_ABI, 'polygon');
const gltrContract = EthersApi.makeContract(GLTR_CONTRACT, GLTR_ABI, 'polygon');

export class AlchemicaApi {
    public static getFudBalance(address: any): Promise<any> {
        return fudContract.balanceOf(address).then((response: any) => Number(ethers.utils.formatUnits(response._hex)));
    }

    public static getFomoBalance(address: any): Promise<any> {
        return fomoContract.balanceOf(address).then((response: any) => Number(ethers.utils.formatUnits(response._hex)));
    }

    public static getAlphaBalance(address: any): Promise<any> {
        return alphaContract.balanceOf(address).then((response: any) => Number(ethers.utils.formatUnits(response._hex)));
    }

    public static getKekBalance(address: any): Promise<any> {
        return akekContract.balanceOf(address).then((response: any) => Number(ethers.utils.formatUnits(response._hex)));
    }

    public static getGltrBalance(address: any): Promise<any> {
        return gltrContract.balanceOf(address).then((response: any) => Number(ethers.utils.formatUnits(response._hex)));
    }
}
