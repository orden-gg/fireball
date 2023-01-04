import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeightIcon from '@mui/icons-material/Height';
import HouseIcon from '@mui/icons-material/House';
import TimerIcon from '@mui/icons-material/Timer';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import qs from 'query-string';

import { useAppSelector } from 'core/store/hooks';
import { getRealmAlchemicaDictionary } from 'core/store/realm-alchemica';
import { CustomParsedQuery, SortingListItem } from 'shared/models';
import { AlphaIcon, FomoIcon, FudIcon, KekIcon } from 'components/Icons/Icons';
import { ContentInner } from 'components/Content/ContentInner';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Parcel } from 'components/Items/Parcel/Parcel';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { ClientContext } from 'contexts/ClientContext';
import { FilterUtils } from 'utils';
import { filtersData } from 'data/filters.data';

const sortings: SortingListItem[] = [
    {
        name: 'size',
        key: 'size',
        paramKey: 'size',
        tooltip: 'size',
        icon: <HeightIcon fontSize="small" />
    },
    {
        name: 'district',
        key: 'district',
        paramKey: 'district',
        tooltip: 'district',
        icon: <HouseIcon fontSize="small" />
    },
    {
        name: 'nextChannel',
        key: 'nextChannel',
        paramKey: 'nextChannel',
        tooltip: 'next channel',
        icon: <TimerIcon fontSize="small" />
    },
    {
        name: 'altarLevel',
        key: 'altarLevel',
        paramKey: 'altar',
        tooltip: 'altar level',
        icon: <AutoGraphIcon fontSize="small" />
    },
    {
        name: 'fudBoost',
        key: 'fudBoost',
        paramKey: 'fud',
        tooltip: 'fud boost',
        icon: <FudIcon height={18} width={18} />
    },
    {
        name: 'fomoBoost',
        key: 'fomoBoost',
        paramKey: 'fomo',
        tooltip: 'fomo boost',
        icon: <FomoIcon height={18} width={18} />
    },
    {
        name: 'alphaBoost',
        key: 'alphaBoost',
        paramKey: 'alpha',
        tooltip: 'alpha boost',
        icon: <AlphaIcon height={18} width={18} />
    },
    {
        name: 'kekBoost',
        key: 'kekBoost',
        paramKey: 'kek',
        tooltip: 'kek boost',
        icon: <KekIcon height={18} width={18} />
    }
];
const initialFilters: any = {
    size: { ...filtersData.size, divider: true },
    altarLevel: { ...filtersData.altarLevel, divider: true },
    nextChannel: { ...filtersData.nextChannel },
    isUpgradeReady: { ...filtersData.isUpgradeReady, divider: true, class: 'no-padding-top' },
    district: { ...filtersData.district }
};
const queryParamsOrder: string[] = [
    initialFilters.size.queryParamKey,
    initialFilters.altarLevel.queryParamKey,
    initialFilters.nextChannel.queryParamKey,
    initialFilters.isUpgradeReady.queryParamKey,
    initialFilters.district.queryParamKey,
    'sort',
    'dir'
];

export function ClientRealmList() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const realmAlchemicaDictionary = useAppSelector(getRealmAlchemicaDictionary);

    const { realm, realmSorting, setRealmSorting, loadingRealm, setRealmView } = useContext<any>(ClientContext);
    const [currentFilters, setCurrentFilters] = useState<any>({ ...initialFilters });
    const [modifiedRealm, setModifiedRealm] = useState<any[]>([]);
    const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

    useEffect(() => {
        setRealmView('list');
    }, []);

    useEffect(() => {
        setCurrentFilters((currentFiltersCache: any) =>
            FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );

        const { sort, dir } = queryParams as CustomParsedQuery;

        if (sort && dir) {
            const key: any = sortings.find((sorting) => sorting.paramKey === sort)?.key;

            onSortingChange(key, dir);
        }

        return () => {
            onResetFilters();
        };
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
        const paramKey: any = sortings.find((sorting) => sorting.key === realmSorting.type)?.paramKey;

        updateSortQueryParams(paramKey, realmSorting.dir);
    }, [realmSorting]);

    useEffect(() => {
        const modifiedRealm = FilterUtils.getFilteredSortedItems({
            items: realm,
            filters: currentFilters,
            sorting: realmSorting,
            getFilteredItems: FilterUtils.getFilteredItems
        });

        setModifiedRealm(modifiedRealm);
    }, [currentFilters, realm, realmSorting]);

    const onSortingChange = useCallback(
        (type: string, dir: string) => {
            setRealmSorting({ type, dir });
        },
        [setRealmSorting]
    );

    const sorting: any = {
        sortingList: sortings,
        sortingDefaults: realmSorting,
        onSortingChange: onSortingChange
    };

    const updateSortQueryParams = useCallback(
        (prop: string, dir: string) => {
            const params = { ...queryParams, sort: prop, dir };

            FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, queryParamsOrder);
        },
        [queryParams, navigate, location.pathname]
    );

    const updateFilterQueryParams = useCallback(
        (filters: any) => {
            const params: any = FilterUtils.getUpdatedQueryParams(queryParams, filters);

            FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, queryParamsOrder);
        },
        [queryParams, navigate, location.pathname]
    );

    const onSetSelectedFilters = (key: string, selectedValue: any) => {
        FilterUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
    };

    const onResetFilters = useCallback(() => {
        FilterUtils.resetFilters(currentFilters, setCurrentFilters);
    }, [currentFilters]);

    const onExportData = useCallback(() => {
        FilterUtils.exportData(modifiedRealm, 'client_realm');
    }, [modifiedRealm]);

    return (
        <>
            <SortFilterPanel
                sorting={sorting}
                itemsLength={modifiedRealm.length}
                placeholder={<KekIcon width={20} height={20} />}
                filters={initialFilters}
                isShowFilters={true}
                setSelectedFilters={onSetSelectedFilters}
                resetFilters={onResetFilters}
                exportData={onExportData}
                filtersCount={activeFiltersCount}
            />

            <ContentInner dataLoading={loadingRealm}>
                <ItemsLazy
                    items={modifiedRealm}
                    component={(props) => <Parcel parcel={props} alchemica={realmAlchemicaDictionary[props.tokenId]} />}
                />
            </ContentInner>
        </>
    );
}
