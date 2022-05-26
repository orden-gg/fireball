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
const queryParamsOrder = ['haunt', 'collateral', 'search', 'sort', 'dir'];

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
        setCurrentFilters(currentFiltersCache =>
            filtersUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );

        const { sort, dir } = queryParams;

        if (sort && dir) {
            updateSorting(sort, dir);
        }

        return () => {
            onResetFilters();
            setLendingsSorting({ type: 'totalTokens', dir: 'desc' });
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

    const updateSorting = useCallback((prop, dir) => {
        applySorting(prop, dir);
        setIsSortingChanged(true);
        setLendingsSorting({ type: prop, dir });
    }, [applySorting, setLendingsSorting]);

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
        applySorting(prop, dir);
        setIsSortingChanged(true);
        updateSortQueryParams(prop, dir);
    }, [applySorting, updateSortQueryParams]);

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
                                                'channeling',
                                                'wearablesLine',
                                                'listing'
                                            ]
                                        },
                                        {
                                            flipFront: [
                                                'lendingStats',
                                            ]
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
