import { useContext } from 'react';

import { ContentInner } from 'components/Content/ContentInner';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { CardBalance, CardBody, CardImage, CardInner, CardListings, CardName, CardTotalPrice, ItemCard } from 'components/ItemCard';
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
            <ContentInner dataLoading={loadingTiles || loadingInstallations} offset={182}>
                <ItemsLazy
                    items={[...installations, ...tiles]}
                    component={({ id, name, category, balance, priceInWei, rarity }: any) =>
                        <ItemCard type={rarity || 'golden'}>
                            <CardInner>
                                <CardTotalPrice
                                    id={id}
                                    balance={balance}
                                    category={category}
                                    priceInWei={priceInWei}
                                />
                                <CardBalance balance={balance} />
                            </CardInner>
                            <CardBody>
                                <CardImage id={id} category={category} />
                                <CardName>{name}</CardName>
                            </CardBody>
                            <CardInner>
                                <CardListings id={id} category={category} />
                            </CardInner>
                        </ItemCard>
                    }
                />
            </ContentInner>
        </>
    );
}
