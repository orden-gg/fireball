import { EthersApi } from './ethers.api';

import { MAIN_CONTRACT, AUTOPET_OPERATOR, GotchiTypes } from 'shared/constants';
import MAIN_ABI from 'data/abi/main.abi.json';

const contract = EthersApi.makeContract(MAIN_CONTRACT, MAIN_ABI, 'polygon');

export class MainApi {
    public static isPetApproved(address: any): any {
        return contract.isPetOperatorForAll(address, AUTOPET_OPERATOR);
    }

    public static async approvePet(isApproved: boolean): Promise<any> {
        const writeContract = EthersApi.makeContractWithSigner(MAIN_CONTRACT, MAIN_ABI);
        const transaction = await writeContract.setPetOperatorForAll(AUTOPET_OPERATOR, isApproved);

        return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: any) => (
            Boolean(response.status)
        ));
    }

    public static getAavegotchiById(id) {
        return contract.getAavegotchi(id).then((gotchi) => {
            return {
                id: EthersApi.formatBigNumber(gotchi[GotchiTypes.Id]),
                name: gotchi[GotchiTypes.Name],
                numericTraits: gotchi[GotchiTypes.NumericTraits],
                modifiedNumericTraits: gotchi[GotchiTypes.ModifiedRarityScore],
                equippedWearables: gotchi[GotchiTypes.EquippedWearables],
                collateral: gotchi[GotchiTypes.Collateral],
                owner: {
                    id: gotchi[GotchiTypes.Owner]
                },
                stakedAmount: gotchi[GotchiTypes.StakedAmount],
                minimumStake: EthersApi.formatBigNumber(gotchi[GotchiTypes.MinimumStake]),
                kinship: EthersApi.formatBigNumber(gotchi[GotchiTypes.Kinship]),
                experience: EthersApi.formatBigNumber(gotchi[GotchiTypes.Experience]),
                toNextLevel: EthersApi.formatBigNumber(gotchi[GotchiTypes.ToNextLevel]),
                usedSkillPoints: EthersApi.formatBigNumber(gotchi[GotchiTypes.UsedSkillPoints]),
                level: EthersApi.formatBigNumber(gotchi[GotchiTypes.Level]),
                hauntId: EthersApi.formatBigNumber(gotchi[GotchiTypes.HauntId]),
                baseRarityScore: gotchi[GotchiTypes.BaseRarityScore],
                modifiedRarityScore: gotchi[GotchiTypes.ModifiedRarityScore],
                inventory: gotchi[GotchiTypes.Inventory]
            };
        });
    }

    public static async getAvailableSkillPoints(tokenId: any): Promise<any> {
        try {
            return await contract.availableSkillPoints(tokenId)
                .then((response: any) => {
                    return EthersApi.formatBigNumber(response);
                });
        } catch (error) {
            console.log(error);

            return null;
        }
    }

    public static async getInventoryByAddress(address: any): Promise<any> {
        try {
            let contractResponse: any;

            await contract.itemBalances(address.toLowerCase())
                .then((response: any) => {
                    const collection = response.map((item: any) => {
                        const inner: any = item.map((i: any) => EthersApi.formatBigNumber(i));

                        return { itemId: inner[0], balance: inner[1] };
                    });

                    contractResponse = { items: collection, owner: address };
                });

            return contractResponse;
        } catch (error) {
            console.log(error);

            return [];
        }
    }

    public static async previewAavegotchi(haunt: any, collateral: any, traits: any, wearables: any): Promise<any> {
        try {
            return contract.previewAavegotchi(haunt, collateral, traits, wearables);
        } catch (error) {
            console.log(error);

            return null;
        }
    }
}
