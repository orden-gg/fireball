import { RootState } from 'core/store/store';
import { Erc1155Listings, Erc721ListingsDictionary } from 'shared/models';
import { FakeItemsVM } from 'pages/Client/models';

export const selectFakeGotchis = (state: RootState): FakeItemsVM | null => state.client.fakeGotchis.fakeGotchis.data;

export const selectFakeGotchisLength = (state: RootState): number =>
  state.client.fakeGotchis.fakeGotchis.data
    ? state.client.fakeGotchis.fakeGotchis.data.fakeGotchiCards.length +
      state.client.fakeGotchis.fakeGotchis.data.fakeGotchis.length
    : 0;

export const selectIsFakeGotchisLoading = (state: RootState): boolean => state.client.fakeGotchis.fakeGotchis.isLoading;

export const selectFakeGotchisListings = (state: RootState): Erc721ListingsDictionary =>
  state.client.fakeGotchis.fakeGotchisListings;

export const selectFakeGotchiCardListings = (state: RootState): Erc1155Listings =>
  state.client.fakeGotchis.fakeGotchiCardListings;
