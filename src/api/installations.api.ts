import { ethers } from 'ethers';
import _ from 'lodash';

import { EthersApi } from './ethers.api';

import { INSTALLATION_CONTRACT, InstallationTypes } from 'shared/constants';
import { InstallationsBalances } from 'shared/models';

import INSTALLATIONS_ABI from 'data/abi/installations.abi.json';

const installationsContract = EthersApi.makeContract(INSTALLATION_CONTRACT, INSTALLATIONS_ABI, 'polygon');

export class InstallationsApi {
  public static getInstallationsByAddress(address: string): Promise<InstallationsBalances[]> {
    return installationsContract.installationsBalances(address);
  }

  // TODO check if needed
  public static getAllUpgradeQueue(): CustomAny {
    return installationsContract
      .getAllUpgradeQueue()
      .then((res: CustomAny) =>
        res.map((item: CustomAny) => ({
          readyBlock: item.readyBlock,
          claimed: item.claimed,
          parcelId: EthersApi.formatBigNumber(item.parcelId),
          installationId: EthersApi.formatBigNumber(item.installationId)
        }))
      )
      .catch((e: CustomAny) => {
        console.log(e);

        return [];
      });
  }

  public static getUpgradeQueueByAddress(address: CustomAny): CustomAny {
    return installationsContract
      .getUserUpgradeQueue(address)
      .then((res: CustomAny) =>
        res[0].map((item: CustomAny) => ({
          readyBlock: item.readyBlock,
          claimed: item.claimed,
          parcelId: EthersApi.formatBigNumber(item.parcelId),
          installationId: EthersApi.formatBigNumber(item.installationId)
        }))
      )
      .catch((e: CustomAny) => {
        console.log(e);

        return [];
      });
  }

  public static async finalizeUpgrades(ids: CustomAny): Promise<CustomAny> {
    const contractWithSigner = EthersApi.makeContractWithSigner(INSTALLATION_CONTRACT, INSTALLATIONS_ABI);
    const transaction = await contractWithSigner.finalizeUpgrades(ids);

    return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: CustomAny) => {
      return Boolean(response.status);
    });
  }

  public static async craftInstallations(ids: number[], gltrs: number[]): Promise<CustomAny> {
    const contractWithSigner: CustomAny = EthersApi.makeContractWithSigner(INSTALLATION_CONTRACT, INSTALLATIONS_ABI);
    const transaction: CustomAny = await contractWithSigner.craftInstallations(ids, gltrs);

    return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: CustomAny) => {
      return Boolean(response.status);
    });
  }

  public static getAllInstallations(): Promise<CustomAny> {
    return installationsContract
      .getInstallationTypes([])
      .then((response: CustomAny) => {
        const modified = _.cloneDeep(response);

        response.forEach((installation: CustomAny, index: number) => {
          // ! Modify BigNumber`s => number`s
          modified[index][InstallationTypes.AlchemicaCost] = installation.alchemicaCost.map((alchemica: CustomAny) => {
            return parseInt(ethers.utils.formatUnits(alchemica));
          });
          modified[index][InstallationTypes.HarvestRate] = parseInt(ethers.utils.formatUnits(installation.harvestRate));
          modified[index][InstallationTypes.Capacity] = parseInt(ethers.utils.formatUnits(installation.capacity));
          modified[index][InstallationTypes.Prerequisites] = installation.prerequisites.map((alchemica: CustomAny) => {
            return parseInt(ethers.utils.formatUnits(alchemica));
          });
        });

        return modified;
      })
      .catch((error: CustomAny) => console.log(error));
  }
}
