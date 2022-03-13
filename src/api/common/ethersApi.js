import { ethers } from 'ethers';
import { POLYGON_RPC, TEST_NET_RPC } from './constants';

const polygonProvider = new ethers.providers.JsonRpcProvider(POLYGON_RPC);
const testProvider = new ethers.providers.JsonRpcProvider(TEST_NET_RPC);

const getProvider = (network) => {
    switch (network) {
        case 'test':
            return testProvider;
        default:
            return polygonProvider;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async waitForTransaction(hash, network) {
        const provider = getProvider(network);

        return await provider.waitForTransaction(hash);
    },

    makeContract(contract, abi, network) {
        return new ethers.Contract(contract, abi, getProvider(network));
    },

    async makeContractWithSigner(contract, abi) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        return new ethers.Contract(contract, abi, signer);
    }
}
