import { ClientApi } from '../../api';
import { EthersApi } from 'api';

import { AppThunk } from 'core/store/store';

import { Erc721Categories, Erc1155Categories, InstallationTypeNames, RarityTypes } from 'shared/constants';
import { ParcelInstallationVM, ParcelTileVM } from 'shared/models';

import { CommonUtils, InstallationsUtils, ItemUtils, TilesUtils } from 'utils';

import {
  ConsumableForSale,
  Erc721ForSaleDTO,
  Erc1155ForSaleDTO,
  Erc1155ForSaleVM,
  GotchiForSale,
  ParcelForSaleDTO,
  ParcelForSaleVM,
  PortalForSaleVM,
  TicketForSale,
  WearableForSale
} from '../../models';
import {
  initialItemsForSale,
  loadItemsForSale,
  loadItemsForSaleFailed,
  loadItemsForSaleSucceded,
  resetItemsForSale,
  setIsInitialItemsForSaleLoading
} from '../slices';

export const onLoadItemsForSale =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(loadItemsForSale());

    Promise.all([
      ClientApi.getErc721ListingsBySeller(address),
      ClientApi.getRealmListingsBySeller(address), // TODO should be removed after full integration of fireball gotchiverse graph.
      ClientApi.getErc1155ListingsBySeller(address)
    ])
      .then(
        ([erc721Listings, realmListings, erc1155Listings]: [
          Erc721ForSaleDTO[],
          ParcelForSaleDTO[],
          Erc1155ForSaleDTO[]
        ]) => {
          const isListingsEmpty: boolean =
            erc721Listings.length === 0 && erc1155Listings.length === 0 && realmListings.length === 0;

          if (isListingsEmpty) {
            dispatch(loadItemsForSaleSucceded({ ...initialItemsForSale }));
          } else {
            const listedGotchis: GotchiForSale[] = getMappedListedGotchis(erc721Listings);
            const listedPortlas: PortalForSaleVM[] = getMappedListedPortals(erc721Listings);
            const listedParcels: ParcelForSaleVM[] = getMappedListedParcels(realmListings);
            const listedWearables: WearableForSale[] = getMappedListedWearables(erc1155Listings);
            const listedTickets: TicketForSale[] = getMappedListedTickets(erc1155Listings);
            const listedConsumables: ConsumableForSale[] = getMappedListedConsumables(erc1155Listings);

            dispatch(
              loadItemsForSaleSucceded({
                gotchis: listedGotchis,
                portals: listedPortlas,
                parcels: listedParcels,
                wearables: listedWearables,
                tickets: listedTickets,
                consumables: listedConsumables
              })
            );
          }
        }
      )
      .catch(() => {
        dispatch(resetItemsForSale());
        dispatch(loadItemsForSaleFailed());
      })
      .finally(() => dispatch(setIsInitialItemsForSaleLoading(false)));
  };

const getMappedListedGotchis = (listings: Erc721ForSaleDTO[]): GotchiForSale[] => {
  const listedGotchis: GotchiForSale[] = listings
    .filter((listing: Erc721ForSaleDTO) => listing.category === Erc721Categories.Aavegotchi)
    .map((listing: Erc721ForSaleDTO) => listing.gotchi!);
  const sortedGotchis: GotchiForSale[] = CommonUtils.basicSort(listedGotchis, 'baseRarityScore', 'desc');

  return sortedGotchis;
};

const getMappedListedPortals = (listings: Erc721ForSaleDTO[]): PortalForSaleVM[] => {
  const listedPortals: PortalForSaleVM[] = listings
    .filter(
      (listing: Erc721ForSaleDTO) =>
        listing.category === Erc721Categories.ClosedPortal || listing.category === Erc721Categories.OpenedPortal
    )
    .map((listing: Erc721ForSaleDTO) => ({
      priceInWei: listing.priceInWei,
      category: listing.category,
      tokenId: listing.tokenId,
      portal: {
        hauntId: listing.portal!.hauntId
      },
      historicalPrices: listing.portal!.historicalPrices,
      listingId: listing.portal!.activeListing,
      listingPrice: EthersApi.fromWei(listing.priceInWei)
    }));
  const sortedPortals: PortalForSaleVM[] = CommonUtils.basicSort(listedPortals, 'tokenId', 'asc');

  return sortedPortals;
};

const getMappedListedParcels = (listings: ParcelForSaleDTO[]): ParcelForSaleVM[] => {
  const listedParcels: ParcelForSaleVM[] = listings.map((listing: ParcelForSaleDTO) => {
    const installations: ParcelInstallationVM[] = InstallationsUtils.combineInstallations(listing.parcel.installations);
    const tiles: ParcelTileVM[] = TilesUtils.combineTiles(listing.parcel.tiles);
    const altar: ParcelInstallationVM | undefined = installations.find(
      (installation: ParcelInstallationVM) => installation.type === InstallationTypeNames.Altar
    );

    return {
      ...listing.parcel,
      altarLevel: altar ? altar.level : 0,
      installations: installations,
      tiles: tiles,
      historicalPrices: listing.parcel.historicalPrices ? listing.parcel.historicalPrices : [],
      listings: [
        {
          id: listing.id,
          priceInWei: listing.priceInWei
        }
      ]
    };
  });
  const sortedParcels: ParcelForSaleVM[] = CommonUtils.basicSort(listedParcels, 'size', 'desc');

  return sortedParcels;
};

const getMappedListedWearables = (listings: Erc1155ForSaleDTO[]): WearableForSale[] => {
  const listedWearables: WearableForSale[] = listings
    .filter((listing: Erc1155ForSaleDTO) => listing.category === Erc1155Categories.Wearable)
    .map((listing: Erc1155ForSaleDTO) => ({
      ...getMappedWearableAndTicket(listing)
    }));
  const sortedWearables: WearableForSale[] = CommonUtils.basicSort(listedWearables, 'rarityId', 'desc');

  return sortedWearables;
};

const getMappedListedTickets = (listings: Erc1155ForSaleDTO[]): TicketForSale[] => {
  const listedTickets: TicketForSale[] = listings
    .filter((listing: Erc1155ForSaleDTO) => listing.category === Erc1155Categories.Ticket)
    .map((listing: Erc1155ForSaleDTO) => ({
      ...getMappedWearableAndTicket(listing)
    }));
  const sortedTickets: TicketForSale[] = CommonUtils.basicSort(listedTickets, 'rarityId', 'desc');

  return sortedTickets;
};

const getMappedListedConsumables = (listings: Erc1155ForSaleDTO[]): ConsumableForSale[] => {
  return listings
    .filter((listing: Erc1155ForSaleDTO) => listing.category === Erc1155Categories.Consumable)
    .map((listing: Erc1155ForSaleDTO) => ({
      id: Number(listing.erc1155TypeId),
      balance: Number(listing.quantity),
      listingId: listing.id,
      rarity: RarityTypes.Common,
      price: EthersApi.fromWei(listing.priceInWei),
      category: listing.category
    }));
};

const getMappedWearableAndTicket = (listing: Erc1155ForSaleDTO): Erc1155ForSaleVM => {
  return {
    id: Number(listing.erc1155TypeId),
    balance: Number(listing.quantity),
    category: listing.category,
    listingId: listing.id,
    rarity: ItemUtils.getRarityNameById(listing.erc1155TypeId),
    rarityId: listing.rarityLevel,
    priceInWei: listing.priceInWei,
    price: EthersApi.fromWei(listing.priceInWei)
  };
};
