import { REALM_ABI } from 'data/abi/realm.abi';

import { REALM_CONTRACT } from './common/api.constants';
import { EthersApi } from './ethers.api';

const realmContract = EthersApi.makeContract(REALM_CONTRACT, REALM_ABI, 'polygon');

export class RealmApi {
    public static getGotchiLastChanneled(id: any): any {
        // !TODO: find a better solution for BigNumber parcing (default method doesn't work)
        return realmContract.getLastChanneled(id).then((response: any) => response - 0);
    }

    // TODO check if needed
    public static getParcelLastChanneled(id: any): any {
        // !TODO: find a better solution for BigNumber parcing (default method doesn't work)
        return realmContract.getParcelLastChanneled(id).then((response: any) => response - 0);
    }

    // TODO check if needed
    public static getParcelInfo(parcels: any, ids: any): any {
        return realmContract.getParcelsAccessRights(parcels, ids);
    }
}
