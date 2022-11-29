import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GalleryFakeGotchi } from '../../models';

export interface QueuedGotchisState {
    queuedGotchis: {
        data: GalleryFakeGotchi[];
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    }
}

const initialState: QueuedGotchisState = {
    queuedGotchis: {
        data: [],
        isLoading: false,
        isLoaded: false,
        isError: false
    }
};

export const queuedGotchisSlice = createSlice({
    name: 'queuedGotchis',
    initialState,
    reducers: {
        loadQueuedGotchis: (state): void => {
            state.queuedGotchis = {
                ...state.queuedGotchis,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadQueuedGotchisSucceded: (state, action: PayloadAction<GalleryFakeGotchi[]>): void => {
            state.queuedGotchis = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };
        },
        loadQueuedGotchisFailed: (state): void => {
            state.queuedGotchis = {
                ...state.queuedGotchis,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        }
    }
});

export const {
    loadQueuedGotchis,
    loadQueuedGotchisSucceded,
    loadQueuedGotchisFailed
} = queuedGotchisSlice.actions;

export const queuedGotchisReducer = queuedGotchisSlice.reducer;
