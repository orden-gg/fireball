import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { ContentInner } from 'components/Content/ContentInner';

import { GalleryFakeGotchi } from '../../models';

import * as fromFakeGotchisGalleryStore from '../../store';

import { GalleryLayout } from '../GalleryLayout/GalleryLayout';

export function Minted() {
    const dispatch = useAppDispatch();

    const mintedGotchis: GalleryFakeGotchi[] = useAppSelector(fromFakeGotchisGalleryStore.getMintedGotchis);
    const isMintedGotchisLoading: boolean = useAppSelector(fromFakeGotchisGalleryStore.getIsMintedGotchisLoading);

    useEffect(() => {
        dispatch(fromFakeGotchisGalleryStore.loadMintedFakeGotchis());
    }, []);

    return (
        <>
            <ContentInner dataLoading={isMintedGotchisLoading}>
                {mintedGotchis.length ? <GalleryLayout items={mintedGotchis} /> : <span>loading</span>}
            </ContentInner>
        </>
    );
}
