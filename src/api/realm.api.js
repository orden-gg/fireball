import { REALM_ABI } from 'data/abi/realm.abi';

import { REALM_CONTRACT } from './common/constants';
import ethersApi from './ethers.api';

const realmContract = ethersApi.makeContract(REALM_CONTRACT, REALM_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getGotchiLastChanneled(id) {
        // !TODO: find a better solution for BigNumber parcing (default method doesn't work)
        return realmContract.getLastChanneled(id).then(response => response - 0);
    },

    getParcelLastChanneled(id) {
        // !TODO: find a better solution for BigNumber parcing (default method doesn't work)
        return realmContract.getParcelLastChanneled(id).then(response => response - 0);
    }
}
