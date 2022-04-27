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
import collaterals from 'data/collaterals';
import { FilterComponent, FilterDomainType } from 'data/filterTypes';
import commonUtils from 'utils/commonUtils';

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
    hauntId: {
        key: 'hauntId',
        domainType: FilterDomainType.Equals,
        componentType: FilterComponent.MultipleAutocomplete,
        placeholder: 'HauntId',
        items: [
            {
                title: 'Haunt 1',
                value: '1',
                isSelected: false,
                queryParamValue: '1'
            },
            {
                title: 'Haunt 2',
                value: '2',
                isSelected: false,
                queryParamValue: '2'
            }
        ],
        isFilterActive: false,
        resetFilterFn: (filter) => {
            filter.isFilterActive = false;
            filter.items.forEach(item => item.isSelected = false);
        },
        predicateFn: (filter, compareItem, key) => {
            return filter.items.some(item => item.isSelected && item.value === compareItem[key]);
        },
        updateFromQueryFn: (filter, compareValue, compareKey) => {
            filter.isFilterActive = true;

            filter.items.forEach(item => {
                let filterItem;

                if (typeof compareValue === 'string') {
                    filterItem = compareValue === item[compareKey] ? item : null;
                } else {
                    filterItem = compareValue.find(value => value === item[compareKey]);
                }

                if (Boolean(filterItem)) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
            });
        },
        updateFromFilterFn: (filter, selectedValue) => {
            filter.isFilterActive = true;

            filter.items.forEach(item => {
                const filterItem = selectedValue.find(
                    selectedValue => selectedValue.value === item.value
                );

                if (Boolean(filterItem)) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
            });
        },
        getQueryParamsFn: (filter) => {
            return filter.items
                .filter(item => item.isSelected)
                .map(selectedValue => selectedValue.queryParamValue);
        }
    },
    collateral: {
        key: 'collateral',
        domainType: FilterDomainType.Equals,
        componentType: FilterComponent.MultipleAutocomplete,
        placeholder: 'Collateral',
        items: collaterals.map(collateral => ({
            title: collateral.name,
            value: collateral.address,
            isSelected: false,
            queryParamValue: collateral.name.toLowerCase()
        })),
        isFilterActive: false,
        resetFilterFn: (filter) => {
            filter.isFilterActive = false;
            filter.items.forEach(item => item.isSelected = false);
        },
        predicateFn: (filter, compareItem, key) => {
            return filter.items.some(item => item.isSelected && item.value === compareItem[key]);
        },
        updateFromQueryFn: (filter, compareValue, compareKey) => {
            filter.isFilterActive = true;

            filter.items.forEach(item => {
                let filterItem;

                if (typeof compareValue === 'string') {
                    filterItem = compareValue === item[compareKey] ? item : null;
                } else {
                    filterItem = compareValue.find(value => value === item[compareKey]);
                }

                if (Boolean(filterItem)) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
            });
        },
        updateFromFilterFn: (filter, selectedValue) => {
            filter.isFilterActive = true;

            filter.items.forEach(item => {
                const filterItem = selectedValue.find(
                    selectedValue => selectedValue.value === item.value
                );

                if (Boolean(filterItem)) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
            });
        },
        getQueryParamsFn: (filter) => {
            return filter.items
                .filter(item => item.isSelected)
                .map(selectedValue => selectedValue.queryParamValue);
        }
    },
    search: {
        key: 'search',
        isMultipleKeys: true,
        keys: ['id', 'name'],
        domainType: FilterDomainType.Contains,
        componentType: FilterComponent.Input,
        placeholder: 'Name&Id',
        value: '',
        isFilterActive: false,
        resetFilterFn: (filter) => {
            filter.isFilterActive = false;
            filter.value = '';
        },
        predicateFn: (filter, compareItem) => {
            return filter.keys.some(key => compareItem[key].toLowerCase().includes(filter.value.toLowerCase()));
        },
        updateFromQueryFn: (filter, compareValue) => {
            filter.isFilterActive = true;

            filter.value = compareValue;
        },
        updateFromFilterFn: (filter, selectedValue) => {
            filter.isFilterActive = true;

            filter.value = selectedValue;
        },
        getQueryParamsFn: (filter) => {
            return filter.value;
        }
    }
};

export default function ClientLendings() {
    const history = useHistory();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const {
        lendings,
        setLendings,
        lendingsSorting,
        setLendingsSorting,
        loadingLendings
    } = useContext(ClientContext);
    const [currentFilters, setCurrentFilters] = useState({...initialFilters});
    const [sortedFilteredLendings, setSortedFilteredLendings] = useState([]);
    const [isSortingChanged, setIsSortingChanged] = useState(false);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);

    useEffect(() => {
        const queryParamsCopy = {...queryParams};
        delete queryParamsCopy.address;
        const currentFiltersCopy = {...currentFilters};

        Object.entries(currentFiltersCopy).forEach(([currentKey, currentFilter]) => {
            if (Boolean(queryParamsCopy[currentKey])) {
                currentFilter.updateFromQueryFn(currentFilter, queryParamsCopy[currentKey], 'queryParamValue');
            }
        });

        setCurrentFilters(currentFilters);
    }, [currentFilters, queryParams, location.search]);

    useEffect(() => {
        const activeFilters = Object.entries(currentFilters)
            .filter(([currentKey, currentFilter]) => currentFilter.isFilterActive);

        if (activeFilters.length > 0) {
            const filteredLendings = lendings.filter(lending =>
                Object.entries(currentFilters).every(([key, filter]) =>
                    filter.isFilterActive ? filter.predicateFn(filter, lending, key) : true
                )
            );

            setIsFiltersApplied(true);
            setSortedFilteredLendings(filteredLendings);
        } else {
            setSortedFilteredLendings([...lendings]);
        }
    }, [currentFilters, lendings]);

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
        setItems: setLendings,
        sortingList: sortings,
        sortingDefaults: lendingsSorting,
        setSorting: setLendingsSorting,
        onSortingChanged: onSortingChanged
    };

    const getUpdatedFilters = useCallback(selectedFilters => {
        const currentFiltersCopy = {...currentFilters};

        if (Object.keys(selectedFilters).length === 0) {
            Object.entries(currentFiltersCopy).forEach(([key, currentFilter]) => {
                currentFilter.resetFilterFn(currentFilter);
            });
        } else {
            Object.entries(currentFiltersCopy).forEach(([currentKey, currentFilter]) => {
                if (Boolean(selectedFilters[currentKey])) {
                    currentFilter.updateFromFilterFn(currentFilter, selectedFilters[currentKey].selectedValue);
                } else {
                    currentFilter.resetFilterFn(currentFilter);
                }
            });
        }

        return currentFiltersCopy;
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
                sorting={{...sorting, items: getLendings() }}
                itemsLength={getLendings().length}
                placeholder={
                    <GotchiIcon width={20} height={20} />
                }
                filters={currentFilters}
                applyFilters={onApplyFilters}
                resetFilters={onResetFilters}
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
