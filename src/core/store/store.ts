import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { baazarReducers } from 'pages/Baazaar/store';
import { clientReducers } from 'pages/Client/store';
import { fakeGotchiReducers } from 'pages/FakeGotchisGallery/store';
import { glossaryReducer } from 'pages/Glossary/store';
import { guildsReducers } from 'pages/Guilds/store/slices';

import { dataReloadReducer } from './data-reload';
import { loginReducer } from './login';
import { tokensPricesReducers } from './tokens-prices';

export const store = configureStore({
  reducer: {
    dataReload: dataReloadReducer,
    login: loginReducer,
    glossary: glossaryReducer,
    baazaar: baazarReducers,
    client: clientReducers,
    fake: fakeGotchiReducers,
    tokensPrices: tokensPricesReducers,
    guilds: guildsReducers
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
