import { GuildGraphApi } from 'pages/Guilds/api';

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

export const onSetGuild =
  (guild: Guild): AppThunk =>
  (dispatch) => {
    dispatch(guildsSlices.setGuild(guild));
  };
