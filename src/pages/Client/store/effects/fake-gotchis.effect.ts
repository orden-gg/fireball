import { AppThunk } from 'core/store/store';
import { ClientApi } from 'pages/Client/api/client.api';
import { FakeGotchi, FakeGotchiCard, FakeItemsDTO, FakeItemsVM } from 'pages/Client/models';

import { loadFakeGotchis, loadFakeGotchisSucceded, loadFakeGotchisFailed } from '../slices';

export const onLoadFakeGotchis = (address: string): AppThunk =>
    (dispatch) => {
        dispatch(loadFakeGotchis());

        ClientApi.getFakeGotchisByAddress(address)
            .then((res: FakeItemsDTO) => dispatch(loadFakeGotchisSucceded(mapFakeItemsDTOToVM(res))))
            .catch(() => dispatch(loadFakeGotchisFailed()));
    };

const mapFakeItemsDTOToVM = (fakeItems: FakeItemsDTO): FakeItemsVM => {
    return {
        fakeGotchis: fakeItems.ERC721tokens.map((erc721Token: FakeGotchi) => ({
            ...erc721Token,
            type: 'fake'
        })),
        fakeGotchiCards: fakeItems.ERC1155balances.map((erc1155: FakeGotchiCard) => ({
            type: 'card',
            id: erc1155.id,
            valueExact: Number(erc1155.valueExact)
        }))
    };
};
