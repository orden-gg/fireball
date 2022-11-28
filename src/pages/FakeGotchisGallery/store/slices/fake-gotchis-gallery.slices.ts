import { combineReducers } from '@reduxjs/toolkit';

import { mintedGotchisReducer } from './minted-gotchis.slice';

export const fakeGotchiReducers = combineReducers({
    minted: mintedGotchisReducer
});
