import { useContext } from 'react';

import { ContentInner } from 'components/Content/ContentInner';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { ItemCard } from 'components/ItemCard/containers';
import { CardBalance, CardCraftLink, CardGroup, CardImage, CardListing, CardName, CardTotalPrice } from 'components/ItemCard/components';
import { ClientContext } from 'contexts/ClientContext';

export function ClientInstallations() {
    const {
        tiles,
        loadingTiles,
        installations,
        loadingInstallations
    } = useContext<any>(ClientContext);

    return (
        <>
            <ContentInner dataLoading={loadingTiles || loadingInstallations}>
                <ItemsLazy
                    items={[...installations, ...tiles]}
                    component={(item: any) =>
                        <ItemCard id={item.id} category={item.category} type={item.rarity || 'drop'}>
                            <CardGroup name='header'>
                                {!item.deprecated ? <CardCraftLink name={item.name} /> : <></>}
                                <CardTotalPrice
                                    balance={item.balance}
                                    priceInWei={item.priceInWei}
                                />
                                <CardBalance balance={item.balance} />
                            </CardGroup>
                            <CardGroup name='body'>
                                <CardImage id={item.id} category={item.category} />
                                <CardName>{item.name}</CardName>
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
