import { ethers } from 'ethers';

import { DEFAULT_COLLATERAL_DECIMALS, POLYGON_RPC, RINKEBY_RPC } from 'shared/constants';

export class EthersApi {
    public static isEthAddress(address: any): any {
        return ethers.utils.isAddress(address);
    }

    public static fromWei(value: any, decimals: number = DEFAULT_COLLATERAL_DECIMALS): number {
        return Number(ethers.utils.formatUnits(value, decimals));
    }

    public static toWei(value: any): any {
        // return ethers.utils.parseUnits(value, 'wei') // TODO: figure out how to use ethers method for this
        return value * 10 ** 18;
    }

    public static formatBigNumber(value: any): any {
        return ethers.utils.formatUnits(value, 0);
    }

    public static hexToNumber(hex: string): number {
        return Number(ethers.utils.formatUnits(hex));
    }

    public static async getBlockByNumber(blockNumber: number, network?: any): Promise<any> {
        const provider: any = EthersApi.getProvider(network);

        return provider.getBlock(blockNumber);
    }

    public static async getLastBlock(network?: any): Promise<any> {
        const provider: any = EthersApi.getProvider(network);
        const blockNumber: any = await provider.getBlockNumber();

        return provider.getBlock(blockNumber);
    }

    public static getFutureBlockTimestamp(currentBlock: any, futureBLock: any): any {
        const averageBlockTime = 2.2; // !TODO: need more accurate way to get average block time
        const blocksDiff = futureBLock - currentBlock.number;

        return parseInt(averageBlockTime * blocksDiff + currentBlock.timestamp);
    }

    public static waitForTransaction(hash: any, network: any): any {
        const provider = EthersApi.getProvider(network);

        return provider.waitForTransaction(hash).then((response) => response);
    }

    public static makeContract(contract: any, abi: any, network: any): any {
        return new ethers.Contract(contract, abi, EthersApi.getProvider(network));
    }

    public static makeContractWithSigner(contract: any, abi: any): any {
        const provider: any = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer: any = provider.getSigner();

        return new ethers.Contract(contract, abi, signer);
    }

    public static getProvider(network?: any): any {
        switch (network) {
            case 'test':
                return new ethers.providers.JsonRpcProvider(RINKEBY_RPC);
            default:
                return new ethers.providers.JsonRpcProvider(POLYGON_RPC);
        }
    }
}
