import ethersApi from './ethers.api';

import { GOTCHI_VAULT_CONTRACT, MAIN_CONTRACT } from './common/constants';
import { GOTCHI_VAULT_ABI } from 'data/abi/gotchivault.abi';

const contract = ethersApi.makeContract(GOTCHI_VAULT_CONTRACT, GOTCHI_VAULT_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getTokenIdsOfOriginalOwner(originalOwner){
        return contract.getTokenIdsOfDepositor(originalOwner, MAIN_CONTRACT)
    }
}
