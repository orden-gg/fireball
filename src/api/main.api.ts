import { EthersApi } from './ethers.api';

import { MAIN_CONTRACT, AUTOPET_OPERATOR } from 'shared/constants';
import MAIN_ABI from 'data/abi/main.abi.json';

const contract = EthersApi.makeContract(MAIN_CONTRACT, MAIN_ABI, 'polygon');

export class MainApi {
  public static isPetApproved(address: any): any {
    return contract.isPetOperatorForAll(address, AUTOPET_OPERATOR);
  }

  public static async approvePet(isApproved: boolean): Promise<any> {
    const writeContract = EthersApi.makeContractWithSigner(MAIN_CONTRACT, MAIN_ABI);
    const transaction = await writeContract.setPetOperatorForAll(AUTOPET_OPERATOR, isApproved);

    return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: any) => Boolean(response.status));
  }

  public static getAavegotchiById(id: number): Promise<any[]> {
    return contract.getAavegotchi(id).then((response: any[]) => {
      return response;
    });
  }

  public static async getAvailableSkillPoints(tokenId: any): Promise<any> {
    try {
      return await contract.availableSkillPoints(tokenId).then((response: any) => {
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

      await contract.itemBalances(address.toLowerCase()).then((response: any) => {
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
