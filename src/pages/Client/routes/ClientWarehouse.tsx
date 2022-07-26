import { useCallback, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GrainIcon from '@mui/icons-material/Grain';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import qs from 'query-string';

import { CustomParsedQuery, SortingListItem } from 'shared/models';
import { ItemCard, CardBody, CardImage, CardName, CardStats, CardSlot, CardTotalPrice, CardBalance, CardInner, CardListings } from 'components/ItemCard';
import { WarehouseIcon } from 'components/Icons/Icons';
import { ContentInner } from 'components/Content/ContentInner';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { Wearable } from 'components/Items/Wearable/Wearable';
import { ClientContext } from 'contexts/ClientContext';
import { CommonUtils } from 'utils';

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

import { styles }  from '../styles';

export function ClientWarehouse() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const classes = styles();

    const {
        warehouse,
        setWarehouse,
        warehouseSorting,
        setWarehouseSorting,
        loadingGotchis,
        loadingWarehouse
    } = useContext<any>(ClientContext);



    useEffect(() => {
        const { sort, dir } = queryParams as CustomParsedQuery;

        if (sort && dir) {
            const key: any = sortings.find(sorting => sorting.paramKey === sort)?.key;

            setWarehouseSorting({ type: key, dir });
        }
    }, []);

    useEffect(() => {
        const sortedItems: any[] = CommonUtils.basicSort(warehouse, warehouseSorting.type, warehouseSorting.dir);

        setWarehouse([...sortedItems]);
    }, [loadingWarehouse, warehouseSorting]);

    const updateSortQueryParams = useCallback((prop: string, dir: string) => {
        const paramKey = sortings.find(sorting => sorting.key === prop)?.paramKey;

        navigate({
            pathname: location.pathname,
            search: qs.stringify({ ...queryParams, sort: paramKey, dir }, {
                sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                arrayFormat: 'comma'
            })
        });
    }, [queryParams, navigate, location.pathname]);

    const onSortingChange = useCallback((prop: string, dir: string) => {
        setWarehouseSorting({ type: prop, dir });
        updateSortQueryParams(prop, dir);
    }, [setWarehouseSorting, updateSortQueryParams]);

    const sorting: any = {
        sortingList: sortings,
        sortingDefaults: warehouseSorting,
        onSortingChange: onSortingChange
    };

    return (
        <>
            <SortFilterPanel
                sorting={sorting}
                itemsLength={warehouse.length}
                placeholder={
                    <WarehouseIcon width={20} height={20} />
                }
            />

            <ContentInner dataLoading={loadingWarehouse || loadingGotchis}>
                <ItemsLazy
                    items={warehouse}
                    component={(props) => {
                        const id = props.id || props.erc1155TypeId;

                        return <ItemCard type={props.rarity}>
                            <CardInner>
                                <CardTotalPrice
                                    id={id}
                                    balance={props.balance}
                                    category={props.category}
                                    priceInWei={props.priceInWei}
                                />
                                <CardBalance
                                    balance={props.balance || props.quentity}
                                    holders={props.holders}
                                />
                            </CardInner>
                            <CardBody>
                                <CardImage id={id} />
                                <CardName id={id} />
                                <CardStats id={id} category={props.category} />
                                <CardSlot id={id} />
                            </CardBody>
                            <CardInner>
                                <CardListings id={id} category={props.category} />
                            </CardInner>
                        </ItemCard>
                    }
                }/>
            </ContentInner>
        </>
    );
}
