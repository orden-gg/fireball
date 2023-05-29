import { GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import { SortingItem } from 'shared/models';

import { GuildGotchi } from 'pages/Guilds/models';

import { CommonUtils } from 'utils';

// slices
import * as guildGotchisSlices from '../slices/guild-gotchis.slice';

export const onLoadGuildGotchis =
  (addresses: string[]): AppThunk =>
  async (dispatch, getState) => {
    dispatch(guildGotchisSlices.loadGuildGotchis());

    const { type: gotchisSortType, dir: gotchisSortDir }: SortingItem =
      getState().client.ownedGotchis.ownedGotchisSorting;

    const promises: Promise<GuildGotchi[]>[] = addresses.map((address: string) =>
      GuildGraphApi.getMemberOwnedGotchis(address)
    );

    Promise.all(promises)
      .then((ownedGotchis: GuildGotchi[][]) => {
        const unitedGotchis: GuildGotchi[] = ownedGotchis.reduce(
          (result: GuildGotchi[], current: GuildGotchi[]) => result.concat(current),
          []
        );
        const sortedGuildGotchis: GuildGotchi[] = CommonUtils.basicSort(unitedGotchis, gotchisSortType, gotchisSortDir);

        dispatch(guildGotchisSlices.loadGuildGotchisSucceded(sortedGuildGotchis));
      })
      .catch(() => {
        dispatch(guildGotchisSlices.loadGuildGotchisFailed());
      });
  };
