import { ethers } from 'ethers';

import { EthersApi } from './ethers.api';

import { AUTOPET_CONTRACT } from 'shared/constants';

import { AUTOPET_ABI } from 'data/abi/autopet.abi';

const contract = EthersApi.makeContract(AUTOPET_CONTRACT, AUTOPET_ABI, 'polygon');

export class AutopetApi {
  public static async subscribe(isApproved: CustomAny): Promise<boolean> {
    const writeContract = EthersApi.makeContractWithSigner(AUTOPET_CONTRACT, AUTOPET_ABI);

    const transaction: CustomAny = isApproved ? await writeContract.subscribe() : await writeContract.unsubscribe();

    return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: CustomAny) =>
      Boolean(response.status)
    );
  }

  public static getUsers(): Promise<CustomAny> {
    return contract.allUsers();
  }

  public static getFee(): Promise<CustomAny> {
    return contract.fee().then((fee: CustomAny) => parseInt(ethers.utils.formatUnits(fee._hex)));
  }

  public static getFrens(): Promise<CustomAny> {
    return contract.frens().then((frens: CustomAny) => parseInt(ethers.utils.formatUnits(frens._hex)));
  }
}
