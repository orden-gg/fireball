import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ScienceIcon from '@mui/icons-material/Science';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import qs from 'query-string';

import ContentInner from 'components/Content/ContentInner';
import Gotchi from 'components/Gotchi/Gotchi';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import { GotchiIcon } from 'components/Icons/Icons';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import thegraph from 'api/thegraph.api';
import { filtersData } from 'data/filters.data';
import commonUtils from 'utils/commonUtils';
import filtersUtils from 'utils/filtersUtils';

import styles from './styles';

const sortings = [
    {
        name: 'id',
        key: 'id',
        tooltip: 'gotchi id',
        icon: <Grid3x3Icon fontSize='small' />
    },
    {
        name: 'mrs',
        key: 'modifiedRarityScore',
        tooltip: 'rarity score',
        icon: <EmojiEventsOutlinedIcon fontSize='small' />
    },
    {
        name: 'brs',
        key: 'baseRarityScore',
        tooltip: 'base rarity score',
        icon: <FormatListNumberedIcon fontSize='small' />
    },
    {
        name: 'kin',
        key: 'kinship',
        tooltip: 'kinship',
        icon: <FavoriteBorderIcon fontSize='small' />
    },
    {
        name: 'experience',
        key: 'experience',
        tooltip: 'experience',
        icon: <ScienceIcon fontSize='small' />
    },
    {
        name: 'age',
        key: 'createdAt',
        tooltip: 'age',
        icon: <CalendarMonthIcon fontSize='small' />
    }
];

const initialFilters = {
    hauntId: {...filtersData.hauntId, divider: true},
    collateral: {...filtersData.collateral, divider: true},
    search: {...filtersData.search}
};
const queryParamsOrder = ['hauntId', 'collateral', 'search', 'sort', 'dir'];

export default function GhostExplorer() {
    const classes = styles();
    const history = useHistory();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const [isGotchisLoading, setIsGotchisLoading] = useState(false);
    const [gotchis, setGotchis] = useState([]);
    const [modifiedGotchis, setModifiedGotchis] = useState([]);
    const [gotchisSorting, setGotchisSorting] = useState({ type: 'modifiedRarityScore', dir: 'desc' });
    const [currentFilters, setCurrentFilters] = useState({...initialFilters});
    const [isSortingChanged, setIsSortingChanged] = useState(false);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

    const getGotchies = useCallback(() => {
        let mounted = true;

        setIsGotchisLoading(true);

        thegraph.getAllGotchies().then(response => {
            if (mounted) {
                setGotchis(commonUtils.basicSort(response, gotchisSorting.type, gotchisSorting.dir));
            }
        }).catch((e)=> {
            console.log(e);
        }).finally(() => setIsGotchisLoading(false));

        return () => mounted = false;
    }, [gotchisSorting]);

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
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getGotchies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        const activeFilters = Object.entries(currentFilters).filter(([_, filter]) => filter.isFilterActive);

        if (activeFilters.length > 0) {
            const filtersCount = filtersUtils.getActiveFiltersCount(currentFilters);

            setIsFiltersApplied(true);
            setActiveFiltersCount(filtersCount);
        } else {
            setIsFiltersApplied(false);
            setActiveFiltersCount(0);
        }

        updateQueryParams(currentFilters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFilters]);

    useEffect(() => {
        setModifiedGotchis(modifiedGotchisCache => filtersUtils.getFilteredSortedItems({
            items: gotchis,
            itemsCache: modifiedGotchisCache,
            filters: currentFilters,
            isFiltersApplied,
            isFiltersAppliedSetter: setIsFiltersApplied,
            sorting: gotchisSorting,
            isSortingChanged,
            getFilteredItems: filtersUtils.getFilteredItems
        }));
    }, [currentFilters, gotchis, isFiltersApplied, isSortingChanged, gotchisSorting]);

    const applySorting = useCallback((prop, dir) => {
        const itemsToSort = isSortingChanged || isFiltersApplied ? modifiedGotchis : gotchis;
        const sortedItems = commonUtils.basicSort(itemsToSort, prop, dir);

        setModifiedGotchis([...sortedItems]);
    }, [isSortingChanged, isFiltersApplied, gotchis, modifiedGotchis]);

    const updateSorting = useCallback((prop, dir) => {
        applySorting(prop, dir);
        setIsSortingChanged(true);
        setGotchisSorting({ type: prop, dir });
    }, [applySorting, setGotchisSorting]);

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
        sortingDefaults: gotchisSorting,
        setSorting: setGotchisSorting,
        onSortingChanged: onSortingChanged
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

            if (!cacheCopy[key].getIsFilterValidFn(selectedValue, cacheCopy[key])) {
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

    const getGotchis = useCallback(() => {
        return (isSortingChanged || isFiltersApplied) ? modifiedGotchis : gotchis;
    }, [isSortingChanged, isFiltersApplied, modifiedGotchis, gotchis]);

    return (
        <div className={classes.container}>
            <SortFilterPanel
                sorting={sorting}
                itemsLength={getGotchis().length}
                placeholder={
                    <GotchiIcon width={20} height={20} />
                }
                isShowFilters={true}
                filters={currentFilters}
                setSelectedFilters={onSetSelectedFilters}
                resetFilters={onResetFilters}
                filtersCount={activeFiltersCount}
            />

            <ContentInner dataLoading={isGotchisLoading} offset={192}>
                <GotchisLazy
                    items={getGotchis()}
                    renderItem={id => (
                        <Gotchi
                            gotchi={getGotchis()[id]}
                            render = {[
                                {
                                    badges: [
                                        'collateral',
                                        'rs',
                                        'skillpoints',
                                        'kinship',
                                        'level'
                                    ]
                                },
                                'svg',
                                'name',
                                'traits',
                                'wearablesLine',
                                'listing',
                                'rewards'
                            ]}
                        />
                    )}
                />
            </ContentInner>
        </div>
    );
}

