import _ from 'lodash';

import { TheGraphApi } from 'api';
import { ClientApi } from 'pages/Client/api';

import { AppThunk } from 'core/store/store';

import { Erc1155Categories, HAUNT_ONE_BACKGROUND_WEARABLE_NUMBER, WerableBenefitTypes } from 'shared/constants';
import { FireballGotchi, GotchiExtended, SortingItem, TheGraphBatchData, WearableTypeBenefit } from 'shared/models';

import { CommonUtils, ItemUtils } from 'utils';

import { WEARABLES_TYPES_BENEFITS } from 'data/wearable-types-benefits.data';

import { OwnedGotchi, Warehouse } from '../../models';
// slices
import * as ownedGotchisSlices from '../slices/owned-gotchis.slice';
import * as warehouseSlices from '../slices/warehouse.slice';

export const onLoadOwnedGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(ownedGotchisSlices.loadOwnedGotchis());

    const { type: gotchisSortType, dir: gotchisSortDir }: SortingItem =
      getState().client.ownedGotchis.ownedGotchisSorting;
    const { type: warehouseSortType, dir: warehouseSortDir }: SortingItem =
      getState().client.warehouse.warehouseSorting;

    TheGraphApi.getGotchisByAddress(address)
      .then((ownedGotchis: OwnedGotchi[]) => {
        const warehouseItemsCopy: Warehouse[] = _.cloneDeep(getState().client.warehouse.warehouse.data);

        const warehouseItems: Warehouse[] = geModifiedWarehouse(ownedGotchis, warehouseItemsCopy);
        const sortedWarehouseItems: Warehouse[] = CommonUtils.basicSort(
          warehouseItems,
          warehouseSortType,
          warehouseSortDir
        );

        dispatch(warehouseSlices.setWarehouseItems(sortedWarehouseItems));

        const sortedOwnedGotchis: OwnedGotchi[] = CommonUtils.basicSort(ownedGotchis, gotchisSortType, gotchisSortDir);
        const ids: number[] = sortedOwnedGotchis.map((gotchi: OwnedGotchi) => Number(gotchi.id));

        if (ids.length > 0) {
          ClientApi.getFireballGotchisByIds(ids)
            .then((fireballGotchis: TheGraphBatchData<FireballGotchi>[]) => {
              const extendedGotchis: GotchiExtended[] = sortedOwnedGotchis.map((gotchi: OwnedGotchi) => {
                return {
                  ...gotchi,
                  ...fireballGotchis[`gotchi${gotchi.id}`]
                };
              });

              dispatch(ownedGotchisSlices.loadOwnedGotchisSucceded(extendedGotchis));
            })
            .catch(() => dispatch(ownedGotchisSlices.loadOwnedGotchisFailed()))
            .finally(() => dispatch(ownedGotchisSlices.setIsInitialOwnedGotchisLoading(false)));
        } else {
          dispatch(ownedGotchisSlices.loadOwnedGotchisSucceded(ownedGotchis));
          dispatch(ownedGotchisSlices.setIsInitialOwnedGotchisLoading(false));
        }
      })
      .catch(() => {
        dispatch(ownedGotchisSlices.loadOwnedGotchisFailed());
        dispatch(ownedGotchisSlices.setIsInitialOwnedGotchisLoading(false));
      });
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
