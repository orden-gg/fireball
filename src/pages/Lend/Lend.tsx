import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, ToggleButton } from '@mui/material';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CopyrightIcon from '@mui/icons-material/Copyright';
import PercentIcon from '@mui/icons-material/Percent';

import classNames from 'classnames';
import qs from 'query-string';

import { CustomParsedQuery, Sorting, SortingListItem } from 'shared/models';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ContentInner } from 'components/Content/ContentInner';
import { GotchiIcon } from 'components/Icons/Icons';
import { GotchisLazy } from 'components/Lazy/GotchisLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { EthersApi, TheGraphApi } from 'api';
import { CommonUtils, FilterUtils, GotchiverseUtils } from 'utils';
import { filtersData } from 'data/filters.data';

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
        name: 'kin',
        key: 'kinship',
        paramKey: 'kinship',
        tooltip: 'kinship',
        icon: <FavoriteBorderIcon fontSize='small' />
    },
    {
        name: 'time',
        key: 'timeCreated',
        paramKey: 'created',
        tooltip: 'time created',
        icon: <FormatListNumberedIcon fontSize='small' />
    },
    {
        name: 'upfront cost',
        key: 'upfrontCost',
        paramKey: 'cost',
        tooltip: 'upfront cost',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'period',
        key: 'period',
        paramKey: 'period',
        tooltip: 'rental period',
        icon: <AccessTimeIcon fontSize='small' />
    },
    {
        name: 'owner revenue',
        key: 'splitOwner',
        paramKey: 'owner',
        tooltip: 'owner revenue',
        icon: <CopyrightIcon fontSize='small' />
    },
    {
        name: 'borrower revenue',
        key: 'splitBorrower',
        paramKey: 'borrower',
        tooltip: 'borrower revenue',
        icon: <PercentIcon fontSize='small' />
    }
];

const initialFilters: any = {
    guild: { ...filtersData.guild },
    whitelistId: { ...filtersData.whitelistId, divider: true },
    period: { ...filtersData.period },
    splitBorrower: { ...filtersData.splitBorrower },
    upfrontCost: { ...filtersData.upfrontCost }
};
const queryParamsOrder: string[] = ['guild', 'whitelistId', 'period', 'borrower', 'upfront', 'sort', 'dir'];

