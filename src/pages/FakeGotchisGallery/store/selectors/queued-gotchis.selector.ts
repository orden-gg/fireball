import { FakeGotchi } from 'shared/models';

import { RootState } from 'core/store/store';

export const getQueuedGotchis = (state: RootState): FakeGotchi[] => state.fake.queued.queuedGotchis.data;

export const getIsQueuedGotchisLoading = (state: RootState): boolean => state.fake.queued.queuedGotchis.isLoading;

export const getIsQueuedGotchisLoaded = (state: RootState): boolean => state.fake.queued.queuedGotchis.isLoaded;

export const getQueuedGotchisCount = (state: RootState): number => state.fake.queued.queuedGotchis.data.length;
