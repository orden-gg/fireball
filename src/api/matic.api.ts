import { EthersApi } from './ethers.api';

import { MATIC_CONTRACT } from 'shared/constants';
import { MATIC_ABI } from 'data/abi/matic.abi';
import { BigNumber } from 'ethers';

const contract = EthersApi.makeContract(MATIC_CONTRACT, MATIC_ABI, 'polygon');

export class MaticApi {
  public static getBalanceOf(address: string): string {
    return contract.balanceOf(address).then((balance: BigNumber) => EthersApi.hexToNumber(balance._hex));
  }
}
