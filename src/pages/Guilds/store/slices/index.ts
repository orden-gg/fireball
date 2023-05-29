import { combineReducers } from '@reduxjs/toolkit';

import * as fromGuildGotchis from './guild-gotchis.slice';
import * as fromGuildPortals from './guild-portals.slice';
import * as fromGuild from './guild.slice';
import * as fromGuilds from './guilds.slice';
import * as fromWarehous from './warehouse.slice';

export const guildsReducers = combineReducers({
  guild: fromGuild.guildReducer,
  guilds: fromGuilds.guildsReducer,
  guildGotchis: fromGuildGotchis.guildGotchisReducer,
  guildPortals: fromGuildPortals.guildPortalsReducer,
  warehouse: fromWarehous.warehouseReducer
});

export * from './guilds.slice';
export * from './guild.slice';
export * from './guild-gotchis.slice';
export * from './guild-portals.slice';
export * from './warehouse.slice';
