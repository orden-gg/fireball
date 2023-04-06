import { combineReducers } from '@reduxjs/toolkit';

import * as fromGuilds from './guilds.slice';

export interface GuildsModuleState {
  guilds: fromGuilds.GuildsState;
}

export const guildsReducers = combineReducers({
  guilds: fromGuilds.guildsReducer
});

export * from './guilds.slice';
