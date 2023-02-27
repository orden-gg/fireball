import _ from 'lodash';

import { AppThunk } from 'core/store/store';
import { Erc1155Categories } from 'shared/constants';
import { Erc1155ListingsBatch, Wearable } from 'shared/models';
import { EthersApi, TheGraphApi } from 'api';

import { setWearablesPrices, setMaxWearablePrice } from '../slices';

export const loadWearableListings =
  (wearablesIds: number[]): AppThunk =>
  async (dispatch, getState) => {
    const wearablesCopy: Wearable[] = _.cloneDeep(getState().glossary.wearables);

    Promise.all([
      TheGraphApi.getErc1155ListingsBatchQuery(
        wearablesIds,
        Erc1155Categories.Wearable,
        true,
        'timeLastPurchased',
        'desc'
      ),
      TheGraphApi.getErc1155ListingsBatchQuery(wearablesIds, Erc1155Categories.Wearable, false, 'priceInWei', 'asc')
    ])
      .then(([lastSoldListings, currentListings]: [Erc1155ListingsBatch, Erc1155ListingsBatch]) => {
        const listingPrices: number[] = [];

        Object.keys(lastSoldListings).forEach((key: string, index: number) => {
          const listingPrice: number = currentListings[key][0]
            ? Number(EthersApi.fromWei(currentListings[key][0]?.priceInWei))
            : 0;

          listingPrices.push(listingPrice);

          wearablesCopy[index] = {
            ...wearablesCopy[index],
            lastSoldListing: {
              id: lastSoldListings[key][0] ? Number(lastSoldListings[key][0].id) : null,
              price: lastSoldListings[key][0] ? Number(EthersApi.fromWei(lastSoldListings[key][0].priceInWei)) : 0,
              soldDate: lastSoldListings[key][0]?.timeLastPurchased
                ? new Date(Number(lastSoldListings[key][0].timeLastPurchased) * 1000).toJSON()
                : null
            },
            currentListing: {
              id: currentListings[key][0] ? Number(currentListings[key][0].id) : null,
              price: currentListings[key][0] ? Number(EthersApi.fromWei(currentListings[key][0].priceInWei)) : 0
            },
            listingPrice: currentListings[key][0] ? Number(EthersApi.fromWei(currentListings[key][0]?.priceInWei)) : 0
          };
        });

        const maxListingPrice: number = Math.max(...listingPrices);

        dispatch(setMaxWearablePrice(maxListingPrice));
        dispatch(setWearablesPrices(wearablesCopy));
      })
      .catch((error) => console.log(error));
  };
