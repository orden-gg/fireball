import { GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import { GuildRealm } from 'pages/Guilds/models';
import { GuildUtils } from 'pages/Guilds/utils';

// slices
import * as guildRealmSlices from '../slices/guild-realm.slice';

export const onLoadGuildRealm =
  (addresses: string[], realmCount: number): AppThunk =>
  async (dispatch) => {
    dispatch(guildRealmSlices.loadGuildRealm());

    const graphQueryParams: { first: number; skip: number }[] = GuildUtils.getFirstAndSkipParamsByCount(realmCount);

    const promises: Promise<GuildRealm[]>[] = [];

    for (const params of graphQueryParams) {
      promises.push(GuildGraphApi.getGuildRealm(params.first, params.skip, addresses));
    }

    Promise.all(promises)
      .then((res: GuildRealm[][]) => {
        const unitedRealm: GuildRealm[] = res.reduce((prev, curr) => prev.concat(curr), []);

        dispatch(guildRealmSlices.loadGuildRealmSucceded(unitedRealm));
      })
      .catch(() => dispatch(guildRealmSlices.loadGuildRealmFailed()));
  };
