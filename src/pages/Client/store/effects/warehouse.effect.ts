import _ from 'lodash';

import { MainApi } from 'api';

import { AppThunk } from 'core/store/store';

import { Erc1155Categories, ItemTypeNames, WerableBenefitTypes } from 'shared/constants';
import { Inventory, SortingItem, WearableTypeBenefit } from 'shared/models';

import { CommonUtils, ItemUtils } from 'utils';

import { WEARABLES_TYPES_BENEFITS } from 'data/wearable-types-benefits.data';

import { Warehouse } from '../../models';
// slices
import * as warehouseSlices from '../slices/warehouse.slice';

export const onLoadWarehouse =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(warehouseSlices.loadWarehouse());

    const { type, dir }: SortingItem = getState().client.warehouse.warehouseSorting;

    MainApi.getInventoryByAddress(address)
      .then((response: Inventory[]) => {
        const warehouseItemsCopy: Warehouse[] = _.cloneDeep(getState().client.warehouse.warehouse.data);

        const modifiedWarehouseItems: Warehouse[] = getModifiedWarehouse(response, warehouseItemsCopy);
        const sortedWarehouseItems: Warehouse[] = CommonUtils.basicSort(modifiedWarehouseItems, type, dir);

        dispatch(warehouseSlices.loadWarehouseSucceded(sortedWarehouseItems));
      })
      .catch(() => dispatch(warehouseSlices.loadWarehouseFailed()))
      .finally(() => dispatch(warehouseSlices.setIsInitialWarehouseLoading(false)));
  };

const getModifiedWarehouse = (inventory: Inventory[], warehouseItemsCopy: Warehouse[]): Warehouse[] => {
  const modifiedWarehouseItems: Warehouse[] = [];

  inventory.forEach((item: Inventory) => {
    const isConsumable: boolean = ItemUtils.getTypeNameById(item.itemId) === ItemTypeNames.Consumable;
    const rarityName: string = isConsumable ? 'drop' : ItemUtils.getRarityNameById(item.itemId);
    const wearableTypeBenefit: WearableTypeBenefit | undefined = WEARABLES_TYPES_BENEFITS.find(
      (benefit: WearableTypeBenefit) => benefit.ids.some((id: number) => id === Number(item.itemId))
    );

    modifiedWarehouseItems.push({
      id: Number(item.itemId),
      rarity: rarityName,
      rarityId: ItemUtils.getItemRarityId(rarityName),
      balance: Number(item.balance),
      category: isConsumable ? Erc1155Categories.Consumable : Erc1155Categories.Wearable,
      benefit: {
        first: wearableTypeBenefit ? wearableTypeBenefit.benefit.first : WerableBenefitTypes.Unknown,
        second: wearableTypeBenefit ? wearableTypeBenefit.benefit.second : WerableBenefitTypes.Unknown
      },
      itemType: wearableTypeBenefit?.type
    });
  });

  const allWarehouseItems: Warehouse[] = [...warehouseItemsCopy, ...modifiedWarehouseItems].reduce(
    (warehouseItems: Warehouse[], current: Warehouse) => {
      const duplicatedWarehouseItem: Warehouse | undefined = warehouseItems.find(
        (item: Warehouse) => item.id === current.id
      );

      if (duplicatedWarehouseItem) {
        duplicatedWarehouseItem.balance += current.balance;
        duplicatedWarehouseItem.holders = current.holders;

        return warehouseItems;
      }

      return warehouseItems.concat({
        ...current
      });
    },
    []
  );

  return allWarehouseItems;
};
