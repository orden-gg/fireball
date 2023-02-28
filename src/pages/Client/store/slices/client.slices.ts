import { combineReducers } from '@reduxjs/toolkit';

import { borrowedGotchisReducer } from './borrowed-gotchis.slice';
import { fakeGotchisReducer } from './fake-gotchis.slice';
import { lentGotchisReducer } from './lent-gotchis.slice';

export const clientReducers = combineReducers({
  fakeGotchis: fakeGotchisReducer,
  lentGotchis: lentGotchisReducer,
  borrowedGotchis: borrowedGotchisReducer
});
