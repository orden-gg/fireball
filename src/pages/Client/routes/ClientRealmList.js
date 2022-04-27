import React, { useCallback, useContext, useEffect } from 'react';
import HeightIcon from '@mui/icons-material/Height';
import HouseIcon from '@mui/icons-material/House';

import { AlphaIcon, FomoIcon, FudIcon, KekIcon } from 'components/Icons/Icons';
import ContentInner from 'components/Content/ContentInner';
import ItemsLazy from 'components/Lazy/ItemsLazy';
import Parcel from 'components/Items/Parcel/Parcel';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import { ClientContext } from 'contexts/ClientContext';
import commonUtils from 'utils/commonUtils';

const sortings = [
    {
        name: 'size',
        key: 'size',
        tooltip: 'size',
        icon: <HeightIcon fontSize='small' />
    },
    {
        name: 'district',
        key: 'district',
        tooltip: 'district',
        icon: <HouseIcon fontSize='small' />
    },
    {
        name: 'fudBoost',
        key: 'fudBoost',
        tooltip: 'fud boost',
        icon: <FudIcon height={18} width={18} />
    },
    {
        name: 'fomoBoost',
        key: 'fomoBoost',
        tooltip: 'fomo boost',
        icon: <FomoIcon height={18} width={18} />
    },
    {
        name: 'alphaBoost',
        key: 'alphaBoost',
        tooltip: 'alpha boost',
        icon: <AlphaIcon height={18} width={18} />
    },
    {
        name: 'kekBoost',
        key: 'kekBoost',
        tooltip: 'kek boost',
        icon: <KekIcon height={18} width={18} />
    }
];

export default function ClientRealmList() {
    const {
        realm,
        setRealm,
        realmSorting,
        setRealmSorting,
        loadingRealm,
        setRealmView
    } = useContext(ClientContext);

    const onSortingChanged = useCallback((prop, dir) => {
        const sortedItems = commonUtils.basicSort(realm, prop, dir);

        setRealm([...sortedItems]);
    }, [realm, setRealm]);

    const sorting = {
        sortingList: sortings,
        sortingDefaults: realmSorting,
        setSorting: setRealmSorting,
        onSortingChanged: onSortingChanged
    };

    useEffect(() => {
        setRealmView('list');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <SortFilterPanel
                sorting={sorting}
                itemsLength={realm.length}
                placeholder={
                    <KekIcon width={20} height={20} />
                }
            />

            <ContentInner dataLoading={loadingRealm}>
                <ItemsLazy
                    items={realm}
                    component={(props) => <Parcel parcel={props} />}
                />
            </ContentInner>
        </>
    );
}
