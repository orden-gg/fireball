import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ParcelAlchemicaDictionary } from 'shared/models';

export interface RealmAlchemicaState {
    realmAlchemicaDictionary: ParcelAlchemicaDictionary;
}

const initialState: RealmAlchemicaState = {
    realmAlchemicaDictionary: {}
};

export const realmAlchemicaSlice = createSlice({
    name: 'realmAlchemica',
    initialState,
    reducers: {
        setRealmAlchemica: (state, action: PayloadAction<ParcelAlchemicaDictionary>) => {
            state.realmAlchemicaDictionary = action.payload;
        }
    }
});

export const { setRealmAlchemica } = realmAlchemicaSlice.actions;

export const realmAlchemicaReducer = realmAlchemicaSlice.reducer;
