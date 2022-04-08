import React, { useContext } from 'react';
import GrainIcon from '@mui/icons-material/Grain';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import ContentInner from 'components/Content/ContentInner';
import ItemsLazy from 'components/Lazy/ItemsLazy';
import LazySorting from 'components/Filters/LazySorting';
import Wearable from 'components/Items/Wearable/Wearable';
import { ClientContext } from 'contexts/ClientContext';
import warehouseIcon from 'assets/images/wearables/15.svg';

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

    return (
        <>
            <LazySorting
                items={warehouse}
                setItems={setWarehouse}
                sortingList={sortings}
                setSorting={setWarehouseSorting}
                defaults={warehouseSorting}
                placeholder={
                    <img
                        src={warehouseIcon}
                        alt='wearable'
                        width={20}
                        height={20}
                    />
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
