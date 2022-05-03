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
    hauntId: {...filtersData.hauntId},
    collateral: {...filtersData.collateral},
    search: {...filtersData.search}
};

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
        getGotchies();

        return () => {
            onResetFilters();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        filtersUtils.updateFiltersFromQueryParams(queryParams, currentFilters)

        const filtersCount = filtersUtils.getActiveFiltersCount(currentFilters);

        setActiveFiltersCount(filtersCount);
        setCurrentFilters(currentFilters);
    }, [currentFilters, queryParams]);

    useEffect(() => {
        setModifiedGotchis(modifiedGotchisCache => {
            const activeFilters = Object.entries(currentFilters)
                .filter(([currentKey, currentFilter]) => currentFilter.isFilterActive);
            let modifiedGotchis;

            if (activeFilters.length > 0) {
                if (isSortingChanged && !isFiltersApplied) {
                    modifiedGotchis = filtersUtils.getModifiedItems(currentFilters, modifiedGotchisCache);
                } else if (isSortingChanged && isFiltersApplied) {
                    modifiedGotchis = filtersUtils.getModifiedItems(currentFilters, gotchis);
                    modifiedGotchis = commonUtils.basicSort(modifiedGotchis, gotchisSorting.type, gotchisSorting.dir);
                } else {
                    modifiedGotchis = filtersUtils.getModifiedItems(currentFilters, gotchis);
                }

                setIsFiltersApplied(true);
            } else {
                if (isSortingChanged) {
                    modifiedGotchis = commonUtils.basicSort(gotchis, gotchisSorting.type, gotchisSorting.dir);
                } else {
                    modifiedGotchis = gotchis;
                }
            }

            return modifiedGotchis;
        });
    }, [currentFilters, gotchis, isFiltersApplied, isSortingChanged, gotchisSorting]);

    const applySorting = useCallback((prop, dir) => {
        const itemsToSort = isSortingChanged || isFiltersApplied ? modifiedGotchis : gotchis;
        const sortedItems = commonUtils.basicSort(itemsToSort, prop, dir);

        setModifiedGotchis([...sortedItems]);
    }, [isSortingChanged, isFiltersApplied, gotchis, modifiedGotchis]);

    const onSortingChanged = useCallback((prop, dir) => {
        applySorting(prop, dir);
        setIsSortingChanged(true);
    }, [applySorting]);

    const sorting = {
        sortingList: sortings,
        sortingDefaults: gotchisSorting,
        setSorting: setGotchisSorting,
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

    const getGotchis = useCallback(() => {
        return (isSortingChanged || isFiltersApplied) ? modifiedGotchis: gotchis;
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
                applyFilters={onApplyFilters}
                resetFilters={onResetFilters}
                filtersCount={activeFiltersCount}
            />

            <ContentInner dataLoading={isGotchisLoading}>
                <GotchisLazy
                    items={getGotchis()}
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
            </ContentInner>
        </div>
    );
}

