import { ethers } from 'ethers';

import { DEFAULT_COLLATERAL_DECIMALS, ETH_RPC, POLYGON_RPC, RINKEBY_RPC } from 'shared/constants';

export class EthersApi {
  private static cache: { [address: string]: string } = {};

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

  public static async getENS(address: string): Promise<string> {
    const provider = EthersApi.getProvider('eth');

    // Check if the address is already in the cache
    if (this.cache[address]) {
      return this.cache[address];
    }

    // If not, make the on-chain query
    const ensName = await provider.lookupAddress(address);

    // Store the result in the cache
    this.cache[address] = ensName;

    return ensName;
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
      case 'test':
        return new ethers.providers.JsonRpcProvider(RINKEBY_RPC);
      case 'eth':
        return new ethers.providers.JsonRpcProvider(ETH_RPC);
      default:
        return new ethers.providers.JsonRpcProvider(POLYGON_RPC);
    }
  }
}
