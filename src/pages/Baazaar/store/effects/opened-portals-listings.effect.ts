import { AppThunk } from 'core/store/store';
import { TraitNumberType } from 'shared/constants';
import { SortingItem } from 'shared/models';

import { OpenedPortalListingDTO, OpenedPortalListingVM } from '../../models';
import { getBaazaarOpenedPortalsListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
  loadOpenedPortalsListings,
  loadOpenedPortalsListingsSucceded,
  loadOpenedPortalsListingsFailed,
  resetOpenedPortalsListings,
  setOpenedPortalsListingsSorting,
  setOpenedPortalsPreviousSortingProp
} from '../slices';
import { ASCENDING_DIRECTION, PRICE_IN_WEI } from 'pages/Baazaar/constants';

export const loadBaazaarOpenedPortalsListings = (): AppThunk => dispatch => {
  dispatch(loadOpenedPortalsListings());

  const query = getBaazaarOpenedPortalsListingsQuery();

  BaazaarGraphApi.getErc721Listings<OpenedPortalListingDTO>(query)
    .then((res: OpenedPortalListingDTO[]) => {
      const modifiedListings: OpenedPortalListingVM[] = mapOpenedPortalsDTOToVM(res);

      dispatch(loadOpenedPortalsListingsSucceded(modifiedListings));
    })
    .catch(() => {
      dispatch(loadOpenedPortalsListingsFailed());
    });
};

export const onSetOpenedPortalsListingsSorting = (sort: SortingItem): AppThunk => (dispatch, getState) => {
  let direction: string = sort.dir;
  const previousSortingProp: string = getState().baazaar.openedPortals.openedPortalsPreviousSortingProp;

  if (sort.type === PRICE_IN_WEI && previousSortingProp && previousSortingProp !== PRICE_IN_WEI) {
    direction = ASCENDING_DIRECTION;
  }

  dispatch(setOpenedPortalsListingsSorting({ type: sort.type, dir: direction }));
  dispatch(setOpenedPortalsPreviousSortingProp(sort.type));
};

export const resetOpenedPortalsData = (): AppThunk => (dispatch, getState) => {
  const defaultSorting: SortingItem = getState().baazaar.installations.installationsListingsDefaultSorting;

  dispatch(resetOpenedPortalsListings());
  dispatch(setOpenedPortalsListingsSorting(defaultSorting));
};

const mapOpenedPortalsDTOToVM = (listings: OpenedPortalListingDTO[]): OpenedPortalListingVM[] => {
  const items: OpenedPortalListingVM[] = [];

  listings.forEach((listing: OpenedPortalListingDTO) => {
    listing.portal.options.forEach(option => {
      items.push({
        id: listing.id,
        tokenId: listing.tokenId,
        hauntId: listing.hauntId,
        priceInWei: listing.priceInWei,
        timeCreated: listing.timeCreated,
        baseRarityScore: option.baseRarityScore,
        numericTraits: option.numericTraits,
        collateral: option.collateralType,
        nrgTrait: option.numericTraits[TraitNumberType.Nrg],
        aggTrait: option.numericTraits[TraitNumberType.Agg],
        spkTrait: option.numericTraits[TraitNumberType.Spk],
        brnTrait: option.numericTraits[TraitNumberType.Brn],
        eysTrait: option.numericTraits[TraitNumberType.Eys],
        eycTrait: option.numericTraits[TraitNumberType.Eyc],
        gotchi: {
          tempId: option.id,
          collateral: option.collateralType,
          hauntId: listing.hauntId,
          id: option.id.split('-')[0],
          kinship: 50,
          level: 1,
          expirience: 0,
          toNextLevel: 50,
          numericTraits: option.numericTraits,
          modifiedNumericTraits: option.numericTraits,
          baseRarityScore: option.baseRarityScore,
          modifiedRarityScore: option.baseRarityScore,
          equippedWearables: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      });
    });
  });

  return items;
};
