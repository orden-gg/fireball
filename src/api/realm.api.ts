import { REALM_CONTRACT } from 'shared/constants';

import REALM_ABI from 'data/abi/realm.abi.json';

import { EthersApi } from './ethers.api';

const realmContract = EthersApi.makeContract(REALM_CONTRACT, REALM_ABI, 'polygon');

export class RealmApi {
  public static getGotchiLastChanneled(id: any): any {
    // !TODO: find a better solution for BigNumber parcing (default method doesn't work)
    return realmContract.getLastChanneled(id).then((response: any) => response - 0);
  }
}
