
import { formatBigNumber, makeContract } from './ethers.api';
import { ItemUtils } from 'utils';

import { TICKETS_CONTRACT } from './common/api.constants';
import { TICKETS_ABI } from 'data/abi/tickets.abi';

const contract = makeContract(TICKETS_CONTRACT, TICKETS_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getTicketsByAddress(address) {
        try {
            const responseArray = [];

            await Promise.all([
                contract.balanceOf(address.toLowerCase(), 0),
                contract.balanceOf(address.toLowerCase(), 1),
                contract.balanceOf(address.toLowerCase(), 2),
                contract.balanceOf(address.toLowerCase(), 3),
                contract.balanceOf(address.toLowerCase(), 4),
                contract.balanceOf(address.toLowerCase(), 5),
                contract.balanceOf(address.toLowerCase(), 6)
            ]).then((response) => {
                return response.forEach((item, index) => {
                    responseArray.push({
                        balance: parseInt(formatBigNumber(item)),
                        name: ItemUtils.getItemRarityName(index.toString()),
                        id: index
                    });
                });
            });

            return responseArray;
        } catch (error) {
            console.log(error);

            return [];
        }
    }
};
