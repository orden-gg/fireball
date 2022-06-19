import { createContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { raffleTicketPriceQuery } from 'pages/Raffle/data/queries.data';
import ethersApi from 'api/ethers.api';
import thegraph from 'api/thegraph.api';
import { CommonUtils } from 'utils';
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
                return ticketsCache.map((ticket) => {
                    ticket.chance = countChances(ticket.value, ticket.entered, ticket.items); // TODO: check how this 2 count chances works at the same time
                    ticket.prizes = countWearablesChances(ticket);

                    return ticket;
                });
            });
        }
    }, [raffleSpinner, loadingEntered]);

    const getRaffleData = (raffle, raffleTickets) => {
        getRaffle(raffle);
        getPrices(raffleTickets);
    };

    const getRaffle = (raffle) => {
        setRaffleSpinner(true);

        thegraph.getRaffle(raffle).then((response) => {
            const [prizes, total] = response;

            setTickets((ticketsCache) => {
                return ticketsCache.map((ticket, i) => {
                    ticket.items = prizes[i].items;
                    ticket.prizes = prizes[i].prizes;
                    ticket.entered = total[
                        ticket.rarity === 'godlike' ? 'totalGodLike' : `total${CommonUtils.capitalize(ticket.rarity)}`
                    ];

                    return ticket;
                });
            });
            setRaffleSpinner(false);
        }).catch(error => console.log(error));
    };

    const getPrices = (raffleTickets) => {
        const queries = raffleTickets.map((ticket) => raffleTicketPriceQuery(ticket.id));

        setPricesSpinner(true);

        thegraph.getJoinedData(queries).then((response) => {
            const averagePrices = response.map((item) => {
                const prices = item.data.erc1155Listings.map((wei) => parseInt(wei.priceInWei));
                const average = prices.reduce((a,b) => a + b, 0) / prices.length;
                const price = average / 10**18;

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
                const modified = [...ticketsCache];

                entered.forEach((item) => {
                    const elem = modified.length > 1 ? item.ticketId : 0;

                    modified[elem].value = item.quantity;
                    modified[elem].prizes = modified[elem].prizes.map((item) => {
                        const index = won.findIndex(prize => prize.itemId === item.id);

                        return ({
                            ...item,
                            won: index !== -1 ? won[index].quantity : 0
                        });
                    });

                });

                return modified;
            });
            setLoadingEntered(false);
        }).catch(error => console.log(error));
    };

    const onAddressChange = (address, raffle) => {
        tickets.forEach((item, i) => tickets[i].value = '');

        if (ethersApi.isEthAddress(address)) {
            getAddressData(address, raffle);
        }
    };

    const countChances = (value, entered, items) => {
        const supply = raffle.endDate - DateTime.local() < 0 ? entered  : +entered + +value;

        return value / supply * items;
    };

    const countWearablesChances = (ticket) => {
        const wearables = ticket.prizes;

        if (wearables) {
            wearables.forEach((wearable) => {
                const perc = wearable.quantity * 100 / ticket.items;
                const chance = perc * ticket.chance / 100;

                wearable.chance = chance;
            });
        }

        return wearables;
    };

    const getTicketsPreset = (tickets) => {
        return tickets.map((ticket) => ({
            id: ticket,
            rarity: itemUtils.getItemRarityName(ticket.toString()),
            value: ''
        }));
    };

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
    );
};

export default RaffleContextProvider;
