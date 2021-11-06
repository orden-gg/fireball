import React, {createContext, useEffect, useState} from 'react';
import thegraph from '../api/thegraph';
import commonUtils from '../utils/commonUtils';

export const RaffleContext = createContext({});

const RaffleContextProvider = (props) => {
    const [tickets, setTickets] = useState([]);

    const [loadingEntered, setLoadingEntered] = useState(true);

    const [raffleSpinner, setRaffleSpinner] = useState(true);
    const [supplySpinner, setSupplySpinner] = useState(true);
    const [pricesSpinner, setPricesSpinner] = useState(true);

    useEffect(() => {
        if(!raffleSpinner && !supplySpinner && !loadingEntered) {
            setTickets((ticketsCache) => {
                return ticketsCache.map((ticket, i) => {
                    ticket.chance = countChances(ticket.value, ticket.entered, ticket.items);
                    return ticket;
                });
            });
        }
    }, [raffleSpinner, supplySpinner, loadingEntered])

    const getRaffleData = (raffle, priceQuery, enteredQuery) => {
        getRaffle(raffle);
        getPrices(priceQuery);
        loadEntered(enteredQuery);
    };

    const getRaffle = (raffle) => {
        setRaffleSpinner(true);

        thegraph.getRaffle(raffle).then((response) => {
            setTickets((ticketsCache) => {
                return ticketsCache.map((ticket, i) => {
                    ticket.items = response[i].items;
                    ticket.prizes = response[i].prizes;
                    return ticket;
                });
            });
            setRaffleSpinner(false);
        }).catch(error => console.log(error));
    };

    const getPrices = (query) => {
        setPricesSpinner(true);

        thegraph.getJoinedData(query).then((response) => {
            let averagePrices = response.map((item)=> {
                let prices = item.data.erc1155Listings.map((wei)=> parseInt(wei.priceInWei));
                let average = prices.reduce((a,b) => a + b, 0) / prices.length;
                let price = average / 10**18;
                return price.toFixed(2);
            });

            setTickets((ticketsCache) => {
                return ticketsCache.map((ticket, i) => {
                    ticket.price = averagePrices[i];
                    return ticket;
                });
            });
            setPricesSpinner(false);
        });
    };

    const loadEntered = (query) => {
        setSupplySpinner(true);

        thegraph.getRaffleOffData(query).then((response)=> {
            setTickets((ticketsCache) => {
                return ticketsCache.map((ticket, i) => {
                    ticket.entered = response.data.total[
                        ticket.rarity === 'godlike' ? 'totalGodLike' : `total${commonUtils.capitalize(ticket.rarity)}`
                    ];
                    return ticket;
                });
            });
            setSupplySpinner(false);
        }).catch(error => console.log(error))
    };

    const getAddressEntered = (address, raffle) => {
        setLoadingEntered(true);

        thegraph.getRaffleEntered(address, raffle).then((response) => {
            setTickets((ticketsCache) => {
                let modified = [...ticketsCache];
                response.forEach((item, i) => {
                    let elem = modified.length > 1 ? item.ticketId : 0;

                    modified[elem].value = item.quantity;
                });
                return modified;
            });
            setLoadingEntered(false);
        }).catch(error => console.log(error));
    };

    const countChances = (value, entered, items) => {
        return value / entered * items;
    }

    const formatChance = (chance, items) => {
        let percentage = (chance * 100).toFixed(1);

        return chance > items ? `x${items.toFixed(2)}` :
            chance > 1 ? `x${chance.toFixed(2)}` :
            chance > 0 ? `${percentage}% for 1` : 0;
    }

    return (
        <RaffleContext.Provider value={{
            tickets,
            setTickets,

            getRaffleData,
            getAddressEntered,

            countChances,
            formatChance,

            raffleSpinner,
            supplySpinner,
            pricesSpinner
        }}>
            { props.children }
        </RaffleContext.Provider>
    )
}

export default RaffleContextProvider;
