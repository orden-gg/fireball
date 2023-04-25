import { combineReducers } from '@reduxjs/toolkit';

import * as fromBorrowedGotchis from './guild-borrowed.slice';
import * as fromOwnedGotchis from './guild-gotchis.slice';
import * as fromlentGotchis from './guild-lent.slice';
import * as fromGuilds from './guilds.slice';

export interface GuildsModuleState {
  guilds: fromGuilds.GuildsState;
  ownedGotchis: fromOwnedGotchis.OwnedGotchisState;
}

export const guildsReducers = combineReducers({
  guilds: fromGuilds.guildsReducer,
  ownedGotchis: fromOwnedGotchis.ownedGotchisReducer,
  borrowedGotchis: fromBorrowedGotchis.borrowedGotchisReducer,
  lentGotchis: fromlentGotchis.lentGotchisReducer
});

export * from './guilds.slice';
export * from './guild-gotchis.slice';
export * from './guild-borrowed.slice';
export * from './guild-lent.slice';
export * from './warehouse.slice';
