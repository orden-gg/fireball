import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import HeightIcon from '@mui/icons-material/Height';
import HouseIcon from '@mui/icons-material/House';
import TimerIcon from '@mui/icons-material/Timer';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import qs from 'query-string';

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
        name: 'nextChannel',
        key: 'nextChannel',
        tooltip: 'next channel',
        icon: <TimerIcon fontSize='small' />
    },
    {
        name: 'altarLevel',
        key: 'altarLevel',
        tooltip: 'altar level',
        icon: <AutoGraphIcon fontSize='small' />
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
const queryParamsOrder = ['sort', 'dir'];

export default function ClientRealmList() {
    const history = useHistory();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const {
        realm,
        setRealm,
        realmSorting,
        setRealmSorting,
        loadingRealm,
        setRealmView
    } = useContext(ClientContext);

    useEffect(() => {
        setRealmView('list');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { sort, dir } = queryParams;

        if (sort && dir) {
            setRealmSorting({ type: sort, dir });
        }

        return () => {
            setRealmSorting({ type: 'size', dir: 'desc' });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const sortedItems = commonUtils.basicSort(realm, realmSorting.type, realmSorting.dir);

        setRealm([...sortedItems]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingRealm, realmSorting]);

    const updateSortQueryParams = useCallback((prop, dir) => {
        history.push({
            path: location.pathname,
            search: qs.stringify({...queryParams, sort: prop, dir }, {
                sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                arrayFormat: 'comma'
            })
        });
    }, [queryParams, history, location.pathname]);

    const onSortingChanged = useCallback((prop, dir) => {
        updateSortQueryParams(prop, dir);
    }, [updateSortQueryParams]);

    const sorting = {
        sortingList: sortings,
        sortingDefaults: realmSorting,
        setSorting: setRealmSorting,
        onSortingChanged: onSortingChanged
    };

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
