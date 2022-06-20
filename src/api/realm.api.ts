import { REALM_ABI } from 'data/abi/realm.abi';

import { REALM_CONTRACT } from './common/api.constants';
import { makeContract } from './ethers.api';

const realmContract = makeContract(REALM_CONTRACT, REALM_ABI, 'polygon');

export const getGotchiLastChanneled = (id: any): any => {
    // !TODO: find a better solution for BigNumber parcing (default method doesn't work)
    return realmContract.getLastChanneled(id).then((response: any) => response - 0);
};

// TODO check if needed
export const getParcelLastChanneled = (id: any): any => {
    // !TODO: find a better solution for BigNumber parcing (default method doesn't work)
    return realmContract.getParcelLastChanneled(id).then((response: any) => response - 0);
};

// TODO check if needed
export const getParcelInfo = (parcels: any, ids: any): any => {
    return realmContract.getParcelsAccessRights(parcels, ids);
};
