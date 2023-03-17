import { ethers } from 'ethers';

import { EthersApi } from './ethers.api';

import { AUTOPET_CONTRACT, GHST_CONTRACT } from 'shared/constants';

import { GHST_ABI } from 'data/abi/ghst.abi';

const contract = EthersApi.makeContract(GHST_CONTRACT, GHST_ABI, 'polygon');

export class GhstApi {
  public static async approveGhst(isApproved: boolean): Promise<CustomAny> {
    const writeContract: CustomAny = EthersApi.makeContractWithSigner(GHST_CONTRACT, GHST_ABI);
    const maxSpend: string = isApproved ? '100' : '0';
    const transaction: CustomAny = await writeContract.approve(AUTOPET_CONTRACT, ethers.utils.parseUnits(maxSpend));

    return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: CustomAny) =>
      Boolean(response.status)
    );
  }

  public static isGhstApproved(address: CustomAny): CustomAny {
    return contract
      .allowance(address, AUTOPET_CONTRACT)
      .then((allowance: CustomAny) => EthersApi.hexToNumber(allowance._hex) >= 100);
  }

  public static getBalanceOf(address: CustomAny): CustomAny {
    return contract.balanceOf(address).then((balance: CustomAny) => EthersApi.hexToNumber(balance._hex));
  }
}
