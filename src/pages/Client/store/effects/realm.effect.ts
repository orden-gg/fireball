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
        const realmGetParcelUpgradeQueueLengthPromise = RealmApi.getParcelUpgradeQueueLength(parcel.id);
        const realmGetParcelUpgradeQueueCapacityPromise = RealmApi.getParcelUpgradeQueueCapacity(parcel.id);

        const [
          realmCapacities,
          realmHarvestRates,
          realmAvailableAlchemica,
          realmGetParcelUpgradeQueueLength,
          realmGetParcelUpgradeQueueCapacity
        ] = await Promise.all([
          realmCapacitiesPromise,
          realmHarvestRatesPromise,
          realmAvailableAlchemicaPromise,
          realmGetParcelUpgradeQueueLengthPromise,
          realmGetParcelUpgradeQueueCapacityPromise
        ]);

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
          upgradeCap: realmGetParcelUpgradeQueueLength,
          upgradeQueue: realmGetParcelUpgradeQueueCapacity
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
