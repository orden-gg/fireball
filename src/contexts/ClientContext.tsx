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

const loadedDefaultStates: { [key: string]: boolean } = {
  isGotchisLoaded: false,
  isLendingsLoaded: false,
  isBorrowedLoaded: false,
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

  const [gotchis, setGotchis] = useState<any[]>([]);
  const [gotchisSorting, setGotchisSorting] = useState<SortingItem>({ type: 'modifiedRarityScore', dir: 'desc' });
  const [loadingGotchis, setLoadingGotchis] = useState<boolean>(true);

  const [lendings, setLendings] = useState<any[]>([]);
  const [lendingsSorting, setLendingsSorting] = useState<SortingItem>({ type: 'kinship', dir: 'desc' });
  const [loadingLendings, setLoadingLendings] = useState<boolean>(true);

  const [borrowed, setBorrowed] = useState<any[]>([]);
  const [borrowedSorting, setBorrowedSorting] = useState<SortingItem>({ type: 'kinship', dir: 'desc' });
  const [loadingBorrowed, setLoadingBorrowed] = useState<boolean>(true);

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
      path: 'gotchis',
      icon: <GotchiIcon width={24} height={24} />,
      isLoading: loadingGotchis || loadingLendings || loadingBorrowed,
      count: gotchis.length + borrowed.length,
      isShowSubRoutes: true,
      tooltip: {
        title: (
          <>
            <SubNav
              links={[
                {
                  name: 'owned',
                  path: 'gotchis/owned',
                  isLoading: loadingGotchis,
                  count: gotchis.length
                },
                {
                  name: 'lendings',
                  path: 'gotchis/lended',
                  isLoading: loadingLendings,
                  count: lendings.length
                },
                {
                  name: 'borrowed',
                  path: 'gotchis/borrowed',
                  isLoading: loadingBorrowed,
                  count: borrowed.length
                }
              ]}
            />
          </>
        ),
        children: <></>,
        placement: 'bottom'
      }
    },
    {
      path: 'warehouse',
      icon: <WarehouseIcon width={24} height={24} />,
      isLoading: loadingWarehouse,
      count: warehouse.length
    },
    {
      path: 'installations',
      icon: <AnvilIcon width={24} height={24} />,
      isLoading: loadingInstallations || loadingTiles,
      count: installations.length + tiles.length
    },
    {
      path: 'tickets',
      icon: <RareTicketIcon width={24} height={24} />,
      isLoading: loadingTickets,
      count: tickets.length
    },
    {
      path: 'realm',
      icon: <KekIcon width={24} height={24} alt='realm' />,
      isLoading: loadingRealm,
      count: realm.length
    },
    {
      path: 'fake-gotchis',
      icon: <FakeGotchisIcon width={24} height={24} />,
      isLoading: false,
      count: fakeGotchisLength
    },
    {
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
    // reset
    setWarehouse([]);
    dispatch(resetFakeGotchis());

    getGotchis(address, shouldUpdateIsLoading);
    getLendings(address, shouldUpdateIsLoading);
    getBorrowed(address, shouldUpdateIsLoading);
    getInventory(address, shouldUpdateIsLoading);
    getTickets(address, shouldUpdateIsLoading);
    getRealm(address, shouldUpdateIsLoading);
    getInstallations(address, shouldUpdateIsLoading);
    getTiles(address, shouldUpdateIsLoading);
    getFakeGotchis(address, shouldUpdateIsLoading);
    getItemsForSale(address, shouldUpdateIsLoading);
  };

  const getGotchis = (address: string, shouldUpdateIsLoading: boolean = false): void => {
    setLoadingGotchis(shouldUpdateIsLoading);
    setLoadedStates((statesCache) => ({ ...statesCache, isGotchisLoaded: false }));

    Promise.all([TheGraphApi.getGotchisByAddress(address), TheGraphApi.getOwnedGotchis(address)])
      .then((response: [any[], any[]]) => {
        const allGotchis = response[0].concat(response[1]);
        const wearables: any[] = [];
        const { type: gSortType, dir: gSortDir } = gotchisSorting;
        const { type: wSortType, dir: wSortDir } = warehouseSorting;

        // collect all equipped wearables
        allGotchis.forEach((item: any) => {
          const equippedIds: number[] = item.equippedWearables.filter((item: number) => item > 0);

          for (const wearableId of equippedIds) {
            const index: number = wearables.findIndex((item: any) => item.id === wearableId);

            if ((wearableId >= 162 && wearableId <= 198) || wearableId === 210) continue; // skip badges or h1 bg

            if (wearables[index] === undefined) {
              wearables.push({
                id: wearableId,
                balance: 1,
                rarity: ItemUtils.getRarityNameById(wearableId),
                rarityId: ItemUtils.getItemRarityId(ItemUtils.getRarityNameById(wearableId)),
                holders: [item.id],
                category: Erc1155Categories.Wearable
              });
            } else {
              wearables[index].balance += 1;
              wearables[index].holders.push(item.id);
            }
          }
        });

        setWarehouse((existing: any[]) =>
          CommonUtils.basicSort(
            [...existing, ...wearables].reduce((items: any[], current: any) => {
              const wearableTypeBenefit:
                | WearableTypeBenefit
                | undefined = WEARABLES_TYPES_BENEFITS.find((benefit: WearableTypeBenefit) =>
                benefit.ids.some((id: number) => id === current.id)
              );
              const duplicated: any = items.find((item: any) => item.id === current.id);

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
            wSortType,
            wSortDir
          )
        );

        setGotchis(CommonUtils.basicSort(allGotchis, gSortType, gSortDir));
      })
      .catch((error: any) => {
        console.log(error);
        setGotchis([]);
      })
      .finally(() => {
        setLoadingGotchis(false);
        setLoadedStates((statesCache) => ({ ...statesCache, isGotchisLoaded: true }));
      });
  };

  const getLendings = (address: string, shouldUpdateIsLoading: boolean = false): void => {
    setLoadingLendings(shouldUpdateIsLoading);
    setLoadedStates((statesCache) => ({ ...statesCache, isLendingsLoaded: false }));

    TheGraphApi.getLendingsByAddress(address).then((lendings: any[]) => {
      const { type, dir } = lendingsSorting;

      lendings.forEach((lending) => {
        lending.endTime = parseInt(lending.timeAgreed) + parseInt(lending.period);
      });

      setLendings(CommonUtils.basicSort(lendings, type, dir));
      setLoadingLendings(false);
      setLoadedStates((statesCache) => ({ ...statesCache, isLendingsLoaded: true }));
    });
  };

  const getBorrowed = (address: string, shouldUpdateIsLoading: boolean = false): void => {
    setLoadingBorrowed(shouldUpdateIsLoading);
    setLoadedStates((statesCache) => ({ ...statesCache, isBorrowedLoaded: false }));

    TheGraphApi.getBorrowedByAddress(address).then((borrowed: any[]) => {
      const { type, dir } = borrowedSorting;

      setBorrowed(CommonUtils.basicSort(borrowed, type, dir));
      setLoadingBorrowed(false);
      setLoadedStates((statesCache) => ({ ...statesCache, isBorrowedLoaded: true }));
    });
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
              const wearableTypeBenefit:
                | WearableTypeBenefit
                | undefined = WEARABLES_TYPES_BENEFITS.find((benefit: WearableTypeBenefit) =>
                benefit.ids.some((id: number) => id === current.id)
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
        gotchis,
        gotchisSorting,
        loadingGotchis,
        setGotchis,
        setGotchisSorting,

        lendings,
        lendingsSorting,
        loadingLendings,
        setLendings,
        setLendingsSorting,

        borrowed,
        borrowedSorting,
        loadingBorrowed,
        setBorrowed,
        setBorrowedSorting,

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
