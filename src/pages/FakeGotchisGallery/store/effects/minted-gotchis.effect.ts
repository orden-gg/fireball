import { AppThunk } from 'core/store/store';
import { MintedFakeGotchi } from 'pages/FakeGotchisGallery/models';
import { FakeGotchisGalleryApi } from 'pages/FakeGotchisGallery/api';

import { getMintedFakeGotchisQuery } from '../../queries';

import { loadMintedGotchis, loadMintedGotchisFailed, loadMintedGotchisSucceded } from '../slices';

export const loadMintedFakeGotchis = (): AppThunk => async (dispatch) => {
    dispatch(loadMintedGotchis());

    FakeGotchisGalleryApi.getMintedFakeGotchis(getMintedFakeGotchisQuery())
        .then((res: MintedFakeGotchi[]) => dispatch(loadMintedGotchisSucceded(res)))
        .catch(() => dispatch(loadMintedGotchisFailed()));
};
