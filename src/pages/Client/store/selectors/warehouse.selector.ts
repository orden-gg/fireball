import { RootState } from 'core/store/store';

import { SortingItem } from 'shared/models';

import { Warehouse } from '../../models';

export const getWarehouse = (state: RootState): Warehouse[] => state.client.warehouse.warehouse.data;

export const getWarehouseCount = (state: RootState): number => state.client.warehouse.warehouse.data.length;

export const getIsWarehouseLoading = (state: RootState): boolean => state.client.warehouse.warehouse.isLoading;

export const getWarehouseSorting = (state: RootState): SortingItem => state.client.warehouse.warehouseSorting;
