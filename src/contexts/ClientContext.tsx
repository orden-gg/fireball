import { createContext, useContext, useEffect, useState } from 'react';

import { Erc1155Categories, InstallationTypeNames, ItemTypeNames } from 'shared/constants';
import { DataReloadContextState, PageNavLink, SortingItem, WearableTypeBenefit } from 'shared/models';
import { GotchiIcon, KekIcon, RareTicketIcon, WarehouseIcon, AnvilIcon, LendingIcon } from 'components/Icons/Icons';
import { SubNav } from 'components/PageNav/SubNav';
import { EthersApi, InstallationsApi, MainApi, TheGraphApi, TicketsApi, TilesApi } from 'api';
import { WEARABLES_TYPES_BENEFITS } from 'data/wearable-types-benefits.data';
import { CommonUtils, GotchiverseUtils, GraphUtils, InstallationsUtils, ItemUtils, TilesUtils } from 'utils';

import { DataReloadContext } from './DataReloadContext';

const loadedDefaultStates: { [key: string]: boolean } = {
    isGotchisLoaded: false,
    isLendingsLoaded: false,
    isBorrowedLoaded: false,
    isInventoryLoaded: false,
    isTicketsLoaded: false,
    isRealmLoaded: false,
    isInstallationsLoaded: false,
    isTilesLoaded: false
};

export const ClientContext = createContext({});

