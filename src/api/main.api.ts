import { EthersApi } from './ethers.api';

import { AUTOPET_OPERATOR, MAIN_CONTRACT } from 'shared/constants';
import { Inventory } from 'shared/models';

import MAIN_ABI from 'data/abi/main.abi.json';

const contract = EthersApi.makeContract(MAIN_CONTRACT, MAIN_ABI, 'polygon');

export class MainApi {
  public static isPetApproved(address: CustomAny): CustomAny {
    return contract.isPetOperatorForAll(address, AUTOPET_OPERATOR);
  }

  public static async approvePet(isApproved: boolean): Promise<CustomAny> {
    const writeContract = EthersApi.makeContractWithSigner(MAIN_CONTRACT, MAIN_ABI);
    const transaction = await writeContract.setPetOperatorForAll(AUTOPET_OPERATOR, isApproved);

    return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: CustomAny) =>
      Boolean(response.status)
    );
  }

  public static getAavegotchiById(id: number): Promise<CustomAny[]> {
    return contract.getAavegotchi(id).then((response: CustomAny[]) => {
      return response;
    });
  }

  public static async getAvailableSkillPoints(tokenId: CustomAny): Promise<CustomAny> {
    try {
      return await contract.availableSkillPoints(tokenId).then((response: CustomAny) => {
        return EthersApi.formatBigNumber(response);
      });
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public static async getInventoryByAddress(address: string): Promise<Inventory[]> {
    try {
      return await contract.itemBalances(address.toLowerCase()).then((response: CustomAny) => {
        return response.map((item: CustomAny) => {
          const inner: CustomAny = item.map((i: CustomAny) => EthersApi.formatBigNumber(i));

          return { itemId: inner[0], balance: inner[1] };
        });
      });
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  public static async previewAavegotchi(
    haunt: CustomAny,
    collateral: CustomAny,
    traits: CustomAny,
    wearables: CustomAny
  ): Promise<CustomAny> {
    try {
      return contract.previewAavegotchi(haunt, collateral, traits, wearables);
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public static batchLend(listings: CustomAny[]): Promise<CustomAny> {
    const writeContract = EthersApi.makeContractWithSigner(MAIN_CONTRACT, MAIN_ABI);

    return writeContract.batchAddGotchiListing(listings);
  }
}
