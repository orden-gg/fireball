import { ClientApi } from '../../api';
import { EthersApi, TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import { Erc721Categories } from 'shared/constants';
import { Erc721Listing, Erc721ListingsBatch, SortingItem } from 'shared/models';

import { CommonUtils } from 'utils';

import { ClientPortal, Portal } from '../../models';
import { loadPortals, loadPortalsFailed, loadPortalsSucceded } from '../slices';

export const onLoadPortals =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(loadPortals());

    const { type, dir }: SortingItem = getState().client.portals.portalsSorting;

    TheGraphApi.getPortalsByAddress(address)
      .then((response: Portal[]) => {
        const portalsIds = response.map((item: Portal) => Number(item.id));

        const modifiedPortals: ClientPortal[] = response.map((portal: Portal) => ({
          ...portal,
          id: Number(portal.id),
          category: portal.openedAt ? Erc721Categories.OpenedPortal : Erc721Categories.ClosedPortal
        }));

        if (portalsIds.length > 0) {
          ClientApi.getErc721ListingsByCategories(portalsIds, [
            Erc721Categories.OpenedPortal,
            Erc721Categories.ClosedPortal
          ]).then((listings: Erc721ListingsBatch) => {
            const portalsWithListings: ClientPortal[] = getMappedPortalsWithListings(modifiedPortals, listings);
            const sortedPortals: ClientPortal[] = CommonUtils.basicSort(portalsWithListings, type, dir);

            dispatch(loadPortalsSucceded(sortedPortals));
          });
        } else {
          const sortedPortals: ClientPortal[] = CommonUtils.basicSort(modifiedPortals, type, dir);

          dispatch(loadPortalsSucceded(sortedPortals));
        }
      })
      .catch(() => dispatch(loadPortalsFailed()));
  };

const getMappedPortalsWithListings = (portals: ClientPortal[], listings: Erc721ListingsBatch): ClientPortal[] => {
  return portals.map((portal: ClientPortal) => {
    const lastSoldPortalListing: Erc721Listing = listings[`item${portal.id}`][0];

    return {
      ...portal,
      listingId: lastSoldPortalListing ? lastSoldPortalListing.id : null,
      listingPrice: lastSoldPortalListing ? Number(EthersApi.fromWei(lastSoldPortalListing.priceInWei)) : 0
    };
  });
};
