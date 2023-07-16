import { TheGraphApi } from 'api';
import { RealmApi } from 'api/realm.api';

import { AppThunk } from 'core/store/store';

import { InstallationTypeNames } from 'shared/constants';
import { ParcelInstallationVM, ParcelTileVM, RealmDTO, RealmVM, SortingItem } from 'shared/models';

import { CommonUtils, InstallationsUtils, TilesUtils } from 'utils';

// slices
import * as realmSlices from '../slices/realm.slice';

export const onLoadRealm =
  (address: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(realmSlices.loadRealm());

    const { type, dir }: SortingItem = getState().client.realm.realmSorting;

    try {
      const response: RealmDTO[] = await TheGraphApi.getRealmByAddress(address);

      const realmPromises: Promise<CustomAny>[] = response.map(async (parcel: RealmDTO) => {
        const installations: ParcelInstallationVM[] = InstallationsUtils.combineInstallations(parcel.installations);
        const tiles: ParcelTileVM[] = TilesUtils.combineTiles(parcel.tiles);
        const altar: ParcelInstallationVM | undefined = installations.find(
          (installation: ParcelInstallationVM) => installation.type === InstallationTypeNames.Altar
        );
        const cooldown: number = altar ? InstallationsUtils.getCooldownByLevel(altar.level, 'seconds') : 0;

        const cooldownClaim: number = parcel.lastClaimed ? 28800 : 0;

        const realmCapacitiesPromise = RealmApi.getRealmCapacities(parcel.id);
        const realmHarvestRatesPromise = RealmApi.getRealmHarvestRates(parcel.id);
        const realmAvailableAlchemicaPromise = RealmApi.getRealmAvailableAlchemica(parcel.id);

        const [realmCapacities, realmHarvestRates, realmAvailableAlchemica] = await Promise.all([
          realmCapacitiesPromise,
          realmHarvestRatesPromise,
          realmAvailableAlchemicaPromise
        ]);

        const getParcelUpgradeQueueCapacitytemp = installations.filter(
          (installation: ParcelInstallationVM) => installation.id > 128 && installation.id < 138
        );

        // const getParcelUpgradeQueueCapacity = getParcelUpgradeQueueCapacitytemp[0]?.level + 1;
        const getParcelUpgradeQueueCapacity = getParcelUpgradeQueueCapacitytemp.reduce(
          (sum, item) => sum + item.level,
          0
        );
        const getParcelUpgradeQueueLength = parcel.installations.filter(
          (installation) => installation.upgrading === true
        ).length;

        return {
          ...parcel,
          installations,
          tiles,
          altarLevel: altar ? altar.level : 0,
          cooldown,
          nextChannel: parcel.lastChanneled + cooldown,
          nextClaim: parcel.lastClaimed + cooldownClaim,
          capacities: realmCapacities,
          harvestRates: realmHarvestRates,
          claimAvailableAlchemica: realmAvailableAlchemica,
          upgradeCap: getParcelUpgradeQueueCapacity + 1,
          upgradeQueue: getParcelUpgradeQueueLength
        };
      });

      const modifiedParcels: RealmVM[] = await Promise.all(realmPromises);

      const sortedParcels: RealmVM[] = CommonUtils.basicSort(modifiedParcels, type, dir);

      dispatch(realmSlices.loadRealmSucceded(sortedParcels));
    } catch (error) {
      dispatch(realmSlices.loadRealmFailed());
    } finally {
      dispatch(realmSlices.setIsInitialRealmLoading(false));
    }
  };
