import { GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import { SortingItem } from 'shared/models';

import { GuildPortal } from 'pages/Guilds/models';
import { GuildUtils } from 'pages/Guilds/utils';

import { CommonUtils } from 'utils';

// slices
import * as guildPortalsSlices from '../slices/guild-portals.slice';

export const onLoadGuildPortals =
  (addresses: string[], portalsCount: number): AppThunk =>
  async (dispatch, getState) => {
    dispatch(guildPortalsSlices.loadGuildPortals());

    const portalsSorting: SortingItem = getState().guilds.guildPortals.guildPortalsSorting;
    const graphQueryParams: { first: number; skip: number }[] = GuildUtils.getFirstAndSkipParamsByCount(portalsCount);

    const promises: Promise<GuildPortal[]>[] = [];

    for (const params of graphQueryParams) {
      promises.push(GuildGraphApi.getGuildPortals(params.first, params.skip, addresses));
    }

    Promise.all(promises)
      .then((res: GuildPortal[][]) => {
        const unitedPortals: GuildPortal[] = res.reduce((prev, curr) => prev.concat(curr), []);
        const sortedPortals: GuildPortal[] = CommonUtils.basicSort(
          unitedPortals,
          portalsSorting.type,
          portalsSorting.dir
        );

        dispatch(guildPortalsSlices.loadGuildPortalsSucceded(sortedPortals));
      })
      .catch(() => dispatch(guildPortalsSlices.loadGuildPortalsFailed()));
  };
