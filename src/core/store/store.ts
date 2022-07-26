import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { realmAlchemicaReducer } from './realm-alchemica';

import { loginReducer } from './login';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        realmAlchemica: realmAlchemicaReducer
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
