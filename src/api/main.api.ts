import { formatBigNumber, makeContract, makeContractWithSigner, waitForTransaction } from './ethers.api';

import { MAIN_CONTRACT, AUTOPET_OPERATOR } from './common/api.constants';
import { MAIN_ABI } from 'data/abi/main.abi';

const contract = makeContract(MAIN_CONTRACT, MAIN_ABI, 'polygon');

export const isPetApproved = (address: any): any => {
    return contract.isPetOperatorForAll(address, AUTOPET_OPERATOR);
};

export const approvePet = async (isApproved: boolean): Promise<any> => {
    const writeContract = makeContractWithSigner(MAIN_CONTRACT, MAIN_ABI);
    const transaction = await writeContract.setPetOperatorForAll(AUTOPET_OPERATOR, isApproved);

    return waitForTransaction(transaction.hash, 'polygon').then((response: any) => (
        Boolean(response.status)
    ));
};

export const getAvailableSkillPoints = async (tokenId: any): Promise<any> => {
    try {
        return await contract.availableSkillPoints(tokenId)
            .then((response: any) => {
                return formatBigNumber(response);
            });
    } catch (error) {
        console.log(error);

        return null;
    }
};

export const getInventoryByAddress = async (address: any): Promise<any> => {
    try {
        let contractResponse: any;

        await contract.itemBalances(address.toLowerCase())
            .then((response: any) => {
                const collection = response.map((item) => {
                    const inner: any = item.map((i: any) => formatBigNumber(i));

                    return { itemId: inner[0], balance: inner[1] };
                });

                contractResponse = { items: collection, owner: address };
            });

        return contractResponse;
    } catch (error) {
        console.log(error);

        return [];
    }
};

export const previewAavegotchi = async (haunt: any, collateral: any, traits: any, wearables: any): Promise<any> => {
    try {
        return contract.previewAavegotchi(haunt, collateral, traits, wearables);
    } catch (error) {
        console.log(error);

        return null;
    }
};
