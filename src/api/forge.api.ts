import { EthersApi } from './ethers.api';

import { FORGE_CONTRACT } from 'shared/constants';
import { FORGE_ABI } from 'data/abi/forge.abi';
import { BigNumber } from 'ethers';

const contract = EthersApi.makeContract(FORGE_CONTRACT, FORGE_ABI, 'polygon');

export class ForgeApi {
  public static getBalanceOf(address: string, tokenId: BigNumber): string {
    return contract.balanceOf(address,tokenId).then((balance: BigNumber) => EthersApi.hexToNumber(balance._hex));
  }
}
