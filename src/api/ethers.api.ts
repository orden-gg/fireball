import { ethers } from 'ethers';
import { POLYGON_RPC, RINKEBY_RPC } from './common/api.constants';

export const isEthAddress = (address: any): any => {
    return ethers.utils.isAddress(address);
};

export const fromWei = (value: any): any => {
    return parseFloat(ethers.utils.formatUnits(value));
};

export const toWei = (value: any): any => {
    // return ethers.utils.parseUnits(value, 'wei') // TODO: figure out how to use ethers method for this
    return value * 10**18;
};

export const formatBigNumber = (value: any): any => {
    return ethers.utils.formatUnits(value, 0);
};

export const getLastBlock = async (network?: any): Promise<any> => {
    const provider: any = getProvider(network);
    const blockNumber: any = await provider.getBlockNumber();

    return provider.getBlock(blockNumber);
};

export const getFutureBlockTimestamp = (currentBlock: any, futureBLock: any): any => {
    const averageBlockTime = 2.2; // !TODO: need more accurate way to get average block time
    const blocksDiff = futureBLock - currentBlock.number;

    return parseInt((averageBlockTime * blocksDiff) + currentBlock.timestamp);
};

export const waitForTransaction = (hash: any, network: any): any => {
    const provider = getProvider(network);

    return provider.waitForTransaction(hash).then(response => (
        response
    ));
};

export const makeContract = (contract: any, abi: any, network: any): any => {
    return new ethers.Contract(contract, abi, getProvider(network));
};

export const makeContractWithSigner = (contract: any, abi: any): any => {
    const provider: any = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer: any = provider.getSigner();

    return new ethers.Contract(contract, abi, signer);
};

export const getProvider = (network?: any): any => {
    switch (network) {
        case 'test':
            return new ethers.providers.JsonRpcProvider(RINKEBY_RPC);
        default:
            return new ethers.providers.JsonRpcProvider(POLYGON_RPC);
    }
};
