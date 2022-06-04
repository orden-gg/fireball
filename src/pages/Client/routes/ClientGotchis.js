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
    hauntId: {...filtersData.hauntId, divider: true},
    collateral: {...filtersData.collateral, divider: true},
    search: {...filtersData.search}
};
const queryParamsOrder = ['haunt', 'collateral', 'search', 'sort', 'dir'];

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
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

    useEffect(() => {
        setCurrentFilters(currentFiltersCache =>
            filtersUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );

        const { sort, dir } = queryParams;

        if (sort && dir) {
            onSortingChange(sort, dir);
        }

        return () => {
            onResetFilters();
            setGotchisSorting({ type: 'modifiedRarityScore', dir: 'desc' });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        filtersUtils.onFiltersUpdate(
            currentFilters,
            filtersUtils.getActiveFiltersCount,
            setActiveFiltersCount,
            updateFilterQueryParams
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFilters]);

    useEffect(() => {
        updateSortQueryParams(gotchisSorting.type, gotchisSorting.dir);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gotchisSorting]);

    useEffect(() => {
        const modifiedGotchis = filtersUtils.getFilteredSortedItems({
            items: gotchis,
            filters: currentFilters,
            sorting: gotchisSorting,
            getFilteredItems: filtersUtils.getFilteredItems
        });

        setModifiedGotchis(modifiedGotchis);
    }, [currentFilters, gotchis, gotchisSorting]);

    const onSortingChange = useCallback((type, dir) => {
        setGotchisSorting({ type, dir });
    }, [setGotchisSorting]);

    const sorting = {
        sortingList: sortings,
        sortingDefaults: gotchisSorting,
        onSortingChange: onSortingChange
    };

    const updateSortQueryParams = useCallback((prop, dir) => {
        const params = { ...queryParams, sort: prop, dir };

        filtersUtils.updateQueryParams(history, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, history, location.pathname]);

    const updateFilterQueryParams = useCallback(filters => {
        const params = filtersUtils.getUpdatedQueryParams(queryParams, filters);

        filtersUtils.updateQueryParams(history, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, history, location.pathname]);

    const onSetSelectedFilters = (key, selectedValue) => {
        filtersUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
    }

    const onResetFilters = useCallback(() => {
        filtersUtils.resetFilters(currentFilters, setCurrentFilters);
    }, [currentFilters]);

    const onExportData = useCallback(() => {
        filtersUtils.exportData(modifiedGotchis, 'client_gotchis');
    }, [modifiedGotchis]);

    return (
        <>
            <SortFilterPanel
                sorting={sorting}
                itemsLength={modifiedGotchis.length}
                placeholder={
                    <GotchiIcon width={20} height={20} />
                }
                isShowFilters={true}
                filters={currentFilters}
                setSelectedFilters={onSetSelectedFilters}
                resetFilters={onResetFilters}
                exportData={onExportData}
                filtersCount={activeFiltersCount}
            />

            <ContentInner dataLoading={loadingGotchis}>
                <GotchisLazy
                    items={modifiedGotchis}
                    renderItem={id => (
                        <Gotchi
                            gotchi={modifiedGotchis[id]}
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
                                'channeling',
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
