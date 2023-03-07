import { EthersApi, InstallationsApi } from 'api';

import { AppThunk } from 'core/store/store';

import { Erc1155Categories } from 'shared/constants';
import { InstallationsBalances } from 'shared/models';

import { InstallationsUtils } from 'utils';

import { InstallationAndTile } from '../../models';
// slices
import {
  loadInstallations,
  loadInstallationsFailed,
  loadInstallationsSucceded,
  setIsInitialInstallationsLoading
} from '../slices';

export const onLoadInstallations =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(loadInstallations());

    InstallationsApi.getInstallationsByAddress(address)
      .then((response: InstallationsBalances[]) => {
        const installations: InstallationAndTile[] = getMappedInstallations(response);

        dispatch(loadInstallationsSucceded(installations));
      })
      .catch(() => dispatch(loadInstallationsFailed()))
      .finally(() => dispatch(setIsInitialInstallationsLoading(false)));
  };

const getMappedInstallations = (installationsBalances: InstallationsBalances[]): InstallationAndTile[] => {
  return installationsBalances
    .filter((item: InstallationsBalances) => {
      const id: string = EthersApi.formatBigNumber(item.installationId._hex);

      return InstallationsUtils.getIsInstallationExist(id);
    })
    .map((item: InstallationsBalances) => {
      const id: string = EthersApi.formatBigNumber(item.installationId._hex);

      return {
        id,
        name: InstallationsUtils.getNameById(id),
        category: Erc1155Categories.Installation,
        balance: Number(EthersApi.formatBigNumber(item.balance._hex)),
        level: InstallationsUtils.getLevelById(id),
        rarity: InstallationsUtils.getRarityById(id),
        deprecated: InstallationsUtils.getDeprecatedById(id)
      };
    });
};
