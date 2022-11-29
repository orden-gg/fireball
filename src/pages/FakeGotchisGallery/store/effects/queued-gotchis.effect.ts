import { AppThunk } from 'core/store/store';
import { GalleryFakeGotchi } from 'pages/FakeGotchisGallery/models';
import { FakeGotchisGalleryApi } from 'pages/FakeGotchisGallery/api';

import { getQueuedFakeGotchisQuery } from '../../queries';

import { loadQueuedGotchis, loadQueuedGotchisFailed, loadQueuedGotchisSucceded } from '../slices';

export const loadQueuedFakeGotchis = (): AppThunk => async (dispatch) => {
    dispatch(loadQueuedGotchis());

    FakeGotchisGalleryApi.getMintedFakeGotchis(getQueuedFakeGotchisQuery())
        .then((res: GalleryFakeGotchi[]) => dispatch(loadQueuedGotchisSucceded(res)))
        .catch(() => dispatch(loadQueuedGotchisFailed()));
};
