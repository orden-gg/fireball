import { BigNumber } from 'ethers';

import { EthersApi } from './ethers.api';

import { AlchemicaTypes, REALM_CONTRACT } from 'shared/constants';
import { ParcelAlchemica } from 'shared/models';

import REALM_ABI from 'data/abi/realm.abi.json';

const realmContract = EthersApi.makeContract(REALM_CONTRACT, REALM_ABI, 'polygon');

export class RealmApi {

  public static getRealmCapacities(id: CustomAny): ParcelAlchemica {
    return realmContract.getCapacities(id).then((response: BigNumber[]) => {
      const parcelAlchemica: ParcelAlchemica = {
        [AlchemicaTypes.Fud]: Number(response[0]) / 1e18 ? Number(response[0]) / 1e18 : 0,
        [AlchemicaTypes.Fomo]: Number(response[1]) / 1e18 ? Number(response[1]) / 1e18 : 0,
        [AlchemicaTypes.Alpha]: Number(response[2]) / 1e18 ? Number(response[2]) / 1e18 : 0,
        [AlchemicaTypes.Kek]: Number(response[3]) / 1e18 ? Number(response[3]) / 1e18 : 0
      };

      return parcelAlchemica;
    });
  }

  public static getRealmHarvestRates(id: CustomAny): ParcelAlchemica {
    return realmContract.getHarvestRates(id).then((response: BigNumber[]) => {
      const parcelAlchemica: ParcelAlchemica = {
        [AlchemicaTypes.Fud]: Number(response[0]) / 1e18 ? Number(response[0]) / 1e18 : 0,
        [AlchemicaTypes.Fomo]: Number(response[1]) / 1e18 ? Number(response[1]) / 1e18 : 0,
        [AlchemicaTypes.Alpha]: Number(response[2]) / 1e18 ? Number(response[2]) / 1e18 : 0,
        [AlchemicaTypes.Kek]: Number(response[3]) / 1e18 ? Number(response[3]) / 1e18 : 0
      };

      return parcelAlchemica;
    });
  }

  public static getRealmAvailableAlchemica(id: CustomAny): ParcelAlchemica {
    return realmContract.getAvailableAlchemica(id).then((response: BigNumber[]) => {
      const parcelAlchemica: ParcelAlchemica = {
        [AlchemicaTypes.Fud]: Number(response[0]) / 1e18 ? Number(response[0]) / 1e18 : 0,
        [AlchemicaTypes.Fomo]: Number(response[1]) / 1e18 ? Number(response[1]) / 1e18 : 0,
        [AlchemicaTypes.Alpha]: Number(response[2]) / 1e18 ? Number(response[2]) / 1e18 : 0,
        [AlchemicaTypes.Kek]: Number(response[3]) / 1e18 ? Number(response[3]) / 1e18 : 0
      };

      return parcelAlchemica;
    });
  }

}
