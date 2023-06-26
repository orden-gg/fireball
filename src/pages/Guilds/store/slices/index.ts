import { combineReducers } from '@reduxjs/toolkit';

import * as fromGuildDashboard from './guild-dashboard.slice';
import * as fromGuildGotchis from './guild-gotchis.slice';
import * as fromGuildPortals from './guild-portals.slice';
import * as fromGuildRealm from './guild-realm.slice';
import * as fromGuildWearables from './guild-wearables.slice';
import * as fromGuild from './guild.slice';
import * as fromGuilds from './guilds.slice';

export const guildsReducers = combineReducers({
  guild: fromGuild.guildReducer,
  guilds: fromGuilds.guildsReducer,
  guildDashboard: fromGuildDashboard.guildDashboardReducer,
  guildGotchis: fromGuildGotchis.guildGotchisReducer,
  guildPortals: fromGuildPortals.guildPortalsReducer,
  guildRealm: fromGuildRealm.guildRealmReducer,
  guildWearables: fromGuildWearables.guildWearablesReducer
});

export * from './guilds.slice';
export * from './guild.slice';
export * from './guild-dashboard.slice';
export * from './guild-gotchis.slice';
export * from './guild-portals.slice';
export * from './guild-realm.slice';
export * from './guild-wearables.slice';
