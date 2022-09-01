import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Wearable, SortingItem } from 'shared/models';
import { Erc1155ItemUtils } from 'utils';

export interface GlossaryState {
    initialWearables: Wearable[];
    wearables: Wearable[];
    wearablesSorting: SortingItem;
    maxWearablePrice: number;
}

const initialState: GlossaryState = {
    initialWearables: Erc1155ItemUtils.getMappedWearables(Erc1155ItemUtils.getStaticWearables()),
    wearables: [],
    wearablesSorting: { type: 'rarityId', dir: 'asc' },
    maxWearablePrice: 0
};

export const glossarySlice = createSlice({
    name: 'glossary',
    initialState,
    reducers: {
        setWearablesPrices: (state, action: PayloadAction<Wearable[]>) => {
            state.initialWearables = action.payload;
            state.wearables = action.payload;
        },
        setWearables: (state, action: PayloadAction<Wearable[]>) => {
            state.wearables = action.payload;
        },
        setWearablesSorting: (state, action: PayloadAction<SortingItem>) => {
            state.wearablesSorting = action.payload;
        },
        setMaxWearablePrice: (state, action: PayloadAction<number>) => {
            state.maxWearablePrice = action.payload;
        }
    }
});

export const {
    setWearablesPrices,
    setWearables,
    setWearablesSorting,
    setMaxWearablePrice
} = glossarySlice.actions;

export const glossaryReducer = glossarySlice.reducer;
