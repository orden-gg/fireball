import { combineReducers } from '@reduxjs/toolkit';

import * as fromBorrowedGotchis from './guild-borrowed.slice';
import * as fromOwnedGotchis from './guild-gotchis.slice';
import * as fromLentGotchis from './guild-lent.slice';
import * as fromGuild from './guild.slice';
import * as fromGuilds from './guilds.slice';
import * as fromWarehous from './warehouse.slice';

export const guildsReducers = combineReducers({
  guild: fromGuild.guildReducer,
  guilds: fromGuilds.guildsReducer,
  ownedGotchis: fromOwnedGotchis.ownedGotchisReducer,
  borrowedGotchis: fromBorrowedGotchis.borrowedGotchisReducer,
  lentGotchis: fromLentGotchis.lentGotchisReducer,
  warehouse: fromWarehous.warehouseReducer
});

export * from './guilds.slice';
export * from './guild.slice';
export * from './guild-gotchis.slice';
export * from './guild-borrowed.slice';
export * from './guild-lent.slice';
export * from './warehouse.slice';
