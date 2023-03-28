import { FakeGotchisGalleryApi } from 'pages/FakeGotchisGallery/api';

import { AppThunk } from 'core/store/store';

import { FakeGotchi } from 'shared/models';

import { getQueuedFakeGotchisQuery } from '../../queries';
// slices
import * as queuedGotchisSlices from '../slices/queued-gotchis.slice';

export const loadQueuedFakeGotchis = (): AppThunk => async (dispatch) => {
  dispatch(queuedGotchisSlices.loadQueuedGotchis());

  FakeGotchisGalleryApi.getGalleryFakeGotchis(getQueuedFakeGotchisQuery())
    .then((res: FakeGotchi[]) => dispatch(queuedGotchisSlices.loadQueuedGotchisSucceded(res)))
    .catch(() => dispatch(queuedGotchisSlices.loadQueuedGotchisFailed()));
};