export const ClientContextProvider = (props: any) => {
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

    const [canBeUpdated, setCanBeUpdated] = useState<boolean>(false);
    const [loadedStates, setLoadedStates] = useState<{ [key: string]: boolean }>(loadedDefaultStates);

    const { setLastUpdated, setIsReloadDisabled } = useContext<DataReloadContextState>(DataReloadContext);

    const navData: PageNavLink[] = [
        {
            name: 'gotchis',
            path: 'gotchis',
            icon: <GotchiIcon width={24} height={24} />,
            isLoading: loadingGotchis || loadingLendings || loadingBorrowed,
            count: gotchis.length + borrowed.length,
            isShowSubRoutes: true,
            subNavComponent: <SubNav links={[
                {
                    name: 'owned',
                    path: 'gotchis/owned',
                    icon: <GotchiIcon width={24} height={24} />,
                    isLoading: loadingGotchis,
                    count: gotchis.length
                },
                {
                    name: 'lendings',
                    path: 'gotchis/lended',
                    icon: <GotchiIcon width={24} height={24} />,
                    isLoading: loadingLendings,
                    count: lendings.length
                },
                {
                    name: 'borrowed',
                    path: 'gotchis/borrowed',
                    icon: <LendingIcon width={24} height={24} />,
                    isLoading: loadingBorrowed,
                    count: borrowed.length
                }
            ]} />
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
        }
    ];

    useEffect(() => {
        const isAllLoaded = Object.keys(loadedStates).every(key => loadedStates[key]);

        if (isAllLoaded) {
            setLastUpdated(Date.now());
            setIsReloadDisabled(false);
            setCanBeUpdated(true);
        } else {
            setIsReloadDisabled(true);
            setCanBeUpdated(false);
        }
    }, [loadedStates]);

    const getClientData = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        getGotchis(address, shouldUpdateIsLoading);
        getLendings(address, shouldUpdateIsLoading);
        getBorrowed(address, shouldUpdateIsLoading);
        getInventory(address, shouldUpdateIsLoading);
        getTickets(address, shouldUpdateIsLoading);
        getRealm(address, shouldUpdateIsLoading);
        getInstallations(address, shouldUpdateIsLoading);
        getTiles(address, shouldUpdateIsLoading);

        // reset
        setWarehouse([]);
    };

    const getGotchis = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setLoadingGotchis(shouldUpdateIsLoading);
        setLoadedStates(statesCache => ({ ...statesCache, isGotchisLoaded: false }));

        Promise.all([
            TheGraphApi.getGotchisByAddress(address),
            TheGraphApi.getOwnedGotchis(address)
        ]).then((response: [any[], any[]]) => {
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

            setWarehouse((existing: any[]) => CommonUtils.basicSort(
                [...existing, ...wearables].reduce((items: any[], current: any) => {
                    const wearableTypeBenefit: WearableTypeBenefit | undefined = WEARABLES_TYPES_BENEFITS
                        .find((benefit: WearableTypeBenefit) =>
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
                }, []), wSortType, wSortDir));

            setGotchis(CommonUtils.basicSort(allGotchis, gSortType, gSortDir));

        }).catch((error: any) => {
            console.log(error);
            setGotchis([]);
        }).finally(() => {
            setLoadingGotchis(false);
            setLoadedStates(statesCache => ({ ...statesCache, isGotchisLoaded: true }));
        });
    };

    const getLendings = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setLoadingLendings(shouldUpdateIsLoading);
        setLoadedStates(statesCache => ({ ...statesCache, isLendingsLoaded: false }));

        TheGraphApi.getLendingsByAddress(address)
            .then((lendings: any[]) => {
                const balancesRequest: any[] = [];
                const { type, dir } = lendingsSorting;

                for (let i = 0; i < lendings.length; i++) {
                    balancesRequest.push(TheGraphApi.getIncomeById(lendings[i].id, lendings[i].timeAgreed));
                }

                Promise.all(balancesRequest).then((balances: any[]) => {
                    balances.forEach((balance: any, i: number) => {
                        lendings[i].fud = balance.FUDAmount;
                        lendings[i].fomo = balance.FOMOAmount;
                        lendings[i].alpha = balance.ALPHAAmount;
                        lendings[i].kek = balance.KEKAmount;
                        lendings[i].totalTokens = balance.FUDAmount + balance.FOMOAmount + balance.ALPHAAmount + balance.KEKAmount;
                        lendings[i].income = GotchiverseUtils.countAlchemicaEfficency(balance.FUDAmount, balance.FOMOAmount, balance.ALPHAAmount, balance.KEKAmount);
                        lendings[i].endTime = parseInt(lendings[i].timeAgreed) + parseInt(lendings[i].period);
                    });

                    setLendings(CommonUtils.basicSort(lendings, type, dir));
                    setLoadingLendings(false);
                    setLoadedStates(statesCache => ({ ...statesCache, isLendingsLoaded: true }));
                });
            }
        );
    };

    const getBorrowed = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setLoadingBorrowed(shouldUpdateIsLoading);
        setLoadedStates(statesCache => ({ ...statesCache, isBorrowedLoaded: false }));

        TheGraphApi.getBorrowedByAddress(address)
            .then((borrowed: any[]) => {
                const { type, dir } = borrowedSorting;

                setBorrowed(CommonUtils.basicSort(borrowed, type, dir));
                setLoadingBorrowed(false);
                setLoadedStates(statesCache => ({ ...statesCache, isBorrowedLoaded: true }));
            }
        );
    };

    const getInventory = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setLoadingWarehouse(shouldUpdateIsLoading);
        setLoadedStates(statesCache => ({ ...statesCache, isInventoryLoaded: false }));

        MainApi.getInventoryByAddress(address).then((response: any) => {
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

            setWarehouse((existing: any[]) => CommonUtils.basicSort(
                [...existing, ...modified].reduce((items, current) => {
                    const duplicated = items.find((item: any) => item.id === current.id);
                    const wearableTypeBenefit: WearableTypeBenefit | undefined = WEARABLES_TYPES_BENEFITS
                        .find((benefit: WearableTypeBenefit) =>
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
                }, []), type, dir));

        }).catch((error) => {
            console.log(error);
            setWarehouse([]);
        }).finally(() => {
            setLoadingWarehouse(false);
            setLoadedStates(statesCache => ({ ...statesCache, isInventoryLoaded: true }));
        });
    };

    const getInstallations = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setLoadingInstallations(shouldUpdateIsLoading);
        setLoadedStates(statesCache => ({ ...statesCache, isInstallationsLoaded: false }));

        InstallationsApi.getInstallationsByAddress(address).then(response => {
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
                        category: Erc1155Categories.Realm,
                        rarity: InstallationsUtils.getRarityById(id),
                        deprecated: InstallationsUtils.getDeprecatedById(id)
                    };
                });

            setInstallations(installations);
            setLoadingInstallations(false);
            setLoadedStates(statesCache => ({ ...statesCache, isInstallationsLoaded: true }));
        });
    };

    const getTiles = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setLoadingTiles(shouldUpdateIsLoading);
        setLoadedStates(statesCache => ({ ...statesCache, isTilesLoaded: false }));

        TilesApi.getTilesByAddress(address).then((response: any) => {
            const tiles: any[] = response
                .filter((item: any) => {
                    const id: any = EthersApi.formatBigNumber(item.tileId._hex);

                    return TilesUtils.getIsTileExist(id);
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
            setLoadedStates(statesCache => ({ ...statesCache, isTilesLoaded: true }));
        });
    };

    const getTickets = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setLoadingTickets(shouldUpdateIsLoading);
        setLoadedStates(statesCache => ({ ...statesCache, isTicketsLoaded: false }));

        TicketsApi.getTicketsByAddress(address).then((response: any) => {
            const modified = response.filter((item: any) => item.balance > 0);

            setTickets(modified);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoadingTickets(false);
            setLoadedStates(statesCache => ({ ...statesCache, isTicketsLoaded: true }));
        });
    };

    const getRealm = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setLoadingRealm(shouldUpdateIsLoading);
        setLoadedStates(statesCache => ({ ...statesCache, isRealmLoaded: false }));

        Promise.all([
            TheGraphApi.getRealmByAddress(address),
            TheGraphApi.getParcelsGotchiverseInfoByOwner(address)
        ]).then((response => {
            const realm: any[] = response[0];
            const realmInfo: any[] = getModifiedParcelInfo(response[1]);

            const modifiedParcels = realm.map((parcel: any) => {
                const parcelInfo = realmInfo.find((info: any) => info.id === parcel.tokenId);
                const altar = parcelInfo?.installations.find((installation: any) => installation.type === InstallationTypeNames.Altar);

                return {
                    ...parcel,
                    channeling: parcelInfo,
                    nextChannel: parcelInfo?.nextChannel,
                    altarLevel: altar ? altar.level : 0,
                    installations: parcelInfo?.installations
                };
            });

            setRealm(modifiedParcels);
        })).catch((error) => {
            console.log(error);

            setRealm([]);
        }).finally(() => {
            setLoadingRealm(false);
            setLoadedStates(statesCache => ({ ...statesCache, isRealmLoaded: true }));
        });
    };

    const getModifiedParcelInfo = (parcelinfo: any[]): any[] => {
        return parcelinfo.map((parcel: any) => {
            if (!parcel.equippedInstallations.length) {
                return {
                    id: parcel.id,
                    lastChanneled: 0,
                    nextChannel: 0,
                    installations: []
                };
            }

            const installations: any[] = parcel.equippedInstallations.filter((item: any) =>
                InstallationsUtils.getIsInstallationExist(item.id)
            ).map((inst: any) => ({
                id: inst.id,
                name: InstallationsUtils.getNameById(inst.id),
                level: InstallationsUtils.getLevelById(inst.id),
                type: InstallationsUtils.getTypeById(inst.id)
            }));

            const altar = installations.find(installation => installation.type === InstallationTypeNames.Altar);
            const cooldown = InstallationsUtils.getCooldownByLevel(altar.level, 'seconds');
            const lastChanneled = Number(parcel.lastChanneledAlchemica);
            const nextChannel = lastChanneled + cooldown;

            return {
                id: parcel.id,
                lastChanneled: lastChanneled,
                nextChannel: Number(nextChannel),
                cooldown: cooldown,
                installations: installations
            };
        });
    };

    // TODO check if needed
    const calculateReward = () => {
        setRewardCalculating(true);

        TheGraphApi.getAllGotchies().then((response: any) => {
            const brsLeaders: any[] = CommonUtils.basicSort(response, 'modifiedRarityScore');
            const kinLeaders: any[] = CommonUtils.basicSort(response, 'kinship');
            const expLeaders: any[] = CommonUtils.basicSort(response, 'experience');

            gotchis.forEach((item: any, index: number) => {
                const BRS: any = GraphUtils.calculateRewards(brsLeaders.findIndex(x => x.id === item.id), 'BRS');
                const KIN: any = GraphUtils.calculateRewards(kinLeaders.findIndex(x => x.id === item.id), 'KIN');
                const EXP: any = GraphUtils.calculateRewards(expLeaders.findIndex(x => x.id === item.id), 'EXP');

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
        <ClientContext.Provider value={{
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

            reward,
            rewardCalculated,
            rewardCalculating,
            calculateReward,

            navData,
            getClientData,

            canBeUpdated,
            setCanBeUpdated,
            setLoadedStates
        }}>
            { props.children }
        </ClientContext.Provider>
    );
};
