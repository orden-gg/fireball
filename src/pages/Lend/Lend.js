import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CopyrightIcon from '@mui/icons-material/Copyright';
import PercentIcon from '@mui/icons-material/Percent';
import { Alert, AlertTitle, Link, ToggleButton } from '@mui/material';

import qs from 'query-string';

import ContentWrapper from 'components/Content/ContentWrapper';
import ContentInner from 'components/Content/ContentInner';
import { GotchiIcon } from 'components/Icons/Icons';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import Filters from 'components/Filters/components/Filters/Filters';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import Gotchi from 'components/Gotchi/Gotchi';
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
    guild: {...filtersData.guild}
};

export default function Lend() {
    const classes = styles();

    const history = useHistory();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const [modifiedLendings, setModifiedLendings] = useState([]);
    const [lendings, setLendings] = useState([]);
    const [whitelist, setWhitelist] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [linksListView, setLinksListView] = useState(false);
    const [lendingsSorting, setLendingsSorting] = useState({ type: 'timeCreated', dir: 'desc' });
    const [currentFilters, setCurrentFilters] = useState({...initialFilters});
    const [selectedFilters, setSelectedFilters] = useState({});
    const [isSortingChanged, setIsSortingChanged] = useState(false);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);

    useEffect(() => {
        return () => onResetFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let mounted = true;

        setDataLoading(true);

        thegraphApi.getLendings().then((response) => {
            if (mounted) {
                const whitelistData = [];
                const mappedData = [];
                const { type, dir } = lendingsSorting;

                response.forEach((listing) => {
                    if (listing.whitelistId) {
                        const index = whitelistData.findIndex(savedId => savedId === listing.whitelistId);

                        if (index === -1) {
                            whitelistData.push(listing.whitelistId);
                        }
                    }

                    mappedData.push({
                        ...listing,
                        guild: gotchiverseUtils.gedAddressGuild(listing.lender)
                    })
                });

                const sorted = commonUtils.basicSort(mappedData, type, dir);

                setWhitelist(commonUtils.sortByDirection(whitelistData, 'asc'));
                setModifiedLendings(sorted);
                setLendings(sorted);
                setDataLoading(false);
            }
        });

        return () => mounted = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setCurrentFilters(currentFiltersCache =>
            filtersUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );
    }, [queryParams]);

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

    const onSortingChanged = useCallback((prop, dir) => {
        applySorting(prop, dir);
        setIsSortingChanged(true);
    }, [applySorting]);

    const sorting = {
        sortingList: sortings,
        sortingDefaults: lendingsSorting,
        setSorting: setLendingsSorting,
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

    const onSetSelectedFilters = (key, filtersObj) => {
        setSelectedFilters(selectedFiltersCache => {
            selectedFiltersCache[key] = filtersObj;

            if (!Boolean(filtersObj.selectedValue.length)) {
                delete selectedFiltersCache[key];
            }

            return {...selectedFiltersCache};
        });

        onApplyFilters();
    }

    const onApplyFilters = useCallback(() => {
        if (Object.keys(selectedFilters).length > 0) {
            setIsFiltersApplied(true);
        }

        const updatedCurrentFilters = getUpdatedFilters(selectedFilters);
        setCurrentFilters(updatedCurrentFilters);
        updateQueryParams(updatedCurrentFilters);
    }, [selectedFilters, updateQueryParams, getUpdatedFilters]);

    const onResetFilters = useCallback(() => {
        Object.entries(currentFilters).forEach(([key, filter]) => {
            filter.resetFilterFn(filter);
        });

        setSelectedFilters({});
        setIsFiltersApplied(false);
        setCurrentFilters(currentFilters);
        updateQueryParams(currentFilters);
    }, [currentFilters, updateQueryParams]);

    const getLendings = useCallback(() => {
        return (isSortingChanged || isFiltersApplied) ? modifiedLendings: lendings;
    }, [isSortingChanged, isFiltersApplied, modifiedLendings, lendings]);

    return (
        <ContentWrapper>
            <>
                <Filters className={classes.section} filters={currentFilters} onSetSelectedFilters={onSetSelectedFilters}/>
                <div className={classes.section}>
                    <Alert severity='info' icon={false}>
                        <AlertTitle>Note!</AlertTitle>
                        More complex filters <strong>comming soon!</strong>.<br />
                        This page will be guild-focused.<br />
                        To achive best experience
                        <Link
                            href='https://fireball-gg.notion.site/How-to-add-guild-to-fireball-gg-a2bec3bd315c4d42961bc0148bb17c26'
                            target='_blank'
                            style={{ marginLeft: '6px', color: 'cyan', textDecoration: 'underline' }}
                        >
                            <strong>add your guild!</strong>
                        </Link>
                    </Alert>
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
                            {getLendings().map((lend) => {
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
                                        'lending'
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
