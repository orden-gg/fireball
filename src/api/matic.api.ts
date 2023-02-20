import { EthersApi } from './ethers.api';

import { MATIC_CONTRACT } from 'shared/constants';
import { MATIC_ABI } from 'data/abi/matic.abi';

const contract = EthersApi.makeContract(MATIC_CONTRACT, MATIC_ABI, 'polygon');

export class MaticApi {
  public static getBalanceOf(address: any): string {
    return contract.balanceOf(address).then((balance: any) => EthersApi.hexToNumber(balance._hex));
  }
}
