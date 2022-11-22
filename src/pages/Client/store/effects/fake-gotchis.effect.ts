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
            identifier: erc721Token.identifier,
            name: erc721Token.metadata.name,
            description: erc721Token.metadata.description,
            thumbnailHash: erc721Token.metadata.thumbnailHash
        })),
        fakeGotchiCard: {
            id: fakeItems.ERC1155balances[0].id,
            valueExact: Number(fakeItems.ERC1155balances[0].valueExact)
        }
    };
};
