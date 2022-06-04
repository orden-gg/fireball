import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import HeightIcon from '@mui/icons-material/Height';
import HouseIcon from '@mui/icons-material/House';

import qs from 'query-string';

import { AlphaIcon, FomoIcon, FudIcon, KekIcon } from 'components/Icons/Icons';
import ContentInner from 'components/Content/ContentInner';
import ItemsLazy from 'components/Lazy/ItemsLazy';
import Parcel from 'components/Items/Parcel/Parcel';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import { ClientContext } from 'contexts/ClientContext';
import { filtersData } from 'data/filters.data';
import commonUtils from 'utils/commonUtils';
import filtersUtils from 'utils/filtersUtils';

const sortings = [
    {
        name: 'size',
        key: 'size',
        paramKey: 'size',
        tooltip: 'size',
        icon: <HeightIcon fontSize='small' />
    },
    {
        name: 'district',
        key: 'district',
        paramKey: 'district',
        tooltip: 'district',
        icon: <HouseIcon fontSize='small' />
    },
    {
        name: 'fudBoost',
        key: 'fudBoost',
        paramKey: 'fudBoost',
        tooltip: 'fud boost',
        icon: <FudIcon height={18} width={18} />
    },
    {
        name: 'fomoBoost',
        key: 'fomoBoost',
        paramKey: 'fomoBoost',
        tooltip: 'fomo boost',
        icon: <FomoIcon height={18} width={18} />
    },
    {
        name: 'alphaBoost',
        key: 'alphaBoost',
        paramKey: 'alphaBoost',
        tooltip: 'alpha boost',
        icon: <AlphaIcon height={18} width={18} />
    },
    {
        name: 'kekBoost',
        key: 'kekBoost',
        paramKey: 'kekBoost',
        tooltip: 'kek boost',
        icon: <KekIcon height={18} width={18} />
    }
];
const initialFilters = {
    size: { ...filtersData.size, divider: true },
    district: { ...filtersData.district},
};
const queryParamsOrder = ['district', 'size', 'sort', 'dir'];

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
    const [currentFilters, setCurrentFilters] = useState({...initialFilters});
    const [modifiedRealm, setModifiedRealm] = useState([]);
    const [isSortingChanged, setIsSortingChanged] = useState(false);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

    useEffect(() => {
        setRealmView('list');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setCurrentFilters(currentFiltersCache =>
            filtersUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );

        const { sort, dir } = queryParams;

        if (sort && dir) {
            const key = sortings.find(sorting => sorting.paramKey === sort)?.key;

            updateSorting(key, dir);
        }

        return () => {
            onResetFilters();
            setRealmSorting({ type: 'size', dir: 'desc' });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const activeFilters = Object.entries(currentFilters).filter(([_, filter]) => filter.isFilterActive);

        if (activeFilters.length > 0) {
            const filtersCount = filtersUtils.getActiveFiltersCount(currentFilters);

            setActiveFiltersCount(filtersCount);
            setIsFiltersApplied(true);
        } else {
            setActiveFiltersCount(0);
            setIsFiltersApplied(false);
        }

        updateQueryParams(currentFilters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFilters]);

    useEffect(() => {
        setModifiedRealm(modifiedGotchisCache => filtersUtils.getFilteredSortedItems({
            items: realm,
            itemsCache: modifiedGotchisCache,
            filters: currentFilters,
            isFiltersApplied,
            isFiltersAppliedSetter: setIsFiltersApplied,
            sorting: realmSorting,
            isSortingChanged,
            getFilteredItems: filtersUtils.getFilteredItems
        }));
    }, [currentFilters, realm, isFiltersApplied, isSortingChanged, realmSorting]);

    useEffect(() => {
        const sortedItems = commonUtils.basicSort(realm, realmSorting.type, realmSorting.dir);

        setRealm([...sortedItems]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingRealm, realmSorting]);

    const updateSorting = useCallback((prop, dir) => {
        setIsSortingChanged(true);
        setRealmSorting({ type: prop, dir });
    }, [setRealmSorting]);

    const updateSortQueryParams = useCallback((prop, dir) => {
        const paramKey = sortings.find(sorting => sorting.key === prop)?.paramKey;

        history.push({
            path: location.pathname,
            search: qs.stringify({...queryParams, sort: paramKey, dir }, {
                sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                arrayFormat: 'comma'
            })
        });
    }, [queryParams, history, location.pathname]);

    const onSortingChange = useCallback((prop, dir) => {
        updateSorting(prop, dir);
        updateSortQueryParams(prop, dir);
    }, [updateSorting, updateSortQueryParams]);

    const sorting = {
        sortingList: sortings,
        sortingDefaults: realmSorting,
        onSortingChange: onSortingChange
    };

    const updateQueryParams = useCallback(filters => {
        const params = filtersUtils.getUpdatedQueryParams(queryParams, filters);

        history.push({
            path: location.pathname,
            search: qs.stringify(params, {
                sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                arrayFormat: 'comma'
            })
        });
    }, [queryParams, history, location.pathname]);

    const onSetSelectedFilters = (key, selectedValue) => {
        setCurrentFilters(currentFiltersCache => {
            const cacheCopy = {...currentFiltersCache};

            if (!cacheCopy[key].getIsFilterValidFn(selectedValue)) {
                cacheCopy[key].resetFilterFn(cacheCopy[key]);
            } else {
                cacheCopy[key].updateFromFilterFn(cacheCopy[key], selectedValue);
            }

            return cacheCopy;
        });
    }

    const onResetFilters = useCallback(() => {
        const currentFiltersCopy = {...currentFilters};

        Object.entries(currentFiltersCopy).forEach(([_, filter]) => {
            filter.resetFilterFn(filter);
        });

        setCurrentFilters({...currentFiltersCopy});
    }, [currentFilters]);

    const onExportData = useCallback(() => {
        filtersUtils.exportData(modifiedRealm, 'client_realm');
    }, [modifiedRealm]);

    const getRealm = useCallback(() => {
        return (isSortingChanged || isFiltersApplied) ? modifiedRealm : realm;
    }, [isSortingChanged, isFiltersApplied, modifiedRealm, realm]);

    return (
        <>
            <SortFilterPanel
                sorting={sorting}
                itemsLength={getRealm().length}
                placeholder={
                    <KekIcon width={20} height={20} />
                }
                filters={initialFilters}
                isShowFilters={true}
                setSelectedFilters={onSetSelectedFilters}
                resetFilters={onResetFilters}
                exportData={onExportData}
                filtersCount={activeFiltersCount}
            />

            <ContentInner dataLoading={loadingRealm}>
                <ItemsLazy
                    items={getRealm()}
                    component={(props) => <Parcel parcel={props} />}
                />
            </ContentInner>
        </>
    );
}
