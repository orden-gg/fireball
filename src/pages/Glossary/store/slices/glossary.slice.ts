import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Item, SortingItem } from 'shared/models';
import { Erc1155ItemUtils } from 'utils';

export interface GlossaryState {
    initialWearables: Erc1155Item[];
    wearables: Erc1155Item[];
    wearablesSorting: SortingItem;
}

const initialState: GlossaryState = {
    initialWearables: Erc1155ItemUtils.getMappedWearables(Erc1155ItemUtils.getStaticWearables()),
    wearables: Erc1155ItemUtils.getMappedWearables(Erc1155ItemUtils.getStaticWearables()),
    wearablesSorting: { type: 'rarityId', dir: 'asc' }
};

export const glossarySlice = createSlice({
    name: 'glossary',
    initialState,
    reducers: {
        setWearablesPrices: (state, action: PayloadAction<Erc1155Item[]>) => {
            state.initialWearables = action.payload;
            state.wearables = action.payload;
        },
        setWearables: (state, action: PayloadAction<Erc1155Item[]>) => {
            state.wearables = action.payload;
        },
        setWearablesSorting: (state, action: PayloadAction<SortingItem>) => {
            state.wearablesSorting = action.payload;
        }
    }
});

export const { setWearablesPrices, setWearables, setWearablesSorting } = glossarySlice.actions;

export const glossaryReducer = glossarySlice.reducer;
