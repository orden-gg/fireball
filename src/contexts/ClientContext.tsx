import { createContext, useContext, useState } from 'react';

import { InstallationTypeNames } from 'shared/constants';
import { DataReloadContextState, PageNavLink, Sorting } from 'shared/models';
import { GotchiIcon, KekIcon, RareTicketIcon, WarehouseIcon, AnvilIcon, LendingIcon } from 'components/Icons/Icons';
import { SubNav } from 'components/PageNav/SubNav';
import { EthersApi, InstallationsApi, MainApi, TheGraphApi, TicketsApi, TilesApi } from 'api';
import { CommonUtils, GotchiverseUtils, GraphUtils, InstallationsUtils, ItemUtils, TilesUtils } from 'utils';

import { DataReloadContext } from './DataReloadContext';

export const ClientContext = createContext({});

export const ClientContextProvider = (props: any) => {
    const [gotchis, setGotchis] = useState<any[]>([]);
    const [gotchisSorting, setGotchisSorting] = useState<Sorting>({ type: 'modifiedRarityScore', dir: 'desc' });
    const [loadingGotchis, setLoadingGotchis] = useState<boolean>(true);
    const [gotchiView, setGotchiView] = useState<string>('owned');

    const [lendings, setLendings] = useState<any[]>([]);
    const [lendingsSorting, setLendingsSorting] = useState<Sorting>({ type: 'totalTokens', dir: 'desc' });
    const [loadingLendings, setLoadingLendings] = useState<boolean>(true);

    const [borrowed, setBorrowed] = useState<any[]>([]);
    const [borrowedSorting, setBorrowedSorting] = useState<Sorting>({ type: 'kinship', dir: 'desc' });
    const [loadingBorrowed, setLoadingBorrowed] = useState<boolean>(true);

    const [warehouse, setWarehouse] = useState<any[]>([]);
    const [warehouseSorting, setWarehouseSorting] = useState<Sorting>({ type: 'rarityId', dir: 'desc' });
    const [loadingWarehouse, setLoadingWarehouse] = useState<boolean>(false);

    const [installations, setInstallations] = useState<any[]>([]);
    const [loadingInstallations, setLoadingInstallations] = useState<boolean>(true);

    const [tiles, setTiles] = useState<any[]>([]);
    const [loadingTiles, setLoadingTiles] = useState<boolean>(true);

    const [tickets, setTickets] = useState<any[]>([]);
    const [loadingTickets, setLoadingTickets] = useState<boolean>(true);

    const [realm, setRealm] = useState<any[]>([]);
    const [realmSorting, setRealmSorting] = useState<Sorting>({ type: 'size', dir: 'desc' });
    const [loadingRealm, setLoadingRealm] = useState<boolean>(true);

    const [reward, setReward] = useState<any>(null);
    const [rewardCalculating, setRewardCalculating] = useState<boolean>(false);
    const [rewardCalculated, setRewardCalculated] = useState<boolean>(false);
    const [realmView, setRealmView] = useState<string>('list');

    const { setIsReloadDisabled } = useContext<DataReloadContextState>(DataReloadContext);

    const navData: PageNavLink[] = [
        {
            name: 'gotchis',
            path: 'gotchis',
            icon: <GotchiIcon width={24} height={24} />,
            isLoading: loadingGotchis,
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
        setIsReloadDisabled(true);
        setLoadingGotchis(shouldUpdateIsLoading);

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
                const equipped: any = item.equippedWearables.filter((item: any) => item > 0);

                for (const wearable of equipped) {
                    const index: number = wearables.findIndex(item => item.id === wearable);

                    if ((wearable >= 162 && wearable <= 198) || wearable === 210) continue; // skip badges or h1 bg

                    if (wearables[index] === undefined) {
                        wearables.push({
                            id: wearable,
                            balance: 1,
                            rarity: ItemUtils.getItemRarityById(wearable),
                            rarityId: ItemUtils.getItemRarityId(ItemUtils.getItemRarityById(wearable)),
                            holders: [item.id],
                            category: 0
                        });
                    } else {
                        wearables[index].balance += 1;
                        wearables[index].holders.push(item.id);
                    }
                }
            });

            setWarehouse((existing: any[]) => CommonUtils.basicSort(
                [...existing, ...wearables].reduce((items: any[], current: any) => {
                    const duplicated: any = items.find((item: any) => item.id === current.id);

                    if (duplicated) {
                        duplicated.balance += current.balance;
                        duplicated.holders = current.holders;

                        return items;
                    }

                    return items.concat(current);
                }, []), wSortType, wSortDir));

            setGotchis(CommonUtils.basicSort(allGotchis, gSortType, gSortDir));

        }).catch((error: any) => {
            console.log(error);
            setGotchis([]);
        }).finally(() => {
            setLoadingGotchis(false);
            setIsReloadDisabled(false);
        });
    };

    const getLendings = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setIsReloadDisabled(true);
        setLoadingLendings(shouldUpdateIsLoading);

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
                    setIsReloadDisabled(false);
                });
            }
        );
    };

    const getBorrowed = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setIsReloadDisabled(true);
        setLoadingBorrowed(shouldUpdateIsLoading);

        TheGraphApi.getBorrowedByAddress(address)
            .then((borrowed: any[]) => {
                const { type, dir } = borrowedSorting;

                setBorrowed(CommonUtils.basicSort(borrowed, type, dir));
                setLoadingBorrowed(false);
                setIsReloadDisabled(false);
            }
        );
    };

    const getInventory = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setIsReloadDisabled(true);
        setLoadingWarehouse(shouldUpdateIsLoading);

        MainApi.getInventoryByAddress(address).then((response: any) => {
            const modified: any[] = [];
            const { type, dir } = warehouseSorting;

            response.items.forEach((item: any) => {
                modified.push({
                    id: +item.itemId,
                    rarity: ItemUtils.getItemRarityById(item.itemId),
                    rarityId: ItemUtils.getItemRarityId(ItemUtils.getItemRarityById(item.itemId)),
                    balance: +item.balance,
                    category: item.itemId >= 126 && item.itemId <= 129 ? 2 : 0 // TODO: temporary solution to determine if item is consumable or not
                });
            });

            setWarehouse((existing: any[]) => CommonUtils.basicSort(
                [...existing, ...modified].reduce((items, current) => {
                    const duplicated = items.find((item: any) => item.id === current.id);

                    if (duplicated) {
                        duplicated.balance += current.balance;
                        duplicated.holders = current.holders;

                        return items;
                    }

                    return items.concat(current);
                }, []), type, dir));

        }).catch((error) => {
            console.log(error);
            setWarehouse([]);
        }).finally(() => {
            setLoadingWarehouse(false);
            setIsReloadDisabled(false);
        });
    };

    const getInstallations = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setIsReloadDisabled(true);
        setLoadingInstallations(shouldUpdateIsLoading);

        InstallationsApi.getInstallationsByAddress(address).then(response => {
            const installations: any[] = response.map((item: any) => {
                const id: any = EthersApi.formatBigNumber(item.installationId._hex);

                return {
                    type: 'installation',
                    name: InstallationsUtils.getNameById(id),
                    balance: EthersApi.formatBigNumber(item.balance._hex),
                    id: id,
                    level: InstallationsUtils.getLevelById(id)
                };
            });

            setInstallations(installations);
            setLoadingInstallations(false);
            setIsReloadDisabled(false);
        });
    };

    const getTiles = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setIsReloadDisabled(true);
        setLoadingTiles(shouldUpdateIsLoading);

        TilesApi.getTilesByAddress(address).then((response: any) => {
            const tiles: any[] = response.map((item: any) => {
                const id: any = EthersApi.formatBigNumber(item.tileId._hex);

                return {
                    type: 'tile',
                    name: TilesUtils.getNameById(id),
                    balance: EthersApi.formatBigNumber(item.balance._hex),
                    id: id
                };
            });

            setTiles(tiles);
            setLoadingTiles(false);
            setIsReloadDisabled(false);
        });
    };

    const getTickets = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setIsReloadDisabled(true);
        setLoadingTickets(shouldUpdateIsLoading);

        TicketsApi.getTicketsByAddress(address).then((response: any) => {
            const modified = response.filter((item: any) => item.balance > 0);

            setTickets(modified);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoadingTickets(false);
            setIsReloadDisabled(false);
        });
    };

    const getRealm = (address: string, shouldUpdateIsLoading: boolean = false): void => {
        setIsReloadDisabled(true);
        setLoadingRealm(shouldUpdateIsLoading);

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
            setIsReloadDisabled(false);
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

            const installations: any[] = parcel.equippedInstallations.map((inst: any) => ({
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
            gotchiView,
            setGotchiView,

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
            getClientData
        }}>
            { props.children }
        </ClientContext.Provider>
    );
};
