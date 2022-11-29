import { RootState } from 'core/store/store';

import { GalleryFakeGotchi } from '../../models';

export const getQueuedGotchis = (state: RootState): GalleryFakeGotchi[] =>
    state.fake.queued.queuedGotchis.data;

export const getIsQueuedGotchisLoading = (state: RootState): boolean =>
    state.fake.queued.queuedGotchis.isLoading;

export const getQueuedGotchisLength = (state: RootState): number =>
    state.fake.queued.queuedGotchis.data.length;
