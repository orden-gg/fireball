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
import { warehouseSorting } from 'pages/Guilds/data';

import { ContentInner } from 'components/Content/ContentInner';
import { WarehouseIcon } from 'components/Icons/Icons';
import {
  CardBalance,
  CardGroup,
  CardImage,
  CardListing,
  CardName,
  CardSlot,
  CardStats,
  CardTotalPrice
} from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { CommonUtils, FilterUtils, ItemUtils } from 'utils';

import { GuildWarehouseStyles } from './styles';

export function GuildWarehouse() {
  const classes = GuildWarehouseStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const dispatch = useAppDispatch();

  const warehouse: Warehouse[] = useAppSelector(fromGuildsStore.getWarehouse);
  const isInitialWarehouseLoading: boolean = useAppSelector(fromGuildsStore.getIsInitialWarehouseLoading);
  const defaultSorting: SortingItem = useAppSelector(fromGuildsStore.getWarehouseSorting);

  useEffect(() => {
    const { sort, dir } = queryParams as CustomParsedQuery;

    if (sort && dir) {
      const key: CustomAny = warehouseSorting.find((sorting) => sorting.paramKey === sort)?.key;

      dispatch(fromGuildsStore.setWarehouseSorting({ type: key, dir }));
    }
  }, []);

  useEffect(() => {
    const sortedItems: Warehouse[] = CommonUtils.basicSort(warehouse, defaultSorting.type, defaultSorting.dir);

    dispatch(fromGuildsStore.setWarehouseItems([...sortedItems]));
  }, [isInitialWarehouseLoading, defaultSorting]);

  const updateSortQueryParams = useCallback(
    (prop: string, dir: string) => {
      const params = { ...queryParams, sort: prop, dir };

      FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, warehouseQueryParams);
    },
    [queryParams, navigate, location.pathname]
  );

  const onSortingChange = (prop: string, dir: string) => {
    dispatch(fromGuildsStore.setWarehouseSorting({ type: prop, dir }));
    updateSortQueryParams(prop, dir);
  };

  const sorting: CustomAny = {
    sortingList: warehouseSorting,
    sortingDefaults: defaultSorting,
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
        itemsLength={warehouse.length}
        placeholder={<WarehouseIcon width={20} height={20} />}
      />

      <ContentInner dataLoading={isInitialWarehouseLoading}>
        <ItemsLazy
          items={warehouse}
          component={(wearable: Warehouse) => (
            <ItemCard id={wearable.id} category={wearable.category} type={wearable.rarity}>
              <CardGroup name='header'>
                <CardSlot id={wearable.id} />
                <CardTotalPrice balance={wearable.balance} priceInWei={wearable.priceInWei} />
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
              <CardGroup name='footer'>
                <CardListing />
              </CardGroup>
            </ItemCard>
          )}
        />
      </ContentInner>
    </>
  );
}
