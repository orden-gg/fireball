import { createContext, useState } from 'react';

import { GotchiIcon, KekIcon, RareTicketIcon, WarehouseIcon, AnvilIcon } from 'components/Icons/Icons';
import thegraph from 'api/thegraph.api';
import mainApi from 'api/main.api';
import installationsApi from 'api/installations.api';
import tilesApi from 'api/tiles.api';
import ticketsApi from 'api/tickets.api';
import thegraphApi from 'api/thegraph.api';
import ethersApi from 'api/ethers.api';
import commonUtils from 'utils/commonUtils';
import graphUtils from 'utils/graphUtils';
import itemUtils from 'utils/itemUtils';
import gotchiverseUtils from 'utils/gotchiverseUtils';
import tilesUtils from 'utils/tilesUtils';
import installationsUtils from 'utils/installationsUtils';

export const ClientContext = createContext({});

const ClientContextProvider = (props) => {
    const [gotchis, setGotchis] = useState([]);
    const [gotchisSorting, setGotchisSorting] = useState({ type: 'modifiedRarityScore', dir: 'desc' });
    const [loadingGotchis, setLoadingGotchis] = useState(true);

    const [lendings, setLendings] = useState([]);
    const [lendingsSorting, setLendingsSorting] = useState({ type: 'totalTokens', dir: 'desc' });
    const [loadingLendings, setLoadingLendings] = useState(true);

    const [warehouse, setWarehouse] = useState([]);
    const [warehouseSorting, setWarehouseSorting] = useState({ type: 'rarityId', dir: 'desc' });
    const [loadingWarehouse, setLoadingWarehouse] = useState(false);

    const [installations, setInstallations] = useState([]);
    const [loadingInstallations, setLoadingInstallations] = useState(true);

    const [tiles, setTiles] = useState([]);
    const [loadingTiles, setLoadingTiles] = useState(true);

    const [tickets, setTickets] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);

    const [realm, setRealm] = useState([]);
    const [realmSorting, setRealmSorting] = useState({ type: 'size', dir: 'desc' });
    const [loadingRealm, setLoadingRealm] = useState(true);

    const [reward, setReward] = useState(null);
    const [rewardCalculating, setRewardCalculating] = useState(false);
    const [rewardCalculated, setRewardCalculated] = useState(false);
    const [realmView, setRealmView] = useState('list');

    const navData = [
        {
            name: 'gotchis',
            icon: <GotchiIcon width={24} height={24} />,
            loading: loadingGotchis,
            items: gotchis.length
        },
        {
            name: 'lendings',
            icon: <GotchiIcon width={24} height={24} />,
            loading: loadingLendings,
            items: lendings.length
        },
        {
            name: 'warehouse',
            icon: <WarehouseIcon width={24} height={24} />,
            loading: loadingWarehouse,
            items: warehouse.length
        },
        {
            name: 'installations',
            icon: <AnvilIcon width={24} height={24} />,
            loading: loadingInstallations || loadingTiles,
            items: installations.length + tiles.length
        },
        {
            name: 'tickets',
            icon: <RareTicketIcon width={24} height={24} />,
            loading: loadingTickets,
            items: tickets.length
        },
        {
            name: 'realm',
            icon: <KekIcon width={24} height={24} alt='realm' />,
            loading: loadingRealm,
            items: realm.length
        }
    ];

    const getClientData = (address) => {
        getGotchis(address);
        getLendings(address);
        getInventory(address);
        getTickets(address);
        getRealm(address);
        getInstallations(address);
        getTiles(address);

        // reset
        setWarehouse([]);
    };

    const getGotchis = (address) => {
        setLoadingGotchis(true);

        thegraph.getGotchisByAddress(address).then((response) => {
            const wearables = [];
            const { type: gSortType, dir: gSortDir } = gotchisSorting;
            const { type: wSortType, dir: wSortDir } = warehouseSorting;

            // collect all equipped wearables
            response.forEach((item) => {
                const equipped = item.equippedWearables.filter((item) => item > 0);

                for (const wearable of equipped) {
                    const index = wearables.findIndex(item => item.id === wearable);

                    if ((wearable >= 162 && wearable <= 198) || wearable === 210) continue; // skip badges or h1 bg

                    if (wearables[index] === undefined) {
                        wearables.push({
                            id: wearable,
                            balance: 1,
                            rarity: itemUtils.getItemRarityById(wearable),
                            rarityId: itemUtils.getItemRarityId(itemUtils.getItemRarityById(wearable)),
                            holders: [item.id],
                            category: 0
                        });
                    } else {
                        wearables[index].balance += 1;
                        wearables[index].holders.push(item.id);
                    }
                }
            });

            setWarehouse((existing) => commonUtils.basicSort(
                [...existing, ...wearables].reduce((items, current) => {
                    const duplicated = items.find(item => item.id === current.id);

                    if (duplicated) {
                        duplicated.balance += current.balance;
                        duplicated.holders = current.holders;

                        return items;
                    }

                    return items.concat(current);
                }, []), wSortType, wSortDir));

            setGotchis(commonUtils.basicSort(response, gSortType, gSortDir));
            setLoadingGotchis(false);
        }).catch((error) => {
            console.log(error);
            setGotchis([]);
            setLoadingGotchis(false);
        });
    };

    const getLendings = (address) => {
        setLoadingLendings(true);

        thegraph.getLendingsByAddress(address)
            .then(lendings => {
                const balancesRequest = [];
                const { type, dir } = lendingsSorting;

                for (let i = 0; i < lendings.length; i++) {
                    balancesRequest.push(thegraphApi.getIncomeById(lendings[i].id, lendings[i].timeAgreed));
                }

                Promise.all(balancesRequest).then(balances => {
                    balances.forEach((balance, i) => {
                        lendings[i].fud = balance.FUDAmount;
                        lendings[i].fomo = balance.FOMOAmount;
                        lendings[i].alpha = balance.ALPHAAmount;
                        lendings[i].kek = balance.KEKAmount;
                        lendings[i].totalTokens = balance.FUDAmount + balance.FOMOAmount + balance.ALPHAAmount + balance.KEKAmount;
                        lendings[i].income = gotchiverseUtils.countAlchemicaEfficency(balance.FUDAmount, balance.FOMOAmount, balance.ALPHAAmount, balance.KEKAmount);
                        lendings[i].endTime = parseInt(lendings[i].timeAgreed) + parseInt(lendings[i].period);
                    });

                    setLendings(commonUtils.basicSort(lendings, type, dir));
                    setLoadingLendings(false);
                });
            }
        );
    };

    const getInventory = (address) => {
        setLoadingWarehouse(true);

        mainApi.getInventoryByAddress(address).then((response) => {
            const modified = [];
            const { type, dir } = warehouseSorting;

            response.items.forEach((item) => {
                modified.push({
                    id: +item.itemId,
                    rarity: itemUtils.getItemRarityById(item.itemId),
                    rarityId: itemUtils.getItemRarityId(itemUtils.getItemRarityById(item.itemId)),
                    balance: +item.balance,
                    category: item.itemId >= 126 && item.itemId <= 129 ? 2 : 0 // TODO: temporary solution to determine if item is consumable or not
                });
            });

            setWarehouse((existing) => commonUtils.basicSort(
                [...existing, ...modified].reduce((items, current) => {
                    const duplicated = items.find(item => item.id === current.id);

                    if (duplicated) {
                        duplicated.balance += current.balance;
                        duplicated.holders = current.holders;

                        return items;
                    }

                    return items.concat(current);
                }, []), type, dir));
            setLoadingWarehouse(false);

        }).catch((error) => {
            console.log(error);
            setWarehouse([]);
            setLoadingWarehouse(false);
        });
    };

    const getInstallations = (address) => {
        setLoadingInstallations(true);

        installationsApi.getInstallationsByAddress(address).then(response => {
            const installations = response.map(item => {
                const id = ethersApi.formatBigNumber(item.installationId._hex);

                return {
                    type: 'installation',
                    name: installationsUtils.getNameById(id),
                    balance: ethersApi.formatBigNumber(item.balance._hex),
                    id: id,
                    level: installationsUtils.getLevelById(id)
                };
            });

            setInstallations(installations);
            setLoadingInstallations(false);
        });
    };

    const getTiles = (address) => {
        setLoadingTiles(true);

        tilesApi.getTilesByAddress(address).then(response => {
            const tiles = response.map(item => {
                const id = ethersApi.formatBigNumber(item.tileId._hex);

                return {
                    type: 'tile',
                    name: tilesUtils.getNameById(id),
                    balance: ethersApi.formatBigNumber(item.balance._hex),
                    id: id
                };
            });

            setTiles(tiles);
            setLoadingTiles(false);
        });
    };

    const getTickets = (address) => {
        setLoadingTickets(true);

        ticketsApi.getTicketsByAddress(address).then((response) => {
            const modified = response.filter((item) => item.balance > 0);

            setTickets(modified);
            setLoadingTickets(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    const getRealm = (address) => {
        setLoadingRealm(true);

        thegraph.getRealmByAddress(address)
            .then(res => {
                const { type, dir } = realmSorting;

                const modified = res.map(parcel => ({
                    ...parcel,
                    channeling: { loading: true },
                    installations: { loading: true }
                }));

                setRealm(commonUtils.basicSort(modified, type, dir));
                setLoadingRealm(false);
            })
            .catch((error) => {
                console.log(error);
                setRealm([]);
                setLoadingRealm(false);
            });
    };

    const calculateReward = () => {
        setRewardCalculating(true);

        thegraph.getAllGotchies().then((response) => {
            const brsLeaders = commonUtils.basicSort(response, 'modifiedRarityScore');
            const kinLeaders = commonUtils.basicSort(response, 'kinship');
            const expLeaders = commonUtils.basicSort(response, 'experience');

            gotchis.forEach((item, index) => {
                const BRS = graphUtils.calculateRewards(brsLeaders.findIndex(x => x.id === item.id), 'BRS');
                const KIN = graphUtils.calculateRewards(kinLeaders.findIndex(x => x.id === item.id), 'KIN');
                const EXP = graphUtils.calculateRewards(expLeaders.findIndex(x => x.id === item.id), 'EXP');

                gotchis[index] = {
                    ...item,
                    reward: BRS.reward + KIN.reward + EXP.reward,
                    rewardStats: [BRS, KIN, EXP]
                };
            });

            setReward(gotchis.reduce((prev, next) => prev + next.reward, 0));
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

export default ClientContextProvider;
