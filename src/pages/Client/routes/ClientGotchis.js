import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import Gotchi from 'components/Gotchi/Gotchi';
import { GotchiIcon } from 'components/Icons/Icons';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import { ClientContext } from 'contexts/ClientContext';
import { filtersData } from 'data/filters.data';
import commonUtils from 'utils/commonUtils';
import filtersUtils from 'utils/filtersUtils';

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

export default function ClientGotchis() {
    const history = useHistory();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const {
        gotchis,
        gotchisSorting,
        setGotchisSorting,
        loadingGotchis
    } = useContext(ClientContext);
    const [currentFilters, setCurrentFilters] = useState({...initialFilters});
    const [modifiedGotchis, setModifiedGotchis] = useState([]);
    const [isSortingChanged, setIsSortingChanged] = useState(false);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

    useEffect(() => {
        return () => onResetFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        filtersUtils.updateFiltersFromQueryParams(queryParams, currentFilters)

        const filtersCount = filtersUtils.getActiveFiltersCount(currentFilters);

        setActiveFiltersCount(filtersCount);
        setCurrentFilters(currentFilters);
    }, [currentFilters, queryParams]);

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
        const params = filtersUtils.getUpdatedQueryParams(queryParams, filters);

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
        <>
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

            <ContentInner dataLoading={loadingGotchis}>
                <GotchisLazy
                    items={getGotchis()}
                    renderItem={id => (
                        <Gotchi
                            gotchi={getGotchis()[id]}
                            render={[
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
        </>
    );
}
