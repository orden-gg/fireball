import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { WarehouseState } from '../slices';

const warehouseStateSelector = createSelector(
  (state: RootState) => state.client.warehouse,
  (warehouseState: WarehouseState) => warehouseState
);

export const getWarehouse = createSelector(warehouseStateSelector, (state: WarehouseState) => state.warehouse.data);

export const getWarehouseCount = createSelector(
  warehouseStateSelector,
  (state: WarehouseState) => state.warehouse.data.length
);

export const getIsInitialWarehouseLoading = createSelector(
  warehouseStateSelector,
  (state: WarehouseState) => state.isInitialWarehouseLoading
);

export const getWarehouseSorting = createSelector(
  warehouseStateSelector,
  (state: WarehouseState) => state.warehouseSorting
);
