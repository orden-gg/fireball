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
import Gotchi from 'components/Gotchi/Gotchi';
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
    hauntId: {...filtersData.hauntId, divider: true},
    collateral: {...filtersData.collateral, divider: true},
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
    const [modifiedLendings, setModifiedLendings] = useState([]);
    const [isSortingChanged, setIsSortingChanged] = useState(false);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

    useEffect(() => {
        return () => onResetFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const filtersCount = filtersUtils.getActiveFiltersCount(currentFilters);

        setActiveFiltersCount(filtersCount);
        setCurrentFilters(currentFiltersCache =>
            filtersUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );
    }, [currentFilters, queryParams]);

    useEffect(() => {
        setModifiedLendings(modifiedLendingsCache => filtersUtils.getFilteredSortedItems({
            items: lendings,
            itemsCache: modifiedLendingsCache,
            filters: currentFilters,
            isFiltersApplied,
            isFiltersAppliedSetter: setIsFiltersApplied,
            sorting: lendingsSorting,
            isSortingChanged,
            getFilteredItems: filtersUtils.getFilteredItems
        }));
    }, [currentFilters, lendings, isFiltersApplied, isSortingChanged, lendingsSorting]);

    const applySorting = useCallback((prop, dir) => {
        const itemsToSort = isSortingChanged || isFiltersApplied ? modifiedLendings : lendings;
        const sortedItems = commonUtils.basicSort(itemsToSort, prop, dir);

        setModifiedLendings([...sortedItems])
    }, [isSortingChanged, isFiltersApplied, lendings, modifiedLendings]);

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

    const updateQueryParams = useCallback(filters => {
        const params = filtersUtils.getUpdatedQueryParams(queryParams, filters);

        history.push({
            path: location.pathname,
            search: qs.stringify(params, { arrayFormat: 'comma' })
        });
    }, [queryParams, history, location.pathname]);

    const onSetSelectedFilters = useCallback((key, selectedValue) => {
        const currentFiltersCopy = {...currentFilters};

        if (!currentFiltersCopy[key].getIsFilterValidFn(selectedValue)) {
            currentFiltersCopy[key].resetFilterFn(currentFiltersCopy[key]);
        } else {
            currentFiltersCopy[key].updateFromFilterFn(currentFiltersCopy[key], selectedValue);
        }

        const activeFilters = Object.entries(currentFiltersCopy).filter(([key, filter]) => filter.isFilterActive);

        if (activeFilters.length > 0) {
            setIsFiltersApplied(true);
        } else {
            setIsFiltersApplied(false);
        }

        setCurrentFilters({...currentFiltersCopy});
        updateQueryParams(currentFiltersCopy);
    }, [currentFilters, updateQueryParams]);

    const onResetFilters = useCallback(() => {
        Object.entries(currentFilters).forEach(([key, filter]) => {
            filter.resetFilterFn(filter);
        });

        setIsFiltersApplied(false);
        setCurrentFilters(currentFilters);
        updateQueryParams(currentFilters);
    }, [currentFilters, updateQueryParams]);

    const getLendings = useCallback(() => {
        return (isSortingChanged || isFiltersApplied) ? modifiedLendings : lendings;
    }, [isSortingChanged, isFiltersApplied, modifiedLendings, lendings]);

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
                setSelectedFilters={onSetSelectedFilters}
                resetFilters={onResetFilters}
                filtersCount={activeFiltersCount}
            />

            <ContentInner dataLoading={loadingLendings}>
                <GotchisLazy
                    items={getLendings()}
                    renderItem={id => (
                        <Gotchi
                            gotchi={getLendings()[id]}
                            render={[
                                {
                                    badges: [
                                        'collateral',
                                        'rs',
                                        'kinship'
                                    ]
                                },
                                'svg',
                                'name',
                                {
                                    flipContainer: [
                                        {
                                            flipBack: [
                                                'traits',
                                                'wearablesLine',
                                                'listing'
                                            ]
                                        },
                                        {
                                            flipFront: ['lendingStats']
                                        }
                                    ]
                                },
                                'flipButton'
                            ]}
                        />
                    )}
                />
            </ContentInner>
        </>
    );
}
