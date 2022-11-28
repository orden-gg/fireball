import { RootState } from 'core/store/store';

import { MintedFakeGotchi } from '../../models';

export const getMintedGotchis = (state: RootState): MintedFakeGotchi[] =>
    state.fake.minted.mintedGotchis.data;
