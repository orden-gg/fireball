import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Listings, Erc721ListingsDictionary } from 'shared/models';
import { FakeItemsVM } from 'pages/Client/models';

export interface ClientFakeGotchisState {
    fakeGotchis: {
        data: FakeItemsVM | null;
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
    fakeGotchisListings: Erc721ListingsDictionary;
    fakeGotchiCardListings: Erc1155Listings;
}

const initialState: ClientFakeGotchisState = {
    fakeGotchis: {
        data: null,
        isLoading: false,
        isLoaded: false,
        isError: false
    },
    fakeGotchisListings: {},
    fakeGotchiCardListings: {
        currentListing: {
            id: null,
            price: 0
        },
        lastSoldListing: {
            id: null,
            price: 0,
            soldDate: ''
        }
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
        },
        resetFakeGotchis: (state): void => {
            state.fakeGotchis = {
                data: null,
                isLoading: false,
                isLoaded: false,
                isError: false
            };
        },
        setFakeGotchisListings: (state, action: PayloadAction<Erc721ListingsDictionary>): void => {
            state.fakeGotchisListings = action.payload;
        },
        setFakeGotchiCardListings: (state, action: PayloadAction<Erc1155Listings>): void => {
            state.fakeGotchiCardListings = action.payload;
        }
    }
});

export const {
    loadFakeGotchis,
    loadFakeGotchisSucceded,
    loadFakeGotchisFailed,
    resetFakeGotchis,
    setFakeGotchisListings,
    setFakeGotchiCardListings
} = fakeGotchisSlice.actions;

export const fakeGotchisReducer = fakeGotchisSlice.reducer;
