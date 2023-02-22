import { combineReducers } from '@reduxjs/toolkit';

import { mintedGotchisReducer } from './minted-gotchis.slice';
import { queuedGotchisReducer } from './queued-gotchis.slice';

export const fakeGotchiReducers = combineReducers({
  minted: mintedGotchisReducer,
  queued: queuedGotchisReducer
});
