import { TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import { InstallationTypeNames } from 'shared/constants';
import { ParcelInstallationVM, ParcelTileVM, RealmDTO, RealmVM, SortingItem } from 'shared/models';

import { CommonUtils, InstallationsUtils, TilesUtils } from 'utils';

// slices
import * as realmSlices from '../slices/realm.slice';

export const onLoadRealm =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(realmSlices.loadRealm());

    const { type, dir }: SortingItem = getState().client.realm.realmSorting;

    TheGraphApi.getRealmByAddress(address)
      .then((response: RealmDTO[]) => {
        const modifiedParcels: RealmVM[] = getMappedRealm(response);
        const sortedParcels: RealmVM[] = CommonUtils.basicSort(modifiedParcels, type, dir);

        dispatch(realmSlices.loadRealmSucceded(sortedParcels));
      })
      .catch(() => dispatch(realmSlices.loadRealmFailed()))
      .finally(() => dispatch(realmSlices.setIsInitialRealmLoading(false)));
  };

const getMappedRealm = (realm: RealmDTO[]): RealmVM[] => {
  return realm.map((parcel: RealmDTO) => {
    const installations: ParcelInstallationVM[] = InstallationsUtils.combineInstallations(parcel.installations);
    const tiles: ParcelTileVM[] = TilesUtils.combineTiles(parcel.tiles);
    const altar: ParcelInstallationVM | undefined = installations.find(
      (installation: ParcelInstallationVM) => installation.type === InstallationTypeNames.Altar
    );
    const cooldown: number = altar ? InstallationsUtils.getCooldownByLevel(altar.level, 'seconds') : 0;

    const cooldownClaim: number = parcel.lastClaimed ? 28800000 : 0;

    return {
      ...parcel,
      installations,
      tiles,
      altarLevel: altar ? altar.level : 0,
      cooldown,
      nextChannel: parcel.lastChanneled + cooldown,
      nextClaim: parcel.lastClaimed + cooldownClaim
    };
  });
};
