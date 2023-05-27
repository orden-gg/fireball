import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { GeneralGuildStats } from 'pages/Guilds/models';

import { GuildHomeState } from '../slices';

const guildHomeStateSelector = createSelector(
  (state: RootState) => state.guilds.guildHome,
  (guildHomeState: GuildHomeState) => guildHomeState
);

export const getGuildHomeInfo = createSelector(
  guildHomeStateSelector,
  (state: GuildHomeState): GeneralGuildStats[] => state.guildHome.data
);

export const getIsGuildHomeInfoLoading = createSelector(
  guildHomeStateSelector,
  (state: GuildHomeState): boolean => state.guildHome.isLoading
);
