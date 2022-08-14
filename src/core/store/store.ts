import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { glossaryReducer } from 'pages/Glossary/store';

import { loginReducer } from './login';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        glossary: glossaryReducer
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
