import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { GuildChannelingActivity } from 'pages/Guilds/models';

import { GuildDashboardState } from '../slices/guild-dashboard.slice';

const guildDashboardStateSelector = createSelector(
  (state: RootState) => state.guilds.guildDashboard,
  (guildDashboardState: GuildDashboardState) => guildDashboardState
);

export const getGuildChannelingActivity = createSelector(
  guildDashboardStateSelector,
  (state: GuildDashboardState): GuildChannelingActivity[] => state.guildChanneling.data
);

export const getGuildChannelingActivityLoaded = createSelector(
  guildDashboardStateSelector,
  (state: GuildDashboardState): boolean => state.guildChanneling.isLoaded
);
