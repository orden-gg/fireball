import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ItemsForSaleDictionary } from '../../models';

export const initialItemsForSale: ItemsForSaleDictionary = {
  gotchis: [],
  wearables: [],
  parcels: [],
  portals: [],
  tickets: [],
  consumables: []
};

export interface ItemsForSaleState {
  itemsForSale: {
    data: ItemsForSaleDictionary;
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isInitialItemsForSaleLoading: boolean;
}

const initialState: ItemsForSaleState = {
  itemsForSale: {
    data: { ...initialItemsForSale },
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isInitialItemsForSaleLoading: true
};

export const itemsForSaleSlice = createSlice({
  name: 'itemsForSale',
  initialState,
  reducers: {
    loadItemsForSale: (state): void => {
      state.itemsForSale = {
        ...state.itemsForSale,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadItemsForSaleSucceded: (state, action: PayloadAction<ItemsForSaleDictionary>): void => {
      state.itemsForSale = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadItemsForSaleFailed: (state): void => {
      state.itemsForSale = {
        ...state.itemsForSale,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsInitialItemsForSaleLoading: (state, action: PayloadAction<boolean>): void => {
      state.isInitialItemsForSaleLoading = action.payload;
    },
    resetItemsForSale: (state): void => {
      state.itemsForSale.data = { ...initialItemsForSale };
    }
  }
});

export const {
  loadItemsForSale,
  loadItemsForSaleSucceded,
  loadItemsForSaleFailed,
  setIsInitialItemsForSaleLoading,
  resetItemsForSale
} = itemsForSaleSlice.actions;

export const itemsForSaleReducer = itemsForSaleSlice.reducer;
