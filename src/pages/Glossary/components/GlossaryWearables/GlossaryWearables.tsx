import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { Erc1155Item } from 'shared/models';
import { getGlossaryWearables, loadWearableListingPrices } from 'pages/Glossary/store';
import { ContentInner } from 'components/Content/ContentInner';
import { CardBalance, CardGroup, CardImage, CardListing, CardName, CardSlot, CardStats } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Erc1155ItemUtils } from 'utils';

export function GlossaryWearables() {
    const dispatch = useAppDispatch();
    const wearables = useAppSelector(getGlossaryWearables);

    useEffect(() => {
        dispatch(loadWearableListingPrices([...Erc1155ItemUtils.getWearablesIds()]));
    }, []);

    return (
        <>
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
                                <CardBalance balance={`${wearable.maxQuantity}/${wearable.totalQuantity}`} holders={[]} />
                            </CardGroup>
                            <CardGroup name='body'>
                                <CardSlot id={wearable.id} />
                                <CardImage id={wearable.id} />
                                <CardName children={wearable.name} />
                                <CardStats id={wearable.id} category={wearable.category.toString()} />
                            </CardGroup>
                            <CardGroup name='footer'>
                                <CardListing />
                            </CardGroup>
                        </ItemCard>
                    }
                />
            </ContentInner>
        </>
    );
}
