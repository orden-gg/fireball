import { combineReducers } from '@reduxjs/toolkit';

import { fakeGotchisReducer } from './fake-gotchis.slice';

export const clientReducers = combineReducers({
    fakeGotchis: fakeGotchisReducer
});
