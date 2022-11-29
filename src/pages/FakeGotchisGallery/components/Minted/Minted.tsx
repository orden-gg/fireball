import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { ContentInner } from 'components/Content/ContentInner';

import { GalleryFakeGotchi } from '../../models';

import * as fromFakeGotchisGalleryStore from '../../store';

import { styles } from './styles';

export function Minted() {
    const classes = styles();

    const dispatch = useAppDispatch();

    const mintedGotchis: GalleryFakeGotchi[] = useAppSelector(fromFakeGotchisGalleryStore.getMintedGotchis);
    const isMintedGotchisLoading: boolean = useAppSelector(fromFakeGotchisGalleryStore.getIsMintedGotchisLoading);

    useEffect(() => {
        dispatch(fromFakeGotchisGalleryStore.loadMintedFakeGotchis());
    }, []);

    return (
        <>
            <ContentInner dataLoading={isMintedGotchisLoading}>
                <ItemsLazy
                    items={mintedGotchis}
                    component={(mintedGotchi: GalleryFakeGotchi) => {
                        return <>
                            <img
                                className={classes.mintedFakeGotchiImage}
                                src={`https://arweave.net/${mintedGotchi.thumbnailHash}`}
                            />
                            <div className={classes.mintedFakeGotchiContent}>
                                <div className={classes.mintedFakeGotchiName}>{mintedGotchi.name}</div>
                                <div className={classes.mintedFakeGotchiDescription}>{mintedGotchi.description}</div>
                                <div className={classes.mintedFakeGotchiFooter}>
                                    <span className={classes.mintedFakeGotchiAuthor}>{mintedGotchi.artistName}</span>
                                    <span>{mintedGotchi.editions}</span>
                                </div>
                            </div>
                        </>;
                    }}
                />
            </ContentInner>
        </>
    );
}
