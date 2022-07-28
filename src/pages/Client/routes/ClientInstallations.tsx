import { useContext } from 'react';

import { ContentInner } from 'components/Content/ContentInner';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { CardBalance, CardBody, CardFooter, CardHeader, CardImage, CardListing, CardName, CardTotalPrice, ItemCard } from 'components/ItemCard';
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
                    component={(installation: any) =>
                        <ItemCard id={installation.id} category={installation.category} type={installation.rarity || 'drop'}>
                            <CardHeader>
                                <CardTotalPrice
                                    balance={installation.balance}
                                    priceInWei={installation.priceInWei}
                                />
                                <CardBalance balance={installation.balance} />
                            </CardHeader>
                            <CardBody>
                                <CardImage id={installation.id} category={installation.category} />
                                <CardName>{installation.name}</CardName>
                            </CardBody>
                            <CardFooter>
                                <CardListing />
                            </CardFooter>
                        </ItemCard>
                    }
                />
            </ContentInner>
        </>
    );
}
