import { RootState } from 'core/store/store';

import { InstallationAndTile } from '../../models';

export const getTiles = (state: RootState): InstallationAndTile[] => state.client.tiles.tiles.data;

export const getTilesLength = (state: RootState): number => state.client.tiles.tiles.data.length;

export const getIsTilesLoading = (state: RootState): boolean => state.client.tiles.tiles.isLoading;
