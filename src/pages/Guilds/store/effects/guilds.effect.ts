import { GuildContractApi, GuildGraphApi } from 'pages/Guilds/api';

import * as loginSlices from 'core/store/login/slices';
import { AppThunk } from 'core/store/store';

import { Guild, GuildFormValuesResult } from 'pages/Guilds/models';

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

export const onCreateGuild =
  (guildData: GuildFormValuesResult): AppThunk =>
  (dispatch) => {
    dispatch(guildsSlices.setIsCreateGuildRequestInProgress(true));

    GuildContractApi.createGuildSafe(guildData)
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(guildsSlices.setIsCreateGuildRequestInProgress(false));
      });
  };

export const onJoinGuild =
  (guildTokenId: string): AppThunk =>
  (dispatch) => {
    dispatch(guildsSlices.setIsJoinGuildRequestInProgress(true));

    GuildContractApi.joinGuild(guildTokenId)
      .then((res: boolean) => {
        if (res) {
          dispatch(loginSlices.setMemberGuildId(guildTokenId));
        }
      })
      .finally(() => {
        dispatch(guildsSlices.setIsJoinGuildRequestInProgress(false));
      });
  };
