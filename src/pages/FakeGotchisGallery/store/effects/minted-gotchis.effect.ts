import { FakeGotchi } from 'shared/models';
import { AppThunk } from 'core/store/store';
import { FakeGotchisGalleryApi } from 'pages/FakeGotchisGallery/api';

import { getMintedFakeGotchisQuery } from '../../queries';

import { loadMintedGotchis, loadMintedGotchisFailed, loadMintedGotchisSucceded } from '../slices';

export const loadMintedFakeGotchis = (): AppThunk => async dispatch => {
  dispatch(loadMintedGotchis());

  FakeGotchisGalleryApi.getGalleryFakeGotchis(getMintedFakeGotchisQuery())
    .then((res: FakeGotchi[]) => dispatch(loadMintedGotchisSucceded(res)))
    .catch(() => dispatch(loadMintedGotchisFailed()));
};
