import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { baazaarReducer } from 'pages/Baazaar/store';
import { glossaryReducer } from 'pages/Glossary/store';

import { loginReducer } from './login';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        glossary: glossaryReducer,
        baazaar: baazaarReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
