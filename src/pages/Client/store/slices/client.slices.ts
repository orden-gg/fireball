import { combineReducers } from '@reduxjs/toolkit';

import { fakeGotchisReducer } from './fake-gotchis.slice';
import { lentGotchisReducer } from './lent-gotchis.slice';

export const clientReducers = combineReducers({
  fakeGotchis: fakeGotchisReducer,
  lentGotchis: lentGotchisReducer
});
