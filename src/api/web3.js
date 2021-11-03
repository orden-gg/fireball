import Web3 from 'web3';
import itemUtils from '../utils/itemUtils';

import { MAIN_CONTRACT, POLYGON_RPC, TICKETS_CONTRACT } from './common/constants';
import { MAIN_ABI } from '../data/abi/main';
import { TICKETS_ABI } from '../data/abi/tickets';

const web3 = new Web3(POLYGON_RPC);
const contract = new web3.eth.Contract(MAIN_ABI, MAIN_CONTRACT);
const ticketsContract = new web3.eth.Contract(TICKETS_ABI, TICKETS_CONTRACT);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    isAddressValid(address) {
        return Web3.utils.isAddress(address);
    },

    async getInventoryByAddress(address) {
        try {
            let contractResponse;

            await contract.methods.itemBalances(address.toLowerCase()).call()
                .then((response) => {
                    contractResponse = {items: response, owner: address};
                });

            return contractResponse;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    async getTicketsByAddress(address) {
        try {
            let tickets = [0, 1, 2, 3, 4, 5, 6];
            let responseArray = [];

            for (let id of tickets) {
                await ticketsContract.methods.balanceOf(address.toLowerCase(), id).call()
                    .then((response) => {
                        responseArray.push({
                            balance: +response,
                            name: itemUtils.getItemRarityName(id.toString()),
                            id: id
                        });
                    });
            }

            return responseArray;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
}