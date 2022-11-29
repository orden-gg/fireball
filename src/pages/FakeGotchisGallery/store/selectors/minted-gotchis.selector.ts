import { RootState } from 'core/store/store';

import { GalleryFakeGotchi } from '../../models';

export const getMintedGotchis = (state: RootState): GalleryFakeGotchi[] =>
    state.fake.minted.mintedGotchis.data;

export const getIsMintedGotchisLoading = (state: RootState): boolean =>
    state.fake.minted.mintedGotchis.isLoading;

export const getMintedGotchisLength = (state: RootState): number =>
    state.fake.minted.mintedGotchis.data.length;
