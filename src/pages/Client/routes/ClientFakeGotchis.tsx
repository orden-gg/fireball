import { useAppSelector } from 'core/store/hooks';
import { Erc1155Listings, Erc721ListingsDictionary } from 'shared/models';
import { CardTotalPrice } from 'shared/components';
import { CardListing } from 'shared/components/CardListing/CardListing';
import { CardBalance, CardERC721Listing, CardGroup, CardName } from 'components/ItemCard/components';
import { CardImage } from 'shared/components/CardImage/CardImage';
import { ContentInner } from 'components/Content/ContentInner';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import fakeGotchisCard from 'assets/images/icons/fake-gotchis-card.png';

import { FakeGotchi, FakeGotchiCard, FakeItemsVM } from '../models';
import * as fromFakeGotchisStore from '../store';

import { fakeGotchiStyles } from '../styles';

export function ClientFakeGotchis() {
    const classes = fakeGotchiStyles();

    const fakeItems: FakeItemsVM | null = useAppSelector(fromFakeGotchisStore.selectFakeGotchis);
    const isFakeGotchisLoading: boolean = useAppSelector(fromFakeGotchisStore.selectIsFakeGotchisLoading);
    const fakeGotchisListings: Erc721ListingsDictionary = useAppSelector(fromFakeGotchisStore.selectFakeGotchisListings);
    const fakeGotchiCardListings: Erc1155Listings = useAppSelector(fromFakeGotchisStore.selectFakeGotchiCardListings);

    const onHandleFakeGotchiRedirect = (url: string): void => {
        window.open(url, '_blank');
    };

    const renderFakeGotchi = (fakeGotchi: FakeGotchi): JSX.Element => {
        return (
            <div
                className={classes.fakeGotchiLink}
                onClick={() => onHandleFakeGotchiRedirect(`https://www.fakegotchis.com/explore/${fakeGotchi.identifier}`)}
            >
                <ItemCard type='drop'>
                    <CardGroup name='body' className={classes.fakeGotchiBody}>
                        <CardImage
                            className={classes.fakeGotchiImage}
                            src={`https://arweave.net/${fakeGotchi.thumbnailHash}`}
                            alt={fakeGotchi.name}
                        />
                        <CardName className={classes.fakeGotchiName}>{fakeGotchi.name}</CardName>
                        <div className={classes.description}>
                            <span className={classes.descriptionText}>{fakeGotchi.description}</span>
                            <span className={classes.descriptionFooter}>
                                <span className={classes.author}>{fakeGotchi.artistName}</span>
                                , 1 out {fakeGotchi.editions}
                            </span>
                        </div>
                    </CardGroup>

                    <CardGroup name='footer'>
                        {fakeGotchisListings[fakeGotchi.identifier] && <CardERC721Listing
                                currentListingId={fakeGotchisListings[fakeGotchi.identifier].listingId}
                                currentPrice={fakeGotchisListings[fakeGotchi.identifier].listingPrice}
                                historicalPrices={fakeGotchisListings[fakeGotchi.identifier] && fakeGotchisListings[fakeGotchi.identifier].historicalPrices}
                            />
                        }
                    </CardGroup>
                </ItemCard>
            </div>
        );
    };

    const renderFakeCard = (fakeCard: FakeGotchiCard): JSX.Element => {
        return <ItemCard type='common' className={classes.fakeGotchiCard}>
            <CardGroup name='header' className={classes.fakeGotchiHeader}>
                <CardTotalPrice
                    balance={fakeCard.valueExact}
                    price={fakeGotchiCardListings.lastSoldListing.price}
                />
                <CardBalance
                    balance={fakeCard.valueExact}
                    holders={[]}
                />
            </CardGroup>
            <CardGroup name='body' className={classes.fakeGotchiBody}>
                <CardImage
                    className={classes.fakeGotchiImage}
                    src={fakeGotchisCard}
                    alt='Fake Gotchi Card'
                />
                <CardName>Fake Gotchi Card</CardName>
            </CardGroup>
            <CardGroup name='footer'>
                <CardListing
                    currentListing={fakeGotchiCardListings.currentListing}
                    lastSoldListing={fakeGotchiCardListings.lastSoldListing}
                />
            </CardGroup>
        </ItemCard>;
    };

    return (
        <>
            <ContentInner dataLoading={isFakeGotchisLoading}>
                <ItemsLazy
                    items={fakeItems ? [...fakeItems.fakeGotchiCards, ...fakeItems.fakeGotchis] : []}
                    component={(fakeItem: FakeGotchi | FakeGotchiCard) => (
                        fakeItem.type === 'fake' ? (
                            renderFakeGotchi(fakeItem as FakeGotchi)
                        ) : (
                            renderFakeCard(fakeItem as FakeGotchiCard)
                        )
                    )}
                />
            </ContentInner>
        </>
    );
}
