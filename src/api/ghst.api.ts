import { ethers } from 'ethers';

import { EthersApi } from './ethers.api';

import { AUTOPET_CONTRACT, GHST_CONTRACT } from 'shared/constants';
import { GHST_ABI } from 'data/abi/ghst.abi';

const contract = EthersApi.makeContract(GHST_CONTRACT, GHST_ABI, 'polygon');

export class GhstApi {
  public static async approveGhst(isApproved: boolean): Promise<any> {
    const writeContract: any = EthersApi.makeContractWithSigner(GHST_CONTRACT, GHST_ABI);
    const maxSpend: string = isApproved ? '100' : '0';
    const transaction: any = await writeContract.approve(AUTOPET_CONTRACT, ethers.utils.parseUnits(maxSpend));

    return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response) => Boolean(response.status));
  }

  public static isGhstApproved(address: any): any {
    return contract
      .allowance(address, AUTOPET_CONTRACT)
      .then((allowance) => EthersApi.hexToNumber(allowance._hex) >= 100);
  }

  public static getBalanceOf(address: any): any {
    return contract.balanceOf(address).then((balance: any) => EthersApi.hexToNumber(balance._hex));
  }
}
