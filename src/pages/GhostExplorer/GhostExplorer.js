import { useCallback, useEffect, useState } from 'react';
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
import filtersUtils from 'utils/filtersUtils';

import styles from './styles';

const sortings = [
    {
        name: 'id',
        key: 'id',
        paramKey: 'id',
        tooltip: 'gotchi id',
        icon: <Grid3x3Icon fontSize='small' />
    },
    {
        name: 'mrs',
        key: 'modifiedRarityScore',
        paramKey: 'mrs',
        tooltip: 'rarity score',
        icon: <EmojiEventsOutlinedIcon fontSize='small' />
    },
    {
        name: 'brs',
        key: 'baseRarityScore',
        paramKey: 'brs',
        tooltip: 'base rarity score',
        icon: <FormatListNumberedIcon fontSize='small' />
    },
    {
        name: 'kin',
        key: 'kinship',
        paramKey: 'kin',
        tooltip: 'kinship',
        icon: <FavoriteBorderIcon fontSize='small' />
    },
    {
        name: 'experience',
        key: 'experience',
        paramKey: 'exp',
        tooltip: 'experience',
        icon: <ScienceIcon fontSize='small' />
    },
    {
        name: 'age',
        key: 'createdAt',
        paramKey: 'age',
        tooltip: 'age',
        icon: <CalendarMonthIcon fontSize='small' />
    }
];

const initialFilters = {
    hauntId: { ...filtersData.hauntId, divider: true },
    collateral: { ...filtersData.collateral, divider: true },
    search: { ...filtersData.search }
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
    const [currentFilters, setCurrentFilters] = useState({ ...initialFilters });
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

    const getGotchies = useCallback(() => {
        let mounted = true;

        setIsGotchisLoading(true);

        thegraph.getAllGotchies().then(response => {
            if (mounted) {
                setGotchis(response, gotchisSorting.type, gotchisSorting.dir);
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
            const key = sortings.find(sorting => sorting.paramKey === sort)?.key;

            onSortingChange(key, dir);
        }

        return () => {
            onResetFilters();
        };
    }, []);

    useEffect(() => {
        getGotchies();
    }, []);


    useEffect(() => {
        filtersUtils.onFiltersUpdate(
            currentFilters,
            filtersUtils.getActiveFiltersCount,
            setActiveFiltersCount,
            updateFilterQueryParams
        );
    }, [currentFilters]);

    useEffect(() => {
        const paramKey = sortings.find(sorting => sorting.key === gotchisSorting.type)?.paramKey;

        updateSortQueryParams(paramKey, gotchisSorting.dir);
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
    };

    const onResetFilters = useCallback(() => {
        filtersUtils.resetFilters(currentFilters, setCurrentFilters);
    }, [currentFilters]);

    const onExportData = useCallback(() => {
        filtersUtils.exportData(modifiedGotchis, 'explorer');
    }, [modifiedGotchis]);

    return (
        <div className={classes.container}>
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

            <ContentInner dataLoading={isGotchisLoading} offset={192}>
                <GotchisLazy
                    items={modifiedGotchis}
                    renderItem={id => (
                        <Gotchi
                            gotchi={modifiedGotchis[id]}
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

