import { ethers } from 'ethers';
import { POLYGON_RPC, RINKEBY_RPC } from './common/constants';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    waitForTransaction(hash, network) {
        const provider = this.getProvider(network);

        return provider.waitForTransaction(hash).then(response => (
            response
        ));
    },

    makeContract(contract, abi, network) {
        return new ethers.Contract(contract, abi, this.getProvider(network));
    },

    makeContractWithSigner(contract, abi) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        return new ethers.Contract(contract, abi, signer);
    },
    
    getProvider(network) {
        switch (network) {
            case 'test':
                return new ethers.providers.JsonRpcProvider(RINKEBY_RPC);
            default:
                return new ethers.providers.JsonRpcProvider(POLYGON_RPC);
        }
    }
}
