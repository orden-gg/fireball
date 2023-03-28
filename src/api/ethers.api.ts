import { ethers } from 'ethers';

import { DEFAULT_COLLATERAL_DECIMALS, GEORLI_RPC, POLYGON_RPC, RINKEBY_RPC } from 'shared/constants';

export class EthersApi {
  public static isEthAddress(address: CustomAny): CustomAny {
    return ethers.utils.isAddress(address);
  }

  public static fromWei(value: CustomAny, decimals: number = DEFAULT_COLLATERAL_DECIMALS): number {
    return Number(ethers.utils.formatUnits(value, decimals));
  }

  public static toWei(value: CustomAny): CustomAny {
    // return ethers.utils.parseUnits(value, 'wei') // TODO: figure out how to use ethers method for this
    return value * 10 ** 18;
  }

  public static formatBigNumber(value: CustomAny): CustomAny {
    return ethers.utils.formatUnits(value, 0);
  }

  public static hexToNumber(hex: string): number {
    return Number(ethers.utils.formatUnits(hex));
  }

  public static async getBlockByNumber(blockNumber: number, network?: CustomAny): Promise<CustomAny> {
    const provider: CustomAny = EthersApi.getProvider(network);

    return provider.getBlock(blockNumber);
  }

  public static async getLastBlock(network?: CustomAny): Promise<CustomAny> {
    const provider: CustomAny = EthersApi.getProvider(network);
    const blockNumber: CustomAny = await provider.getBlockNumber();

    return provider.getBlock(blockNumber);
  }

  public static getFutureBlockTimestamp(currentBlock: CustomAny, futureBLock: CustomAny): CustomAny {
    const averageBlockTime = 2.2; // !TODO: need more accurate way to get average block time
    const blocksDiff = futureBLock - currentBlock.number;

    return parseInt(averageBlockTime * blocksDiff + currentBlock.timestamp);
  }

  public static waitForTransaction(hash: CustomAny, network: CustomAny): CustomAny {
    const provider = EthersApi.getProvider(network);

    return provider.waitForTransaction(hash).then((response: CustomAny) => response);
  }

  public static makeContract(contract: CustomAny, abi: CustomAny, network: CustomAny): CustomAny {
    return new ethers.Contract(contract, abi, EthersApi.getProvider(network));
  }

  public static makeContractWithSigner(contract: CustomAny, abi: CustomAny): CustomAny {
    const provider: CustomAny = new ethers.providers.Web3Provider((window as CustomAny).ethereum);
    const signer: CustomAny = provider.getSigner();

    return new ethers.Contract(contract, abi, signer);
  }

  public static getProvider(network?: CustomAny): CustomAny {
    switch (network) {
      case 'georli':
        return new ethers.providers.JsonRpcProvider(GEORLI_RPC);
      case 'test':
        return new ethers.providers.JsonRpcProvider(RINKEBY_RPC);
      default:
        return new ethers.providers.JsonRpcProvider(POLYGON_RPC);
    }
  }
}
