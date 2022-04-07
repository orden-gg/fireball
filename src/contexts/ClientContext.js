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

export const ClientContext = createContext({});

const ClientContextProvider = (props) => {
    const [clientActive, setClientActive] = useState(null);

    const [gotchis, setGotchis] = useState([]);
    const [gotchisFilter, setGotchisFilter] = useState('modifiedRarityScore');
    const [loadingGotchis, setLoadingGotchis] = useState(true);

    const [lendings, setLendings] = useState([]);
    const [lendingsFilter, setLendingsFilter] = useState('modifiedRarityScore');

    const [warehouse, setWarehouse] = useState([]);
    const [warehouseFilter, setWarehouseFilter] = useState('rarityIdDesc');
    const [loadingWarehouse, setLoadingWarehouse] = useState(false);

    const [tickets, setTickets] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);

    const [realm, setRealm] = useState([]);
    const [realmFilter, setRealmFilter] = useState(null);
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
        setGotchisFilter('modifiedRarityScore'); // prevent reward sorting to be selected
    };

    const getFilter = (filter) => {
        let asc = filter?.includes('Asce');
        let desc = filter?.includes('Desc');
        let dir = 'desc';
        let modified = filter;

        if (asc || desc) {
            modified = filter.slice(0, -4);
            asc ? dir = 'asc' : dir = 'desc';
        }

        return [modified, dir];
    }

    const sortData = (event, newFilter, setter) => {
        let [filter, dir] = getFilter(newFilter);

        if (setter === 'gotchis') {
            setGotchis(commonUtils.basicSort(gotchis, filter, dir));
            setGotchisFilter(newFilter);
        } else if (setter === 'warehouse') {
            setWarehouse(commonUtils.basicSort(warehouse, filter, dir));
            setWarehouseFilter(newFilter);
        } else if (setter === 'realm') {
            setRealm(commonUtils.basicSort(realm, filter, dir));
            setRealmFilter(newFilter);
        }
    };

    const getGotchis = (address) => {
        setLoadingGotchis(true);

        thegraph.getGotchisByAddress(address).then((response)=> {
            let wearables = [];
            let [gFilter, gDir] = getFilter(gotchisFilter);
            let [wFilter, wDir] = getFilter(warehouseFilter);

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
        thegraph.getLendingsByAddress(address).then((response) => {
            console.log('👻', response)
            setLendings(response);
        });
    }

    const getInventory = (address) => {
        setLoadingWarehouse(true);

        mainApi.getInventoryByAddress(address).then((response) => {
            let modified = [];
            let [wFilter, wDir] = getFilter(warehouseFilter);

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
            let modified = response.filter((item) => item.balance > 0);
            setTickets(modified);
            setLoadingTickets(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    const getRealm = (address) => {
        setLoadingRealm(true);

        thegraph.getRealmByAddress(address).then((response) => {
            setRealm(response);
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
            gotchisFilter,
            loadingGotchis,
            setGotchis,

            lendings,
            lendingsFilter,
            setLendings,

            warehouse,
            warehouseFilter,
            loadingWarehouse,
            setWarehouse,

            tickets,
            loadingTickets,

            realm,
            realmFilter,
            loadingRealm,
            setRealm,
            realmView,
            setRealmView,

            reward,
            rewardCalculated,
            rewardCalculating,
            calculateReward,

            navData,

            getClientData,
            sortData
        }}>
            { props.children }
        </ClientContext.Provider>
    )
}

export default ClientContextProvider;
