import { TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import { Erc1155Categories, HAUNT_ONE_BACKGROUND_WEARABLE_NUMBER, WerableBenefitTypes } from 'shared/constants';
import { SortingItem, WearableTypeBenefit } from 'shared/models';

import { CommonUtils, ItemUtils } from 'utils';

import { WEARABLES_TYPES_BENEFITS } from 'data/wearable-types-benefits.data';

import { OwnedGotchi, Warehouse } from '../../models';
import { loadOwnedGotchis, loadOwnedGotchisFailed, loadOwnedGotchisSucceded, setWarehouseItems } from '../slices';

export const onLoadOwnedGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(loadOwnedGotchis());

    const { type: gotchisSortType, dir: gotchisSortDir }: SortingItem =
      getState().client.ownedGotchis.ownedGotchisSorting;
    const { type: warehouseSortType, dir: warehouseSortDir }: SortingItem =
      getState().client.warehouse.warehouseSorting;

    TheGraphApi.getGotchisByAddress(address)
      .then((ownedGotchis: OwnedGotchi[]) => {
        const warehouseItemsCopy: Warehouse[] = getState().client.warehouse.warehouse.data;

        const warehouseItems: Warehouse[] = geModifiedWarehouse(ownedGotchis, warehouseItemsCopy);
        const sortedWarehouseItems: Warehouse[] = CommonUtils.basicSort(
          warehouseItems,
          warehouseSortType,
          warehouseSortDir
        );
        const sortedOwnedGotchis: OwnedGotchi[] = CommonUtils.basicSort(ownedGotchis, gotchisSortType, gotchisSortDir);

        dispatch(setWarehouseItems(sortedWarehouseItems));
        dispatch(loadOwnedGotchisSucceded(sortedOwnedGotchis));
      })
      .catch(() => dispatch(loadOwnedGotchisFailed()));
  };

const geModifiedWarehouse = (ownedGotchis: OwnedGotchi[], warehouseItemsCopy: Warehouse[]): Warehouse[] => {
  const warehouseItems: Warehouse[] = [];

  // collect all equipped wearables
  ownedGotchis.forEach((ownedGotchi: OwnedGotchi) => {
    const equippedIds: number[] = ownedGotchi.equippedWearables.filter(
      (wearableId: number) => wearableId > 0 && wearableId !== HAUNT_ONE_BACKGROUND_WEARABLE_NUMBER
    );

    for (const warehouseItemId of equippedIds) {
      const warehouseItemIndex: number = warehouseItems.findIndex((item: Warehouse) => item.id === warehouseItemId);
      const wearableTypeBenefit: WearableTypeBenefit | undefined = WEARABLES_TYPES_BENEFITS.find(
        (benefit: WearableTypeBenefit) => benefit.ids.some((id: number) => id === warehouseItemId)
      );

      if (warehouseItems[warehouseItemIndex] === undefined) {
        warehouseItems.push({
          id: warehouseItemId,
          balance: 1,
          rarity: ItemUtils.getRarityNameById(warehouseItemId),
          rarityId: ItemUtils.getItemRarityId(ItemUtils.getRarityNameById(warehouseItemId)),
          holders: [ownedGotchi.id],
          category: Erc1155Categories.Wearable,
          benefit: {
            first: wearableTypeBenefit ? wearableTypeBenefit.benefit.first : WerableBenefitTypes.Unknown,
            second: wearableTypeBenefit ? wearableTypeBenefit.benefit.second : WerableBenefitTypes.Unknown
          },
          itemType: wearableTypeBenefit?.type
        });
      } else {
        warehouseItems[warehouseItemIndex].balance += 1;
        warehouseItems[warehouseItemIndex].holders?.push(ownedGotchi.id);
      }
    }
  });

  const allWarehouseItems = [...warehouseItemsCopy, ...warehouseItems].reduce(
    (items: Warehouse[], current: Warehouse) => {
      const duplicatedWarehouseItem: Warehouse | undefined = items.find((item: Warehouse) => item.id === current.id);

      if (duplicatedWarehouseItem) {
        duplicatedWarehouseItem.balance += current.balance;
        duplicatedWarehouseItem.holders = current.holders;

        return items;
      }

      return items.concat(current);
    },
    []
  );

  return allWarehouseItems;
};