export function Lend() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const [modifiedLendings, setModifiedLendings] = useState<any[]>([]);
    const [lendings, setLendings] = useState<any[]>([]);
    const [dataLoading, setDataLoading] = useState<boolean>(true);
    const [linksListView, setLinksListView] = useState<boolean>(false);
    const [lendingsSorting, setLendingsSorting] = useState<Sorting>({ type: 'timeCreated', dir: 'desc' });
    const [currentFilters, setCurrentFilters] = useState<any>({ ...initialFilters });

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
        let mounted = true;

        setDataLoading(true);

        TheGraphApi.getLendings().then(response => {
            if (mounted) {
                const whitelistData: any[] = [];
                const mappedData: any[] = [];

                response.forEach((listing: any) => {
                    if (listing.whitelistId) {
                        whitelistData.push(listing.whitelistId);
                    }

                    mappedData.push({
                        ...listing,
                        guild: GotchiverseUtils.gedAddressGuild(listing.lender)
                    });
                });

                const sortedWhitelist: any[] = CommonUtils.sortByDirection([...new Set(whitelistData)], 'asc');
                const upfronCostValues: number[] = mappedData.map((item: any) => EthersApi.fromWei(item.upfrontCost));
                const maxUpfrontCost: number = Math.max(...upfronCostValues);

                setCurrentFilters((currentFiltersCache: any) => {
                    const currentFiltersCacheCopy = { ...currentFiltersCache };

                    currentFiltersCacheCopy.whitelistId = {
                        ...currentFiltersCacheCopy.whitelistId,
                        items: sortedWhitelist.map(whitelist => ({
                            title: whitelist,
                            value: whitelist,
                            queryParamValue: whitelist,
                            isSelected: false
                        }))
                    };

                    currentFiltersCacheCopy.upfrontCost = {
                        ...currentFiltersCacheCopy.upfrontCost,
                        max: maxUpfrontCost,
                        value: [currentFiltersCacheCopy.upfrontCost.min, maxUpfrontCost]
                    };

                    let filtersToReturn: any;

                    if (Object.keys(queryParams).length > 0) {
                        filtersToReturn = FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCacheCopy);
                    } else {
                        filtersToReturn = currentFiltersCacheCopy;
                    }

                    return filtersToReturn;
                });
                setLendings(mappedData);
                setDataLoading(false);
            }
        });

        return () => { mounted = false };
    }, []);

    useEffect(() => {
        updateFilterQueryParams(currentFilters);
    }, [currentFilters]);

    useEffect(() => {
        const paramKey: any = sortings.find(sorting => sorting.key === lendingsSorting.type)?.paramKey;

        updateSortQueryParams(paramKey, lendingsSorting.dir);
    }, [lendingsSorting]);

    useEffect(() => {
        const modifiedLendings = FilterUtils.getFilteredSortedItems({
            items: lendings,
            filters: currentFilters,
            sorting: lendingsSorting,
            getFilteredItems: FilterUtils.getFilteredItems
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

        FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, navigate, location.pathname]);

    const updateFilterQueryParams = useCallback((filters: any) => {
        const params = FilterUtils.getUpdatedQueryParams(queryParams, filters);

        FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, navigate, location.pathname]);

    const onSetSelectedFilters = (key: string, selectedValue: any) => {
        FilterUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
    };

    const onResetFilters = useCallback(() => {
        FilterUtils.resetFilters(currentFilters, setCurrentFilters);
    }, [currentFilters]);

    const onExportData = useCallback(() => {
        FilterUtils.exportData(modifiedLendings, 'lend');
    }, [modifiedLendings]);

    return (
        <ContentWrapper>
            <>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={currentFilters}
                    onSetSelectedFilters={onSetSelectedFilters}
                />

                <div className={classes.buttonsWrapper}>
                    <Button
                        variant='contained'
                        color='warning'
                        size='small'
                        onClick={onResetFilters}
                    >
                        Reset
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='small'
                        onClick={onExportData}
                    >
                        Export data (.json)
                    </Button>
                </div>
            </>

            <>
                <SortFilterPanel
                    sorting={sorting}
                    itemsLength={modifiedLendings.length}
                    placeholder={
                        <GotchiIcon width={20} height={20} />
                    }
                />

                <ToggleButton
                    value='check'
                    selected={linksListView}
                    onChange={() => {
                        setLinksListView(!linksListView);
                    }}
                    style={{ position: 'absolute', top: 0, right: 0, width: 36, padding: '6px 0', color: 'transparent', border: 'none' }}
                >
                    List
                </ToggleButton>

                <ContentInner dataLoading={dataLoading}>
                    {/* // !temporary code (hidden feature) */}
                    { linksListView ? (
                        <ol style={{ height: 'calc(100vh - 208px)', overflowY: 'scroll', margin: 0, padding: '10px 0 10px 60px' }}>
                            {modifiedLendings.map(lend => {
                                return <li key={lend.lendingId}>https://app.aavegotchi.com/lending/{lend.lendingId}</li>;
                            })}
                        </ol>
                    ) : (
                        <GotchisLazy
                            items={modifiedLendings}
                            renderItem={id => (
                                <Gotchi
                                    gotchi={modifiedLendings[id]}
                                    render={[
                                        {
                                            badges: [
                                                'rs',
                                                'kinship'
                                            ]
                                        },
                                        'svg',
                                        'name',
                                        'lending',
                                        'channeling'
                                    ]}
                                />
                            )}
                        />
                    )}
                </ContentInner>
            </>
        </ContentWrapper>
    );
}
