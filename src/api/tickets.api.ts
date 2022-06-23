
import { EthersApi } from './ethers.api';
import { ItemUtils } from 'utils';

import { TICKETS_CONTRACT } from './common/api.constants';
import { TICKETS_ABI } from 'data/abi/tickets.abi';

const contract = EthersApi.makeContract(TICKETS_CONTRACT, TICKETS_ABI, 'polygon');

export class TicketsApi {
    public static async getTicketsByAddress(address: any): Promise<any> {
        try {
            const responseArray: any[] = [];

            await Promise.all([
                contract.balanceOf(address.toLowerCase(), 0),
                contract.balanceOf(address.toLowerCase(), 1),
                contract.balanceOf(address.toLowerCase(), 2),
                contract.balanceOf(address.toLowerCase(), 3),
                contract.balanceOf(address.toLowerCase(), 4),
                contract.balanceOf(address.toLowerCase(), 5),
                contract.balanceOf(address.toLowerCase(), 6)
            ]).then((response: [any, any, any, any, any, any, any]) => {
                return response.forEach((item, index) => {
                    responseArray.push({
                        balance: parseInt(EthersApi.formatBigNumber(item)),
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
}
