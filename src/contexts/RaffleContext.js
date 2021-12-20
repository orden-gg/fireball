import React, {createContext, useEffect, useState} from 'react';
import thegraph from '../api/thegraph';
import commonUtils from '../utils/commonUtils';
import web3 from '../api/web3';

import { raffleTicketPriceQuery } from '../pages/Raffle/data/queries';

export const RaffleContext = createContext({});

const RaffleContextProvider = (props) => {
    const [tickets, setTickets] = useState([]);

    const [loadingEntered, setLoadingEntered] = useState(true);

    const [raffleSpinner, setRaffleSpinner] = useState(true);
    const [pricesSpinner, setPricesSpinner] = useState(true);

    useEffect(() => {
        if(!raffleSpinner && !loadingEntered) {
            setTickets((ticketsCache) => {
                return ticketsCache.map((ticket, i) => {
                    ticket.chance = countChances(ticket.value, ticket.entered, ticket.items);
                    return ticket;
                });
            });
        }
    }, [raffleSpinner, loadingEntered])

    const getRaffleData = (raffle, raffleTickets) => {
        getRaffle(raffle);
        getPrices(raffleTickets);
    };

    const getRaffle = (raffle) => {
        setRaffleSpinner(true);

        thegraph.getRaffle(raffle).then((response) => {
            let [prizes, total] = response;

            setTickets((ticketsCache) => {
                return ticketsCache.map((ticket, i) => {
                    ticket.items = prizes[i].items;
                    ticket.prizes = prizes[i].prizes;
                    ticket.entered = total[
                        ticket.rarity === 'godlike' ? 'totalGodLike' : `total${commonUtils.capitalize(ticket.rarity)}`
                    ];
                    return ticket;
                });
            });
            setRaffleSpinner(false);
        }).catch(error => console.log(error));
    };

    const getPrices = (raffleTickets) => {
        let queries = raffleTickets.map((ticket) => raffleTicketPriceQuery(ticket.id));

        setPricesSpinner(true);

        thegraph.getJoinedData(queries).then((response) => {
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

    const getAddressData = (address, raffle) => {
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

    const onAddressChange = (address, raffle) => {
        tickets.forEach((item, i) => tickets[i].value = '');

        if(web3.isAddressValid(address)) {
            getAddressData(address, raffle);
        }
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
            getAddressData,

            onAddressChange,
            countChances,
            formatChance,

            raffleSpinner,
            pricesSpinner
        }}>
            { props.children }
        </RaffleContext.Provider>
    )
}

export default RaffleContextProvider;
