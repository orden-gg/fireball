import { AppThunk } from 'core/store/store';
import { ClientApi } from 'pages/Client/api/client.api';
import { FakeItemsDTO, FakeItemsVM } from 'pages/Client/models';

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
        fakeGotchis: fakeItems.ERC721tokens.map(erc721Token => ({
            type: 'fake',
            identifier: erc721Token.identifier,
            name: erc721Token.name,
            description: erc721Token.description,
            artistName: erc721Token.artistName,
            publisherName: erc721Token.publisherName,
            editions: erc721Token.editions,
            thumbnailHash: erc721Token.thumbnailHash
        })),
        fakeGotchiCards: fakeItems.ERC1155balances.map(erc1155 => ({
            type: 'card',
            id: erc1155.id,
            valueExact: Number(erc1155.valueExact)
        }))
    };
};
