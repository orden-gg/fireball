import { FakeGotchisGalleryApi } from 'pages/FakeGotchisGallery/api';

import { AppThunk } from 'core/store/store';

import { FakeGotchi } from 'shared/models';

import { getMintedFakeGotchisQuery } from '../../queries';
// slices
import * as mintedGotchisSlices from '../slices/minted-gotchis.slice';

export const loadMintedFakeGotchis = (): AppThunk => async (dispatch) => {
  dispatch(mintedGotchisSlices.loadMintedGotchis());

  FakeGotchisGalleryApi.getGalleryFakeGotchis(getMintedFakeGotchisQuery())
    .then((res: FakeGotchi[]) => dispatch(mintedGotchisSlices.loadMintedGotchisSucceded(res)))
    .catch(() => dispatch(mintedGotchisSlices.loadMintedGotchisFailed()));
};
