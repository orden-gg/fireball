import { useEffect } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import GrainIcon from '@mui/icons-material/Grain';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import {
    getGlossaryWearables,
    getWearablesSorting,
    loadWearableListings,
    updateWearablesSorting
} from 'pages/Glossary/store';
import { CardListing } from 'shared/components/CardListing/CardListing';
import { Erc1155Item, Sorting, SortingItem, SortingListItem } from 'shared/models';
import { ContentInner } from 'components/Content/ContentInner';
import { CardBalance, CardGroup, CardImage, CardName, CardSlot, CardStats } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { WarehouseIcon } from 'components/Icons/Icons';
import { Erc1155ItemUtils } from 'utils';

import { styles } from './styles';

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

export function GlossaryWearables() {
    const classes = styles();

    const dispatch = useAppDispatch();
    const wearables: Erc1155Item[] = useAppSelector(getGlossaryWearables);
    const wearablesSorting: SortingItem = useAppSelector(getWearablesSorting);

    useEffect(() => {
        dispatch(loadWearableListings([...Erc1155ItemUtils.getWearablesIds()]));
    }, []);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(updateWearablesSorting({ dir: sortDir, type: sortBy }));
    };

    const sorting: Sorting = {
        sortingList: sortings,
        sortingDefaults: wearablesSorting,
        onSortingChange: onSortingChange
    };

    return (
        <div className={classes.glossaryWearablesContainer}>
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
                                <CardStats id={wearable.id} category={wearable.category.toString()} />
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
        </div>
    );
}
