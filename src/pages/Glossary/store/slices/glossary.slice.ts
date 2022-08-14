import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155ItemUtils } from 'utils';
import { Erc1155Item } from 'shared/models';

export interface GlossaryState {
    wearables: Erc1155Item[];
}

const initialState: GlossaryState = {
    wearables: Erc1155ItemUtils.getMappedWearables(Erc1155ItemUtils.getStaticWearables())
};

export const glossarySlice = createSlice({
    name: 'glossary',
    initialState,
    reducers: {
        setWearables: (state, action: PayloadAction<Erc1155Item[]>) => {
            state.wearables = action.payload;
        }
    }
});

export const { setWearables } = glossarySlice.actions;

export const glossaryReducer = glossarySlice.reducer;
