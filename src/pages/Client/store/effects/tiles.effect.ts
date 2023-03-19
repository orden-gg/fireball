import { EthersApi, TilesApi } from 'api';

import { AppThunk } from 'core/store/store';

import { Erc1155Categories } from 'shared/constants';
import { TilesBalances } from 'shared/models';

import { TilesUtils } from 'utils';

import { InstallationAndTile } from '../../models';
// slices
import * as tilesSlices from '../slices/tiles.slice';

export const onLoadTiles =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(tilesSlices.loadTiles());

    TilesApi.getTilesByAddress(address)
      .then((response: TilesBalances[]) => {
        const tiles: InstallationAndTile[] = getMappedTiles(response);

        dispatch(tilesSlices.loadTilesSucceded(tiles));
      })
      .catch(() => dispatch(tilesSlices.loadTilesFailed()))
      .finally(() => dispatch(tilesSlices.setIsInitialTilesLoading(false)));
  };

const getMappedTiles = (tilesBalances: TilesBalances[]): InstallationAndTile[] => {
  return tilesBalances
    .filter((item: TilesBalances) => {
      const id: string = EthersApi.formatBigNumber(item.tileId._hex);

      return TilesUtils.getIsTileExists(id);
    })
    .map((item: TilesBalances) => {
      const id: string = EthersApi.formatBigNumber(item.tileId._hex);

      return {
        id,
        name: TilesUtils.getNameById(id),
        category: Erc1155Categories.Tile,
        balance: EthersApi.formatBigNumber(item.balance._hex),
        rarity: 'golden',
        deprecated: TilesUtils.getDeprecatedById(id)
      };
    });
};
