import React, { useContext } from 'react';
import GrainIcon from '@mui/icons-material/Grain';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import { WarehouseIcon } from 'components/Icons/Icons';
import ContentInner from 'components/Content/ContentInner';
import ItemsLazy from 'components/Lazy/ItemsLazy';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import Wearable from 'components/Items/Wearable/Wearable';
import { ClientContext } from 'contexts/ClientContext';

const sortings = [
    {
        name: 'rarity',
        key: 'rarityId',
        tooltip: 'rarity',
        icon: <GrainIcon fontSize='small' />
    },
    {
        name: 'quantity',
        key: 'balance',
        tooltip: 'quantity',
        icon: <FormatListNumberedIcon fontSize='small' />
    }
];

export default function ClientWarehouse() {
    const {
        warehouse,
        setWarehouse,
        warehouseSorting,
        setWarehouseSorting,
        loadingGotchis,
        loadingWarehouse,
    } = useContext(ClientContext);

    const sorting = {
        items: warehouse,
        setItems: setWarehouse,
        sortingList: sortings,
        sortingDefaults: warehouseSorting,
        setSorting: setWarehouseSorting
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
