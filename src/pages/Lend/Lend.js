import { useCallback, useEffect, useState } from 'react';
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

import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ContentInner } from 'components/Content/ContentInner';
import { GotchiIcon } from 'components/Icons/Icons';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import { Gotchi } from 'components/Gotchi/Gotchi';
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

const initialFilters = {
    guild: { ...filtersData.guild },
    whitelistId: { ...filtersData.whitelistId, divider: true },
    period: { ...filtersData.period },
    splitBorrower: { ...filtersData.splitBorrower },
    upfrontCost: { ...filtersData.upfrontCost }
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
    const [currentFilters, setCurrentFilters] = useState({ ...initialFilters });

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
        let mounted = true;

        setDataLoading(true);

        thegraphApi.getLendings().then(response => {
            if (mounted) {
                const whitelistData = [];
                const mappedData = [];

                response.forEach(listing => {
                    if (listing.whitelistId) {
                        whitelistData.push(listing.whitelistId);
                    }

                    mappedData.push({
                        ...listing,
                        guild: gotchiverseUtils.gedAddressGuild(listing.lender)
                    });
                });

                const sortedWhitelist = commonUtils.sortByDirection([...new Set(whitelistData)], 'asc');
                const upfronCostValues = mappedData.map(item => ethersApi.fromWei(item.upfrontCost));
                const maxUpfrontCost = Math.max(...upfronCostValues);

                setCurrentFilters(currentFiltersCache => {
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

                    let filtersToReturn;

                    if (Object.keys(queryParams).length > 0) {
                        filtersToReturn = filtersUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCacheCopy);
                    } else {
                        filtersToReturn = currentFiltersCacheCopy;
                    }

                    return filtersToReturn;
                });
                setLendings(mappedData);
                setDataLoading(false);
            }
        });

        return () => mounted = false;
    }, []);

    useEffect(() => {
        updateFilterQueryParams(currentFilters);
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
        filtersUtils.exportData(modifiedLendings, 'lend');
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
