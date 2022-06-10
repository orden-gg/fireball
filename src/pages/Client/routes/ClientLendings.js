import { useContext, useCallback, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

import qs from 'query-string';

import { AlphaTokenIcon, FomoTokenIcon, FudTokenIcon, GotchiIcon, KekTokenIcon } from 'components/Icons/Icons';
import ContentInner from 'components/Content/ContentInner';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { ClientContext } from 'contexts/ClientContext';
import { filtersData } from 'data/filters.data';
import filtersUtils from 'utils/filtersUtils';

const sortings = [
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

const initialFilters = {
    hauntId: { ...filtersData.hauntId, divider: true },
    collateral: { ...filtersData.collateral, divider: true },
    search: { ...filtersData.search }
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
    const [currentFilters, setCurrentFilters] = useState({ ...initialFilters });
    const [modifiedLendings, setModifiedLendings] = useState([]);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

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
        const paramKey = sortings.find(sorting => sorting.key === lendingsSorting.type)?.paramKey;

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

    const onSortingChange = useCallback((type, dir) => {
        setLendingsSorting({ type, dir });
    }, [setLendingsSorting]);

    const sorting = {
        sortingList: sortings,
        sortingDefaults: lendingsSorting,
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
