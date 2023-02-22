import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { baazarReducers } from 'pages/Baazaar/store';
import { clientReducers } from 'pages/Client/store';
import { fakeGotchiReducers } from 'pages/FakeGotchisGallery/store';
import { glossaryReducer } from 'pages/Glossary/store';

import { loginReducer } from './login';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    glossary: glossaryReducer,
    baazaar: baazarReducers,
    client: clientReducers,
    fake: fakeGotchiReducers
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
