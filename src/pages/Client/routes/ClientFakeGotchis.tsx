import { Link } from '@mui/material';

import { useAppSelector } from 'core/store/hooks';
import { CardBalance, CardGroup, CardName } from 'components/ItemCard/components';
import { CardImage } from 'shared/components/CardImage/CardImage';
import { ContentInner } from 'components/Content/ContentInner';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import fakeGotchiCard from 'assets/images/fake-gotchi-card.png';

import { FakeGotchi, FakeGotchiCard, FakeItemsVM } from '../models';
import { selectFakeGotchis, selectIsFakeGotchisLoading } from '../store';

import { fakeGotchiStyles } from '../styles';

export function ClientFakeGotchis() {
    const classes = fakeGotchiStyles();

    const fakeItems: FakeItemsVM | null = useAppSelector(selectFakeGotchis);
    const isFakeGotchisLoading: boolean = useAppSelector(selectIsFakeGotchisLoading);

    const renderFakeGotchi = (fakeGotchi: FakeGotchi): JSX.Element => {
        return <Link className={classes.fakeGotchiLink} href={`https://www.fakegotchis.com/explore/${fakeGotchi.identifier}`} target="_blank">
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

                {/* // TODO: add fake gotchi listings info
                <CardGroup name='footer'>
                    <CardListing />
                </CardGroup> */}
            </ItemCard>
        </Link>;
    };

    const renderFakeCard = (fakeCard: FakeGotchiCard): JSX.Element => {
        return <ItemCard type='common' className={classes.fakeGotchiCard}>
            <CardGroup name='header' className={classes.fakeGotchiHeader}>
                <CardBalance
                    balance={fakeCard.valueExact}
                    holders={[]}
                />
            </CardGroup>
            <CardGroup name='body' className={classes.fakeGotchiBody}>
                <CardImage
                    className={classes.fakeGotchiImage}
                    src={fakeGotchiCard}
                    alt='Fake Gotchi Card'
                />
                <CardName>Fake Gotchi Card</CardName>
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
