import _ from 'lodash';

import { AppThunk } from 'core/store/store';
import { Erc1155Categories } from 'shared/constants';
import { Erc1155Item, Erc1155ListingsBatch, SortingItem } from 'shared/models';
import { EthersApi, TheGraphApi } from 'api';
import { CommonUtils } from 'utils';

import { setWearablesPrices, setWearables, setWearablesSorting } from '../slices';

export const loadWearableListingPrices = (wearablesIds: number[]): AppThunk => async (dispatch, getState) => {
    const wearablesCopy: Erc1155Item[] = _.cloneDeep(getState().glossary.wearables);

    TheGraphApi.getErc1155ListingsBatchQuery(wearablesIds, Erc1155Categories.Wearable)
        .then((wearablesListings: Erc1155ListingsBatch) => {
            Object.entries(wearablesListings).forEach(([_, listings], index: number) => {
                listings.sort((a, b) => Number(a.priceInWei) - Number(b.priceInWei));

                wearablesCopy[index].listingPrice = listings[0] ? Number(EthersApi.fromWei(listings[0]?.priceInWei)) : 0;
            });

            dispatch(setWearablesPrices(wearablesCopy));
        })
        .catch(error => console.log(error));
};

export const updateWearablesSorting = (sorting: SortingItem): AppThunk => async (dispatch, getState) => {
    dispatch(setWearablesSorting(sorting));

    let wearablesCopy: Erc1155Item[] = _.cloneDeep(getState().glossary.initialWearables);
    wearablesCopy = CommonUtils.basicSort<Erc1155Item>(wearablesCopy, sorting.type, sorting.dir);

    dispatch(setWearables(wearablesCopy));
};
