import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { ContentInner } from 'components/Content/ContentInner';

import { GalleryFakeGotchi } from '../../models';

import * as fromFakeGotchisGalleryStore from '../../store';

import { styles } from './styles';

export function Queue() {
    const classes = styles();

    const dispatch = useAppDispatch();

    const queuedGotchis: GalleryFakeGotchi[] = useAppSelector(fromFakeGotchisGalleryStore.getQueuedGotchis);
    const isQueuedGotchisLoading: boolean = useAppSelector(fromFakeGotchisGalleryStore.getIsQueuedGotchisLoading);

    useEffect(() => {
        dispatch(fromFakeGotchisGalleryStore.loadQueuedFakeGotchis());
    }, []);

    return (
        <>
            <ContentInner dataLoading={isQueuedGotchisLoading}>
                <ItemsLazy
                    items={queuedGotchis}
                    component={(queuedGotchi: GalleryFakeGotchi) => {
                        return <>
                            <img
                                className={classes.queuedFakeGotchiImage}
                                src={`https://arweave.net/${queuedGotchi.thumbnailHash}`}
                            />
                            <div className={classes.queuedFakeGotchiContent}>
                                <div className={classes.queuedFakeGotchiName}>{queuedGotchi.name}</div>
                                <div className={classes.queuedFakeGotchiDescription}>{queuedGotchi.description}</div>
                                <div className={classes.queuedFakeGotchiFooter}>
                                    <span className={classes.queuedFakeGotchiAuthor}>{queuedGotchi.artistName}</span>
                                    <span>{queuedGotchi.editions}</span>
                                </div>
                            </div>
                        </>;
                    }}
                />
            </ContentInner>
        </>
    );
}
