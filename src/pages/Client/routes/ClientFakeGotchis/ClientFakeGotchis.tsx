import { Link } from '@mui/material';

import { useAppSelector } from 'core/store/hooks';
import { CardBalance, CardGroup, CardName } from 'components/ItemCard/components';
import { CardImage } from 'shared/components/CardImage/CardImage';
import { ContentInner } from 'components/Content/ContentInner';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import fakeGotchiCard from 'assets/images/fake-gotchi-card.png';

import { FakeGotchi, FakeItemsVM } from '../../models';
import { selectFakeGotchis, selectIsFakeGotchisLoading } from '../../store';

import { styles } from './styles';

export function ClientFakeGotchis() {
    const classes = styles();

    const fakeItems: FakeItemsVM | null = useAppSelector(selectFakeGotchis);
    const isFakeGotchisLoading: boolean = useAppSelector(selectIsFakeGotchisLoading);

    return (
        <>
            <ContentInner dataLoading={isFakeGotchisLoading} className={classes.container}>
                <ItemsLazy
                    items={fakeItems ? fakeItems.fakeGotchis : []}
                    component={(fakeGotchi: FakeGotchi) => (
                        <Link href={`https://www.fakegotchis.com/explore/${fakeGotchi.identifier}`} target="_blank">
                            <img
                                width={'100%'}
                                src={`https://arweave.net/${fakeGotchi.thumbnailHash}`}
                                style={{
                                    objectFit: 'contain',
                                    aspectRatio: '1/1'
                                }}
                            />
                            <div
                                style={{
                                    textAlign: 'center'
                                }}
                            >
                                {fakeGotchi.name}
                            </div>
                        </Link>
                    )}
                />

                <>
                    {fakeItems && fakeItems.fakeGotchiCard.valueExact > 0 &&
                        <ItemCard type='drop' className={classes.fakeGotchiCard}>
                            <CardGroup name='header'>
                                <CardBalance balance={fakeItems ? fakeItems.fakeGotchiCard.valueExact: ''} holders={[]} />
                            </CardGroup>
                            <CardGroup name='body'>
                                <CardImage src={fakeGotchiCard} alt='Fake Gotchi Card' />
                                <CardName className={classes.fakeGotchiCardName}>Fake Gotchi Card</CardName>
                            </CardGroup>
                        </ItemCard>
                    }
                </>

            </ContentInner>
        </>
    );
}
