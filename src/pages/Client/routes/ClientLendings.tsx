import { useContext, useCallback, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

import qs from 'query-string';

import { CustomParsedQuery, SortingListItem } from 'shared/models';
import { AlphaTokenIcon, FomoTokenIcon, FudTokenIcon, GotchiIcon, KekTokenIcon } from 'components/Icons/Icons';
import { ContentInner } from 'components/Content/ContentInner';
import { GotchisLazy } from 'components/Lazy/GotchisLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { ClientContext } from 'contexts/ClientContext';
import { filtersData } from 'data/filters.data';
import filtersUtils from 'utils/filtersUtils';

const sortings: SortingListItem[] = [
    {
        name: 'endTime',
        key: 'endTime',
        paramKey: 'endTime',
        tooltip: 'end time',
        icon: <TimerIcon fontSize='small' />
    },
    {
        name: 'income',
        key: 'income',
        paramKey: 'income',
        tooltip: 'alchemica power',
        icon: <LocalFireDepartmentIcon fontSize='small' />
    },
    {
        name: 'total',
        key: 'totalTokens',
        paramKey: 'total',
        tooltip: 'total alchemica',
        icon: <GroupWorkIcon fontSize='small' />
    },
    {
        name: 'fud',
        key: 'fud',
        paramKey: 'fud',
        tooltip: 'fud',
        icon: <FudTokenIcon height={18} width={18} />
    },
    {
        name: 'fomo',
        key: 'fomo',
        paramKey: 'fomo',
        tooltip: 'fomo',
        icon: <FomoTokenIcon height={18} width={18} />
    },
    {
        name: 'alpha',
        key: 'alpha',
        paramKey: 'alpha',
        tooltip: 'alpha',
        icon: <AlphaTokenIcon height={18} width={18} />
    },
    {
        name: 'kek',
        key: 'kek',
        paramKey: 'kek',
        tooltip: 'kek',
        icon: <KekTokenIcon height={18} width={18} />
    }
];

const initialFilters: any = {
    hauntId: { ...filtersData.hauntId, divider: true },
    collateral: { ...filtersData.collateral, divider: true },
    search: { ...filtersData.search }
};
const queryParamsOrder: string[] = ['haunt', 'collateral', 'search', 'sort', 'dir'];

export function ClientLendings() {
    const history = useHistory();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const {
        lendings,
        lendingsSorting,
        setLendingsSorting,
        loadingLendings
    } = useContext<any>(ClientContext);
    const [currentFilters, setCurrentFilters] = useState<any>({ ...initialFilters });
    const [modifiedLendings, setModifiedLendings] = useState<any[]>([]);
    const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

    useEffect(() => {
        setCurrentFilters((currentFiltersCache: any) =>
            filtersUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );

        const { sort, dir } = queryParams as CustomParsedQuery;

        if (sort && dir) {
            const key: any = sortings.find(sorting => sorting.paramKey === sort)?.key;

            onSortingChange(key, dir);
        }

        return () => {
            onResetFilters();
            setLendingsSorting({ type: 'totalTokens', dir: 'desc' });
        };
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
        const paramKey: any = sortings.find(sorting => sorting.key === lendingsSorting.type)?.paramKey;

        updateSortQueryParams(paramKey, lendingsSorting.dir);
    }, [lendingsSorting]);

    useEffect(() => {
        const modifiedLendings = filtersUtils.getFilteredSortedItems({
            items: lendings,
            filters: currentFilters,
            sorting: lendingsSorting,
            getFilteredItems: filtersUtils.getFilteredItems
        });

        setModifiedLendings(modifiedLendings);
    }, [currentFilters, lendings, lendingsSorting]);

    const onSortingChange = useCallback((type: string, dir: string) => {
        setLendingsSorting({ type, dir });
    }, [setLendingsSorting]);

    const sorting: any = {
        sortingList: sortings,
        sortingDefaults: lendingsSorting,
        onSortingChange: onSortingChange
    };

    const updateSortQueryParams = useCallback((prop: string, dir: string) => {
        const params = { ...queryParams, sort: prop, dir };

        filtersUtils.updateQueryParams(history, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, history, location.pathname]);

    const updateFilterQueryParams = useCallback((filters: any) => {
        const params = filtersUtils.getUpdatedQueryParams(queryParams, filters);

        filtersUtils.updateQueryParams(history, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, history, location.pathname]);

    const onSetSelectedFilters = (key: string, selectedValue: any) => {
        filtersUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
    };

    const onResetFilters = useCallback(() => {
        filtersUtils.resetFilters(currentFilters, setCurrentFilters);
    }, [currentFilters]);

    const onExportData = useCallback(() => {
        filtersUtils.exportData(modifiedLendings, 'client_lendings');
    }, [modifiedLendings]);

    return (
        <>
            <SortFilterPanel
                sorting={sorting}
                itemsLength={modifiedLendings.length}
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

            <ContentInner dataLoading={loadingLendings}>
                <GotchisLazy
                    items={modifiedLendings}
                    renderItem={id => (
                        <Gotchi
                            gotchi={modifiedLendings[id]}
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
                                                'lendingStats'
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
