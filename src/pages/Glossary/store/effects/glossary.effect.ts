import _ from 'lodash';

import { AppThunk } from 'core/store/store';
import { Erc1155Categories } from 'shared/constants';
import { Erc1155Item, Erc1155ListingsBatch, SortingItem } from 'shared/models';
import { EthersApi, TheGraphApi } from 'api';
import { CommonUtils } from 'utils';

import { setWearablesPrices, setWearables, setWearablesSorting, setMaxWearablePrice } from '../slices';

export const loadWearableListings = (wearablesIds: number[]): AppThunk => async (dispatch, getState) => {
    const wearablesCopy: Erc1155Item[] = _.cloneDeep(getState().glossary.wearables);

    Promise.all([
        TheGraphApi.getErc1155ListingsBatchQuery(wearablesIds, Erc1155Categories.Wearable, true, 'timeLastPurchased', 'desc'),
        TheGraphApi.getErc1155ListingsBatchQuery(wearablesIds, Erc1155Categories.Wearable, false, 'priceInWei', 'asc')
    ])
    .then(([lastSoldListings, currentListings]: [Erc1155ListingsBatch, Erc1155ListingsBatch]) => {
        const listingPrices: number[] = [];

        Object.keys(lastSoldListings).forEach((key: string, index: number) => {
            const listingPrice: number = currentListings[key][0] ? Number(EthersApi.fromWei(currentListings[key][0]?.priceInWei)) : 0;

            listingPrices.push(listingPrice);

            wearablesCopy[index] = {
                ...wearablesCopy[index],
                lastSoldListing: {
                    id: lastSoldListings[key][0] ? Number(lastSoldListings[key][0].id) : null,
                    price: lastSoldListings[key][0] ? Number(EthersApi.fromWei(lastSoldListings[key][0].priceInWei)) : 0,
                    lastPurchased: lastSoldListings[key][0] ? Number(lastSoldListings[key][0].timeLastPurchased) : null,
                    soldDate: lastSoldListings[key][0]?.timeLastPurchased ?
                        new Date(Number(lastSoldListings[key][0].timeLastPurchased) * 1000).toJSON() :
                        null
                },
                currentListing: {
                    id: currentListings[key][0] ? Number(currentListings[key][0].id) : null,
                    price: currentListings[key][0] ? Number(EthersApi.fromWei(currentListings[key][0].priceInWei)) : 0,
                    lastPurchased: currentListings[key][0] ? Number(currentListings[key][0].timeLastPurchased) : null
                },
                listingPrice: currentListings[key][0] ? Number(EthersApi.fromWei(currentListings[key][0]?.priceInWei)) : 0
            };
        });

        const maxListingPrice: number = Math.max(...listingPrices);

        dispatch(setMaxWearablePrice(maxListingPrice));
        dispatch(setWearablesPrices(wearablesCopy));
    }).catch(error => console.log(error));
};

export const updateWearablesSorting = (sorting: SortingItem): AppThunk => async (dispatch, getState) => {
    dispatch(setWearablesSorting(sorting));

    let wearablesCopy: Erc1155Item[] = _.cloneDeep(getState().glossary.initialWearables);
    wearablesCopy = CommonUtils.basicSort<Erc1155Item>(wearablesCopy, sorting.type, sorting.dir);

    dispatch(setWearables(wearablesCopy));
};
