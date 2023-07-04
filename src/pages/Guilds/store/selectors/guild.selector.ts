import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { GeneralGuildStats } from 'pages/Guilds/models';

import { GuildState } from '../slices';

const guildStateSelector = createSelector(
  (state: RootState) => state.guilds.guild,
  (guildState: GuildState) => guildState
);

export const getGuildStats = createSelector(
  guildStateSelector,
  (state: GuildState): GeneralGuildStats => state.guildStats.data
);

export const getIsGuildStatsLoading = createSelector(
  guildStateSelector,
  (state: GuildState): boolean => state.guildStats.isLoading
);

export const getGuildPlayersStats = createSelector(
  guildStateSelector,
  (state: GuildState): GeneralGuildStats[] => state.guildPlayersStats
);
