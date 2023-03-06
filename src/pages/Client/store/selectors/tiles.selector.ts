import { RootState } from 'core/store/store';

import { InstallationAndTile } from '../../models';

export const getTiles = (state: RootState): InstallationAndTile[] => state.client.tiles.tiles.data;

export const getTilesCount = (state: RootState): number => state.client.tiles.tiles.data.length;

export const getIsInitialTilesLoading = (state: RootState): boolean => state.client.tiles.isInitialTilesLoading;
