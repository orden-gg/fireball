import { FakeGotchi } from 'shared/models';

import { RootState } from 'core/store/store';

export const getMintedGotchis = (state: RootState): FakeGotchi[] => state.fake.minted.mintedGotchis.data;

export const getIsMintedGotchisLoading = (state: RootState): boolean => state.fake.minted.mintedGotchis.isLoading;

export const getIsMintedGotchisLoaded = (state: RootState): boolean => state.fake.minted.mintedGotchis.isLoaded;

export const getMintedGotchisCount = (state: RootState): number => state.fake.minted.mintedGotchis.data.length;
