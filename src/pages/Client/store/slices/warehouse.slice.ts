import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortingItem } from 'shared/models';

import { Warehouse } from '../../models';

export interface WarehouseState {
  warehouse: {
    data: Warehouse[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isInitialWarehouseLoading: boolean;
  warehouseSorting: SortingItem;
}

const initialState: WarehouseState = {
  warehouse: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isInitialWarehouseLoading: true,
  warehouseSorting: {
    type: 'rarityId',
    dir: 'desc'
  }
};

export const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    loadWarehouse: (state): void => {
      state.warehouse = {
        ...state.warehouse,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadWarehouseSucceded: (state, action: PayloadAction<Warehouse[]>): void => {
      state.warehouse = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadWarehouseFailed: (state): void => {
      state.warehouse = {
        ...state.warehouse,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsInitialWarehouseLoading: (state, action: PayloadAction<boolean>): void => {
      state.isInitialWarehouseLoading = action.payload;
    },
    setWarehouseSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.warehouseSorting = action.payload;
    },
    setWarehouseItems: (state, action: PayloadAction<Warehouse[]>): void => {
      state.warehouse.data = action.payload;
    },
    resetWarehouseItems: (state): void => {
      state.warehouse.data = [];
    }
  }
});

export const {
  loadWarehouse,
  loadWarehouseSucceded,
  loadWarehouseFailed,
  setIsInitialWarehouseLoading,
  setWarehouseSorting,
  setWarehouseItems,
  resetWarehouseItems
} = warehouseSlice.actions;

export const warehouseReducer = warehouseSlice.reducer;
