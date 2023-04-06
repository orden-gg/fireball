import { EthersApi, TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';
import { ClientPortal } from 'pages/Client/models';
import { ThePortalApi } from 'pages/Portal/api';
import { Erc721Categories } from 'shared/constants';
import { Erc721Listing, Erc721ListingsBatch } from 'shared/models';
import * as portalSlices from '../slices/portal.slice';


// TO DO errors with listings
// export const onLoadPortal =
//   (id: number): AppThunk =>
//   (dispatch) => {
//     dispatch(portalSlices.loadPortal());

//     TheGraphApi.getPortalById(id)
//       .then((response: ClientPortal) => {
//         const portalId = response.id;

//         const modifiedPortal: ClientPortal = {
//           ...response,
//           id: Number(response.id),
//           category: response.openedAt ? Erc721Categories.OpenedPortal : Erc721Categories.ClosedPortal
//         };

//         ThePortalApi.getErc721ListingsByCategories(portalId, [
//             Erc721Categories.OpenedPortal,
//             Erc721Categories.ClosedPortal
//           ]).then((listings: Erc721ListingsBatch) => {
//             const portalWithListings: ClientPortal = getMappedPortalWithListings(modifiedPortal, listings);

//             dispatch(portalSlices.loadPortalSucceded(portalWithListings));
//           });
//       })
//       .catch(() => dispatch(portalSlices.loadPortalFailed()))
//       .finally(() => dispatch(portalSlices.setIsInitialPortalLoading(false)));
//   };

// const getMappedPortalWithListings = (portal: ClientPortal, listings: Erc721ListingsBatch): ClientPortal => {
//     const lastSoldPortalListing: Erc721Listing = listings[`item${portal.id}`][0];

//     return {
//       ...portal,
//       listingId: lastSoldPortalListing ? lastSoldPortalListing.id : null,
//       listingPrice: lastSoldPortalListing ? Number(EthersApi.fromWei(lastSoldPortalListing.priceInWei)) : 0
//     };
// };

export const onLoadPortal =
  (id: number): AppThunk =>
  (dispatch) => {
    dispatch(portalSlices.loadPortal());

  TheGraphApi.getPortalById(id)
    .then((response: ClientPortal) => dispatch(portalSlices.loadPortalSucceded(response)))
    .catch(() => dispatch(portalSlices.loadPortalFailed()))
    .finally(() => dispatch(portalSlices.setIsInitialPortalLoading(false)));
};
