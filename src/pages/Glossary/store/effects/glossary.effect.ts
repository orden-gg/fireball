import _ from 'lodash';

import { AppThunk } from 'core/store/store';
import { Erc1155Categories } from 'shared/constants';
import { Erc1155Item, Erc1155ListingsBatch, SortingItem } from 'shared/models';
import { EthersApi, TheGraphApi } from 'api';
import { CommonUtils } from 'utils';

import { setWearablesPrices, setWearables, setWearablesSorting } from '../slices';

export const loadWearableListings = (wearablesIds: number[]): AppThunk => async (dispatch, getState) => {
    let wearablesCopy: Erc1155Item[] = _.cloneDeep(getState().glossary.wearables);

    Promise.all([
        TheGraphApi.getErc1155ListingsBatchQuery(wearablesIds, Erc1155Categories.Wearable, true, 'timeLastPurchased', 'desc'),
        TheGraphApi.getErc1155ListingsBatchQuery(wearablesIds, Erc1155Categories.Wearable, false, 'priceInWei', 'asc')
    ])
    .then(([lastSoldListings, currentListings]: [Erc1155ListingsBatch, Erc1155ListingsBatch]) => {
        wearablesCopy = Object.keys(lastSoldListings).map((key, index) => {
            return {
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

        dispatch(setWearablesPrices(wearablesCopy));
    }).catch(error => console.log(error));
};

export const updateWearablesSorting = (sorting: SortingItem): AppThunk => async (dispatch, getState) => {
    dispatch(setWearablesSorting(sorting));

    let wearablesCopy: Erc1155Item[] = _.cloneDeep(getState().glossary.initialWearables);
    wearablesCopy = CommonUtils.basicSort<Erc1155Item>(wearablesCopy, sorting.type, sorting.dir);

    dispatch(setWearables(wearablesCopy));
};
