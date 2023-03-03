import { RootState } from 'core/store/store';

import { InstallationAndTile } from '../../models';

export const getInstallations = (state: RootState): InstallationAndTile[] =>
  state.client.installations.installations.data;

export const getInstallationsCount = (state: RootState): number => state.client.installations.installations.data.length;

export const getIsInstallationsLoading = (state: RootState): boolean =>
  state.client.installations.installations.isLoading;
