import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { ContentInner } from 'components/Content/ContentInner';

import { GalleryFakeGotchi } from '../../models';

import * as fromFakeGotchisGalleryStore from '../../store';
import { GalleryLayout } from '../GalleryLayout/GalleryLayout';

export function Queue() {
    const dispatch = useAppDispatch();

    const queuedGotchis: GalleryFakeGotchi[] = useAppSelector(fromFakeGotchisGalleryStore.getQueuedGotchis);
    const isQueuedGotchisLoaded: boolean = useAppSelector(fromFakeGotchisGalleryStore.getIsQueuedGotchisLoaded);

    useEffect(() => {
        dispatch(fromFakeGotchisGalleryStore.loadQueuedFakeGotchis());
    }, []);

    return (
        <>
            <ContentInner dataLoading={!isQueuedGotchisLoaded}>
                <GalleryLayout items={queuedGotchis} />
            </ContentInner>
        </>
    );
}
