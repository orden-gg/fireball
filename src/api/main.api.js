import ethersApi from './ethers.api';

import { MAIN_CONTRACT, AUTOPET_OPERATOR, OLD_AUTOPET_CONTRACT } from './common/constants';
import { MAIN_ABI } from 'data/abi/main.abi';
import { OLD_AUTOPET_ABI } from 'data/abi/oldAutopet.abi';

const contract = ethersApi.makeContract(MAIN_CONTRACT, MAIN_ABI, 'polygon');

// OLD
const autopetContract = ethersApi.makeContract(OLD_AUTOPET_CONTRACT, OLD_AUTOPET_ABI, 'polygon');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    isPetApproved(address) {
        return contract.isPetOperatorForAll(address, AUTOPET_OPERATOR);
    },

    async approvePet(isApproved) {
        const writeContract = ethersApi.makeContractWithSigner(MAIN_CONTRACT, MAIN_ABI);
        const transaction = await writeContract.setPetOperatorForAll(AUTOPET_OPERATOR, isApproved);

        return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));
    },

    async getAvailableSkillPoints(tokenId) {
        try {
            return await contract.availableSkillPoints(tokenId)
                .then((response) => {
                    return ethersApi.formatBigNumber(response);
                });
        } catch (error) {
            console.log(error);

            return null;
        }
    },

    async getInventoryByAddress(address) {
        try {
            let contractResponse;

            await contract.itemBalances(address.toLowerCase())
                .then((response) => {
                    const collection = response.map((item) => {
                        const inner = item.map((i) => ethersApi.formatBigNumber(i));

                        return { itemId: inner[0], balance: inner[1] };
                    });

                    contractResponse = { items: collection, owner: address };
                });

            return contractResponse;
        } catch (error) {
            console.log(error);

            return [];
        }
    },

    async previewAavegotchi(haunt, collateral, traits, wearables) {
        try {
            return contract.previewAavegotchi(haunt, collateral, traits, wearables);
        } catch (error) {
            console.log(error);

            return null;
        }
    },

    // old code,
    async oldApprovePet(isApproved) {
        const writeContract = ethersApi.makeContractWithSigner(MAIN_CONTRACT, MAIN_ABI);
        const operator = await autopetContract.operator();
        const transaction = await writeContract.setPetOperatorForAll(operator, isApproved);

        return ethersApi.waitForTransaction(transaction.hash, 'polygon').then(response => (
            Boolean(response.status)
        ));
    },
    isOldPetApproved(address) {
        return autopetContract.operator().then(operator => (
            contract.isPetOperatorForAll(address, operator)
        ));
    }
};
