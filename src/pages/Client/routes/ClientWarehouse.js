import { useCallback, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import GrainIcon from '@mui/icons-material/Grain';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import qs from 'query-string';

import { WarehouseIcon } from 'components/Icons/Icons';
import ContentInner from 'components/Content/ContentInner';
import ItemsLazy from 'components/Lazy/ItemsLazy';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import Wearable from 'components/Items/Wearable/Wearable';
import { ClientContext } from 'contexts/ClientContext';
import commonUtils from 'utils/commonUtils';

const sortings = [
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
const queryParamsOrder = ['sort', 'dir'];

export default function ClientWarehouse() {
    const history = useHistory();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const {
        warehouse,
        setWarehouse,
        warehouseSorting,
        setWarehouseSorting,
        loadingGotchis,
        loadingWarehouse
    } = useContext(ClientContext);

    useEffect(() => {
        const { sort, dir } = queryParams;

        if (sort && dir) {
            const key = sortings.find(sorting => sorting.paramKey === sort)?.key;

            setWarehouseSorting({ type: key, dir });
        }

        return () => {
            setWarehouseSorting({ type: 'rarityId', dir: 'desc' });
        };
    }, []);

    useEffect(() => {
        const sortedItems = commonUtils.basicSort(warehouse, warehouseSorting.type, warehouseSorting.dir);

        setWarehouse([...sortedItems]);
    }, [loadingWarehouse, warehouseSorting]);

    const updateSortQueryParams = useCallback((prop, dir) => {
        const paramKey = sortings.find(sorting => sorting.key === prop)?.paramKey;

        history.push({
            path: location.pathname,
            search: qs.stringify({ ...queryParams, sort: paramKey, dir }, {
                sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                arrayFormat: 'comma'
            })
        });
    }, [queryParams, history, location.pathname]);

    const onSortingChange = useCallback((prop, dir) => {
        setWarehouseSorting({ type: prop, dir });
        updateSortQueryParams(prop, dir);
    }, [setWarehouseSorting, updateSortQueryParams]);

    const sorting = {
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
                    component={(props) => <Wearable wearable={props} />}
                />
            </ContentInner>
        </>
    );
}
