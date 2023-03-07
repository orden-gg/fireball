import { RootState } from 'core/store/store';

import { FakeItemsVM } from 'pages/Client/models';

export const getFakeGotchis = (state: RootState): FakeItemsVM | null => state.client.fakeGotchis.fakeGotchis.data;

export const getFakeGotchisCount = (state: RootState): number =>
  state.client.fakeGotchis.fakeGotchis.data
    ? state.client.fakeGotchis.fakeGotchis.data.fakeGotchiCards.length +
      state.client.fakeGotchis.fakeGotchis.data.fakeGotchis.length
    : 0;

export const getIsInitialFakeGotchisLoading = (state: RootState): boolean =>
  state.client.fakeGotchis.isInitialFakeGotchisLoading;
