import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import { EthersApi } from 'api';

import { AppThunk } from 'core/store/store';

import { GraphQueryParams } from 'shared/models';

import { InstallationsUtils } from 'utils';

import { ActivityInstallationListingDTO, ActivityInstallationListingVM } from '../../models';
import { getBaazaarErc1155PurchasesQuery } from '../../queries';
// slices
import * as activityInstallationsListingsSlices from '../slices/activity-installations-listings.slice';

export const loadBaazaarActivityInstallationsListings = (): AppThunk => (dispatch, getState) => {
  dispatch(activityInstallationsListingsSlices.loadActivityInstallationsListings());

  const activityInstallationsListingsGraphQueryParams: GraphQueryParams =
    getState().baazaar.activity.installations.activityInstallationsListingsGraphQueryParams;

  const query = getBaazaarErc1155PurchasesQuery(activityInstallationsListingsGraphQueryParams);

  BaazaarGraphApi.getErc1155Purchases<ActivityInstallationListingDTO>(query)
    .then((wearablesListings: ActivityInstallationListingDTO[]) => {
      const modifiedListings: ActivityInstallationListingVM[] = mapActivityInstallationsDTOToVM(wearablesListings);

      dispatch(activityInstallationsListingsSlices.loadActivityInstallationsListingsSucceded(modifiedListings));
    })
    .catch(() => {
      dispatch(activityInstallationsListingsSlices.loadActivityInstallationsListingsFailed());
    });
};

export const resetActivityInstallationsData = (): AppThunk => (dispatch) => {
  dispatch(activityInstallationsListingsSlices.resetActivityInstallationsListings());
};

const mapActivityInstallationsDTOToVM = (
  listings: ActivityInstallationListingDTO[]
): ActivityInstallationListingVM[] => {
  return listings.map((listing: ActivityInstallationListingDTO) => {
    return {
      ...listing,
      id: Number(listing.listingID),
      erc1155TypeId: Number(listing.erc1155TypeId),
      quantity: Number(listing.quantity),
      timeLastPurchased: Number(listing.timeLastPurchased),
      name: InstallationsUtils.getNameById(listing.erc1155TypeId),
      imageSrcUrl: InstallationsUtils.getImageById(listing.erc1155TypeId),
      rarity: InstallationsUtils.getRarityById(listing.erc1155TypeId),
      isDeprecated: InstallationsUtils.getDeprecatedById(listing.erc1155TypeId),
      currentListing: {
        id: Number(listing.listingID),
        price: EthersApi.fromWei(listing.priceInWei)
      },
      lastSoldListing: {
        id: Number(listing.listingID),
        price: EthersApi.fromWei(listing.priceInWei),
        soldDate: new Date(Number(listing.timeLastPurchased) * 1000).toJSON()
      }
    };
  });
};
