import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import qs from 'query-string';

// store
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { Erc1155Categories } from 'shared/constants';
import { CustomParsedQuery, SortingItem } from 'shared/models';

import { Warehouse } from 'pages/Client/models';
import { warehouseQueryParams } from 'pages/Guilds/constants';
import { wearablesSorting } from 'pages/Guilds/data';
import { GeneralGuildStats } from 'pages/Guilds/models';

import { ContentInner } from 'components/Content/ContentInner';
import { WarehouseIcon } from 'components/Icons/Icons';
import { CardBalance, CardGroup, CardImage, CardName, CardSlot, CardStats } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { CommonUtils, FilterUtils, ItemUtils } from 'utils';

import { guildWearablesStyles } from './styles';

export function GuildWearables() {
  const classes = guildWearablesStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const dispatch = useAppDispatch();

  const guildMembers: string[] = useAppSelector(fromGuildsStore.getCurrentGuildMembers);
  const guildStats: GeneralGuildStats = useAppSelector(fromGuildsStore.getGuildStats);
  const guildWearables: Warehouse[] = useAppSelector(fromGuildsStore.getGuildWearables);
  const isGuildWearablesLoading: boolean = useAppSelector(fromGuildsStore.getIsGuildWearablesLoading);
  const guildWearablesSorting: SortingItem = useAppSelector(fromGuildsStore.getGuildWearablesSorting);

  useEffect(() => {
    if (guildMembers.length > 0 && guildStats.itemsCount !== 0) {
      dispatch(fromGuildsStore.onLoadWarehouse(guildMembers, guildStats.itemsCount));
    }
  }, [guildMembers, guildStats]);

  useEffect(() => {
    const { sort, dir } = queryParams as CustomParsedQuery;

    if (sort && dir) {
      const key = wearablesSorting.find((sorting) => sorting.paramKey === sort)?.key;

      onSortingChange(key!, dir);
    }
  }, []);

  useEffect(() => {
    const sortedItems: Warehouse[] = CommonUtils.basicSort(
      guildWearables,
      guildWearablesSorting.type,
      guildWearablesSorting.dir
    );

    dispatch(fromGuildsStore.setGuildWearables([...sortedItems]));
    updateSortQueryParams(guildWearablesSorting.type, guildWearablesSorting.dir);
  }, [guildWearablesSorting]);

  const updateSortQueryParams = useCallback(
    (prop: string, dir: string) => {
      const params = { ...queryParams, sort: prop, dir };

      FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, warehouseQueryParams);
    },
    [queryParams, navigate, location.pathname]
  );

  const onSortingChange = (prop: string, dir: string) => {
    dispatch(fromGuildsStore.setGuildWearablesSorting({ type: prop, dir }));
  };

  const sorting: CustomAny = {
    sortingList: wearablesSorting,
    sortingDefaults: guildWearablesSorting,
    onSortingChange: onSortingChange
  };

  const renderCardStats = (id: number, category: string): JSX.Element => {
    const isWearable: boolean = category === Erc1155Categories.Wearable;
    const stats: CustomAny = isWearable ? ItemUtils.getTraitModifiersById(id) : ItemUtils.getDescriptionById(id);

    return <CardStats stats={stats} />;
  };

  return (
    <>
      <SortFilterPanel
        sorting={sorting}
        itemsLength={guildWearables.length}
        placeholder={<WarehouseIcon width={20} height={20} />}
      />

      <ContentInner dataLoading={isGuildWearablesLoading} className={classes.container}>
        <ItemsLazy
          items={guildWearables}
          component={(wearable: Warehouse) => (
            <ItemCard id={wearable.id} category={wearable.category} type={wearable.rarity}>
              <CardGroup name='header'>
                <CardSlot id={wearable.id} />
                <CardBalance balance={wearable.balance} holders={wearable.holders} />
              </CardGroup>
              <CardGroup name='body'>
                <CardImage id={wearable.id} />
                <CardName id={wearable.id} />
                {renderCardStats(wearable.id, wearable.category)}
                <div className={classes.benefits}>
                  <span className={classes.itemTypeValue}>{wearable.itemType}</span>
                  <span className={classes.benefitValue}>
                    {wearable.benefit.first}, {wearable.benefit.second}
                  </span>
                </div>
              </CardGroup>
            </ItemCard>
          )}
        />
      </ContentInner>
    </>
  );
}
