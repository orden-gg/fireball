import { createContext, useEffect, useState } from 'react';

import { EthersApi, TheGraphApi } from 'api';

import * as fromDataReloadStore from 'core/store/data-reload';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
// store
import * as fromClientStore from 'pages/Client/store';
import { onLoadFakeGotchis, resetFakeGotchis, selectFakeGotchisLength } from 'pages/Client/store';

import { Erc721Categories, Erc1155Categories, InstallationTypeNames } from 'shared/constants';
import { PageNavLink } from 'shared/models';

import {
  AnvilIcon,
  BaazarIcon,
  FakeGotchisIcon,
  GotchiIcon,
  H1SealedPortalIcon,
  KekIcon,
  RareTicketIcon,
  WarehouseIcon
} from 'components/Icons/Icons';
import { SubNav } from 'components/PageNav/SubNav';

import { CommonUtils, InstallationsUtils, ItemUtils, TilesUtils } from 'utils';

const loadedDefaultStates: { [key: string]: boolean } = {
  isItemsForSaleLoaded: false
};

export const ClientContext = createContext({});

export const ClientContextProvider = (props: any) => {
  const dispatch = useAppDispatch();

  const ownedGotchisLength: number = useAppSelector(fromClientStore.getOwnedGotchisLength);
  const isOwnedGotchisLoading: boolean = useAppSelector(fromClientStore.getIsOwnedGotchisLoading);
  const lentGotchisLength: number = useAppSelector(fromClientStore.getLentGotchisLength);
  const isLentGotchisLoading: boolean = useAppSelector(fromClientStore.getIsLentGotchisLoading);
  const borrowedGotchisLength: number = useAppSelector(fromClientStore.getBorrowedGotchisLength);
  const isBorrowedGotchisLoading: boolean = useAppSelector(fromClientStore.getIsBorrowedGotchisLoading);
  const portalsLength: number = useAppSelector(fromClientStore.getPortalsLength);
  const isPortalsLoading: boolean = useAppSelector(fromClientStore.getIsPortalsLoading);
  const ticketsLength: number = useAppSelector(fromClientStore.getTicketsLength);
  const isTicketsLoading: boolean = useAppSelector(fromClientStore.getIsTicketsLoading);
  const warehouseLength: number = useAppSelector(fromClientStore.getWarehouseLength);
  const isWarehouseLoading: boolean = useAppSelector(fromClientStore.getIsWarehouseLoading);
  const installationsLength: number = useAppSelector(fromClientStore.getInstallationsLength);
  const isInstallationsLoading: boolean = useAppSelector(fromClientStore.getIsInstallationsLoading);
  const tilesLength: number = useAppSelector(fromClientStore.getTilesLength);
  const isTilesLoading: boolean = useAppSelector(fromClientStore.getIsTilesLoading);
  const realmLength: number = useAppSelector(fromClientStore.getRealmLength);
  const isRealmLoading: boolean = useAppSelector(fromClientStore.getIsRealmLoading);
  const fakeGotchisLength: number = useAppSelector(selectFakeGotchisLength);

  const [itemsForSale, setItemsForSale] = useState<{
    gotchis: any[];
    wearables: any[];
    parcels: any[];
    portals: any[];
    tickets: any[];
    consumables: any[];
  }>({
    gotchis: [],
    wearables: [],
    parcels: [],
    portals: [],
    tickets: [],
    consumables: []
  });
  const [isItemsForSaleLoading, setIsItemsForSaleLoading] = useState<boolean>(false);
  const [isItemsForSaleEmpty, setIsItemsForSaleEmpty] = useState<boolean>(true);

  const [canBeUpdated, setCanBeUpdated] = useState<boolean>(false);
  const [loadedStates, setLoadedStates] = useState<{ [key: string]: boolean }>(loadedDefaultStates);

  const navData: PageNavLink[] = [
    {
      name: 'gotchis',
      path: 'gotchis',
      icon: <GotchiIcon width={24} height={24} />,
      isLoading: isOwnedGotchisLoading || isLentGotchisLoading || isBorrowedGotchisLoading,
      count: ownedGotchisLength + borrowedGotchisLength,
      isShowSubRoutes: true,
      subNavComponent: (
        <SubNav
          links={[
            {
              name: 'owned',
              path: 'gotchis/owned',
              isLoading: isOwnedGotchisLoading,
              count: ownedGotchisLength
            },
            {
              name: 'lendings',
              path: 'gotchis/lended',
              isLoading: isLentGotchisLoading,
              count: lentGotchisLength
            },
            {
              name: 'borrowed',
              path: 'gotchis/borrowed',
              isLoading: isBorrowedGotchisLoading,
              count: borrowedGotchisLength
            }
          ]}
        />
      )
    },
    {
      name: 'portals',
      path: 'portals',
      icon: <H1SealedPortalIcon width={24} height={24} />,
      isLoading: isPortalsLoading,
      count: portalsLength
    },
    {
      name: 'warehouse',
      path: 'warehouse',
      icon: <WarehouseIcon width={24} height={24} />,
      isLoading: isWarehouseLoading,
      count: warehouseLength
    },
    {
      name: 'installations',
      path: 'installations',
      icon: <AnvilIcon width={24} height={24} />,
      isLoading: isInstallationsLoading || isTilesLoading,
      count: installationsLength + tilesLength
    },
    {
      name: 'tickets',
      path: 'tickets',
      icon: <RareTicketIcon width={24} height={24} />,
      isLoading: isTicketsLoading,
      count: ticketsLength
    },
    {
      name: 'realm',
      path: 'realm',
      icon: <KekIcon width={24} height={24} alt='realm' />,
      isLoading: isRealmLoading,
      count: realmLength
    },
    {
      name: 'fake gotchis',
      path: 'fake-gotchis',
      icon: <FakeGotchisIcon width={24} height={24} />,
      isLoading: false,
      count: fakeGotchisLength
    },
    {
      name: 'for sale',
      path: 'for-sale',
      icon: <BaazarIcon width={24} height={24} />,
      isLoading: isItemsForSaleLoading,
      count:
        itemsForSale.consumables.length +
        itemsForSale.gotchis.length +
        itemsForSale.parcels.length +
        itemsForSale.portals.length +
        itemsForSale.tickets.length +
        itemsForSale.wearables.length
    }
  ];

  useEffect(() => {
    const isAllLoaded = Object.keys(loadedStates).every((key) => loadedStates[key]);

    if (isAllLoaded) {
      dispatch(fromDataReloadStore.setLastUpdatedTimestamp(Date.now()));
      dispatch(fromDataReloadStore.setIsReloadDisabled(false));
      setCanBeUpdated(true);
    } else {
      dispatch(fromDataReloadStore.setIsReloadDisabled(true));
      setCanBeUpdated(false);
    }
  }, [loadedStates]);

  const getClientData = (address: string, shouldUpdateIsLoading: boolean = false): void => {
    dispatch(fromClientStore.onLoadClientData(address));

    // reset
    dispatch(resetFakeGotchis());

    getFakeGotchis(address, shouldUpdateIsLoading);
    getItemsForSale(address, shouldUpdateIsLoading);
  };

  const getFakeGotchis = (address: string, shouldUpdateIsLoading: boolean = false): void => {
    dispatch(onLoadFakeGotchis(address, shouldUpdateIsLoading));
  };

  const getItemsForSale = (address: string, shouldUpdateIsLoading: boolean = false): void => {
    if (shouldUpdateIsLoading) {
      resetItemsForSale();
    }
    setIsItemsForSaleLoading(shouldUpdateIsLoading);
    setLoadedStates((statesCache) => ({ ...statesCache, isItemsForSaleLoaded: false }));

    Promise.all([
      TheGraphApi.getErc721ListingsBySeller(address),
      TheGraphApi.getRealmListingsBySeller(address), // TODO should be removed after full integration of fireball gotchiverse graph.
      TheGraphApi.getErc1155ListingsBySeller(address)
    ])
      .then(([erc721Listings, realmListings, erc1155Listings]: [any, any, any]) => {
        const isListingsEmpty =
          erc721Listings.length === 0 && erc1155Listings.length === 0 && realmListings.length === 0;

        setIsItemsForSaleEmpty(isListingsEmpty);

        if (isListingsEmpty) {
          resetItemsForSale();
        } else {
          handleSetErc721Listings(erc721Listings);
          handleSetErc1155Listings(erc1155Listings);

          setItemsForSale((itemsForSaleCache) => ({
            ...itemsForSaleCache,
            parcels: getModifiedRealmListings(realmListings)
          }));
        }
      })
      .catch(() => {
        resetItemsForSale();
      })
      .finally(() => {
        setIsItemsForSaleLoading(false);
        setLoadedStates((statesCache) => ({ ...statesCache, isItemsForSaleLoaded: true }));
      });
  };

  const resetItemsForSale = (): void => {
    setItemsForSale({
      gotchis: [],
      wearables: [],
      parcels: [],
      portals: [],
      tickets: [],
      consumables: []
    });
  };

  const handleSetErc721Listings = (listings: any[]): void => {
    const listedGotchis: any[] = listings
      .filter((listing: any) => listing.category === Erc721Categories.Aavegotchi)
      .map((listing: any) => listing.gotchi);
    const sortedGotchis: any[] = CommonUtils.basicSort(listedGotchis, 'baseRarityScore', 'desc');

    const listedPortals: any[] = listings
      .filter(
        (listing: any) =>
          listing.category === Erc721Categories.ClosedPortal || listing.category === Erc721Categories.OpenedPortal
      )
      .map((listing: any) => ({
        priceInWei: listing.priceInWei,
        category: listing.category,
        tokenId: listing.tokenId,
        portal: {
          hauntId: listing.portal.hauntId
        },
        historicalPrices: listing.portal.historicalPrices ? listing.portal.historicalPrices : [],
        listingId: listing.portal.activeListing,
        listingPrice: EthersApi.fromWei(listing.priceInWei)
      }));
    const sortedPortals: any[] = CommonUtils.basicSort(listedPortals, 'tokenId', 'asc');

    setItemsForSale((itemsForSaleCache) => ({
      ...itemsForSaleCache,
      gotchis: sortedGotchis,
      portals: sortedPortals
    }));
  };

  const handleSetErc1155Listings = (listings: any[]): void => {
    const listedWearables: any[] = listings
      .filter((listing: any) => listing.category === Erc1155Categories.Wearable)
      .map((listing: any) => ({
        ...mapWearableAndTicket(listing),
        category: listing.category
      }));
    const sortedWearables: any[] = CommonUtils.basicSort(listedWearables, 'rarityId', 'desc');

    const listedTickets: any[] = listings
      .filter((listing: any) => listing.category === Erc1155Categories.Ticket)
      .map((listing: any) => ({
        ...mapWearableAndTicket(listing),
        erc1155TypeId: listing.erc1155TypeId,
        category: listing.category
      }));
    const sortedTickets: any[] = CommonUtils.basicSort(listedTickets, 'rarityId', 'desc');

    const listedConsumables = listings
      .filter((listing: any) => listing.category === Erc1155Categories.Consumable)
      .map((listing: any) => ({
        id: parseInt(listing.erc1155TypeId, 10),
        balance: parseInt(listing.quantity, 10),
        listing: listing.id,
        price: EthersApi.fromWei(listing.priceInWei),
        category: listing.category
      }));

    setItemsForSale((itemsForSaleCache) => ({
      ...itemsForSaleCache,
      wearables: sortedWearables,
      tickets: sortedTickets,
      consumables: listedConsumables
    }));
  };

  const getModifiedRealmListings = (realmListings: any[]): any[] => {
    const listedParcels: any[] = realmListings.map((listing: any) => {
      const installations: any[] = InstallationsUtils.combineInstallations(listing.parcel.installations);
      const tiles: any[] = TilesUtils.combineTiles(listing.parcel.tiles);
      const altar: any = installations.find((installation: any) => installation.type === InstallationTypeNames.Altar);

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
    const sortedParcels: any[] = CommonUtils.basicSort(listedParcels, 'size', 'desc');

    return sortedParcels;
  };

  const mapWearableAndTicket = (listing: any): any => {
    return {
      id: parseInt(listing.erc1155TypeId, 10),
      balance: parseInt(listing.quantity, 10),
      category: listing.category,
      listing: listing.id,
      rarity: ItemUtils.getRarityNameById(listing.erc1155TypeId),
      rarityId: listing.rarityLevel,
      priceInWei: listing.priceInWei,
      price: EthersApi.fromWei(listing.priceInWei)
    };
  };

  return (
    <ClientContext.Provider
      value={{
        itemsForSale,
        isItemsForSaleLoading,
        isItemsForSaleEmpty,

        navData,
        getClientData,

        canBeUpdated,
        setCanBeUpdated,
        setLoadedStates
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};
