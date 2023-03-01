import { createContext, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { Erc1155Categories, Erc721Categories, InstallationTypeNames, ItemTypeNames } from 'shared/constants';
import { PageNavLink, SortingItem, WearableTypeBenefit } from 'shared/models';
import { onLoadFakeGotchis, resetFakeGotchis, selectFakeGotchisLength } from 'pages/Client/store';
import {
  GotchiIcon,
  KekIcon,
  RareTicketIcon,
  WarehouseIcon,
  AnvilIcon,
  FakeGotchisIcon,
  BaazarIcon
} from 'components/Icons/Icons';
import { SubNav } from 'components/PageNav/SubNav';
import { EthersApi, InstallationsApi, MainApi, TheGraphApi, TicketsApi, TilesApi } from 'api';
import { WEARABLES_TYPES_BENEFITS } from 'data/wearable-types-benefits.data';
import { CommonUtils, GraphUtils, InstallationsUtils, ItemUtils, TilesUtils } from 'utils';

// store
import * as fromDataReloadStore from 'core/store/data-reload';
import * as fromClientStore from 'pages/Client/store';

const loadedDefaultStates: { [key: string]: boolean } = {
  isInventoryLoaded: false,
  isTicketsLoaded: false,
  isRealmLoaded: false,
  isInstallationsLoaded: false,
  isTilesLoaded: false,
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
  const fakeGotchisLength: number = useAppSelector(selectFakeGotchisLength);

  const [gotchis] = useState<any[]>([]);

  const [warehouse, setWarehouse] = useState<any[]>([]);
  const [warehouseSorting, setWarehouseSorting] = useState<SortingItem>({ type: 'rarityId', dir: 'desc' });
  const [loadingWarehouse, setLoadingWarehouse] = useState<boolean>(false);

  const [installations, setInstallations] = useState<any[]>([]);
  const [loadingInstallations, setLoadingInstallations] = useState<boolean>(true);

  const [tiles, setTiles] = useState<any[]>([]);
  const [loadingTiles, setLoadingTiles] = useState<boolean>(true);

  const [tickets, setTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState<boolean>(true);

  const [realm, setRealm] = useState<any[]>([]);
  const [realmSorting, setRealmSorting] = useState<SortingItem>({ type: 'size', dir: 'desc' });
  const [loadingRealm, setLoadingRealm] = useState<boolean>(true);

  const [reward, setReward] = useState<any>(null);
  const [rewardCalculating, setRewardCalculating] = useState<boolean>(false);
  const [rewardCalculated, setRewardCalculated] = useState<boolean>(false);
  const [realmView, setRealmView] = useState<string>('list');

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
      name: 'warehouse',
      path: 'warehouse',
      icon: <WarehouseIcon width={24} height={24} />,
      isLoading: loadingWarehouse,
      count: warehouse.length
    },
    {
      name: 'installations',
      path: 'installations',
      icon: <AnvilIcon width={24} height={24} />,
      isLoading: loadingInstallations || loadingTiles,
      count: installations.length + tiles.length
    },
    {
      name: 'tickets',
      path: 'tickets',
      icon: <RareTicketIcon width={24} height={24} />,
      isLoading: loadingTickets,
      count: tickets.length
    },
    {
      name: 'realm',
      path: 'realm',
      icon: <KekIcon width={24} height={24} alt='realm' />,
      isLoading: loadingRealm,
      count: realm.length
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
    setWarehouse([]);
    dispatch(resetFakeGotchis());

    getInventory(address, shouldUpdateIsLoading);
    getTickets(address, shouldUpdateIsLoading);
    getRealm(address, shouldUpdateIsLoading);
    getInstallations(address, shouldUpdateIsLoading);
    getTiles(address, shouldUpdateIsLoading);
    getFakeGotchis(address, shouldUpdateIsLoading);
    getItemsForSale(address, shouldUpdateIsLoading);
  };

  const getInventory = (address: string, shouldUpdateIsLoading: boolean = false): void => {
    setLoadingWarehouse(shouldUpdateIsLoading);
    setLoadedStates((statesCache) => ({ ...statesCache, isInventoryLoaded: false }));

    MainApi.getInventoryByAddress(address)
      .then((response: any) => {
        const modified: any[] = [];
        const { type, dir } = warehouseSorting;

        response.items.forEach((item: any) => {
          const isConsumable = ItemUtils.getTypeNameById(item.itemId) === ItemTypeNames.Consumable;
          const rarityName = isConsumable ? 'drop' : ItemUtils.getRarityNameById(item.itemId);

          modified.push({
            id: Number(item.itemId),
            rarity: rarityName,
            rarityId: ItemUtils.getItemRarityId(rarityName),
            balance: Number(item.balance),
            category: isConsumable ? Erc1155Categories.Consumable : Erc1155Categories.Wearable
          });
        });

        setWarehouse((existing: any[]) =>
          CommonUtils.basicSort(
            [...existing, ...modified].reduce((items, current) => {
              const duplicated = items.find((item: any) => item.id === current.id);
              const wearableTypeBenefit: WearableTypeBenefit | undefined = WEARABLES_TYPES_BENEFITS.find(
                (benefit: WearableTypeBenefit) => benefit.ids.some((id: number) => id === current.id)
              );

              if (duplicated) {
                duplicated.balance += current.balance;
                duplicated.holders = current.holders;

                return items;
              }

              return items.concat({
                ...current,
                benefit: {
                  first: wearableTypeBenefit?.benefit.first,
                  second: wearableTypeBenefit?.benefit.second
                },
                itemType: wearableTypeBenefit?.type
              });
            }, []),
            type,
            dir
          )
        );
      })
      .catch((error) => {
        console.log(error);
        setWarehouse([]);
      })
      .finally(() => {
        setLoadingWarehouse(false);
        setLoadedStates((statesCache) => ({ ...statesCache, isInventoryLoaded: true }));
      });
  };

  const getInstallations = (address: string, shouldUpdateIsLoading: boolean = false): void => {
    setLoadingInstallations(shouldUpdateIsLoading);
    setLoadedStates((statesCache) => ({ ...statesCache, isInstallationsLoaded: false }));

    InstallationsApi.getInstallationsByAddress(address).then((response) => {
      const installations: any[] = response
        .filter((item: any) => {
          const id: any = EthersApi.formatBigNumber(item.installationId._hex);

          return InstallationsUtils.getIsInstallationExist(id);
        })
        .map((item: any) => {
          const id: any = EthersApi.formatBigNumber(item.installationId._hex);

          return {
            name: InstallationsUtils.getNameById(id),
            balance: EthersApi.formatBigNumber(item.balance._hex),
            id: id,
            level: InstallationsUtils.getLevelById(id),
            category: Erc1155Categories.Installation,
            rarity: InstallationsUtils.getRarityById(id),
            deprecated: InstallationsUtils.getDeprecatedById(id)
          };
        });

      setInstallations(installations);
      setLoadingInstallations(false);
      setLoadedStates((statesCache) => ({ ...statesCache, isInstallationsLoaded: true }));
    });
  };

  const getTiles = (address: string, shouldUpdateIsLoading: boolean = false): void => {
    setLoadingTiles(shouldUpdateIsLoading);
    setLoadedStates((statesCache) => ({ ...statesCache, isTilesLoaded: false }));

    TilesApi.getTilesByAddress(address).then((response: any) => {
      const tiles: any[] = response
        .filter((item: any) => {
          const id: any = EthersApi.formatBigNumber(item.tileId._hex);

          return TilesUtils.getIsTileExists(id);
        })
        .map((item: any) => {
          const id: any = EthersApi.formatBigNumber(item.tileId._hex);

          return {
            name: TilesUtils.getNameById(id),
            balance: EthersApi.formatBigNumber(item.balance._hex),
            id: id,
            rarity: 'golden',
            category: Erc1155Categories.Tile,
            deprecated: TilesUtils.getDeprecatedById(id)
          };
        });

      setTiles(tiles);
      setLoadingTiles(false);
      setLoadedStates((statesCache) => ({ ...statesCache, isTilesLoaded: true }));
    });
  };

  const getTickets = (address: string, shouldUpdateIsLoading: boolean = false): void => {
    setLoadingTickets(shouldUpdateIsLoading);
    setLoadedStates((statesCache) => ({ ...statesCache, isTicketsLoaded: false }));

    TicketsApi.getTicketsByAddress(address)
      .then((response: any) => {
        const modified = response.filter((item: any) => item.balance > 0);

        setTickets(modified);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingTickets(false);
        setLoadedStates((statesCache) => ({ ...statesCache, isTicketsLoaded: true }));
      });
  };

  const getRealm = (address: string, shouldUpdateIsLoading: boolean = false): void => {
    setLoadingRealm(shouldUpdateIsLoading);
    setLoadedStates((statesCache) => ({ ...statesCache, isRealmLoaded: false }));

    TheGraphApi.getRealmByAddress(address)
      .then((response) => {
        const modifiedParcels = response.map((parcel: any) => {
          const installations: any[] = InstallationsUtils.combineInstallations(parcel.installations);
          const tiles: any[] = TilesUtils.combineTiles(parcel.tiles);
          const altar = installations.find((installation: any) => installation.type === InstallationTypeNames.Altar);
          const cooldown = altar ? InstallationsUtils.getCooldownByLevel(altar.level, 'seconds') : 0;

          return {
            ...parcel,
            cooldown: cooldown,
            nextChannel: parcel.lastChanneled + cooldown,
            altarLevel: altar ? altar.level : 0,
            installations: installations,
            tiles: tiles
          };
        });

        setRealm(modifiedParcels);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoadingRealm(false);
        setLoadedStates((statesCache) => ({ ...statesCache, isRealmLoaded: true }));
      });
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

  // TODO check if needed
  const calculateReward = () => {
    setRewardCalculating(true);

    TheGraphApi.getAllGotchies().then((response: any) => {
      const brsLeaders: any[] = CommonUtils.basicSort(response, 'modifiedRarityScore');
      const kinLeaders: any[] = CommonUtils.basicSort(response, 'kinship');
      const expLeaders: any[] = CommonUtils.basicSort(response, 'experience');

      gotchis.forEach((item: any, index: number) => {
        const BRS: any = GraphUtils.calculateRewards(
          brsLeaders.findIndex((x) => x.id === item.id),
          'BRS'
        );
        const KIN: any = GraphUtils.calculateRewards(
          kinLeaders.findIndex((x) => x.id === item.id),
          'KIN'
        );
        const EXP: any = GraphUtils.calculateRewards(
          expLeaders.findIndex((x) => x.id === item.id),
          'EXP'
        );

        gotchis[index] = {
          ...item,
          reward: BRS.reward + KIN.reward + EXP.reward,
          rewardStats: [BRS, KIN, EXP]
        };
      });

      setReward(gotchis.reduce((prev: any, next: any) => prev + next.reward, 0));
      setRewardCalculating(false);
      setRewardCalculated(true);
    });
  };

  return (
    <ClientContext.Provider
      value={{
        warehouse,
        warehouseSorting,
        loadingWarehouse,
        setWarehouse,
        setWarehouseSorting,

        installations,
        loadingInstallations,

        tiles,
        loadingTiles,

        tickets,
        loadingTickets,

        realm,
        realmView,
        realmSorting,
        loadingRealm,
        setRealm,
        setRealmView,
        setRealmSorting,
        setLoadingRealm,

        itemsForSale,
        isItemsForSaleLoading,
        isItemsForSaleEmpty,

        reward,
        rewardCalculated,
        rewardCalculating,
        calculateReward,

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
