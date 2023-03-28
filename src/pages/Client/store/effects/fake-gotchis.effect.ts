import { ClientApi } from '../../api';

import { AppThunk } from 'core/store/store';

import { FakeGotchi } from 'shared/models';

import { FakeGotchiCard, FakeItemsDTO, FakeItemsVM } from 'pages/Client/models';
import { getFakeGotchisByAddressQuery } from 'pages/Client/queries';

// slices
import * as fakeGotchisSlices from '../slices/fake-gotchis.slice';

export const onLoadFakeGotchis =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(fakeGotchisSlices.loadFakeGotchis());

    ClientApi.getFakeGotchis(getFakeGotchisByAddressQuery(address))
      .then((res: FakeItemsDTO) => {
        const mappedItems: FakeItemsVM = mapFakeItemsDTOToVM(res);

        dispatch(fakeGotchisSlices.loadFakeGotchisSucceded(mappedItems));
      })
      .catch(() => dispatch(fakeGotchisSlices.loadFakeGotchisFailed()))
      .finally(() => dispatch(fakeGotchisSlices.setIsInitialFakeGotchisLoading(false)));
  };

const mapFakeItemsDTOToVM = (fakeItems: FakeItemsDTO): FakeItemsVM => {
  return {
    fakeGotchis: fakeItems.ERC721tokens.map((erc721Token: FakeGotchi) => ({
      ...erc721Token,
      type: 'fake'
    })),
    fakeGotchiCards: fakeItems.ERC1155balances.filter((erc1155: FakeGotchiCard) => Number(erc1155.valueExact) > 0).map(
      (erc1155: FakeGotchiCard) => ({
        type: 'card',
        id: erc1155.id,
        valueExact: Number(erc1155.valueExact)
      })
    )
  };
};
