import { GuildContractApi, GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import { Guild } from 'pages/Guilds/models';

// slices
import * as guildsSlices from '../slices/guilds.slice';

export const onLoadGuilds = (): AppThunk => (dispatch) => {
  dispatch(guildsSlices.loadGuilds());

  GuildGraphApi.getGuilds()
    .then((guilds: Guild[]) => {
      dispatch(guildsSlices.loadGuildsSucceded(guilds));
    })
    .catch(() => {
      dispatch(guildsSlices.loadGuildsFailed());
    });
};

export const onLoadCurrentGuildById =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(guildsSlices.loadCurrentGuildById());

    GuildGraphApi.getGuildById(id)
      .then((guild: Guild) => {
        dispatch(guildsSlices.loadCurrentGuildByIdSucceded(guild));
      })
      .catch(() => {
        dispatch(guildsSlices.loadCurrentGuildByIdFailed());
      });
  };

export const onJoinGuild =
  (guildTokenId: string): AppThunk =>
  () => {
    GuildContractApi.joinGuild(guildTokenId).then((res: boolean) => {
      if (res) {
        console.log('success', 'Succeeded');
      } else {
        console.log('error', 'Failed');
      }
    });
  };
