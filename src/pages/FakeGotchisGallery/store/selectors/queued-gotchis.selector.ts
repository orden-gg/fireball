import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { QueuedGotchisState } from '../slices';

const queuedGotchisStateSelector = createSelector(
  (state: RootState) => state.fake.queued,
  (queuedGotchisState: QueuedGotchisState) => queuedGotchisState
);

export const getQueuedGotchis = createSelector(
  queuedGotchisStateSelector,
  (state: QueuedGotchisState) => state.queuedGotchis.data
);

export const getIsQueuedGotchisLoading = createSelector(
  queuedGotchisStateSelector,
  (state: QueuedGotchisState) => state.queuedGotchis.isLoading
);

export const getIsQueuedGotchisLoaded = createSelector(
  queuedGotchisStateSelector,
  (state: QueuedGotchisState) => state.queuedGotchis.isLoaded
);

export const getQueuedGotchisCount = createSelector(
  queuedGotchisStateSelector,
  (state: QueuedGotchisState) => state.queuedGotchis.data.length
);
