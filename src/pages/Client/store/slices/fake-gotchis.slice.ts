import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FakeItemsVM } from 'pages/Client/models';

export interface ClientFakeGotchisState {
    fakeGotchis: {
        data: FakeItemsVM | null;
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
}

const initialState: ClientFakeGotchisState = {
    fakeGotchis: {
        data: null,
        isLoading: false,
        isLoaded: false,
        isError: false
    }
};

export const fakeGotchisSlice = createSlice({
    name: 'fakeGotchis',
    initialState,
    reducers: {
        loadFakeGotchis: (state): void => {
            state.fakeGotchis = {
                ...state.fakeGotchis,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadFakeGotchisSucceded: (state, action: PayloadAction<FakeItemsVM>): void => {
            state.fakeGotchis = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };
        },
        loadFakeGotchisFailed: (state): void => {
            state.fakeGotchis = {
                ...state.fakeGotchis,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        }
    }
});

export const { loadFakeGotchis, loadFakeGotchisSucceded, loadFakeGotchisFailed } = fakeGotchisSlice.actions;

export const fakeGotchisReducer = fakeGotchisSlice.reducer;
