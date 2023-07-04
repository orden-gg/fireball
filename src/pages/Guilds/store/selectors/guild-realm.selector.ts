import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { GuildRealm } from 'pages/Guilds/models';

import { GuildRealmState } from '../slices/guild-realm.slice';

const guildRealmStateSelector = createSelector(
  (state: RootState) => state.guilds.guildRealm,
  (guildRealmState: GuildRealmState) => guildRealmState
);

export const getGuildRealm = createSelector(
  guildRealmStateSelector,
  (state: GuildRealmState): GuildRealm[] => state.guildRealm.data
);

export const getIsGuildRealmLoaded = createSelector(
  guildRealmStateSelector,
  (state: GuildRealmState): boolean => state.guildRealm.isLoaded
);
