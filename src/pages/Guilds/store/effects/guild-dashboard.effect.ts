import { GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import { GuildChannelingActivity } from 'pages/Guilds/models';

// slices
import * as guildDashboardSlices from '../slices/guild-dashboard.slice';

export const onLoadGuildChannelingActivity =
  (addresses: string[]): AppThunk =>
  async (dispatch) => {
    dispatch(guildDashboardSlices.loadGuildChanneling());

    await GuildGraphApi.getGuildChannelingActivity(50, 0, addresses)
      .then((res: GuildChannelingActivity[]) => {
        dispatch(guildDashboardSlices.loadGuildChannelingSucceded(res));
      })
      .catch(() => dispatch(guildDashboardSlices.loadGuildChannelingFailed()));
  };
