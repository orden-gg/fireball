import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import GrainIcon from '@mui/icons-material/Grain';

import qs from 'query-string';

// store
import * as fromClientStore from '../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { Erc1155Categories } from 'shared/constants';
import { CustomParsedQuery, SortingItem, SortingListItem } from 'shared/models';

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

import { CommonUtils, ItemUtils } from 'utils';

import { Warehouse } from '../models';
import { warehouseStyles } from '../styles';

const sortings: SortingListItem[] = [
  {
    name: 'rarity',
    key: 'rarityId',
    paramKey: 'rarity',
    tooltip: 'rarity',
    icon: <GrainIcon fontSize='small' />
  },
  {
    name: 'quantity',
    key: 'balance',
    paramKey: 'quantity',
    tooltip: 'quantity',
    icon: <FormatListNumberedIcon fontSize='small' />
  }
];
const queryParamsOrder: string[] = ['sort', 'dir'];

export function ClientWarehouse() {
  const classes = warehouseStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const dispatch = useAppDispatch();

  const warehouse: Warehouse[] = useAppSelector(fromClientStore.getWarehouse);
  const isWarehouseLoading: boolean = useAppSelector(fromClientStore.getIsWarehouseLoading);
  const warehouseSorting: SortingItem = useAppSelector(fromClientStore.getWarehouseSorting);
  const isOwnedGotchisLoading: boolean = useAppSelector(fromClientStore.getIsOwnedGotchisLoading);

  useEffect(() => {
    const { sort, dir } = queryParams as CustomParsedQuery;

    if (sort && dir) {
      const key: any = sortings.find((sorting) => sorting.paramKey === sort)?.key;

      dispatch(fromClientStore.setWarehouseSorting({ type: key, dir }));
    }
  }, []);

  useEffect(() => {
    const sortedItems: Warehouse[] = CommonUtils.basicSort(warehouse, warehouseSorting.type, warehouseSorting.dir);

    dispatch(fromClientStore.setWarehouseItems([...sortedItems]));
  }, [isWarehouseLoading, warehouseSorting]);

  const updateSortQueryParams = useCallback(
    (prop: string, dir: string) => {
      const paramKey = sortings.find((sorting) => sorting.key === prop)?.paramKey;

      navigate({
        pathname: location.pathname,
        search: qs.stringify(
          { ...queryParams, sort: paramKey, dir },
          {
            sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
            arrayFormat: 'comma'
          }
        )
      });
    },
    [queryParams, navigate, location.pathname]
  );

  const onSortingChange = (prop: string, dir: string) => {
    dispatch(fromClientStore.setWarehouseSorting({ type: prop, dir }));
    updateSortQueryParams(prop, dir);
  };

  const sorting: any = {
    sortingList: sortings,
    sortingDefaults: warehouseSorting,
    onSortingChange: onSortingChange
  };

  const renderCardStats = (id: number, category: string): JSX.Element => {
    const isWearable: boolean = category === Erc1155Categories.Wearable;
    const stats: any = isWearable ? ItemUtils.getTraitModifiersById(id) : ItemUtils.getDescriptionById(id);

    return <CardStats stats={stats} />;
  };

  return (
    <>
      <SortFilterPanel
        sorting={sorting}
        itemsLength={warehouse.length}
        placeholder={<WarehouseIcon width={20} height={20} />}
      />

      <ContentInner dataLoading={isWarehouseLoading || isOwnedGotchisLoading}>
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
