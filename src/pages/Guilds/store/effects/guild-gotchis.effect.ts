import _ from 'lodash';

import { TheGraphApi } from 'api';
import { GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import { Erc1155Categories, HAUNT_ONE_BACKGROUND_WEARABLE_NUMBER, WerableBenefitTypes } from 'shared/constants';
import { FireballGotchi, SortingItem, TheGraphBatchData, WearableTypeBenefit } from 'shared/models';

import { Warehouse } from 'pages/Client/models';
import { GuildGotchi, GuildGotchiExtended } from 'pages/Guilds/models';

import { CommonUtils, ItemUtils } from 'utils';

import { WEARABLES_TYPES_BENEFITS } from 'data/wearable-types-benefits.data';

// slices
import * as ownedGotchisSlices from '../slices/guild-gotchis.slice';
import * as warehouseSlices from '../slices/warehouse.slice';

export const onLoadOwnedGotchis =
  (addresses: string[]): AppThunk =>
  async (dispatch, getState) => {
    dispatch(ownedGotchisSlices.loadOwnedGotchis());

    const { type: gotchisSortType, dir: gotchisSortDir }: SortingItem =
      getState().client.ownedGotchis.ownedGotchisSorting;
    const { type: warehouseSortType, dir: warehouseSortDir }: SortingItem =
      getState().client.warehouse.warehouseSorting;

    const promises: Promise<GuildGotchi[]>[] = addresses.map((address: string) =>
      GuildGraphApi.getMemberOwnedGotchis(address)
    );

    Promise.all(promises)
      .then((ownedGotchis: GuildGotchi[][]) => {
        const warehouseItemsCopy: Warehouse[] = _.cloneDeep(getState().guilds.warehouse.warehouse.data);

        const unitedGotchis: GuildGotchi[] = ownedGotchis.reduce(
          (result: GuildGotchi[], current: GuildGotchi[]) => result.concat(current),
          []
        );

        const warehouseItems: Warehouse[] = geModifiedWarehouse(unitedGotchis, warehouseItemsCopy);
        const sortedWarehouseItems: Warehouse[] = CommonUtils.basicSort(
          warehouseItems,
          warehouseSortType,
          warehouseSortDir
        );
        dispatch(warehouseSlices.setWarehouseItems(sortedWarehouseItems));

        const sortedGuildGotchis: GuildGotchi[] = CommonUtils.basicSort(unitedGotchis, gotchisSortType, gotchisSortDir);
        const gotchiIds: number[] = sortedGuildGotchis.map((gotchi: GuildGotchi) => Number(gotchi.id));

        if (gotchiIds.length > 0) {
          TheGraphApi.getFireballGotchisByIds(gotchiIds)
            .then((fireballGotchis: TheGraphBatchData<FireballGotchi>) => {
              const extendedGotchis: GuildGotchiExtended[] = sortedGuildGotchis.map((gotchi: GuildGotchi) => {
                return {
                  ...gotchi,
                  ...fireballGotchis[`gotchi${gotchi.id}`]
                };
              });

              dispatch(ownedGotchisSlices.loadOwnedGotchisSucceded(extendedGotchis));
            })
            .catch(() => {
              dispatch(ownedGotchisSlices.loadOwnedGotchisFailed());
            })
            .finally(() => dispatch(ownedGotchisSlices.setIsInitialOwnedGotchisLoading(false)));
        } else {
          dispatch(ownedGotchisSlices.loadOwnedGotchisSucceded([]));
          dispatch(ownedGotchisSlices.setIsInitialOwnedGotchisLoading(false));
        }
      })
      .catch(() => {
        dispatch(ownedGotchisSlices.loadOwnedGotchisFailed());
        dispatch(ownedGotchisSlices.setIsInitialOwnedGotchisLoading(false));
      });
  };

const geModifiedWarehouse = (ownedGotchis: GuildGotchi[], warehouseItemsCopy: Warehouse[]): Warehouse[] => {
  const warehouseItems: Warehouse[] = [];

  // collect all equipped wearables
  ownedGotchis.forEach((ownedGotchi: GuildGotchi) => {
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
