import { GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import { MAX_ITEMS_PER_QUERY } from 'shared/constants';
import { SortingItem } from 'shared/models';

import { GuildPortal } from 'pages/Guilds/models';

import { CommonUtils } from 'utils';

// slices
import * as guildPortalsSlices from '../slices/guild-portals.slice';

export const onLoadGuildPortals =
  (addresses: string[], portalsCount: number): AppThunk =>
  async (dispatch, getState) => {
    dispatch(guildPortalsSlices.loadGuildPortals());

    const portalsSorting: SortingItem = getState().guilds.guildPortals.guildPortalsSorting;
    const graphQueryParams: { first: number; skip: number }[] = getGraphQueryParams(portalsCount);

    const promises: Promise<GuildPortal[]>[] = [];

    for (const params of graphQueryParams) {
      promises.push(GuildGraphApi.getPlayersPortals(params.first, params.skip, addresses));
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

const getGraphQueryParams = (portalsCount: number): { first: number; skip: number }[] => {
  let skip: number = 0;
  const graphQueryParams: { first: number; skip: number }[] = [];

  if (portalsCount <= MAX_ITEMS_PER_QUERY) {
    graphQueryParams.push({ first: portalsCount, skip: 0 });
  } else {
    while (skip < portalsCount) {
      if (skip + MAX_ITEMS_PER_QUERY < portalsCount) {
        graphQueryParams.push({ first: MAX_ITEMS_PER_QUERY, skip });

        skip += MAX_ITEMS_PER_QUERY;
      } else {
        const remainingCount = portalsCount - skip;

        graphQueryParams.push({ first: remainingCount, skip });

        skip += MAX_ITEMS_PER_QUERY;
      }
    }
  }

  return graphQueryParams;
};
