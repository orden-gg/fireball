import { RootState } from 'core/store/store';
import { FakeItemsVM } from 'pages/Client/models';

export const selectFakeGotchis = (state: RootState): FakeItemsVM | null =>
    state.client.fakeGotchis.fakeGotchis.data;

export const selectIsFakeGotchisLoading = (state: RootState): boolean =>
    state.client.fakeGotchis.fakeGotchis.isLoading;
