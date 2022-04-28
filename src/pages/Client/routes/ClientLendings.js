import React, { useContext, useCallback, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

import qs from 'query-string';

import { AlphaTokenIcon, FomoTokenIcon, FudTokenIcon, GotchiIcon, KekTokenIcon } from 'components/Icons/Icons';
import ContentInner from 'components/Content/ContentInner';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import { ClientContext } from 'contexts/ClientContext';
import { filtersData } from 'data/filters.data';
import commonUtils from 'utils/commonUtils';
import filtersUtils from 'utils/filtersUtils';

const sortings = [
    {
        name: 'endTime',
        key: 'endTime',
        tooltip: 'end time',
        icon: <TimerIcon fontSize='small' />
    },
    {
        name: 'income',
        key: 'income',
        tooltip: 'alchemica power',
        icon: <LocalFireDepartmentIcon fontSize='small' />
    },
    {
        name: 'total',
        key: 'totalTokens',
        tooltip: 'total alchemica',
        icon: <GroupWorkIcon fontSize='small' />
    },
    {
        name: 'fud',
        key: 'fud',
        tooltip: 'fud',
        icon: <FudTokenIcon height={18} width={18} />
    },
    {
        name: 'fomo',
        key: 'fomo',
        tooltip: 'fomo',
        icon: <FomoTokenIcon height={18} width={18} />
    },
    {
        name: 'alpha',
        key: 'alpha',
        tooltip: 'alpha',
        icon: <AlphaTokenIcon height={18} width={18} />
    },
    {
        name: 'kek',
        key: 'kek',
        tooltip: 'kek',
        icon: <KekTokenIcon height={18} width={18} />
    }
];

const initialFilters = {
    hauntId: {...filtersData.hauntId},
    collateral: {...filtersData.collateral},
    search: {...filtersData.search}
};

export default function ClientLendings() {
    const history = useHistory();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const {
        lendings,
        lendingsSorting,
        setLendingsSorting,
        loadingLendings
    } = useContext(ClientContext);
    const [currentFilters, setCurrentFilters] = useState({...initialFilters});
    const [sortedFilteredLendings, setSortedFilteredLendings] = useState([]);
    const [isSortingChanged, setIsSortingChanged] = useState(false);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

    useEffect(() => {
        return () => {
            onResetFilters();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        filtersUtils.updateFiltersFromQueryParams(queryParams, currentFilters);

        const filtersCount = filtersUtils.getActiveFiltersCount(currentFilters);

        setActiveFiltersCount(filtersCount);
        setCurrentFilters(currentFilters);
    }, [currentFilters, queryParams]);

    useEffect(() => {
        const activeFilters = Object.entries(currentFilters)
            .filter(([currentKey, currentFilter]) => currentFilter.isFilterActive);

        if (activeFilters.length > 0) {
            setSortedFilteredLendings(filteredLendingsCache => {
                let filteredLendings;

                if (isSortingChanged) {
                    filteredLendings = filteredLendingsCache.filter(lending =>
                        Object.entries(currentFilters).every(([key, filter]) =>
                            filter.isFilterActive ? filter.predicateFn(filter, lending, key) : true
                        )
                    );
                } else {
                    filteredLendings = lendings.filter(lending =>
                        Object.entries(currentFilters).every(([key, filter]) =>
                            filter.isFilterActive ? filter.predicateFn(filter, lending, key) : true
                        )
                    );
                }

                return filteredLendings;
            });

            setIsFiltersApplied(true);
        } else {
            setSortedFilteredLendings([...lendings]);
        }
    }, [currentFilters, lendings, isSortingChanged]);

    const applySorting = useCallback((prop, dir) => {
        const itemsToSort = isSortingChanged || isFiltersApplied ? sortedFilteredLendings : lendings;
        const sortedItems = commonUtils.basicSort(itemsToSort, prop, dir);

        setSortedFilteredLendings([...sortedItems])
    }, [isSortingChanged, isFiltersApplied, lendings, sortedFilteredLendings]);

    const onSortingChanged = useCallback((prop, dir) => {
        applySorting(prop, dir);
        setIsSortingChanged(true);
    }, [applySorting]);

    const sorting = {
        sortingList: sortings,
        sortingDefaults: lendingsSorting,
        setSorting: setLendingsSorting,
        onSortingChanged: onSortingChanged
    };

    const getUpdatedFilters = useCallback(selectedFilters => {
        return filtersUtils.getUpdatedFiltersFromSelectedFilters(selectedFilters, currentFilters);
    }, [currentFilters]);

    const updateQueryParams = useCallback(filters => {
        const params = {...queryParams};

        Object.entries(filters).forEach(([key, filter]) => {
            if (filter.isFilterActive) {
                params[key] = filter.getQueryParamsFn(filter);
            } else {
                delete params[key];
            }
        });

        history.push({
            path: location.pathname,
            search: qs.stringify(params, { arrayFormat: 'comma' })
        });
    }, [queryParams, history, location.pathname]);

    const onApplyFilters = useCallback(selectedFilters => {
        if (Object.keys(selectedFilters).length > 0) {
            setIsFiltersApplied(true);
        }

        const updatedCurrentFilters = getUpdatedFilters(selectedFilters);
        setCurrentFilters(updatedCurrentFilters);
        updateQueryParams(updatedCurrentFilters);
    }, [updateQueryParams, getUpdatedFilters]);

    const onResetFilters = useCallback(() => {
        Object.entries(currentFilters).forEach(([key, filter]) => {
            filter.resetFilterFn(filter);
        });

        setIsFiltersApplied(false);
        setCurrentFilters(currentFilters);
        updateQueryParams(currentFilters);
    }, [currentFilters, updateQueryParams]);

    const getLendings = useCallback(() => {
        return (isSortingChanged || isFiltersApplied) ? sortedFilteredLendings: lendings;
    }, [isSortingChanged, isFiltersApplied, sortedFilteredLendings, lendings]);

    return (
        <>
            <SortFilterPanel
                sorting={sorting}
                itemsLength={getLendings().length}
                placeholder={
                    <GotchiIcon width={20} height={20} />
                }
                isShowFilters={true}
                filters={currentFilters}
                applyFilters={onApplyFilters}
                resetFilters={onResetFilters}
                filtersCount={activeFiltersCount}
            />

            <ContentInner dataLoading={loadingLendings}>
                <GotchisLazy
                    items={getLendings()}
                    render = {[
                        {
                            badges: [
                                'collateral',
                                'rs',
                                'kinship'
                            ]
                        },
                        'svg',
                        'name',
                        'lendingStats'
                    ]}
                />
            </ContentInner>
        </>
    );
}
