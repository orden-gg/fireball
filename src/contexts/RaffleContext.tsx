import { createContext, useEffect, useState } from 'react';

import { DateTime } from 'luxon';

import { EthersApi, TheGraphApi } from 'api';

import { raffleTicketPriceQuery } from 'pages/Raffle/data/queries.data';

import { CommonUtils, ItemUtils } from 'utils';

export const RaffleContext = createContext({});

export const RaffleContextProvider = (props: CustomAny) => {
  const [raffle, setRaffle] = useState<CustomAny>(null);
  const [tickets, setTickets] = useState<CustomAny[]>([]);

  const [loadingEntered, setLoadingEntered] = useState<boolean>(true);

  const [raffleSpinner, setRaffleSpinner] = useState<boolean>(true);
  const [pricesSpinner, setPricesSpinner] = useState<boolean>(true);

  useEffect(() => {
    if (!raffleSpinner && !loadingEntered) {
      setTickets((ticketsCache: CustomAny[]) => {
        return ticketsCache.map((ticket: CustomAny) => {
          ticket.chance = countChances(ticket.value, ticket.entered, ticket.items); // TODO: check how this 2 count chances works at the same time
          ticket.prizes = countWearablesChances(ticket);

          return ticket;
        });
      });
    }
  }, [raffleSpinner, loadingEntered]);

  const getRaffleData = (raffle: CustomAny, raffleTickets: CustomAny[]): void => {
    getRaffle(raffle);
    getPrices(raffleTickets);
  };

  const getRaffle = (raffle: CustomAny): void => {
    setRaffleSpinner(true);

    TheGraphApi.getRaffle(raffle)
      .then((response) => {
        const [prizes, total] = response;

        setTickets((ticketsCache: CustomAny[]) => {
          return ticketsCache.map((ticket: CustomAny, i: number) => {
            ticket.items = prizes[i].items;
            ticket.prizes = prizes[i].prizes;
            ticket.entered =
              total[ticket.rarity === 'godlike' ? 'totalGodLike' : `total${CommonUtils.capitalize(ticket.rarity)}`];

            return ticket;
          });
        });
        setRaffleSpinner(false);
      })
      .catch((error) => console.log(error));
  };

  const getPrices = (raffleTickets: CustomAny[]): void => {
    const queries: string[] = raffleTickets.map((ticket: CustomAny) => raffleTicketPriceQuery(ticket.id));

    setPricesSpinner(true);

    TheGraphApi.getJoinedData(queries).then((response: CustomAny) => {
      const averagePrices: CustomAny[] = response.map((item: CustomAny) => {
        const prices: CustomAny = item.data.erc1155Listings.map((wei) => parseInt(wei.priceInWei));
        const average: CustomAny = prices.reduce((a: CustomAny, b: CustomAny) => a + b, 0) / prices.length;
        const price: number = average / 10 ** 18;

        return price.toFixed(2);
      });

      setTickets((ticketsCache: CustomAny[]) => {
        return ticketsCache.map((ticket: CustomAny, i: number) => {
          ticket.price = averagePrices[i];

          return ticket;
        });
      });
      setPricesSpinner(false);
    });
  };

  const getAddressData = (address: string, raffle: CustomAny): void => {
    setLoadingEntered(true);

    Promise.all([TheGraphApi.getRaffleEntered(address, raffle), TheGraphApi.getRaffleWins(address, raffle)])
      .then(([entered, won]: [CustomAny, CustomAny]) => {
        setTickets((ticketsCache: CustomAny[]) => {
          const modified: CustomAny[] = [...ticketsCache];

          entered.forEach((item: CustomAny) => {
            const elem: CustomAny = modified.length > 1 ? item.ticketId : 0;

            modified[elem].value = item.quantity;
            modified[elem].prizes = modified[elem].prizes.map((item) => {
              const index: number = won.findIndex((prize: CustomAny) => prize.itemId === item.id);

              return {
                ...item,
                won: index !== -1 ? won[index].quantity : 0
              };
            });
          });

          return modified;
        });
        setLoadingEntered(false);
      })
      .catch((error) => console.log(error));
  };

  const onAddressChange = (address: string, raffle: CustomAny): void => {
    tickets.forEach((item: CustomAny, i: number) => (tickets[i].value = ''));

    if (EthersApi.isEthAddress(address)) {
      getAddressData(address, raffle);
    }
  };

  const countChances = (value: CustomAny, entered: CustomAny, items: CustomAny): CustomAny => {
    const supply: number = raffle.endDate.toSeconds() - DateTime.local().toSeconds() < 0 ? entered : +entered + +value;

    return (value / supply) * items;
  };

  const countWearablesChances = (ticket: CustomAny): CustomAny[] => {
    const wearables: CustomAny = ticket.prizes;

    if (wearables) {
      wearables.forEach((wearable: CustomAny) => {
        const perc = (wearable.quantity * 100) / ticket.items;
        const chance = (perc * ticket.chance) / 100;

        wearable.chance = chance;
      });
    }

    return wearables;
  };

  const getTicketsPreset = (tickets: CustomAny[]): CustomAny[] => {
    return tickets.map((ticket: CustomAny) => ({
      id: ticket,
      rarity: ItemUtils.getItemRarityName(ticket.toString()),
      value: ''
    }));
  };

  return (
    <RaffleContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </RaffleContext.Provider>
  );
};
