import Web3 from 'web3';
import Constants from './common/constants';

const web3 = new Web3(Constants.RPC_URL);
const contract = new web3.eth.Contract(Constants.ABI, Constants.TOKEN_ADDRESS);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getInventoryByAddress(address) {
        try {
            let contractResponse;

            await contract.methods.itemBalances(address).call()
                .then((response) => {
                    contractResponse = {items: response, owner: address};
                });

            return contractResponse;
        } catch (error) {
            return [];
        }
    },

    isAddressValid(address) {
        return Web3.utils.isAddress(address);
    }
}