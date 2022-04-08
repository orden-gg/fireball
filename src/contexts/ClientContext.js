import React, { createContext, useState } from 'react';

import thegraph from 'api/thegraph.api';
import mainApi from 'api/main.api';
import ticketsApi from 'api/tickets.api';
import commonUtils from 'utils/commonUtils';
import graphUtils from 'utils/graphUtils';
import itemUtils from 'utils/itemUtils';
import gotchiIcon from 'assets/images/gotchi-placeholder.svg';
import warehouseIcon from 'assets/images/wearables/15.svg';
import ticketsIcon from 'assets/images/tickets/rare.svg';
import realmIcon from 'assets/images/icons/kek.png';
import thegraphApi from 'api/thegraph.api';
import gotchiverseUtils from 'utils/gotchiverseUtils';
import { DateTime } from 'luxon';

export const ClientContext = createContext({});

const ClientContextProvider = (props) => {
    const [clientActive, setClientActive] = useState(null);

    const [gotchis, setGotchis] = useState([]);
    const [gotchisSorting, setGotchisSorting] = useState(['modifiedRarityScore', 'desc']);
    const [loadingGotchis, setLoadingGotchis] = useState(true);

    const [lendings, setLendings] = useState([]);
    const [lendingsSorting, setLendingsSorting] = useState(['totalTokens', 'desc']);
    const [loadingLendings, setLoadingLendings] = useState(true);

    const [warehouse, setWarehouse] = useState([]);
    const [warehouseSorting, setWarehouseSorting] = useState(['rarityId', 'desc']);
    const [loadingWarehouse, setLoadingWarehouse] = useState(false);

    const [tickets, setTickets] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);

    const [realm, setRealm] = useState([]);
    const [realmSorting, setRealmSorting] = useState(['size', 'desc']);
    const [loadingRealm, setLoadingRealm] = useState(true);

    const [reward, setReward] = useState(null);
    const [rewardCalculating, setRewardCalculating] = useState(false);
    const [rewardCalculated, setRewardCalculated] = useState(false);
    const [realmView, setRealmView] = useState('map');

    const navData = [
        {
            name: 'gotchis',
            icon: gotchiIcon,
            loading: loadingGotchis,
            items: gotchis.length
        },
        {
            name: 'lendings',
            icon: gotchiIcon,
            loading: loadingGotchis,
            items: lendings.length
        },
        {
            name: 'warehouse',
            icon: warehouseIcon,
            loading: loadingWarehouse,
            items: warehouse.length
        },
        {
            name: 'tickets',
            icon: ticketsIcon,
            loading: loadingTickets,
            items: tickets.length
        },
        {
            name: 'realm',
            icon: realmIcon,
            loading: loadingRealm,
            items: realm.length
        }
    ];

    const getClientData = () => {
        getGotchis(clientActive);
        getLendings(clientActive);
        getInventory(clientActive);
        getTickets(clientActive);
        getRealm(clientActive);

        // reset
        setWarehouse([]);
        setReward(null);
        setRewardCalculated(false);
    };

    const getGotchis = (address) => {
        setLoadingGotchis(true);

        thegraph.getGotchisByAddress(address).then((response)=> {
            const wearables = [];
            const [gFilter, gDir] = gotchisSorting;
            const [wFilter, wDir] = warehouseSorting;

            // collect all equipped wearables
            response.forEach((item) => {
                let equipped = item.equippedWearables.filter((item) => item > 0);

                for(let wearable of equipped) {
                    let index = wearables.findIndex(item => item.id === wearable);

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
                    let duplicated = items.find(item => item.id === current.id);

                    if (duplicated) {
                        duplicated.balance += current.balance;
                        duplicated.holders = current.holders;
                        return items;
                    }

                    return items.concat(current);
                }, []), wFilter, wDir));

            setGotchis(commonUtils.basicSort(response, gFilter, gDir));
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
            .then(lendings => lendings)
            .then(response => {
                const balancesRequest = [];
                const [sort, direction] = lendingsSorting;

                for (let i = 0; i < response.length; i++) {
                    balancesRequest.push(thegraphApi.getIncomeById(response[i].id, response[i].timeAgreed));
                }

                Promise.all(balancesRequest).then(balances => {
                    balances.forEach((balance, i) => {
                        response[i].fud = balance.FUDAmount;
                        response[i].fomo = balance.FOMOAmount;
                        response[i].alpha = balance.ALPHAAmount;
                        response[i].kek = balance.KEKAmount;
                        response[i].totalTokens = balance.FUDAmount + balance.FOMOAmount + balance.ALPHAAmount + balance.KEKAmount;
                        response[i].income = gotchiverseUtils.countAlchemicaEfficency(balance.FUDAmount, balance.FOMOAmount, balance.ALPHAAmount, balance.KEKAmount)
                        response[i].endTime = parseInt(response[i].timeAgreed) + parseInt(response[i].period)
                    });

                    setLendings(commonUtils.basicSort(response, sort, direction));
                    setLoadingLendings(false);
                });
            }
        );
    }

    const getInventory = (address) => {
        setLoadingWarehouse(true);

        mainApi.getInventoryByAddress(address).then((response) => {
            const modified = [];
            const [wFilter, wDir] = warehouseSorting;

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
                    let duplicated = items.find(item => item.id === current.id);

                    if (duplicated) {
                        duplicated.balance += current.balance;
                        duplicated.holders = current.holders;
                        return items;
                    }

                    return items.concat(current);
                }, []), wFilter, wDir));
            setLoadingWarehouse(false);

        }).catch((error) => {
            console.log(error);
            setWarehouse([]);
            setLoadingWarehouse(false);
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

        thegraph.getRealmByAddress(address).then((response) => {
            const [sort, direction] = realmSorting;

            setRealm(commonUtils.basicSort(response, sort, direction));
            setLoadingRealm(false);
        }).catch((error) => {
            console.log(error);
            setRealm([]);
            setLoadingRealm(false);
        });
    };

    const calculateReward = () => {
        setRewardCalculating(true);

        thegraph.getAllGotchies().then((response) => {
            let brsLeaders = commonUtils.basicSort(response, 'modifiedRarityScore');
            let kinLeaders = commonUtils.basicSort(response, 'kinship');
            let expLeaders = commonUtils.basicSort(response, 'experience');

            gotchis.forEach((item, index)=>{
                let BRS = graphUtils.calculateRewards(brsLeaders.findIndex(x => x.id === item.id), 'BRS');
                let KIN = graphUtils.calculateRewards(kinLeaders.findIndex(x => x.id === item.id), 'KIN');
                let EXP = graphUtils.calculateRewards(expLeaders.findIndex(x => x.id === item.id), 'EXP');

                gotchis[index] = {
                    ...item,
                    reward: BRS.reward + KIN.reward + EXP.reward,
                    rewardStats: [BRS, KIN, EXP]
                }
            });

            setReward(gotchis.reduce((prev, next) => prev + next.reward, 0));
            setRewardCalculating(false);
            setRewardCalculated(true)
        });
    };

    return (
        <ClientContext.Provider value={{
            clientActive,
            setClientActive,

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

            tickets,
            loadingTickets,

            realm,
            realmView,
            realmSorting,
            loadingRealm,
            setRealm,
            setRealmView,
            setRealmSorting,

            reward,
            rewardCalculated,
            rewardCalculating,
            calculateReward,

            navData,
            getClientData,
        }}>
            { props.children }
        </ClientContext.Provider>
    )
}

export default ClientContextProvider;
