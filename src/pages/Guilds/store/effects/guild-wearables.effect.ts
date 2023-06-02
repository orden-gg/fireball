import { GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import { Erc1155Categories, ItemTypeNames, WerableBenefitTypes } from 'shared/constants';
import { SortingItem, WearableTypeBenefit } from 'shared/models';

import { Warehouse } from 'pages/Client/models';
import { GuildWearable } from 'pages/Guilds/models';
import { GuildUtils } from 'pages/Guilds/utils';

import { CommonUtils, ItemUtils } from 'utils';

import { WEARABLES_TYPES_BENEFITS } from 'data/wearable-types-benefits.data';

// slices
import * as warehouseSlices from '../slices/guild-wearables.slice';

export const onLoadWarehouse =
  (addresses: string[], wearablesCount: number): AppThunk =>
  (dispatch, getState) => {
    dispatch(warehouseSlices.loadGuildWearables());

    const graphQueryParams: { first: number; skip: number }[] = GuildUtils.getFirstAndSkipParamsByCount(wearablesCount);

    const promises: Promise<GuildWearable[]>[] = [];

    const { type, dir }: SortingItem = getState().guilds.guildWearables.guildWearablesSorting;

    for (const params of graphQueryParams) {
      promises.push(GuildGraphApi.getGuildWearables(params.first, params.skip, addresses));
    }

    Promise.all(promises)
      .then((res: GuildWearable[][]) => {
        const unitedWearables: GuildWearable[] = res.reduce(
          (allWearables: GuildWearable[], current: GuildWearable[]) => allWearables.concat(current),
          []
        );
        const modifiedWearables: Warehouse[] = getModifiedWearables(unitedWearables);
        const sortedWarehouseItems: Warehouse[] = CommonUtils.basicSort(modifiedWearables, type, dir);

        dispatch(warehouseSlices.loadGuildWearablesSucceded(sortedWarehouseItems));
      })
      .catch(() => dispatch(warehouseSlices.loadGuildWearablesFailed()));
  };

const getModifiedWearables = (wearables: GuildWearable[]): Warehouse[] => {
  const modifiedWarehouseItems: Warehouse[] = [];

  const distinctWearables = wearables.reduce((uniqueWearables: GuildWearable[], current: GuildWearable) => {
    let existWearable: GuildWearable | undefined = uniqueWearables.find(
      (wearable) => wearable.tokenId === current.tokenId
    );

    if (existWearable) {
      existWearable = {
        ...existWearable,
        amount: existWearable.amount + existWearable.equipped + current.amount + current.equipped
      };
    } else {
      const wearableToAdd: GuildWearable = {
        ...current,
        amount: current.amount + current.equipped
      };

      uniqueWearables.push(wearableToAdd);
    }

    return uniqueWearables;
  }, []);

  distinctWearables.forEach((item: GuildWearable) => {
    const isConsumable: boolean = ItemUtils.getTypeNameById(item.tokenId) === ItemTypeNames.Consumable;
    const rarityName: string = isConsumable ? 'drop' : ItemUtils.getRarityNameById(item.tokenId);
    const wearableTypeBenefit: WearableTypeBenefit | undefined = WEARABLES_TYPES_BENEFITS.find(
      (benefit: WearableTypeBenefit) => benefit.ids.some((id: number) => id === Number(item.tokenId))
    );

    modifiedWarehouseItems.push({
      id: Number(item.tokenId),
      rarity: rarityName,
      rarityId: ItemUtils.getItemRarityId(rarityName),
      balance: Number(item.amount),
      category: isConsumable ? Erc1155Categories.Consumable : Erc1155Categories.Wearable,
      benefit: {
        first: wearableTypeBenefit ? wearableTypeBenefit.benefit.first : WerableBenefitTypes.Unknown,
        second: wearableTypeBenefit ? wearableTypeBenefit.benefit.second : WerableBenefitTypes.Unknown
      },
      itemType: wearableTypeBenefit?.type
    });
  });

  return modifiedWarehouseItems;
};
