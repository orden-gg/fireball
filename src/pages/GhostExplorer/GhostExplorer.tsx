import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ScienceIcon from '@mui/icons-material/Science';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import qs from 'query-string';

import { CustomParsedQuery, Sorting, SortingListItem } from 'shared/models';
import { ContentInner } from 'components/Content/ContentInner';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { GotchisLazy } from 'components/Lazy/GotchisLazy';
import { GotchiIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { TheGraphApi } from 'api';
import { filtersData } from 'data/filters.data';
import { FilterUtils } from 'utils';

import { styles } from './styles';

const sortings: SortingListItem[] = [
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

const initialFilters: any = {
    hauntId: { ...filtersData.hauntId, divider: true },
    collateral: { ...filtersData.collateral, divider: true },
    search: { ...filtersData.search }
};
const queryParamsOrder: string[] = ['hauntId', 'collateral', 'search', 'sort', 'dir'];

export function GhostExplorer() {
    const classes = styles();

    const history = useHistory();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const [isGotchisLoading, setIsGotchisLoading] = useState<boolean>(false);
    const [gotchis, setGotchis] = useState<any[]>([]);
    const [modifiedGotchis, setModifiedGotchis] = useState<any[]>([]);
    const [gotchisSorting, setGotchisSorting] = useState<Sorting>({ type: 'modifiedRarityScore', dir: 'desc' });
    const [currentFilters, setCurrentFilters] = useState<any>({ ...initialFilters });
    const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

    const getGotchies = useCallback(() => {
        let mounted = true;

        setIsGotchisLoading(true);

        TheGraphApi.getAllGotchies().then(response => {
            if (mounted) {
                setGotchis(response);
            }
        }).catch((e) => {
            console.log(e);
        }).finally(() => setIsGotchisLoading(false));

        return () => mounted = false;
    }, [gotchisSorting]);

    useEffect(() => {
        setCurrentFilters((currentFiltersCache: any) =>
            FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );

        const { sort, dir } = queryParams as CustomParsedQuery;

        if (sort && dir) {
            const key: any = sortings.find(sorting => sorting.paramKey === sort)?.key;

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
        FilterUtils.onFiltersUpdate(
            currentFilters,
            FilterUtils.getActiveFiltersCount,
            setActiveFiltersCount,
            updateFilterQueryParams
        );
    }, [currentFilters]);

    useEffect(() => {
        const paramKey: any = sortings.find(sorting => sorting.key === gotchisSorting.type)?.paramKey;

        updateSortQueryParams(paramKey, gotchisSorting.dir);
    }, [gotchisSorting]);

    useEffect(() => {
        const modifiedGotchis = FilterUtils.getFilteredSortedItems({
            items: gotchis,
            filters: currentFilters,
            sorting: gotchisSorting,
            getFilteredItems: FilterUtils.getFilteredItems
        });

        setModifiedGotchis(modifiedGotchis);
    }, [currentFilters, gotchis, gotchisSorting]);

    const onSortingChange = useCallback((type: string, dir: string) => {
        setGotchisSorting({ type, dir });
    }, [setGotchisSorting]);

    const sorting: any = {
        sortingList: sortings,
        sortingDefaults: gotchisSorting,
        onSortingChange: onSortingChange
    };

    const updateSortQueryParams = useCallback((prop: string, dir: string) => {
        const params = { ...queryParams, sort: prop, dir };

        FilterUtils.updateQueryParams(history, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, history, location.pathname]);

    const updateFilterQueryParams = useCallback((filters: any) => {
        const params = FilterUtils.getUpdatedQueryParams(queryParams, filters);

        FilterUtils.updateQueryParams(history, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, history, location.pathname]);

    const onSetSelectedFilters = (key: string, selectedValue: any) => {
        FilterUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
    };

    const onResetFilters = useCallback(() => {
        FilterUtils.resetFilters(currentFilters, setCurrentFilters);
    }, [currentFilters]);

    const onExportData = useCallback(() => {
        FilterUtils.exportData(modifiedGotchis, 'explorer');
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

            <ContentInner dataLoading={isGotchisLoading} offset={179}>
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

