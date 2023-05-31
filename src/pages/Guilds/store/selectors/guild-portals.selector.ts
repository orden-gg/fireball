import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { SortingItem } from 'shared/models';

import { GuildPortal } from 'pages/Guilds/models';

import { GuildPortalsState } from '../slices/guild-portals.slice';

const guildPortalsStateSelector = createSelector(
  (state: RootState) => state.guilds.guildPortals,
  (guildPortalsState: GuildPortalsState) => guildPortalsState
);

export const getGuildPortals = createSelector(
  guildPortalsStateSelector,
  (state: GuildPortalsState): GuildPortal[] => state.guildPortals.data
);

export const getIsGuildPortalsLoading = createSelector(
  guildPortalsStateSelector,
  (state: GuildPortalsState): boolean => state.guildPortals.isLoading
);

export const getGuildPortalsSorting = createSelector(
  guildPortalsStateSelector,
  (state: GuildPortalsState): SortingItem => state.guildPortalsSorting
);
