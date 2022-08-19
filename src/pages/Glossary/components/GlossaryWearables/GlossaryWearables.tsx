import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import GrainIcon from '@mui/icons-material/Grain';

import _ from 'lodash';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import {
    getGlossaryWearables,
    getInitialGlossaryWearables,
    getMaxWearablePrice,
    getWearablesSorting,
    loadWearableListings,
    setWearables,
    updateWearablesSorting
} from 'pages/Glossary/store';
import { CardListing } from 'shared/components/CardListing/CardListing';
import { Erc1155Item, Sorting, SortingItem, SortingListItem } from 'shared/models';
import { GlossaryWearablesFilters } from 'pages/Glossary/models';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { CardBalance, CardGroup, CardImage, CardName, CardSlot, CardStats } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { WarehouseIcon } from 'components/Icons/Icons';
import { Erc1155ItemUtils, FilterUtils } from 'utils';

import { styles } from './styles';

import { glossaryWearablesFilters } from '../../data/glossary-filters.data';

const sortings: SortingListItem[] = [
    {
        name: 'rarity',
        key: 'rarityId',
        paramKey: 'rarity',
        tooltip: 'rarity',
        icon: <GrainIcon fontSize='small' />
    },
    {
        name: 'price',
        key: 'listingPrice',
        paramKey: 'price',
        tooltip: 'price',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'quantity',
        key: 'totalQuantity',
        paramKey: 'quantity',
        tooltip: 'quantity',
        icon: <FormatListNumberedIcon fontSize='small' />
    }
];
const initialFilters: GlossaryWearablesFilters = {
    rarity: { ...glossaryWearablesFilters.rarity },
    slot: { ...glossaryWearablesFilters.slot },
    traitModifier: { ...glossaryWearablesFilters.traitModifier, divider: true },
    listingPrice: { ...glossaryWearablesFilters.listingPrice }
};

export function GlossaryWearables() {
    const classes = styles();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const initialWearables: Erc1155Item[] = useAppSelector(getInitialGlossaryWearables);
    const wearables: Erc1155Item[] = useAppSelector(getGlossaryWearables);
    const wearablesSorting: SortingItem = useAppSelector(getWearablesSorting);
    const maxWearablePrice: number = useAppSelector(getMaxWearablePrice);

    const [currentFilters, setCurrentFilters] = useState<GlossaryWearablesFilters>({ ...initialFilters });

    useEffect(() => {
        dispatch(loadWearableListings([...Erc1155ItemUtils.getWearablesIds()]));
    }, []);

    useEffect(() => {
        setCurrentFilters((currentFiltersCache: GlossaryWearablesFilters) => {
            const currentFiltersCacheCopy: GlossaryWearablesFilters = _.cloneDeep(currentFiltersCache);

            currentFiltersCacheCopy.listingPrice = {
                ...currentFiltersCacheCopy.listingPrice,
                max: maxWearablePrice,
                value: [currentFiltersCacheCopy.listingPrice.min, maxWearablePrice]
            };

            return currentFiltersCacheCopy;
        });
    }, [maxWearablePrice]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(updateWearablesSorting({ dir: sortDir, type: sortBy }));
    };

    const sorting: Sorting = {
        sortingList: sortings,
        sortingDefaults: wearablesSorting,
        onSortingChange: onSortingChange
    };

    useEffect(() => {
        const modifiedWearables = FilterUtils.getFilteredSortedItems({
            items: initialWearables,
            filters: currentFilters,
            sorting: wearablesSorting,
            getFilteredItems: FilterUtils.getFilteredItems
        });

        dispatch(setWearables(modifiedWearables));
    }, [currentFilters, initialWearables, wearablesSorting]);

    const onSetSelectedFilters = (key: string, selectedValue: any) => {
        FilterUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
    };

    const onResetFilters = useCallback(() => {
        FilterUtils.resetFilters(currentFilters, setCurrentFilters);
    }, [currentFilters]);

    const onExportData = useCallback(() => {
        FilterUtils.exportData(wearables, 'glossary_wearables');
    }, [wearables]);

    return (
        <ContentWrapper>
            <>
                <SortFilterPanel
                    sorting={sorting}
                    itemsLength={wearables.length}
                    placeholder={
                        <WarehouseIcon width={20} height={20} />
                    }
                />
                <ContentInner dataLoading={false}>
                    <ItemsLazy
                        items={wearables}
                        component={(wearable: Erc1155Item) =>
                            <ItemCard
                                id={wearable.id}
                                category={wearable.category}
                                type={wearable.rarity}
                            >
                                <CardGroup name='header'>
                                    <CardBalance balance={`${wearable.totalQuantity}`} holders={[]} />
                                </CardGroup>
                                <CardGroup name='body'>
                                    <CardSlot id={wearable.id} />
                                    <CardImage id={wearable.id} />
                                    <CardName children={wearable.name} />
                                    <CardStats stats={Object.entries(wearable.traitModifiers).map(([_, traitValue]) => traitValue)} />
                                </CardGroup>
                                <CardGroup name='footer'>
                                    <CardListing
                                        currentListing={wearable.currentListing}
                                        lastSoldListing={wearable.lastSoldListing}
                                        lastSoldDate={wearable.lastSoldListing?.soldDate}
                                    />
                                </CardGroup>
                            </ItemCard>
                        }
                    />
                </ContentInner>
            </>
            <>
                <IconButton className={classes.backButton} onClick={() => { navigate('/glossary') }} >
                    <ArrowBackIcon />
                </IconButton>

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
        </ContentWrapper>
    );
}
