import React, { createContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { raffleTicketPriceQuery } from 'pages/Raffle/data/queries.data';
import thegraph from 'api/thegraph';
import web3 from 'api/web3';
import commonUtils from 'utils/commonUtils';
import itemUtils from 'utils/itemUtils';

export const RaffleContext = createContext({});

const RaffleContextProvider = (props) => {
    const [raffle, setRaffle] = useState(null);
    const [tickets, setTickets] = useState([]);

    const [loadingEntered, setLoadingEntered] = useState(true);

    const [raffleSpinner, setRaffleSpinner] = useState(true);
    const [pricesSpinner, setPricesSpinner] = useState(true);

    useEffect(() => {
        if (!raffleSpinner && !loadingEntered) {
            setTickets((ticketsCache) => {
                return ticketsCache.map((ticket, i) => {
                    ticket.chance = countChances(ticket.value, ticket.entered, ticket.items); // TODO: check how this 2 count chances works at the same time
                    ticket.prizes = countWearablesChances(ticket);
                    return ticket;
                });
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        Promise.all([
            thegraph.getRaffleEntered(address, raffle),
            thegraph.getRaffleWins(address, raffle)
        ]).then(([entered, won]) => {
            setTickets((ticketsCache) => {
                let modified = [...ticketsCache];

                entered.forEach((item, i) => {
                    let elem = modified.length > 1 ? item.ticketId : 0;

                    modified[elem].value = item.quantity;
                    modified[elem].prizes = modified[elem].prizes.map((item) => {
                        let index = won.findIndex(prize => prize.itemId === item.id);
                        return ({
                            ...item,
                            won: index !== -1 ? won[index].quantity : 0
                        })
                    });

                });

                return modified;
            });
            setLoadingEntered(false);
        }).catch(error => console.log(error));
    };

    const onAddressChange = (address, raffle) => {
        tickets.forEach((item, i) => tickets[i].value = '');

        if (web3.isAddressValid(address)) {
            getAddressData(address, raffle);
        }
    };

    const countChances = (value, entered, items) => {
        const supply = raffle.endDate - DateTime.local() < 0 ? entered  : +entered + +value;

        return value / supply * items;
    }

    const countWearablesChances = (ticket) => {
        const wearables = ticket.prizes;

        if (wearables) {
            wearables.forEach((wearable) => {
                let perc = wearable.quantity * 100 / ticket.items;
                let chance = perc * ticket.chance / 100;

                wearable.chance = chance;
            })
        }

        return wearables;
    }

    const getTicketsPreset = (tickets) => {
        return tickets.map((ticket) => ({
            id: ticket,
            rarity: itemUtils.getItemRarityName(ticket.toString()),
            value: ''
        }));
    }

    return (
        <RaffleContext.Provider value={{
            raffle,
            setRaffle,

            tickets,
            setTickets,

            getRaffleData,
            getAddressData,
            getTicketsPreset,

            onAddressChange,
            countChances,
            countWearablesChances,

            raffleSpinner,
            pricesSpinner
        }}>
            { props.children }
        </RaffleContext.Provider>
    )
}

export default RaffleContextProvider;
