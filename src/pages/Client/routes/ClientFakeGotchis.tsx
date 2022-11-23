import { Link } from '@mui/material';

import { useAppSelector } from 'core/store/hooks';
import { CardBalance, CardGroup, CardName } from 'components/ItemCard/components';
import { CardImage } from 'shared/components/CardImage/CardImage';
import { ContentInner } from 'components/Content/ContentInner';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import fakeGotchiCard from 'assets/images/fake-gotchi-card.png';

import { FakeItemsVM } from '../models';
import { selectFakeGotchis, selectIsFakeGotchisLoading } from '../store';

import { fakeGotchiStyles } from '../styles';

export function ClientFakeGotchis() {
    const classes = fakeGotchiStyles();

    const fakeItems: FakeItemsVM | null = useAppSelector(selectFakeGotchis);
    const isFakeGotchisLoading: boolean = useAppSelector(selectIsFakeGotchisLoading);

    return (
        <>
            <ContentInner dataLoading={isFakeGotchisLoading}>
                <ItemsLazy
                    items={fakeItems ? [...fakeItems.fakeGotchiCards, ...fakeItems.fakeGotchis] : []}
                    component={(fakeItem: any) => ( // !FakeGotchi | FakeGotchiCard ???
                        fakeItem.type === 'fake' ? (
                            <Link className={classes.fakeGotchiLink} href={`https://www.fakegotchis.com/explore/${fakeItem.identifier}`} target="_blank">
                                <ItemCard type='drop'>
                                    <CardGroup name='body' className={classes.fakeGotchiBody}>
                                        <CardImage
                                            className={classes.fakeGotchiImage}
                                            src={`https://arweave.net/${fakeItem.thumbnailHash}`}
                                            alt={fakeItem.name}
                                        />
                                        <CardName className={classes.fakeGotchiName}>{fakeItem.name}</CardName>
                                        <div className={classes.description}>
                                            <span className={classes.descriptionText}>{fakeItem.description}</span>
                                            <span className={classes.descriptionFooter}>
                                                <span className={classes.author}>{fakeItem.artistName}</span>
                                                , 1 out {fakeItem.editions}
                                            </span>
                                        </div>
                                    </CardGroup>

                                    {/* // TODO: add fake gotchi listings info
                                    <CardGroup name='footer'>
                                        <CardListing />
                                    </CardGroup> */}
                                </ItemCard>
                            </Link>
                        ) : (
                            <ItemCard type='common' className={classes.fakeGotchiCard}>
                                <CardGroup name='header' className={classes.fakeGotchiHeader}>
                                    <CardBalance
                                        balance={fakeItem.valueExact}
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
                            </ItemCard>
                        )
                    )}
                />


                {/* <>
                    {console.log(fakeItems)}
                    {fakeItems && fakeItems.fakeGotchiCard.valueExact > 0 && (
                        <ItemCard type="drop" className={classes.fakeGotchiCard}>
                            <CardGroup name="header">
                                <CardBalance
                                    balance={fakeItems ? fakeItems.fakeGotchiCard.valueExact : ''}
                                    holders={[]}
                                />
                            </CardGroup>
                            <CardGroup name="body">
                                <CardImage src={fakeGotchiCard} alt="Fake Gotchi Card" />
                                <CardName className={classes.fakeGotchiCardName}>Fake Gotchi Card</CardName>
                            </CardGroup>
                        </ItemCard>
                    )}
                </> */}
            </ContentInner>
        </>
    );
}
