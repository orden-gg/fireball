import { AppThunk } from 'core/store/store';
import { Erc721ListingsBatch, Erc721ListingsDictionary } from 'shared/models';
import { ClientApi } from 'pages/Client/api/client.api';
import { FakeGotchi, FakeGotchiCard, FakeItemsDTO, FakeItemsVM } from 'pages/Client/models';
import { getFakeGotchisByAddressQuery } from 'pages/Client/queries';
import { EthersApi } from 'api';

import { loadFakeGotchis, loadFakeGotchisSucceded, loadFakeGotchisFailed, setFakeGotchisListings } from '../slices';

export const onLoadFakeGotchis = (address: string, shouldUpdateIsLoading: boolean): AppThunk =>
    (dispatch) => {
        if (shouldUpdateIsLoading) {
            dispatch(loadFakeGotchis());
        }

        ClientApi.getFakeGotchis(getFakeGotchisByAddressQuery(address))
            .then((res: FakeItemsDTO) => {
                const erc721Ids: number[] = res.ERC721tokens.map((token: FakeGotchi) => Number(token.identifier));

                if (erc721Ids.length > 0) {
                    Promise.all([
                        ClientApi.getFakeGotchisListings(erc721Ids)
                    ]).then(([currentListings]: [Erc721ListingsBatch]) => {
                        const listings: Erc721ListingsDictionary = {};

                        Object.keys(currentListings).forEach((key: string) => {
                            // debugger
                            const dictionaryKey: string = key.split('item')[1];
                            const currentListing = currentListings[key].find(listing => Number(listing.timePurchased) === 0);

                            listings[dictionaryKey] = {
                                listingId: currentListing ? currentListing.id : '',
                                listingPrice: currentListing ? EthersApi.fromWei(currentListing.priceInWei) : 0,
                                historicalPrices: currentListings[key]
                                    .filter(listing => Number(listing.timePurchased) !== 0)
                                    .sort((a, b) => Number(a.timePurchased) - Number(b.timePurchased))
                                    .map(listing => listing.priceInWei)
                            };
                        });

                        dispatch(setFakeGotchisListings(listings));
                    });
                }

                dispatch(loadFakeGotchisSucceded(mapFakeItemsDTOToVM(res)));
            })
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
