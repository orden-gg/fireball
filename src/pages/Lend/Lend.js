import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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

import ContentWrapper from 'components/Content/ContentWrapper';
import ContentInner from 'components/Content/ContentInner';
import { GotchiIcon } from 'components/Icons/Icons';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import Filters from 'components/Filters/components/Filters/Filters';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import Gotchi from 'components/Gotchi/Gotchi';
import ethersApi from 'api/ethers.api';
import thegraphApi from 'api/thegraph.api';
import commonUtils from 'utils/commonUtils';
import filtersUtils from 'utils/filtersUtils';
import gotchiverseUtils from 'utils/gotchiverseUtils';
import { filtersData } from 'data/filters.data';

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
        name: 'kin',
        key: 'kinship',
        tooltip: 'kinship',
        icon: <FavoriteBorderIcon fontSize='small' />
    },
    {
        name: 'time',
        key: 'timeCreated',
        tooltip: 'time created',
        icon: <FormatListNumberedIcon fontSize='small' />
    },
    {
        name: 'upfront cost',
        key: 'upfrontCost',
        tooltip: 'upfront cost',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'period',
        key: 'period',
        tooltip: 'rental period',
        icon: <AccessTimeIcon fontSize='small' />
    },
    {
        name: 'owner revenue',
        key: 'splitOwner',
        tooltip: 'owner revenue',
        icon: <CopyrightIcon fontSize='small' />
    },
    {
        name: 'borrower revenue',
        key: 'splitBorrower',
        tooltip: 'borrower revenue',
        icon: <PercentIcon fontSize='small' />
    }
];

const initialFilters = {
    guild: {...filtersData.guild},
    whitelistId: {...filtersData.whitelistId, divider: true},
    period: {...filtersData.period},
    splitBorrower: {...filtersData.splitBorrower},
    upfrontCost: {...filtersData.upfrontCost}
};
const queryParamsOrder = ['guild', 'whitelistId', 'period', 'borrower', 'upfront', 'sort', 'dir'];

export default function Lend() {
    const classes = styles();

    const history = useHistory();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const [modifiedLendings, setModifiedLendings] = useState([]);
    const [lendings, setLendings] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [linksListView, setLinksListView] = useState(false);
    const [lendingsSorting, setLendingsSorting] = useState({ type: 'timeCreated', dir: 'desc' });
    const [currentFilters, setCurrentFilters] = useState({...initialFilters});
    const [isSortingChanged, setIsSortingChanged] = useState(false);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);

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
        let mounted = true;

        setDataLoading(true);

        thegraphApi.getLendings().then(response => {
            if (mounted) {
                const whitelistData = [];
                const mappedData = [];
                const { type, dir } = lendingsSorting;

                response.forEach(listing => {
                    if (listing.whitelistId) {
                        whitelistData.push(listing.whitelistId);
                    }

                    mappedData.push({
                        ...listing,
                        guild: gotchiverseUtils.gedAddressGuild(listing.lender)
                    })
                });

                const sorted = commonUtils.basicSort(mappedData, type, dir);
                const sortedWhitelist = commonUtils.sortByDirection([...new Set(whitelistData)], 'asc');
                const upfronCostValues = sorted.map(item => ethersApi.fromWei(item.upfrontCost));
                const maxUpfrontCost = Math.max(...upfronCostValues);

                setCurrentFilters(currentFiltersCache => {
                    const currentFiltersCacheCopy = {...currentFiltersCache};

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
                    }

                    let filtersToReturn;

                    if (Object.keys(queryParams).length > 0) {
                        filtersToReturn = filtersUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCacheCopy);
                    } else {
                        filtersToReturn = currentFiltersCacheCopy;
                    }

                    return filtersToReturn;
                });
                setModifiedLendings(sorted);
                setLendings(sorted);
                setDataLoading(false);
            }
        });

        return () => mounted = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const activeFilters = Object.entries(currentFilters).filter(([_, filter]) => filter.isFilterActive);

        if (activeFilters.length > 0) {
            setIsFiltersApplied(true);
        } else {
            setIsFiltersApplied(false);
        }

        updateQueryParams(currentFilters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFilters]);

    useEffect(() => {
        setModifiedLendings(modifiedLendingsCache => filtersUtils.getFilteredSortedItems({
            items: lendings,
            itemsCache: modifiedLendingsCache,
            filters: currentFilters,
            isFiltersApplied,
            isFiltersAppliedSetter: setIsFiltersApplied,
            sorting: lendingsSorting,
            isSortingChanged,
            getFilteredItems: filtersUtils.getFilteredItems
        }));
    }, [currentFilters, lendings, isFiltersApplied, isSortingChanged, lendingsSorting]);

    const applySorting = useCallback((prop, dir) => {
        const itemsToSort = isSortingChanged || isFiltersApplied ? modifiedLendings : lendings;
        const sortedItems = commonUtils.basicSort(itemsToSort, prop, dir);

        setModifiedLendings([...sortedItems])
    }, [isSortingChanged, isFiltersApplied, lendings, modifiedLendings]);

    const updateSorting = useCallback((prop, dir) => {
        applySorting(prop, dir);
        setIsSortingChanged(true);
        setLendingsSorting({ type: prop, dir });
    }, [applySorting, setLendingsSorting]);

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
        sortingDefaults: lendingsSorting,
        setSorting: setLendingsSorting,
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

    const onExportData = useCallback(() => {
        filtersUtils.exportData(modifiedLendings, 'lend');
    }, [modifiedLendings]);

    const getLendings = useCallback(() => {
        return (isSortingChanged || isFiltersApplied) ? modifiedLendings : lendings;
    }, [isSortingChanged, isFiltersApplied, modifiedLendings, lendings]);

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
                    itemsLength={getLendings().length}
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
                            {getLendings().map(lend => {
                                return <li>https://app.aavegotchi.com/lending/{lend.lendingId}</li>
                            })}
                        </ol>
                    ) : (
                        <GotchisLazy
                            items={getLendings()}
                            renderItem={id => (
                                <Gotchi
                                    gotchi={getLendings()[id]}
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
