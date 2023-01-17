import { ethers } from 'ethers';

import { EthersApi } from './ethers.api';

import { KEK_ABI, ALPHA_ABI, FOMO_ABI, FUD_ABI, GLTR_ABI } from 'data/abi/alchemica.abi';
import { KEK_CONTRACT, ALPHA_CONTRACT, FOMO_CONTRACT, FUD_CONTRACT, GLTR_CONTRACT, MIN_SPEND, TO_SPEND } from 'shared/constants';

const akekContract = EthersApi.makeContract(KEK_CONTRACT, KEK_ABI, 'polygon');
const alphaContract = EthersApi.makeContract(ALPHA_CONTRACT, ALPHA_ABI, 'polygon');
const fomoContract = EthersApi.makeContract(FOMO_CONTRACT, FOMO_ABI, 'polygon');
const fudContract = EthersApi.makeContract(FUD_CONTRACT, FUD_ABI, 'polygon');
const gltrContract = EthersApi.makeContract(GLTR_CONTRACT, GLTR_ABI, 'polygon');

export class AlchemicaApi {
    public static getFudBalance(address: string): Promise<number> {
        return fudContract.balanceOf(address).then((response: any) => EthersApi.hexToNumber(response._hex));
    }

    public static isFudApproved(address: string, contractAddress: string): Promise<boolean> {
        return fudContract.allowance(address, contractAddress).then((allowance: any) =>
            EthersApi.hexToNumber(allowance._hex) > MIN_SPEND
        );
    }

    public static async approveFud(operator: string): Promise<any> {
        const contract: any = EthersApi.makeContractWithSigner(FUD_CONTRACT, FUD_ABI);
        const transaction: any = await contract.approve(
            operator,
            ethers.utils.parseUnits(TO_SPEND)
        );

        return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: any) => (
            Boolean(response.status)
        ));
    }

    public static getFomoBalance(address: string): Promise<number> {
        return fomoContract.balanceOf(address).then((response: any) => EthersApi.hexToNumber(response._hex));
    }

    public static isFomoApproved(address: string, contractAddress: string): Promise<boolean> {
        return fomoContract.allowance(address, contractAddress).then((allowance: any) =>
            EthersApi.hexToNumber(allowance._hex) > MIN_SPEND
        );
    }

    public static async approveFomo(operator: string): Promise<boolean> {
        const contract: any = EthersApi.makeContractWithSigner(FOMO_CONTRACT, FOMO_ABI);
        const transaction: any = await contract.approve(
            operator,
            ethers.utils.parseUnits(TO_SPEND)
        );

        return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: any) => (
            Boolean(response.status)
        ));
    }

    public static getAlphaBalance(address: string): Promise<number> {
        return alphaContract.balanceOf(address).then((response: any) => EthersApi.hexToNumber(response._hex));
    }

    public static isAlphaApproved(address: string, contractAddress: string): Promise<boolean> {
        return alphaContract.allowance(address, contractAddress).then((allowance: any) =>
            EthersApi.hexToNumber(allowance._hex) > MIN_SPEND
        );
    }

    public static async approveAlpha(operator: string): Promise<any> {
        const contract: any = EthersApi.makeContractWithSigner(ALPHA_CONTRACT, ALPHA_ABI);
        const transaction: any = await contract.approve(
            operator,
            ethers.utils.parseUnits(TO_SPEND)
        );

        return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: any) => (
            Boolean(response.status)
        ));
    }

    public static getKekBalance(address: string): Promise<any> {
        return akekContract.balanceOf(address).then((response: any) => EthersApi.hexToNumber(response._hex));
    }

    public static isKekApproved(address: string, contractAddress: string): Promise<any> {
        return akekContract.allowance(address, contractAddress).then((allowance: any) =>
            EthersApi.hexToNumber(allowance._hex) > MIN_SPEND
        );
    }

    public static async approveKek(operator: any): Promise<any> {
        const contract: any = EthersApi.makeContractWithSigner(KEK_CONTRACT, KEK_ABI);
        const transaction: any = await contract.approve(
            operator,
            ethers.utils.parseUnits(TO_SPEND)
        );

        return EthersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));
    }

    public static getGltrBalance(address: any): Promise<any> {
        return gltrContract.balanceOf(address).then((response: any) => EthersApi.hexToNumber(response._hex));
    }
}
