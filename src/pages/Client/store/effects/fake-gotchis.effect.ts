import { AppThunk } from 'core/store/store';
import { Erc1155Listings, Erc721ListingsBatch, Erc721ListingsDictionary, FakeGotchi } from 'shared/models';
import {
  FakeGotchiCard,
  FakeGotchiCardLastSoldListingDTO,
  FakeGotchiCardListingDTO,
  FakeItemsDTO,
  FakeItemsVM
} from 'pages/Client/models';
import {
  getFakeGotchiCardCurrentListingQuery,
  getFakeGotchiCardLastSoldListingQuery,
  getFakeGotchisByAddressQuery
} from 'pages/Client/queries';
import { EthersApi } from 'api';

import { ClientApi } from '../../api';

import {
  loadFakeGotchis,
  loadFakeGotchisSucceded,
  loadFakeGotchisFailed,
  setFakeGotchisListings,
  setFakeGotchiCardListings
} from '../slices';

export const onLoadFakeGotchis =
  (address: string, shouldUpdateIsLoading: boolean): AppThunk =>
  (dispatch) => {
    if (shouldUpdateIsLoading) {
      dispatch(loadFakeGotchis());
    }

    ClientApi.getFakeGotchis(getFakeGotchisByAddressQuery(address))
      .then((res: FakeItemsDTO) => {
        const erc721Ids: number[] = res.ERC721tokens.map((token: FakeGotchi) => Number(token.identifier));

        if (erc721Ids.length > 0) {
          Promise.all([ClientApi.getFakeGotchisListings(erc721Ids)]).then(
            ([currentListings]: [Erc721ListingsBatch]) => {
              const listings: Erc721ListingsDictionary = {};

              Object.keys(currentListings).forEach((key: string) => {
                const dictionaryKey: string = key.split('item')[1];
                const currentListing = currentListings[key].find((listing) => Number(listing.timePurchased) === 0);

                listings[dictionaryKey] = {
                  listingId: currentListing ? currentListing.id : '',
                  listingPrice: currentListing ? EthersApi.fromWei(currentListing.priceInWei) : 0,
                  historicalPrices: currentListings[key]
                    .filter((listing) => Number(listing.timePurchased) !== 0)
                    .sort((a, b) => Number(a.timePurchased) - Number(b.timePurchased))
                    .map((listing) => listing.priceInWei)
                };
              });

              dispatch(setFakeGotchisListings(listings));
            }
          );
        }

        const mappedItems: FakeItemsVM = mapFakeItemsDTOToVM(res);

        if (mappedItems.fakeGotchiCards.length > 0) {
          Promise.all([
            ClientApi.getFakeGotchiCardListing<FakeGotchiCardListingDTO>(getFakeGotchiCardCurrentListingQuery()),
            ClientApi.getFakeGotchiCardListing<FakeGotchiCardLastSoldListingDTO>(
              getFakeGotchiCardLastSoldListingQuery()
            )
          ]).then(
            ([currentListing, lastSoldlisting]: [FakeGotchiCardListingDTO[], FakeGotchiCardLastSoldListingDTO[]]) => {
              const listings: Erc1155Listings = {
                currentListing: {
                  id: currentListing[0] ? Number(currentListing[0].id) : null,
                  price: currentListing[0] ? EthersApi.fromWei(currentListing[0].priceInWei) : 0
                },
                lastSoldListing: {
                  id: Number(lastSoldlisting[0].id),
                  price: EthersApi.fromWei(lastSoldlisting[0].priceInWei),
                  soldDate: new Date(Number(lastSoldlisting[0].timeLastPurchased) * 1000).toJSON()
                }
              };

              dispatch(setFakeGotchiCardListings(listings));
            }
          );
        }

        dispatch(loadFakeGotchisSucceded(mappedItems));
      })
      .catch(() => dispatch(loadFakeGotchisFailed()));
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
