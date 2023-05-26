import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { GeneralGuildStats } from 'pages/Guilds/models';

import { GuildHomeState } from '../slices';

const guildsStateSelector = createSelector(
  (state: RootState) => state.guilds.guildHome,
  (guildHomeState: GuildHomeState) => guildHomeState
);

export const getGuildHomeInfo = createSelector(
  guildsStateSelector,
  (state: GuildHomeState): GeneralGuildStats[] => state.guildHome.data
);
